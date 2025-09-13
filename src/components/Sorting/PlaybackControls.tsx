import React from 'react'
import { motion } from 'framer-motion'
import { Play, Square, RotateCcw, Shuffle } from 'lucide-react'
import { useAlgorithmStore } from '../../stores/algorithmStore'

interface PlaybackControlsProps {
  onStartSort: () => void
  onStopSort: () => void
  onShuffle: () => void
  onReset: () => void
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  onStartSort,
  onStopSort,
  onShuffle,
  onReset
}) => {
  const { isPlaying, comparisons, swaps } = useAlgorithmStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="algorithm-card"
    >
      <div className="space-y-4">
        {/* Title for mobile controls */}
        <div className="text-center">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Quick Controls
          </h3>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Main Playback Controls */}
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <motion.button
              onClick={onStartSort}
              disabled={isPlaying}
              className="algorithm-button-primary flex items-center space-x-2 flex-1 sm:flex-none justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="h-4 w-4" />
              <span>Start Sort</span>
            </motion.button>
            
            <motion.button
              onClick={onStopSort}
              disabled={!isPlaying}
              className="algorithm-button-danger flex items-center justify-center px-4 py-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Stop sorting animation"
            >
              <Square className="h-4 w-4" />
              <span className="ml-1 text-sm">Stop</span>
            </motion.button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <motion.button
              onClick={onShuffle}
              disabled={isPlaying}
              className="algorithm-button-secondary flex items-center space-x-2 flex-1 sm:flex-none justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Generate new random array"
            >
              <Shuffle className="h-4 w-4" />
              <span>Shuffle</span>
            </motion.button>
            
            <motion.button
              onClick={onReset}
              disabled={isPlaying}
              className="algorithm-button-secondary flex items-center justify-center px-4 py-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Reset array to normal state (remove colors)"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="ml-1 text-sm">Reset</span>
            </motion.button>
          </div>

          {/* Live Statistics - Mobile Optimized */}
          <div className="flex items-center space-x-4 text-sm w-full sm:w-auto justify-center sm:justify-end">
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg px-3 py-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">Comparisons</div>
              <div className="font-bold text-primary-600 dark:text-primary-400 text-center">{comparisons}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg px-3 py-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">Swaps</div>
              <div className="font-bold text-secondary-600 dark:text-secondary-400 text-center">{swaps}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PlaybackControls