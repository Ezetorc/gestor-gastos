import { Container } from "@mui/material";

import SideBar from "@/modules/core/components/SideBar/Sidebar";
import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {

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
        <SideBar/>
        
       
        <Outlet />
       
      </SnackbarProvider>
    </Container>
  );
};
export default DashboardPage;
