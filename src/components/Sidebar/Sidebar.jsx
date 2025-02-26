import { useState, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext"; // Importa el contexto
import {
  Box, AppBar, Toolbar, Typography, Drawer, Divider, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, IconButton, Menu, MenuItem
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/AssignmentOutlined";
import WorkIcon from "@mui/icons-material/WorkOutlineOutlined";
import StorageIcon from "@mui/icons-material/GridViewOutlined";

const drawerWidth = 250;

const icons = {
  'Solicitudes': <AssignmentIcon />,
  'Tecnicos': <WorkIcon />,
  'Almacen': <StorageIcon />
};

const routes = {
  'Solicitudes': '/',
  'Tecnicos': '/techs',
  'Almacen': '/products'
};

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext); // Obtiene el usuario y logout
  const [activeItem, setActiveItem] = useState("");
  const [anchorEl, setAnchorEl] = useState(null); // Estado para el menú desplegable

  // Abre el menú al hacer clic en el usuario
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Cierra el menú
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* HEADER */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "white"
        }}
      >
        <Toolbar sx={{ height: "70px", display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" noWrap component="div" color="black">
            Header
          </Typography>

          {/* Usuario y Menú Desplegable */}
          {user && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Contenedor para el nombre y el correo en columna */}
              <Box sx={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
                <Typography variant="body1" color="black" fontWeight="bold">
                  {user.nombres}
                </Typography>
                <Typography variant="body2" color="gray">
                  {user.email}
                </Typography>
              </Box>

              <IconButton onClick={handleMenuOpen}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              {/* Menú desplegable */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#1B1A1D",
            color: "white"
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>EPCO</Toolbar>
        <Divider />
        <List>
          {["Solicitudes", "Tecnicos", "Almacen"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={routes[text]}
                onClick={() => setActiveItem(text)}
                sx={{
                  backgroundColor: activeItem === text ? "#333" : "inherit",
                  "&:hover": {
                    backgroundColor: "#444"
                  }
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: "auto", ml: "1rem", mr: "1.5rem" }}>
                  {icons[text]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ textAlign: "left" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
