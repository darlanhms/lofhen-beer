import { StatusCodes } from 'http-status-codes';
import { ValidationError as ExpressValidationError } from 'express-validator';
import { RequestErrorType, RequestValidationError } from 'types/requestErrors';
import RequestError from './requestError';

export default class ValidationError extends RequestError {
  status = StatusCodes.BAD_REQUEST;

  type = RequestErrorType.VALIDATION_ERROR;

  constructor(private errors: Array<ExpressValidationError>) {
    super();
  }

  serialize(): RequestValidationError {
    return {
      type: this.type,
      fields: this.errors.map(err => ({
        message: err.msg,
        field: err.param,
      })),
    };
  }
}
