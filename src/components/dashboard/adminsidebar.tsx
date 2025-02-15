import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, FlaskRound as Flask, Brain, Settings, Shield, FileText, LogOut, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const adminMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Manage Users", path: "/admin/users" },
  { icon: Flask, label: "Manage Research", path: "/admin/researchs" },
  { icon: Shield, label: "Security Logs", path: "/admin/security-logs" },
  { icon: FileText, label: "Pending Approvals", path: "/admin/approvals" },
  { icon: Brain, label: "AI Insights", path: "/admin/ai-insights" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen ${isOpen ? "w-64" : "w-20"} 
        bg-gray-900/50 backdrop-blur-xl border-r border-cyan-500/20 
        fixed left-0 top-0 flex flex-col transition-all duration-300 z-50`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <h2
            className={`text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text 
            ${!isOpen ? "hidden" : ""}`}
          >
            Norton Oncology Hub
          </h2>
          <button onClick={toggleSidebar} className="text-cyan-500">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 flex-1">
          {adminMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors relative
                ${isActive ? "text-cyan-500" : "text-gray-400 hover:text-cyan-500"}`}
              >
                <item.icon className="w-5 h-5 neon-glow" />
                {isOpen && <span>{item.label}</span>}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 w-1 h-full bg-cyan-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out Button */}
        <div className="p-6 border-t border-cyan-500/20">
          <button className="flex items-center gap-3 text-gray-400 hover:text-cyan-500 transition-colors text-sm font-medium w-full">
            <LogOut className="w-5 h-5 neon-glow" />
            {isOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
    </div>
  );
};

export default AdminSidebar;