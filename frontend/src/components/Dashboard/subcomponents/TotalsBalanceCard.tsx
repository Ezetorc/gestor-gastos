import { Box, Card, Typography } from '@mui/material';
import { theme } from '@/constants/theme';
import { getDashboardColor } from '../../../utilities/dashboard-colors.utility';

interface TotalsBalanceCardProps {
	totalGastos: number;
	totalIngresos: number;
	balance: number;
}

export const TotalsBalanceCard = ({ totalGastos, totalIngresos, balance }: TotalsBalanceCardProps) => {
	return (
		<Card sx={{ height: 200, borderRadius:'10px', p: 2, display: 'flex', flexDirection: 'column', background: theme.colors.inputBg, color:'white' }}>
			<Box>
				{[
					{ label: 'Total gastos', value: totalGastos },
					{ label: 'Total ingresos', value: totalIngresos },
				].map(({ label, value }) => (
					<Box key={label} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
						<Typography variant="h6">{label}:</Typography>
						<Typography variant="h6" sx={{ color: getDashboardColor(value), marginLeft: 'auto', fontWeight: 'bold' }}>
							${Math.abs(value).toFixed(2)}
						</Typography>
					</Box>
				))}
			</Box>
			<Box sx={{ borderBottom: '1px solid #ccc', my: 1, marginTop: 'auto' }} />
			<Box sx={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
				<Typography variant="h5" fontWeight="bold">Balance</Typography>
				<Typography variant="h5" sx={{ color: getDashboardColor(balance), marginLeft: 'auto', fontWeight: 'bold' }}>
					${Math.abs(balance).toFixed(2)}
				</Typography>
			</Box>
		</Card>
	);
}