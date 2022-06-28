import { filledArray } from '@lofhen/utils';
import { ValidationError as ClassValidationError } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { RequestErrorType, RequestValidationError } from '@core/types/requestErrors';
import RequestError from './requestError';

export default class ValidationError extends RequestError {
  status = StatusCodes.BAD_REQUEST;

  type = RequestErrorType.VALIDATION_ERROR;

  constructor(private errors: Array<ClassValidationError>) {
    super();
  }

  private getDeepErrors(errors: Array<ClassValidationError>): Array<ClassValidationError> {
    const finalErrors: Array<ClassValidationError> = [];

    errors.forEach(error => {
      if (filledArray(error.children)) {
        finalErrors.push(...this.getDeepErrors(error.children));
      } else {
        finalErrors.push(error);
      }
    });

    return finalErrors;
  }

  serialize(): RequestValidationError {
    const finalValidationErrors = this.getDeepErrors(this.errors);

    return {
      type: this.type,
      fields: finalValidationErrors.map(err => ({
        message: Object.values(err.constraints || {}).join(', '),
        field: err.property,
      })),
    };
  }
}
