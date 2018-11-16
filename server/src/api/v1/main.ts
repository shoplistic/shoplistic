import { Router } from 'express';
import { mongoConf } from './config';
import * as process from 'process';
import * as mongoose from 'mongoose';
import * as log from '../../logger';

// Endpoints
import * as swagger from './endpoints/swagger';
import * as bcds from './endpoints/bcds';
import * as user from './endpoints/user';
import * as auth from './endpoints/auth';
import * as profile from './endpoints/profile';
import * as shoppinglist from './endpoints/shoppinglist';
import * as admin from './endpoints/admin';

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
    process.exit(-1);
  });

const router = Router();

router.use('/docs', swagger);
router.use('/bcds', bcds);
router.use('/user', user);
router.use('/auth', auth);
router.use('/profile', profile);
router.use('/shoppinglist', shoppinglist);
router.use('/admin', admin);

router.get('/', (_req, res) => {
  res.redirect('/v1/docs');
});

export = router;
