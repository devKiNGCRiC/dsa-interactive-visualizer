/**
 * ALGORITHM COMPARISON COMPONENT
 * ==============================
 * 
 * This component provides side-by-side comparison of multiple sorting algorithms
 * with performance metrics, recommendations, and interactive features.
 */

import React, { useState, useMemo } from 'react'
import { BarChart3, Clock, Zap, AlertTriangle, CheckCircle, ArrowUpDown, PlayCircle } from 'lucide-react'
import { algorithmData, type AlgorithmInfo } from '../../data/algorithmData'
import { useAlgorithmStore } from '../../stores/algorithmStore'

// TypeScript: Interface for comparison metrics
interface ComparisonMetrics {
  algorithm: string
  timeComplexityScore: number
  spaceComplexityScore: number
  stabilityScore: number
  implementationScore: number
  overallScore: number
  recommendation: string
}

// TypeScript: Props interface for the component
interface AlgorithmComparisonProps {
  selectedAlgorithms?: string[]
}

/**
 * Helper function to convert Big O notation to numeric scores for comparison
 * Higher scores indicate better performance
 */
const getComplexityScore = (complexity: string): number => {
  const scoreMap: { [key: string]: number } = {
    'O(1)': 100,
    'O(log n)': 90,
    'O(n)': 80,
    'O(n log n)': 70,
    'O(n²)': 40,
    'O(n³)': 20,
    'O(2^n)': 10
  }
  return scoreMap[complexity] || 50
}

/**
 * Calculate comprehensive metrics for algorithm comparison
 */
const calculateMetrics = (algorithmKey: string, algorithm: AlgorithmInfo): ComparisonMetrics => {
  // Time complexity: average case weighted higher
  const timeScore = (
    getComplexityScore(algorithm.timeComplexity.best) * 0.2 +
    getComplexityScore(algorithm.timeComplexity.average) * 0.6 +
    getComplexityScore(algorithm.timeComplexity.worst) * 0.2
  )
  
  // Space complexity score
  const spaceScore = getComplexityScore(algorithm.spaceComplexity)
  
  // Stability score (based on advantages/disadvantages)
  const isStable = algorithm.advantages.some(adv => 
    adv.toLowerCase().includes('stable')
  )
  const stabilityScore = isStable ? 100 : 50
  
  // Implementation complexity (inverse of advantages mentioning simplicity)
  const isSimple = algorithm.advantages.some(adv => 
    adv.toLowerCase().includes('simple') || adv.toLowerCase().includes('easy')
  )
  const implementationScore = isSimple ? 90 : 70
  
  // Overall score calculation
  const overallScore = (timeScore * 0.4 + spaceScore * 0.3 + stabilityScore * 0.2 + implementationScore * 0.1)
  
  // Generate recommendation based on scores
  let recommendation = ''
  if (overallScore >= 80) {
    recommendation = 'Excellent choice for most use cases'
  } else if (overallScore >= 70) {
    recommendation = 'Good general-purpose algorithm'
  } else if (overallScore >= 60) {
    recommendation = 'Suitable for specific scenarios'
  } else {
    recommendation = 'Best for educational purposes'
  }
  
  return {
    algorithm: algorithmKey,
    timeComplexityScore: Math.round(timeScore),
    spaceComplexityScore: Math.round(spaceScore),
    stabilityScore,
    implementationScore,
    overallScore: Math.round(overallScore),
    recommendation
  }
}

