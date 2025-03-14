import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio-section');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative px-4 pt-16">
      <div className="text-center z-20 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Creative Developer Portfolio
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Showcase your skills with this modern, interactive template
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#9333ea' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-purple-500/30 transition-all"
            onClick={scrollToPortfolio}
          >
            View Projects
          </motion.button>
          
          <motion.a
            href="mailto:example@example.com"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(124, 58, 237, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-transparent border border-purple-500 text-purple-400 font-medium rounded-full hover:text-white hover:border-purple-400 transition-colors"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="cursor-pointer"
          onClick={scrollToPortfolio}
        >
          <ChevronDown size={32} className="text-purple-400" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;