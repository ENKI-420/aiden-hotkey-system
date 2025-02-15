import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.h1
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-8"
          >
            Have questions or need assistance? Reach out to us using the form below or contact us at support@noh.com.
          </motion.p>
          <motion.form
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/40 focus:border-transparent transition-all text-white placeholder-gray-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/40 focus:border-transparent transition-all text-white placeholder-gray-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/40 focus:border-transparent transition-all text-white placeholder-gray-500"
                placeholder="Enter your message"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all py-2 rounded-lg text-white font-medium"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>
      <Footer />
    </div>
  );
}