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
  buttonOpenMenu,
} from "./SideBar.styles";
import SideBarMovil from "./SideBarMovil";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Props {
  handleOpen: () => void;
}

export default function SideBar({ handleOpen }: Props) {
  const { toggleDrawer, open } = useDashboardLayout();

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <SideBarMovil handleOpen={handleOpen} />
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
            sx={{ margin: open ? "" : "auto" }}
          >
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <Box component="div" sx={containerListMenu}>
          <ListNav open={open} />
        </Box>
        <Button onClick={handleOpen} sx={buttonOpenMenu}>
          <AddCircleOutlineIcon />
        </Button>
      </Drawer>
    </>
  );
}
