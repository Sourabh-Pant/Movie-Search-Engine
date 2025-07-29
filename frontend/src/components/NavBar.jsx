import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

function NavBar() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#1f1f1f] text-[aqua] px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-[1rem]">Movie App</Link>
        </div>

        {/* Right: Hamburger Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl cursor-pointer">
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-blue-400 transition-colors duration-300">Home</Link>
          <Link to="/favorites" className="hover:text-blue-400 transition-colors duration-300">Favorites</Link>

          {!currentUser && (
            <>
              <Link to="/login" className="hover:text-blue-400 transition-colors duration-300">Login</Link>
              <Link to="/register" className="hover:text-blue-400 transition-colors duration-300">Register</Link>
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
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="flex flex-col mt-4 space-y-4 md:hidden">
          <Link to="/" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/favorites" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Favorites</Link>

          {!currentUser && (
            <>
              <Link to="/login" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}

          {currentUser && (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="bg-purple-600 px-4 py-1 text-white rounded hover:bg-purple-700 text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
