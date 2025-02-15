import { motion } from "framer-motion";
import Sidebar from '@/components/dashboard/sidebar';

const PortalPage = () => {
  interface Activity {
    date: string;
    type: string;
    description: string;
  }

  const activities: Activity[] = []; // Replace with dynamic data

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
            Patient Portal
          </h1>
          <p className="text-gray-400 mt-2">
            View your recent activities and updates
          </p>
        </motion.div>
        <div className="p-6 rounded-xl border border-cyan-500/20 bg-gray-900/50 backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="min-w-[100px]">
                    <p className="text-sm text-cyan-500">{activity.date}</p>
                    <p className="text-xs text-gray-400">{activity.type}</p>
                  </div>
                  <p className="text-gray-300">{activity.description}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400">No recent activities to display.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortalPage;