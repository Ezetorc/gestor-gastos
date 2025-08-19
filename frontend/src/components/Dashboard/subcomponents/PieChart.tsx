import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Card, Typography, useMediaQuery } from '@mui/material';
import { theme } from "@/constants/theme";

interface Expense {
  amount: number;
  category: string;
}

interface PieChartProps {
  expenses: Expense[];
}

export const PieChartComponent = ({ expenses }: PieChartProps) => {
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

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const dataByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Aquí solo guardamos monto real
  const chartData = Object.entries(dataByCategory).map(([category, amount], index) => ({
    id: index,
    value: amount, // monto real para tooltip
    label: category,
  }));

  return (
    <>
    <Typography sx={{textAlign:'center', mt:2}}>Gasto por categoria</Typography>
    <Card
      sx={{
        height: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.inputBg, color:'white'
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
        }}
        height={220}
        hideLegend={isSmallScreen}
      />
    </Card>
    </>
  );
};