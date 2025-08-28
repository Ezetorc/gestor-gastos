import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListNav } from "../ListNav/ListNav";
import { Outlet } from "react-router-dom";
import { useDashboardLayout } from "@/hooks/useDashboardLayout";
import {
  AppBar,
  Drawer,
  DrawerHeader,
  iconMenuSx,
  titleGastosSx,
} from "./SideBar.styles";

export default function SideBar() {
  const theme = useTheme();
  const { handleDrawerOpen, handleDrawerClose, open } = useDashboardLayout();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
   
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box component="p" sx={titleGastosSx(open)}>
            Control de Gastos
          </Box>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={iconMenuSx(open)}>
            <MenuIcon />
          </IconButton>
       
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <ListNav open={open} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
