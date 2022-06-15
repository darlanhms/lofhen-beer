import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MaterialSelect,
  SelectProps as MaterialSelectProps,
} from '@mui/material';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends MaterialSelectProps {
  options: Array<SelectOption>;
  errorMessage?: string;
}

export const Select: React.FC<SelectProps> = ({ options, errorMessage, name, label, ...rest }) => {
  return (
    <FormControl>
      {label && (
        <InputLabel id={`${name}-select-label`} sx={{ mb: 1 }}>
          {label}
        </InputLabel>
      )}
      <MaterialSelect
        id={`${name}-select`}
        labelId={`${name}-select-label`}
        error={!!errorMessage || rest.error}
        name={name}
        label={label}
        {...rest}
      >
        {options.map(({ label, value }) => (
          <MenuItem key={`${name}-select-option-${value}`} value={value}>
            {label}
          </MenuItem>
        ))}
      </MaterialSelect>
      <FormHelperText color="error">{errorMessage || ' '}</FormHelperText>
    </FormControl>
  );
};
