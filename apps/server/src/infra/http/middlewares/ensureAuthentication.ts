import { NextFunction, Request, Response } from 'express';
import NotAuthorizedError from '@core/errors/notAuthorizedError';

export function ensureAuthentication(req: Request, _: Response, next: NextFunction): void {
  if (!req.user) {
    throw new NotAuthorizedError();
  }

  return next();
}
