// import QuickAccess from "../components/QuickAccess";
// import FarmDashboard from "../components/FarmDashboard";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Dashboard />

    </div>
  );
};

export default DashboardPage;
