import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Card, Typography, useMediaQuery } from '@mui/material';
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
  backgroundD?: string;
  colo?: string;
  display?: object;
}

export const PieChartComponent = ({ expenses, backgroundD, colo, display }: PieChartProps) => {

  const d = {...display, justifyContent: 'center'};
  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  // Usar el hook personalizado para procesar gastos por categoría
  const { chartData, totalExpenses } = useExpensesByCategory(expenses);
  
  if (!expenses || expenses.length === 0) {
    return (
      <Card
        sx={{
          height: 200,
          ...d,
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
          ...d,
          background: backgroundD,
          color: colo,
        }}
      >
        <PieChart
          series={[
            {
              arcLabel: (item) =>
                `${((item.value / totalExpenses) * 100).toFixed(2)}%`,
              arcLabelMinAngle: 45,
              data: chartData,
              valueFormatter: (item) => `${item.value.toLocaleString()}`,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: colo,
              fontWeight: 'bold',
            },
            [`& .MuiChartsLegend-label`]: {
              color: colo,
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