import {  Container } from '@mui/material';
import { Dashboard } from '../components/Dashboard/Dashboard';
import SideBar from '@/modules/core/components/SideBar/Sidebar';

const DashboardPage = () => {
  return (
    <Container maxWidth="xl" sx={(theme)=>({display:"flex",background: theme.palette.secondary.main})}>
        <SideBar/>
        <Dashboard />
    </Container>
  );
};
export default DashboardPage