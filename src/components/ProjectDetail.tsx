import { motion } from 'framer-motion';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Media {
  type: string;
  url: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  engine?: string;
  type?: string;
  platform?: string;
  role?: string;
  timeframe?: string;
  teamSize?: string | number;
  description?: string;
  media?: Media[];
  github?: string;
  demo?: string;
}

interface ProjectProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail = ({ project, onBack }: ProjectProps) => {
  // Default values for missing properties
  const {
    title = 'Generic Project Title',
    category = 'Generic Category',
    engine = 'Generic Engine',
    type = 'Generic Type',
    platform = 'Generic Platform',
    role = 'Generic Role',
    timeframe = 'Generic Timeframe',
    teamSize = 'Generic Team Size',
    description = 'A detailed description of this project is coming soon.',
    media = [{ type: 'image', url: 'https://via.placeholder.com/800x450?text=Project+Image' }],
    github = '#',
    demo = '#'
  } = project;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <FaArrowLeft />
          <span>Back to projects</span>
        </motion.button>

        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">
          {/* Project header */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src={media[0]?.url || 'https://via.placeholder.com/800x450?text=Project+Image'} 
              alt={title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-purple-400 text-sm font-medium mb-2">{category}</div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
              </motion.div>
            </div>
          </div>

          {/* Project content */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Project details */}
              <motion.div 
                className="md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  {description}
                </p>

                {/* Media gallery */}
                <div className="space-y-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Project Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {media.map((item, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        {item.type === 'image' ? (
                          <img 
                            src={item.url} 
                            alt={`Project media ${index + 1}`} 
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-gray-400">
                            Media placeholder
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project links */}
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    <FaGithub size={18} />
                    <span>View Code</span>
                  </a>
                  <a 
                    href={demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <FaExternalLinkAlt size={16} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </motion.div>

              {/* Project metadata */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800/50 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
                <div className="space-y-4">
                  <DetailItem label="Type" value={type} />
                  <DetailItem label="Platform" value={platform} />
                  <DetailItem label="Engine/Framework" value={engine} />
                  <DetailItem label="Role" value={role} />
                  <DetailItem label="Timeframe" value={timeframe} />
                  <DetailItem label="Team Size" value={teamSize.toString()} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DetailItem = ({ label, value }: { label: string, value: string }) => (
  <div>
    <div className="text-gray-400 text-sm">{label}</div>
    <div className="text-white">{value}</div>
  </div>
);

export default ProjectDetail;
