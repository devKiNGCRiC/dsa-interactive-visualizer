import React, { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAlgorithmStore } from '../../stores/algorithmStore'
import ArrayVisualizer from './ArrayVisualizer'
import SortingControls from './SortingControls'
import PlaybackControls from './PlaybackControls'
import AlgorithmInfoCard from '../Common/AlgorithmInfoCard'
import AlgorithmComparison from '../Common/AlgorithmComparison'
import { algorithmData } from '../../data/algorithmData'
import {
  bubbleSort,
  quickSort,
  mergeSort,
  insertionSort,
  selectionSort,
  type SortingStep,
} from '../../algorithms/sortingAlgorithms'

const SortingSection: React.FC = () => {
  const { 
    array, 
    generateRandomArray, 
    algorithm,
    isPlaying,
    speed,
    setIsPlaying,
    setIsPaused,
    updateElements,
    updateElementValue,
    swapElements,
    incrementComparisons,
    incrementSwaps,
    resetStats,
    addPerformanceData
  } = useAlgorithmStore()
  const [openCards, setOpenCards] = useState<{ [key: string]: boolean }>({})
  const [currentMessage, setCurrentMessage] = useState('')

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

  const handleSortingStep = useCallback((step: SortingStep) => {
    switch (step.type) {
      case 'compare':
        updateElements(
          step.indices.map(index => ({ index, state: 'comparing' }))
        )
        incrementComparisons()
        break
      case 'swap':
        updateElements(
          step.indices.map(index => ({ index, state: 'swapping' }))
        )
        if (step.indices.length === 2) {
          swapElements(step.indices[0], step.indices[1])
        }
        incrementSwaps()
        break
      case 'set_value':
        updateElements(
          step.indices.map(index => ({ index, state: 'swapping' }))
        )
        if (step.value !== undefined && step.indices.length === 1) {
          updateElementValue(step.indices[0], step.value)
        }
        incrementSwaps()
        break
      case 'set_sorted':
        updateElements(
          step.indices.map(index => ({ index, state: 'sorted' }))
        )
        break
      case 'complete': {
        updateElements(
          array.map((_, index) => ({ index, state: 'sorted' }))
        )
        setIsPlaying(false)
        
        // Save performance data for comparison
        const currentState = useAlgorithmStore.getState()
        const timeComplexityMap: { [key: string]: string } = {
          'bubble': 'O(n²)',
          'selection': 'O(n²)', 
          'insertion': 'O(n²)',
          'merge': 'O(n log n)',
          'quick': 'O(n log n)'
        }
        
        addPerformanceData({
          algorithm,
          arraySize: array.length,
          comparisons: currentState.comparisons,
          swaps: currentState.swaps,
          timeComplexity: timeComplexityMap[algorithm] || 'O(n²)',
          timestamp: Date.now()
        })
        break
      }
    }
    
    if (step.message) {
      setCurrentMessage(step.message)
    }
  }, [updateElements, updateElementValue, incrementComparisons, incrementSwaps, swapElements, array, setIsPlaying, addPerformanceData, algorithm])

  const resetArray = () => {
    if (isPlaying) return
    updateElements(array.map((_, index) => ({ index, state: 'normal' })))
    resetStats()
    setCurrentMessage('')
  }

  const shuffleArray = () => {
    if (isPlaying) return
    generateRandomArray(array.length, 5, 100)
    resetStats()
    setCurrentMessage('')
  }

  const startSorting = async () => {
    if (array.length === 0) {
      shuffleArray()
      return
    }

    setIsPlaying(true)
    setIsPaused(false)
    resetArray()

    try {
      const sortingSpeed = 501 - speed

      switch (algorithm) {
        case 'bubble':
          await bubbleSort(array, handleSortingStep, sortingSpeed)
          break
        case 'selection':
          await selectionSort(array, handleSortingStep, sortingSpeed)
          break
        case 'insertion':
          await insertionSort(array, handleSortingStep, sortingSpeed)
          break
        case 'merge':
          await mergeSort(array, handleSortingStep, sortingSpeed)
          break
        case 'quick':
          await quickSort(array, handleSortingStep, sortingSpeed)
          break
        default:
          await bubbleSort(array, handleSortingStep, sortingSpeed)
      }
    } catch (error) {
      console.error('Sorting error:', error)
    } finally {
      setIsPlaying(false)
      setIsPaused(false)
    }
  }

  const stopSorting = () => {
    setIsPlaying(false)
    setIsPaused(false)
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

      {/* Mobile-Optimized Playback Controls - Below visualization */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="block lg:hidden"
      >
        <PlaybackControls
          onStartSort={startSorting}
          onStopSort={stopSorting}
          onShuffle={shuffleArray}
          onReset={resetArray}
        />
      </motion.div>

      {/* Current Message */}
      {currentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-3 mx-4"
        >
          <p className="text-sm text-primary-800 dark:text-primary-200 font-medium text-center">
            {currentMessage}
          </p>
        </motion.div>
      )}

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