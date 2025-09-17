
import AppRoutes from './routes/AppRoutes';
import { useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SnackbarProvider } from 'notistack';

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AppRoutes />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

