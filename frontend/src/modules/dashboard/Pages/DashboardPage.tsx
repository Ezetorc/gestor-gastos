import { Container } from "@mui/material";
import { Dashboard } from "../components/Dashboard/Dashboard";
import SideBar from "@/modules/core/components/SideBar/Sidebar";
import Button from "@mui/material/Button";
import React from "react";
import Modal from "../../core/components/Modal/Modal";
import { SnackbarProvider } from "notistack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
        <SideBar>
          <Button
            onClick={handleOpen}
            sx={{
              minHeight: 48,
              color: "white",
            }}>
            <AddCircleOutlineIcon sx={{ fontSize: 30 }} />
          </Button>
        </SideBar>
        <Outlet />
        {/*<Dashboard />*/}
        <Modal open={open} handleClose={handleClose} />
      </SnackbarProvider>
    </Container>
  );
};
export default DashboardPage;
