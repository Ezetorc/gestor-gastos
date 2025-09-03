import { TableCell } from "@mui/material";
import type { Transaction } from "../types/transaction";

export const RowContent = (index: number, row: Transaction) => {
  const formatAmount = (amount: number, type: "income" | "expense") => {
    const formatted = `$${Math.abs(amount).toLocaleString()}`;
    return type === "income" ? `+${formatted}` : `-${formatted}`;
  };

  const rowData = [
    index + 1,
    row.id,
    formatAmount(row.amount, row.type),
    new Date(row.date).toLocaleDateString("es-ES"),
    row.category,
    row.payment_method || "N/A",
    row.description,
    row.type === "income" ? "Ingreso" : "Gasto",
  ];

  return (
    <>
      {rowData.map((data, i) => (
        <TableCell
          key={i}
          sx={(theme) => ({
            width:"100%",
            color:
              i === 2 && row.type === "income"
                ? theme.palette.success.main
                : i === 2 && row.type === "expense"
                ? theme.palette.error.main
                : "inherit",
          })}
        >
          {String(data)}
        </TableCell>
      ))}
    </>
  );
};


