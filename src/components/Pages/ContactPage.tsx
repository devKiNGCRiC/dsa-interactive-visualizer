import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Send, CheckCircle, Github, Linkedin, Twitter, ArrowLeft, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      // EmailJS configuration - Replace with your actual values
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_default'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_default'
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key'

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'rajroyking2806@gmail.com', // Your email address
        reply_to: formData.email,
        timestamp: new Date().toLocaleString()
      }

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      // Success - show confirmation and reset form
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Track contact form submission in Google Analytics
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'contact_form_submission', {
          event_category: 'Contact',
          event_label: formData.subject,
          value: 1
        })
      }
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
      
    } catch (error) {
      console.error('Failed to send email:', error)
      setSubmitError('Failed to send message. Please try again or contact us directly at rajroyking2806@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
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
              Get in Touch
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Have questions, suggestions, or want to contribute? We'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <MessageCircle className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Send us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="contribution">Contribution</option>
                    <option value="collaboration">Collaboration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3"
                  >
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                      <p className="text-sm text-red-800 dark:text-red-200">{submitError}</p>
                    </div>
                  </motion.div>
                )}

                {/* Success Message */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3"
                  >
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                      <p className="text-sm text-green-800 dark:text-green-200">
                        Message sent successfully! We'll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isSubmitting || isSubmitted
                      ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  } text-white`}
                  whileHover={!isSubmitting && !isSubmitted ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting && !isSubmitted ? { scale: 0.98 } : {}}
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              
              {/* Social Media */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Mail className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Connect with Us</h2>
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Follow us on social media for updates, tips, and algorithm insights!
                </p>

                <div className="space-y-4">
                  <motion.a
                    href="https://github.com/devKiNGCRiC/dsa-interactive-visualizer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Github className="h-6 w-6 text-gray-700 dark:text-gray-300 mr-4" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">GitHub</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">View source code and contribute</div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/raj-roy-kc2806/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Linkedin className="h-6 w-6 text-blue-600 mr-4" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">LinkedIn</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Professional networking</div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://x.com/KiNGCRiC28"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Twitter className="h-6 w-6 text-sky-500 mr-4" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">X (Twitter)</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Latest updates and insights</div>
                    </div>
                  </motion.a>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">How can I contribute to the project?</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      We welcome contributions! Check our GitHub repository for open issues, or propose new features. 
                      You can contribute code, documentation, or report bugs.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Is AlgoVisualizer Pro free to use?</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Yes! AlgoVisualizer Pro is completely free and open source. We believe in making quality 
                      educational resources accessible to everyone.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Can I use this for commercial purposes?</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Yes, under the MIT license you can use, modify, and distribute the code for any purpose, 
                      including commercial use. Just maintain the original license notice.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">How often is the project updated?</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      We actively maintain the project with regular updates, bug fixes, and new algorithm 
                      implementations. Follow our GitHub for the latest updates.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default ContactPage