import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Gastos from "@/pages/Gastos";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { RouteProtected } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";
import DashboardLayout from "@/components/layout/DashboardLayout.tsx";
import DashBoard from "@/pages/DashBoard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            //<GuestRoute>
            <Login />
            //</GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            //<GuestRoute>
            <Register />
            //</GuestRoute>
          }
        />

        <Route
          path="/"
          element={
            //<RouteProtected>
            <DashboardLayout />
            //</RouteProtected>
          }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="gastos" element={<Gastos />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
