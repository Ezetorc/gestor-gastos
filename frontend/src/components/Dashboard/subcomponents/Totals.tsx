
import { Box, Card, CardContent, Typography } from '@mui/material';
import { theme } from "@/constants/theme";

// Función que devuelve el color según el valor numérico
const getColorByValue = (value: number): string => {
  if (value > 0) return 'success.main'; // verde
  if (value < 0) return 'error.main'; // rojo
  return 'text.primary'; // negro (color por defecto)
};

export const Totals = () => {
    const totalGastos = -100;
    const totalIngresos = 300;
    const balanceResumen = 200;

    return (
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
    )
}
