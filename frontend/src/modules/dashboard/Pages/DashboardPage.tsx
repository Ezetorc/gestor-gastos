import { Container } from "@mui/material";

import SideBar from "@/modules/core/components/SideBar/Sidebar";
import Button from "@mui/material/Button";
import React from "react";
import Modal from "../../core/components/Modal/Modal";
import { SnackbarProvider } from "notistack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Outlet } from "react-router-dom";
import { buttonOpenMenu } from "@/modules/core/components/SideBar/SideBar.styles";

const DashboardPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container
      maxWidth="xl"
      sx={(theme) => ({
        display: "flex",
        background: theme.palette.secondary.main,
        minHeight: "100dvh",
        mt: { xs: 8, sm: 0 },
      })}>
      <SnackbarProvider>
        <SideBar>
          <Button onClick={handleOpen} sx={buttonOpenMenu}>
            <AddCircleOutlineIcon />
          </Button>
        </SideBar>
        <Outlet />
        <Modal open={open} handleClose={handleClose} />
      </SnackbarProvider>
    </Container>
  );
};
export default DashboardPage;
