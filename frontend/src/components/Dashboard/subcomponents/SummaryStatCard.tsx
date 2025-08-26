import { Box, Card, CardContent, Typography } from '@mui/material';
import { getDashboardColor } from '../../../utilities/dashboard-colors.utility';
import React from 'react';

interface SummaryStatCardProps {
	label: string;
	value: number;
	Icon: React.ElementType;
	colo: string;
	backgroundD: string;
	display: object;
}

export const SummaryStatCard: React.FC<SummaryStatCardProps> = ({ label, value, Icon, colo, backgroundD, display}) => {
	const d = {...display, justifyContent: 'center'};
	return (
		<Card sx={{
			height: '100%',
			borderRadius: 3,
			background: backgroundD,
			color: colo
		}}>
			<CardContent sx={{ textAlign: 'center', p: 3 }}>
				<Box sx={{ ...d, mb: 2 }}>
					<Box
						sx={{
							...d,
							backgroundColor: getDashboardColor(value),
							color: colo,
							borderRadius: 2,
							width: 56,
							height: 56,
						}}
					>
						<Icon sx={{ fontSize: 28 }} />
					</Box>
				</Box>
				<Typography variant="subtitle2" sx={{ color: colo, mb: 1, fontSize: '0.875rem' }}>
					{label}
				</Typography>
				<Typography variant="h5" sx={{ color: getDashboardColor(value), fontWeight: 'bold', fontSize: '1.5rem' }}>
					${Math.abs(value).toFixed(2)}
				</Typography>
			</CardContent>
		</Card>
	);
};


