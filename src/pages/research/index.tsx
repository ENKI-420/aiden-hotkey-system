import { motion } from 'framer-motion';
import { Search, Filter, Plus, FlaskRound as Flask, Brain, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/dashboard/sidebar';

const trials: { id: string; title: string; status: string; participants: number; completion: string; endDate: string }[] = []; // Replace with dynamic data

const ResearchCard = ({ trial }: { trial: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm text-cyan-500">{trial.id}</p>
        <h3 className="text-lg font-semibold text-white mt-1">{trial.title}</h3>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${
        trial.status === 'Active' ? 'bg-green-500/20 text-green-400' :
        trial.status === 'Recruiting' ? 'bg-blue-500/20 text-blue-400' :
        'bg-yellow-500/20 text-yellow-400'
      }`}>
        {trial.status}
      </span>
    </div>
    
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div>
        <p className="text-sm text-gray-400">Participants</p>
        <p className="text-lg font-semibold text-white">{trial.participants}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Completion</p>
        <p className="text-lg font-semibold text-white">{trial.completion}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">End Date</p>
        <p className="text-lg font-semibold text-white">{trial.endDate}</p>
      </div>
    </div>

    <div className="flex gap-2">
      <Button variant="outline" className="w-full">View Details</Button>
      <Button className="w-full">Enroll Patient</Button>
    </div>
  </motion.div>
);

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

export default function Research() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
              Clinical Trials & Research
            </h1>
            <p className="text-gray-400 mt-2">
              Manage and monitor ongoing clinical trials
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Trial
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Flask}
            label="Active Trials"
            value="" // Replace with dynamic data
            color="bg-cyan-500"
          />
          <StatCard
            icon={Users}
            label="Total Participants"
            value="" // Replace with dynamic data
            color="bg-purple-500"
          />
          <StatCard
            icon={Brain}
            label="AI Insights Generated"
            value="" // Replace with dynamic data
            color="bg-blue-500"
          />
        </div>

        <div className="mb-8 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search trials..."
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/40 focus:border-transparent transition-all text-white placeholder-gray-400"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trials.map((trial) => (
            <ResearchCard key={trial.id} trial={trial} />
          ))}
        </div>
      </main>
    </div>
  );
}