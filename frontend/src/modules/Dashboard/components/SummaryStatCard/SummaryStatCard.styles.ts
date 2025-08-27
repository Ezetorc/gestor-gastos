import type { SxProps, Theme } from "@mui/material";

export const containerSx: SxProps<Theme> = (theme) => ({
  height: "100%",
  borderRadius: 3,
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
});

export const cardContentSx: SxProps<Theme> = {
  textAlign: "center",
  p: 3,
};

export const iconWrapperSx: SxProps<Theme> =(theme)=> ({
  justifyContent: "center",
  backgroundColor: "#fff",
  color: theme.palette.text.primary,
  borderRadius: 2,
  width: 56,
  height: 56,
});

export const iconSx: SxProps<Theme> = {
  fontSize: 28,
};

export const labelSx :SxProps<Theme>=(theme)=> ({
  color: theme.palette.text.primary,
  mb: 1,
  fontSize: "0.875rem",
});

export const valueSx: SxProps<Theme> = {
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1.5rem",
};