import { Box, Container } from '@mui/material';
import { Dashboard } from '../components/Dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Dashboard />
      </Box>
    </Container>
  );
};
export default DashboardPage