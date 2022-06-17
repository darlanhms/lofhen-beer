/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import request from 'supertest';
import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import prisma from '@infra/prisma/client';
import app from '@infra/http/app';
import { UserDTO } from '@lofhen/types';

const createUser = async (password?: string): Promise<UserDTO> => {
  const cookies = await authenticate();

  const { body: user } = await request(app)
    .post('/api/users')
    .set('Cookie', cookies)
    .send({
      name: faker.name.findName(),
      username: faker.internet.userName(),
      password: password ?? 'password',
      role: Role.ADMIN,
    });

  return user;
};

describe('Login controller', () => {
  afterAll(async () => {
    prisma.$disconnect();
  });

  it('logins with the right credentials', async () => {
    const user = await createUser();

    const response = await request(app).post('/api/users/login').send({
      username: user.username,
      password: 'password',
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.user).toBeDefined();
    expect(response.get('Set-Cookie').length).toBeGreaterThan(0);
  });

  it('returns an error if user is not registered', async () => {
    const response = await request(app).post('/api/users/login').send({
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toMatch('Credenciais inválidas');
  });

  it('returns an error if credentials are invalid', async () => {
    const user = await createUser();

    const response = await request(app).post('/api/users/login').send({
      username: user.username,
      password: faker.internet.password(),
    });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toMatch('Credenciais inválidas');
  });
});
