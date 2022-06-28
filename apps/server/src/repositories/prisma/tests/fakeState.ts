import { faker } from '@faker-js/faker';
import { State } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import prisma from '@infra/prisma/client';

export default function fakeState(overrides: Partial<State> = {}): Promise<State> {
  return prisma.state.create({
    data: {
      id: uuid(),
      abbr: faker.address.stateAbbr(),
      name: faker.address.state(),
      ...overrides,
    },
  });
}
