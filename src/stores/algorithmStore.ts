import { create } from 'zustand'

export interface ArrayElement {
  value: number
  index: number
  state: 'normal' | 'comparing' | 'swapping' | 'sorted' | 'pivot'
}

export interface PerformanceData {
  algorithm: string
  arraySize: number
  comparisons: number
  swaps: number
  timeComplexity: string
  timestamp: number
}

export interface AlgorithmState {
  array: ArrayElement[]
  isPlaying: boolean
  isPaused: boolean
  speed: number
  algorithm: string
  comparisons: number
  swaps: number
  currentStep: number
  totalSteps: number
  performanceHistory: PerformanceData[]
}

interface AlgorithmStore extends AlgorithmState {
  // Actions
  setArray: (array: number[]) => void
  setIsPlaying: (isPlaying: boolean) => void
  setIsPaused: (isPaused: boolean) => void
  setSpeed: (speed: number) => void
  setAlgorithm: (algorithm: string) => void
  updateElement: (index: number, state: ArrayElement['state']) => void
  updateElementValue: (index: number, value: number) => void
  updateElements: (updates: { index: number; state: ArrayElement['state'] }[]) => void
  swapElements: (index1: number, index2: number) => void
  incrementComparisons: () => void
  incrementSwaps: () => void
  setCurrentStep: (step: number) => void
  setTotalSteps: (steps: number) => void
  resetStats: () => void
  addPerformanceData: (data: PerformanceData) => void
  getPerformanceHistory: (algorithm?: string) => PerformanceData[]
  generateRandomArray: (size: number, min?: number, max?: number) => void
}

export const useAlgorithmStore = create<AlgorithmStore>((set, get) => ({
  // Initial state
  array: [],
  isPlaying: false,
  isPaused: false,
  speed: 100,
  algorithm: 'bubble',
  comparisons: 0,
  swaps: 0,
  currentStep: 0,
  totalSteps: 0,
  performanceHistory: [],

  // Actions
  setArray: (array: number[]) =>
    set({
      array: array.map((value, index) => ({
        value,
        index,
        state: 'normal' as const,
      })),
      comparisons: 0,
      swaps: 0,
      currentStep: 0,
    }),

  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),

  setIsPaused: (isPaused: boolean) => set({ isPaused }),

  setSpeed: (speed: number) => set({ speed }),

  setAlgorithm: (algorithm: string) => set({ algorithm }),

  updateElement: (index: number, state: ArrayElement['state']) =>
    set((prev) => ({
      array: prev.array.map((element, i) =>
        i === index ? { ...element, state } : element
      ),
    })),

  updateElementValue: (index: number, value: number) =>
    set((prev) => ({
      array: prev.array.map((element, i) =>
        i === index ? { ...element, value } : element
      ),
    })),

  updateElements: (updates: { index: number; state: ArrayElement['state'] }[]) =>
    set((prev) => ({
      array: prev.array.map((element, i) => {
        const update = updates.find((u) => u.index === i)
        return update ? { ...element, state: update.state } : element
      }),
    })),

  swapElements: (index1: number, index2: number) =>
    set((prev) => {
      const newArray = [...prev.array]
      const temp = newArray[index1].value
      newArray[index1] = { ...newArray[index1], value: newArray[index2].value }
      newArray[index2] = { ...newArray[index2], value: temp }
      return { array: newArray }
    }),

  incrementComparisons: () =>
    set((prev) => ({ comparisons: prev.comparisons + 1 })),

  incrementSwaps: () => set((prev) => ({ swaps: prev.swaps + 1 })),

  setCurrentStep: (currentStep: number) => set({ currentStep }),

  setTotalSteps: (totalSteps: number) => set({ totalSteps }),

  resetStats: () =>
    set({
      comparisons: 0,
      swaps: 0,
      currentStep: 0,
      totalSteps: 0,
    }),

  addPerformanceData: (data: PerformanceData) =>
    set((prev) => ({
      performanceHistory: [...prev.performanceHistory, data]
    })),

  getPerformanceHistory: (algorithm?: string) => {
    const { performanceHistory } = get()
    return algorithm 
      ? performanceHistory.filter(data => data.algorithm === algorithm)
      : performanceHistory
  },

  generateRandomArray: (size: number, min = 5, max = 100) => {
    const array = Array.from(
      { length: size },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    )
    get().setArray(array)
  },
}))

