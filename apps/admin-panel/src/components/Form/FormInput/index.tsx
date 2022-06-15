import { Controller } from 'react-hook-form';
import { Input, InputProps } from '@lofhen/ui-kit';
import { useEffect, useState } from 'react';
import { BaseFormInputProps } from '../baseFormInputProps';

const FormInput = ({ name, control, watch, ...rest }: BaseFormInputProps & InputProps): React.ReactElement => {
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (watch) {
      const subscription: any = watch((value, { name: controlName }) => {
        if (controlName === name) {
          setIsTouched(true);
        }
      });

      return () => subscription.unsubscribe();
    }

    return undefined;
  }, [watch]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched: controlIsTouched } }) => {
        return (
          <Input errorMessage={error?.message} isTouched={isTouched || controlIsTouched} {...rest} {...field} />
        );
      }}
    />
  );
};

export default FormInput;
