import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Card, Typography, useMediaQuery } from '@mui/material';
import { theme } from '@/constants/theme';
import { useExpensesByCategory } from '../../../hooks/useExpensesByCategory';

interface Expense {
  id: number;
  amount: number;
  date: string;
  category: string;
  payment_method: string;
  description: string;
  user_id: number;
}

interface PieChartProps {
  expenses: Expense[];
}

export const PieChartComponent = ({ expenses }: PieChartProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  
  // Usar el hook personalizado para procesar gastos por categoría
  const { chartData, totalExpenses } = useExpensesByCategory(expenses);
  
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
        Gasto por categoria
      </Typography>
      <Card
        sx={{
          height: '90%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.colors.inputBg,
          color: 'white',
        }}
      >
        <PieChart
          series={[
            {
              arcLabel: (item) =>
                `${((item.value / totalExpenses) * 100).toFixed(2)}%`, // cálculo de porcentaje aquí
              arcLabelMinAngle: 45,
              data: chartData,
              valueFormatter: (item) => `${item.value.toLocaleString()}`, // tooltip con monto real
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontWeight: 'bold',
            },
            [`& .MuiChartsLegend-label`]: {
              color: 'white',
              fontWeight: '100%',
            },
          }}
          height={220}
          hideLegend={isSmallScreen}
        />
      </Card>
    </>
  );
};
