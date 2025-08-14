import { Box, Card, CardContent, Typography } from '@mui/material';
import { PieChartComponent } from './PieChart';
import expenses from '../../mocks/expenses.mock.json';
import DashedLineChart from './DashedLineChart';
import { theme } from "@/constants/theme";

// Función que devuelve el color según el valor numérico
const getColorByValue = (value: number): string => {
  if (value > 0) return 'success.main'; // verde
  if (value < 0) return 'error.main'; // rojo
  return 'text.primary'; // negro (color por defecto)
};

export const Dashboard = () => {
  // Valores ejemplo, podés traerlos de donde quieras
  const gastosHoy = 0;
  const gastoSemana = -100;
  const gastoMes = -100;
  const balance = 1000;

  const totalGastos = -100;
  const totalIngresos = 300;
  const balanceResumen = 200;

  return (
    <>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
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

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            width: '70%',
            p: 2,
            border: '1px solid orange',
            mt: 2,
          }}
        >
          <Box sx={{ flex: { xs: '35%', md: '20%' } }}>
            <Card sx={{ height: 200, borderRadius:'10px',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                background: theme.colors.inputBg, color:'white'
              }}
            >
              <Box>
                {[
                  { label: 'Total gastos', value: totalGastos },
                  { label: 'Total ingresos', value: totalIngresos },
                ].map(({ label, value }) => (
                  <Box
                    key={label}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6">{label}:</Typography>
                    <Typography
                    variant="h6"
                      sx={{
                        color: getColorByValue(value),
                        marginLeft: 'auto',
                        fontWeight: 'bold',
                      }}
                    >
                      ${Math.abs(value).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  borderBottom: '1px solid #ccc',
                  my: 1,
                  marginTop: 'auto',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 'auto', // Esto empuja el balance abajo del Card
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  Balance
                </Typography>
                <Typography
                variant="h5"
                  sx={{
                    color: getColorByValue(balanceResumen),
                    marginLeft: 'auto',
                    fontWeight: 'bold',
                  }}
                >
                  ${Math.abs(balanceResumen).toFixed(2)}
                </Typography>
              </Box>
            </Card>
          </Box>

          {/* Top categorías */}
          <Box sx={{ flex: { xs: '35%', md: '20%' } }}>
            <Card sx={{ height: '100%', borderRadius:'10px', background: theme.colors.inputBg, color:'white' }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Top categorías
                </Typography>
                <Box>
                {[
                  { label: 'Alimentos', value: totalGastos },
                  { label: 'Ocio', value: totalIngresos },
                ].map(({ label, value }) => (
                  <Box
                    key={label}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">- {label}</Typography>
                    <Typography
                      sx={{
                        color: getColorByValue(value),
                        marginLeft: 'auto',
                        fontWeight: 'bold',
                      }}
                    >
                      ${Math.abs(value).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: '70%',
            p: 2,
            border: '1px solid violet',
            mt: 2,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {/* Gráfico circular */}
          <Box sx={{ 
              width: { xs: '100%', md: '50%' },
           }}>
            <Card sx={{ height: '100%', background: theme.colors.inputBg, color:'white'}}>
             <PieChartComponent expenses={expenses} />
            </Card>
          </Box>

          {/* Gráfico de barras */}
          <Box sx={{ 
            width: { xs: '100%', md: '50%' },
          }}>
           <Card sx={{ height: '100%', background: theme.colors.inputBg, color:'white' }}>
             <DashedLineChart />
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};
