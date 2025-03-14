import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-0"
          >
            <h3 className="text-xl font-bold text-white mb-2">Portfolio Template</h3>
            <p className="text-gray-400 max-w-md">
              A customizable portfolio template for showcasing your projects and skills.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex space-x-6"
          >
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
          </motion.div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              {currentYear} Portfolio Template. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;