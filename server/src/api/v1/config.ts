import { ClientConfig } from 'pg';
import { env, exit } from 'process';
import * as log from 'solid-log';

const pgConf: ClientConfig = {
  host: env.PG_HOST,
  port: Number(env.PG_PORT),
  user: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_USER
}

const mongoConf = `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_USER}`;

const JWT_SECRET: string = env.NODE_JWT_SECRET || '';

if (!env.NODE_JWT_SECRET) {
  log.error('Environment variable NODE_JWT_SECRET not set!');
  exit(-1);
}

export {
  pgConf,
  mongoConf,
  JWT_SECRET
}
