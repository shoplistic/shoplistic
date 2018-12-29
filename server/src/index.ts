import * as express from 'express';
import * as cors from 'cors';
import { env } from 'process';
import { short as gitRevShort } from 'git-rev-sync';
import * as log from './logger';
import * as api from './api/api';

const app = express();

app.listen(env.NODE_PORT, () => {
  log.info(`Server started on port ${env.NODE_PORT}`);
});

if (env.NODE_LOG_REQUESTS === 'true') {
  log.warn('Logging requests!');
  app.use(log.requests);
}

if (env.NODE_ENV === 'dev') {
  log.warn('Server running in dev mode!');
  app.use(cors());
} else {
  app.use(cors({
    origin: 'https://app.shoplistic.com'
  }));
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
