import { useMemo } from "react";
import { useManageData } from "../hooks/useManageData";
import { TableCell, TableRow } from "@mui/material";

export const HeaderTable = () => {
  const { data } = useManageData();
  const headers = useMemo(() => {
    // Mapeo para traducir los nombres de las claves del backend a un formato legible
    const headerTranslations: Record<string, string> = {
      amount: "Monto",
      date: "Fecha",
      category: "Categoría",
      payment_method: "Método de Pago",
      description: "Descripción",
      type: "Tipo",
      // Agrega más traducciones si es necesario
    };
    
    // Si no hay datos, usamos un conjunto de cabeceras predefinido.
    if (!data || data.length === 0) {
      return ["#", ...Object.values(headerTranslations), "Acciones"];
    }
    
    // Obtenemos las claves del primer objeto de transacción, excluyendo 'id' y 'userId'.
    const transactionKeys = Object.keys(data[0]).filter(
      (key) => key !== "id" && key !== "userId"
    );
    
    // Construimos el array final: '#' al inicio, las claves traducidas, y 'Acciones' al final.
    const dynamicHeaders = transactionKeys.map((key) => headerTranslations[key] || key);
    return ["#", ...dynamicHeaders, "Acciones"];
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