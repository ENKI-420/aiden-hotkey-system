import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSidebar from '@/components/dashboard/adminsidebar';

interface User {
  id: string;
  name: string;
  role: string;
  status: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch users from an API or data source
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    // Handle adding a new user
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
            Manage Users
          </h1>
          <p className="text-gray-400 mt-2">
            Add, edit, and manage users
          </p>
        </motion.div>

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
          <Button className="flex items-center gap-2" onClick={handleAddUser}>
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading users...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
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
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No users to display.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Users;