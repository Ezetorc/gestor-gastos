import { Box } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { SummaryStatCard } from "../SummaryStatCard/SummaryStatCard";
import type { SummaryProps } from "../../types/summary";

const containerSx = {
  width: "100%",
  display: "grid",
  gap: 2,
  gridTemplateColumns: {
    xs: "repeat(1, 1fr)",
    sm: "repeat(2, 1fr)",
    md: "repeat(4, 1fr)",
  },
};

export const Summary = ({
  gastosHoy,
  gastoSemana,
  gastoMes,
  balance,
}: SummaryProps) => {
  return (
    <Box sx={containerSx}>
      <SummaryStatCard
        label="Gasto Hoy"
        value={gastosHoy}
        Icon={AccountBalanceWalletIcon}
      />
      <SummaryStatCard
        label="Gasto Semana"
        value={gastoSemana}
        Icon={TrendingDownIcon}
      />
      <SummaryStatCard
        label="Gasto Mes"
        value={gastoMes}
        Icon={TrendingDownIcon}
      />
      <SummaryStatCard label="Balance" value={balance} Icon={TrendingUpIcon} />
    </Box>
  );
};
