export enum RequestErrorType {
  VALIDATION_ERROR = 'validationError',
  APPLICATION_ERROR = 'applicationError',
}

interface BaseRequestError {
  type: RequestErrorType;
}

export interface RequestValidationError extends BaseRequestError {
  fields: Array<{
    field: string;
    message: string;
  }>;
}

export interface RequestApplicationError extends BaseRequestError {
  message: string;
}

export interface GenericRequestError extends BaseRequestError {
  [key: string]: any;
}
