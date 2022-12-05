import { FormErrorMessage, FormHelperText } from '@chakra-ui/react';

interface HelperMessageProps {
  message: string;
  error?: boolean;
}

export const HelperMessage: React.FC<HelperMessageProps> = ({ message, error }) => {
  if (error) {
    return <FormErrorMessage>{message}</FormErrorMessage>;
  }

  return <FormHelperText>{message}</FormHelperText>;
};
