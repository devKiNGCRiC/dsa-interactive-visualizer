import type { ArrayElement } from '../stores/algorithmStore'

export interface SortingStep {
  type: 'compare' | 'swap' | 'complete' | 'set_sorted' | 'set_value'
  indices: number[]
  value?: number // New field for setting a specific value
  message?: string
}

export async function bubbleSort(
  array: ArrayElement[],
  updateCallback: (step: SortingStep) => void,
  speed: number
): Promise<void> {
  const arr = [...array]
  const steps: SortingStep[] = []
  
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Compare step
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        message: `Comparing ${arr[j].value} and ${arr[j + 1].value}`
      })
      
      if (arr[j].value > arr[j + 1].value) {
        // Swap step
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          message: `Swapping ${arr[j].value} and ${arr[j + 1].value}`
        })
        
        // Perform the swap
        const temp = arr[j].value
        arr[j].value = arr[j + 1].value
        arr[j + 1].value = temp
      }
    }
    
    // Mark as sorted
    steps.push({
      type: 'set_sorted',
      indices: [arr.length - 1 - i],
      message: `Element ${arr[arr.length - 1 - i].value} is in its final position`
    })
  }
  
  // Mark first element as sorted
  steps.push({
    type: 'set_sorted',
    indices: [0],
    message: 'First element is in its final position'
  })
  
  steps.push({
    type: 'complete',
    indices: [],
    message: 'Bubble sort completed!'
  })
  
  // Execute steps with animation
  for (const step of steps) {
    updateCallback(step)
    await new Promise(resolve => setTimeout(resolve, speed))
  }
}

export async function quickSort(
  array: ArrayElement[],
  updateCallback: (step: SortingStep) => void,
  speed: number
): Promise<void> {
  const arr = [...array]
  const steps: SortingStep[] = []
  
  async function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pivotIndex = await partition(low, high)
      await quickSortHelper(low, pivotIndex - 1)
      await quickSortHelper(pivotIndex + 1, high)
    }
  }
  
  async function partition(low: number, high: number): Promise<number> {
    const pivot = arr[high].value
    let i = low - 1
    
    for (let j = low; j < high; j++) {
      steps.push({
        type: 'compare',
        indices: [j, high],
        message: `Comparing ${arr[j].value} with pivot ${pivot}`
      })
      
      if (arr[j].value < pivot) {
        i++
        if (i !== j) {
          steps.push({
            type: 'swap',
            indices: [i, j],
            message: `Swapping ${arr[i].value} and ${arr[j].value}`
          })
          
          const temp = arr[i].value
          arr[i].value = arr[j].value
          arr[j].value = temp
        }
      }
    }
    
    steps.push({
      type: 'swap',
      indices: [i + 1, high],
      message: `Placing pivot ${pivot} in its correct position`
    })
    
    const temp = arr[i + 1].value
    arr[i + 1].value = arr[high].value
    arr[high].value = temp
    
    return i + 1
  }
  
  await quickSortHelper(0, arr.length - 1)
  
  steps.push({
    type: 'complete',
    indices: [],
    message: 'Quick sort completed!'
  })
  
  // Execute steps with animation
  for (const step of steps) {
    updateCallback(step)
    await new Promise(resolve => setTimeout(resolve, speed))
  }
}

