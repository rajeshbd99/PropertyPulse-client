import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import logo from "../../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    if (user) {
      try {
        await logoutUser();
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    }
  };

  const links = (
    <>
      <NavLink
        to="/"
        className="block px-4 py-2 text-black dark:text-white hover:bg-blue-600 hover:text-white rounded-md transition-all duration-300"
      >
        Home
      </NavLink>
      <NavLink
        to="/all-properties"
        className="block px-4 py-2 text-black dark:text-white hover:bg-blue-600 hover:text-white rounded-md transition-all duration-300"
      >
        All Properties
      </NavLink>
      <NavLink
        to="/aboutUs"
        className="block px-4 py-2 text-black dark:text-white hover:bg-blue-600 hover:text-white rounded-md transition-all duration-300"
      >
        About Us
      </NavLink>
      <NavLink
        to="/contactUs"
        className="block px-4 py-2 text-black dark:text-white hover:bg-blue-600 hover:text-white rounded-md transition-all duration-300"
      >
        Contact Us
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard"
          className="block px-4 py-2 text-black dark:text-white hover:bg-blue-600 hover:text-white rounded-md transition-all duration-300"
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <div className="navbar bg-transparent backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-lg py-4 px-6 dark:bg-gray-900 dark:text-white">
      <div className="navbar-start flex items-center">
        <NavLink
          to="/"
          className="flex items-center text-black dark:text-white font-semibold text-lg space-x-2"
        >
          <img src={logo} alt="PropertyPulse Logo" className="w-10 h-10 object-contain" />
          <span className="hidden lg:block">PropertyPulse</span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex space-x-6">{links}</ul>
      </div>

      <div className="navbar-end hidden lg:flex items-center gap-6">
        <button
          onClick={toggleDarkMode}
          className="text-2xl p-2 rounded-md transition-all duration-300 hover:bg-blue-200 dark:hover:bg-gray-800"
        >
          {darkMode ? <MdOutlineLightMode className="text-blue-500" /> : <MdOutlineDarkMode className="text-yellow-500" />}
        </button>

        {user ? (
          <>
            <div className="flex items-center space-x-3">
              {user?.photoURL ? (
                <img src={user?.photoURL} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white text-lg">
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}
              <span className="text-black dark:text-white font-medium">
                {user.displayName || "User"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-primary-600 hover:bg-primary-700 text-red-600 font-bold rounded-md px-2 py-2 transition-all duration-300"
            >
              <IoLogOut className="text-3xl" />
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/register" className="btn btn-primary">
              Register
            </NavLink>
            <NavLink to="/login" className="btn btn-secondary">
              Login
            </NavLink>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="navbar-end lg:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="text-2xl p-2 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </button>

          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="text-2xl p-2 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {isDrawerOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {isDrawerOpen && (
          <div className="absolute top-16 right-4 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 z-50">
            <ul className="flex flex-col space-y-2">{links}</ul>
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 mt-4 rounded-md font-semibold transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col space-y-2 mt-4">
                <NavLink to="/register" className="btn btn-primary w-full">
                  Register
                </NavLink>
                <NavLink to="/login" className="btn btn-secondary w-full">
                  Login
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
