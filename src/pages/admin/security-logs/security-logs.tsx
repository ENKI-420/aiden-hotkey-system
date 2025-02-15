import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSidebar from '@/components/dashboard/adminsidebar';

interface SecurityLog {
  type: string;
  timestamp: string;
  message: string;
  ip: string;
}

const SecurityLog = ({ log }: { log: SecurityLog }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={`p-4 rounded-lg border ${
      log.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20' :
      log.type === 'error' ? 'bg-red-500/10 border-red-500/20' :
      'bg-green-500/10 border-green-500/20'
    }`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className={`text-sm ${
          log.type === 'warning' ? 'text-yellow-500' :
          log.type === 'error' ? 'text-red-500' :
          'text-green-500'
        }`}>
          {log.timestamp}
        </p>
        <p className="text-white mt-1">{log.message}</p>
      </div>
      <AlertTriangle className={`w-5 h-5 ${
        log.type === 'warning' ? 'text-yellow-500' :
        log.type === 'error' ? 'text-red-500' :
        'text-green-500'
      }`} />
    </div>
    <p className="text-sm text-gray-400 mt-2">IP: {log.ip}</p>
  </motion.div>
);

const SecurityLogs = () => {
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);

  useEffect(() => {
    // Fetch security logs from an API or data source
    fetchSecurityLogs();
  }, []);

  const fetchSecurityLogs = async () => {
    // Fetch security logs from an API
    const response = await fetch('/api/security-logs');
    const data = await response.json();
    setSecurityLogs(data);
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
            Security Logs
          </h1>
          <p className="text-gray-400 mt-2">
            View and manage security logs
          </p>
        </motion.div>

        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/40 focus:border-transparent transition-all text-white placeholder-gray-400"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        <div className="space-y-4">
          {securityLogs.length > 0 ? (
            securityLogs.map((log, index) => (
              <SecurityLog key={index} log={log} />
            ))
          ) : (
            <p className="text-gray-400">No security logs to display.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SecurityLogs;