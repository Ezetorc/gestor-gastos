import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListNav } from "../ListNav/ListNav";
import { useDashboardLayout } from "@/modules/core/hooks/useDashboardLayout";
import { AppBar, Drawer, DrawerHeader, titleGastosSx } from "./SideBar.styles";
import { Toolbar } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export default function SideBar({ children }: Props) {
  const { toggleDrawer, open } = useDashboardLayout();

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ display: { xs: "block", sm: "none" } }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <ListNav open={open} isMobile={true} />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{ display: { xs: "none", sm: "block" } }}>
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: open ? "start" : "center",
            gap: 2,
            px: 2.5,
          }}>
          <Box component="p" sx={titleGastosSx(open)}>
            Control de Gastos
          </Box>

          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ margin: open ? "" : "auto" }}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <Box
          sx={{
            height: "100dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <ListNav open={open} />
          {children}
        </Box>
      </Drawer>
    </>
  );
}
