import type { Transaction } from "./transaction";
import React from "react";

// Usamos un tipo más avanzado para asegurar que el 'render' coincida con la 'key'
type FieldConfigFor<K extends keyof Transaction> = {
  key: K;
  type?: string; // para <TextField>
  isSelect?: boolean; // para dropdown
  render?: (
    value: Transaction[K],
    transaction: Transaction
  ) => React.ReactNode; // vista solo lectura
};

type FieldConfig = { [K in keyof Transaction]: FieldConfigFor<K> }[keyof Transaction];

export const trasactionFields: FieldConfig[] = [
  {
    key: "amount",
    type: "number",
    render: (amount, t) => (
      <span style={{ color: t.type === "income" ? "green" : "red" }}>
        {t.type === "income" ? "+" : "-"}
        {Math.abs(amount).toLocaleString("es-ES", {
          style: "currency",
          currency: "EUR", // Puedes cambiarlo a tu moneda local
        })}
      </span>
    ),
  },
  {
    key: "date",
    type: "date",
    render: (date) => new Date(date).toLocaleDateString("es-ES"),
  },
  {
    key: "name",
    render: (value) => value || "Sin nombre",
  },
  {
    key: "category",
    render: (value) => value || "Sin categoría",
  },
  {
    key: "payment_method",
    render: (value) => value || "No especificado",
  },
  { key: "description", render: (value) => value || "-" },
  {
    key: "type",
    isSelect: true,
    render: (_, t) => (t.type === "income" ? "Ingreso" : "Gasto"),
  },
];