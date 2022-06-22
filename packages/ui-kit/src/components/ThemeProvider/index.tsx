import React from 'react';
import { IconType } from 'react-icons';
import { FaInfoCircle, FaExclamationCircle, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { alpha, Box, GlobalStyles, styled, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { SnackbarProvider, VariantType } from 'notistack';
import { AlertProvider } from '../../hooks/useAlert';
import globalStyles from '../../theme/globalStyles';
import theme from '../../theme/theme';

const renderedGlobalStyles = <GlobalStyles styles={globalStyles} />;

interface ThemeProviderProps {
  children: React.ReactNode;
}

const SnackBarIconBox = styled(Box)(() => ({
  marginRight: '12px',
  width: '20px',
  minWidth: '20px',
  height: '20px',
  minHeight: '20px',
  display: 'flex',
  borderRadius: '12px',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface SnackbarIconProps {
  Icon: IconType;
  color: VariantType;
}

const SnackbarIcon = ({ Icon, color }: SnackbarIconProps): React.ReactElement => {
  return (
    <SnackBarIconBox
      component="span"
      sx={{
        color: `${color}.main`,
        backgroundColor: (theme: any) => alpha(theme.palette[color].main, 0.16),
      }}
    >
      <Icon width={20} height={20} />
    </SnackBarIconBox>
  );
};

export const ThemeProvider = ({ children }: ThemeProviderProps): React.ReactElement => {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        iconVariant={{
          success: <SnackbarIcon Icon={FaCheckCircle} color="success" />,
          error: <SnackbarIcon Icon={FaInfoCircle} color="error" />,
          warning: <SnackbarIcon Icon={FaExclamationTriangle} color="warning" />,
          info: <SnackbarIcon Icon={FaExclamationCircle} color="info" />,
          default: <SnackbarIcon Icon={FaExclamationCircle} color="info" />,
        }}
      >
        <AlertProvider>
          {renderedGlobalStyles}
          {children}
        </AlertProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};
