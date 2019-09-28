import { Router } from 'express';
import * as git from 'git-rev-sync';
import { exec } from 'child_process';
import * as log from 'solid-log';

const router = Router();

router.get('/', async (_req, res) => {

  const frontendPath = '/frontend/';

  // ! This should really be re-written. This is not nice. Don't write code like this.
  const d = await (async () => {
    return new Promise((resolve, _reject) => {
      exec(`cd ${frontendPath} && git log --no-color -n 1 --pretty=format:"%ad"`, (error, stdout, stderr) => {
        if (error) {
          resolve(0);
          log.error('Failed to get frontend date!');
        } else if (stderr) {
          log.error(stderr);
          resolve(0);
        } else {
          resolve(new Date(stdout).getTime());
        }
      });
    });
  })();

  const frontend = {
    version: git.short(frontendPath),
    updated: d
  }

  const backend = {
    version: git.short(),
    updated: git.date().getTime()
  }

  res.status(200).json({
    frontend,
    backend
  });

});

export = router;

