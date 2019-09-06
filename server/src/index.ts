import * as express from 'express';
import * as cors from 'cors';
import { env } from 'process';
import { short as gitRevShort } from 'git-rev-sync';
import { requests as requestsLogger } from './logger';
import * as api from './api/api';
import * as log from 'solid-log';

const app = express();

if (env.NODE_ENV === 'dev') {
  log.add(new log.ConsoleLogger(log.LogLevel.debug));
  log.add(new log.FileLogger(log.LogLevel.debug));
  log.warn('Server running in dev mode!');
  app.use(cors());
} else {
  log.add(new log.ConsoleLogger(log.LogLevel.warn));
  log.add(new log.FileLogger(log.LogLevel.warn));
  app.use(cors({
    origin: 'https://app.shoplistic.com'
  }));
}

app.listen(env.NODE_PORT, () => {
  log.info(`Server started on port ${env.NODE_PORT}`);
  console.log('pid: ', process.pid);
});

if (env.NODE_LOG_REQUESTS === 'true') {
  log.warn('Logging requests!');
  app.use(requestsLogger);
}

// Use API v1
app.use('/v1', api.v1);

// Version
app.get('/version', async (_req, res) => {
  res.status(200).json({
    version: gitRevShort()
  });
});

app.all('**', (_req, res) => {
  res.status(501).json({
    message: 'Not Implemented'
  });
});
