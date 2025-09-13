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
        <div className="mt-6 space-y-6 animate-slide-up">
          {/* Definition Section */}
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                Definition
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {algorithm.definition}
              </p>
            </div>
          </div>

          {/* Complexity Analysis */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-yellow-500" />
              Complexity Analysis
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-2">
                  Time Complexity
                </h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Best:</span>
                    <code className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded">
                      {algorithm.timeComplexity.best}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Average:</span>
                    <code className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded">
                      {algorithm.timeComplexity.average}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Worst:</span>
                    <code className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-0.5 rounded">
                      {algorithm.timeComplexity.worst}
                    </code>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-2">
                  Space Complexity
                </h5>
                <code className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded text-sm">
                  {algorithm.spaceComplexity}
                </code>
              </div>
            </div>
          </div>

          {/* Advantages and Disadvantages */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Advantages */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                Advantages
              </h4>
              <ul className="space-y-2">
                {algorithm.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700 dark:text-slate-300 text-sm">
                      {advantage}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disadvantages */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
                <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                Disadvantages
              </h4>
              <ul className="space-y-2">
                {algorithm.disadvantages.map((disadvantage, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700 dark:text-slate-300 text-sm">
                      {disadvantage}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Use Case */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
              When to Use
            </h4>
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              {algorithm.useCase}
            </p>
          </div>

          {/* Code Examples */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              Implementation
            </h4>
            
            {/* Language Selector */}
            <div className="flex flex-wrap gap-2 mb-4">
              {availableLanguages.map((language) => (
                <button
                  key={language}
                  onClick={() => setSelectedLanguage(language)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedLanguage === language
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm">
                <code className="text-slate-100">
                  {algorithm.codeExamples[selectedLanguage]}
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AlgorithmCard