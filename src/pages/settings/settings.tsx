import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/sidebar';
import { Button } from '@/components/ui/button';

const Settings = () => {
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
            Settings
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your account and preferences
          </p>
        </motion.div>
        <div className="space-y-4">
          <motion.div
            className="p-4 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-cyan-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-cyan-500 mb-4">Account Settings</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-gray-400">Email</p>
                <p className="text-gray-300">{/* Replace with dynamic data */}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-400">Password</p>
                <Button variant="outline" className="border-cyan-500 text-cyan-500">
                  Change Password
                </Button>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="p-4 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-cyan-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-cyan-500 mb-4">Notification Settings</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-gray-400">Email Notifications</p>
                <Button variant="outline" className="border-cyan-500 text-cyan-500">
                  Manage
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-400">SMS Notifications</p>
                <Button variant="outline" className="border-cyan-500 text-cyan-500">
                  Manage
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Settings;