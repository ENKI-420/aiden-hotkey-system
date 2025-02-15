import { motion } from 'framer-motion';
import { Activity, Users, AlertTriangle, Brain } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Sidebar from '@/components/dashboard/sidebar';

// Placeholder data for the chart, replace with dynamic data as needed
interface DataPoint {
  name: string;
  value: number;
}

const data: DataPoint[] = [];

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

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
            Welcome, Doctor
          </h1>
          <p className="text-gray-400 mt-2">
            Access real-time oncology insights powered by AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Active Patients"
            value="" // Replace with dynamic data
            color="bg-cyan-500"
          />
          <StatCard
            icon={Activity}
            label="Ongoing Clinical Trials"
            value="" // Replace with dynamic data
            color="bg-purple-500"
          />
          <StatCard
            icon={AlertTriangle}
            label="AI Risk Alerts"
            value="" // Replace with dynamic data
            color="bg-red-500"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20"
        >
          <h2 className="text-xl font-bold mb-6">Patient Recovery Trends</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#06b6d4"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20"
        >
          <div className="flex items-center gap-4 mb-4">
            <Brain className="w-6 h-6 text-cyan-500" />
            <h2 className="text-xl font-bold">AI Insights</h2>
          </div>
          <p className="text-gray-300">
            {/* Replace with dynamic data */}
          </p>
        </motion.div>
      </main>
    </div>
  );
}