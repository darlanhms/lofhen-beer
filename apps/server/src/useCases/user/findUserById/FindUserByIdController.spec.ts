import request from 'supertest';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import app from '@infra/http/app';
import { Role, UserDTO } from '@lofhen/types';

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

describe('Find user by id controller', () => {
  it('finds a user by id', async () => {
    const cookies = await authenticate();

    const user = await createUser();

    const response = await request(app).get(`/api/users/${user.id}`).set('Cookie', cookies).send();

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toStrictEqual(user);
  });
});
