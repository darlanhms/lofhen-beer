/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { Role, UserDTO } from '@lofhen/types';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import app from '@infra/http/app';
import prisma from '@infra/prisma/client';

const createUser = async (cookies: Array<string>): Promise<UserDTO> => {
  const { body: user } = await request(app).post('/api/users').set('Cookie', cookies).send({
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: Role.ADMIN,
  });

  return user;
};

describe('Find all users controller', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('list all users', async () => {
    const cookies = await authenticate();

    await createUser(cookies);
    await createUser(cookies);
    await createUser(cookies);

    const { body: users, status } = await request(app).get('/api/users').set('Cookie', cookies).send();

    expect(status).toBe(StatusCodes.OK);
    /**
     * 1 from authenticate
     * 3 from insertions above
     */
    expect(users).toHaveLength(4);
  });
});
