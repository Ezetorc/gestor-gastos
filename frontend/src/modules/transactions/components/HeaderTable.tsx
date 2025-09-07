import { useMemo } from "react";
import { useManageData } from "../hooks/useManageData";
import { TableCell, TableRow } from "@mui/material";

export const HeaderTable = () => {
  const { data } = useManageData();
  const headers = useMemo(() => {
    if (!data || data.length === 0) {
      return ["#"];
    }
    const keys = Object.keys(data[0]).filter((key) => key !== "user_id");
    const headerMap: Record<string, string> = {
      id: "ID",
      amount: "Monto",
      date: "Fecha",
      category: "Categoría",
      payment_method: "Método de Pago",
      description: "Descripción",
      type: "Tipo",
    };
    return [...keys.map((key) => headerMap[key] || key), "Acciones"];
  }, [data]);
  return (
    <TableRow>
      {headers.map((header, index) => (
        <TableCell
          key={index}
          sx={() => ({
            width:"100%",
            fontWeight: "bold",
            backgroundColor: '#5e076dff',
          })}
        >
          {header}
        </TableCell>
      ))}
    </TableRow>
  );
};