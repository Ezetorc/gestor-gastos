import type { SxProps, Theme } from "@mui/material";

export const dashboardContainerSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: 2,
};

export const dashboardSectionSx: SxProps<Theme> = {
  display: "flex",
  gap: 2, 
  flexDirection: { xs: "column", md: "row" }
};


export const dashboardCardSx: SxProps<Theme> = (theme) => ({
  height: "100%",
  width: "100%",
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: 3,
});
