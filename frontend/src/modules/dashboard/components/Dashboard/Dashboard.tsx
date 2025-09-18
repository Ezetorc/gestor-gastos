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

export const Dashboard = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Box sx={dashboardContainerSx}>
      <Typography variant="h5">
        Bienvenido {user?.name}! Organiza tus finanzas
      </Typography>
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
