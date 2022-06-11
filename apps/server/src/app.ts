import bodyParser from 'body-parser';
import express from 'express';
import os from 'os';
import cors from 'cors';
import router from 'routes';
import { errorHandler } from 'middlewares/errorHandler';
import cookieSession from 'cookie-session';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(
  cookieSession({
    signed: false,
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
