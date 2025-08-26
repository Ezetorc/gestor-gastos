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
  colo: string;         // Color para personalizar el gráfico
}

const margin = { right: 24 }; // Margen derecho para evitar que la leyenda se corte

export default function DashedLineChart({ expenses, incomes, colo }: DashedLineChartProps) {
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
            color: colo,
          },
          [`& .${markElementClasses.highlighted}`]: {
            stroke: colo,
          },
          [`& .MuiChartsLegend-label`]: {
            color: colo,
            fontWeight: 'bold',
          },
          '& .MuiChartsAxis-line, & .MuiChartsAxis-tick, & .MuiChartsAxis-gridLine': {
            stroke: colo,
            fill: colo,
            color: colo,
          },
          '& .MuiChartsAxis-tickLabel': {
            fill: colo,
            color: colo,
            fontWeight: 'normal',
          },
        }}
        margin={margin}
      />
    </>
  );
}