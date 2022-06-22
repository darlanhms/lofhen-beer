/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { Address } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '@infra/http/app';
import prisma from '@infra/prisma/client';

async function createAddress(): Promise<Address> {
  const state = await prisma.state.create({
    data: {
      name: faker.address.state(),
      abbr: faker.address.stateAbbr(),
    },
  });

  const city = await prisma.city.create({
    data: {
      name: faker.address.cityName(),
      stateId: state.id,
    },
  });

  return prisma.address.create({
    data: {
      alias: faker.name.findName(),
      link: faker.internet.url(),
      cityId: city.id,
    },
  });
}

describe('Update address controller', () => {
  it('updates an address', async () => {
    const cookies = await authenticate();

    const address = await createAddress();

    const response = await request(app).put(`/api/addresses/${address.id}`).set('Cookie', cookies).send({
      alias: 'new address alias',
    });

    const addressInDb = await prisma.address.findFirst({
      where: {
        id: address.id,
      },
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(addressInDb?.alias).toBe('new address alias');
  });

  it('returns a not found error if address does not exists', async () => {
    const cookies = await authenticate();

    const response = await request(app)
      .put(`/api/addresses/${faker.datatype.uuid()}`)
      .set('Cookie', cookies)
      .send({
        alias: 'new address alias',
      });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});
