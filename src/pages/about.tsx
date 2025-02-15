import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export default function About() {
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
            About Norton Oncology Hub
          </motion.h1>
          <motion.p
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-lg text-gray-300 text-center max-w-3xl mx-auto"
          >
            Norton Oncology Hub (NOH) is a cutting-edge platform that leverages AI to provide real-time oncology insights, streamline clinical workflows, and enhance patient care. Our mission is to empower oncologists, researchers, and healthcare professionals with the tools they need to make data-driven decisions and improve patient outcomes.
          </motion.p>
        </div>
      </section>
      <Footer />
    </div>
  );
}