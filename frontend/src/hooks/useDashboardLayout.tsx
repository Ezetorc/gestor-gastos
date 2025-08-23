import { useEffect, useState } from "react";

export const useDashboardLayout = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    setOpen(window.innerWidth <= 600 == false);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return {
    handleDrawerOpen,
    handleDrawerClose,
    open,
  };
};
