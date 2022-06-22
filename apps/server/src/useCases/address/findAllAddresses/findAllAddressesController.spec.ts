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

describe('Find all addresses controller', () => {
  it('finds all addresses', async () => {
    const cookies = await authenticate();

    await createAddress();
    await createAddress();
    await createAddress();

    const response = await request(app).get('/api/addresses').set('Cookie', cookies).send();

    expect(response.status).toBe(StatusCodes.OK);
  });
});
