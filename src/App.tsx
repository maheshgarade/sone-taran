import { useState, Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Breadcrumbs,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Import icons
import { Dashboard, Settings, Logout } from '@mui/icons-material';

// Import components
import Calculators from './features/calculators/Calculators';
import Customers from './features/customers/Customers';
import KalamDetails from './features/kalams/kalam-details/KalamDetails';
import LogIn from './features/auth/components/login/Login';
import OtpVerify from './features/auth/components/otp-verify/otp-verify';
import Profile from './features/auth/components/profile/Profile';
import PrivateRoute from './features/auth/components/private-route/private-route';

// Lazy load Kalams
const Kalams = lazy(() => import('./features/kalams/Kalams'));
// Sidebar menu items
const menuItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Kalams', path: '/kalams' },
  { text: 'Customers', path: '/customers' },
  { text: 'Settings', path: '/settings' },
  { text: 'Calculators', path: '/calculators' },
  { text: 'Log Out', path: '/logout' },
];

const drawerWidth = 170;

// Breadcrumbs component
const BreadcrumbsComponent = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
          <Link
            key={routeTo}
            to={routeTo}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar drawer content
  const drawerContent = (
    <List>
      {menuItems.map(({ text, path }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton
            component={Link}
            to={path}
            onClick={() => isMobile && toggleDrawer()}
            sx={{
              backgroundColor:
                location.pathname === path ? '#eeeeee' : 'transparent',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
          >
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Sone Taran
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ marginTop: '4rem' }}>{drawerContent}</Box>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 1, mt: 8 }}>
        <BreadcrumbsComponent />

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/otp-verify" element={<OtpVerify />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/kalams"
              element={
                <PrivateRoute>
                  <Kalams />
                </PrivateRoute>
              }
            />
            <Route
              path="/kalams/:id"
              element={
                <PrivateRoute>
                  <KalamDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <PrivateRoute>
                  <Customers />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/calculators"
              element={
                <PrivateRoute>
                  <Calculators />
                </PrivateRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
};

export default App;
