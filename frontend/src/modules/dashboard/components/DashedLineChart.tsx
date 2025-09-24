import { Typography, type SxProps, type Theme } from "@mui/material";
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";
import { useDailyExpensesIncomes } from "../hooks/useDailyExpensesIncomes";
import type { DashedLineChartProps } from "../types/dashed";

const chartMargin = { right: 24 };

const getLineChartSx = (color: string): SxProps<Theme> => ({
  [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
    strokeWidth: 1,
  },
  [`.${lineElementClasses.root}[data-series="incomesId"]`]: {
    strokeDasharray: "5 5",
  },
  [`.${lineElementClasses.root}[data-series="expensesId"]`]: {
    strokeDasharray: "3 4 5 2",
  },
  [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
    color,
  },
  [`& .${markElementClasses.highlighted}`]: {
    stroke: color,
  },
  [`& .MuiChartsLegend-label`]: {
    color,
    fontWeight: "bold",
  },
  "& .MuiChartsAxis-line, & .MuiChartsAxis-tick, & .MuiChartsAxis-gridLine": {
    stroke: color,
    fill: color,
    color,
  },
  "& .MuiChartsAxis-tickLabel": {
    fill: color,
    color,
    fontWeight: "normal",
  },
});

export default function DashedLineChart({
  expenses,
  incomes,
}: DashedLineChartProps) {
  const chartData = useDailyExpensesIncomes(expenses, incomes);

  return (
    <>
      <Typography sx={{ textAlign: "center", mt: 2 }}>Tendencia</Typography>
      <LineChart
        height={300}
        series={[
          {
            data: chartData.incomes,
            label: "Ingresos",
            id: "incomesId",
          },
          {
            data: chartData.expenses,
            label: "Egresos",
            id: "expensesId",
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: chartData.labels,
          },
        ]}
        yAxis={[{ width: 50 }]}
        sx={getLineChartSx("#fff")}
        margin={chartMargin}
      />
    </>
  );
}
