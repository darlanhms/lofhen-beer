import { StatusCodes } from 'http-status-codes';
import ApplicationError from './applicationError';

export default class BadRequestError extends ApplicationError {
  status = StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}
