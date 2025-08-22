import { Box } from '@mui/material';
import { TotalsBalanceCard } from './TotalsBalanceCard';
import { TopCategoriesCard } from './TopCategoriesCard';
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

const max = 5
const t = "Top Categorías de Gasto"

export const Totals = ({ totalGastos, totalIngresos, balance, expenses }: TotalsProps) => {
    const flexBasis = {xs: '35%', md: '20%'}

    return (
        <Box sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          width: '100%'
        }}>
          
          <Box sx={{ flex: flexBasis }}>
            <TotalsBalanceCard 
              totalGastos={totalGastos}
              totalIngresos={totalIngresos}
              balance={balance}
            />
          </Box>
          <Box sx={{ flex: flexBasis }}>
            <TopCategoriesCard 
              title={t}
              expenses={expenses}
              maxCategories={max}
            />
          </Box>
        </Box>
    )
}
