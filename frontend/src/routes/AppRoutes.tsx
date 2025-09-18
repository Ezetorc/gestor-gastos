import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "@/modules/auth/pages/Login";
import Register from "@/modules/auth/pages/Register";
import { RouteProtected } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";
import DashboardPage from "@/modules/dashboard/Pages/DashboardPage";
import TransactionsPage from "@/modules/transactions/pages/TransactionsPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        <Route
          path="/"
          element={
            <RouteProtected>
              <DashboardPage />
            </RouteProtected>
          }
        />

        <Route
          path="/transacciones"
          element={
            <RouteProtected>
              <TransactionsPage />
            </RouteProtected>
          }
        />
       
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;