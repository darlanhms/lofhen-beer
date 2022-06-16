/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import app from 'app';
import prisma from 'client';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import { createState } from '../createState';

describe('Update state', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('updates a state', async () => {
    const cookies = await authenticate();

    const state = await createState({
      name: faker.address.state(),
      abbr: faker.address.stateAbbr(),
    });

    const response = await request(app).put(`/api/states/${state.id}`).set('Cookie', cookies).send({
      name: 'new state name',
    });

    const stateInDb = await prisma.state.findFirst({
      where: {
        id: state.id,
      },
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(stateInDb).toBeDefined();
    expect(stateInDb?.name).toBe('new state name');
  });
});
