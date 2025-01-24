import { useContext, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation } from "react-router-dom";

const MyProfile = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | My Profile";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      {user ? (
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
          )}

          <div>
            <p className="text-lg font-medium">
              <strong>Name:</strong> {user.displayName || "N/A"}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user.email || "N/A"}
            </p>
            {user.role && (
              <p className="text-lg text-blue-600">
                <strong>Role:</strong> {user.role}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No user information available.</p>
      )}
    </div>
  );
};

export default MyProfile;
