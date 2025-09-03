# Transformar SideBar a Header en vista móvil

Para adaptar la interfaz de usuario a dispositivos móviles, el `SideBar` se convertirá en un `Header` horizontal en pantallas pequeñas. A continuación se detallan los cambios necesarios en los archivos correspondientes.

## Archivos a modificar

### 1. `src/modules/core/components/SideBar/Sidebar.tsx`

**Objetivo:** Añadir una `AppBar` que será visible solo en dispositivos móviles y que contendrá la navegación principal.

**Cambios:**

```tsx
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListNav } from "../ListNav/ListNav";
import { useDashboardLayout } from "@/modules/core/hooks/useDashboardLayout";
import {
  AppBar,
  Drawer,
  DrawerHeader,
  titleGastosSx,
} from "./SideBar.styles";
import { Toolbar } from "@mui/material";

export default function SideBar() {
  const { toggleDrawer, open } = useDashboardLayout();

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ display: { xs: "block", sm: "none" } }}>
        <Toolbar sx={{display:"flex", justifyContent:"center"}}>
          <ListNav open={open} isMobile={true}/>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open} sx={{display:{xs:"none", sm:"block"}}}>
        <DrawerHeader sx={{display: "flex", justifyContent:open? "start": "center", gap:2, px:2.5}}>
          <Box component="p" sx={titleGastosSx(open)}>
            Control de Gastos
          </Box>

          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{margin: open? "": "auto"}}
          >
            {!open ? (
               <ChevronRightIcon /> 
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <ListNav open={open} />
      </Drawer>
    </>
  );
}
```

### 2. `src/modules/core/components/ListNav/ListNav.tsx`

**Objetivo:** Modificar el componente `ListNav` para que acepte una nueva propiedad `isMobile` y pueda renderizar la lista de navegación de forma horizontal.

**Cambios:**

```tsx
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import type { DashBoardIcons } from "@/modules/dashboard/types/dashboard-icons";
import { listItemButton, listItemIcon, listMobile } from "../SideBar/SideBar.styles";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

interface Props {
  open: boolean;
  isMobile?: boolean;
}

export const ListNav = ({ open, isMobile = false }: Props) => {
  const dashBoardIcons: DashBoardIcons[] = [
    {
      id: "1",
      name: "Dashboard",
      icon: <DashboardIcon />,
      link: "/",
    },
    {
      id: "2",
      name: "Transacciones",
      icon: <CurrencyExchangeIcon />,
      link: "/transacciones",
    },
  ];

  return (
    <List sx={isMobile ? listMobile : {}}>
      {dashBoardIcons.map((items) => (
        <NavLink
          key={items.id}
          to={items.link}
          style={{ textDecoration: "none", color: "inherit" }}>
          {({ isActive }) => (
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton sx={listItemButton(open, isActive, isMobile)}>
                <ListItemIcon sx={listItemIcon(open, isActive)}>
                  {items.icon}
                </ListItemIcon>
                <ListItemText
                  primary={items.name}
                  sx={[
                    {
                      transition: "opacity 0.3s ease",
                    },
                    open ? { opacity: 1 } : { opacity: 0 },
                    isMobile ? { display: "none" } : {}
                  ]}
                />
              </ListItemButton>
            </ListItem>
          )}
        </NavLink>
      ))}
    </List>
  );
};
```

### 3. `src/modules/core/components/SideBar/SideBar.styles.ts`

**Objetivo:** Añadir los estilos necesarios para la `AppBar` y la lista de navegación horizontal.

**Cambios:**

```ts
import { styled, Theme, CSSObject, type SxProps } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

// ... (código existente)

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // ... (código existente)
}));

// ... (código existente)

//Estilos css ListNav
export const listItemButton = (
  open: boolean,
  isActive: boolean,
  isMobile: boolean = false
): SxProps<Theme> => ({
  minHeight: 48,
  px: 2.5,
  transition: "all 0.3s ease",
  backgroundColor: isActive ? "primary.main" : "transparent",
  color: isActive ? "white" : "inherit",
  "&:hover": {
    backgroundColor: isActive ? "primary.dark" : "action.hover",
  },
  ...(open && !isMobile ? { justifyContent: "initial" } : { justifyContent: "center" }),
});

export const listItemIcon = (open: boolean, isActive: boolean) => ({
  minWidth: 0,
  justifyContent: "center",
  transition: "margin 0.3s ease",
  color: isActive ? "white" : "inherit",
  ...(open ? { mr: 3 } : { mr: "auto" }),
});

export const listMobile: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

```

Con estos cambios, la aplicación será responsive, mostrando un `Header` en vistas móviles y un `SideBar` en vistas de escritorio.