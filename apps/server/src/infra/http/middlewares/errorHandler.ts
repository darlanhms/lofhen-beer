import RequestError from '@core/errors/requestError';
import { NextFunction, Request, Response } from 'express';
import { GenericRequestError, RequestErrorType } from '@core/types/requestErrors';

export const errorHandler = (
  err: GenericRequestError,
  req: Request,
  res: Response,
  _: NextFunction,
): Response => {
  if (err instanceof RequestError) {
    return res.status(err.status).json(err.serialize());
  }

  console.error('Unexpected error: ', err);

  return res.status(500).send({
    type: RequestErrorType.APPLICATION_ERROR,
    message: 'Um erro inesperado aconteceu',
  });
};
