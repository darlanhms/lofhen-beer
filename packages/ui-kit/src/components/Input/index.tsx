import React, { useState } from 'react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [shrink] = useState<boolean>(!!defaultValue || !!autoFocus);

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
