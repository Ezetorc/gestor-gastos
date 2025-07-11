import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "@/pages/DashBoard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<DashBoard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
