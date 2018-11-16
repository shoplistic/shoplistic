import { Router, /* json as bodyParser */ } from 'express';
import * as User from '../models/User';
import * as process from 'process';
import { Client } from 'pg';
import { pgConf } from '../config';
import { bearerGuard } from '../guards/bearer';
import { adminGuard } from '../guards/admin';

interface Stats {
  bcds_entries: number | null;
  registerd_users: number | null;
  uptime: number;
}

const router = Router();

// router.use(bodyParser());

router.get('/stats', bearerGuard, adminGuard, async (_req, res) => {

  const stats: Stats = {
    bcds_entries: null,
    registerd_users: null,
    uptime: Math.floor(process.uptime())
  };

  // Get the amount of items in the bacrcode data store
  const db = new Client(pgConf);
  db.connect();
  const bcds_entries_query = await db.query('SELECT COUNT(*) FROM products');
  db.end();
  stats.bcds_entries = bcds_entries_query.rows[0].count;

  // Get the amount of registed users
  const registerd_users = await User.countDocuments({});
  stats.registerd_users = registerd_users;

  res.status(200).json(stats);

});

export = router;
