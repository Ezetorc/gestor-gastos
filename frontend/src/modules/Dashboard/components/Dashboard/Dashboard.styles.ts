import type { SxProps, Theme } from "@mui/material";

export const dashboardContainerSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: 2,
  width: "100%",
};

export const dashboardSectionSx: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  width: "70%",
};

export const dashboardBoxSx: SxProps<Theme> = {
  width: { xs: "100%", md: "50%" },
};

export const dashboardCardSx: SxProps<Theme> = (theme) => ({
  height: "100%",
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: 3,
});
