//Estilos css ListNav

export const containerList = (open: boolean) => ({
  a: {
    textDecoration: "none",
    color: "inherit",
  },

  span: {
    fontSize: { xs: 18 },
    transition: "opacity 0.3s ease",
    opacity: open ? "1" : "0",
  },
});

export const listItemButton = (open: boolean, isActive: boolean) => ({
  minHeight: { xs: 80, sm: 48 },
  width: { xs: "100dvw" },
  px: { xs: 10, sm: 2.5 },
  transition: "all 0.3s ease",
  backgroundColor: isActive ? "primary.main" : "transparent",
  color: isActive ? "white" : "inherit",

  "&:hover": {
    backgroundColor: isActive ? "primary.dark" : "action.hover",
  },
  ...(open ? { justifyContent: "initial" } : { justifyContent: "center" }),
});

export const listItemIcon = (open: boolean, isActive: boolean) => ({
  minWidth: 0,
  justifyContent: "center",
  transition: "margin 0.3s ease",
  color: isActive ? "white" : "inherit",
  ...(open ? { mr: 3 } : { mr: "auto" }),
});

export const iconSize = () => ({
  fontSize: 30,
});
