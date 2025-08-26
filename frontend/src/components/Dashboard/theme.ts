// theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f172a", // fondo principal
      paper: "#1e293b",   // fondo de las cards
    },
    primary: {
      main: "white", // azul -> ingresos
    },
    error: {
      main: "#ef4444", // rojo -> gastos
    },
    success: {
      main: "#22c55e", // verde -> balance
    },
    info: {
      main: "#60a5fa", // azul clarito -> textos destacados
    },
    text: {
      primary: "#e2e8f0",   // texto principal
      secondary: "#94a3b8", // texto secundario
    },
    divider: "#334155", // separadores
  },
});
