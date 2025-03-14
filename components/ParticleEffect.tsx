import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Particle = {
  id: number;
  left: number;
  top: number;
  rotation: number;
  size: number;
  delay: number;
  image: string;
  visible: boolean;
  animationDuration: number;
  direction: {
    x: number;
    y: number;
  };
  amplitude: number;
};

export const ParticleEffect = ({ count = 90 }: { count?: number }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [score, setScore] = useState(0);
  const [scorePosition, setScorePosition] = useState({ x: 0, y: 0 });
  const [showScore, setShowScore] = useState(false);
  const [showScoreDisplay, setShowScoreDisplay] = useState(false); // Initially hidden
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneText, setMilestoneText] = useState('');
  const [confetti, setConfetti] = useState(false);
  const scoreTimerRef = useRef<number | null>(null);
  const milestoneTimerRef = useRef<number | null>(null);
  const confettiTimerRef = useRef<number | null>(null);

  // Determine if current score is a milestone
  const isMilestone = useMemo(() => {
    const milestones = [5, 10, 20, 50, 100];
    return milestones.includes(score);
  }, [score]);

  // Get milestone message based on score
  const getMilestoneText = (score: number): string => {
    switch(score) {
      case 5:
        return 'NICE START!';
      case 10:
        return 'DOUBLE DIGITS!';
      case 20:
        return 'DINO HUNTER!';
      case 50:
        return 'EXTINCTION EVENT!';
      case 100:
        return 'PALEONTOLOGIST!';
      default:
        return '';
    }
  };

  // Determine score color based on value
  const getScoreColor = useMemo(() => {
    if (score >= 100) return 'text-yellow-400';
    if (score >= 50) return 'text-red-500';
    if (score >= 20) return 'text-green-500';
    if (score >= 10) return 'text-blue-500';
    if (score >= 5) return 'text-purple-500';
    return 'text-white';
  }, [score]);

  // Determine border color based on score
  const getBorderColor = useMemo(() => {
    if (score >= 100) return 'border-yellow-400';
    if (score >= 50) return 'border-red-500';
    if (score >= 20) return 'border-green-500';
    if (score >= 10) return 'border-blue-500';
    if (score >= 5) return 'border-purple-500';
    return 'border-purple-500';
  }, [score]);

  useEffect(() => {
    const dinosaurImages = [
      '/images/diplodocus.png',
      '/images/triceratops.png',
      '/images/tyrannosaurus-rex.png'
    ];

    const newParticles = Array.from({ length: count }, (_, i) => {
      // Generate random direction vector
      const angle = Math.random() * Math.PI * 2; // Random angle in radians
      const directionX = Math.cos(angle) * (Math.random() < 0.5 ? -1 : 1);
      const directionY = Math.sin(angle) * (Math.random() < 0.5 ? -1 : 1);
      
      // Random speed (duration inversely proportional to speed)
      const speed = 0.5 + Math.random() * 1.5; // Speed factor between 0.5 and 2
      const duration = 30 / speed; // Slower speed = longer duration
      
      // Random size variation - increased for better visibility
      const sizeVariation = 20 + Math.random() * 25;
      
      // Constrain positions to stay away from edges
      const safeMargin = 5; // % from the edge
      const safeLeft = safeMargin + (100 - 2 * safeMargin) * Math.random();
      const safeTop = safeMargin + (100 - 2 * safeMargin) * Math.random();
      
      // Constrain movement to prevent going off-screen
      const maxMovement = 25; // Reduced maximum movement distance
      const scaledDirectionX = directionX * maxMovement;
      const scaledDirectionY = directionY * maxMovement;
      
      return {
        id: i,
        left: safeLeft,
        top: safeTop,
        rotation: Math.random() * 360,
        size: sizeVariation,
        // Much shorter delays for faster initial appearance
        delay: Math.random() * 1.5,
        image: dinosaurImages[Math.floor(Math.random() * dinosaurImages.length)],
        visible: true,
        animationDuration: duration,
        direction: {
          x: scaledDirectionX,
          y: scaledDirectionY
        },
        amplitude: 10 + Math.random() * 20 // Reduced amplitude for movement
      };
    });
    
    setParticles(newParticles);
    
    return () => {
      if (scoreTimerRef.current !== null) {
        window.clearTimeout(scoreTimerRef.current);
      }
      if (milestoneTimerRef.current !== null) {
        window.clearTimeout(milestoneTimerRef.current);
      }
      if (confettiTimerRef.current !== null) {
        window.clearTimeout(confettiTimerRef.current);
      }
    };
  }, [count]);

  const handleParticleClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    e.preventDefault(); // Prevent default behavior
    
    // Get click position for score display
    setScorePosition({ 
      x: e.clientX, 
      y: e.clientY 
    });
    
    // Store previous score to check for milestone
    const newScore = score + 1;
    
    // Increment score and show it
    setScore(newScore);
    setShowScore(true);
    
    // Show the score display when a dinosaur is clicked
    setShowScoreDisplay(true);
    
    // Check if we've hit a milestone
    const milestones = [5, 10, 20, 50, 100];
    if (milestones.includes(newScore)) {
      setMilestoneText(getMilestoneText(newScore));
      setShowMilestone(true);
      setConfetti(true);
      
      // Clear previous milestone timer if exists
      if (milestoneTimerRef.current !== null) {
        window.clearTimeout(milestoneTimerRef.current);
      }
      
      // Hide milestone message after 3 seconds
      milestoneTimerRef.current = window.setTimeout(() => {
        setShowMilestone(false);
      }, 3000);
      
      // Hide confetti after 4 seconds
      if (confettiTimerRef.current !== null) {
        window.clearTimeout(confettiTimerRef.current);
      }
      
      confettiTimerRef.current = window.setTimeout(() => {
        setConfetti(false);
      }, 4000);
    }
    
    // Reset the timer for hiding the score display
    if (scoreTimerRef.current !== null) {
      window.clearTimeout(scoreTimerRef.current);
    }
    
    scoreTimerRef.current = window.setTimeout(() => {
      setShowScoreDisplay(false);
    }, 6000);
    
    // Hide score after animation
    window.setTimeout(() => {
      setShowScore(false);
    }, 1000);
    
    setParticles(prevParticles => 
      prevParticles.map(particle => 
        particle.id === id 
          ? { ...particle, visible: false } 
          : particle
      )
    );
  };

  return (
    <div className="particle-container overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          particle.visible && (
            <motion.div
              key={particle.id}
              className="absolute cursor-pointer"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                zIndex: 10,
                pointerEvents: 'auto',
                userSelect: 'none'
              }}
              initial={{ 
                rotate: particle.rotation,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                rotate: [
                  particle.rotation, 
                  particle.rotation + 10, 
                  particle.rotation - 5, 
                  particle.rotation
                ],
                opacity: 1,
                scale: 1,
                x: [
                  0,
                  particle.direction.x * 0.25,
                  particle.direction.x * 0.5,
                  particle.direction.x * 0.75,
                  particle.direction.x
                ],
                y: [
                  0,
                  particle.direction.y * 0.25,
                  particle.direction.y * 0.5,
                  particle.direction.y * 0.75,
                  particle.direction.y
                ]
              }}
              transition={{
                delay: particle.delay,
                duration: particle.animationDuration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              exit={{ 
                scale: 0, 
                opacity: 0, 
                rotate: particle.rotation + 360,
                transition: { duration: 0.3, ease: "backIn" }
              }}
              onClick={(e) => handleParticleClick(particle.id, e)}
            >
              <motion.img
                src={particle.image}
                alt="dinosaur particle"
                style={{
                  width: `${particle.size}px`,
                  height: 'auto',
                  maxWidth: '100%',
                  pointerEvents: 'none',
                  filter: 'brightness(0) invert(1)' // Make dinosaurs white
                }}
                whileTap={{ scale: 0 }}
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Score popup */}
      <AnimatePresence>
        {showScore && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -50, scale: 1.2 }}
            exit={{ opacity: 0, y: -80, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="fixed text-2xl font-bold text-purple-500 z-50 pointer-events-none"
            style={{ 
              left: scorePosition.x - 10, 
              top: scorePosition.y - 10 
            }}
          >
            +1
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Score display */}
      <AnimatePresence>
        {showScoreDisplay && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: isMilestone ? [1, 1.2, 1] : 1,
              rotate: isMilestone ? [0, -5, 5, -3, 3, 0] : 0
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.5,
              scale: { duration: 0.5, repeat: isMilestone ? 2 : 0 },
              rotate: { duration: 0.5, repeat: isMilestone ? 3 : 0 }
            }}
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-900/80 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg z-50 border-2 ${getBorderColor}`}
            style={{ 
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              textAlign: 'center'
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm tracking-wider">DINOSAURS CAUGHT</span>
              <motion.span 
                className={`text-2xl font-bold ${getScoreColor}`}
                animate={{ 
                  scale: showScore ? [1, 1.3, 1] : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {score}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone celebration */}
      <AnimatePresence>
        {showMilestone && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-8 py-4 rounded-lg shadow-lg z-50 border-2 border-yellow-400"
            style={{ 
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              textAlign: 'center'
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-xl font-bold text-yellow-400">{milestoneText}</span>
              <span className="text-sm">Score: {score}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti effect for milestones */}
      <AnimatePresence>
        {confetti && (
          <>
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                initial={{ 
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  opacity: 0,
                  x: (Math.random() - 0.5) * window.innerWidth * 0.7,
                  y: window.innerHeight * 0.8,
                  rotate: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1)
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: Math.random() * 2 + 2, ease: "easeOut" }}
                style={{
                  position: 'fixed',
                  top: '30%',
                  left: '50%',
                  width: Math.random() * 10 + 5,
                  height: Math.random() * 10 + 5,
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                  backgroundColor: [
                    '#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', 
                    '#33FFF3', '#FF3333', '#33FF33', '#3333FF'
                  ][Math.floor(Math.random() * 9)],
                  zIndex: 100
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParticleEffect;
