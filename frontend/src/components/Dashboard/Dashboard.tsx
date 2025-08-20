import { Box, Card } from '@mui/material';
import { PieChartComponent } from './subcomponents/PieChart';
import expenses from '../../mocks/expenses.mock.json';
import DashedLineChart from './subcomponents/DashedLineChart';
import { theme } from "@/constants/theme";
import { Summary } from './subcomponents/Summary';
import { Totals } from './subcomponents/Totals';

export const Dashboard = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '70%',
          }}
        >
          <Summary />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '70%',
          }}
        >
          <Totals />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: '70%',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {/* Gráfico circular */}
          <Box sx={{ 
              width: { xs: '100%', md: '50%' },
           }}>
            <Card sx={{ height: '100%', background: theme.colors.inputBg, color:'white', borderRadius:'10px'}}>
             <PieChartComponent expenses={expenses} />
            </Card>
          </Box>

          {/* Gráfico de barras */}
          <Box sx={{ 
            width: { xs: '100%', md: '50%' },
          }}>
           <Card sx={{ height: '100%', background: theme.colors.inputBg, color:'white', borderRadius:'10px' }}>
             <DashedLineChart />
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};
