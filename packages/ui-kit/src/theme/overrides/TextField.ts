import { Components } from '@mui/material';

export function TextFieldOverride(): Components {
  return {
    MuiInputBase: {
      styleOverrides: {
        input: {
          height: '15px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          lineHeight: '16px',
        },
      },
    },
  };
}
