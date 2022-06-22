/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { City } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '@infra/http/app';
import prisma from '@infra/prisma/client';

async function createCity(): Promise<City> {
  const state = await prisma.state.create({
    data: {
      name: faker.address.state(),
      abbr: faker.address.stateAbbr(),
    },
  });

  return prisma.city.create({
    data: {
      name: faker.address.cityName(),
      stateId: state.id,
    },
  });
}

describe('Create address controller', () => {
  it('creates an address', async () => {
    const cookies = await authenticate();

    const city = await createCity();

    const response = await request(app).post('/api/addresses').set('Cookie', cookies).send({
      alias: faker.name.findName(),
      cityId: city.id,
      street: faker.address.street(),
      link: faker.internet.url(),
    });

    const addressInDb = await prisma.address.findFirst({
      where: {
        id: response.body.id,
      },
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(addressInDb).toBeTruthy();
  });
});
