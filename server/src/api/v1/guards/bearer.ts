import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config';
import * as jwt from 'jsonwebtoken';

export function bearerGuard(req: Request, res: Response, next: NextFunction) {

  if (!req.headers.authorization) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    res.status(401).json({
      message: 'Unauthorized'
    });
    return;
  }

  try {

    let payload = jwt.verify(token, JWT_SECRET);

    if (!payload) {
      res.status(401).json({
        message: 'Unauthorized'
      });
      return;
    }

    // @ts-ignore
    req.userId = payload.subject;

    return next();

  } catch (_e) {

    // log.warn(_e);
    res.status(401).json({
      message: 'Unauthorized'
    });
    return;

  }

}
