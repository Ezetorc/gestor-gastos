import type { SxProps, Theme } from "@mui/material";

export const containerSx: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 2,
  width: '100%',
};

export const itemSx: SxProps<Theme> = {
  flex: { xs: '50%', sm: '33%', md: '20%' },
};