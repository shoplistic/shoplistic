import { Router, json as bodyParser } from 'express';
import { env } from 'process';
import * as User from '../models/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const router = Router();

router.use(bodyParser());

router.post('/', (req, res) => {

  const body = {
    username: req.body.username ? String(req.body.username).trim() : '',
    password: req.body.password ? String(req.body.password) : '',
  }

  if (body.username && body.password) {

    User.findOne({ username: body.username }, (err, user) => {

      if (err) {

        res.status(500).json({
          message: 'Internal Server Error'
        });

      } else if (user) {

        bcrypt.compare(body.password, user.hash, (err, ok) => {

          if (err) {

            res.status(500).json({
              message: 'Internal Server Error'
            });

          } else if (ok) {

            let payload = { subject: user._id }
            let token = jwt.sign(payload, JWT_SECRET);

            res.status(200).json({
              username: user.username,
              bearer: token,
              admin: Boolean((env.ADMIN_USERS || '').split(',').filter(e => e.trim()).map(e => e.trim()).indexOf(user.username) + 1)
            });

          } else {

            res.status(401).json({
              message: 'Unauthorized'
            });

          }

        });

      } else {

        res.status(401).json({
          message: 'Unauthorized'
        });

      }

    });

  } else {

    res.status(400).json({
      message: 'Bad Request'
    });

  }

});

export = router;
