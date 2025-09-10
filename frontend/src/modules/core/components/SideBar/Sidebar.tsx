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
  titleGastos,
  containerListMenu,
} from "./SideBar.styles";
import SideBarMovil from "./SideBarMovil";

interface Props {
  children: React.ReactNode;
}

export default function SideBar({ children }: Props) {
  const { toggleDrawer, open } = useDashboardLayout();

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "block", sm: "none" },
        }}>
        <SideBarMovil children={children} />
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box component="p" sx={titleGastos(open)}>
            Control de Gastos
          </Box>

          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            edge="end"
            sx={{ margin: open ? "" : "auto" }}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <Box component="div" sx={containerListMenu}>
          <ListNav open={open} />

          {children}
        </Box>
      </Drawer>
    </>
  );
}
