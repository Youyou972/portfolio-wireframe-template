import { useState } from 'react';
import { motion } from 'framer-motion';

// Define project data type
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
  teamSize?: number | string;
  description?: string;
  media?: {
    type: string;
    url: string;
    label?: string;
  }[];
  github?: string;
  demo?: string;
}

interface PortfolioProps {
  onProjectSelect: (project: Project) => void;
}

const Portfolio = ({ onProjectSelect }: PortfolioProps) => {
  const [filter, setFilter] = useState<string>('all');
  
  // Sample project data with placeholder images
  const projects: Project[] = [
    {
      id: 1,
      title: "Project Alpha",
      category: "game",
      image: "https://placehold.co/600x400/3b0764/ffffff?text=Game+Project",
      engine: "Unity",
      type: "3D Adventure",
      platform: "PC, Console",
      role: "Lead Developer",
      timeframe: "2023-2024",
      teamSize: 5,
      description: "A captivating adventure game with innovative mechanics and stunning visuals.",
      media: [
        { type: 'image', url: 'https://placehold.co/800x600/3b0764/ffffff?text=Screenshot+1' },
        { type: 'image', url: 'https://placehold.co/800x600/3b0764/ffffff?text=Screenshot+2' },
        { type: 'video', url: '#', label: 'Gameplay Trailer' }
      ],
      github: "https://github.com/username/project-alpha",
      demo: "https://demo-link.com/project-alpha"
    },
    {
      id: 2,
      title: "3D Character Pack",
      category: "3d",
      image: "https://placehold.co/600x400/4c1d95/ffffff?text=3D+Models",
      role: "3D Character Artist",
      timeframe: "2022",
      description: "A collection of high-quality 3D character models for games and animations.",
      media: [
        { type: 'image', url: 'https://placehold.co/800x600/4c1d95/ffffff?text=Character+1' },
        { type: 'image', url: 'https://placehold.co/800x600/4c1d95/ffffff?text=Character+2' }
      ]
    },
    {
      id: 3,
      title: "Puzzle Quest",
      category: "game",
      image: "https://placehold.co/600x400/5b21b6/ffffff?text=Puzzle+Game",
      engine: "Unreal Engine",
      type: "Puzzle",
      platform: "Mobile",
      role: "Game Designer & Developer",
      timeframe: "2021-2022",
      teamSize: 3,
      description: "A challenging puzzle game with unique mechanics and beautiful visuals.",
      media: [
        { type: 'image', url: 'https://placehold.co/800x600/5b21b6/ffffff?text=Puzzle+Screenshot+1' },
        { type: 'image', url: 'https://placehold.co/800x600/5b21b6/ffffff?text=Puzzle+Screenshot+2' }
      ]
    },
    {
      id: 4,
      title: "Sci-Fi Environment",
      category: "3d",
      image: "https://placehold.co/600x400/6d28d9/ffffff?text=Environment",
      role: "Environment Artist",
      timeframe: "2021",
      description: "A detailed sci-fi environment designed for next-gen games.",
      media: [
        { type: 'image', url: 'https://placehold.co/800x600/6d28d9/ffffff?text=Environment+1' },
        { type: 'image', url: 'https://placehold.co/800x600/6d28d9/ffffff?text=Environment+2' }
      ]
    },
    {
      id: 5,
      title: "Fantasy RPG",
      category: "game",
      image: "https://placehold.co/600x400/7c3aed/ffffff?text=RPG+Game",
      engine: "Unity",
      type: "Action RPG",
      platform: "PC",
      role: "Technical Artist & Developer",
      timeframe: "2020-2021",
      teamSize: 4,
      description: "An immersive fantasy RPG with rich storytelling and dynamic combat.",
      media: [
        { type: 'image', url: 'https://placehold.co/800x600/7c3aed/ffffff?text=RPG+Screenshot+1' },
        { type: 'image', url: 'https://placehold.co/800x600/7c3aed/ffffff?text=RPG+Screenshot+2' }
      ]
    },
    {
      id: 6,
      title: "Animation Reel",
      category: "animation",
      image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Animation",
      role: "Animator",
      timeframe: "2020",
      description: "A showcase of character animations for various game projects.",
      media: [
        { type: 'video', url: '#', label: 'Animation Reel' }
      ]
    }
  ];
  
  // Filter categories
  const categories = ['all', 'web', 'game', 'mobile', 'design'];
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  return (
    <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="portfolio">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-purple-500">Portfolio</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore a collection of my creative work across different platforms and technologies.
        </p>
      </div>
      
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              filter === category 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-900/20 transition-all"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <p className="text-sm text-purple-300 mb-1">{project.category.toUpperCase()}</p>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.engine && (
                  <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-xs">
                    {project.engine}
                  </span>
                )}
                {project.type && (
                  <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs">
                    {project.type}
                  </span>
                )}
                {project.platform && (
                  <span className="px-3 py-1 bg-green-900/30 text-green-300 rounded-full text-xs">
                    {project.platform}
                  </span>
                )}
              </div>
              <p className="text-gray-400 mb-6 line-clamp-3">
                {project.description}
              </p>
              <button
                onClick={() => onProjectSelect(project)}
                className="w-full py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;