/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '@infra/http/app';

describe('Current user controller', () => {
  it('returns the current user when logged in', async () => {
    const cookies = await authenticate();

    const response = await request(app).get('/api/users/current-user').set('Cookie', cookies).send();

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toBeDefined();
  });

  it('returns null if not logged in', async () => {
    const response = await request(app).get('/api/users/current-user').send();

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toBe(null);
  });
});
