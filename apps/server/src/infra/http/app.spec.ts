import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import app from './app';

describe('App', () => {
  it('returns os information default object on root route', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        uptime: expect.anything(),
        type: expect.anything(),
        version: expect.anything(),
        appVersion: process.env.npm_package_version,
      }),
    );
  });
});
