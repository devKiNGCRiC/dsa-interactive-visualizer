import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Twitter } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              AlgoVisualizer Pro
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              An interactive platform for learning and visualizing data structures and algorithms.
              Built with React, TypeScript, and modern web technologies.
            </p>
            <div className="flex items-center space-x-1 text-sm text-slate-600 dark:text-slate-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by</span>
              <a
                href="https://github.com/devKiNGCRiC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Raj Roy (devKiNGCRiC)
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Features
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>• Interactive sorting algorithm visualizations</li>
              <li>• Pathfinding algorithm demonstrations</li>
              <li>• Data structure operations</li>
              <li>• Performance analytics and comparisons</li>
              <li>• Customizable speed and array sizes</li>
              <li>• Modern responsive design</li>
            </ul>
          </div>

          {/* Tech Stack & Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'React 18',
                'TypeScript',
                'Vite',
                'Tailwind CSS',
                'Framer Motion',
                'Zustand',
                'Recharts',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              <motion.a
                href="https://github.com/devKiNGCRiC/dsa-interactive-visualizer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/raj-roy-kc2806/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://x.com/KiNGCRiC28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="X (Twitter) Profile"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} AlgoVisualizer Pro. Built for educational purposes by{' '}
            <a
              href="https://github.com/devKiNGCRiC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Raj Roy
            </a>
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer