import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TableVirtuoso } from 'react-virtuoso';
import type { TableComponents } from 'react-virtuoso';
import type { Transaction } from '../types/transaction';
import { useManageData } from '../hooks/manage_data';

const VirtuosoTableComponents: TableComponents<Transaction> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

interface TrasSubcomponetProps {
  transactions: Transaction[];
}

const fixedHeaderContent = () => {
    const { data } = useManageData();
    const headers = React.useMemo(() => {
      if (!data || data.length === 0) {
        return ['#'];
      }
      const keys = Object.keys(data[0]).filter(key => key !== 'user_id');
      // Opcional: puedes mapear los nombres a títulos más amigables si lo deseas
      const headerMap: Record<string, string> = {
        id: 'ID',
        amount: 'Monto',
        date: 'Fecha',
        category: 'Categoría',
        payment_method: 'Método de Pago',
        description: 'Descripción',
        type: 'Tipo',
      };
      return ['#', ...keys.map(key => headerMap[key] || key)];
    }, [data]);
    return (
        <TableRow>
            {headers.map((header, index) => (
                <TableCell key={index} sx={{ fontWeight: 'bold', backgroundColor: 'grey' }}>
                  {header}
                </TableCell>
            ))}
        </TableRow>
    );
};

const rowContent = (index: number, row: Transaction) => {
    const formatAmount = (amount: number, type: 'income' | 'expense') => {
      const formatted = `$${Math.abs(amount).toLocaleString()}`;
      return type === 'income' ? `+${formatted}` : `-${formatted}`;
    };

    const rowData = [
        index + 1,
        row.id,
        formatAmount(row.amount, row.type),
        new Date(row.date).toLocaleDateString('es-ES'),
        row.category,
        row.payment_method || 'N/A',
        row.description,
        row.type === 'income' ? 'Ingreso' : 'Gasto',
    ];

    return (
        <>
            {rowData.map((data, index) => (
                <TableCell 
                  key={index}
                  sx={{ 
                    color: index === 2 && row.type === 'income' ? 'green' : 
                          index === 2 && row.type === 'expense' ? 'red' : 'inherit'
                  }}
                >
                  {String(data)}
                </TableCell>
            ))}
        </>
    );
};

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
    <Paper style={{ height: 400, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <TableVirtuoso<Transaction>
      data={transactions}
      components={VirtuosoTableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={rowContent}
      />
    </Paper>
  );
};