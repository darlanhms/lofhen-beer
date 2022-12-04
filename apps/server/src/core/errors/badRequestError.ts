import { TRPCError } from '@trpc/server';
import { StatusCodes } from 'http-status-codes';

export default class BadRequestError extends TRPCError {
  status = StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super({
      code: 'BAD_REQUEST',
      message,
    });
  }
}
