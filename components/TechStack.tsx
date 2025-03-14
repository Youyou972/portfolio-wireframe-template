import { motion } from 'framer-motion';

const TechStack = () => {
  const technologies = [
    { name: 'Unity', icon: '/images/unity.png' },
    { name: 'Unreal Engine', icon: '/images/unreal.png' },
    { name: 'Blender', icon: '/images/blender.png' },
    { name: 'Maya', icon: '/images/maya.png' },
    { name: 'ZBrush', icon: '/images/zbrush.png' },
    { name: 'Substance Painter', icon: '/images/substance.png' },
    { name: 'C#', icon: '/images/csharp.png' },
    { name: 'C++', icon: '/images/cpp.png' }
  ];

  return (
    <section className="py-20 bg-black/50 backdrop-blur-sm z-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Technologies & Tools</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            I work with industry-standard game development and 3D modeling tools to create immersive experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img src={tech.icon} alt={tech.name} className="max-w-full max-h-full" />
              </div>
              <span className="text-gray-300 font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
