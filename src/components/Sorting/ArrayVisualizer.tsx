import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { ArrayElement } from '../../stores/algorithmStore'

interface ArrayVisualizerProps {
  array: ArrayElement[]
  maxValue?: number
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ 
  array, 
  maxValue = Math.max(...array.map(el => el.value)) 
}) => {
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const containerHeight = 450
  const barSpacing = 2
  
  // Calculate bar width based on array length
  const getBarWidth = () => {
    if (array.length <= 10) {
      return 30 // Wide bars for very small arrays
    } else if (array.length <= 20) {
      return 24 // Medium-wide bars for small arrays
    } else if (array.length <= 50) {
      return 20 // Medium bars
    } else {
      return 16 // Consistent narrow bars for large arrays
    }
  }
  
  // Calculate total container width needed
  const getTotalWidth = () => {
    const barWidth = getBarWidth()
    return array.length * (barWidth + barSpacing) + 32 // 32px for padding
  }
  
  // Determine if we should center the array or make it scrollable
  const shouldCenter = () => {
    const totalWidth = getTotalWidth()
    const availableWidth = viewportWidth - 64 // Subtract padding
    return array.length <= 10 || totalWidth <= availableWidth
  }

  const getBarClass = (state: ArrayElement['state']) => {
    switch (state) {
      case 'comparing':
        return 'array-element-comparing'
      case 'swapping':
        return 'array-element-swapping'
      case 'sorted':
        return 'array-element-sorted'
      case 'pivot':
        return 'bg-purple-200 dark:bg-purple-800 border-purple-400 dark:border-purple-600 text-purple-800 dark:text-purple-200'
      default:
        return 'array-element'
    }
  }

  const getBarHeight = (value: number) => {
    return Math.max(20, (value / maxValue) * (containerHeight - 100)) // Increased margin from 60 to 100
  }

  return (
    <div className="visualizer-container w-full">
      {/* Scrollable container */}
      <div className="w-full overflow-x-auto visualizer-scroll">
        <div 
          className={`flex items-end space-x-1 mx-auto px-4 ${
            shouldCenter() ? 'justify-center' : 'justify-start'
          }`}
          style={{ 
            height: `${containerHeight}px`,
            width: shouldCenter() ? 'auto' : `${getTotalWidth()}px`,
            minWidth: shouldCenter() ? 'auto' : '100%',
            paddingBottom: '50px' // Extra padding for indices
          }}
        >
          {array.map((element, index) => (
            <motion.div
              key={`${element.index}-${element.value}`}
              className={`relative flex flex-col items-center justify-end ${getBarClass(element.state)}`}
              style={{
                height: `${getBarHeight(element.value)}px`,
                width: `${getBarWidth()}px`,
                flex: '0 0 auto'
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: `${getBarHeight(element.value)}px`, 
                opacity: 1,
                scale: element.state === 'comparing' || element.state === 'swapping' ? 1.1 : 1
              }}
              transition={{
                duration: 0.3,
                type: 'spring',
                stiffness: 300,
                damping: 25
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.1 }
              }}
            >
              {/* Value label */}
              <motion.span
                className="absolute -top-6 text-xs font-bold whitespace-nowrap"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                style={{ fontSize: array.length > 50 ? '10px' : '12px' }}
              >
                {element.value}
              </motion.span>
              
              {/* Index label - positioned with sufficient bottom spacing */}
              <motion.span
                className="absolute text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap"
                style={{ 
                  bottom: '-35px', // Increased from -28px
                  fontSize: array.length > 50 ? '10px' : array.length > 30 ? '11px' : '12px'
                }}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                {index}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator for large arrays */}
      {!shouldCenter() && (
        <div className="text-center mt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ← Scroll horizontally to see all {array.length} elements →
          </p>
        </div>
      )}
      
      {/* Array size indicator for small arrays */}
      {shouldCenter() && (
        <div className="text-center mt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing all {array.length} elements (centered layout)
          </p>
        </div>
      )}
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 array-element rounded"></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">Normal</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 array-element-comparing rounded"></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 array-element-swapping rounded"></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">Swapping</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 array-element-sorted rounded"></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">Sorted</span>
        </div>
      </div>
    </div>
  )
}

export default ArrayVisualizer