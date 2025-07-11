// src/router.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments"; 
import Clients from "./pages/Clients";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} /> {/* ✅ AQUI */}
          <Route path="clients" element={<Clients />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
