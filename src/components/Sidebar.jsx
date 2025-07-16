import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Calendar, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-8">AgendaPro</h1>
      <nav className="flex flex-col gap-4">
        <NavLink to="/dashboard" className="flex items-center gap-2 hover:text-blue-400">
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/appointments" className="flex items-center gap-2 hover:text-blue-400">
          <Calendar size={20} /> Appointments
        </NavLink>
        <NavLink to="/settings" className="flex items-center gap-2 hover:text-blue-400">
          <Settings size={20} /> Settings
        </NavLink>
      </nav>
    </aside>
);
}
