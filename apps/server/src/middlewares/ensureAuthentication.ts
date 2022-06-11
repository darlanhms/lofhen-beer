import NotAuthorizedError from 'errors/notAuthorizedError';
import { NextFunction, Request, Response } from 'express';

export function requireAuthentication(req: Request, _: Response, next: NextFunction): void {
  if (!req.user) {
    throw new NotAuthorizedError();
  }

  return next();
}