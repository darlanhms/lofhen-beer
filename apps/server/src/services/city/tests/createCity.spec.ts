/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import app from 'app';
import prisma from 'client';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import { createState } from 'services/state/createState';
import { CreateCityRequest } from '../createCity';

function makeCityPayload(overrides?: Partial<CreateCityRequest>): CreateCityRequest {
  return {
    name: faker.address.state(),
    stateId: faker.datatype.uuid(),
    ...overrides,
  };
}

describe('Create city', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('creates a city', async () => {
    const cookies = await authenticate();

    const state = await createState({
      name: faker.address.state(),
      abbr: faker.address.stateAbbr(),
    });

    const cityPayload = makeCityPayload({ stateId: state.id });

    const response = await request(app).post('/api/cities').set('Cookie', cookies).send(cityPayload);

    const cityInDb = await prisma.city.findFirst({
      where: {
        name: cityPayload.name,
      },
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(cityInDb).toBeDefined();
  });
});
