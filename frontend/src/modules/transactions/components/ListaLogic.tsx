import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { TableComponents } from 'react-virtuoso';
import type { Transaction } from '../types/transaction';
import { useManageData } from '../hooks/manage_data';

// Configuración de VirtuosoTableComponents
export const VirtuosoTableComponents: TableComponents<Transaction> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} sx={{
        '&::-webkit-scrollbar':{
          display: 'none',
        },
        msOverflowStyle: 'none', // IE y Edge
        scrollbarWidth: 'none', // Firefox
      }} />
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

// Headers de la tabla
export const fixedHeaderContent = () => {
    const { data } = useManageData();
    const headers = React.useMemo(() => {
      if (!data || data.length === 0) {
        return ['#'];
      }
      const keys = Object.keys(data[0]).filter(key => key !== 'user_id');
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
                <TableCell key={index} sx={(theme) => ({ fontWeight: 'bold', backgroundColor: theme.palette.grey[500] })}>
                  {header}
                </TableCell>
            ))}
        </TableRow>
    );
};

// Filas de la tabla
export const rowContent = (index: number, row: Transaction) => {
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
            {rowData.map((data, i) => (
                <TableCell
                  key={i}
                  sx={(theme) => ({
                    color: i === 2 && row.type === 'income' ? theme.palette.success.main :
                          i === 2 && row.type === 'expense' ? theme.palette.error.main : 'inherit'
                  })}
                >
                  {String(data)}
                </TableCell>
            ))}
        </>
    );
};

// Props del componente
export interface TrasSubcomponetProps {
  transactions: Transaction[];
}