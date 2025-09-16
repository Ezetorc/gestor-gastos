import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import type { DashBoardIcons } from "@/modules/dashboard/types/dashboard-icons";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
  containerList,
  iconSize,
  listItemButton,
  listItemIcon,
} from "./ListNav.styles";
import { useAuth } from "@/modules/auth/hooks/useAuth";

interface Props {
  open: boolean;
}

export const ListNav = ({ open }: Props) => {
  const {logout } = useAuth();
  const dashBoardIcons: DashBoardIcons[] = [
    {
      id: "1",
      name: "Dashboard",
      icon: <DashboardIcon sx={iconSize} />,
      link: "/",
    },
    {
      id: "2",
      name: "Transacciones",
      icon: <CurrencyExchangeIcon sx={iconSize} />,
      link: "transacciones",
    },
  ];

  return (
    <List sx={containerList(open)}>
      {dashBoardIcons.map((items) => (
        <NavLink key={items.id} to={items.link}>
          {({ isActive }) => (
            <ListItem disablePadding>
              <ListItemButton sx={listItemButton(open, isActive)}>
                <ListItemIcon sx={listItemIcon(open, isActive)}>
                  {items.icon}
                </ListItemIcon>
                <ListItemText primary={items.name} />
              </ListItemButton>
            </ListItem>
          )}
        </NavLink>
      ))}
      <Box onClick={()=>logout()} sx={{background:"red", color:"white", cursor:"pointer"}}>Cerrar sesion</Box>
    </List>
  );
};
