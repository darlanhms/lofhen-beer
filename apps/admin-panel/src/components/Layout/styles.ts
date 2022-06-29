import { Drawer, ListItemButton, Box, styled, Divider, AppBar, IconButton } from '@mui/material';

export const MenuDrawer = styled(Drawer)({
  '& .MuiPaper-root': {
    backgroundColor: '#131313',
    width: 270,
  },
});

export const DrawerContentBox = styled(Box)({
  padding: 8,
  paddingBottom: 0,
  alignItems: 'center',
  color: 'white',
  display: 'flex',
});

export const DrawerOption = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  '& .MuiListItemIcon-root': {
    minWidth: 40,
    marginBottom: 3,
  },
  '& .MuiListItemText-root': {
    alignItems: 'center',
  },
}));

export const InfosDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
}));

export const PageContainer = styled(Box)(({ theme }) => ({
  marginLeft: 270,
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

export const NavBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  left: 0,
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - 8px)`,
  },
  right: 'auto',
  color: 'inherit',
}));

export const UserIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.grey[600],
  textDecoration: 'none',
  padding: 9,
  ':hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));
