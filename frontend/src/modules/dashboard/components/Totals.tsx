import { Box, type SxProps, type Theme } from "@mui/material";
import { TopCategoriesCard } from "./TopCategoriesCard/TopCategoriesCard";
import { TotalsBalanceCard } from "./TotalsBalanceCard"; // Asegúrate de importar tu card de totales

interface Expense {
  id: number;
  amount: number;
  date: string;
  category: string;
  payment_method: string;
  description: string;
  user_id: number;
}

interface TotalsProps {
  totalGastos: number;
  totalIngresos: number;
  balance: number;
  expenses: Expense[];
}

const MAX_CATEGORIES = 5;
const TOP_CATEGORIES_TITLE = "Top Categorías de Gasto";

const totalsContainerSx: SxProps<Theme> = {
  width: "100%",
  display: "grid",
  gap: 2,
  gridTemplateColumns: {
    xs: "repeat(1, 1fr)",
    sm: "repeat(2, 1fr)",
  },
};

export const Totals = ({
  totalGastos,
  totalIngresos,
  balance,
  expenses,
}: TotalsProps) => {
  return (
    <Box sx={totalsContainerSx}>
      <TotalsBalanceCard
        totalGastos={totalGastos}
        totalIngresos={totalIngresos}
        balance={balance}
      />
      <TopCategoriesCard
        title={TOP_CATEGORIES_TITLE}
        expenses={expenses}
        maxCategories={MAX_CATEGORIES}
      />
    </Box>
  );
};
