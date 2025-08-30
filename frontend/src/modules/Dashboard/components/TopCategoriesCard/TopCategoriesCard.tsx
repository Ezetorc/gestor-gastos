import { useExpensesByCategory } from "@/modules/Dashboard/hooks/useExpensesByCategory";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import {
  cardSx,
  categoryItemSx,
  categoryValueSx,
  emptyCardSx,
} from "./TopCategoriesCard.styles";
import { Circle } from "@mui/icons-material";
import type { TopCategoriesCardProps } from "../../types/topCategories";

const DEFAULT_TITLE = "Top Categorías";
const DEFAULT_MAX_CATEGORIES = 5;

export const TopCategoriesCard = ({
  title = DEFAULT_TITLE,
  expenses,
  maxCategories = DEFAULT_MAX_CATEGORIES,
}: TopCategoriesCardProps) => {
  const { categories } = useExpensesByCategory(expenses);

  if (!expenses || expenses.length === 0) {
    return (
      <Card sx={emptyCardSx}>
        <Typography>No hay datos de gastos</Typography>
      </Card>
    );
  }

  const topCategories = categories.slice(0, maxCategories);

  return (
    <Card sx={cardSx}>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <hr />
        <List>
          {topCategories.map(({ label, value }) => (
            <ListItem key={label} sx={categoryItemSx}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems:"center", gap:2 }}>
                  <Circle sx={{ fontSize: "10px" }} />
                <Typography variant="body2">{label}</Typography>
              </Box>
              <Typography variant="h6" sx={categoryValueSx}>
                ${Math.abs(value).toLocaleString()}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
