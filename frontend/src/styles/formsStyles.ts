import { theme } from "@/constants/theme";

export const inputStyles = {
  root: {
    input: {
      color: "white",
      background: "#374151",
      borderRadius: theme.borderRadius,
    },
    label: { color: "#94a3b8" }, // placeholder/label
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.borderRadius,
      "& fieldset": {
        borderColor: theme.colors.border, // borde normal
      },
      "&:hover fieldset": {
        borderColor: "#8b5cf6", // borde al pasar mouse
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3b82f6", // borde enfocado
      },
    },
  },
};

export const buttonSubmit = {
  background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
  fontWeight: "bold",
  mt: 2,
  py: "10px",
  borderRadius: theme.borderRadius,
  textTransform: "capitalize",
};

export const formStyle = {
  width: "100%",
  maxWidth: "400px", // limita el ancho del formulario
  p: 3,
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borderRadius,
  display: "flex",
  flexDirection: "column",
  gap: 1,
  border: "1px solid",
  borderColor: theme.colors.border,
  boxShadow: 3,
};