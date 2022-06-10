import bodyParser from 'body-parser';
import express from 'express';
import os from 'os';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.json({
    uptime: os.uptime(),
    type: os.type(),
    version: os.version(),
    appVersion: process.env.npm_package_version,
  });
});

export default app;
