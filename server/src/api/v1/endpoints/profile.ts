import { Router, json as bodyParser } from 'express';
import * as User from '../models/User';
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
// router.patch('/' (req, res) => {
// });

// Update users password
// router.patch('/password' (req, res) => {
// });

export = router;
