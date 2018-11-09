import { Request, Response, NextFunction } from 'express';
import * as User from '../models/User';

export function bcdsWrite(req: Request, res: Response, next: NextFunction) {

  // @ts-ignore
  User.findById(req.userId, (err, user) => {

    if (err) {

      return res.status(500).json({
        message: 'Internal Server Error'
      });

    } else if (user) {

      if (user.permissions.bcdsWrite) {

        return next();

      } else {

        return res.status(401).json({
          message: 'Unauthorized'
        });

      }


    } else {

      return res.status(401).json({
        message: 'Unauthorized'
      });

    }

  });

}
