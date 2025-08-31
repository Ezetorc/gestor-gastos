import { type SxProps, type Theme } from "@mui/material";
import { pieArcLabelClasses } from "@mui/x-charts";

export const cardSx: SxProps<Theme> = (theme) => ({
  color: theme.palette.text.primary,
  justifyContent: "center",
  alignItems:"center",
  background: theme.palette.background.paper,
  height:"100%",
  display: "flex"
});

export const pieChartSx: SxProps<Theme> = (theme) => ({
  [`& .${pieArcLabelClasses.root}`]: {
    fill: theme.palette.text.primary,
    fontWeight: "bold",
  },
  [`& .MuiChartsLegend-label`]: {
    color: theme.palette.text.primary,
    fontWeight: "100%",
  },
});
