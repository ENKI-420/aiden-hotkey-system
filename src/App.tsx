import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Dashboard from './pages/dashboard';
import PatientProfile from './pages/patients/profile';
import Research from './pages/admin/researchs/index';
import Admin from './pages/admin';
import PatientPortal from './pages/portal/record';
import About from './pages/about';
import Contact from './pages/contact';
import Privacy from './pages/privacy';
import PatientRecords from './pages/patients/profile';
import ClinicalTrials from './pages/trails/trials';
import AIInsights from './pages/ai/insights';
import Settings from './pages/settings/settings';
import Users from './pages/admin/users/users';
import SecurityLogs from './pages/admin/security-logs/security-logs';
import Approvals from './pages/admin/approvals/approvals';
import AdminAIInsights from './pages/admin/AIInsights/aiinsights';
import AdminSettings from './pages/admin/settings/settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients/profile" element={<PatientProfile />} />
        <Route path="/patients/records" element={<PatientRecords />} />
        <Route path="/trials" element={<ClinicalTrials />} />
        <Route path="/insights" element={<AIInsights />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/research" element={<Research />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/portal" element={<PatientPortal />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/security-logs" element={<SecurityLogs />} />
        <Route path="/admin/approvals" element={<Approvals />} />
        <Route path="/admin/ai-insights" element={<AdminAIInsights />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </Router>
  );
}

export default App;