// Pathfinding Store
export interface PathfindingNode {
  row: number
  col: number
  isStart: boolean
  isEnd: boolean
  isWall: boolean
  isVisited: boolean
  isPath: boolean
  distance: number
  previousNode: PathfindingNode | null
  heuristic?: number
}

interface PathfindingStore {
  grid: PathfindingNode[][]
  startNode: { row: number; col: number } | null
  endNode: { row: number; col: number } | null
  algorithm: string
  isRunning: boolean
  isComplete: boolean
  speed: number
  
  // Actions
  initializeGrid: (rows: number, cols: number) => void
  setStartNode: (row: number, col: number) => void
  setEndNode: (row: number, col: number) => void
  toggleWall: (row: number, col: number) => void
  setAlgorithm: (algorithm: string) => void
  setIsRunning: (isRunning: boolean) => void
  setIsComplete: (isComplete: boolean) => void
  setSpeed: (speed: number) => void
  updateNode: (row: number, col: number, updates: Partial<PathfindingNode>) => void
  resetGrid: () => void
  clearPath: () => void
}

export const usePathfindingStore = create<PathfindingStore>((set, get) => ({
  grid: [],
  startNode: null,
  endNode: null,
  algorithm: 'dijkstra',
  isRunning: false,
  isComplete: false,
  speed: 20,

  initializeGrid: (rows: number, cols: number) => {
    const grid: PathfindingNode[][] = []
    for (let row = 0; row < rows; row++) {
      const currentRow: PathfindingNode[] = []
      for (let col = 0; col < cols; col++) {
        currentRow.push({
          row,
          col,
          isStart: false,
          isEnd: false,
          isWall: false,
          isVisited: false,
          isPath: false,
          distance: Infinity,
          previousNode: null,
        })
      }
      grid.push(currentRow)
    }
    set({ grid, startNode: null, endNode: null, isComplete: false })
  },

  setStartNode: (row: number, col: number) => {
    const { grid, startNode } = get()
    if (startNode) {
      grid[startNode.row][startNode.col].isStart = false
    }
    grid[row][col].isStart = true
    grid[row][col].isWall = false
    set({ grid: [...grid], startNode: { row, col } })
  },

  setEndNode: (row: number, col: number) => {
    const { grid, endNode } = get()
    if (endNode) {
      grid[endNode.row][endNode.col].isEnd = false
    }
    grid[row][col].isEnd = true
    grid[row][col].isWall = false
    set({ grid: [...grid], endNode: { row, col } })
  },

  toggleWall: (row: number, col: number) => {
    const { grid } = get()
    const node = grid[row][col]
    if (!node.isStart && !node.isEnd) {
      node.isWall = !node.isWall
      set({ grid: [...grid] })
    }
  },

  setAlgorithm: (algorithm: string) => set({ algorithm }),

  setIsRunning: (isRunning: boolean) => set({ isRunning }),

  setIsComplete: (isComplete: boolean) => set({ isComplete }),

  setSpeed: (speed: number) => set({ speed }),

  updateNode: (row: number, col: number, updates: Partial<PathfindingNode>) => {
    const { grid } = get()
    Object.assign(grid[row][col], updates)
    set({ grid: [...grid] })
  },

  resetGrid: () => {
    const { grid } = get()
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const node = grid[row][col]
        node.isVisited = false
        node.isPath = false
        node.distance = Infinity
        node.previousNode = null
        node.heuristic = undefined
      }
    }
    set({ grid: [...grid], isComplete: false })
  },

  clearPath: () => {
    const { grid } = get()
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const node = grid[row][col]
        node.isVisited = false
        node.isPath = false
      }
    }
    set({ grid: [...grid], isComplete: false })
  },
}))