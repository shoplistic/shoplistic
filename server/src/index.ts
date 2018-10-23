import * as express from 'express';
import * as cors from 'cors';
import { env } from 'process';
import * as log from './logger';
import * as api from './api/api';

const app = express();

app.listen(env.NODE_PORT, () => {
  log.info(`Server started on port ${env.NODE_PORT}`);
});

if (env.NODE_ENV === 'dev' || env.NODE_LOG_REQUESTS === 'true') {
  app.use(log.requests);
}

if (env.NODE_ENV === 'dev') {
  app.use(cors());
} else {
  app.use(cors({
    origin: 'http://shopper.ink',
  }));
}

app.use('/v1', api.v1);

app.all('**', (_req, res) => {
  res.status(501).json({
    message: 'Not Implemented'
  });
});
