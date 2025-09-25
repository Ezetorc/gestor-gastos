import { alpha, Container } from "@mui/material";
import SideBar from "@/modules/core/components/SideBar/Sidebar";
import { Dashboard } from "../components/Dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <Container
      maxWidth="xl"
      sx={(theme) => ({
        display: "flex",
        background: alpha(theme.palette.secondary.main,0.2),
        minHeight: "100dvh",
        mt: { xs: 8, sm: 0 },
      })}>
      <SideBar />

      <Dashboard />
    </Container>
  );
};
export default DashboardPage;
