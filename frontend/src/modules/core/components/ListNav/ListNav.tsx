import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import type { DashBoardIcons } from "@/modules/dashboard/types/dashboard-icons";
import { listItemButton, listItemIcon } from "../SideBar/SideBar.styles";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

interface Props {
  open: boolean;
}

export const ListNav = ({ open }: Props) => {
  const dashBoardIcons: DashBoardIcons[] = [
    {
      id: "1",
      name: "DashBoard",
      icon: <DashboardIcon />,
      link: "/",
    },
    {
      id: "2",
      name: "Transacciones",
      icon: <CurrencyExchangeIcon />,
      link: "/transacciones",
    },
  ];

  return (
    <List>
      {dashBoardIcons.map((items) => (
        <NavLink
          key={items.id}
          to={items.link}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}>
          {({ isActive }) => (
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton sx={listItemButton(open, isActive)}>
                <ListItemIcon sx={listItemIcon(open, isActive)}>
                  {items.icon}
                </ListItemIcon>
                <ListItemText
                  primary={items.name}
                  sx={[
                    {
                      transition: "opacity 0.3s ease",
                    },
                    open ? { opacity: 1 } : { opacity: 0 },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          )}
        </NavLink>
      ))}
    </List>
  );
};
