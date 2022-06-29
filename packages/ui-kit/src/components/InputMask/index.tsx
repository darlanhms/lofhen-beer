import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { InputProps, Input } from '../Input';

export interface InputMaskProps extends NumberFormatProps {
  inputProps?: Omit<InputProps, 'ref' | 'value' | 'defaultValue' | 'type' | 'size'>;
}

export const InputMask: React.FC<InputMaskProps> = ({ inputProps, ...rest }) => {
  return <NumberFormat fullWidth autoComplete="on" customInput={Input as any} {...rest} {...inputProps} />;
};
