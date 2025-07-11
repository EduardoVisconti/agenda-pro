import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Clients from "./pages/Clients";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    
    <Routes>
      
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Rota direta para o Dashboard */}
      <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />

      <Route path="/appointments" element={<PrivateRoute><Layout><Appointments /></Layout></PrivateRoute>} />
      <Route path="/clients" element={<PrivateRoute><Layout><Clients /></Layout></PrivateRoute>} />
      <Route path="/calendar" element={<PrivateRoute><Layout><Calendar /></Layout></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Layout><Settings /></Layout></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
