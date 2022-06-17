import { StatusCodes } from 'http-status-codes';
import { ValidationError as ClassValidationError } from 'class-validator';
import { RequestErrorType, RequestValidationError } from '@core/types/requestErrors';
import RequestError from './requestError';

export default class ValidationError extends RequestError {
  status = StatusCodes.BAD_REQUEST;

  type = RequestErrorType.VALIDATION_ERROR;

  constructor(private errors: Array<ClassValidationError>) {
    super();
  }

  serialize(): RequestValidationError {
    return {
      type: this.type,
      fields: this.errors.map(err => ({
        message: Object.values(err.constraints || {}).join(', '),
        field: err.property,
      })),
    };
  }
}
