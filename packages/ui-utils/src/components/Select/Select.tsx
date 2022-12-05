import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react';
import { HelperMessage } from '../HelperMessage/HelperMessage';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends ChakraSelectProps {
  options?: Array<SelectOption>;
  label?: string;
  helperMessage?: string;
  error?: boolean;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  helperMessage,
  error,
  required,
  name,
  ...rest
}) => {
  return (
    <FormControl isInvalid={error} isRequired={required}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraSelect name={name} {...rest}>
        {options &&
          options.map(option => (
            <option key={`${name || 'select'}-option-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
      </ChakraSelect>
      {helperMessage && <HelperMessage message={helperMessage} error={error} />}
    </FormControl>
  );
};
