import { useEffect, useState } from "react";

export const useDashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const toggleDrawer = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Si es mobile (<600px), lo cerramos por defecto
    setOpen(window.innerWidth > 600);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return {
    open,
    toggleDrawer,
  };
};
