import { useState } from "react";
import { TableCell, IconButton, TextField, Select, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import type { Transaction } from "../types/transaction";
import { trasactionFields } from "../types/trasactionFields";

interface RowContentProps {
  index: number;
  transaction: Transaction;
  handleDelete: (id: number) => void;
  handleUpdate: (transaction: Transaction) => void;
}

export const RowContent: React.FC<RowContentProps> = ({
  index,
  transaction,
  handleDelete,
  handleUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<Transaction>(transaction);

  const onSave = () => {
    handleUpdate(editValues);
    setIsEditing(false);
  };

  const onCancel = () => {
    setEditValues(transaction);
    setIsEditing(false);
  };

  return (
    <>
      {/* Columna de índice (#) */}
      <TableCell>{index + 1}</TableCell>

      {isEditing ? (
        <>
          {trasactionFields.map(({ key, type, isSelect }) => (
            <TableCell key={key}>
              {isSelect ? (
                <Select
                  size="small"
                  value={editValues.type}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      type: e.target.value as "income" | "expense",
                    })
                  }
                >
                  <MenuItem value="income">Ingreso</MenuItem>
                  <MenuItem value="expense">Gasto</MenuItem>
                </Select>
              ) : (
                <TextField
                  size="small"
                  type={type || "text"}
                  value={
                    key === "date"
                      ? editValues.date.split("T")[0]
                      : editValues[key] ?? ""
                  }
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      [key]:
                        type === "number"
                          ? Number(e.target.value)
                          : e.target.value,
                    })
                  }
                />
              )}
            </TableCell>
          ))}
          {/* Columna Acciones */}
          <TableCell sx={{align:{sm: "center", xs: "right"}}}>
            <IconButton onClick={onSave} size="medium" color="primary">
              <SaveIcon />
            </IconButton>
            <IconButton onClick={onCancel} size="medium" color="error">
              <CloseIcon />
            </IconButton>
          </TableCell>
        </>
      ) : (
        <>
          {trasactionFields.map(({ key, render }) => (
            <TableCell key={key}>
              {render ? render(transaction[key], transaction) : transaction[key]}
            </TableCell>
          ))}
          {/* Columna Acciones */}
          <TableCell sx={{align:{sm: "center", xs: "right"}}}>
            <IconButton onClick={() => setIsEditing(true)} size="medium">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(transaction.id)}
              size="medium"
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </>
      )}
    </>
  );
};