import { faker } from '@faker-js/faker';
import { Address } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import prisma from '@infra/prisma/client';
import fakeCity from './fakeCity';

export default async function fakeAddress(overrides: Partial<Address> = {}): Promise<Address> {
  if (!overrides.cityId) {
    const city = await fakeCity();

    overrides.cityId = city.id;
  }

  return prisma.address.create({
    data: {
      id: uuid(),
      alias: faker.name.findName(),
      cityId: overrides.cityId as string,
      street: faker.address.street(),
      number: faker.address.buildingNumber(),
      complement: faker.address.secondaryAddress(),
      link: faker.internet.url(),
      ...overrides,
    },
  });
}
