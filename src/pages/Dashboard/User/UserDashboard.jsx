import { NavLink, Outlet } from "react-router-dom";
import useUserRole from "../../../hooks/useUserRole";

const Dashboard = () => {
  const [role,isAdminLoading]=useUserRole();
  if(isAdminLoading) return <div>Loading...</div>
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      {
        role==='user' && <nav className="bg-white shadow w-64 p-4 fixed h-full">
        <h1 className="text-xl font-bold mb-6 text-blue-600">User Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/wishlist"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/property-bought"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Property Bought
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-reviews"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              My Reviews
            </NavLink>
          </li>
        </ul>
      </nav>
      }
      {
        role==='admin' && <nav className="bg-white shadow w-64 p-4 fixed h-full">
        <h1 className="text-xl font-bold mb-6 text-blue-600"> Admin Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-reviews"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Manage Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-properties"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Manage Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-users"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/advertise-property"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Advertise property
            </NavLink>
          </li>
        </ul>
      </nav>
      }
{
        role==='agent' && <nav className="bg-white shadow w-64 p-4 fixed h-full">
        <h1 className="text-xl font-bold mb-6 text-blue-600">Agent Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-property"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Add Property
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-properties"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              My Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-sold-properties"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              My Sold Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/requested-properties"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Requested Properties
            </NavLink>
          </li>
        </ul>
      </nav>
      }
      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
