/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '@infra/http/app';
import prisma from '@infra/prisma/client';

describe('Update city', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('updates a city', async () => {
    const cookies = await authenticate();

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

    const response = await request(app).put(`/api/cities/${city.id}`).set('Cookie', cookies).send({
      name: 'new city name',
    });

    const cityInDb = await prisma.city.findFirst({
      where: {
        id: city.id,
      },
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(cityInDb).toBeDefined();
    expect(cityInDb?.name).toBe('new city name');
  });
});
