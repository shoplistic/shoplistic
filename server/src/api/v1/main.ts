import { Router } from 'express';
import { exit } from 'process';
import { mongoConf } from './config';
import * as mongoose from 'mongoose';
import * as log from '../../logger';

import * as swagger from './endpoints/swagger';
import * as bcds from './endpoints/bcds';
import * as user from './endpoints/user';
import * as auth from './endpoints/auth';

// Connect to Mongodb
mongoose
  .connect(
    mongoConf,
    { useNewUrlParser: true, connectTimeoutMS: 1000 }
  )
  .then(e => log.info(`Mongodb connected to ${e.connection.db.databaseName}`))
  .catch(e => {
    log.panic(e);
    log.panic('Exiting due to db connnection error...');
    exit(-1);
  });

const router = Router();

router.use('/docs', swagger);
router.use('/bcds', bcds);
router.use('/user', user);
router.use('/auth', auth);

router.get('/', (_req, res) => {
  res.redirect('/v1/docs');
});

export = router;
