import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/sidebar';

interface Insight {
  id: number;
  insight: string;
}

const aiInsights: Insight[] = []; // Replace with dynamic data

const AIInsights = () => {
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
            AI Insights
          </h1>
          <p className="text-gray-400 mt-2">
            Discover the latest AI-driven insights
          </p>
        </motion.div>
        <div className="space-y-4">
          {aiInsights.length > 0 ? (
            aiInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                className="p-4 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-cyan-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <p className="text-lg font-semibold text-cyan-500">Insight {index + 1}</p>
                <p className="text-sm text-gray-400">{insight.insight}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">No AI insights to display.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AIInsights;