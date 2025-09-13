import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Zap, Target } from 'lucide-react'

const PathfindingSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-slate-900 dark:text-white"
        >
          Pathfinding Algorithm Visualizer
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
        >
          Explore different pathfinding algorithms and see how they navigate through obstacles 
          to find the shortest path between two points.
        </motion.p>
      </div>

      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white text-center"
      >
        <div className="flex justify-center mb-4">
          <Navigation className="h-16 w-16 opacity-80" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Coming Soon!</h3>
        <p className="text-primary-100 max-w-md mx-auto">
          Interactive pathfinding visualization with Dijkstra's Algorithm, A*, BFS, and DFS 
          is currently in development.
        </p>
      </motion.div>

      {/* Algorithm Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: "Dijkstra's Algorithm",
            icon: Target,
            description: "Finds the shortest path by exploring nodes in order of their distance from the start.",
            complexity: "O(V²) or O(E + V log V)",
            features: ["Guaranteed shortest path", "Weighted graphs", "Explores uniformly"]
          },
          {
            name: "A* Search",
            icon: Zap,
            description: "Uses heuristics to guide the search toward the goal more efficiently.",
            complexity: "O(E) in worst case",
            features: ["Heuristic-based", "Optimal with admissible heuristic", "Memory intensive"]
          },
          {
            name: "Breadth-First Search",
            icon: MapPin,
            description: "Explores all neighboring nodes before moving to the next level.",
            complexity: "O(V + E)",
            features: ["Unweighted graphs", "Layer by layer", "Guaranteed shortest path"]
          },
          {
            name: "Depth-First Search",
            icon: Navigation,
            description: "Explores as far as possible along each branch before backtracking.",
            complexity: "O(V + E)",
            features: ["Memory efficient", "Not optimal", "Good for maze solving"]
          }
        ].map((algorithm, index) => (
          <motion.div
            key={algorithm.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="algorithm-card group hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                <algorithm.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                {algorithm.name}
              </h3>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {algorithm.description}
            </p>
            
            <div className="space-y-3">
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Time Complexity
                </div>
                <div className="text-xs font-mono bg-slate-100 dark:bg-slate-700 rounded px-2 py-1">
                  {algorithm.complexity}
                </div>
              </div>
              
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Key Features
                </div>
                <ul className="space-y-1">
                  {algorithm.features.map((feature, i) => (
                    <li key={i} className="text-xs text-slate-600 dark:text-slate-400">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="algorithm-card"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Planned Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium text-slate-700 dark:text-slate-300">Interactive Grid</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Click to set start and end points</li>
              <li>• Draw walls by clicking and dragging</li>
              <li>• Clear and reset functionality</li>
              <li>• Responsive grid sizing</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-slate-700 dark:text-slate-300">Visualization</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Animated pathfinding process</li>
              <li>• Color-coded node states</li>
              <li>• Final path highlighting</li>
              <li>• Adjustable animation speed</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-slate-700 dark:text-slate-300">Analysis</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Nodes visited counter</li>
              <li>• Path length measurement</li>
              <li>• Algorithm comparison</li>
              <li>• Performance metrics</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PathfindingSection