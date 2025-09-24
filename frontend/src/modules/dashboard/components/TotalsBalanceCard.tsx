import { Box, Card, Typography, type SxProps, type Theme } from "@mui/material";
import type { TotalsBalanceCardProps } from "../types/balance";

const cardSx: SxProps<Theme> = (theme) => ({
  height: "100%",
  borderRadius: 3,
  p: 2,
  display: "flex",
  flexDirection: "column",
  background: theme.palette.background.paper,
});

const rowSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 2,
  pb: 1,
  borderBottom: "1px solid #ccc5",
};

const valueSx: SxProps<Theme> = (theme) => ({
  marginLeft: "auto",
  fontWeight: "bold",
  color: theme.palette.text.secondary,
});

const dividerSx: SxProps<Theme> = {
  my: 1,
  marginTop: "auto",
};

export const TotalsBalanceCard = ({
  totalGastos,
  totalIngresos,
  balance,
}: TotalsBalanceCardProps) => {
  const totals = [
    { label: "Total gastos", value: totalGastos },
    { label: "Total ingresos", value: totalIngresos },
  ];

  return (
    <Card sx={cardSx}>
      <Box>
        {totals.map(({ label, value }) => (
          <Box key={label} sx={rowSx}>
            <Typography variant="h6">{label}:</Typography>
            <Typography variant="h6" sx={valueSx}>
              ${Math.abs(value).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={dividerSx} />

      <Box
        sx={{
          borderTop: "1px solid #ccc5",
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          pt: 2,
        }}>
        <Typography variant="h6" fontWeight="bold">
          Balance
        </Typography>
        <Typography variant="h6" sx={valueSx}>
          ${Math.abs(balance).toFixed(2)}
          {/*${balance.toFixed(2)}*/}
        </Typography>
      </Box>
    </Card>
  );
};
