'use strict';

import * as morgan from 'morgan';
import * as c from 'colors';

// [REQUEST] 172.21.0.1 [Tue, 23 Oct 2018 16:58:12 GMT] GET /path/gfdg 401 Authorization: Bearer eyJhb...wBJEo

const requests = morgan((tokens, req, res) => {

  const method = req.method
    .replace('GET', c.bold(c.blue('GET')))
    .replace('POST', c.bold(c.green('POST')))
    .replace('PATCH', c.bold(c.cyan('PATCH')))
    .replace('PUT', c.bold(c.yellow('PUT')))
    .replace('DELETE', c.bold(c.red('DELETE')));

  const response = [
    '[REQUEST]'.black.bold,
    tokens['remote-addr'](req, res).replace('::ffff:', ''),
    `[${tokens.date(req, res, 'web')}]`,
    method,
    tokens.url(req, res),
    tokens.status(req, res),
  ];

  if (req.headers.authorization) {
    if (req.headers.authorization.length > 20) {
      response.push(`Authorization: ${req.headers.authorization.substring(0, 12)}...${req.headers.authorization.substring(req.headers.authorization.length - 5)}`);
    } else {
      response.push(`Authorization: ${req.headers.authorization}`);
    }
  }

  return response.join(' ');

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



export { requests, log, info, ok, warn, error, panic };
