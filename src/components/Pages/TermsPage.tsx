import React from 'react'
import { motion } from 'framer-motion'
import { Scale, FileText, Shield, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

const TermsPage: React.FC = () => {
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
              Terms of Service
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Please read these terms carefully before using AlgoVisualizer Pro. By using our service, you agree to these terms.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-4">
              Last updated: September 13, 2025
            </p>
          </motion.div>

          {/* Key Terms Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center mb-4">
              <Scale className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300">Quick Summary</h2>
            </div>
            <ul className="space-y-2 text-blue-700 dark:text-blue-400">
              <li className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Free educational platform for algorithm learning
              </li>
              <li className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Respect intellectual property and fair use
              </li>
              <li className="flex items-center">
                <Scale className="h-4 w-4 mr-2" />
                Community-driven, open-source project
              </li>
            </ul>
          </motion.div>

          <div className="space-y-8">
            
            {/* Acceptance of Terms */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Acceptance of Terms</h2>
              
              <div className="space-y-4 text-slate-600 dark:text-slate-400">
                <p>
                  By accessing and using AlgoVisualizer Pro ("the Service"), you accept and agree to be bound by 
                  these Terms of Service ("Terms"). If you do not agree to these terms, please do not use our service.
                </p>
                
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately 
                  upon posting. Your continued use constitutes acceptance of any modifications.
                </p>
              </div>
            </motion.section>

            {/* Service Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Service Description</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">What We Provide</h3>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                    <li>Interactive algorithm visualizations for educational purposes</li>
                    <li>Data structure demonstrations and explanations</li>
                    <li>Performance comparison tools for different algorithms</li>
                    <li>Educational content about computer science concepts</li>
                    <li>Open-source codebase for learning and contribution</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Educational Purpose</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    This platform is designed for educational and learning purposes. While we ensure 
                    algorithmic accuracy, users should verify implementations for production use cases.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* User Responsibilities */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">User Responsibilities</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Acceptable Use</h3>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
                    <li>Use for educational and learning purposes</li>
                    <li>Respect intellectual property rights</li>
                    <li>Provide constructive feedback</li>
                    <li>Follow community guidelines</li>
                    <li>Report bugs responsibly</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Prohibited Activities</h3>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
                    <li>Attempting to hack or exploit the service</li>
                    <li>Automated scraping or data harvesting</li>
                    <li>Sharing malicious content or links</li>
                    <li>Impersonating other users or entities</li>
                    <li>Commercial use without permission</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Intellectual Property */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Intellectual Property</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Open Source License</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    AlgoVisualizer Pro is released under the MIT License. This means you can use, modify, 
                    and distribute the code for any purpose, including commercial use.
                  </p>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Requirements</h4>
                    <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                      <li>• Include original license notice</li>
                      <li>• Include copyright notice</li>
                      <li>• State any changes made</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Trademark Notice</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    "AlgoVisualizer Pro" and associated logos are trademarks. While the code is open source, 
                    please use different branding for your modifications.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Contact Information */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-8 text-white text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                If you have any questions about these Terms of Service, please contact us. 
                We're here to help clarify any concerns.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                <Scale className="h-5 w-5 mr-2" />
                Contact Us
              </Link>
            </motion.section>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TermsPage