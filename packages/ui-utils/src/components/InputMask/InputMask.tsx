import React from 'react';
import { PatternFormat, PatternFormatProps } from 'react-number-format';
import { InputProps, Input } from '../Input/Input';

export interface InputMaskProps extends PatternFormatProps {
  inputProps?: InputProps;
}

export const InputMask: React.FC<InputMaskProps> = ({ inputProps, ...rest }) => {
  return <PatternFormat autoComplete="on" customInput={Input as any} {...rest} {...(inputProps as any)} />;
};