const AlgorithmComparison: React.FC<AlgorithmComparisonProps> = ({ 
  selectedAlgorithms = ['bubble', 'quick', 'merge'] 
}) => {
  // Get performance history from store
  const { performanceHistory } = useAlgorithmStore()
  
  // State for managing which algorithms to compare
  const [comparing, setComparing] = useState<string[]>(selectedAlgorithms)
  const [sortBy, setSortBy] = useState<'overall' | 'time' | 'space'>('overall')
  const [showActualData, setShowActualData] = useState(false)
  
  // Calculate average performance for each algorithm from actual runs
  const actualPerformance = useMemo(() => {
    const algorithmStats: { [key: string]: { comparisons: number[], swaps: number[], arraySizes: number[] } } = {}
    
    performanceHistory.forEach(run => {
      if (!algorithmStats[run.algorithm]) {
        algorithmStats[run.algorithm] = { comparisons: [], swaps: [], arraySizes: [] }
      }
      algorithmStats[run.algorithm].comparisons.push(run.comparisons)
      algorithmStats[run.algorithm].swaps.push(run.swaps)
      algorithmStats[run.algorithm].arraySizes.push(run.arraySize)
    })
    
    return algorithmStats
  }, [performanceHistory])
  
  // Calculate metrics for all selected algorithms and sort them
  const metrics = useMemo(() => {
    const calculated = comparing.map(key => 
      calculateMetrics(key, algorithmData[key])
    )
    
    // Sort based on selected criteria
    return calculated.sort((a, b) => {
      switch (sortBy) {
        case 'time':
          return b.timeComplexityScore - a.timeComplexityScore
        case 'space':
          return b.spaceComplexityScore - a.spaceComplexityScore
        default:
          return b.overallScore - a.overallScore
      }
    })
  }, [comparing, sortBy])

  // Get sorted algorithms for actual results mode
  const sortedAlgorithms = useMemo(() => {
    if (!showActualData) return comparing
    
    // Calculate dynamic performance-based scores for actual results
    const calculateActualPerformanceScores = (algorithm: string) => {
      const perfData = actualPerformance[algorithm]
      if (!perfData || perfData.comparisons.length === 0) {
        return { timeScore: 0, spaceScore: 0, overallScore: 0 }
      }
      
      const avgComparisons = perfData.comparisons.reduce((a, b) => a + b, 0) / perfData.comparisons.length
      const avgSwaps = perfData.swaps.reduce((a, b) => a + b, 0) / perfData.swaps.length
      const avgArraySize = perfData.arraySizes.reduce((a, b) => a + b, 0) / perfData.arraySizes.length
      
      // Calculate efficiency ratios (lower is better, so we invert for scoring)
      const comparisonRatio = avgComparisons / (avgArraySize * avgArraySize) // Normalize by O(n²)
      const swapRatio = avgSwaps / (avgArraySize * avgArraySize)
      
      // Convert to scores (0-10, higher is better)
      const timeScore = Math.max(0, Math.min(10, 10 - (comparisonRatio * 10)))
      const spaceScore = Math.max(0, Math.min(10, 10 - (swapRatio * 5))) // Swaps indicate memory usage
      const overallScore = (timeScore + spaceScore) / 2
      
      return {
        timeScore: Math.round(timeScore * 10) / 10,
        spaceScore: Math.round(spaceScore * 10) / 10,
        overallScore: Math.round(overallScore * 10) / 10
      }
    }
    
    // Sort algorithms based on actual performance scores
    return [...comparing].sort((a, b) => {
      const aScores = calculateActualPerformanceScores(a)
      const bScores = calculateActualPerformanceScores(b)
      
      switch (sortBy) {
        case 'time':
          return bScores.timeScore - aScores.timeScore
        case 'space':
          return bScores.spaceScore - aScores.spaceScore
        default:
          return bScores.overallScore - aScores.overallScore
      }
    })
  }, [comparing, sortBy, showActualData, actualPerformance])
  
  // Available algorithms for selection
  const availableAlgorithms = Object.keys(algorithmData)
  
  // Toggle algorithm selection
  const toggleAlgorithm = (algorithm: string) => {
    if (comparing.includes(algorithm)) {
      setComparing(prev => prev.filter(a => a !== algorithm))
    } else {
      setComparing(prev => [...prev, algorithm])
    }
  }
  
  // Get color based on score
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900'
    return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Algorithm Comparison
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Compare sorting algorithms across multiple dimensions to find the best fit for your needs
        </p>
      </div>

      {/* Algorithm Selection */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
          <ArrowUpDown className="w-5 h-5 mr-2 text-primary-600" />
          Select Algorithms to Compare
        </h3>
        <div className="flex flex-wrap gap-3">
          {availableAlgorithms.map((algorithm) => (
            <button
              key={algorithm}
              onClick={() => toggleAlgorithm(algorithm)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                comparing.includes(algorithm)
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {algorithmData[algorithm].name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-slate-700 dark:text-slate-300 font-medium">Sort by:</span>
            <div className="flex gap-2">
              {[
                { key: 'overall', label: 'Overall Score', icon: BarChart3 },
                { key: 'time', label: 'Time Complexity', icon: Clock },
                { key: 'space', label: 'Space Efficiency', icon: Zap }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key as typeof sortBy)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center ${
                    sortBy === key
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Toggle for actual vs theoretical data */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {showActualData ? 'Actual Results' : 'Theoretical Analysis'}
            </span>
            <button
              onClick={() => setShowActualData(!showActualData)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showActualData ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showActualData ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Actual Performance Data */}
      {showActualData && performanceHistory.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <PlayCircle className="w-5 h-5 mr-2 text-green-600" />
            Actual Performance Results
          </h3>
          
          <div className="space-y-4">
            {comparing.map(algorithm => {
              const runs = performanceHistory.filter(run => run.algorithm === algorithm)
              if (runs.length === 0) return null
              
              const avgComparisons = runs.reduce((sum, run) => sum + run.comparisons, 0) / runs.length
              const avgSwaps = runs.reduce((sum, run) => sum + run.swaps, 0) / runs.length
              const avgArraySize = runs.reduce((sum, run) => sum + run.arraySize, 0) / runs.length
              
              return (
                <div key={algorithm} className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {algorithmData[algorithm].name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {runs.length} runs • Avg. array size: {Math.round(avgArraySize)}
                      </p>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600 dark:text-blue-400">
                          {Math.round(avgComparisons)}
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">Comparisons</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-red-600 dark:text-red-400">
                          {Math.round(avgSwaps)}
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">Swaps</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {performanceHistory.length === 0 && (
            <div className="text-center text-slate-500 dark:text-slate-400 py-8">
              <PlayCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No performance data yet. Run some sorting algorithms to see actual results!</p>
            </div>
          )}
        </div>
      )}

      {/* Comparison Table */}
      {comparing.length > 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            {showActualData ? (
              <table className="w-full min-w-[800px]">
                <thead className="bg-slate-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white">
                      Algorithm
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-slate-900 dark:text-white">
                      Avg Comparisons
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-slate-900 dark:text-white">
                      Avg Swaps
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-slate-900 dark:text-white">
                      Time Score
                      <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
                        (Performance)
                      </div>
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-slate-900 dark:text-white">
                      Space Score
                      <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
                        (Efficiency)
                      </div>
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-slate-900 dark:text-white">
                      Overall Score
                      <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
                        (Combined)
                      </div>
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-slate-900 dark:text-white">
                      Stable
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-slate-900 dark:text-white">
                      In-Place
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {sortedAlgorithms.map((algorithm) => {
                    const perfData = actualPerformance[algorithm] || { comparisons: [], swaps: [], arraySizes: [] };
                    const avgComparisons = perfData.comparisons.length > 0 ? perfData.comparisons.reduce((a, b) => a + b, 0) / perfData.comparisons.length : 0;
                    const avgSwaps = perfData.swaps.length > 0 ? perfData.swaps.reduce((a, b) => a + b, 0) / perfData.swaps.length : 0;
                    const avgArraySize = perfData.arraySizes.length > 0 ? perfData.arraySizes.reduce((a, b) => a + b, 0) / perfData.arraySizes.length : 0;
                    const totalRuns = perfData.comparisons.length;
                    
                    // Calculate scores based on actual performance data
                    let timeScore, spaceScore, overallScore;
                    
                    if (totalRuns > 0) {
                      // Calculate efficiency ratios (lower is better, so we invert for scoring)
                      const comparisonRatio = avgComparisons / (avgArraySize * avgArraySize); // Normalize by O(n²)
                      const swapRatio = avgSwaps / (avgArraySize * avgArraySize);
                      
                      // Convert to scores (0-10, higher is better)
                      timeScore = Math.max(0, Math.min(10, 10 - (comparisonRatio * 10)));
                      spaceScore = Math.max(0, Math.min(10, 10 - (swapRatio * 5))); // Swaps indicate memory usage
                      overallScore = (timeScore + spaceScore) / 2;
                      
                      // Round to 1 decimal place
                      timeScore = Math.round(timeScore * 10) / 10;
                      spaceScore = Math.round(spaceScore * 10) / 10;
                      overallScore = Math.round(overallScore * 10) / 10;
                    } else {
                      // No performance data available, use theoretical scores
                      const algorithmMetrics = calculateMetrics(algorithm, algorithmData[algorithm]);
                      timeScore = algorithmMetrics.timeComplexityScore;
                      spaceScore = algorithmMetrics.spaceComplexityScore;
                      overallScore = algorithmMetrics.overallScore;
                    }
                    
                    return (
                      <tr key={algorithm} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900 dark:text-white">
                            {algorithmData[algorithm].name}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {totalRuns > 0 ? `${totalRuns} runs • Avg size: ${Math.round(avgArraySize)}` : 'No data'}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-300">
                          <div className="font-medium">
                            {totalRuns > 0 ? Math.round(avgComparisons).toLocaleString() : 'N/A'}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">operations</div>
                        </td>
                        <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-300">
                          <div className="font-medium">
                            {totalRuns > 0 ? Math.round(avgSwaps).toLocaleString() : 'N/A'}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">swaps</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(timeScore)}`}>
                            {timeScore}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(spaceScore)}`}>
                            {spaceScore}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-2 rounded-full text-sm font-bold ${getScoreColor(overallScore)}`}>
                            {overallScore}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            algorithmData[algorithm].stable
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {algorithmData[algorithm].stable ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            algorithmData[algorithm].inPlace
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {algorithmData[algorithm].inPlace ? 'Yes' : 'No'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table className="w-full min-w-[800px]">
                <thead className="bg-slate-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                      Algorithm
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                      Time Score
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                      Space Score
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                      Stability
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                      Implementation
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                      Overall
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                      Recommendation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {metrics.map((metric, index) => (
                    <tr key={metric.algorithm} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {index === 0 && (
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          )}
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">
                              {algorithmData[metric.algorithm].name}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              Rank #{index + 1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(metric.timeComplexityScore)}`}>
                          {metric.timeComplexityScore}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(metric.spaceComplexityScore)}`}>
                          {metric.spaceComplexityScore}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(metric.stabilityScore)}`}>
                          {metric.stabilityScore === 100 ? 'Stable' : 'Unstable'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(metric.implementationScore)}`}>
                          {metric.implementationScore}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-2 rounded-full text-sm font-bold ${getScoreColor(metric.overallScore)}`}>
                          {metric.overallScore}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {metric.recommendation}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            No Algorithms Selected
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Please select at least one algorithm to compare using the buttons above.
          </p>
        </div>
      )}

      {/* Performance Insights */}
      {comparing.length > 1 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Performance Insights
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Best Overall Choice</h4>
              <p className="text-blue-700 dark:text-blue-400 text-sm">
                <strong>{algorithmData[metrics[0]?.algorithm]?.name}</strong> ranks highest with a score of {metrics[0]?.overallScore}/100. 
                {metrics[0]?.recommendation}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Key Differences</h4>
              <p className="text-blue-700 dark:text-blue-400 text-sm">
                The score gap between the best and worst performing algorithms is {' '}
                {metrics[0]?.overallScore - metrics[metrics.length - 1]?.overallScore} points, 
                indicating {metrics[0]?.overallScore - metrics[metrics.length - 1]?.overallScore > 30 ? 'significant' : 'moderate'} performance differences.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AlgorithmComparison