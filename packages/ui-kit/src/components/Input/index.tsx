import React, { useEffect, useRef, useState } from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps, Typography } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type AdornmentPositions = 'start' | 'end';

export interface InputProps {
  errorMessage?: string;
  adornmentPosition?: AdornmentPositions;
  adornmentIcon?: React.ReactNode;
}

export const Input = ({
  errorMessage,
  type,
  adornmentPosition,
  adornmentIcon,
  defaultValue,
  autoFocus,
  ...rest
}: InputProps & TextFieldProps): React.ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [shrink, setShrink] = useState<boolean>(!!defaultValue || !!autoFocus);

  const passwordInputType = showPassword ? 'text' : 'password';

  const handleShowPassword = () => {
    setShowPassword(show => !show);
  };

  const adornmentPositionKey =
    type === 'password' || adornmentPosition === 'end' ? 'endAdornment' : 'startAdornment';

  let adornment: React.ReactNode = <></>;

  if (type === 'password') {
    adornment = (
      <InputAdornment position="end">
        <IconButton onClick={handleShowPassword} edge="end">
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </IconButton>
      </InputAdornment>
    );
  } else if (adornmentIcon) {
    if (adornmentPosition === 'end') {
      adornment = (
        <InputAdornment position={adornmentPosition}>
          <IconButton>{adornmentIcon}</IconButton>
        </InputAdornment>
      );
    } else if (adornmentPosition === 'start') {
      adornment = (
        <InputAdornment position={adornmentPosition} sx={{ marginRight: '10px' }}>
          {adornmentIcon}
        </InputAdornment>
      );
    }
  }

  useEffect(() => {
    const input = inputRef.current;

    function handlerFocusEvent(evt: FocusEvent) {
      const inputValue = (evt.currentTarget as HTMLInputElement).value;
      if (!inputValue) setShrink(true);
    }

    function handlerBlurEvent(evt: FocusEvent) {
      const inputValue = (evt.target as HTMLInputElement).value;
      if (!inputValue) setShrink(false);
    }

    if (input) {
      input.addEventListener('focus', handlerFocusEvent);
      input.addEventListener('blur', handlerBlurEvent);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', handlerFocusEvent);
        input.removeEventListener('blur', handlerBlurEvent);
      }
    };
  }, [inputRef]);

  return (
    <>
      <TextField
        error={!!errorMessage || rest.error}
        fullWidth
        InputLabelProps={{ shrink, ...rest.InputLabelProps }}
        autoComplete="on"
        type={type === 'password' ? passwordInputType : type}
        {...rest}
        InputProps={{ ...rest.InputProps, [adornmentPositionKey]: adornment }}
      />
      {errorMessage ? (
        <Typography color="error" variant="subtitle2">
          {errorMessage}
        </Typography>
      ) : (
        <Typography />
      )}
    </>
  );
};
