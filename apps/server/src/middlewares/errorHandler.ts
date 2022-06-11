import { NextFunction, Request, Response } from 'express';

type RequestError = Error;

export const errorHandler = (err: RequestError, req: Request, res: Response, _: NextFunction): Response => {
  console.error('Unexpected error: ', err);

  return res.status(500).send({
    errors: [{ message: 'Something unexpected occurred' }],
  });
};
