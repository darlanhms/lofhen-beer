import { Components, Theme } from '@mui/material';

export default function ButtonOverride(theme: Theme): Components {
  return {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: theme.palette.common.white,
        },
      },
    },
  };
}
