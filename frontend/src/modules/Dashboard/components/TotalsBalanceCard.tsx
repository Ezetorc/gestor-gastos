import { Box, Card, Typography, type SxProps, type Theme } from '@mui/material';
import type { TotalsBalanceCardProps } from '../types/balance';


const cardSx: SxProps<Theme> = {
  height: 200,
  borderRadius: 3,
  p: 2,
  display: 'flex',
  flexDirection: 'column',
};

const rowSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  mb: 1,
};

const valueSx:  SxProps<Theme> = (theme)=> ({
  marginLeft: 'auto',
  fontWeight: 'bold',
  color: theme.palette.background.paper,
});

const dividerSx: SxProps<Theme> = {
  borderBottom: '1px solid #ccc',
  my: 1,
  marginTop: 'auto',
};

export const TotalsBalanceCard = ({ totalGastos, totalIngresos, balance }: TotalsBalanceCardProps) => {
  const totals = [
    { label: 'Total gastos', value: totalGastos },
    { label: 'Total ingresos', value: totalIngresos },
  ];

  return (
    <Card sx={cardSx}>
      <Box>
        {totals.map(({ label, value }) => (
          <Box key={label} sx={rowSx}>
            <Typography variant="h6">{label}:</Typography>
            <Typography variant="h6" sx={valueSx}>
              ${Math.abs(value).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={dividerSx} />

      <Box sx={{ ...rowSx, marginTop: 'auto' }}>
        <Typography variant="h5" fontWeight="bold">Balance</Typography>
        <Typography variant="h5" sx={valueSx}>
          ${Math.abs(balance).toFixed(2)}
        </Typography>
      </Box>
    </Card>
  );
};
