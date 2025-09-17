import { Container } from "@mui/material";

import SideBar from "@/modules/core/components/SideBar/Sidebar";
import { Outlet } from "react-router-dom";
import { Dashboard } from "../components/Dashboard/Dashboard";

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
      
        <SideBar/>
        <Outlet />
        <Dashboard/>
    
    </Container>
  );
};
export default DashboardPage;
