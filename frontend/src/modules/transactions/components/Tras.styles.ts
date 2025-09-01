import type { SxProps, Theme } from "@mui/material";

export const TrasContainerSx: SxProps<Theme> = {
  width: "100%",
  Height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  py:2,
};


export const TrasCardSx: SxProps<Theme> = (theme) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: 3,
});
