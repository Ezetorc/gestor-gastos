import { Container } from "@mui/material";
import { Dashboard } from "../components/Dashboard/Dashboard";
import SideBar from "@/modules/core/components/SideBar/Sidebar";
import Button from "@mui/material/Button";
import React from "react";
import Modal from "./Modal/Modal";

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
      })}>
      <SideBar>
        <Button onClick={handleOpen}>Abrir Modal</Button>
      </SideBar>
      <Dashboard />
      <Modal open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </Container>
  );
};
export default DashboardPage;
