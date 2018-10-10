import * as express from 'express';
import { env } from 'process';
import * as swagger from './swagger';

const app = express();

app.listen(env.NODE_PORT, () => {
  console.log(`Server started on ${env.NODE_PORT}`);
});

app.use('/docs', swagger);

app.all('**', (_req, res) => {
  res.status(501).json({
    message: 'Not Implemented'
  });
});
