import {  Container } from '@mui/material';
import { Dashboard } from '../components/Dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <Container maxWidth="xl" sx={(theme)=>({background: theme.palette.secondary.main})}>
        <Dashboard />
    </Container>
  );
};
export default DashboardPage