import { Router, json as bodyParser } from 'express';
import { Client } from 'pg';
import { pgConf } from '../config';
import { bearerGuard } from '../guards/bearer';
import { adminGuard } from '../guards/admin';

const router = Router();

router.use(bodyParser());

router.get('/:barcode', bearerGuard, (req, res) => {
  // req.params.barcode
  // Test barcode: 0000
  const db = new Client(pgConf);
  db.connect();
  db.query('SELECT * FROM products WHERE barcode=$1', [req.params.barcode], (error, result) => {

    if (error) {

      res.status(500).json({
        message: 'Internal Server Error'
      });

    } else if (result.rows.length === 1) {

      res.status(200).json(result.rows[0]);

    } else {

      res.status(404).json({
        message: 'Not Found'
      });

    }

    db.end();

  });

});

router.post('/', bearerGuard, adminGuard, (req, res) => {

  const barcode: string = req.body.barcode ? String(req.body.barcode).trim() : '';
  const display_name: string = req.body.display_name ? String(req.body.display_name).trim() : '';
  const manufacturer: string = req.body.manufacturer ? String(req.body.manufacturer).trim() : '';

  if (barcode && display_name && manufacturer) {

    const db = new Client(pgConf);
    db.connect();
    db.query('INSERT INTO products (barcode, display_name, manufacturer) VALUES($1, $2, $3)', [barcode, display_name, manufacturer], (error, result) => {

      if (error) {

        if (error.message.startsWith('duplicate')) {

          res.status(409).json({
            message: 'Conflict'
          });

        } else {

          res.status(500).json({
            message: 'Internal Server Error'
          });

        }

      } else if (result.rowCount === 1) {

        res.status(201).json({
          message: 'Created'
        });

      } else {

        // This should never be called, there is always an error or a response.
        res.status(500).json({
          message: 'Internal Server Error'
        });

      }

      db.end();

    });

  } else {

    res.status(400).json({
      message: 'Bad Request'
    });

  }

});

router.patch('/', bearerGuard, adminGuard, (req, res) => {

  const barcode: string = req.body.barcode ? String(req.body.barcode).trim() : '';
  const display_name: string = req.body.display_name ? String(req.body.display_name).trim() : '';
  const manufacturer: string = req.body.manufacturer ? String(req.body.manufacturer).trim() : '';

  if (barcode && display_name && manufacturer) {

    const db = new Client(pgConf);
    db.connect();
    db.query('UPDATE products SET display_name=$2, manufacturer=$3 WHERE barcode=$1', [barcode, display_name, manufacturer], (error, result) => {

      if (error) {

        res.status(500).json({
          message: 'Internal Server Error'
        });

      } else if (result.rowCount === 1) {

        res.status(200).json({
          message: 'Ok'
        });

      } else {

        res.status(404).json({
          message: 'Not Found'
        });

      }

    });

  } else {

    res.status(400).json({
      message: 'Bad Request'
    });

  }

});

router.delete('/', bearerGuard, adminGuard, (req, res) => {

  const barcode: string = req.body.barcode ? String(req.body.barcode).trim() : '';

  if (barcode) {

    const db = new Client(pgConf);
    db.connect();
    db.query('DELETE FROM products WHERE barcode=$1', [barcode], (error, result) => {

      if (error) {

        res.status(500).json({
          message: 'Internal Server Error'
        });

      } else if (result.rowCount === 1) {

        res.status(200).json({
          message: 'Ok'
        });

      } else {

        res.status(404).json({
          message: 'Not Found'
        });

      }

      db.end();

    });

  } else {

    res.status(400).json({
      message: 'Bad Request'
    });

  }

});

export = router;
