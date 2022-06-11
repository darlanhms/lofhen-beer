import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserDTO } from 'models/user';

export function currentUser(req: Request, _: Response, next: NextFunction): void {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET as string) as UserDTO;

    req.user = payload;

    return next();
  } catch (error) {
    return next();
  }
}
