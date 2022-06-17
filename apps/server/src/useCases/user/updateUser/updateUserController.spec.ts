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

const createUser = async (): Promise<UserDTO> => {
  const cookies = await authenticate();

  const { body: user } = await request(app).post('/api/users').set('Cookie', cookies).send({
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: Role.ADMIN,
  });

  return user;
};

describe('Update user controller', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('updates a user', async () => {
    const cookies = await authenticate();

    const user = await createUser();

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
