import React, { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaChevronDown, FaChevronRight, FaHome, FaUser, FaMapMarkedAlt } from 'react-icons/fa';
import { HiChevronRight } from 'react-icons/hi';
import { isMobile } from '@lofhen/utils';
import {
  Box,
  Collapse,
  Hidden,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import bannerImg from 'assets/images/banner.png';
import useSidebar from 'hooks/useSidebar';

import useUser from 'hooks/useUser';
import {
  DrawerContentBox,
  DrawerOption,
  InfosDivider,
  MenuDrawer,
  NavBar,
  PageContainer,
  UserIconButton,
} from './styles';

interface LayoutProps {
  children: React.ReactNode;
}

interface SingleRoute {
  path: string;
  label: string;
  Icon: IconType;
}

interface RouteWithNested {
  label: string;
  Icon: IconType;
  routes: Array<SingleRoute>;
}

interface IRoute {
  path?: string;
  label: string;
  Icon: IconType;
  routes?: Array<IRoute>;
}

const routes: Array<IRoute> = [
  {
    path: '/admin',
    label: 'Início',
    Icon: FaHome,
  },
  {
    path: '/admin/customers',
    label: 'Clientes',
    Icon: BsFillPeopleFill,
  },
  {
    label: 'Endereços',
    Icon: FaMapMarkedAlt,
    routes: [
      {
        path: '/admin/addresses',
        label: 'Endereços Entrega',
        Icon: HiChevronRight,
      },
      {
        path: '/admin/cities',
        label: 'Cidades',
        Icon: HiChevronRight,
      },
    ],
  },
  {
    path: '/admin/users',
    label: 'Usuários',
    Icon: FaUser,
  },
];

interface SingleRouteProps {
  route: SingleRoute;
  isSubRoute?: boolean;
}

const SingleRoute = ({ route: { path, label, Icon }, isSubRoute }: SingleRouteProps): React.ReactElement => {
  const { pathname } = useRouter();
  const { setOpen } = useSidebar();

  const handleClickLink = useCallback(() => {
    if (isMobile()) {
      setOpen(false);
    }
  }, []);

  return (
    <Link key={path} href={path} onClick={handleClickLink} style={{ textDecoration: 'none' }}>
      <DrawerOption sx={{ ...(isSubRoute ? { pl: 4 } : {}) }} selected={pathname === path}>
        <ListItemIcon>
          <Icon color="white" size="20" />
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </DrawerOption>
    </Link>
  );
};

interface NestedRouteProps {
  route: RouteWithNested;
}

const NestedRoute = ({ route: { Icon, label, routes: nestedRoutes } }: NestedRouteProps) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // set open if entered url pathname manually and it's a nested route
    nestedRoutes.forEach(route => {
      if (router.pathname.match(route.path) && !open) {
        setOpen(true);
      }
    });

    // set false when change pages and it's not a nested route anymore
    const matchingRoute = nestedRoutes.find(route => router.pathname.match(route.path));
    if (!matchingRoute && open) {
      setOpen(false);
    }
  }, [router]);

  return (
    <>
      <DrawerOption onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <Icon color="white" size="20" />
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
        {open ? <FaChevronDown color="white" size="14" /> : <FaChevronRight color="white" size="14" />}
      </DrawerOption>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {nestedRoutes.map(route => (
            <SingleRoute key={`nested_route_${route.label}`} isSubRoute route={route} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

interface DrawerRouteProps {
  route: IRoute;
}

const DrawerRoute = ({ route }: DrawerRouteProps): React.ReactElement => {
  if (route.path) {
    return <SingleRoute route={route as SingleRoute} />;
  }

  if (route.routes) {
    return <NestedRoute route={route as RouteWithNested} />;
  }

  return <></>;
};

const DrawerContent = (): React.ReactElement => {
  const { user } = useUser();

  return (
    <>
      <DrawerContentBox>
        <Box sx={{ mr: 2.3, ml: 1.5 }}>
          <Image src={bannerImg} height={50} width={50} />
        </Box>
        <Box>
          <Typography variant="subtitle1">{user && user.name}</Typography>
          <Typography variant="subtitle2">{user && user.username}</Typography>
        </Box>
      </DrawerContentBox>

      <InfosDivider variant="middle" sx={{ mt: 1 }} />

      <List>
        {routes.map(route => (
          <DrawerRoute key={`sibebar_link_${route.label}`} route={route} />
        ))}
      </List>
    </>
  );
};

const Layout = ({ children }: LayoutProps): React.ReactElement => {
  const { open, setOpen } = useSidebar();

  return (
    <Box>
      <Hidden mdDown>
        <MenuDrawer anchor="left" variant="permanent" open={open} onClose={() => setOpen(!open)}>
          <DrawerContent />
        </MenuDrawer>
      </Hidden>
      <Hidden mdUp>
        <MenuDrawer anchor="left" open={open} onClose={() => setOpen(!open)}>
          <DrawerContent />
        </MenuDrawer>
      </Hidden>
      <PageContainer>
        <Box sx={{ flexGrow: 1 }}>
          <NavBar position="relative">
            <Toolbar>
              <Hidden mdUp>
                <IconButton
                  onClick={() => setOpen(true)}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <AiOutlineMenu size="20" />
                </IconButton>
              </Hidden>

              <Box sx={{ flexGrow: 1 }} />

              <UserIconButton color="inherit">
                <FaUser />
              </UserIconButton>
            </Toolbar>
          </NavBar>
        </Box>
        {children}
      </PageContainer>
    </Box>
  );
};

export default Layout;
