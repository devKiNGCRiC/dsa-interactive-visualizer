import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Users, Zap, Github, Star, GitFork, Eye, Award, BookOpen, Target, Heart, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

const AboutPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              About AlgoVisualizer Pro
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Empowering developers and students to master data structures and algorithms through 
              interactive visualizations and hands-on learning experiences.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 mr-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              We believe that understanding algorithms and data structures shouldn't be limited to textbooks 
              and static diagrams. AlgoVisualizer Pro transforms abstract computer science concepts into 
              interactive, visual experiences that make learning intuitive and engaging.
            </p>
          </motion.section>

          {/* Features Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-yellow-500 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Interactive Visualizations</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Watch algorithms come to life with smooth animations and real-time execution tracking. 
                See exactly how sorting, searching, and graph algorithms work step by step.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Code2 className="h-6 w-6 text-blue-500 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Modern Technology</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Built with React 18, TypeScript, and cutting-edge web technologies. 
                Responsive design ensures perfect experience across all devices.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-green-500 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Educational Focus</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Designed specifically for learning with detailed explanations, complexity analysis, 
                and performance comparisons to deepen your understanding.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-purple-500 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Community Driven</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Open source project welcoming contributions from developers worldwide. 
                Join our community and help improve the learning experience for everyone.
              </p>
            </div>
          </motion.section>

          {/* Statistics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white mb-8"
          >
            <h2 className="text-2xl font-bold text-center mb-8">Project Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold">15+</div>
                <div className="text-blue-100">Algorithms</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Code2 className="h-8 w-8 text-green-300" />
                </div>
                <div className="text-3xl font-bold">8+</div>
                <div className="text-blue-100">Data Structures</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-blue-100">Open Source</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-8 w-8 text-red-300" />
                </div>
                <div className="text-3xl font-bold">∞</div>
                <div className="text-blue-100">Learning</div>
              </div>
            </div>
          </motion.section>

          {/* Open Source Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center mb-6">
              <div className="bg-gray-900 dark:bg-gray-100 rounded-lg p-3 mr-4">
                <Github className="h-6 w-6 text-white dark:text-gray-900" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Open Source Community</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  AlgoVisualizer Pro is proudly open source, built by the community for the community. 
                  We believe in the power of collaborative learning and transparent development.
                </p>
                
                <div className="flex space-x-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                    <Star className="h-4 w-4" />
                    <span>MIT License</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                    <GitFork className="h-4 w-4" />
                    <span>Fork Friendly</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                    <Eye className="h-4 w-4" />
                    <span>Transparent</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">How to Contribute</h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-center">
                    <Award className="h-4 w-4 text-green-500 mr-2" />
                    Report bugs and suggest features
                  </li>
                  <li className="flex items-center">
                    <Award className="h-4 w-4 text-blue-500 mr-2" />
                    Improve documentation and tutorials
                  </li>
                  <li className="flex items-center">
                    <Award className="h-4 w-4 text-purple-500 mr-2" />
                    Add new algorithms and visualizations
                  </li>
                  <li className="flex items-center">
                    <Award className="h-4 w-4 text-orange-500 mr-2" />
                    Enhance user interface and experience
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Master Algorithms?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of developers and students who are already using AlgoVisualizer Pro 
              to enhance their understanding of computer science fundamentals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="h-5 w-5 mr-2" />
                Start Learning Now
              </motion.a>
              
              <motion.a
                href="https://github.com/devKiNGCRiC/dsa-interactive-visualizer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-5 w-5 mr-2" />
                View Source Code
              </motion.a>
            </div>
          </motion.section>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage