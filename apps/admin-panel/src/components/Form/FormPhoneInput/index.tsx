import { Controller } from 'react-hook-form';
import { PhoneInput, PhoneInputProps } from '@lofhen/ui-kit';
import { BaseFormInputProps } from '../baseFormInputProps';

interface FormPhoneInputProps extends Omit<PhoneInputProps, 'name'>, BaseFormInputProps {
  label?: string;
}

const FormPhoneInput: React.FC<FormPhoneInputProps> = ({ name, control, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <PhoneInput inputProps={{ errorMessage: error?.message }} {...rest} {...field} />
      )}
    />
  );
};

export default FormPhoneInput;
