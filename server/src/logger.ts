'use strict';

import * as express from 'express';
import * as c from 'colors';

const router = express.Router();

router.use(express.json());
router.use((req, _res, next) => {
  const now = new Date();
  const datetime = `[${now.toDateString()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds().toString().length === 1 ? '0' + now.getSeconds().toString() : now.getSeconds().toString()}]`;

  const method = req.method
    .replace('GET', c.bold(c.blue('GET')))
    .replace('POST', c.bold(c.green('POST')))
    .replace('PATCH', c.bold(c.cyan('PATCH')))
    .replace('PUT', c.bold(c.yellow('PUT')))
    .replace('DELETE', c.bold(c.red('DELETE')));

  const ip = req.ip.replace('::ffff:', '');

  const line = [ip, datetime, method, req.url];

  for (let p in req.body) {
    line.push(`${p}=${req.body[p]}`);
  }

  if (req.headers.authorization) {
    if (req.headers.authorization.length > 20) { // Bearer: aaa
      line.push(`Authorization: ${req.headers.authorization.substring(0, 12)}...${req.headers.authorization.substring(req.headers.authorization.length - 5)}`);
    } else {
      line.push(`Authorization: ${req.headers.authorization}`);
    }
  }

  // line.push('--', <string>req.headers['user-agent']);

  // console.log(line.join(' '));
  // log(line.join(' '), `[${req.method}]`);
  log(line.join(' '), '[REQUEST]');
  next();
});

c.setTheme({
  log: ['black', 'bold'],
  info: ['white', 'bold', 'bgBlue'],
  ok: ['white', 'bold', 'bgGreen'],
  warn: ['white', 'bold', 'bgYellow'],
  error: ['white', 'bold', 'bgRed'],
  panic: ['white', 'bold', 'bgRed', 'inverse']
});

function log(e: any, label = '') {
  // @ts-ignore
  console.log(label.log || '[LOG]'.log, e);
}

function info(e: any, label = '') {
  // @ts-ignore
  console.log(label.info || '[INFO]'.info, e);
}

function ok(e: any, label = '') {
  // @ts-ignore
  console.log(label.ok || '[OK]'.ok, e);
}

function warn(e: any, label = '') {
  // @ts-ignore
  console.log(label.warn || '[WARNING]'.warn, e);
}

function error(e: any, label = '') {
  // @ts-ignore
  console.log(label.error || '[ERROR]'.error, e);
}

function panic(e: any, label = '') {
  // @ts-ignore
  console.log(label.panic || '[PANIC]'.panic, e);
}

export { router as requests, log, info, ok, warn, error, panic };
