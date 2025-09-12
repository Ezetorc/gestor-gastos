import { Container } from '@mui/material';
import { Dashboard } from '../components/Dashboard/Dashboard';
import SideBar from '@/modules/core/components/SideBar/Sidebar';

const DashboardPage = () => {
  return (
    <Container
      maxWidth="xl"
      sx={(theme) => ({
        display: 'flex',
        background: theme.palette.secondary.main,
        minHeight: '100vh',
        minWidth: '100%',
        pt: {xs:10,sm:0}
      })}
    >
      <SideBar />
      <Dashboard />
    </Container>
  );
};
export default DashboardPage;