import { StatusCodes } from 'http-status-codes';
import { RequestErrorType, GenericRequestError } from '@core/types/requestErrors';

export default abstract class RequestError {
  abstract status: StatusCodes;

  abstract type: RequestErrorType;

  abstract serialize(): GenericRequestError;
}
