import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Link } from "react-router-dom";

const DashBoard = () => {
  return (
    <div>
      <h2>Bienvenido a la app de gastos</h2>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
      <Dashboard/>
    </div>
  );
};

export default DashBoard;
