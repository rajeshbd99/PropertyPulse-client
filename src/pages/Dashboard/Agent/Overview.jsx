import { useEffect } from "react";
import useUserRole from "../../../hooks/useUserRole";
import { motion } from "framer-motion";
import ReactLoading from "react-loading";
import { FiHome, FiUsers, FiStar, FiDollarSign } from "react-icons/fi";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Overview = () => {
  useEffect(() => {
    document.title = "PropertyPulse | Overview";
  }, []);

  const [role, isRoleLoading] = useUserRole();

  if (isRoleLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ReactLoading type="cylon" color="#1E40AF" height={80} width={80} />
      </div>
    );

  // Fake Data for Charts
  const adminStats = {
    totalUsers: 15,
    totalProperties: 20,
    totalReviews: 20,
    propertyChartData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Properties Listed",
          data: [50, 80, 70, 90, 100, 120],
          borderColor: "#1E40AF",
          backgroundColor: "rgba(30, 64, 175, 0.2)",
        },
        {
          label: "Properties Sold",
          data: [20, 40, 35, 60, 80, 90],
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.2)",
        },
      ],
    },
  };

  const agentStats = {
    totalListed: 10,
    totalSold: 5,
    earnings: 84944,
    salesChartData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Monthly Sales",
          data: [2000, 2500, 1800, 3000, 3500],
          backgroundColor: "#3B82F6",
        },
      ],
    },
  };

  const userStats = {
    boughtProperties: 5,
    wishlistCount: 12,
    reviewsGiven: 3,
    purchaseChartData: {
      labels: ["Bought", "Wishlist", "Reviewed"],
      datasets: [
        {
          label: "User Activity",
          data: [5, 12, 3],
          backgroundColor: ["#6366F1", "#F59E0B", "#EF4444"],
        },
      ],
    },
  };

  return (
    <motion.div
      className="dashboard p-4 sm:p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-6 text-center sm:text-left">
        Dashboard Overview
      </h2>

      {/* Admin Overview */}
      {role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatCard title="Total Users" value={adminStats.totalUsers} icon={<FiUsers />} />
          <StatCard title="Total Properties" value={adminStats.totalProperties} icon={<FiHome />} />
          <StatCard title="Total Reviews" value={adminStats.totalReviews} icon={<FiStar />} />
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <ChartContainer>
              <Line data={adminStats.propertyChartData} />
            </ChartContainer>
          </div>
        </div>
      )}

      {/* Agent Overview */}
      {role === "agent" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatCard title="Total Properties Listed" value={agentStats.totalListed} icon={<FiHome />} />
          <StatCard title="Properties Sold" value={agentStats.totalSold} icon={<FiStar />} />
          <StatCard title="Earnings ($)" value={agentStats.earnings} icon={<FiDollarSign />} />
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <ChartContainer>
              <Bar data={agentStats.salesChartData} />
            </ChartContainer>
          </div>
        </div>
      )}

      {/* User Overview */}
      {role === "user" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatCard title="Properties Bought" value={userStats.boughtProperties} icon={<FiHome />} />
          <StatCard title="Wishlist Count" value={userStats.wishlistCount} icon={<FiStar />} />
          <StatCard title="Reviews Given" value={userStats.reviewsGiven} icon={<FiStar />} />
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <ChartContainer small>
              <Pie data={userStats.purchaseChartData} />
            </ChartContainer>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon }) => (
  <div className="bg-gradient-to-br from-blue-100 to-blue-300 p-4 sm:p-6 rounded-lg shadow-lg flex items-center">
    <div className="text-3xl sm:text-4xl text-blue-600">{icon}</div>
    <div className="ml-3 sm:ml-4">
      <h3 className="text-sm sm:text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-lg sm:text-2xl font-bold text-blue-900">{value}</p>
    </div>
  </div>
);

// Responsive Chart Container
const ChartContainer = ({ children, small }) => (
  <div
    className={`dashboadr-card bg-white p-3 sm:p-4 rounded-lg shadow-lg overflow-auto flex justify-center ${
      small ? "max-h-64" : "max-h-[400px]"
    }`}
  >
    {children}
  </div>
);

export default Overview;
