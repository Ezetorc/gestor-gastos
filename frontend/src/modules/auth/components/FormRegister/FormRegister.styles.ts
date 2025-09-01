import type { SxProps, Theme } from "@mui/material";

 export const inputSx: SxProps<Theme> = (theme) => ({
  input: {
    color: theme.palette.text.primary,
    background: theme.palette.grey[800],
    borderRadius: theme.shape.borderRadius,
  },
  label: {
    color: theme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
});

 export const buttonSubmitSx: SxProps<Theme> = (theme) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  fontWeight: "bold",
  mt: 2,
  py: "10px",
  borderRadius: theme.shape.borderRadius,
  textTransform: "capitalize",
});

 export const formSx: SxProps<Theme> = (theme) => ({
  width: "100%",
  maxWidth: 400,
  p: 3,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  gap: 1,
  border: "1px solid",
  borderColor: theme.palette.divider,
  boxShadow: theme.shadows[3],
});
