/**
 * SIMPLE ALGORITHM INFO CARD COMPONENT
 * ===================================
 * 
 * This component displays algorithm information in the SortingSection
 */

import React from 'react'
import { ChevronDown, ChevronUp, Code } from 'lucide-react'
import type { AlgorithmInfo } from '../../data/algorithmData'

interface AlgorithmInfoCardProps {
  algorithm: AlgorithmInfo
  isOpen?: boolean
  onToggle?: () => void
}

const AlgorithmInfoCard: React.FC<AlgorithmInfoCardProps> = ({ 
  algorithm, 
  isOpen = false, 
  onToggle 
}) => {
  return (
    <div className="algorithm-card">
      {/* Header Section */}
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {algorithm.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Click to {isOpen ? 'collapse' : 'expand'} details
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="mt-6 space-y-4">
          {/* Definition */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Definition
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm">
              {algorithm.definition}
            </p>
          </div>

          {/* Time Complexity */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Time Complexity
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Best:</span>
                <code className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded text-xs">
                  {algorithm.timeComplexity.best}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Average:</span>
                <code className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded text-xs">
                  {algorithm.timeComplexity.average}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Worst:</span>
                <code className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-0.5 rounded text-xs">
                  {algorithm.timeComplexity.worst}
                </code>
              </div>
            </div>
          </div>

          {/* Use Case */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              When to Use
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm">
              {algorithm.useCase}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AlgorithmInfoCard