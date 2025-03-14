import { Linkedin, Mail, Github, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="https://www.linkedin.com/in/yohann-blanchard/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="mailto:yohann.blanchard@orange.fr" className="text-gray-400 hover:text-purple-400 transition-colors">
            <Mail size={24} />
          </a>
          <a href="https://github.com/Youyou972" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
            <Github size={24} />
          </a>
        </div>
        <p className="text-gray-400"> Yohann Blanchard, 2025</p>
        
        {/* CV Download Button */}
        <a 
          href="./CV_Blanchard_Yohann_2025.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg transition-all hover:shadow-purple-500/30 hover:scale-105"
        >
          <FileText size={18} />
          <span>CV</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
