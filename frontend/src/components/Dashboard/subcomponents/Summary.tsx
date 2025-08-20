import { Box, Card, CardContent, Typography } from '@mui/material';
import { theme } from "../../../constants/theme";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getDashboardColor } from '../../../utilities/dashboard-colors.utility';

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
            width: '100%',
          }}
        >
          {/* Gasto Hoy */}
          <Box sx={{ flex: { xs: '35%', md: '20%' } }}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: '10px', 
              background: theme.colors.inputBg, 
              color: 'white' 
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  mb: 2 
                }}>
                  <Box
                    sx={{
                      backgroundColor: getDashboardColor(gastosHoy),
                      color: 'white',
                      borderRadius: '8px',
                      width: 56,
                      height: 56,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AccountBalanceWalletIcon sx={{ fontSize: 28 }} />
                  </Box>
                </Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: '#9E9E9E', 
                    mb: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  Gasto Hoy
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: getDashboardColor(gastosHoy),
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                  }}
                >
                  ${Math.abs(gastosHoy).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Gasto Semana */}
          <Box sx={{ flex: { xs: '35%', md: '20%' } }}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: '10px', 
              background: theme.colors.inputBg, 
              color: 'white' 
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  mb: 2 
                }}>
                  <Box
                    sx={{
                      backgroundColor: getDashboardColor(gastoSemana),
                      color: 'white',
                      borderRadius: '8px',
                      width: 56,
                      height: 56,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingDownIcon sx={{ fontSize: 28 }} />
                  </Box>
                </Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: '#9E9E9E', 
                    mb: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  Gasto Semana
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: getDashboardColor(gastoSemana),
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                  }}
                >
                  ${Math.abs(gastoSemana).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Gasto Mes */}
          <Box sx={{ flex: { xs: '35%', md: '20%' } }}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: '10px', 
              background: theme.colors.inputBg, 
              color: 'white' 
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  mb: 2 
                }}>
                  <Box
                    sx={{
                      backgroundColor: getDashboardColor(gastoMes),
                      color: 'white',
                      borderRadius: '8px',
                      width: 56,
                      height: 56,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingDownIcon sx={{ fontSize: 28 }} />
                  </Box>
                </Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: '#9E9E9E', 
                    mb: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  Gasto Mes
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: getDashboardColor(gastoMes),
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                  }}
                >
                  ${Math.abs(gastoMes).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Balance */}
          <Box sx={{ flex: { xs: '35%', md: '20%' } }}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: '10px', 
              background: theme.colors.inputBg, 
              color: 'white' 
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  mb: 2 
                }}>
                  <Box
                    sx={{
                      backgroundColor: getDashboardColor(balance),
                      color: 'white',
                      borderRadius: '8px',
                      width: 56,
                      height: 56,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingUpIcon sx={{ fontSize: 28 }} />
                  </Box>
                </Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: '#9E9E9E', 
                    mb: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  Balance
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: getDashboardColor(balance),
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                  }}
                >
                  ${Math.abs(balance).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
    )
}
