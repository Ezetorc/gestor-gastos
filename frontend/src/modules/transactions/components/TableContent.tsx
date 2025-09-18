import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { TableComponents } from "react-virtuoso";
import type { Transaction } from "../types/transaction";
import React from "react";
export const TableContent: TableComponents<Transaction> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer
      component={Paper}
      {...props}
      ref={ref}
      sx={{
         borderRadius: 3, 
        width: "100%",
        overflowX: "auto", 
      }}
    />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{
        borderCollapse: "separate",
        tableLayout: "fixed",
        width: "100%",
        minWidth: 900, 
      }}
    />
  ),
  TableHead: TableHead,
  TableRow: (props) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
  TableCell: (props) => (
    <TableCell
      {...props}
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        px: 1, // menos padding en mobile
        "&:first-of-type": {
          minWidth: 100, // Monto
        },
        "&:nth-of-type(2)": {
          minWidth: 120, // Fecha
        },
        "&:nth-of-type(3)": {
          minWidth: 120, // Categoría
        },
        "&:nth-of-type(4)": {
          minWidth: 150, // Método de Pago
        },
        "&:nth-of-type(5)": {
          minWidth: 250, // Descripción (más ancha)
        },
        "&:nth-of-type(6)": {
          minWidth: 100, // Tipo
        },
      }}
    />
  ),
};
