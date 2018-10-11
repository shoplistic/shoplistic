import * as express from 'express';
import { env } from 'process';
import * as log from './logger';
import * as swagger from './swagger';
import * as api from './api/api';

const app = express();

app.listen(env.NODE_PORT, () => {
  log.info(`Server started on port ${env.NODE_PORT}`);
});

if (env.NODE_ENV === 'dev' || env.NODE_LOG_REQUESTS === 'true') {
  app.use(log.requests);
}

app.use('/v1/docs', swagger);
app.use('/v1', api.v1);

app.all('**', (_req, res) => {
  res.status(501).json({
    message: 'Not Implemented'
  });
});
