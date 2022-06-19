/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { State } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '@infra/http/app';
import prisma from '@infra/prisma/client';

async function createState(): Promise<State> {
  return prisma.state.create({
    data: {
      name: faker.address.state(),
      abbr: faker.address.stateAbbr(),
    },
  });
}
async function createCity(): Promise<void> {
  const state = await createState();

  await prisma.city.create({
    data: {
      name: faker.address.cityName(),
      stateId: state.id,
    },
  });
}

describe('Find all cities controller', () => {
  it('finds all cities', async () => {
    const cookies = await authenticate();

    await createCity();
    await createCity();
    await createCity();

    const response = await request(app).get('/api/cities').set('Cookie', cookies).send();

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveLength(3);
  });
});
