import { Router, json as bodyParser } from 'express';
import * as User from '../models/User';
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
      const { shoppingList } = user;

      res.status(200).json(shoppingList);

    } else {

      res.status(401).json({
        message: 'Unathorized'
      });

    }

  });

});

router.post('/', bearerGuard, (req, res) => {

  if (
    typeof req.body.barcode === 'string' &&
    req.body.display_name.length > 3 &&
    typeof req.body.manufacturer === 'string' &&
    req.body.amount > 0
    ) {

      // @ts-ignore
      User.findById(req.userId, (err, user) => {

        if (err) {

          res.status(500).json({
            message: 'Inernal Server Error'
          });

        } else if (user) {

          user.shoppingList.push({
            barcode: req.body.barcode,
            display_name: req.body.display_name,
            manufacturer: req.body.manufacturer,
            amount: req.body.amount
          });
          user.save();

          res.status(201).json({
            message: 'Created'
          });

        } else {

          res.status(401).json({
            message: 'Unathorized'
          });

        }

      });

    } else {

      res.status(400).json({
        message: 'Bad Request'
      });

    }

});

// Edit an item in the shopping list
// router.patch('/', bearerGuard, (req, res) => {
// });

// Delete an item frome the shoppinglist
router.delete('/', bearerGuard, (req, res) => {

  if (req.body.id) {

    // @ts-ignore
    User.findById(req.userId, (err, user) => {

      if (err) {

        res.status(500).json({
          message: 'Internal Server Error'
        });

      } else if (user) {

        for (let i = 0; i < user.shoppingList.length; i++) {

          if (String(user.shoppingList[i]._id) === String(req.body.id)) {

            user.shoppingList.splice(i, 1);
            user.save();
            res.status(200).json({
              message: 'Ok'
            });

            return;

          }

        }

        res.status(404).json({
          message: 'Not Found'
        });

      } else {

        res.status(401).json({
          message: 'Unathorized'
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
