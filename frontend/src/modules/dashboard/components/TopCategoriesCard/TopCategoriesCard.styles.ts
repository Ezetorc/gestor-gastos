import type { SxProps, Theme } from "@mui/material";

export const cardSx: SxProps<Theme> = (theme)=>({
  height: '100%',
  background:theme.palette.background.paper,
  borderRadius: 3,
});

export const emptyCardSx: SxProps<Theme> = {
  height: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const categoryItemSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  fontWeight: "bold",
};

export const categoryValueSx: SxProps<Theme> = (theme)=>({
  color: theme.palette.text.secondary, 
  fontWeight: 'bold',
});
