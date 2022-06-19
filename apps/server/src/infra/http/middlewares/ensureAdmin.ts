import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import NotAuthorizedError from '@core/errors/notAuthorizedError';

export default function ensureAdmin(req: Request, _: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== Role.ADMIN) {
    throw new NotAuthorizedError();
  }

  return next();
}