export async function mergeSort(
  array: ArrayElement[],
  updateCallback: (step: SortingStep) => void,
  speed: number
): Promise<void> {
  const arr = [...array] // Create a copy of the original array
  
  // Iterative merge sort implementation for better visualization
  async function mergeSortIterative() {
    let currentSize = 1
    
    while (currentSize < arr.length) {
      let leftStart = 0
      
      while (leftStart < arr.length - 1) {
        const mid = Math.min(leftStart + currentSize - 1, arr.length - 1)
        const rightEnd = Math.min(leftStart + currentSize * 2 - 1, arr.length - 1)
        
        if (mid < rightEnd) {
          await merge(leftStart, mid, rightEnd)
        }
        
        leftStart = leftStart + currentSize * 2
      }
      
      currentSize *= 2
    }
  }
  
  // Merge function that combines two sorted subarrays
  async function merge(left: number, mid: number, right: number) {
    // Show which section we're merging
    updateCallback({
      type: 'compare',
      indices: Array.from({length: right - left + 1}, (_, i) => left + i),
      message: `Merging subarrays from ${left} to ${mid} and ${mid + 1} to ${right}`
    })
    await new Promise(resolve => setTimeout(resolve, speed))
    
    // Create temporary arrays for left and right subarrays
    const leftArr = []
    const rightArr = []
    
    // Copy data to temp arrays
    for (let i = left; i <= mid; i++) {
      leftArr.push(arr[i].value)
    }
    for (let i = mid + 1; i <= right; i++) {
      rightArr.push(arr[i].value)
    }
    
    let i = 0, j = 0, k = left
    
    // Merge the two arrays by comparing elements
    while (i < leftArr.length && j < rightArr.length) {
      // Compare the elements
      updateCallback({
        type: 'compare',
        indices: [k],
        message: `Comparing ${leftArr[i]} and ${rightArr[j]}`
      })
      await new Promise(resolve => setTimeout(resolve, speed))
      
      // Update the array element and show the change
      if (leftArr[i] <= rightArr[j]) {
        arr[k].value = leftArr[i]
        updateCallback({
          type: 'set_value',
          indices: [k],
          value: leftArr[i],
          message: `Placing ${leftArr[i]} at position ${k}`
        })
        i++
      } else {
        arr[k].value = rightArr[j]
        updateCallback({
          type: 'set_value',
          indices: [k],
          value: rightArr[j],
          message: `Placing ${rightArr[j]} at position ${k}`
        })
        j++
      }
      await new Promise(resolve => setTimeout(resolve, speed))
      k++
    }
    
    // Copy remaining elements from left array
    while (i < leftArr.length) {
      arr[k].value = leftArr[i]
      updateCallback({
        type: 'set_value',
        indices: [k],
        value: leftArr[i],
        message: `Placing remaining ${leftArr[i]} at position ${k}`
      })
      await new Promise(resolve => setTimeout(resolve, speed))
      i++
      k++
    }
    
    // Copy remaining elements from right array
    while (j < rightArr.length) {
      arr[k].value = rightArr[j]
      updateCallback({
        type: 'set_value',
        indices: [k],
        value: rightArr[j],
        message: `Placing remaining ${rightArr[j]} at position ${k}`
      })
      await new Promise(resolve => setTimeout(resolve, speed))
      j++
      k++
    }
    
    // Mark the merged section as sorted
    updateCallback({
      type: 'set_sorted',
      indices: Array.from({length: right - left + 1}, (_, idx) => left + idx),
      message: `Section from ${left} to ${right} is now merged and sorted`
    })
    await new Promise(resolve => setTimeout(resolve, speed))
  }
  
  // Start the merge sort process
  await mergeSortIterative()
  
  // Mark completion
  updateCallback({
    type: 'complete',
    indices: [],
    message: 'Merge sort completed!'
  })
}

export async function insertionSort(
  array: ArrayElement[],
  updateCallback: (step: SortingStep) => void,
  speed: number
): Promise<void> {
  const arr = [...array]
  const steps: SortingStep[] = []
  
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i].value
    let j = i - 1
    
    steps.push({
      type: 'compare',
      indices: [i],
      message: `Inserting ${key} into sorted portion`
    })
    
    while (j >= 0 && arr[j].value > key) {
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        message: `Comparing ${arr[j].value} and ${key}`
      })
      
      steps.push({
        type: 'swap',
        indices: [j, j + 1],
        message: `Moving ${arr[j].value} to the right`
      })
      
      arr[j + 1].value = arr[j].value
      j--
    }
    
    arr[j + 1].value = key
    
    steps.push({
      type: 'set_sorted',
      indices: [j + 1],
      message: `${key} is now in its correct position`
    })
  }
  
  steps.push({
    type: 'complete',
    indices: [],
    message: 'Insertion sort completed!'
  })
  
  // Execute steps with animation
  for (const step of steps) {
    updateCallback(step)
    await new Promise(resolve => setTimeout(resolve, speed))
  }
}

export async function selectionSort(
  array: ArrayElement[],
  updateCallback: (step: SortingStep) => void,
  speed: number
): Promise<void> {
  const arr = [...array]
  const steps: SortingStep[] = []
  
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        type: 'compare',
        indices: [minIndex, j],
        message: `Comparing ${arr[minIndex].value} and ${arr[j].value}`
      })
      
      if (arr[j].value < arr[minIndex].value) {
        minIndex = j
      }
    }
    
    if (minIndex !== i) {
      steps.push({
        type: 'swap',
        indices: [i, minIndex],
        message: `Swapping ${arr[i].value} and ${arr[minIndex].value}`
      })
      
      const temp = arr[i].value
      arr[i].value = arr[minIndex].value
      arr[minIndex].value = temp
    }
    
    steps.push({
      type: 'set_sorted',
      indices: [i],
      message: `${arr[i].value} is in its final position`
    })
  }
  
  steps.push({
    type: 'set_sorted',
    indices: [arr.length - 1],
    message: 'Last element is in its final position'
  })
  
  steps.push({
    type: 'complete',
    indices: [],
    message: 'Selection sort completed!'
  })
  
  // Execute steps with animation
  for (const step of steps) {
    updateCallback(step)
    await new Promise(resolve => setTimeout(resolve, speed))
  }
}