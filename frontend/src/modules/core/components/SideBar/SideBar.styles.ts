import {
  styled,
  type Theme,
  type CSSObject,
  type SxProps,
} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";

//Transiciones y estilos del Sidebar
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

export const DrawerHeader = styled("div")(({ theme }) => ({
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

export const AppBar = styled(MuiAppBar, {
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
        background: "red",
      },
    },
  ],
}));

export const Drawer = styled(MuiDrawer, {
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

export const titleGastosSx = (open: boolean): SxProps<Theme> => ({
  display: open ? "flex" : "none",
  justifyContent: "start",
  fontWeight: "bold",
});

//Estilos css ListNav
export const listItemButton = (
  open: boolean,
  isActive: boolean
): SxProps<Theme> => ({
  minHeight: { xs: 80, sm: 48 },
  width: { xs: "100dvw" },
  px: { xs: 10, sm: 2.5 },
  transition: "all 0.3s ease",
  backgroundColor: isActive ? "primary.main" : "transparent",
  color: isActive ? "white" : "inherit",

  "&:hover": {
    backgroundColor: isActive ? "primary.dark" : "action.hover",
  },
  ...(open ? { justifyContent: "initial" } : { justifyContent: "center" }),
});

export const listItemIcon = (open: boolean, isActive: boolean) => ({
  minWidth: 0,
  justifyContent: "center",
  transition: "margin 0.3s ease",
  color: isActive ? "white" : "inherit",
  ...(open ? { mr: 3 } : { mr: "auto" }),
});
