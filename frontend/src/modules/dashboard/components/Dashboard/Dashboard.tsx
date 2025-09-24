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
import { useEffect } from "react";
import { useTransaction } from "../../stores/useTransaction";
import { useGetSummary } from "../../stores/useGetSummary";

export const Dashboard = () => {
  const user = useUserStore((state) => state.user);

  const { dataExpense, dataIncome, getData } = useTransaction();
  const { dataSummary, getDataSummary } = useGetSummary();

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getDataSummary();
  }, [getDataSummary]);

  if (!dataSummary) return;

  return (
    <Box sx={dashboardContainerSx}>
      <Typography variant="h5">
        Bienvenido {user?.name}! Organiza tus finanzas
      </Typography>
      <Summary
        gastosHoy={dataSummary?.todayExpenses}
        gastoSemana={dataSummary?.weekExpenses}
        gastoMes={dataSummary?.monthExpenses}
        balance={dataSummary?.monthBalance}
      />

      <Totals
        totalGastos={dataSummary?.totalExpenses}
        totalIngresos={dataSummary?.totalIncomes}
        balance={dataSummary?.monthBalance}
        expenses={dataExpense}
      />

      <Box sx={dashboardSectionSx}>
        <Card sx={dashboardCardSx}>
          <PieChartComponent expenses={dataExpense} />
        </Card>

        <Card sx={dashboardCardSx}>
          <DashedLineChart expenses={dataExpense} incomes={dataIncome} />
        </Card>
      </Box>
    </Box>
  );
};
