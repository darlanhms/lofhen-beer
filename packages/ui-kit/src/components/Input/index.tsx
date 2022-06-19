import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';

type AdornmentPositions = 'start' | 'end';

interface SpecificProps {
  errorMessage?: string;
  adornmentPosition?: AdornmentPositions;
  adornmentIcon?: React.ReactNode;
}

export type InputProps = SpecificProps & TextFieldProps;

export const Input = React.forwardRef(
  ({ errorMessage, type, adornmentPosition, adornmentIcon, ...rest }: InputProps): React.ReactElement => {
    const [showPassword, setShowPassword] = useState(false);

    const passwordInputType = showPassword ? 'text' : 'password';

    const handleShowPassword = () => {
      setShowPassword(show => !show);
    };

    const adornmentPositionKey =
      type === 'password' || adornmentPosition === 'end'
        ? 'endAdornment'
        : adornmentPosition
        ? 'startAdornment'
        : undefined;

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
          autoComplete="on"
          type={type === 'password' ? passwordInputType : type}
          helperText={errorMessage || ' '}
          {...rest}
          InputProps={{
            ...rest.InputProps,
            ...(adornmentPositionKey ? { [adornmentPositionKey]: adornment } : {}),
          }}
        />
      </>
    );
  },
);
