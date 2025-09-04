import { TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Transaction } from "../types/transaction";

interface RowContentProps {
  index: number;
  transaction: Transaction;
  handleDelete: (id: number) => void;
  handleUpdate: (transaction: Transaction) => void;
}

export const RowContent: React.FC<RowContentProps> = ({ index, transaction, handleDelete, handleUpdate }) => {
  const formatAmount = (amount: number, type: "income" | "expense") => {
    const formatted = `${Math.abs(amount).toLocaleString()}`;
    return type === "income" ? `+${formatted}` : `-${formatted}`;
  };

  // Example of how you might trigger an update
  const onEdit = () => {
    // This would typically open a modal or form to edit the transaction
    // For now, we'll just log it and maybe update with some mock data
    console.log("Editing transaction:", transaction.id);
    const updatedTransaction = { ...transaction, description: `Updated ${transaction.description}` };
    handleUpdate(updatedTransaction);
  };

  const rowData = [
    index + 1,
    transaction.id,
    formatAmount(transaction.amount, transaction.type),
    new Date(transaction.date).toLocaleDateString("es-ES"),
    transaction.category,
    transaction.payment_method || "N/A",
    transaction.description,
    transaction.type === "income" ? "Ingreso" : "Gasto",
  ];

  return (
    <>
      {rowData.map((data, i) => (
        <TableCell
          key={i}
          sx={(theme) => ({
            width:"100%",
            color:
              i === 2 && transaction.type === "income"
                ? theme.palette.success.main
                : i === 2 && transaction.type === "expense"
                ? theme.palette.error.main
                : "inherit",
          })}
        >
          {String(data)}
        </TableCell>
      ))}
      <TableCell>
        <IconButton onClick={onEdit} size="small">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(transaction.id)} size="small">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </>
  );
};


