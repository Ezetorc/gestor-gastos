import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { TableVirtuoso } from 'react-virtuoso';
import type { TableComponents } from 'react-virtuoso';
import { useManageData } from '../hooks/manage_data';

interface Transaction {
  id: number;
  amount: number;
  date: string;
  category: string;
  payment_method?: string;
  description: string;
  user_id: number;
  type: 'income' | 'expense';
}

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

const fixedHeaderContent = () => {
    const headers = ['Num', 'ID', 'Amount', 'Date', 'Category', 'Payment Method', 'Description', 'User ID'];
    return (
        <TableRow>
            {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
            ))}
        </TableRow>
    );
};

const rowContent = (index: number, row: Transaction) => {
    const rowData = [
        index + 1,
        row.id,
        row.amount,
        new Date(row.date).toLocaleDateString(),
        row.category,
        row.payment_method || 'N/A',
        row.description,
        row.user_id,
    ];

    return (
        <>
            {rowData.map((data, index) => (
                <TableCell key={index}>{String(data)}</TableCell>
            ))}
        </>
    );
};

export const TrasSubcomponet = () => {
  const { data: rows } = useManageData();

  if (!rows) {
    // Loading state
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso<Transaction>
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};