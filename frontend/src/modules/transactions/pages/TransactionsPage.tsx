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
<<<<<<< HEAD
      })}>
      <SideBar />

      {/* aca va el el contenedor con todos los filtros y demas */}
    </Container>
  );
};
export default TransactionsPage;
=======
        minHeight: "100vh",
        minWidth: "100%",
        pt: {xs:10,sm:0}
      })}
    >
      <SideBar />
      <TransactionComponent/>
    </Container>
  );
};
export default TransactionsPage;
>>>>>>> 840a87f9947cbe86bd22dc1de3ad07c299985e9a
