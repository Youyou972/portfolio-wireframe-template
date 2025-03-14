import { useState } from 'react';
import { motion } from 'framer-motion';

// Define project data type
interface ProjectData {
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
    type: 'image' | 'video' | 'gif' | 'link';
    url: string;
    label?: string;
  }[];
}

interface PortfolioProps {
  navigateTo: (page: string, projectData: ProjectData | null) => void;
}

const Portfolio = ({ navigateTo }: PortfolioProps) => {
  const [filter, setFilter] = useState<string>('all');
  
  // Sample project data
  const projects: ProjectData[] = [
    {
      id: 1,
      title: "Space Explorer",
      category: "game",
      image: "/images/projects/space-explorer.jpg",
      engine: "Unity",
      type: "3D Adventure",
      platform: "PC, Console",
      role: "Lead Developer",
      timeframe: "2023-2024",
      teamSize: 5,
      description: "A space exploration game where players discover new planets and alien civilizations.",
      media: [
        { type: 'image', url: '/images/projects/space-explorer-1.jpg' },
        { type: 'image', url: '/images/projects/space-explorer-2.jpg' },
        { type: 'video', url: 'https://example.com/space-explorer-video.mp4', label: 'Gameplay Trailer' }
      ]
    },
    {
      id: 2,
      title: "Fantasy RPG Characters",
      category: "3d",
      image: "/images/projects/fantasy-characters.jpg",
      role: "3D Character Artist",
      timeframe: "2022",
      description: "A collection of high-quality 3D character models for fantasy RPG games.",
      media: [
        { type: 'image', url: '/images/projects/fantasy-character-1.jpg' },
        { type: 'image', url: '/images/projects/fantasy-character-2.jpg' }
      ]
    },
    {
      id: 3,
      title: "Puzzle Quest",
      category: "game",
      image: "/images/projects/puzzle-quest.jpg",
      engine: "Unreal Engine",
      type: "Puzzle",
      platform: "Mobile",
      role: "Game Designer & Developer",
      timeframe: "2021-2022",
      teamSize: 3,
      description: "A challenging puzzle game with unique mechanics and beautiful visuals.",
      media: [
        { type: 'image', url: '/images/projects/puzzle-quest-1.jpg' },
        { type: 'gif', url: '/images/projects/puzzle-quest-gameplay.gif' }
      ]
    },
    {
      id: 4,
      title: "Sci-Fi Environment",
      category: "3d",
      image: "/images/projects/scifi-environment.jpg",
      role: "Environment Artist",
      timeframe: "2021",
      description: "A detailed sci-fi environment designed for next-gen games.",
      media: [
        { type: 'image', url: '/images/projects/scifi-environment-1.jpg' },
        { type: 'image', url: '/images/projects/scifi-environment-2.jpg' }
      ]
    },
    {
      id: 5,
      title: "Medieval Adventure",
      category: "game",
      image: "/images/projects/medieval-adventure.jpg",
      engine: "Unity",
      type: "Action RPG",
      platform: "PC",
      role: "Technical Artist & Developer",
      timeframe: "2020-2021",
      teamSize: 4,
      description: "An immersive medieval adventure game with realistic combat and exploration.",
      media: [
        { type: 'image', url: '/images/projects/medieval-adventure-1.jpg' },
        { type: 'video', url: 'https://example.com/medieval-adventure-video.mp4', label: 'Combat Demo' }
      ]
    },
    {
      id: 6,
      title: "Character Animation Reel",
      category: "animation",
      image: "/images/projects/animation-reel.jpg",
      role: "Animator",
      timeframe: "2020",
      description: "A showcase of character animations for various game projects.",
      media: [
        { type: 'video', url: 'https://example.com/animation-reel.mp4', label: 'Animation Reel' }
      ]
    }
  ];
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  // Categories for filter buttons
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'game', label: 'Games' },
    { id: '3d', label: '3D Models' },
    { id: 'animation', label: 'Animations' }
  ];

  // Handle project click
  const handleProjectClick = (project: ProjectData) => {
    navigateTo('projectDetail', project);
  };

  return (
    <section id="portfolio-section" className="py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My Portfolio</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Explore my latest game development projects and 3D artwork
          </p>
        </motion.div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full transition-colors ${
                filter === category.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setFilter(category.id)}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-900">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-gray-300 text-sm">
                    {project.category === 'game' ? `${project.engine} | ${project.type}` : project.role}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 mt-1">{project.category === 'game' ? project.type : project.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
