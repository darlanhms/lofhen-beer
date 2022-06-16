/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import app from 'app';
import prisma from 'client';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import { createState, CreateStateRequest } from '../createState';

function makeStatePayload(overrides?: Partial<CreateStateRequest>): CreateStateRequest {
  return {
    name: faker.address.state(),
    abbr: faker.address.stateAbbr(),
    ...overrides,
  };
}

describe('Create state', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('creates a state', async () => {
    const cookies = await authenticate();

    const state = makeStatePayload();

    const response = await request(app).post('/api/states').set('Cookie', cookies).send(state);

    const stateInDb = await prisma.state.findFirst({
      where: {
        name: state.name,
      },
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(stateInDb).toBeDefined();
  });

  it('returns an error if name was already registered', async () => {
    const cookies = await authenticate();

    const state = await createState({
      name: faker.address.state(),
      abbr: faker.address.stateAbbr(),
    });

    const response = await request(app)
      .post('/api/states')
      .set('Cookie', cookies)
      .send(makeStatePayload({ name: state.name }));

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toMatch('Estado com o mesmo nome já cadastrado');
  });
});
