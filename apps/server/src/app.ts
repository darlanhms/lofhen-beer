import bodyParser from 'body-parser';
import express from 'express';
import os from 'os';
import cors from 'cors';
import router from 'routes';
import { errorHandler } from 'middlewares/errorHandler';
import cookieSession from 'cookie-session';

import 'database/middlewares';

const app = express();

app.set('trust proxy', true);

const whitelist = ['https://lofhen-local.com:3001', 'https://192.168.2.54:3001'];

app.use(bodyParser.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (whitelist.indexOf(origin as string) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.use(
  cookieSession({
    signed: false,
    sameSite: 'none',
    secure: process.env.NODE_ENV !== 'test',
    httpOnly: false,
  }),
);

app.use('/api', router);

app.get('/', (req, res) => {
  return res.json({
    uptime: os.uptime(),
    type: os.type(),
    version: os.version(),
    appVersion: process.env.npm_package_version,
  });
});

app.use(errorHandler);

export default app;
