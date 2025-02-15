import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSidebar from '@/components/dashboard/adminsidebar';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Research {
  id: string;
  title: string;
  status: string;
  participants: number;
  completion: string;
  endDate: string;
}

const ResearchCard = ({ research }: { research: Research }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm text-cyan-500">{research.id}</p>
        <h3 className="text-lg font-semibold text-white mt-1">{research.title}</h3>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${
        research.status === 'Active' ? 'bg-green-500/20 text-green-400' :
        research.status === 'Recruiting' ? 'bg-blue-500/20 text-blue-400' :
        'bg-yellow-500/20 text-yellow-400'
      }`}>
        {research.status}
      </span>
    </div>
    
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div>
        <p className="text-sm text-gray-400">Participants</p>
        <p className="text-lg font-semibold text-white">{research.participants}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Completion</p>
        <p className="text-lg font-semibold text-white">{research.completion}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">End Date</p>
        <p className="text-lg font-semibold text-white">{research.endDate}</p>
      </div>
    </div>

    <div className="flex gap-2">
      <Button variant="outline" className="w-full">View Details</Button>
      <Button className="w-full">Enroll Participant</Button>
    </div>
  </motion.div>
);

const Research = () => {
  const [researches, setResearches] = useState<Research[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch research data from Firestore
    fetchResearches();
  }, []);

  const fetchResearches = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'research'));
      const researchData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Research[];
      setResearches(researchData);
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

  const handleUploadResearch = () => {
    // Handle uploading research
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
            Manage Research
          </h1>
          <p className="text-gray-400 mt-2">
            Add, edit, and manage research projects
          </p>
        </motion.div>

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
          <Button className="flex items-center gap-2" onClick={handleUploadResearch}>
            <Upload className="w-4 h-4" />
            Upload Research
          </Button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading research data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-4">
            {researches.length > 0 ? (
              researches.map((research) => (
                <ResearchCard key={research.id} research={research} />
              ))
            ) : (
              <p className="text-gray-400">No research to display.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Research;