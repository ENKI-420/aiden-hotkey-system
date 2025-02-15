import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, FlaskRound as Flask, Brain, Settings, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Patient Records", path: "/patients" },
  { icon: Flask, label: "Clinical Trials", path: "/trials" },
  { icon: Brain, label: "AI Insights", path: "/insights" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth > 768) setIsOpen(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen ${isOpen ? "w-64" : isMobile ? "w-0" : "w-20"} bg-gray-900/50 backdrop-blur-xl border-r border-cyan-500/20 fixed left-0 top-0 flex flex-col transition-all duration-300 z-50 ${
          isMobile && isOpen ? "absolute" : ""
        }`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          {isOpen && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
              Norton Oncology Hub
            </h2>
          )}
          <button onClick={toggleSidebar} className="text-cyan-500">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors relative ${
                  isActive ? "text-cyan-500" : "text-gray-400 hover:text-cyan-500"
                }`}
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

        {/* Sign Out */}
        <div className="p-6 border-t border-cyan-500/20">
          <button className="flex items-center gap-3 text-gray-400 hover:text-cyan-500 transition-colors text-sm font-medium w-full">
            <LogOut className="w-5 h-5 neon-glow" />
            {isOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

const ClinicalTrials = () => {
  interface ClinicalTrial {
    id: string;
    name: string;
    status: string;
  }

  const clinicalTrials: ClinicalTrial[] = []; // Replace with dynamic data

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 ml-0 md:ml-64 transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
            Clinical Trials
          </h1>
          <p className="text-gray-400 mt-2">Explore ongoing and upcoming clinical trials</p>
        </motion.div>
        <div className="space-y-4">
          {clinicalTrials.length > 0 ? (
            clinicalTrials.map((trial, index) => (
              <motion.div
                key={trial.id}
                className="p-4 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-cyan-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <p className="text-lg font-semibold text-cyan-500">{trial.name}</p>
                <p className="text-sm text-gray-400">ID: {trial.id}</p>
                <p className="text-sm text-gray-400">Status: {trial.status}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">No clinical trials to display.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClinicalTrials;