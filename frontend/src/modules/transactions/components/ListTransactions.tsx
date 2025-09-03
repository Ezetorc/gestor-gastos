import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TableVirtuoso } from 'react-virtuoso';
import type { Transaction } from '../types/transaction.ts';
import { HeaderTable } from './HeaderTable.tsx';
import { TableContent } from './TableContent.tsx';
import { RowContent } from './RowContent.tsx';
export const ListTransactions = ({ 
  transactions
}: { transactions: Transaction[];}) => {
  if (!transactions || transactions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <Typography variant="h6" color="text.secondary">
          No se encontraron transacciones con los filtros aplicados
        </Typography>
      </Box>
    );
  }

  return (
   <Paper sx={{height:520,    borderRadius: 3, }}>
      <TableVirtuoso<Transaction>
      data={transactions}
      components={TableContent}
      fixedHeaderContent={HeaderTable}
      itemContent={RowContent}
      />
</Paper>
  );
};