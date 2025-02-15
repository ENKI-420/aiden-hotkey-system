import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSidebar from '@/components/dashboard/adminsidebar';

interface Approval {
  id: string;
  name: string;
  type: string;
  status: string;
  date: string;
}

const ApprovalCard = ({ approval, onApprove, onReject }: { approval: Approval, onApprove: (id: string) => void, onReject: (id: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm text-cyan-500">{approval.id}</p>
        <h3 className="text-lg font-semibold text-white mt-1">{approval.name}</h3>
        <p className="text-sm text-gray-400">{approval.type}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${
        approval.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
        approval.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
        'bg-red-500/20 text-red-400'
      }`}>
        {approval.status}
      </span>
    </div>
    
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-400">{approval.date}</p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onApprove(approval.id)}>
          <CheckCircle className="w-4 h-4" />
          Approve
        </Button>
        <Button variant="outline" size="sm" onClick={() => onReject(approval.id)}>
          <XCircle className="w-4 h-4" />
          Reject
        </Button>
      </div>
    </div>
  </motion.div>
);

const Approvals = () => {
  const [approvals, setApprovals] = useState<Approval[]>([]);

  useEffect(() => {
    // Fetch approvals from an API or data source
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    // Fetch approvals from an API
    const response = await fetch('/api/approvals');
    const data = await response.json();
    setApprovals(data);
  };

  const handleApprove = (id: string) => {
    // Handle approving an approval
    setApprovals(approvals.map(approval => approval.id === id ? { ...approval, status: 'Approved' } : approval));
  };

  const handleReject = (id: string) => {
    // Handle rejecting an approval
    setApprovals(approvals.map(approval => approval.id === id ? { ...approval, status: 'Rejected' } : approval));
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
            Pending Approvals
          </h1>
          <p className="text-gray-400 mt-2">
            Review and manage pending approvals
          </p>
        </motion.div>

        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search approvals..."
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/40 focus:border-transparent transition-all text-white placeholder-gray-400"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        <div className="space-y-4">
          {approvals.length > 0 ? (
            approvals.map((approval) => (
              <ApprovalCard key={approval.id} approval={approval} onApprove={handleApprove} onReject={handleReject} />
            ))
          ) : (
            <p className="text-gray-400">No approvals to display.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Approvals;