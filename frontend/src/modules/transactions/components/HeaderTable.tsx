import { useMemo } from "react";
import { useManageData } from "../hooks/useManageData";
import { TableCell, TableRow } from "@mui/material";

export const HeaderTable = () => {
  const { data } = useManageData();
  const headers = useMemo(() => {
    if (!data || data.length === 0) {
      // Si no hay datos, mostramos un conjunto de cabeceras por defecto
      return ["#", "Monto", "Fecha", "Categoría", "Método de Pago", "Descripción", "Tipo", "Acciones"];
    }

    // Mapeo para capitalizar y traducir los nombres de las claves del backend
    const headerTranslations: Record<string, string> = {
      amount: "Monto",
      date: "Fecha",
      category: "Categoría",
      payment_method: "Método de Pago",
      description: "Descripción",
      type: "Tipo",
      // Agrega más traducciones si es necesario
    };

    // Obtenemos las claves del primer objeto, excluyendo 'id' y 'userId'
    const keys = Object.keys(data[0]).filter((key) => key !== "id" && key !== "userId");

    // Construimos el array final de cabeceras: # al inicio, luego las claves traducidas, y Acciones al final.
    return ["#", ...keys.map((key) => headerTranslations[key] || key.charAt(0).toUpperCase() + key.slice(1)), "Acciones"];
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