import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Layout from "../components/Layout";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Settings from "../pages/Settings";
import Calendar from "../pages/Calendar";
import Clients from "../pages/Clients";
import Appointments from "../pages/Appointments";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/appointments" element={<Appointments />} />
      </Route>
    </Routes>
  );
}
