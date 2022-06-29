import { faker } from '@faker-js/faker';
import { Customer } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import prisma from '@infra/prisma/client';
import fakeUser from './fakeUser';

export default async function fakeCustomer(overrides: Partial<Customer> = {}): Promise<Customer> {
  if (!overrides.createdBy) {
    const user = await fakeUser();

    overrides.createdBy = user.id;
  }

  return prisma.customer.create({
    data: {
      id: uuid(),
      name: faker.name.firstName(),
      phone: faker.phone.phoneNumber('(##) #####-####'),
      birthdate: faker.date.future(),
      createdBy: overrides.createdBy as string,
      ...overrides,
    },
  });
}
