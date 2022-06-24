import { Controller } from 'react-hook-form';
import { Switch, SwitchProps } from '@lofhen/ui-kit';
import { BaseFormInputProps } from '../baseFormInputProps';

const FormSwitch: React.FunctionComponent<BaseFormInputProps & SwitchProps> = ({ control, name, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => <Switch checked={field.value} {...field} {...rest} />}
    />
  );
};

export default FormSwitch;
