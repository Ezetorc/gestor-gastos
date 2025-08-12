import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Card, Typography } from '@mui/material';

interface Expense {
  amount: number;
  category: string;
}

interface PieChartProps {
  expenses: Expense[];
}

export const PieChartComponent = ({ expenses }: PieChartProps) => {
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

  const size = {
    width: 200,
    height: 220,
  };

  return (
    <>
    <Typography sx={{textAlign:'center', mt:2}}>Gasto por categoria</Typography>
    <Card
      sx={{
        height: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PieChart
        series={[
          {
            arcLabel: (item) =>
              `${((item.value / totalExpenses) * 100).toFixed(2)}%`, // cálculo de porcentaje aquí
            arcLabelMinAngle: 45,
            data: chartData,
            valueFormatter: (item) => `$${item.value.toLocaleString()}`, // tooltip con monto real
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
          },
        }}
        {...size}
      />
    </Card>
    </>
  );
};