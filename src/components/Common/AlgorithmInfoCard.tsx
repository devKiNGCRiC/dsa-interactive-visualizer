/**
 * ALGORITHM INFORMATION CARD COMPONENT
 * ====================================
 * 
 * This component displays comprehensive information about sorting algorithms
 * including definitions, complexity analysis, advantages, disadvantages, and code examples.
 */

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Code, Info, Zap, AlertCircle } from 'lucide-react'
import type { AlgorithmInfo } from '../../data/algorithmData'

// TypeScript: Component props interface
interface AlgorithmCardProps {
  algorithm: AlgorithmInfo
  isOpen?: boolean
  onToggle?: () => void
}

/**
 * AlgorithmCard Component
 * Displays comprehensive information about a sorting algorithm
 */
const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ 
  algorithm, 
  isOpen = false, 
  onToggle 
}) => {
  // State for managing which code language is currently displayed
  const [selectedLanguage, setSelectedLanguage] = useState<string>('typescript')
  
  // Get available programming languages for this algorithm
  const availableLanguages = Object.keys(algorithm.codeExamples)

  return (
    <div className="algorithm-card w-full max-w-full overflow-hidden">
      {/* Header Section */}
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <Code className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">
              {algorithm.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate">
              Click to {isOpen ? 'collapse' : 'expand'} details
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-2">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 animate-slide-up w-full max-w-full overflow-hidden">
          {/* Definition Section */}
          <div className="flex items-start space-x-3">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm sm:text-base">
                Definition
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base break-words">
                {algorithm.definition}
              </p>
            </div>
          </div>

          {/* Complexity Analysis */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 sm:p-4 w-full overflow-hidden">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center text-sm sm:text-base">
              <Zap className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0" />
              Complexity Analysis
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="min-w-0">
                <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-2 text-sm sm:text-base">
                  Time Complexity
                </h5>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400 flex-shrink-0">Best:</span>
                    <code className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded text-xs break-all">
                      {algorithm.timeComplexity.best}
                    </code>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400 flex-shrink-0">Average:</span>
                    <code className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded text-xs break-all">
                      {algorithm.timeComplexity.average}
                    </code>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400 flex-shrink-0">Worst:</span>
                    <code className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-0.5 rounded text-xs break-all">
                      {algorithm.timeComplexity.worst}
                    </code>
                  </div>
                </div>
              </div>
              <div className="min-w-0">
                <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-2 text-sm sm:text-base">
                  Space Complexity
                </h5>
                <code className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded text-xs sm:text-sm break-all">
                  {algorithm.spaceComplexity}
                </code>
              </div>
            </div>
          </div>

          {/* Advantages and Disadvantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Advantages */}
            <div className="min-w-0">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center text-sm sm:text-base">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                Advantages
              </h4>
              <ul className="space-y-2">
                {algorithm.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm break-words">
                      {advantage}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disadvantages */}
            <div className="min-w-0">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center text-sm sm:text-base">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-2 flex-shrink-0" />
                Disadvantages
              </h4>
              <ul className="space-y-2">
                {algorithm.disadvantages.map((disadvantage, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm break-words">
                      {disadvantage}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Use Case */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-4 w-full overflow-hidden">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 text-sm sm:text-base">
              When to Use
            </h4>
            <p className="text-blue-800 dark:text-blue-300 text-xs sm:text-sm break-words">
              {algorithm.useCase}
            </p>
          </div>

          {/* Code Examples */}
          <div className="w-full overflow-hidden">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm sm:text-base">
              Implementation
            </h4>
            
            {/* Language Selector */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4 overflow-x-auto">
              {availableLanguages.map((language) => (
                <button
                  key={language}
                  onClick={() => setSelectedLanguage(language)}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors flex-shrink-0 ${
                    selectedLanguage === language
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </button>
              ))}
            </div>

            {/* Code Block - Mobile Optimized */}
            <div className="bg-slate-900 rounded-lg p-2 sm:p-4 overflow-hidden w-full">
              <div className="overflow-x-auto max-w-full">
                <pre className="text-xs sm:text-sm whitespace-pre-wrap break-words min-w-0">
                  <code className="text-slate-100 break-words">
                    {algorithm.codeExamples[selectedLanguage]}
                  </code>
                </pre>
              </div>
              
              {/* Mobile scroll hint */}
              <div className="block sm:hidden mt-2 text-center">
                <p className="text-xs text-slate-400">
                  ← Scroll horizontally to see full code →
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AlgorithmCard