/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import NotAuthorizedError from '@core/errors/notAuthorizedError';
import app from '@infra/http/app';
import prisma from '@infra/prisma/client';
import { CreateUserRequest } from './createUser';

function makeUserPayload(overrides?: Partial<CreateUserRequest>): CreateUserRequest {
  return {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: Role.ADMIN,
    ...overrides,
  };
}

describe('Create user controller', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('creates a user', async () => {
    const cookies = await authenticate();

    const userPayload = makeUserPayload();

    const response = await request(app).post('/api/users').set('Cookie', cookies).send(userPayload);

    const userInDb = await prisma.user.findFirst({
      where: {
        username: userPayload.username,
      },
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(userInDb).toBeDefined();
  });

  it('returns an error if username was already registered', async () => {
    const cookies = await authenticate();

    const userPayload = makeUserPayload();

    await prisma.user.create({
      data: {
        username: userPayload.username,
        name: faker.name.findName(),
        password: faker.internet.password(),
        role: Role.ADMIN,
      },
    });

    const response = await request(app).post('/api/users').set('Cookie', cookies).send(userPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toMatch('Nome de usuário já cadastrado');
  });

  it('ensures that only admin users can create new users', async () => {
    const userPayload = makeUserPayload();
    const agentUserCookies = await authenticate('AGENT');

    const response = await request(app).post('/api/users').send(userPayload);

    const responseWithAgentUser = await request(app)
      .post('/api/users')
      .set('Cookie', agentUserCookies)
      .send(userPayload);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.message).toBe(new NotAuthorizedError().message);

    expect(responseWithAgentUser.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(responseWithAgentUser.body.message).toBe(new NotAuthorizedError().message);
  });
});
