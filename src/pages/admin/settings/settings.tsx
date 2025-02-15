import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AdminSidebar from '@/components/dashboard/adminsidebar';

const Settings = () => {
  const [email, setEmail] = useState<string>('admin@example.com'); // Replace with dynamic data
  const [password, setPassword] = useState<string>('********'); // Replace with dynamic data

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSaveSettings = () => {
    // Handle saving settings
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <AdminSidebar />
      
      <main className="flex-1 p-8 ml-64">
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
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-gray-800 text-white p-2 rounded-lg"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-400">Password</p>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-800 text-white p-2 rounded-lg"
                />
              </div>
              <Button onClick={handleSaveSettings} className="mt-4">
                Save Settings
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Settings;