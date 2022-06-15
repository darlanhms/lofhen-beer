import { Select, SelectProps } from '@lofhen/ui-kit';
import { Controller } from 'react-hook-form';
import { BaseFormInputProps } from '../baseFormInputProps';

const FormSelect: React.FC<BaseFormInputProps & SelectProps> = ({ name, control, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select errorMessage={error?.message} {...field} {...rest} />
      )}
    />
  );
};

export default FormSelect;
