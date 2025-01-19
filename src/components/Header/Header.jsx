import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (user) {
      try {
        await logoutUser();
        alert('User logged out, navigating to home');
        navigate('/'); // Navigate to home after logout
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    }
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'btn btn-primary' : 'btn btn-ghost'
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/all-properties"
        className={({ isActive }) =>
          isActive ? 'btn btn-primary' : 'btn btn-ghost'
        }
      >
        All Properties
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'btn btn-primary' : 'btn btn-ghost'
          }
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start items-center">
        {/* Dropdown for mobile */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        {/* Logo and Website Name */}
        <NavLink to="/" className="text-xl font-bold flex items-center">
          <img
            src="/logo.png"
            alt="PropertyPulse Logo"
            className="w-8 h-8 mr-2"
          />
          PropertyPulse
        </NavLink>
      </div>

      {/* Links for desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Register/Login or Logout */}
      <div className="navbar-end gap-2">
        {user ? (
          <>
            <div className="flex items-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                  {user.displayName?.charAt(0) || 'U'}
                </div>
              )}
              <span className="font-semibold">{user.displayName || 'User'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? 'btn btn-primary' : 'btn btn-ghost'
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'btn btn-secondary' : 'btn btn-ghost'
              }
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
