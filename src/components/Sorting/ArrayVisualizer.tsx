import React from 'react'
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
  const containerHeight = 400
  const barSpacing = 4
  const containerWidth = Math.max(800, array.length * (barSpacing + 20))

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
    return Math.max(20, (value / maxValue) * (containerHeight - 60))
  }

  return (
    <div className="visualizer-container">
      <div 
        className="flex items-end justify-center space-x-1 mx-auto overflow-x-auto"
        style={{ 
          height: `${containerHeight}px`,
          width: `${Math.min(containerWidth, 800)}px`,
          minWidth: '100%'
        }}
      >
        {array.map((element, index) => (
          <motion.div
            key={`${element.index}-${element.value}`}
            className={`relative flex flex-col items-center justify-end ${getBarClass(element.state)}`}
            style={{
              height: `${getBarHeight(element.value)}px`,
              minWidth: `${Math.max(20, 800 / array.length - barSpacing)}px`,
              maxWidth: `${Math.max(40, 800 / array.length - barSpacing)}px`,
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
              className="absolute -top-6 text-xs font-bold"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.02 }}
            >
              {element.value}
            </motion.span>
            
            {/* Index label */}
            <motion.span
              className="absolute -bottom-6 text-xs text-slate-500 dark:text-slate-400"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.02 }}
            >
              {index}
            </motion.span>
          </motion.div>
        ))}
      </div>
      
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