import type { SxProps, Theme } from "@mui/material";

export const cardSx: SxProps<Theme> = {
  height: '100%',
  borderRadius: 3,
};

export const emptyCardSx: SxProps<Theme> = {
  height: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const categoryItemSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  mb: 1,
};

export const categoryValueSx: SxProps<Theme> = {
  color: "#fff", 
  fontWeight: 'bold',
};
