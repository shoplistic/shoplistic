import { Router } from 'express';
import { Client } from 'pg';
import { pgConf } from '../config';
import { bearerGuard } from '../guards/bearer';

const router = Router();

// router.post('/', (req, res) => {
// });

// router.patch('/', (req, res) => {
// });

// router.delete('/', (req, res) => {
// });

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

      res.json(result.rows[0]);

    } else {

      res.status(404).json({
        message: 'Not Found'
      });

    }

    db.end();

  });

});

export = router;