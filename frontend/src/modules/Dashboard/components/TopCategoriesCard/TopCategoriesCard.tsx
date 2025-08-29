import { useExpensesByCategory } from "@/modules/Dashboard/hooks/useExpensesByCategory";
import { Box, Card, CardContent, Typography } from "@mui/material";
import type { Expense } from "../../types/expense";
import {
  cardSx,
  categoryItemSx,
  categoryValueSx,
  emptyCardSx,
} from "./TopCategoriesCard.styles";

interface TopCategoriesCardProps {
  title?: string;
  expenses: Expense[];
  maxCategories?: number;
}

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
        <Box>
          {topCategories.map(({ label, value }) => (
            <Box key={label} sx={categoryItemSx}>
              <Typography variant="body2">- {label}</Typography>
              <Typography sx={categoryValueSx}>
                ${Math.abs(value).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
