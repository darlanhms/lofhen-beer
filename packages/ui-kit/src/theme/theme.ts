import { createTheme } from '@mui/material';
import { TextFieldOverride } from './overrides/TextField';

function pxToRem(value: number): string {
  return `${value / 16}rem`;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF8833',
    },
    success: {
      light: '#76CE7F',
      main: '#19AF28',
      dark: '#007D0C',
    },
    error: {
      light: '#C90A1B',
      main: '#960814',
      dark: '#75060F',
    },
    grey: {
      100: '#F9FAFB',
      200: '#F4F6F8',
      300: '#DFE3E8',
      400: '#C4CDD5',
      500: '#919EAB',
      600: '#637381',
      700: '#454F5B',
      800: '#212B36',
      900: '#161C24',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 600,
      lineHeight: 80 / 64,
      fontSize: pxToRem(40),
    },
    h2: {
      fontWeight: 600,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
    },
    h3: {
      lineHeight: 1.5,
      fontWeight: 600,
      fontSize: pxToRem(24),
    },
    h4: {
      lineHeight: 1.5,
      fontWeight: 600,
      fontSize: pxToRem(20),
    },
    h5: {
      lineHeight: 1.5,
      fontWeight: 600,
      fontSize: pxToRem(18),
    },
    h6: {
      fontWeight: 600,
      lineHeight: 28 / 18,
      fontSize: pxToRem(17),
    },
    subtitle1: {
      fontSize: pxToRem(16),
      lineHeight: 1.5,
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: pxToRem(14),
      lineHeight: 22 / 14,
      fontWeight: 600,
    },
    body1: {
      fontSize: pxToRem(16),
      lineHeight: 1.5,
    },
    body2: {
      fontSize: pxToRem(14),
      lineHeight: 22 / 14,
    },
    caption: {
      fontSize: pxToRem(12),
      lineHeight: 1.5,
    },
    overline: {
      fontSize: pxToRem(12),
      lineHeight: 1.5,
      fontWeight: 700,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
    },
    button: {
      fontWeight: 700,
      lineHeight: 24 / 14,
      fontSize: pxToRem(14),
      textTransform: 'capitalize',
    },
  },
});

theme.components = {
  ...TextFieldOverride(),
};

export default theme;
