import * as express from 'express';
import { env } from 'process';

const app = express();

app.listen(env.PORT, () => {
  console.log(`Server started on ${env.PORT}`);
});
