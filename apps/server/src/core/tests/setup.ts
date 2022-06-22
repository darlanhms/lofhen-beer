import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import request from 'supertest';
import app from '@infra/http/app';
import prisma from '@infra/prisma/client';

global.authenticate = async (role: Role = 'ADMIN') => {
  const user = await prisma.user.create({
    data: {
      name: faker.name.findName(),
      username: faker.internet.userName(),
      password: await bcrypt.hash('password', 6),
      role,
    },
  });

  const response = await request(app)
    .post('/api/users/login')
    .send({
      username: user.username,
      password: 'password',
    })
    .expect(200);

  return response.get('Set-Cookie');
};
