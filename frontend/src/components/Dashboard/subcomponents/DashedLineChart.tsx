// Importaciones necesarias para el componente
import { Typography } from '@mui/material'; // Componente de texto de Material-UI
import {
  LineChart, // Componente principal del gráfico de líneas
  lineElementClasses, // Clases CSS para personalizar las líneas
  markElementClasses, // Clases CSS para personalizar los puntos marcadores
} from '@mui/x-charts/LineChart'; // Librería de gráficos de MUI
import { useDailyExpensesIncomes } from '../../../hooks/useDailyExpensesIncomes';

// Interface que define la estructura de cada elemento de datos (gasto o ingreso)
interface DataItem {
  id: number;          // Identificador único
  amount: number;      // Monto (positivo para ingresos, puede ser positivo para gastos)
  date: string;        // Fecha en formato ISO string
  category: string;    // Categoría del gasto/ingreso
  description: string; // Descripción del movimiento
  user_id: number;     // ID del usuario propietario
}
// Interface que define las props que recibe este componente desde Dashboard
interface DashedLineChartProps {
  expenses: DataItem[]; // Array de gastos
  incomes: DataItem[];  // Array de ingresos
}

const margin = { right: 24 }; // Margen derecho para evitar que la leyenda se corte

export default function DashedLineChart({ expenses, incomes }: DashedLineChartProps) {
  // Usar el hook para obtener los datos procesados
  const chartData = useDailyExpensesIncomes(expenses, incomes);

  return (
    <>
      <Typography sx={{ textAlign: 'center', mt: 2 }}>Tendencia</Typography>
      <LineChart
        height={300}
        series={[
          {
            data: chartData.incomes,
            label: 'Ingresos',
            id: 'incomesId',
          },
          {
            data: chartData.expenses,
            label: 'Egresos',
            id: 'expensesId',
          },
        ]}
        xAxis={[
          {
            scaleType: 'point',
            data: chartData.labels,
          },
        ]}
        yAxis={[{ width: 50 }]}
        sx={{
          [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
            strokeWidth: 1,
          },
          [`.${lineElementClasses.root}[data-series="incomesId"]`]: {
            strokeDasharray: '5 5',
          },
          [`.${lineElementClasses.root}[data-series="expensesId"]`]: {
            strokeDasharray: '3 4 5 2',
          },
          [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
            color: '#fff',
          },
          [`& .${markElementClasses.highlighted}`]: {
            stroke: '#fff',
          },
          [`& .MuiChartsLegend-label`]: {
            color: '#fff',
            fontWeight: 'bold',
          },
          '& .MuiChartsAxis-line, & .MuiChartsAxis-tick, & .MuiChartsAxis-gridLine': {
            stroke: '#fff',
            fill: '#fff',
            color: '#fff',
          },
          '& .MuiChartsAxis-tickLabel': {
            fill: '#fff',
            color: '#fff',
            fontWeight: 'normal',
          },
        }}
        margin={margin}
      />
    </>
  );
}