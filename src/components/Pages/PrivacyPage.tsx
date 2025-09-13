import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

const PrivacyPage: React.FC = () => {
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
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-4">
              Last updated: September 13, 2025
            </p>
          </motion.div>

          {/* Privacy Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-xl font-bold text-green-800 dark:text-green-300">Privacy-First Approach</h2>
            </div>
            <ul className="space-y-2 text-green-700 dark:text-green-400">
              <li className="flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                No personal data collection without consent
              </li>
              <li className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                Transparent about what data we collect
              </li>
              <li className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Minimal data retention policies
              </li>
            </ul>
          </motion.div>

          <div className="space-y-8">
            
            {/* Information We Collect */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Information We Collect</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Analytics Data</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    We use Google Analytics to understand how users interact with our platform including
                    page views, browser type, geographic location, and referral sources.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Usage Data</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    Algorithm performance metrics are stored locally in your browser to improve your experience.
                    This data never leaves your device.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Contact Information</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    When you contact us, we collect only the information you provide: name, email, and message content.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* How We Use Information */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How We Use Your Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Platform Improvement</h3>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                    <li>Optimize algorithm visualizations</li>
                    <li>Fix bugs and improve performance</li>
                    <li>Develop new features</li>
                    <li>Enhance user experience</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Communication</h3>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                    <li>Respond to support requests</li>
                    <li>Send important updates (rare)</li>
                    <li>Provide educational content (opt-in only)</li>
                    <li>Technical notifications</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Contact for Privacy */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                If you have any questions about this privacy policy or how we handle your data, 
                don't hesitate to reach out to us.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <Shield className="h-5 w-5 mr-2" />
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

export default PrivacyPage