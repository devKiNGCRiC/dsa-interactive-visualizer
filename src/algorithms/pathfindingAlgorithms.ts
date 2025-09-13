import type { PathfindingNode } from '../stores/algorithmStore'

export interface PathfindingResult {
  path: PathfindingNode[]
  visitedNodes: PathfindingNode[]
  success: boolean
}

export async function dijkstra(
  grid: PathfindingNode[][],
  startNode: PathfindingNode,
  endNode: PathfindingNode,
  updateCallback: (visitedNode: PathfindingNode) => void,
  speed: number
): Promise<PathfindingResult> {
  const visitedNodes: PathfindingNode[] = []
  const unvisitedNodes = getAllNodes(grid)
  
  startNode.distance = 0
  
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes)
    const closestNode = unvisitedNodes.shift()!
    
    if (closestNode.isWall) continue
    
    if (closestNode.distance === Infinity) {
      return { path: [], visitedNodes, success: false }
    }
    
    closestNode.isVisited = true
    visitedNodes.push(closestNode)
    updateCallback(closestNode)
    
    if (closestNode === endNode) {
      const path = getNodesInShortestPathOrder(endNode)
      return { path, visitedNodes, success: true }
    }
    
    updateUnvisitedNeighbors(closestNode, grid)
    await new Promise(resolve => setTimeout(resolve, speed))
  }
  
  return { path: [], visitedNodes, success: false }
}

export async function aStar(
  grid: PathfindingNode[][],
  startNode: PathfindingNode,
  endNode: PathfindingNode,
  updateCallback: (visitedNode: PathfindingNode) => void,
  speed: number
): Promise<PathfindingResult> {
  const visitedNodes: PathfindingNode[] = []
  const openSet: PathfindingNode[] = [startNode]
  const closedSet: PathfindingNode[] = []
  
  startNode.distance = 0
  startNode.heuristic = calculateHeuristic(startNode, endNode)
  
  while (openSet.length > 0) {
    // Find node with lowest f score (distance + heuristic)
    openSet.sort((a, b) => {
      const aScore = a.distance + (a.heuristic || 0)
      const bScore = b.distance + (b.heuristic || 0)
      return aScore - bScore
    })
    
    const currentNode = openSet.shift()!
    closedSet.push(currentNode)
    
    if (currentNode.isWall) continue
    
    currentNode.isVisited = true
    visitedNodes.push(currentNode)
    updateCallback(currentNode)
    
    if (currentNode === endNode) {
      const path = getNodesInShortestPathOrder(endNode)
      return { path, visitedNodes, success: true }
    }
    
    const neighbors = getUnvisitedNeighbors(currentNode, grid)
    
    for (const neighbor of neighbors) {
      if (closedSet.includes(neighbor) || neighbor.isWall) continue
      
      const tentativeDistance = currentNode.distance + 1
      
      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor)
      } else if (tentativeDistance >= neighbor.distance) {
        continue
      }
      
      neighbor.previousNode = currentNode
      neighbor.distance = tentativeDistance
      neighbor.heuristic = calculateHeuristic(neighbor, endNode)
    }
    
    await new Promise(resolve => setTimeout(resolve, speed))
  }
  
  return { path: [], visitedNodes, success: false }
}

export async function breadthFirstSearch(
  grid: PathfindingNode[][],
  startNode: PathfindingNode,
  endNode: PathfindingNode,
  updateCallback: (visitedNode: PathfindingNode) => void,
  speed: number
): Promise<PathfindingResult> {
  const visitedNodes: PathfindingNode[] = []
  const queue: PathfindingNode[] = [startNode]
  
  startNode.isVisited = true
  
  while (queue.length > 0) {
    const currentNode = queue.shift()!
    visitedNodes.push(currentNode)
    updateCallback(currentNode)
    
    if (currentNode === endNode) {
      const path = getNodesInShortestPathOrder(endNode)
      return { path, visitedNodes, success: true }
    }
    
    const neighbors = getUnvisitedNeighbors(currentNode, grid)
    
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.isVisited = true
        neighbor.previousNode = currentNode
        queue.push(neighbor)
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, speed))
  }
  
  return { path: [], visitedNodes, success: false }
}

export async function depthFirstSearch(
  grid: PathfindingNode[][],
  startNode: PathfindingNode,
  endNode: PathfindingNode,
  updateCallback: (visitedNode: PathfindingNode) => void,
  speed: number
): Promise<PathfindingResult> {
  const visitedNodes: PathfindingNode[] = []
  const stack: PathfindingNode[] = [startNode]
  
  while (stack.length > 0) {
    const currentNode = stack.pop()!
    
    if (currentNode.isVisited || currentNode.isWall) continue
    
    currentNode.isVisited = true
    visitedNodes.push(currentNode)
    updateCallback(currentNode)
    
    if (currentNode === endNode) {
      const path = getNodesInShortestPathOrder(endNode)
      return { path, visitedNodes, success: true }
    }
    
    const neighbors = getUnvisitedNeighbors(currentNode, grid)
    
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.previousNode = currentNode
        stack.push(neighbor)
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, speed))
  }
  
  return { path: [], visitedNodes, success: false }
}

// Helper functions
function getAllNodes(grid: PathfindingNode[][]): PathfindingNode[] {
  const nodes: PathfindingNode[] = []
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node)
    }
  }
  return nodes
}

function sortNodesByDistance(unvisitedNodes: PathfindingNode[]): void {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

function updateUnvisitedNeighbors(node: PathfindingNode, grid: PathfindingNode[][]): void {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1
    neighbor.previousNode = node
  }
}

function getUnvisitedNeighbors(node: PathfindingNode, grid: PathfindingNode[][]): PathfindingNode[] {
  const neighbors: PathfindingNode[] = []
  const { col, row } = node
  
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  
  return neighbors.filter(neighbor => !neighbor.isVisited)
}

function getNodesInShortestPathOrder(finishNode: PathfindingNode): PathfindingNode[] {
  const nodesInShortestPathOrder: PathfindingNode[] = []
  let currentNode: PathfindingNode | null = finishNode
  
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode)
    currentNode = currentNode.previousNode
  }
  
  return nodesInShortestPathOrder
}

function calculateHeuristic(nodeA: PathfindingNode, nodeB: PathfindingNode): number {
  // Manhattan distance
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col)
}