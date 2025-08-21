import { Box, Card, CardContent, Typography } from '@mui/material';
import { theme } from '../../../constants/theme';
import { getDashboardColor } from '../../../utilities/dashboard-colors.utility';
import React from 'react';

interface SummaryStatCardProps {
	label: string;
	value: number;
	Icon: React.ElementType;
}

export const SummaryStatCard: React.FC<SummaryStatCardProps> = ({ label, value, Icon }) => {
	return (
		<Card sx={{
			height: '100%',
			borderRadius: 3,
			background: theme.colors.inputBg,
			color: 'white'
		}}>
			<CardContent sx={{ textAlign: 'center', p: 3 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
					<Box
						sx={{
							backgroundColor: getDashboardColor(value),
							color: 'white',
							borderRadius: 2,
							width: 56,
							height: 56,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Icon sx={{ fontSize: 28 }} />
					</Box>
				</Box>
				<Typography variant="subtitle2" sx={{ color: theme.colors.placeholder, mb: 1, fontSize: '0.875rem' }}>
					{label}
				</Typography>
				<Typography variant="h5" sx={{ color: getDashboardColor(value), fontWeight: 'bold', fontSize: '1.5rem' }}>
					${Math.abs(value).toFixed(2)}
				</Typography>
			</CardContent>
		</Card>
	);
};


