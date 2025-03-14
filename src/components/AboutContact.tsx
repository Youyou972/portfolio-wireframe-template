import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';

const AboutContact = () => {
  return (
    <section id="about" className="py-20 bg-gray-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">About Me</h2>
            <div className="prose prose-lg text-gray-300 max-w-none">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
                Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
                rhoncus ut eleifend nibh porttitor.
              </p>
              <p>
                Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl 
                tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor 
                posuere. Praesent id metus massa, ut blandit odio.
              </p>
              <p>
                Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue 
                lacinia dui, a porttitor lectus condimentum laoreet.
              </p>
            </div>
            
            {/* Social links */}
            <div className="mt-8 flex space-x-5">
              <motion.a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </motion.a>
              <motion.a 
                href="mailto:example@domain.com" 
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaEnvelope size={24} />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Your message here..."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutContact;
