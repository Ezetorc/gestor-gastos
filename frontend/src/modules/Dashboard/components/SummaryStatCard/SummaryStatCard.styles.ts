import type { SxProps, Theme } from "@mui/material";

export const containerSx: SxProps<Theme> = (theme) => ({
  height: "100%",
  borderRadius: 3,
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
});

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
  color: theme.palette.text.secondary,
  fontSize: 16,
});

export const valueSx: SxProps<Theme> = (theme)=>({
  color: theme.palette.text.primary,
  fontWeight: "bold",
  fontSize: "1.5rem",
});