import type { Transaction } from "./transaction";
import React from "react";

export interface FieldConfig {
  key: keyof Transaction;
  type?: string; // para <TextField>
  isSelect?: boolean; // para dropdown
  render?: (value: any, transaction: Transaction) => React.ReactNode; // vista solo lectura
}

export const trasactionFields: FieldConfig[] = [
  {
    key: "amount",
    type: "number",
    render: (_, t) => (
      <span style={{ color: t.type === "income" ? "green" : "red" }}>
        {t.type === "income" ? "+" : "-"}
        {Math.abs(t.amount).toLocaleString()}
      </span>
    ),
  },
  {
    key: "date",
    type: "date",
    render: (_, t) => new Date(t.date).toLocaleDateString("es-ES"),
  },
  { key: "category" },
  { key: "payment_method", render: (v) => v || "N/A" },
  { key: "description" },
  {
    key: "type",
    isSelect: true,
    render: (_, t) => (t.type === "income" ? "Ingreso" : "Gasto"),
  },
];