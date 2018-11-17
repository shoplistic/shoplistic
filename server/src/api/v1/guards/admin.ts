import { Request, Response, NextFunction } from 'express';
import { env } from 'process';
import * as User from '../models/User';

export function adminGuard(req: Request, res: Response, next: NextFunction) {

  // @ts-ignore
  User.findById(req.userId, (err, user) => {

    if (err) {

      return res.status(500).json({
        message: 'Internal Server Error'
      });

    } else if (user) {

      const isAdmin = Boolean((env.ADMIN_USERS || '')
      .split(',')
      .filter(e => e.trim())
      .map(e => e.trim())
      .indexOf(user.username) + 1);

      if (isAdmin) {

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
