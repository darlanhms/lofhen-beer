/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '@infra/http/app';
import prisma from '@infra/prisma/client';

describe('Find city by id controller', () => {
  it('finds a city by id', async () => {
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

    const response = await request(app).get(`/api/cities/${city.id}`).set('Cookie', cookies).send();

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toBeDefined();
    expect(response.body.name).toEqual(city.name);
  });
});
