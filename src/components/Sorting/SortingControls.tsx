import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Square, RotateCcw, Shuffle, Settings } from 'lucide-react'
import { useAlgorithmStore } from '../../stores/algorithmStore'
import {
  bubbleSort,
  quickSort,
  mergeSort,
  insertionSort,
  selectionSort,
  type SortingStep,
} from '../../algorithms/sortingAlgorithms'

interface SortingControlsProps {
  onAlgorithmChange?: (algorithm: string) => void
}

const SortingControls: React.FC<SortingControlsProps> = ({ onAlgorithmChange }) => {
  const {
    array,
    isPlaying,
    speed,
    algorithm,
    comparisons,
    swaps,
    setIsPlaying,
    setIsPaused,
    setSpeed,
    setAlgorithm,
    setArray,
    updateElements,
    updateElementValue,
    swapElements,
    incrementComparisons,
    incrementSwaps,
    resetStats,
    addPerformanceData,
    generateRandomArray,
  } = useAlgorithmStore()

  const [arraySize, setArraySize] = useState(30)
  const [currentMessage, setCurrentMessage] = useState('')
  const [customArrayInput, setCustomArrayInput] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const algorithms = [
    { value: 'bubble', label: 'Bubble Sort', complexity: 'O(n²)' },
    { value: 'selection', label: 'Selection Sort', complexity: 'O(n²)' },
    { value: 'insertion', label: 'Insertion Sort', complexity: 'O(n²)' },
    { value: 'merge', label: 'Merge Sort', complexity: 'O(n log n)' },
    { value: 'quick', label: 'Quick Sort', complexity: 'O(n log n)' },
  ]

  const handleAlgorithmChange = (newAlgorithm: string) => {
    if (isPlaying) return
    setAlgorithm(newAlgorithm)
    onAlgorithmChange?.(newAlgorithm)
    resetArray()
  }

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed)
  }

  const resetArray = () => {
    if (isPlaying) return
    updateElements(array.map((_, index) => ({ index, state: 'normal' })))
    resetStats()
    setCurrentMessage('')
  }

  const shuffleArray = () => {
    if (isPlaying) return
    generateRandomArray(arraySize, 5, 100)
    resetStats()
    setCurrentMessage('')
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
        // Get current state values directly from the store
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

  const handleArraySizeChange = (newSize: number) => {
    if (isPlaying) return
    setArraySize(newSize)
    generateRandomArray(newSize, 5, 100)
    resetStats()
  }

  const handleCustomArraySubmit = () => {
    if (isPlaying) return
    
    try {
      // Parse the input string to numbers
      const numbers = customArrayInput
        .split(/[\s,]+/) // Split by spaces or commas
        .filter(str => str.trim() !== '') // Remove empty strings
        .map(str => {
          const num = parseInt(str.trim())
          if (isNaN(num)) throw new Error(`Invalid number: ${str}`)
          return num
        })
      
      if (numbers.length === 0) {
        alert('Please enter at least one number')
        return
      }
      
      if (numbers.length > 100) {
        alert('Maximum 100 elements allowed')
        return
      }
      
      // Set the custom array
      setArray(numbers)
      setArraySize(numbers.length)
      resetStats()
      setShowCustomInput(false)
      setCurrentMessage(`Custom array with ${numbers.length} elements loaded`)
      
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Invalid input format. Please enter numbers separated by spaces or commas.')
    }
  }

  return (
    <div className="algorithm-card space-y-6">
      {/* Algorithm Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          <Settings className="inline h-4 w-4 mr-1" />
          Algorithm
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {algorithms.map((algo) => (
            <motion.button
              key={algo.value}
              onClick={() => handleAlgorithmChange(algo.value)}
              disabled={isPlaying}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                algorithm === algo.value
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border-2 border-primary-300 dark:border-primary-700'
                  : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600'
              } ${isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              whileTap={{ scale: 0.95 }}
            >
              <div className="font-medium">{algo.label}</div>
              <div className="text-xs opacity-75">{algo.complexity}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Playback Controls */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Playback Controls
          </h3>
          <div className="flex space-x-2">
            <motion.button
              onClick={startSorting}
              disabled={isPlaying}
              className="algorithm-button-primary flex items-center space-x-2 flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="h-4 w-4" />
              <span>Start Sort</span>
            </motion.button>
            
            <motion.button
              onClick={stopSorting}
              disabled={!isPlaying}
              className="algorithm-button-danger flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Square className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        {/* Array Controls */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Array Controls
          </h3>
          <div className="flex space-x-2">
            <motion.button
              onClick={shuffleArray}
              disabled={isPlaying}
              className="algorithm-button-secondary flex items-center space-x-2 flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Shuffle className="h-4 w-4" />
              <span>Shuffle</span>
            </motion.button>
            
            <motion.button
              onClick={resetArray}
              disabled={isPlaying}
              className="algorithm-button-secondary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="h-4 w-4" />
            </motion.button>
          </div>
          
          {/* Custom Array Input */}
          <div className="space-y-2">
            <motion.button
              onClick={() => setShowCustomInput(!showCustomInput)}
              disabled={isPlaying}
              className="algorithm-button-secondary w-full flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{showCustomInput ? 'Hide' : 'Custom Array'}</span>
            </motion.button>
            
            {showCustomInput && (
              <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Enter numbers separated by spaces or commas (max 100):
                </label>
                <input
                  type="text"
                  value={customArrayInput}
                  onChange={(e) => setCustomArrayInput(e.target.value)}
                  placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md 
                           bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isPlaying}
                />
                <div className="flex space-x-2">
                  <motion.button
                    onClick={handleCustomArraySubmit}
                    disabled={isPlaying || !customArrayInput.trim()}
                    className="algorithm-button-primary flex-1 text-xs py-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Load Array
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setCustomArrayInput('')
                      setShowCustomInput(false)
                    }}
                    className="algorithm-button-secondary text-xs py-2 px-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Statistics
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">Comparisons</div>
              <div className="font-bold text-primary-600 dark:text-primary-400">{comparisons}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">Swaps</div>
              <div className="font-bold text-secondary-600 dark:text-secondary-400">{swaps}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Speed and Size Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Speed: {speed}%
          </label>
          <input
            type="range"
            min="1"
            max="500"
            value={speed}
            onChange={(e) => handleSpeedChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Array Size: {arraySize}
          </label>
          <input
            type="range"
            min="5"
            max="100"
            value={arraySize}
            onChange={(e) => handleArraySizeChange(Number(e.target.value))}
            disabled={isPlaying}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Current Message */}
      {currentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-3"
        >
          <p className="text-sm text-primary-800 dark:text-primary-200 font-medium">
            {currentMessage}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default SortingControls