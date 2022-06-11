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

describe('Update user', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('updates a user', async () => {
    const cookies = await authenticate();

    const user = await createUser({
      name: faker.name.findName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      role: Role.ADMIN,
    });

    const response = await request(app).put(`/api/users/${user.id}`).set('Cookie', cookies).send({
      name: 'new name',
      username: 'new username',
    });

    const userInDb = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(userInDb?.name).toBe('new name');
    expect(userInDb?.username).toBe('new username');
  });
});
