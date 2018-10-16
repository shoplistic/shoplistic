import { Router, json as bodyParser } from 'express';
import * as User from '../models/User';
import * as log from '../../../logger';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
// import { bearerGuard } from '../guards/bearer';

const router = Router();

router.use(bodyParser());

router.post('/', (req, res) => {

  const body = req.body;

  if (body.username && body.password) {

    User.findOne({ username: body.username }, (err, user) => {

      if (err) {

        log.error(err);
        res.status(500).json({
          message: 'Internal Server Error'
        });

      } else if (user) {

        bcrypt.compare(req.body.password, user.password, (err, ok) => {

          if (err) {

            res.status(500).json({
              message: 'Internal Server Error'
            });

          } else if (ok) {

            let payload = { subject: user._id }
            let token = jwt.sign(payload, JWT_SECRET);

            res.json({
              username: user.username,
              bearer: token
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

// router.delete('/', (req, res) => {
// });

export = router;
