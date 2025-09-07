import { Container } from "@mui/material";
import SideBar from "@/modules/core/components/SideBar/Sidebar";

const TransactionsPage = () => {
  return (
    <Container
      maxWidth="xl"
      sx={(theme) => ({
        display: "flex",
        background: theme.palette.secondary.main,
      })}>
      <SideBar />

      {/* aca va el el contenedor con todos los filtros y demas */}
    </Container>
  );
};
export default TransactionsPage;
