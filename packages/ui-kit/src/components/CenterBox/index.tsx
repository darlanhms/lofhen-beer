import React from 'react';
import { Box } from '@mui/material';

export const CenterBox = ({ children }: React.PropsWithChildren): React.ReactElement => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {children}
    </Box>
  );
};
