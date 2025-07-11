import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}
