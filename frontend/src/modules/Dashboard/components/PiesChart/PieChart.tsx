import { PieChart } from '@mui/x-charts/PieChart';
import { Card, Typography, useMediaQuery } from '@mui/material';
import type { PieChartProps } from '../../types/pichart';
import { useExpensesByCategory } from '@/modules/Dashboard/hooks/useExpensesByCategory';
import { cardSx, pieChartSx } from './PieChart.styles';

export const PieChartComponent = ({ expenses }: PieChartProps) => {
   const { chartData, totalExpenses } = useExpensesByCategory(expenses);
   const isSmallScreen = useMediaQuery('(max-width: 500px)');


  if (!expenses || expenses.length === 0) {
    return (
      <Card
        sx={{
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>No hay datos de gastos</Typography>
      </Card>
    );
  }

  return (
    <>
      <Typography sx={{ textAlign: 'center', mt: 2 }}>
        Gasto por categoría
      </Typography>

      <Card sx={cardSx}>
        <PieChart
          series={[
            {
              arcLabel: (item) => `${((item.value / totalExpenses) * 100).toFixed(2)}%`,
              arcLabelMinAngle: 45,
              data: chartData,
              valueFormatter: (item) => `${item.value.toLocaleString()}`,
            },
          ]}
          sx={pieChartSx}
          height={220}
          hideLegend={isSmallScreen}
        />
      </Card>
    </>
  );
};
