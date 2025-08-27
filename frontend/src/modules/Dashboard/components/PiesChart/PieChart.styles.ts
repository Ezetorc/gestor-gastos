import { type SxProps, type Theme } from "@mui/material";
import { pieArcLabelClasses } from "@mui/x-charts";

  export const flexStyles = {  justifyContent: 'center' };


  export const cardSx: SxProps<Theme> = (theme) => ({
    height: '90%',
    ...flexStyles,
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  });

  export const pieChartSx: SxProps<Theme> = (theme) => ({
    [`& .${pieArcLabelClasses.root}`]: {
      fill: theme.palette.text.primary,
      fontWeight: 'bold',
    },
    [`& .MuiChartsLegend-label`]: {
      color: theme.palette.text.primary,
      fontWeight: '100%',
    },
  });