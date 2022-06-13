import { Control, Controller, FieldValues } from 'react-hook-form';
import { Input, InputProps } from '@lofhen/ui-kit';

export interface FormInputProps {
  name: string;
  control: Control<FieldValues, any>;
}

const FormInput = ({ name, control, ...rest }: FormInputProps & InputProps): React.ReactElement => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input errorMessage={error?.message} {...rest} {...field} />
      )}
    />
  );
};

export default FormInput;
