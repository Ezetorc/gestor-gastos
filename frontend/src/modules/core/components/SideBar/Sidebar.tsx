import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListNav } from "../ListNav/ListNav";
import { Outlet } from "react-router-dom";
import { useDashboardLayout } from "@/modules/core/hooks/useDashboardLayout";
import {
  Drawer,
  DrawerHeader,
  iconMenuSx,
  titleGastosSx,
} from "./SideBar.styles";

export default function SideBar() {
  const theme = useTheme();
  const { toggleDrawer, open } = useDashboardLayout();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
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

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
