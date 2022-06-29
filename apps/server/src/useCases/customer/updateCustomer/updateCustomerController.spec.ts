/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '@infra/http/app';
import prisma from '@infra/prisma/client';
import fakeAddress from '@repositories/prisma/tests/fakeAddress';
import fakeCustomer from '@repositories/prisma/tests/fakeCustomer';

describe('Update customer controller', () => {
  it('updates a user', async () => {
    const cookies = await authenticate();

    const customer = await fakeCustomer();

    const preRegisteredAddress = await fakeAddress({ customerId: customer.id });

    const response = await request(app)
      .put(`/api/customers/${customer.id}`)
      .set('Cookie', cookies)
      .send({
        name: 'new customer name',
        enabled: false,
        addresses: [
          {
            id: preRegisteredAddress.id,
            alias: 'new pre-registered address alias',
          },
          {
            alias: faker.name.findName(),
            cityId: preRegisteredAddress.cityId,
            street: faker.address.street(),
          },
        ],
      });

    expect(response.status).toBe(StatusCodes.OK);

    const customerInDb = await prisma.customer.findFirst({
      where: {
        id: customer.id,
      },
      include: {
        addresses: true,
      },
    });

    expect(customerInDb?.name).toBe('new customer name');
    expect(customerInDb?.enabled).toBe(false);
    expect(customerInDb?.addresses).toHaveLength(2);
    expect(customerInDb?.addresses[0].alias).toBe('new pre-registered address alias');
  });
});
