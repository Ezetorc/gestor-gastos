import { Typography } from '@mui/material';
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';
import expenses from '../../../mocks/expenses.mock.json';
import incomes from '../../../mocks/incomes.mock.json';

const margin = { right: 24 };

interface DataItem {
  id: number;
  amount: number;
  date: string;
  category: string;
  description: string;
  user_id: number;
}

const processData = (expenses: DataItem[], incomes: DataItem[]) => {
  const allDates = [
    ...new Set([
      ...expenses.map((e) => e.date.split('T')[0]),
      ...incomes.map((i) => i.date.split('T')[0]),
    ]),
  ].sort();

  const dailyExpenses = allDates.map((date) => {
    return expenses
      .filter((e) => e.date.split('T')[0] === date)
      .reduce((sum, e) => sum + e.amount, 0);
  });

  const dailyIncomes = allDates.map((date) => {
    return incomes
      .filter((i) => i.date.split('T')[0] === date)
      .reduce((sum, i) => sum + i.amount, 0);
  });

  return {
    labels: allDates,
    expenses: dailyExpenses,
    incomes: dailyIncomes,
  };
};

const chartData = processData(expenses, incomes);

export default function DashedLineChart() {
  return (
    <>
      <Typography sx={{ textAlign: 'center', mt: 2 }}>Tendencia</Typography>
      <LineChart
        height={300}
        series={[
          { data: chartData.incomes, label: 'Ingresos', id: 'incomesId' },
          { data: chartData.expenses, label: 'Egresos', id: 'expensesId' },
        ]}
        xAxis={[{ scaleType: 'point', data: chartData.labels }]}
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
          [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]:
            {
              color: '#fff',
            },
          [`& .${markElementClasses.highlighted}`]: {
            stroke: 'none',
          },
          [`& .MuiChartsLegend-label`]: {
            color: 'white',
            fontWeight: 'bold',
          },
          '& .MuiChartsAxis-line': {
            stroke: '#fff',
          },
          '& .MuiChartsAxis-tickLabel': {
            fill: '#fff',
          },
          '& .MuiChartsAxis-tick': {
            stroke: '#fff',
          },
          '& .MuiChartsAxis-gridLine': {
            stroke: '#fff',
            strokeOpacity: 0.3,
          },
        }}
        margin={margin}
      />
    </>
  );
}
