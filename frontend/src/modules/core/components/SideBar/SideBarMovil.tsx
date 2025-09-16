import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ListNav } from "../ListNav/ListNav";
import {
  headerMovil,
  listItemButton,
  iconSizeMovil,
} from "./SideBarMovil.styles";
import { buttonOpenMenu } from "./SideBar.styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Props {
  handleOpen: () => void;
}

export default function SideBarMovil({ handleOpen }: Props) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box component="div" sx={headerMovil}>
      <Box component="span">
        {open ? (
          <CloseIcon sx={iconSizeMovil} onClick={toggleDrawer(false)} />
        ) : (
          <MenuIcon sx={iconSizeMovil} onClick={toggleDrawer(true)} />
        )}
      </Box>

      <Typography variant="h6">Control de Gastos</Typography>

      <Drawer open={open} onClose={toggleDrawer(true)}>
        <Box
          sx={listItemButton}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <ListNav open={open} />
          <Button onClick={handleOpen} sx={buttonOpenMenu}>
            <AddCircleOutlineIcon />
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
