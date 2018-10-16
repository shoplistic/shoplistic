import { Router, json as bodyParser } from 'express';
import * as User from '../models/User';
import * as log from '../../../logger';
// import { bearerGuard } from '../guards/bearer';

const router = Router();

router.use(bodyParser());

router.post('/', (req, res) => {

  const body = req.body;

  if (
    body.username &&
    body.username.match(/^[a-z0-9_-]{4,20}$/) &&
    body.password &&
    body.password.length >= 8 &&
    body.password.length <= 1024 &&
    body.password === body.password_repeat
  ) {

    User.findOne({ username: body.username }, (err, user) => {

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

            console.log(_);
            res.status(201).json({
              message: 'Created'
            });

          }

        });

      }

    });

  } else if (body.password !== body.passwordRepeat) {

    res.status(422).json({
      message: 'Unprocessable Entity'
    });

  } else {

    res.status(400).json({
      message: 'Bad Request'
    });

  }

});

// router.delete('/', (req, res) => {
// });

export = router;
