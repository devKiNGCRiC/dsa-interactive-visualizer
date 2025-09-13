import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Github, BookOpen, Zap } from 'lucide-react'

interface HeaderProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const sections = [
    { id: 'sorting', label: 'Sorting Algorithms', icon: Zap },
    { id: 'pathfinding', label: 'Pathfinding', icon: Code2 },
    { id: 'data-structures', label: 'Data Structures', icon: BookOpen },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-slate-800 shadow-lg border-b border-slate-200 dark:border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-2">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                DSA Visualizer
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interactive Algorithm Learning
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <motion.button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeSection === section.id
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.label}</span>
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-100 dark:bg-primary-900 rounded-lg -z-10"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              )
            })}
          </nav>

          {/* GitHub Link */}
          <motion.a
            href="https://github.com/devKiNGCRiC"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline text-sm font-medium">GitHub</span>
          </motion.a>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-1">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <motion.button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{section.label.split(' ')[0]}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header