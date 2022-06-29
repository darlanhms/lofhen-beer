import { Role } from '@lofhen/types';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import prisma from '@infra/prisma/client';

export default async function fakeUser(overrides: Partial<User> = {}): Promise<User> {
  return prisma.user.create({
    data: {
      id: uuid(),
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      role: Role.ADMIN,
      password: faker.internet.password(),
      ...overrides,
    },
  });
}
