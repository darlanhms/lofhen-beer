import { Box, Typography, Stack } from '@mui/material';

interface HeaderTitleProps {
  title: string;
  children?: React.ReactNode;
}

const HeaderTitle = ({ title, children }: HeaderTitleProps): React.ReactElement => {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3.0, mt: 2.5 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{title}</Typography>
      </Box>

      <Box sx={{ flexShrink: 0 }}>{children}</Box>
    </Stack>
  );
};

export default HeaderTitle;
