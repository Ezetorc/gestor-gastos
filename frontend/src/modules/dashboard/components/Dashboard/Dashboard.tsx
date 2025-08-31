import { Box, Card } from "@mui/material";
import { Summary } from "../Summary/Summary";
import { Totals } from "../Totals";
import DashedLineChart from "../DashedLineChart";

import expenses from "../../mocks/expenses.mock.json";
import incomes from "../../mocks/incomes.mock.json";

import {
  dashboardContainerSx,
  dashboardSectionSx,
  dashboardCardSx,
} from "./Dashboard.styles";
import { PieChartComponent } from "../PiesChart/PieChart";

export const Dashboard = () => {
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
  const balance = totalIncomes - totalExpenses;

  const dashboardData = {
    expenses,
    incomes,
    summary: {
      gastosHoy: -15000,
      gastoSemana: -25000,
      gastoMes: -totalExpenses,
      balance: balance,
    },
    totals: {
      totalGastos: -totalExpenses,
      totalIngresos: totalIncomes,
      balanceResumen: balance,
    },
  };

  return (
    <Box sx={dashboardContainerSx}>
      <Summary
        gastosHoy={dashboardData.summary.gastosHoy}
        gastoSemana={dashboardData.summary.gastoSemana}
        gastoMes={dashboardData.summary.gastoMes}
        balance={dashboardData.summary.balance}
      />

      <Totals
        totalGastos={dashboardData.totals.totalGastos}
        totalIngresos={dashboardData.totals.totalIngresos}
        balance={dashboardData.totals.balanceResumen}
        expenses={dashboardData.expenses}
      />

      <Box sx={dashboardSectionSx}>
        <Card sx={dashboardCardSx}>
          <PieChartComponent expenses={dashboardData.expenses} />
        </Card>

        <Card sx={dashboardCardSx}>
          <DashedLineChart
            expenses={dashboardData.expenses}
            incomes={dashboardData.incomes}
          />
        </Card>
      </Box>
    </Box>
  );
};
