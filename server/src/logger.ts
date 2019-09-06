'use strict';

import * as morgan from 'morgan';
import * as co from 'colors';
import { HttpStatusCodes } from './http_status_codes';
import * as log from 'solid-log';

// [REQUEST] 172.21.0.1 [Tue, 23 Oct 2018 16:58:12 GMT] GET /path/gfdg 401 Authorization: Bearer eyJhb...wBJEo

function statusCode(c: number) {

  if (c >= 500) {
    return {
      status: String(HttpStatusCodes.getFirstStatus(c)).red.bold,
      code: String(c).red.bold
    }
  } else if (c >= 400) {
    return {
      status: String(HttpStatusCodes.getFirstStatus(c)).yellow.bold,
      code: String(c).yellow.bold
    }
  } else if (c >= 300) {
    return {
      status: String(HttpStatusCodes.getFirstStatus(c)).cyan.bold,
      code: String(c).cyan.bold
    }
  } else if (c >= 200) {
    return {
      status: String(HttpStatusCodes.getFirstStatus(c)).green.bold,
      code: String(c).green.bold
    }
  } else {
    return {
      status: String(HttpStatusCodes.getFirstStatus(c)).normalize,
      code: String(c).normalize
    }
  }

}

const requests = morgan((tokens, req, res) => {

  const method = req.method
    .replace('GET', co.bold(co.blue('GET')))
    .replace('POST', co.bold(co.green('POST')))
    .replace('PATCH', co.bold(co.cyan('PATCH')))
    .replace('PUT', co.bold(co.yellow('PUT')))
    .replace('DELETE', co.bold(co.red('DELETE')))
    .replace('OPTIONS', co.bold(co.black('OPTIONS')));

  const c = Number(tokens.status(req, res));

  const { code, status } = statusCode(c);

  const responseTime = (() => {

    const ms = Number(tokens['response-time'](req, res));

    if (ms < 10) {
      return `${ms.toFixed(3)}ms`.green;
    } else if (ms < 20) {
      return `${ms.toFixed(3)}ms`.yellow;
    } else {
      return `${ms.toFixed(3)}ms`.red;
    }

  })();

  const response = [
    '[REQUEST]'.bgBlack.white.bold,
    tokens['remote-addr'](req, res).replace('::ffff:', ''),
    method,
    tokens.url(req, res),
    `${code} ${status}`,
    responseTime
  ];

  if (req.headers.authorization) {
    if (req.headers.authorization.length > 20) {
      response.push(`Authorization: ${req.headers.authorization.substring(0, 12)}...${req.headers.authorization.substring(req.headers.authorization.length - 5)}`);
    } else {
      response.push(`Authorization: ${req.headers.authorization}`);
    }
  }

  // console.log(response.join(' '));
  // log.debug(response.join('\t').replace(new RegExp(/\\(e|[0-9]{0,3})\[[0-9]{0,2}m/, 'gm'), ''));
  // log.debug(response.join('\t').replace('\x1b', ''));
  log.debug(response.join('\t').replace(new RegExp('[\x1b]{1}[\[]{1}[0-9]{1,2}m', 'gm'), ''));

  return null;

});

// co.setTheme({
//   log: ['black', 'bold'],
//   info: ['white', 'bold', 'bgBlue'],
//   ok: ['white', 'bold', 'bgGreen'],
//   warn: ['white', 'bold', 'bgYellow'],
//   error: ['white', 'bold', 'bgRed'],
//   panic: ['white', 'bold', 'bgRed', 'inverse']
// });

// function log(e: any, label = '') {
//   // @ts-ignore
//   console.log(label.log || '[LOG]'.log, e);
// }

// function info(e: any, label = '') {
//   // @ts-ignore
//   console.log(label.info || '[INFO]'.info, e);
// }

// function ok(e: any, label = '') {
//   // @ts-ignore
//   console.log(label.ok || '[OK]'.ok, e);
// }

// function warn(e: any, label = '') {
//   // @ts-ignore
//   console.log(label.warn || '[WARNING]'.warn, e);
// }

// function error(e: any, label = '') {
//   // @ts-ignore
//   console.log(label.error || '[ERROR]'.error, e);
// }

// function panic(e: any, label = '') {
//   // @ts-ignore
//   console.log(label.panic || '[PANIC]'.panic, e);
// }

export {
  requests,
  // log,
  // info,
  // ok,
  // warn,
  // error,
  // panic
};
