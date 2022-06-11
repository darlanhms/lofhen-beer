/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import request from 'supertest';
import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';
import prisma from 'client';
import app from 'app';
import { StatusCodes } from 'http-status-codes';
import createUser from '../createUser';

describe('Login', () => {
  afterAll(async () => {
    prisma.$disconnect();
  });

  it('logins with the right credentials', async () => {
    const user = await createUser({
      name: faker.name.findName(),
      username: faker.internet.userName(),
      password: 'password',
      role: Role.ADMIN,
    });

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
    const user = await createUser({
      name: faker.name.findName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      role: Role.ADMIN,
    });

    const response = await request(app).post('/api/users/login').send({
      username: user.username,
      password: 'password',
    });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toMatch('Credenciais inválidas');
  });
});
