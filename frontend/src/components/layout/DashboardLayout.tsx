import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import { NavLink, Outlet } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

interface DashBoardIcons {
  id: string;
  name: string;
  icon: React.ReactNode;
  link: string;
}

export default function MiniDrawer() {
  const dashBoardIcons: DashBoardIcons[] = [
    {
      id: "1",
      name: "DashBoard",
      icon: <DashboardIcon />,
      link: "/dashboard",
    },
    {
      id: "2",
      name: "Ingresos",
      icon: <AlignVerticalBottomIcon />,
      link: "/gastos",
    },
  ];
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    setOpen(window.innerWidth >= 600);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}>
            <MenuIcon
              sx={{
                display: "none",
                [theme.breakpoints.up("sm")]: {
                  display: "block",
                },
              }}
            />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hola, Bienvenido
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box
            component="p"
            sx={{
              display: open ? "flex" : "none",
              justifyContent: "center",
              fontWeight: "bold",
            }}>
            Control de Gastos
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {dashBoardIcons.map((items) => (
            <NavLink
              key={items.id}
              to={items.link}
              style={{ textDecoration: "none", color: "inherit" }}>
              {({ isActive }) => (
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={[
                      {
                        minHeight: 48,
                        px: 2.5,
                        transition: "all 0.3s ease",
                        backgroundColor: isActive
                          ? "primary.main"
                          : "transparent",
                        color: isActive ? "white" : "inherit",
                        "&:hover": {
                          backgroundColor: isActive
                            ? "primary.dark"
                            : "action.hover",
                        },
                      },
                      open
                        ? { justifyContent: "initial" }
                        : { justifyContent: "center" },
                    ]}>
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: "center",
                          transition: "margin 0.3s ease",
                          color: isActive ? "white" : "inherit",
                        },
                        open ? { mr: 3 } : { mr: "auto" },
                      ]}>
                      {items.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={items.name}
                      sx={[
                        {
                          transition: "opacity 0.3s ease",
                        },
                        open ? { opacity: 1 } : { opacity: 0 },
                      ]}
                    />
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
