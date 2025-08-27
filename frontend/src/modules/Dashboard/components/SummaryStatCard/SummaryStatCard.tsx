import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { cardContentSx, containerSx, iconSx, iconWrapperSx, labelSx, valueSx } from "./SummaryStatCard.styles";

interface SummaryStatCardProps {
  label: string;
  value: number;
  Icon: React.ElementType;
}

export const SummaryStatCard: React.FC<SummaryStatCardProps> = ({
  label,
  value,
  Icon,
}) => {
  return (
    <Card sx={containerSx}>
      <CardContent sx={cardContentSx}>
        <Box sx={{ justifyContent: "center", mb: 2 }}>
          <Box sx={iconWrapperSx}>
            <Icon sx={iconSx} />
          </Box>
        </Box>
        <Typography variant="subtitle2" sx={labelSx}>
          {label}
        </Typography>
        <Typography variant="h5" sx={valueSx}>
          ${Math.abs(value).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};
