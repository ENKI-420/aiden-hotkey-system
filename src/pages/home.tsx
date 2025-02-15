import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay: 0.2 }
};

const TypewriterText = ({ text }: { text: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <motion.span
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, delay: 0.5 }}
        className="inline-block whitespace-pre-wrap"
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

const FeatureCard = ({ title, description, delay = 0 }: { title: string; description: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="relative p-6 rounded-xl bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    <h3 className="text-xl font-semibold text-cyan-500 mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const Testimonial = ({ author, role, quote }: { author: string; role: string; quote: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="p-6 rounded-xl bg-gray-900/30 backdrop-blur-lg border border-cyan-500/20"
  >
    <p className="text-gray-300 italic mb-4">"{quote}"</p>
    <div className="flex items-center gap-4">
      <div>
        <p className="font-semibold text-cyan-500">{author}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80"
            alt="AI Medical Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-gray-950" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"
              variants={fadeIn}
            >
              Welcome to Norton Oncology Hub
            </motion.h1>
            <div className="text-xl md:text-2xl text-gray-300 mb-8">
              <TypewriterText text="Where AI Meets Cancer Research" />
            </div>
            <p className="text-gray-400 mb-8 text-lg">
              Every second counts in oncology. With AI-powered insights, real-time Epic integration, 
              and automated clinical workflows, NOH empowers doctors, researchers, and patients like never before.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all"
                >
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"
          >
            Why Choose NOH?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="AI-Powered Research"
              description="NOH's deep-learning models analyze thousands of clinical trials, patient cases, and genomic sequences in seconds."
              delay={0.2}
            />
            <FeatureCard
              title="Real-Time FHIR Data Integration"
              description="Seamlessly connect with Epic's patient records, ensuring doctors make data-driven decisions in real time."
              delay={0.4}
            />
            <FeatureCard
              title="Secure & Compliant"
              description="NOH follows strict HIPAA compliance, with advanced encryption and OpenID authentication."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"
          >
            See NOH in Action
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-xl shadow-lg"
          >
            <iframe width="1500" height="444" src="https://www.youtube.com/embed/Wvas7hnUYIw" title="Norton Cancer Institute Provider Recruitment" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"
          >
            Real Impact Stories
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Testimonial
              author="Dr. Emma Lawson"
              role="Oncologist"
              quote="NOH has transformed how I analyze patient cases. AI-driven insights have saved us weeks of research time."
            />
            <Testimonial
              author="Michael R."
              role="Cancer Survivor"
              quote="With NOH's real-time trial matching, I got into an experimental immunotherapy program that saved my life."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
              Start Your AI-Driven Oncology Journey Today
            </h2>
            <p className="text-gray-400 mb-8">
              Join top oncologists, researchers, and healthcare professionals in leveraging AI for better cancer treatment.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all"
                >
                  Get Started – For Doctors
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
                >
                  Explore Research
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}