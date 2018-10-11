const concurrently = require('concurrently');
const process = require('process');

if (process.platform !== 'win32') {
  process.stdout.write('\x1b]2; Shopper API Dev Server \x1b\x5c');
}

concurrently([{
    command: 'node_modules/.bin/tsc -p ./ --watch',
    name: 'Typescript',
    prefixColor: ['white', 'bgBlue', 'bold']
  },
  {
    command: 'node_modules/.bin/nodemon ./out/server',
    name: 'Server',
    prefixColor: ['white', 'bgGreen', 'bold']
  }
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3
});
