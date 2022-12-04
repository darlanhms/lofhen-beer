/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { Role } from '@lofhen/types';
import { faker } from '@faker-js/faker';
import { createTestCaller } from '@core/tests/trpc';
import prisma from '@infra/prisma/client';

describe('Current user controller', () => {
  it('returns the current user when logged in', async () => {
    const userInDb = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        name: faker.name.findName(),
        password: faker.internet.password(),
        role: Role.ADMIN,
      },
    });

    const caller = createTestCaller({
      user: userInDb,
    });

    const currentUser = await caller.user.current();

    expect(currentUser).toBeDefined();
  });

  it('returns null if not logged in', async () => {
    const caller = createTestCaller({
      user: undefined,
    });

    const currentUser = await caller.user.current();

    expect(currentUser).toBeNull();
  });
});
