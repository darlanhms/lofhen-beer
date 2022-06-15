import { Controller } from 'react-hook-form';
import { Input, InputProps } from '@lofhen/ui-kit';
import { BaseFormInputProps } from '../baseFormInputProps';

const FormInput = ({ name, control, ...rest }: BaseFormInputProps & InputProps): React.ReactElement => {
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
