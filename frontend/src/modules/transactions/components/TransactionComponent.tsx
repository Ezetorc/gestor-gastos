import {
  Box,
  Typography,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { TrasContainerSx, TrasCardSx } from './Tras.styles';
import { Lista } from './Lista';
import { Search_filterSubcomponent } from './Search_filterSubcomponent';
import { useManageData } from '../hooks/manage_data';
import { useTransactionFilters } from '../hooks/manage_filtro';
import type { Transaction } from '../types/transaction';

const TransactionComponent = () => {
  const { data: rawData } = useManageData();
  
  // Asegurar que los datos tengan el tipo correcto
  const transactions: Transaction[] = rawData as Transaction[];

  // Manejar filtros en el componente principal
  const {
    filters,
    setFilters,
    filteredTransactions,
    clearFilters,
  } = useTransactionFilters(transactions);

  return (
    <Box sx={TrasContainerSx}>
      <Box display="flex" alignItems="center" gap={1}>
        <FilterAltOutlinedIcon sx={{ fontSize: '2.5em' }} />
        <Typography variant="h4">Transacciones Filtradas:</Typography>
      </Box>
      
      <Box sx={TrasCardSx}>
        <Search_filterSubcomponent 
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
        />
      </Box>
      
      <Box sx={TrasCardSx}>
        <Lista transactions={filteredTransactions} />
      </Box>
    </Box>
  );
};
export default TransactionComponent;