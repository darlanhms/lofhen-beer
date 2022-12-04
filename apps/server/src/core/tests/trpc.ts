/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import prisma from '@infra/prisma/client';
import { Context } from '@infra/trpc/context';
import appRouter from '@infra/trpc/routes';

export function createMockedContext(role?: Role): Context {
  return {
    prisma,
    user: {
      id: uuid(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      role: role ?? Role.ADMIN,
      createdAt: new Date(),
    },
  };
}

export function createTestCaller(overrideContext?: Partial<Context>) {
  return appRouter.createCaller({ ...createMockedContext(), ...overrideContext });
}
