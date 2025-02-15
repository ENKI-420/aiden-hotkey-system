import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, FileText, AlertTriangle, Search, Filter, Upload, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSidebar from '@/components/dashboard/adminsidebar';
import { db } from '@/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

interface User {
  id: string;
  name: string;
  role: string;
  status: string;
}

interface SecurityLog {
  type: string;
  timestamp: string;
  message: string;
  ip: string;
}

interface Research {
  id: string;
  title: string;
  status: string;
  participants: number;
  completion: string;
  endDate: string;
}

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20"
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </motion.div>
);

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

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [researches, setResearches] = useState<Research[]>([]);
  const [newUser, setNewUser] = useState({ name: '', role: '', status: '' });
  const [newResearch, setNewResearch] = useState({ title: '', status: '', participants: 0, completion: '', endDate: '' });

  useEffect(() => {
    // Fetch users, security logs, and research data from Firestore
    fetchUsers();
    fetchSecurityLogs();
    fetchResearches();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchSecurityLogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'securityLogs'));
      const logsData = querySnapshot.docs.map(doc => doc.data() as SecurityLog);
      setSecurityLogs(logsData);
    } catch (error) {
      console.error('Error fetching security logs:', error);
    }
  };

  const fetchResearches = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'research'));
      const researchData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Research));
      setResearches(researchData);
    } catch (error) {
      console.error('Error fetching research data:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await addDoc(collection(db, 'users'), newUser);
      setNewUser({ name: '', role: '', status: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUploadResearch = async () => {
    try {
      await addDoc(collection(db, 'research'), newResearch);
      setNewResearch({ title: '', status: '', participants: 0, completion: '', endDate: '' });
      fetchResearches();
    } catch (error) {
      console.error('Error uploading research:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteResearch = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'research', id));
      fetchResearches();
    } catch (error) {
      console.error('Error deleting research:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <AdminSidebar />
      
      <main className="ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            System management and security overview
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Active Users"
            value={users.length} // Replace with dynamic data
            color="bg-cyan-500"
          />
          <StatCard
            icon={FileText}
            label="Pending Approvals"
            value="0" // Replace with dynamic data
            color="bg-purple-500"
          />
          <StatCard
            icon={Shield}
            label="Security Alerts"
            value={securityLogs.length} // Replace with dynamic data
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">User Management</h2>
              <Button className="flex items-center gap-2" onClick={handleAddUser}>
                <Plus className="w-4 h-4" />
                Add User
              </Button>
            </div>
            
            <div className="mb-6 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/40 focus:border-transparent transition-all text-white placeholder-gray-400"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.role}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                        {user.status}
                      </span>
                      <Button variant="outline" size="sm">Manage</Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No users to display.</p>
              )}
            </div>
          </motion.div>

          {/* Security Logs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Security Logs</h2>
              <Button variant="outline" size="sm">View All</Button>
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
          </motion.div>
        </div>

        {/* Research Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 mt-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Research Management</h2>
            <Button className="flex items-center gap-2" onClick={handleUploadResearch}>
              <Upload className="w-4 h-4" />
              Upload Research
            </Button>
          </div>
          
          <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search research..."
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/40 focus:border-transparent transition-all text-white placeholder-gray-400"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {researches.length > 0 ? (
              researches.map((research) => (
                <div
                  key={research.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{research.title}</p>
                    <p className="text-sm text-gray-400">{research.status}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                      {research.participants} Participants
                    </span>
                    <Button variant="outline" size="sm">Manage</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteResearch(research.id)}>
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No research to display.</p>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}