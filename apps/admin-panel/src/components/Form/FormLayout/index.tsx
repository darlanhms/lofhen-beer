import { Box, Card, Container, IconButton, Typography } from '@mui/material';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface FormLayoutProps extends React.PropsWithChildren {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children, title, subtitle, onBack }) => {
  const componentsToRender: Array<React.ReactNode> = [];

  if (onBack && title) {
    componentsToRender.push(
      <Box key="header" display="flex" alignItems="center">
        <IconButton onClick={onBack}>
          <AiOutlineArrowLeft size={20} color="#333" />
        </IconButton>
        <Typography sx={{ ml: 0.5 }} variant="h4">
          {title}
        </Typography>
      </Box>,
    );
  } else if (title) {
    componentsToRender.push(
      <Typography key="title" variant="h4">
        {title}
      </Typography>,
    );
  }

  if (subtitle) {
    componentsToRender.push(
      <Typography key="subtitle" variant="subtitle1">
        {subtitle}
      </Typography>,
    );
  }

  return (
    <Container maxWidth="xl">
      <Card sx={{ padding: '30px' }}>
        <Box sx={{ flexGrow: 1, mb: 2 }}>{componentsToRender}</Box>
        {children}
      </Card>
    </Container>
  );
};

export default FormLayout;
