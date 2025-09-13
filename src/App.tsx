import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import SortingSection from './components/Sorting/SortingSection'
import PathfindingSection from './components/Pathfinding/PathfindingSection'
import DataStructuresSection from './components/DataStructures/DataStructuresSection'

function App() {
  const [activeSection, setActiveSection] = useState('sorting')

  const renderSection = () => {
    switch (activeSection) {
      case 'sorting':
        return <SortingSection />
      case 'pathfinding':
        return <PathfindingSection />
      case 'data-structures':
        return <DataStructuresSection />
      default:
        return <SortingSection />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )
}

export default App
