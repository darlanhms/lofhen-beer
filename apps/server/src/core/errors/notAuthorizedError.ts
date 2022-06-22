import { StatusCodes } from 'http-status-codes';
import ApplicationError from './applicationError';

export default class NotAuthorizedError extends ApplicationError {
  status = StatusCodes.UNAUTHORIZED;

  constructor() {
    super('Não autorizado a realizar a operação');
  }
}
