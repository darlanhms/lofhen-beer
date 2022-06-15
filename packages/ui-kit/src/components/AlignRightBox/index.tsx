import React from 'react';
import { Box } from '@mui/material';

export const AlginRightBox = ({ children }: React.PropsWithChildren): React.ReactElement => {
  return (
    <Box display="flex" alignItems="center" justifyContent="right">
      {children}
    </Box>
  );
};
