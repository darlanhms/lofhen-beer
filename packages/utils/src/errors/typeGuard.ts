import { ApplicationError, ValidationError } from '@lofhen/types';

export function isApplicationError(requestError: unknown): requestError is ApplicationError {
  return (requestError as any).type === 'applicationError';
}

export function isValidationError(requestError: unknown): requestError is ValidationError {
  return (requestError as any).type === 'validationError';
}
