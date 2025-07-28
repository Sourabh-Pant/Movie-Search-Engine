import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const { currentUser, logout } = useAuth();

  return (
<nav className="bg-[#1f1f1f] text-[aqua] px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="text-2xl font-bold ">
        <Link to="/" className="text-[1rem]"> Movie App</Link>
      </div>

      {/* Right: Links */}
      <div className="flex space-x-6 text-lg font-medium">
        <Link to="/" className="text-[1rem] hover:text-blue-400 transition-colors duration-300">
          Home
        </Link>
        <Link to="/favorites" className="text-[1rem] hover:text-blue-400 transition-colors duration-300">
          Favorites
        </Link>

        {!currentUser && (
          <>
            <Link to="/login" className="text-[1rem] hover:text-blue-400 transition-colors duration-300">
              Login
            </Link>
            <Link to="/register" className="text-[1rem] hover:text-blue-400 transition-colors duration-300">
              Register
            </Link>
          </>
        )}

        {currentUser && (
          <button
            onClick={logout}
            className="bg-purple-600 px-4 py-1 text-white rounded hover:bg-purple-700 text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
