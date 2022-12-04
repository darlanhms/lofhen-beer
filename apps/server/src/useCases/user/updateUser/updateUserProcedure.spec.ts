/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { UserDTO } from '@lofhen/types';
import { faker } from '@faker-js/faker';

import { Role } from '@prisma/client';
import { createTestCaller } from '@core/tests/trpc';
import prisma from '@infra/prisma/client';

const createUser = async (): Promise<UserDTO> => {
  const caller = createTestCaller();

  const user = await caller.user.create({
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: Role.ADMIN,
  });

  return user;
};

describe('Update user controller', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('updates a user', async () => {
    const caller = createTestCaller();

    const user = await createUser();

    const oldUser = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    await caller.user.update({
      id: user.id,
      name: 'new name',
      username: 'new username',
      password: '1234',
    });

    const userInDb = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    expect(userInDb?.name).toBe('new name');
    expect(userInDb?.username).toBe('new username');
    expect(userInDb?.password).not.toBe(oldUser?.password);
  });
});
