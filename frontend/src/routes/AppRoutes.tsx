import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DashboardPage } from "@/pages/DashboardPage";
import Gastos from "@/pages/Gastos";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { RouteProtected } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";

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
          path="/gastos"
          element={
            <RouteProtected>
              <Gastos />
            </RouteProtected>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
