/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';
import app from 'app';
import prisma from 'client';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import createUser from '../createUser';

describe('Delete user', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deletes a user', async () => {
    const cookies = await authenticate();

    const user = await createUser({
      name: faker.name.findName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      role: Role.ADMIN,
    });

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
