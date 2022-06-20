/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { UserDTO } from '@lofhen/types';
import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '@infra/http/app';
import prisma from '@infra/prisma/client';

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

describe('Delete user', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deletes a user', async () => {
    const cookies = await authenticate();

    const user = await createUser();

    const response = await request(app).delete(`/api/users/${user.id}`).set('Cookie', cookies);

    const softDeletedUser = await prisma.user.findFirst({
      where: {
        id: user.id,
        deleted: true,
      },
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(softDeletedUser?.deleted).toBeTruthy();
  });
});
