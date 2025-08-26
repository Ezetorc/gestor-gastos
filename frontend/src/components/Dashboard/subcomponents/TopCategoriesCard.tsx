import { Box, Card, CardContent, Typography } from '@mui/material';
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
	display: object;
	backgroundD: string;
	colo: string;
}

export const TopCategoriesCard = ({ 
	title = 'Top Categorías',
	expenses, 
	maxCategories = 5,
	display,
	backgroundD,
	colo
}: TopCategoriesCardProps) => {
	// Usar el hook personalizado para procesar gastos por categoría
	const { categories } = useExpensesByCategory(expenses);
	
	if (!expenses || expenses.length === 0) {
		return (
		  <Card
			sx={{
			...display,
			  height: 200,
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
		<Card sx={{ height: '100%', borderRadius: 3, background: backgroundD, color: colo }}>
			<CardContent>
				<Typography variant="subtitle2" gutterBottom>
					{title}
				</Typography>
				<hr />
				<Box>
					{topCategories.map(({ label, value }) => ( //tambien podes usar el data 'percentage'
						<Box key={label} sx={{ ...display, mb: 1 }}>
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