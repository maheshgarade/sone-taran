import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomerTable from "../kalams/KalamsTable";

// Import your pages
const Dashboard = () => <h1>Dashboard Page</h1>;
const Kalams = () => <h1><CustomerTable /></h1>;
const Customers = () => <h1>Customers Page</h1>;
const Settings = () => <h1>Settings Page</h1>;
const Calculators = () => <h1>Calculators Page</h1>;
const Logout = () => <h1>Logging Out...</h1>;

const menuItems = [
  { text: "Dashboard", path: "/" },
  { text: "Kalams", path: "/kalams" },
  { text: "Customers", path: "/customers" },
  { text: "Settings", path: "/settings" },
  { text: "Calculators", path: "/calculators" },
  { text: "Log Out", path: "/logout" },
];

const drawerWidth = 240;

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List>
      {menuItems.map(({ text, path }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton component={Link} to={path} onClick={() => isMobile && toggleDrawer()}>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
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
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={toggleDrawer}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          <Box sx={{marginTop: '4rem'}}>{drawerContent}</Box>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kalams" element={<Kalams />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
