import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code2, Github, BookOpen, Zap, Menu, X, Info, Mail, Shield, FileText } from 'lucide-react'

interface HeaderProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const mainSections = [
    { id: 'sorting', label: 'Sorting Algorithms', icon: Zap, path: '/?section=sorting' },
    { id: 'pathfinding', label: 'Pathfinding', icon: Code2, path: '/?section=pathfinding' },
    { id: 'data-structures', label: 'Data Structures', icon: BookOpen, path: '/?section=data-structures' },
  ]

  const utilityPages = [
    { id: 'about', label: 'About', icon: Info, path: '/about' },
    { id: 'contact', label: 'Contact', icon: Mail, path: '/contact' },
    { id: 'privacy', label: 'Privacy', icon: Shield, path: '/privacy' },
    { id: 'terms', label: 'Terms', icon: FileText, path: '/terms' },
  ]

  const handleSectionClick = (sectionId: string) => {
    if (onSectionChange && location.pathname === '/') {
      onSectionChange(sectionId)
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white dark:bg-slate-800 shadow-lg border-b border-slate-200 dark:border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 rounded-full p-2 relative w-10 h-10 flex items-center justify-center border-2 border-blue-600">
                {/* Algorithm bars matching favicon exactly */}
                <div className="flex items-end space-x-0.5 h-6 w-6">
                  <div className="w-0.5 bg-white rounded-sm" style={{ height: '37.5%' }}></div>
                  <div className="w-0.5 bg-white rounded-sm" style={{ height: '62.5%' }}></div>
                  <div className="w-0.5 bg-white rounded-sm" style={{ height: '87.5%' }}></div>
                  <div className="w-0.5 bg-white rounded-sm" style={{ height: '100%' }}></div>
                  <div className="w-0.5 bg-white rounded-sm" style={{ height: '75%' }}></div>
                  <div className="w-0.5 bg-white rounded-sm" style={{ height: '50%' }}></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AlgoVisualizer Pro
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Professional Algorithm Learning
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Home sections - only show when on home page */}
            {location.pathname === '/' && mainSections.map((section) => {
              const Icon = section.icon
              return (
                <motion.button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeSection === section.id
                      ? 'text-blue-600 dark:text-blue-400'
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
                      className="absolute inset-0 bg-blue-100 dark:bg-blue-900 rounded-lg -z-10"
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
            
            {/* Utility Pages Dropdown */}
            <div className="relative group">
              <motion.button
                className="px-4 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200 flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
              >
                <Info className="h-4 w-4" />
                <span>More</span>
              </motion.button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {utilityPages.map((page) => {
                  const Icon = page.icon
                  return (
                    <Link
                      key={page.id}
                      to={page.path}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{page.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>

          {/* Desktop GitHub Link */}
          <motion.a
            href="https://github.com/devKiNGCRiC/dsa-interactive-visualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="h-4 w-4" />
            <span className="text-sm font-medium">GitHub</span>
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 dark:border-slate-700 pt-4 pb-4"
          >
            <div className="space-y-2">
              {/* Show main sections only on home page */}
              {location.pathname === '/' && mainSections.map((section) => {
                const Icon = section.icon
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => {
                      handleSectionClick(section.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{section.label}</span>
                  </motion.button>
                )
              })}
              
              {/* Mobile Utility Pages */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                {utilityPages.map((page) => {
                  const Icon = page.icon
                  return (
                    <Link
                      key={page.id}
                      to={page.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{page.label}</span>
                    </Link>
                  )
                })}
              </div>
              
              {/* Mobile GitHub Link */}
              <motion.a
                href="https://github.com/devKiNGCRiC/dsa-interactive-visualizer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm font-medium transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-4 w-4" />
                <span>View on GitHub</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header