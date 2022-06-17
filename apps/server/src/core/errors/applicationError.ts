import { RequestApplicationError, RequestErrorType } from '@core/types/requestErrors';
import RequestError from './requestError';

export default abstract class ApplicationError extends RequestError {
  type = RequestErrorType.APPLICATION_ERROR;

  constructor(public message: string) {
    super();
  }

  serialize(): RequestApplicationError {
    return {
      type: this.type,
      message: this.message,
    };
  }
}
