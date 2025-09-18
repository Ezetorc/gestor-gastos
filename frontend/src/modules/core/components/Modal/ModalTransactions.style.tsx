import type { SxProps, Theme } from "@mui/material";

export const modalSx: SxProps<Theme> = {
  position: "absolute",
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  overflowY: "auto",
  scrollbarWidth: "5px",
  scrollbarColor: "#bb40d1ff #222",
  borderRadius: 5,
  maxHeight: "90vh"
};

export const cardSx: SxProps<Theme> = {
  maxHeight: { xs: "500px", md: "800px" },
  width:"400px",
  overflowY: "auto",
  p:2
};

export const buttonExpense = (toggleColor: boolean): SxProps<Theme> => ({
  backgroundColor: !toggleColor ? "red" : "",
  color: "white",
});

export const buttonIncome = (toggleColor: boolean): SxProps<Theme> => ({
  backgroundColor: toggleColor ? "green" : "",
  color: "white",
});
