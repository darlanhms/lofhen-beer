/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { CreateUserRequest } from '@lofhen/contracts';
import { Role } from '@lofhen/types';
import { faker } from '@faker-js/faker';
import BadRequestError from '@core/errors/badRequestError';
import NotAuthorizedError from '@core/errors/notAuthorizedError';
import { createTestCaller } from '@core/tests/trpc';
import prisma from '@infra/prisma/client';

function makeUserPayload(overrides?: Partial<CreateUserRequest>): CreateUserRequest {
  return {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: Role.ADMIN,
    ...overrides,
  };
}

describe('Create user procedure', () => {
  it('creates a user', async () => {
    const caller = createTestCaller();

    const payload = makeUserPayload();

    const user = await caller.user.create(payload);

    const userInDb = await prisma.user.findFirst({
      where: {
        username: payload.username,
      },
    });

    expect(user).toBeTruthy();
    expect(userInDb).toBeTruthy();
  });

  it('returns an error if username was already registered', async () => {
    const caller = createTestCaller();

    const payload = makeUserPayload();

    await prisma.user.create({
      data: {
        username: payload.username,
        name: faker.name.findName(),
        password: faker.internet.password(),
        role: Role.ADMIN,
      },
    });

    try {
      await caller.user.create(payload);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect((error as BadRequestError).message).toMatch('Nome de usuário já cadastrado');
    }
  });

  it('ensures that only admin users can create new users', async () => {
    const caller = createTestCaller({
      user: {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        name: faker.name.findName(),
        role: Role.AGENT,
        createdAt: new Date(),
      },
    });

    try {
      await caller.user.create(makeUserPayload());
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(NotAuthorizedError);
    }
  });
});
