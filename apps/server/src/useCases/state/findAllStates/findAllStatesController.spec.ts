/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '@infra/http/app';
import prisma from '@infra/prisma/client';

async function createState(): Promise<void> {
  await prisma.state.create({
    data: {
      name: faker.address.state(),
      abbr: faker.address.stateAbbr(),
    },
  });
}

describe('Find all states controller', () => {
  it('finds all states', async () => {
    const cookies = await authenticate();

    await createState();
    await createState();
    await createState();

    const response = await request(app).get('/api/states').set('Cookie', cookies).send();

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveLength(3);
  });
});
