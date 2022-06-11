import ValidationError from 'errors/validationError';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function validateRequest(req: Request, _: Response, next: NextFunction): void {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    throw new ValidationError(validationErrors.array());
  }

  return next();
}
