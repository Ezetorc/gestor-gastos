import { Container } from "@mui/material";
import SideBar from "@/modules/core/components/SideBar/Sidebar";
import TransactionComponent from "../components/TransactionComponent";

const TransactionsPage = () => {
  return (
    <Container
      maxWidth="xl"
      sx={(theme) => ({
        display: "flex",
        background: theme.palette.secondary.main,
        minHeight: "100vh",
      })}
    >
      <SideBar />
      <TransactionComponent/>
    </Container>
  );
};
export default TransactionsPage;