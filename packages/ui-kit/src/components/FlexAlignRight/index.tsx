import React from 'react';
import { Box } from '@mui/material';

export const FlexAlignRight = ({ children }: React.PropsWithChildren): React.ReactElement => {
  return (
    <>
      <Box flexGrow={1} />
      {children}
    </>
  );
};
