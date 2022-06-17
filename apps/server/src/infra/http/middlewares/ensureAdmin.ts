import { Role } from '@prisma/client';
import NotAuthorizedError from '@core/errors/notAuthorizedError';
import { NextFunction, Request, Response } from 'express';

export default function ensureAdmin(req: Request, _: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== Role.ADMIN) {
    throw new NotAuthorizedError();
  }

  return next();
}
