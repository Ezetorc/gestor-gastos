import { Box, Card, CardContent, Typography } from '@mui/material';
import { theme } from '@/constants/theme';
import { getDashboardColor } from '../../../utilities/dashboard-colors.utility';
import { useExpensesByCategory } from '../../../hooks/useExpensesByCategory';

interface Expense {
  id: number;
  amount: number;
  date: string;
  category: string;
  payment_method: string;
  description: string;
  user_id: number;
}

interface TopCategoriesCardProps {
	title?: string;
	expenses: Expense[];
	maxCategories?: number;
}

export const TopCategoriesCard = ({ 
	title = 'Top Categorías',
	expenses, 
	maxCategories = 5
}: TopCategoriesCardProps) => {
	// Usar el hook personalizado para procesar gastos por categoría
	const { categories } = useExpensesByCategory(expenses);
	
	if (!expenses || expenses.length === 0) {
		return (
		  <Card
			sx={{
			  height: 200,
			  display: 'flex',
			  alignItems: 'center',
			  justifyContent: 'center',
			}}
		  >
			<Typography>No hay datos de gastos</Typography>
		  </Card>
		);
	  }
	// Tomar solo las primeras N categorías
	const topCategories = categories.slice(0, maxCategories);
	
	return (
		<Card sx={{ height: '100%', borderRadius: 3, background: theme.colors.inputBg, color:'white' }}>
			<CardContent>
				<Typography variant="subtitle2" gutterBottom>
					{title}
				</Typography>
				<hr />
				<Box>
					{topCategories.map(({ label, value }) => ( //tambien podes usar el data 'percentage'
						<Box key={label} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
							<Typography variant="body2">- {label}</Typography>
							<Typography sx={{ color: getDashboardColor(-1), marginLeft: 'auto', fontWeight: 'bold' }}> {/*esto lo puse segun gasto por ahora usa el mismo que gasto por categoria*/}
								${Math.abs(value).toLocaleString()}
							</Typography>
						</Box>
					))}
				</Box>
			</CardContent>
		</Card>
	);
}