import React, { useEffect, useRef, useState } from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type AdornmentPositions = 'start' | 'end';

interface SpecificProps {
  errorMessage?: string;
  adornmentPosition?: AdornmentPositions;
  adornmentIcon?: React.ReactNode;
  isTouched?: boolean;
}

export type InputProps = SpecificProps & TextFieldProps;

export const Input = React.forwardRef(
  ({
    errorMessage,
    type,
    adornmentPosition,
    adornmentIcon,
    defaultValue,
    autoFocus,
    isTouched,
    ...rest
  }: InputProps): React.ReactElement => {
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

      function handlerFocusEvent(evt: Event) {
        const inputValue = (evt.currentTarget as HTMLInputElement).value;
        if (!inputValue) setShrink(true);
      }

      function handlerBlurEvent(evt: Event) {
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

    useEffect(() => {
      if (isTouched && !shrink && inputRef.current?.value) {
        setShrink(true);
      }
    }, [isTouched, inputRef]);

    return (
      <>
        <TextField
          error={!!errorMessage || rest.error}
          fullWidth
          InputLabelProps={{ shrink, ...rest.InputLabelProps }}
          autoComplete="on"
          type={type === 'password' ? passwordInputType : type}
          helperText={errorMessage || ' '}
          {...rest}
          onChange={e => {
            if (rest.onChange) {
              rest.onChange(e);
            }
          }}
          InputProps={{ ...rest.InputProps, [adornmentPositionKey]: adornment, inputRef }}
        />
      </>
    );
  },
);
