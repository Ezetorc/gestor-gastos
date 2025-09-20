import { Box, Card, Typography } from "@mui/material";
import { Summary } from "../Summary/Summary";
import { Totals } from "../Totals";
import DashedLineChart from "../DashedLineChart";
import {
  dashboardContainerSx,
  dashboardSectionSx,
  dashboardCardSx,
} from "./Dashboard.styles";
import { PieChartComponent } from "../PiesChart/PieChart";
import { useUserStore } from "@/modules/auth/stores/useUserStore";
import { dashboardData } from "../constants/dashboard";
import { useEffect } from "react";
import { useTransactionStore } from "../../stores/useTransaction";

export const Dashboard = () => {
  const user = useUserStore((state) => state.user);

  const { dataTransaction, getData } = useTransactionStore();

  useEffect(() => {
    getData();
  }, [getData]);

  const today = new Date();

  //Obtener gasto por día
  const getExpense = dataTransaction.filter((item) => item.type === "EXPENSE");
  //Filtrar solo los de hoy
  const spendToday = getExpense.filter((item) => {
    const d = new Date(item.date);
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  });
  const amountToday = spendToday.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);

  //Gastos de la SEMANA (lunes a domingo)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // lunes
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // domingo
  endOfWeek.setHours(23, 59, 59, 999);

  const spendWeek = getExpense.filter((item) => {
    const d = new Date(item.date);
    return d >= startOfWeek && d <= endOfWeek;
  });
  const amountWeek = spendWeek.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  //

  //Gastos del Mes
  const newToday = new Date().getMonth() + 1;
  const spendMonth = getExpense.filter(
    (item) => new Date(item.date).getMonth() + 1 == newToday
  );
  const amountMonth = spendMonth.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);
  //

  return (
    <Box sx={dashboardContainerSx}>
      <Typography variant="h5">
        Bienvenido {user?.name}! Organiza tus finanzas
      </Typography>
      <Summary
        gastosHoy={amountToday}
        gastoSemana={amountWeek}
        gastoMes={amountMonth}
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
