import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [jobField, setJobField] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false); // ✅ Track agreement checkbox
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Save user info in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        username,
        email,
        birthdate,
        jobField,
        agreeTerms, // ✅ Store agreement status
        createdAt: serverTimestamp(), // ✅ Add timestamp
      });

      setSuccess('User registered successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      if (error instanceof Error) {
        setError(`Sign-up failed: ${error.message}`);
      } else {
        setError('Sign-up failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1576670159805-861a4b71eef8?auto=format&fit=crop&q=80"
          alt="Medical Lab Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-gray-950" />
      </div>

      {/* Sign-Up Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-gray-900/50 p-8 rounded-2xl border border-cyan-500/20 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">Join the AI-Powered Oncology Hub</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField label="Name" type="text" value={name} setValue={setName} placeholder="Enter your name" />
            <InputField label="Username" type="text" value={username} setValue={setUsername} placeholder="Enter your username" />
            <InputField label="Email" type="email" value={email} setValue={setEmail} placeholder="Enter your email" />
            <InputField label="Password" type="password" value={password} setValue={setPassword} placeholder="Enter your password" />
            <InputField label="Confirm Password" type="password" value={confirmPassword} setValue={setConfirmPassword} placeholder="Confirm your password" />
            <InputField label="Birthdate" type="date" value={birthdate} setValue={setBirthdate} />
            <InputField label="Job Field" type="text" value={jobField} setValue={setJobField} placeholder="Enter your job field" />

            {/* Terms Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-300">
                I agree to the terms and conditions
              </label>
            </div>

            {error && <Alert message={error} type="error" />}
            {success && <Alert message={success} type="success" />}

            <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 flex items-center justify-center gap-2 group">
              <UserPlus className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              Sign Up
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/** 🔹 Reusable Input Component */
const InputField = ({ label, type, value, setValue, placeholder }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full px-4 py-2 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/40 focus:border-transparent transition-all text-white placeholder-gray-500"
      placeholder={placeholder}
    />
  </div>
);

/** 🔹 Reusable Alert Component */
const Alert = ({ message, type }: { message: string; type: "error" | "success" }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm ${type === "error" ? "text-red-500" : "text-green-500"}`}>
    {message}
  </motion.div>
);
