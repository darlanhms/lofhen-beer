import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import React from 'react';
import theme from '../../theme/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): React.ReactElement => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
