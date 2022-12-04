import os from 'os';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';

import '@infra/prisma/middlewares';
import '@infra/containers';
import createContext from '../trpc/context';
import appRouter from '../trpc/routes';

const app = express();

app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.get('/', (req, res) => {
  return res.json({
    uptime: os.uptime(),
    type: os.type(),
    version: os.version(),
    appVersion: process.env.npm_package_version,
  });
});

export default app;
