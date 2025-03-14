import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

const ParticleEffect = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [score, setScore] = useState(0);
  const [showCaught, setShowCaught] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneText, setMilestoneText] = useState('');
  const [confetti, setConfetti] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  const milestones = [5, 10, 20, 50, 100];
  const colors = ['#8b5cf6', '#6d28d9', '#4c1d95', '#7c3aed', '#5b21b6'];

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const initialParticles: Particle[] = [];
    const count = 15;
    
    for (let i = 0; i < count; i++) {
      initialParticles.push(createParticle(i));
    }
    
    setParticles(initialParticles);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Create a new particle
  const createParticle = (id: number): Particle => {
    if (!containerRef.current) {
      return {
        id,
        x: 0,
        y: 0,
        size: 20,
        speed: 1,
        opacity: 0.8,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    }
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    return {
      id,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 20 + 15,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  };

  // Animation loop
  const animate = useCallback((time: number) => {
    if (!containerRef.current) return;
    
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          let newY = particle.y + particle.speed * deltaTime * 0.01;
          
          if (newY > containerRef.current!.clientHeight) {
            newY = -particle.size;
          }
          
          return {
            ...particle,
            y: newY
          };
        });
      });
    }
    
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  // Start animation loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  // Handle particle click
  const handleParticleClick = (id: number) => {
    // Replace particle
    setParticles(prevParticles => 
      prevParticles.map(particle => 
        particle.id === id ? createParticle(id) : particle
      )
    );
    
    // Increment score and check for milestones
    const newScore = score + 1;
    setScore(newScore);
    
    // Show caught message
    setShowCaught(true);
    setTimeout(() => setShowCaught(false), 1000);
    
    // Check for milestone
    if (milestones.includes(newScore)) {
      setMilestoneText(getMilestoneText(newScore));
      setShowMilestone(true);
      setConfetti(true);
      setTimeout(() => {
        setShowMilestone(false);
        setConfetti(false);
      }, 3000);
    }
  };

  // Get milestone text based on score
  const getMilestoneText = (score: number): string => {
    switch(score) {
      case 5: return 'NICE START!';
      case 10: return 'DOUBLE DIGITS!';
      case 20: return 'COLLECTOR!';
      case 50: return 'HALFWAY THERE!';
      case 100: return 'CHAMPION!';
      default: return '';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
      {/* Background particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full cursor-pointer pointer-events-auto"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          whileHover={{ scale: 1.2 }}
          onClick={() => handleParticleClick(particle.id)}
        />
      ))}
      
      {/* Score display */}
      <div className="absolute top-4 right-4 bg-gray-900/70 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white font-bold">Score: {score}</span>
      </div>
      
      {/* Caught message */}
      <AnimatePresence>
        {showCaught && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-900/80 backdrop-blur-sm px-6 py-3 rounded-lg"
          >
            <span className="text-white font-bold text-xl">+1</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Milestone message */}
      <AnimatePresence>
        {showMilestone && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-900/80 backdrop-blur-sm px-8 py-4 rounded-lg text-center"
          >
            <span className="text-white font-bold text-2xl">{milestoneText}</span>
            <p className="text-purple-200 mt-2">Score: {score}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Confetti effect */}
      {confetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)]
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: Math.random() * 2 + 0.5,
                opacity: [1, 1, 0],
                rotate: Math.random() * 360
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticleEffect;