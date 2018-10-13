import { Router, json as bodyParser } from 'express';
import * as swagger from './endpoints/swagger';
import * as bcds from './endpoints/bcds';

const router = Router();

router.use(bodyParser());

router.use('/docs', swagger);
router.use('/bcds', bcds);

router.get('/', (_req, res) => {
  res.redirect('/v1/docs');
});

export = router;
