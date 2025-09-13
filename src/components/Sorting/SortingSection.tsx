import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAlgorithmStore } from '../../stores/algorithmStore'
import ArrayVisualizer from './ArrayVisualizer'
import SortingControls from './SortingControls'
import AlgorithmInfoCard from '../Common/AlgorithmInfoCard'
import AlgorithmComparison from '../Common/AlgorithmComparison'
import { algorithmData } from '../../data/algorithmData'

const SortingSection: React.FC = () => {
  const { array, generateRandomArray } = useAlgorithmStore()
  const [openCards, setOpenCards] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // Initialize with a random array if empty
    if (array.length === 0) {
      generateRandomArray(30, 5, 100)
    }
  }, [array.length, generateRandomArray])

  const toggleCard = (algorithmKey: string) => {
    setOpenCards(prev => ({
      ...prev,
      [algorithmKey]: !prev[algorithmKey]
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 w-full max-w-full overflow-hidden"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-slate-900 dark:text-white"
        >
          Sorting Algorithm Visualizer
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
        >
          Watch different sorting algorithms in action. Compare their performance, 
          understand their behavior, and learn how they work step by step.
        </motion.p>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <SortingControls />
      </motion.div>

      {/* Visualizer */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ArrayVisualizer array={array} />
      </motion.div>

      {/* Algorithm Information Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Algorithm Information
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Click on any algorithm to learn more about its implementation, complexity, and use cases
          </p>
        </div>
        
        <div className="grid gap-6">
          {Object.entries(algorithmData).map(([key, algorithm]) => (
            <AlgorithmInfoCard
              key={key}
              algorithm={algorithm}
              isOpen={openCards[key] || false}
              onToggle={() => toggleCard(key)}
            />
          ))}
        </div>
      </motion.div>

      {/* Algorithm Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <AlgorithmComparison />
      </motion.div>
    </motion.div>
  )
}

export default SortingSection