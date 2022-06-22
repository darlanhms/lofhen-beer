import { StatusCodes } from 'http-status-codes';
import ApplicationError from './applicationError';

export default class NotFoundError extends ApplicationError {
  status = StatusCodes.NOT_FOUND;

  constructor(message: string) {
    super(message);
  }
}
