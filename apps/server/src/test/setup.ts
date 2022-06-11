import { Role } from '@prisma/client';
import prisma from 'client';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import app from 'app';
import { faker } from '@faker-js/faker';

global.authenticate = async (role: Role = 'ADMIN') => {
  const user = await prisma.user.upsert({
    where: {
      username: faker.internet.userName(),
    },
    create: {
      name: faker.name.findName(),
      username: faker.internet.userName(),
      password: await bcrypt.hash('password', 6),
      role,
    },
    update: {},
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
