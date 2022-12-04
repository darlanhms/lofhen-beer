/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { Role, UserDTO } from '@lofhen/types';
import { faker } from '@faker-js/faker';
import { createTestCaller } from '@core/tests/trpc';
import prisma from '@infra/prisma/client';

const createUser = async (): Promise<UserDTO> => {
  const caller = createTestCaller();

  const user = caller.user.create({
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: Role.ADMIN,
  });

  return user;
};

describe('Find user by id', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('finds a user by id', async () => {
    const caller = createTestCaller();

    const user = await createUser();

    const foundUser = await caller.user.byId(user.id);

    expect(foundUser).toStrictEqual(user);
  });
});
