import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TableVirtuoso } from 'react-virtuoso';
import type { Transaction } from '../types/transaction';
import { 
  VirtuosoTableComponents,
  fixedHeaderContent,
  rowContent,
  type TrasSubcomponetProps
} from './ListaLogic.tsx';

export const Lista = ({ 
  transactions
}: TrasSubcomponetProps) => {
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
    <Paper sx={{ height: 400, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <TableVirtuoso<Transaction>
      data={transactions}
      components={VirtuosoTableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={rowContent}
      />
    </Paper>
  );
};
