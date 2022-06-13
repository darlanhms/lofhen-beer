import axios from 'axios';
import { isApplicationError, isValidationError } from './typeGuard';

export function formatErrorMessage(error: unknown): string {
  const fallbackMessage = 'Um erro inesperado aconteceu';

  if (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const responseError = error.response;

        if (responseError.data && isApplicationError(responseError.data)) {
          return responseError.data.message;
        }

        if (responseError.data && isValidationError(responseError.data)) {
          return responseError.data.fields.map(({ message }) => message).join(', ');
        }

        return `${responseError.status} - ${responseError.statusText}`;
      }
    }

    if (error instanceof Error) {
      return error.message;
    }
  }

  return fallbackMessage;
}
