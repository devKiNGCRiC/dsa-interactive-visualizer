import React from 'react'
import { motion } from 'framer-motion'
import { Database, Layers, GitBranch, Grid3X3, MoreHorizontal, Boxes } from 'lucide-react'

const DataStructuresSection: React.FC = () => {
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
          Data Structures Visualizer
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
        >
          Understand how different data structures work by interacting with them directly. 
          See how operations like insertion, deletion, and searching behave in real-time.
        </motion.p>
      </div>

      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-accent-500 to-primary-500 rounded-xl p-8 text-white text-center"
      >
        <div className="flex justify-center mb-4">
          <Database className="h-16 w-16 opacity-80" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Coming Soon!</h3>
        <p className="text-accent-100 max-w-md mx-auto">
          Interactive data structure visualizations including stacks, queues, trees, 
          graphs, and hash tables are in development.
        </p>
      </motion.div>

      {/* Data Structure Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Stack",
            icon: Layers,
            description: "A Last-In-First-Out (LIFO) data structure where elements are added and removed from the top.",
            operations: ["Push", "Pop", "Peek", "isEmpty"],
            complexity: {
              access: "O(n)",
              search: "O(n)",
              insertion: "O(1)",
              deletion: "O(1)"
            },
            useCases: ["Function calls", "Undo operations", "Expression evaluation"]
          },
          {
            name: "Queue",
            icon: MoreHorizontal,
            description: "A First-In-First-Out (FIFO) data structure where elements are added at the rear and removed from the front.",
            operations: ["Enqueue", "Dequeue", "Front", "isEmpty"],
            complexity: {
              access: "O(n)",
              search: "O(n)",
              insertion: "O(1)",
              deletion: "O(1)"
            },
            useCases: ["Task scheduling", "BFS traversal", "Print queue"]
          },
          {
            name: "Binary Tree",
            icon: GitBranch,
            description: "A hierarchical data structure where each node has at most two children: left and right.",
            operations: ["Insert", "Delete", "Search", "Traverse"],
            complexity: {
              access: "O(log n)",
              search: "O(log n)",
              insertion: "O(log n)",
              deletion: "O(log n)"
            },
            useCases: ["Binary search trees", "Heap operations", "Expression trees"]
          },
          {
            name: "Hash Table",
            icon: Grid3X3,
            description: "A data structure that implements an associative array using a hash function to compute indexes.",
            operations: ["Insert", "Delete", "Search", "Hash"],
            complexity: {
              access: "N/A",
              search: "O(1)",
              insertion: "O(1)",
              deletion: "O(1)"
            },
            useCases: ["Database indexing", "Caches", "Symbol tables"]
          },
          {
            name: "Linked List",
            icon: MoreHorizontal,
            description: "A linear collection of data elements where each element points to the next one.",
            operations: ["Insert", "Delete", "Search", "Traverse"],
            complexity: {
              access: "O(n)",
              search: "O(n)",
              insertion: "O(1)",
              deletion: "O(1)"
            },
            useCases: ["Dynamic arrays", "Undo functionality", "Music playlist"]
          },
          {
            name: "Graph",
            icon: Boxes,
            description: "A collection of nodes (vertices) connected by edges, representing relationships between data.",
            operations: ["Add Vertex", "Add Edge", "Remove Vertex", "DFS/BFS"],
            complexity: {
              access: "O(V + E)",
              search: "O(V + E)",
              insertion: "O(1)",
              deletion: "O(V + E)"
            },
            useCases: ["Social networks", "Maps", "Dependency graphs"]
          }
        ].map((dataStructure, index) => (
          <motion.div
            key={dataStructure.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="algorithm-card group hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-accent-100 dark:bg-accent-900 p-2 rounded-lg group-hover:bg-accent-200 dark:group-hover:bg-accent-800 transition-colors">
                <dataStructure.icon className="h-6 w-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {dataStructure.name}
              </h3>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {dataStructure.description}
            </p>
            
            <div className="space-y-3">
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Common Operations
                </div>
                <div className="flex flex-wrap gap-1">
                  {dataStructure.operations.map((op, i) => (
                    <span
                      key={i}
                      className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded"
                    >
                      {op}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Time Complexity
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>Access: <span className="font-mono">{dataStructure.complexity.access}</span></div>
                  <div>Search: <span className="font-mono">{dataStructure.complexity.search}</span></div>
                  <div>Insert: <span className="font-mono">{dataStructure.complexity.insertion}</span></div>
                  <div>Delete: <span className="font-mono">{dataStructure.complexity.deletion}</span></div>
                </div>
              </div>
              
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Use Cases
                </div>
                <ul className="space-y-1">
                  {dataStructure.useCases.map((useCase, i) => (
                    <li key={i} className="text-xs text-slate-600 dark:text-slate-400">
                      • {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="algorithm-card"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Planned Interactive Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium text-slate-700 dark:text-slate-300">Stack Operations</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Push elements onto the stack</li>
              <li>• Pop elements with animation</li>
              <li>• Visualize stack overflow</li>
              <li>• Step-by-step operation tracking</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-slate-700 dark:text-slate-300">Tree Traversals</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>• In-order, pre-order, post-order</li>
              <li>• Interactive node insertion</li>
              <li>• Balanced tree rotations</li>
              <li>• Search path highlighting</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-slate-700 dark:text-slate-300">Hash Functions</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Collision handling visualization</li>
              <li>• Load factor demonstrations</li>
              <li>• Rehashing animations</li>
              <li>• Custom hash function testing</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-slate-700 dark:text-slate-300">Graph Algorithms</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Interactive graph creation</li>
              <li>• DFS and BFS visualization</li>
              <li>• Shortest path algorithms</li>
              <li>• Cycle detection</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DataStructuresSection