import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  // Faz o Welcome desaparecer após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000); // 5000 ms = 5 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div>
        {showWelcome && (
          <h1 className="text-xl font-bold text-gray-800">
            Welcome{user?.displayName ? `, ${user.displayName}!` : "!"}
          </h1>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
}
