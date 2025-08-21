import { Box } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Icono de billetera para gastos del día
import TrendingDownIcon from '@mui/icons-material/TrendingDown'; // Icono de tendencia bajista para gastos
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Icono de tendencia alcista para balance positivo
import { SummaryStatCard } from './SummaryStatCard'; // Componente reutilizable para cada tarjeta individual

interface SummaryProps {
  gastosHoy: number;    // Gastos del día actual (valor negativo por convención)
  gastoSemana: number;  // Gastos de la semana (valor negativo por convención)
  gastoMes: number;     // Gastos del mes completo (valor negativo por convención)
  balance: number;      // Balance total (puede ser positivo o negativo)
}

export const Summary = ({ gastosHoy, gastoSemana, gastoMes, balance }: SummaryProps) => {
    // Configuración responsive para el ancho de cada tarjeta
    const flexBasis = { xs: '50%', sm: '33%', md: '20%' }

    return (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            width: '100%',
          }}
        >
          <Box sx={{ flex: flexBasis }}>
            <SummaryStatCard 
              label="Gasto Hoy"
              value={gastosHoy}
              Icon={AccountBalanceWalletIcon}
            />
          </Box>
          <Box sx={{ flex: flexBasis }}>
            <SummaryStatCard 
              label="Gasto Semana"
              value={gastoSemana}
              Icon={TrendingDownIcon}
            />
          </Box>
          <Box sx={{ flex: flexBasis }}>
            <SummaryStatCard 
              label="Gasto Mes"
              value={gastoMes}
              Icon={TrendingDownIcon}
            />
          </Box>
          <Box sx={{ flex: flexBasis }}>
            <SummaryStatCard 
              label="Balance"
              value={balance}
              Icon={TrendingUpIcon}
            />
          </Box>
        </Box>
    )
}