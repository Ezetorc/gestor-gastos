import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { ListNav } from "../ListNav/ListNav";

interface Props {
  children: React.ReactNode;
}

export default function SideBarMovil({ children }: Props) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: "100dvw",
        height: "80dvh",
        marginTop: 13,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}>
      <ListNav open={open} />

      <Divider />
      {children}
    </Box>
  );

  return (
    <Box
      component="div"
      sx={{
        width: "100dvw",
        height: 70,
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}>
      <Box component="span">
        {open ? (
          <CloseIcon sx={{ fontSize: 40 }} onClick={toggleDrawer(false)} />
        ) : (
          <MenuIcon sx={{ fontSize: 40 }} onClick={toggleDrawer(true)} />
        )}
      </Box>

      <Typography sx={{ width: 300, textAlign: "center" }} variant="h5">
        Control de Gastos
      </Typography>

      <Drawer open={open} onClose={toggleDrawer(true)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
