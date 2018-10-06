import * as express from 'express';
import { env } from 'process';

const app = express();

app.listen(env.NODE_PORT, () => {
  console.log(`Server started on ${env.NODE_PORT}`);
});

app.all('**', (_req, res) => {
  res.send('hello');
});
