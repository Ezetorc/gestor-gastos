import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListNav } from "../ListNav/ListNav";
import {
  AppBar,
  Drawer,
  DrawerHeader,
  titleGastos,
  containerListMenu,
} from "./SideBar.styles";
import SideBarMovil from "./SideBarMovil";
import { Button } from "@mui/material";
import { useState } from "react";
import ModalTransactions from "../Modal/ModalTransactions";
import { useDashboardLayout } from "../../hooks/useSideBar";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export default function SideBar() {
  const { toggleDrawer, open } = useDashboardLayout();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { logout } = useAuth();
  return (
    <>
      <CssBaseline />
      <ModalTransactions open={openModal} handleClose={handleCloseModal} />
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <SideBarMovil handleOpen={handleOpenModal} />
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
        {open && (
          <>
            <Button
              onClick={handleOpenModal}
              sx={{
                backgroundColor: "secondary.main",
                color: "black",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 3,
                mx: 1,
                px: 3,
                py: 1.2,
                boxShadow: 2,
                "&:hover": {
                  backgroundColor: "secondary.dark",
                  boxShadow: 4,
                },
              }}
            >
              Agregar transacción
            </Button>

            <Box
              onClick={() => logout()}
              sx={{
                backgroundColor: "#e63131",
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                py: 1,
                borderRadius: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
                mt: 1,
                mx: 1,
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#c62828",
                  transform: "scale(1.03)",
                  boxShadow: 3,
                },
              }}
            >
              Cerrar sesión
            </Box>
          </>
        )}
      </Drawer>
    </>
  );
}
