import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Card, Typography } from '@mui/material';

// Define la estructura de un objeto de gasto
interface Expense {
  amount: number;
  category: string;
}

// Define las propiedades que espera el componente PieChartComponent
interface PieChartProps {
  expenses: Expense[];
}

// Componente funcional que renderiza un gráfico de torta con los gastos por categoría
export const PieChartComponent = ({ expenses }: PieChartProps) => {
  // Si no hay gastos o el array está vacío, muestra un mensaje
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

  // Calcula el total de gastos sumando los montos de todas las transacciones
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  // Agrupa los gastos por categoría y suma los montos de cada una
  const dataByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Convierte los datos agrupados en un formato compatible con el gráfico de torta
  const chartData = Object.entries(dataByCategory).map(([category, amount], index) => ({
    id: index,
    value: (amount / totalExpenses) * 100, // Calcula el porcentaje del gasto por categoría
    label: `${category} (${((amount / totalExpenses) * 100).toFixed(2)}%)`,
  }));

  // Define el tamaño del gráfico
  const size = {
    width: 400,
    height: 200,
  };

  // Renderiza el gráfico de torta
  return (
    <Card
      sx={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PieChart
        series={[
          {
            //arcLabel: (item) => `${item.value.toFixed(2)}%`, // Etiqueta que muestra la categoría y el porcentaje
            arcLabelMinAngle: 45, // Angulo mínimo para mostrar la etiqueta
            data: chartData, // Datos del gráfico
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
  );
};
