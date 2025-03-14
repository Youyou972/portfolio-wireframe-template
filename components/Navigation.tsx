import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Briefcase, User, Github, Linkedin, Twitter } from 'lucide-react';

interface NavigationProps {
  navigateTo: (page: string) => void;
  currentPage: string;
}

const Navigation = ({ navigateTo, currentPage }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when navigation occurs
  const handleNavigation = (page: string) => {
    setIsOpen(false);
    navigateTo(page);
  };

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg shadow-purple-900/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 md:py-6">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-bold text-xl cursor-pointer"
              onClick={() => handleNavigation('home')}
            >
              <span className="text-white">Yohann Blanchard</span>
              <span className="text-purple-600">.</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <NavItem 
                icon={<Home size={18} />} 
                label="Home" 
                isActive={currentPage === 'home'} 
                onClick={() => handleNavigation('home')} 
              />
              <NavItem 
                icon={<Briefcase size={18} />} 
                label="Portfolio" 
                isActive={currentPage === 'portfolio'} 
                onClick={() => handleNavigation('portfolio')} 
              />
              <NavItem 
                icon={<User size={18} />} 
                label="About" 
                isActive={currentPage === 'about-contact'} 
                onClick={() => handleNavigation('about-contact')} 
              />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-purple-900/30 text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-40"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="h-full flex flex-col items-center justify-center"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div variants={itemVariants} className="mb-8">
                <MobileNavItem 
                  icon={<Home size={24} />} 
                  label="Home" 
                  isActive={currentPage === 'home'} 
                  onClick={() => handleNavigation('home')} 
                />
              </motion.div>
              <motion.div variants={itemVariants} className="mb-8">
                <MobileNavItem 
                  icon={<Briefcase size={24} />} 
                  label="Portfolio" 
                  isActive={currentPage === 'portfolio'} 
                  onClick={() => handleNavigation('portfolio')} 
                />
              </motion.div>
              <motion.div variants={itemVariants} className="mb-12">
                <MobileNavItem 
                  icon={<User size={24} />} 
                  label="About" 
                  isActive={currentPage === 'about-contact'} 
                  onClick={() => handleNavigation('about-contact')} 
                />
              </motion.div>
              
              {/* Social Links */}
              <motion.div variants={itemVariants} className="flex space-x-6 mt-4">
                <SocialLink icon={<Github size={24} />} href="https://github.com/youyou972" />
                <SocialLink icon={<Linkedin size={24} />} href="https://www.linkedin.com/in/yohann-blanchard-a5b5a8b2/" />
                <SocialLink icon={<Twitter size={24} />} href="https://twitter.com/youyou972" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Desktop Navigation Item
const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${
      isActive 
        ? 'bg-purple-900/50 text-purple-400' 
        : 'text-gray-300 hover:text-white'
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </motion.button>
);

// Mobile Navigation Item (larger and more touch-friendly)
const MobileNavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`flex flex-col items-center justify-center w-32 h-32 rounded-2xl transition-colors ${
      isActive 
        ? 'bg-purple-900/50 text-purple-400' 
        : 'bg-gray-900/30 text-gray-300 hover:bg-gray-800/50 hover:text-white'
    }`}
    onClick={onClick}
  >
    <div className="mb-2">{icon}</div>
    <span className="text-lg font-medium">{label}</span>
  </motion.button>
);

// Social Media Link
const SocialLink = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <motion.a
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400 hover:text-white hover:bg-purple-800/50 transition-colors"
  >
    {icon}
  </motion.a>
);

export default Navigation;
