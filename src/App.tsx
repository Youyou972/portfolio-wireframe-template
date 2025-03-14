import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import ParticleEffect from './components/ParticleEffect';
import TechStack from './components/TechStack';
import AboutContact from './components/AboutContact';
import ProjectDetail from './components/ProjectDetail';

// Define project type
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

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleProjectClose = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background particle effect */}
      <ParticleEffect />
      
      {/* Navigation */}
      <Navigation />
      
      <main>
        {/* Hero section */}
        <Hero />
        
        {/* Portfolio section */}
        <section id="portfolio">
          <Portfolio onProjectSelect={handleProjectSelect} />
        </section>
        
        {/* Tech stack section */}
        <section id="skills">
          <TechStack />
        </section>
        
        {/* About and contact section */}
        <AboutContact />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Project detail modal */}
      {selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onBack={handleProjectClose} 
        />
      )}
    </div>
  );
}

export default App;