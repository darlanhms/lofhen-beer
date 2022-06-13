import { Interpolation } from '@emotion/react';
import { Theme } from '@mui/material';

const globalStyles: Interpolation<Theme> = {
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  '#__next': {
    width: '100%',
    height: '100%',
    msTextSizeAdjust: '100%',
    webkitOverflowScrolling: 'touch',
  },
  html: {
    width: '100%',
    height: '100%',
    msTextSizeAdjust: '100%',
    webkitOverflowScrolling: 'touch',
  },
  body: {
    width: '100%',
    height: '100%',
    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
      width: 8,
      height: 6,
    },
    '&::-webkit-scrollbar-thumb, & ::-webkit-scrollbar-thumb': {
      border: 'none',
      borderRadius: 8,
    },
  },
  '#root': {
    width: '100%',
    height: '100%',
  },
  input: {
    '&[type=number]': {
      MozAppearance: 'textfield',
      '&::-webkit-outer-spin-button': { margin: 0, WebkitAppearance: 'none' },
      '&::-webkit-inner-spin-button': { margin: 0, WebkitAppearance: 'none' },
    },
  },

  img: {
    display: 'block',
    maxWidth: '100%',
  },

  // Lazy Load Img
  '.blur-up': {
    WebkitFilter: 'blur(5px)',
    filter: 'blur(5px)',
    transition: 'filter 400ms, -webkit-filter 400ms',
  },
  '.blur-up.lazyloaded ': {
    WebkitFilter: 'blur(0)',
    filter: 'blur(0)',
  },
};

export default globalStyles;
