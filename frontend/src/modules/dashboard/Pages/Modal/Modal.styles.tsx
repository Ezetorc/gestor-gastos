import type { SxProps, Theme } from "@mui/material";

export const modalSx: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

export const cardSx: SxProps<Theme> = {
  maxWidth: 345,
  maxHeight: { xs: "500px", md: "800px" },
  overflowY: { xs: "auto", md: "hidden" },
};

export const buttonExpense = (toggleColor: boolean): SxProps<Theme> => ({
  backgroundColor: !toggleColor ? "red" : "",
  color: "white",
});

export const buttonIncome = (toggleColor: boolean): SxProps<Theme> => ({
  backgroundColor: toggleColor ? "green" : "",
  color: "white",
});
