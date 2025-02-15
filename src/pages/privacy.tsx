import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export default function Privacy() {
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
            Privacy Policy
          </motion.h1>
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-lg text-gray-300 max-w-3xl mx-auto space-y-6"
          >
            <p>
              At Norton Oncology Hub, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information.
            </p>
            <h2 className="text-2xl font-semibold text-cyan-500">Information Collection</h2>
            <p>
              We collect personal information that you provide to us when you use our services, such as your name, email address, and any other information you choose to provide.
            </p>
            <h2 className="text-2xl font-semibold text-cyan-500">Use of Information</h2>
            <p>
              We use your personal information to provide and improve our services, communicate with you, and ensure the security of our platform.
            </p>
            <h2 className="text-2xl font-semibold text-cyan-500">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.
            </p>
            <h2 className="text-2xl font-semibold text-cyan-500">Contact Us</h2>
            <p>
              If you have any questions or concerns about our Privacy Policy, please contact us at privacy@noh.com.
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}