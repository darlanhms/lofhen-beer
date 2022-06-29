import React from 'react';
import applyStringMask from '../../utils/applyStringMask';
import { InputMask, InputMaskProps } from '../InputMask';

export type PhoneInputProps = Omit<InputMaskProps, 'format'>;

export const PhoneInput: React.FC<PhoneInputProps> = ({ ...rest }) => {
  return (
    <InputMask
      {...rest}
      format={value => {
        if (value.length <= 10) {
          return applyStringMask(value, '(__) ____-____');
        }
        return applyStringMask(value, '(__) _____-____');
      }}
    />
  );
};
