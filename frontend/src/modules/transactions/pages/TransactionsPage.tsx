import { Container } from "@mui/material";
import SideBar from "@/modules/core/components/SideBar/Sidebar";
import TransactionComponent from "../components/TransactionComponent";

const TransactionsPage = () => {
  return (
    <>
      <TransactionComponent />
    </>
    //<Container
    //  maxWidth="xl"
    //  sx={(theme) => ({
    //    display: "flex",
    //    background: theme.palette.secondary.main,
    //    minHeight: "100vh",
    //    minWidth: "100%",
    //    pt: { xs: 10, sm: 0 },
    //  })}>
    //  {/*<SideBar />*/}
    //  <TransactionComponent />
    //</Container>
  );
};
export default TransactionsPage;
