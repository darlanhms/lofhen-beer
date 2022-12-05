import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { HelperMessage } from '../HelperMessage/HelperMessage';

export interface InputProps extends ChakraInputProps {
  label?: string;
  helperMessage?: string;
  error?: boolean;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, helperMessage, error, required, ...rest }) => {
  return (
    <FormControl isInvalid={error} isRequired={required}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraInput {...rest} />
      {helperMessage && <HelperMessage message={helperMessage} error={error} />}
    </FormControl>
  );
};
