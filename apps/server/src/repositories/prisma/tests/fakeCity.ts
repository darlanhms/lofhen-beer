import { faker } from '@faker-js/faker';
import { City } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import prisma from '@infra/prisma/client';
import fakeState from './fakeState';

export default async function fakeCity(overrides: Partial<City> = {}): Promise<City> {
  if (!overrides.stateId) {
    const state = await fakeState();

    overrides.stateId = state.id;
  }

  return prisma.city.create({
    data: {
      id: uuid(),
      name: faker.address.city(),
      stateId: overrides.stateId as string,
      ...overrides,
    },
  });
}
