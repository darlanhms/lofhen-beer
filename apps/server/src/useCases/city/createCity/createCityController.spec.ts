/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '@infra/http/app';
import prisma from '@infra/prisma/client';

describe('Create city', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('creates a city', async () => {
    const cookies = await authenticate();

    const state = await prisma.state.create({
      data: {
        name: faker.address.state(),
        abbr: faker.address.stateAbbr(),
      },
    });

    const response = await request(app).post('/api/cities').set('Cookie', cookies).send({
      name: faker.address.cityName(),
      stateId: state.id,
    });

    const cityInDb = await prisma.city.findFirst({
      where: {
        id: response.body.id,
      },
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(cityInDb).toBeDefined();
  });
});
