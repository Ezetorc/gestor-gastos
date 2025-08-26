import { Box, Card, Typography } from '@mui/material';
import { getDashboardColor } from '../../../utilities/dashboard-colors.utility';

interface TotalsBalanceCardProps {
	totalGastos: number;
	totalIngresos: number;
	balance: number;
	colo: string; 
	backgroundD: string; 
}

export const TotalsBalanceCard = ({ totalGastos, totalIngresos, balance, colo, backgroundD, }: TotalsBalanceCardProps) => {
	const dis = {display: 'flex', alignItems: 'center'}
	const ty = {marginLeft: 'auto', fontWeight: 'bold'}
	return (
		<Card sx={{ height: 200, borderRadius: 3, p: 2, display: 'flex', flexDirection: 'column', background: backgroundD, color: colo }}>
			<Box>
				{[
					{ label: 'Total gastos', value: totalGastos },
					{ label: 'Total ingresos', value: totalIngresos },
				].map(({ label, value }) => (
					<Box key={label} sx={{...dis , mb: 1 }}>
						<Typography variant="h6">{label}:</Typography>
						<Typography variant="h6" sx={{ ...ty, color: getDashboardColor(balance),}}>
							${Math.abs(value).toFixed(2)}
						</Typography>
					</Box>
				))}
			</Box>
			<Box sx={{ borderBottom: '1px solid #ccc', my: 1, marginTop: 'auto' }} />
			<Box sx={{ ...dis, marginTop: 'auto' }}>
				<Typography variant="h5" fontWeight="bold">Balance</Typography>
				<Typography variant="h5" sx={{ ...ty, color: getDashboardColor(balance),}}>
					${Math.abs(balance).toFixed(2)}
				</Typography>
			</Box>
		</Card>
	);
}