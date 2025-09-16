import type { SxProps, Theme } from "@mui/material";

export const dashboardContainerSx: SxProps<Theme> = {
  width: "100%",
  Height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  py: 2,
};

export const dashboardSectionSx: SxProps<Theme> = {
  width: "100%",
  display: "grid",
  gap: 2,
  gridTemplateColumns: {
    xs: "repeat(1, 1fr)",
    md: "repeat(2, 1fr)",
  },
};

export const dashboardCardSx: SxProps<Theme> = (theme) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: 3,
});
