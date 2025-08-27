import { Box } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { SummaryStatCard } from "../SummaryStatCard/SummaryStatCard";
import { containerSx, itemSx } from "./Summary.styles";

interface SummaryProps {
  gastosHoy: number;
  gastoSemana: number;
  gastoMes: number;
  balance: number;
}

export const Summary = ({
  gastosHoy,
  gastoSemana,
  gastoMes,
  balance,
}: SummaryProps) => {
  return (
    <Box sx={containerSx}>
      <Box sx={itemSx}>
        <SummaryStatCard
          label="Gasto Hoy"
          value={gastosHoy}
          Icon={AccountBalanceWalletIcon}
        />
      </Box>
      <Box sx={itemSx}>
        <SummaryStatCard
          label="Gasto Semana"
          value={gastoSemana}
          Icon={TrendingDownIcon}
        />
      </Box>
      <Box sx={itemSx}>
        <SummaryStatCard
          label="Gasto Mes"
          value={gastoMes}
          Icon={TrendingDownIcon}
        />
      </Box>
      <Box sx={itemSx}>
        <SummaryStatCard
          label="Balance"
          value={balance}
          Icon={TrendingUpIcon}
        />
      </Box>
    </Box>
  );
};
