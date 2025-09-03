import { Box, Typography, type SxProps, type Theme } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import { ListTransactions } from "./ListTransactions";
import { Search_filterSubcomponent } from "./SearchFilter";
import { useManageData } from "../hooks/useManageData";
import { useTransactionFilters } from "../hooks/useTransactionFilters";
import type { Transaction } from "../types/transaction";

const containerSx: SxProps<Theme> = {
  width: "100%",
  Height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  py: 2,
};

const TransactionComponent = () => {
  const { data: rawData } = useManageData();

  const transactions: Transaction[] = rawData as Transaction[];

  const { filters, setFilters, filteredTransactions, clearFilters } =
    useTransactionFilters(transactions);

  return (
    <Box sx={containerSx}>
      <Box display="flex" alignItems="center" gap={1}>
        <FilterAltOutlinedIcon sx={{ fontSize: "2.5em" }} />
        <Typography variant="h4">Transacciones Filtradas:</Typography>
      </Box>

      <Search_filterSubcomponent
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
      />

      <ListTransactions transactions={filteredTransactions} />
    </Box>
  );
};
export default TransactionComponent;
