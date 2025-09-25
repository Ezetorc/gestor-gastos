import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import {
  containerSx,
  iconSx,
  iconWrapperSx,
  labelSx,
} from "./SummaryStatCard.styles";

interface SummaryStatCardProps {
  label: string;
  value: number;
  Icon: React.ElementType;
  isBalance?: boolean;
}

export const SummaryStatCard: React.FC<SummaryStatCardProps> = ({
  label,
  value,
  Icon,
  isBalance = false,
}) => {
  const getColor = (theme: any) => {
    if (isBalance) {
      if (value > 0) return "rgba(136, 255, 68, 1)";
      if (value < 0) return "rgba(255, 49, 49, 1)";
      return theme.palette.text.primary;
    } else {
      return value <= 0 ? "rgba(136, 255, 68, 1)" : "rgba(255, 49, 49, 1)";
    }
  };

  return (
    <Card sx={containerSx}>
      <CardContent>
        <Box sx={{ justifyContent: "center", mb: 2 }}>
          <Box sx={iconWrapperSx}>
            <Icon sx={iconSx} />
          </Box>
        </Box>
        <Typography variant="subtitle2" sx={labelSx}>
          {label}
        </Typography>
        <Typography
          variant="h5"
          sx={(theme) => ({
            color: getColor(theme),
            fontSize: 19,
            fontWeight: "bold",
          })}
        >
          ${Math.abs(value).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};
