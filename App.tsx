import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import { ParticleEffect } from './components/ParticleEffect';
import TechStack from './components/TechStack';
import AboutContact from './components/AboutContact';
import ProjectDetail from './components/ProjectDetail';

// Define project type
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

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const navigateTo = (page: string, projectData: ProjectData | null = null) => {
    setCurrentPage(page);
    if (projectData) {
      setSelectedProject(projectData);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="particle-container absolute inset-0 z-10">
        <ParticleEffect />
      </div>
      <Navigation navigateTo={navigateTo} currentPage={currentPage} />
      
      {currentPage === 'home' && (
        <>
          <Hero />
          <TechStack />
          <Portfolio navigateTo={navigateTo} />
        </>
      )}
      
      {currentPage === 'portfolio' && (
        <div className="pt-24">
          <Portfolio navigateTo={navigateTo} />
        </div>
      )}
      
      {currentPage === 'about-contact' && <AboutContact />}
      
      {currentPage === 'projectDetail' && selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onBack={() => navigateTo('home')} 
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;
