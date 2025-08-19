
import { Box, Card, CardContent, Typography } from '@mui/material';
import { theme } from "@/constants/theme";

// Función que devuelve el color según el valor numérico
const getColorByValue = (value: number): string => {
  if (value > 0) return 'success.main'; // verde
  if (value < 0) return 'error.main'; // rojo
  return 'text.primary'; // negro (color por defecto)
};

export const Summary = () => {
    const gastosHoy = 0;
    const gastoSemana = -100;
    const gastoMes = -100;
    const balance = 1000;

    return (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            width: '70%',
            p: 2,
            border: '1px solid yellowgreen',
          }}
        >
          {/* Gasto Hoy */}
          <Box sx={{ flex: { xs: '35%', md: '20%' } }}>
            <Card sx={{ height: '100%', borderRadius:'10px', background: theme.colors.inputBg, color:'white' }}>
              <CardContent>
                <Typography variant="subtitle2">Gasto Hoy</Typography>
                <Typography
                  variant="h5"
                  color={getColorByValue(gastosHoy)}
                  fontWeight="bold"
                >
                  ${gastosHoy.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Gasto Semana */}
          <Box sx={{ flex: { xs: '35%', md: '20%' } }}>
            <Card sx={{ height: '100%', borderRadius:'10px', background: theme.colors.inputBg, color:'white' }}>
              <CardContent>
                <Typography variant="subtitle2">Gasto Semana</Typography>
                <Typography
                  variant="h5"
                  color={getColorByValue(gastoSemana)}
                  fontWeight="bold"
                >
                  ${Math.abs(gastoSemana).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Gasto Mes */}
          <Box sx={{ flex: { xs: '35%', md: '20%' } }}>
            <Card sx={{ height: '100%', borderRadius:'10px', background: theme.colors.inputBg, color:'white' }}>
              <CardContent>
                <Typography variant="subtitle2">Gasto Mes</Typography>
                <Typography
                  variant="h5"
                  color={getColorByValue(gastoMes)}
                  fontWeight="bold"
                >
                  ${Math.abs(gastoMes).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Balance */}
          <Box sx={{ flex: { xs: '35%', md: '20%' } }}>
            <Card sx={{ height: '100%', borderRadius:'10px', background: theme.colors.inputBg, color:'white' }}>
              <CardContent>
                <Typography variant="subtitle2">Balance</Typography>
                <Typography
                  variant="h5"
                  color={getColorByValue(balance)}
                  fontWeight="bold"
                >
                  ${balance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
    )
}
