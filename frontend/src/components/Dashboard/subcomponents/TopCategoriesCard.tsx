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
	title = 'Top categorías de gasto', 
	expenses, 
	maxCategories = 5 
}: TopCategoriesCardProps) => {
	// Usar el hook personalizado para procesar gastos por categoría
	const { categories } = useExpensesByCategory(expenses);
	
	// Tomar solo las primeras N categorías
	const topCategories = categories.slice(0, maxCategories);
	
	return (
		<Card sx={{ height: '100%', borderRadius:'10px', background: theme.colors.inputBg, color:'white' }}>
			<CardContent>
				<Typography variant="subtitle2" gutterBottom>
					{title}
				</Typography>
				<Box>
					{topCategories.map(({ label, value }) => ( //tambien podes usar el data 'percentage'
						<Box key={label} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
							<Typography variant="body2">- {label}</Typography>
							<Typography sx={{ color: getDashboardColor(value), marginLeft: 'auto', fontWeight: 'bold' }}>
								${Math.abs(value).toLocaleString()}
							</Typography>
						</Box>
					))}
				</Box>
			</CardContent>
		</Card>
	);
}



