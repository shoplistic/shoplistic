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

  const barcode = req.body.barcode ? String(req.body.barcode).trim() : '';
  const display_name = req.body.display_name ? String(req.body.display_name).trim() : '';
  const manufacturer = req.body.manufacturer ? String(req.body.manufacturer).trim() : '';
  const amount = req.body.amount ? Number(req.body.amount) : 0;

  if (display_name.length > 3 && amount > 0) {

      // @ts-ignore
      User.findById(req.userId, (err, user) => {

        if (err) {

          res.status(500).json({
            message: 'Inernal Server Error'
          });

        } else if (user) {

          user.shoppingList.push({
            barcode: barcode,
            display_name: display_name,
            manufacturer: manufacturer,
            amount: amount
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

  const itemId = req.body.id ? String(req.body.id).trim() : '';

  if (itemId) {

    // @ts-ignore
    User.findById(req.userId, (err, user) => {

      if (err) {

        res.status(500).json({
          message: 'Internal Server Error'
        });

      } else if (user) {

        for (let i = 0; i < user.shoppingList.length; i++) {

          if (String(user.shoppingList[i]._id) === String(itemId)) {

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
