import { Container } from "@mui/material";

import SideBar from "@/modules/core/components/SideBar/Sidebar";
import React from "react";
import Modal from "../../core/components/Modal/Modal";
import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";

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
        <SideBar handleOpen={handleOpen}>
        
        </SideBar>
        <Outlet />
        <Modal open={open} handleClose={handleClose} />
      </SnackbarProvider>
    </Container>
  );
};
export default DashboardPage;
