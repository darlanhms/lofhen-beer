import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '@infra/http/app';
import prisma from '@infra/prisma/client';
import fakeCity from '@repositories/prisma/tests/fakeCity';

describe('Create customer controller', () => {
  it('creates a costumer', async () => {
    const cookies = await authenticate();

    const city = await fakeCity();

    const response = await request(app)
      .post('/api/customers')
      .set('Cookie', cookies)
      .send({
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber('(##) #####-####'),
        birthdate: faker.date.future(),
        addresses: [
          {
            alias: faker.name.findName(),
            cityId: city.id,
            street: faker.address.street(),
            link: faker.internet.url(),
          },
          {
            alias: faker.name.findName(),
            cityId: city.id,
            street: faker.address.street(),
            link: faker.internet.url(),
          },
        ],
      });

    expect(response.status).toBe(StatusCodes.OK);

    const customerInDb = await prisma.customer.findFirst({
      where: {
        id: response.body.id,
      },
    });

    const addressesInDb = await prisma.address.findMany({
      where: {
        customerId: customerInDb?.id,
      },
    });

    expect(customerInDb).toBeTruthy();
    expect(addressesInDb).toHaveLength(2);
  });
});
