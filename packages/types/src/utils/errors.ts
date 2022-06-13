export interface ApplicationError {
  type: 'applicationError';
  message: string;
}

export interface ValidationError {
  type: 'validationError';
  fields: Array<{
    field: string;
    message: string;
  }>;
}

export type RequestError = ApplicationError | ValidationError;
