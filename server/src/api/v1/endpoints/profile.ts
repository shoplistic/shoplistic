import { Router, json as bodyParser } from 'express';
import * as User from '../models/User';
import * as bcrypt from 'bcrypt';
// import * as log from '../../../logger';
import { bearerGuard } from '../guards/bearer';

const router = Router();

router.use(bodyParser());

// Get user data
router.get('/', bearerGuard, (req, res) => {

  // @ts-ignore
  User.findById(req.userId, (err, user) => {

    if (err) {

      res.status(500).json({
        message: 'Inernal Server Error'
      });

    } else if (user) {

      // Don't respond with all properties
      const { username, registerDate } = user;

      res.json({
        username,
        registerDate
      });

    } else {

      res.status(401).json({
        message: 'Unathorized'
      });

    }

  });

});

// Update users profile
// router.patch('/', (req, res) => {
// });

// Update users password
router.patch('/password', bearerGuard, (req, res) => {

  const old_password: string = req.body.old_password ? String(req.body.old_password) : '';
  const new_password: string = req.body.old_password ? String(req.body.new_password) : '';
  const password_repeat: string = req.body.old_password ? String(req.body.password_repeat) : '';

  if (old_password.length >= 8 && new_password.length >= 8 && new_password === password_repeat) {

    // @ts-ignore
    User.findById(req.userId, (err, user) => {

      if (err) {

        res.status(500).json({
          message: 'Internal Server Error'
        });

      } else if (user) {

        // Check if the current password is correct
        if (bcrypt.compareSync(old_password, user.hash)) {

          // This does not yet work.
          // https://github.com/Automattic/mongoose/issues/5643
          // User.findByIdAndUpdate(user._id, { password: new_password }, { new: true }, (err, new_user) => {

          //   if (err) {

          //     res.status(500).json({
          //       message: 'Internal Server Error'
          //     });

          //   } else if (new_user) {

          //     res.json({
          //       message: 'Ok'
          //     });

          //   } else {

          //     res.status(500).json({
          //       message: 'Internal Server Error'
          //     });

          //   }

          // });

          // Workaround
          // @ts-ignore
          user.password = new_password;
          user.save();

          res.status(200).json({
            message: 'Ok'
          });

        } else {

          res.status(401).json({
            message: 'Unauthorized',
            logout: false
          });

        }

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
