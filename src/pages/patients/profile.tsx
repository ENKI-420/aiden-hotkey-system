import { motion } from 'framer-motion';
import { Activity, Calendar, FileText, Heart, History } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '@/components/dashboard/sidebar';
import { Button } from '@/components/ui/button';

interface HealthData {
  date: string;
  bloodPressure: number;
  heartRate: number;
}

const healthData: HealthData[] = []; // Replace with dynamic data

const InfoCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-cyan-500/20">
        <Icon className="w-6 h-6 text-cyan-500" />
      </div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-xl font-semibold text-white">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default function PatientProfile() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row">
      <Sidebar />
      
      <main className="flex-1 p-4 md:p-8 ml-0 md:ml-64 transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
              Patient Profile
            </h1>
            <p className="text-gray-400 mt-2">
              Comprehensive health overview and AI insights
            </p>
          </div>
          <Button variant="outline" className="border-cyan-500 text-cyan-500">
            Download Report
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InfoCard
            icon={FileText}
            title="Patient ID"
            value="" // Replace with dynamic data
          />
          <InfoCard
            icon={Calendar}
            title="Last Visit"
            value="" // Replace with dynamic data
          />
          <InfoCard
            icon={Activity}
            title="Status"
            value="" // Replace with dynamic data
          />
          <InfoCard
            icon={Heart}
            title="Risk Level"
            value="" // Replace with dynamic data
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20"
          >
            <h2 className="text-xl font-bold mb-6">Health Metrics</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="bloodPressure"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    name="Blood Pressure"
                  />
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Heart Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Treatment Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <History className="w-5 h-5 text-cyan-500" />
              <h2 className="text-xl font-bold">Treatment Timeline</h2>
            </div>
            <div className="space-y-6">
              {([] as Array<{ date: string; event: string }>) /* Replace with dynamic data */.map((item, index) => (
                <div key={index} className="relative pl-6 border-l border-cyan-500/20">
                  <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[5px] rounded-full bg-cyan-500" />
                  <p className="text-sm text-cyan-500">{item.date}</p>
                  <p className="text-gray-300">{item.event}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20"
          >
            <h2 className="text-xl font-bold mb-6">AI Treatment Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <h3 className="text-lg font-semibold text-cyan-500 mb-2">
                    Treatment Effectiveness
                  </h3>
                  <p className="text-gray-300">
                    {/* Replace with dynamic data */}
                  </p>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <h3 className="text-lg font-semibold text-purple-500 mb-2">
                    Risk Assessment
                  </h3>
                  <p className="text-gray-300">
                    {/* Replace with dynamic data */}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-blue-500 mb-2">
                    Clinical Trial Match
                  </h3>
                  <p className="text-gray-300">
                    {/* Replace with dynamic data */}
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h3 className="text-lg font-semibold text-green-500 mb-2">
                    Next Steps
                  </h3>
                  <p className="text-gray-300">
                    {/* Replace with dynamic data */}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}