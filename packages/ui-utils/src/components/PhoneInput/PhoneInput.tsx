import React from 'react';
import { InputMask, InputMaskProps } from '../InputMask/InputMask';

export type PhoneInputProps = Omit<InputMaskProps, 'format'>;

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, ...rest }) => {
  return (
    <InputMask
      {...rest}
      valueIsNumericString
      value={value}
      format={String(value || '').length <= 10 ? '(__) ____-____' : '(__) _____-____'}
    />
  );
};
