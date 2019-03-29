import { Router, json as bodyParser } from 'express';
import * as User from '../models/User';
import * as log from '../../../logger';
import { bearerGuard } from '../guards/bearer';
import fetch from 'node-fetch';
import { env } from 'process';

const router = Router();

router.use(bodyParser());

router.post('/', async (req, res) => {

  // const body = req.body;

  const body = {
    username: req.body.username ? String(req.body.username).trim() : '',
    password: req.body.password ? String(req.body.password) : '',
    password_repeat: req.body.password_repeat ? String(req.body.password_repeat) : '',
    captcha: req.body.captcha ? String(req.body.captcha).trim() : ''
  }

  // Check reCaptcha

  const reRes = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${env.NODE_RE_SECRET_KEY}&response=${body.captcha}`);
  const reData = await reRes.json();

  if (!reData.success) {

    res.status(401).json({
      message: `reCaptcha failed. Please try again.`,
      logout: false
    });

    return;

  }

  // Check if input matches requirements

  if (
    body.username.match(/^[a-zA-Z0-9_-]{4,20}$/) &&
    body.password.length >= 8 &&
    body.password.length <= 1024 &&
    body.password === body.password_repeat
  ) {

    // Ignore username case

    User.findOne({ username: new RegExp(['^', body.username, '$'].join(''), 'i') }, (err, user) => {

      if (err) {

        log.error(err);
        res.status(500).json({
          message: 'Internal Server Error'
        });

      } else if (user) {

        res.status(409).json({
          message: 'Conflict'
        });

      } else {

        User.create({ username: body.username, password: body.password }, (e, _) => {

          if (e) {

            log.error(e);
            res.status(500).json({
              message: 'Internal Server Error'
            });

          } else {

            res.status(201).json({
              message: 'Created'
            });

          }

        });

      }

    });

  } else if (body.password !== body.password_repeat) {

    res.status(422).json({
      message: 'Unprocessable Entity'
    });

  } else {

    res.status(400).json({
      message: 'Bad Request'
    });

  }

});

router.delete('/', bearerGuard, (req, res) => {

  // @ts-ignore
  User.findOneAndDelete({ _id: req.userId }, (err, user) => {

    if (err) {

      res.status(500).json({
        message: 'Internal Server Error'
      });

    } else if (user) {

      // User deleted
      res.status(200).json({
        message: 'Ok'
      });

    } else {

      res.status(401).json({
        message: 'Unauthorized'
      });

    }

  });

});

export = router;
