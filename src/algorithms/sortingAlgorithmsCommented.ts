/*
 * SORTING ALGORITHMS WITH DETAILED TYPESCRIPT EXPLANATIONS
 * =======================================================
 * 
 * This file demonstrates various sorting algorithms with comprehensive 
 * TypeScript comments explaining every concept used.
 * 
 * TypeScript Concepts Covered:
 * - Type imports and exports
 * - Interface definitions
 * - Function signatures with types
 * - Async/await patterns
 * - Array methods and destructuring
 * - Template literals
 * - Union types
 * - Optional properties
 */

// ============================================================================
// TYPE IMPORTS AND INTERFACES
// ============================================================================

// TypeScript: 'import type' is used to import only types (not runtime values)
// This tells TypeScript we only need the type definition, not the actual implementation
// It's more efficient as it's removed during compilation
import type { ArrayElement } from '../stores/algorithmStore'

// TypeScript: Define an interface to specify the structure of our SortingStep object
// Interfaces are contracts that define the shape of objects
// This ensures type safety - TypeScript will check that all step objects have these properties
export interface SortingStep {
  type: 'compare' | 'swap' | 'complete' | 'set_sorted' // Union type: can only be one of these strings
  indices: number[] // Array of numbers representing array indices
  message?: string // Optional property (? means it can be undefined)
}

// ============================================================================
// BUBBLE SORT ALGORITHM WITH DETAILED EXPLANATIONS
// ============================================================================

/**
 * BUBBLE SORT IMPLEMENTATION
 * 
 * TypeScript Function Signature Explanation:
 * - 'export async function' - exports an asynchronous function
 * - Parameters have explicit types for type safety
 * - Promise<void> means this function returns a Promise that doesn't return a value
 * 
 * Algorithm Explanation:
 * - Compares adjacent elements and swaps if they're in wrong order
 * - "Bubbles" the largest element to the end in each pass
 * - Time Complexity: O(n²) in worst and average case, O(n) in best case
 * - Space Complexity: O(1) - only uses constant extra space
 */
export async function bubbleSort(
  array: ArrayElement[], // Parameter: array of ArrayElement objects
  updateCallback: (step: SortingStep) => void, // Function parameter: takes SortingStep, returns nothing
  speed: number // Parameter: number for animation speed in milliseconds
): Promise<void> {
  
  // ARRAY COPYING AND INITIALIZATION
  // Spread operator (...) creates a shallow copy of the array
  // This prevents modifying the original array directly
  // JavaScript/TypeScript arrays are reference types, so without copying,
  // changes would affect the original array
  const arr = [...array]
  
  // TypeScript: Array with explicit type annotation
  // This array will store all the steps for visualization
  const steps: SortingStep[] = []
  
  // MAIN BUBBLE SORT ALGORITHM
  // Outer loop: controls the number of passes
  // We need n-1 passes for n elements
  for (let i = 0; i < arr.length - 1; i++) {
    
    // Inner loop: performs comparisons and swaps
    // Each pass, one less element needs to be checked (hence arr.length - i - 1)
    // because the largest elements "bubble up" to their final positions
    for (let j = 0; j < arr.length - i - 1; j++) {
      
      // STEP RECORDING FOR VISUALIZATION
      // Push method adds elements to the end of an array
      // We're creating step objects that conform to our SortingStep interface
      steps.push({
        type: 'compare', // Literal type matching our union type
        indices: [j, j + 1], // Array literal with current comparison indices
        message: `Comparing ${arr[j].value} and ${arr[j + 1].value}` // Template literal with ${} for interpolation
      })
      
      // COMPARISON AND SWAPPING LOGIC
      // Bubble sort comparison: if left element > right element, swap them
      // This ensures larger elements move towards the end
      if (arr[j].value > arr[j + 1].value) {
        
        // Record the swap step for visualization
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          message: `Swapping ${arr[j].value} and ${arr[j + 1].value}`
        })
        
        // CLASSIC THREE-WAY SWAP
        // Use temporary variable to avoid losing data during swap
        const temp = arr[j].value
        arr[j].value = arr[j + 1].value
        arr[j + 1].value = temp
      }
    }
    
    // MARKING SORTED ELEMENTS
    // After each complete pass, the largest element is in its final position
    // We mark it as sorted for visualization purposes
    steps.push({
      type: 'set_sorted',
      indices: [arr.length - 1 - i], // Calculate the position of the newly sorted element
      message: `Element ${arr[arr.length - 1 - i].value} is in its final position`
    })
  }
  
  // Mark the first element as sorted (it's the only one left after all passes)
  steps.push({
    type: 'set_sorted',
    indices: [0],
    message: 'First element is in its final position'
  })
  
  // Final completion step
  steps.push({
    type: 'complete',
    indices: [], // Empty array since no specific indices are involved
    message: 'Bubble sort completed!'
  })
  
  // ASYNCHRONOUS EXECUTION WITH ANIMATION
  // for...of loop iterates over array values (not indices)
  // This is cleaner than for(let i = 0; i < steps.length; i++)
  for (const step of steps) {
    updateCallback(step) // Call the callback function with current step
    
    // PROMISE-BASED DELAY FOR ANIMATION
    // Creates a Promise that resolves after 'speed' milliseconds
    // setTimeout is asynchronous - it doesn't block the thread
    // await pauses execution until the Promise resolves
    // This creates the animation effect by adding delays between steps
    await new Promise(resolve => setTimeout(resolve, speed))
  }
}

// ============================================================================
// QUICK SORT ALGORITHM WITH DETAILED EXPLANATIONS
// ============================================================================

/**
 * QUICK SORT IMPLEMENTATION
 * 
 * Algorithm Explanation:
 * - Divide and conquer algorithm
 * - Picks a pivot element and partitions array around it
 * - Recursively sorts subarrays
 * - Time Complexity: O(n log n) average, O(n²) worst case
 * - Space Complexity: O(log n) due to recursion stack
 */
export async function quickSort(
  array: ArrayElement[],
  updateCallback: (step: SortingStep) => void,
  speed: number
): Promise<void> {
  const arr = [...array]
  const steps: SortingStep[] = []
  
  // RECURSIVE HELPER FUNCTION
  // TypeScript: async functions can be nested and maintain their async nature
  async function quickSortHelper(low: number, high: number) {
    // Base case: if low >= high, subarray has 0 or 1 element (already sorted)
    if (low < high) {
      // Partition the array and get the pivot's final position
      const pivotIndex = await partition(low, high)
      
      // Recursively sort elements before and after the pivot
      await quickSortHelper(low, pivotIndex - 1)
      await quickSortHelper(pivotIndex + 1, high)
    }
  }
  
  // PARTITIONING FUNCTION
  // Places pivot in correct position and returns its index
  async function partition(low: number, high: number): Promise<number> {
    // Choose the last element as pivot (Lomuto partition scheme)
    const pivot = arr[high].value
    
    // Index of smaller element (indicates right position of pivot)
    let i = low - 1
    
    // Traverse through array and compare each element with pivot
    for (let j = low; j < high; j++) {
      steps.push({
        type: 'compare',
        indices: [j, high],
        message: `Comparing ${arr[j].value} with pivot ${pivot}`
      })
      
      // If current element is smaller than or equal to pivot
      if (arr[j].value < pivot) {
        i++ // Increment index of smaller element
        
        // Swap elements only if they're different
        if (i !== j) {
          steps.push({
            type: 'swap',
            indices: [i, j],
            message: `Swapping ${arr[i].value} and ${arr[j].value}`
          })
          
          // Perform the swap
          const temp = arr[i].value
          arr[i].value = arr[j].value
          arr[j].value = temp
        }
      }
    }
    
    // Place pivot in its correct position
    steps.push({
      type: 'swap',
      indices: [i + 1, high],
      message: `Placing pivot ${pivot} in its correct position`
    })
    
    const temp = arr[i + 1].value
    arr[i + 1].value = arr[high].value
    arr[high].value = temp
    
    return i + 1 // Return the position where pivot is now located
  }
  
  // Start the recursive sorting process
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

// ============================================================================
// MERGE SORT ALGORITHM WITH DETAILED EXPLANATIONS
// ============================================================================

/**
 * MERGE SORT IMPLEMENTATION
 * 
 * Algorithm Explanation:
 * - Divide and conquer algorithm
 * - Divides array into halves recursively until single elements
 * - Merges sorted halves back together
 * - Time Complexity: O(n log n) in all cases
 * - Space Complexity: O(n) for temporary arrays
 */
export async function mergeSort(
  array: ArrayElement[],
  updateCallback: (step: SortingStep) => void,
  speed: number
): Promise<void> {
  const arr = [...array] // Create a copy of the original array
  const steps: SortingStep[] = []
  
  // RECURSIVE MERGE SORT HELPER FUNCTION
  function mergeSortHelper(left: number, right: number) {
    // Base case: if left >= right, subarray has 0 or 1 element
    if (left < right) {
      // Calculate middle point to divide array into two halves
      // Math.floor ensures we get an integer
      const mid = Math.floor((left + right) / 2)
      
      // Add step to show which section we're dividing
      // Array.from creates array from given length and fills with calculated indices
      steps.push({
        type: 'compare',
        indices: Array.from({length: right - left + 1}, (_, i) => left + i),
        message: `Dividing array from index ${left} to ${right}`
      })
      
      // Recursively sort first and second halves
      mergeSortHelper(left, mid)
      mergeSortHelper(mid + 1, right)
      
      // Merge the sorted halves
      merge(left, mid, right)
    }
  }
  
  // MERGE FUNCTION
  // Combines two sorted subarrays into one sorted subarray
  function merge(left: number, mid: number, right: number) {
    // Create temporary arrays for left and right subarrays
    // .slice() creates a shallow copy of array portion
    // .map() transforms each element, extracting just the value
    const leftArr = arr.slice(left, mid + 1).map(el => el.value)
    const rightArr = arr.slice(mid + 1, right + 1).map(el => el.value)
    
    // Initialize indices for left array, right array, and merged array
    let i = 0, j = 0, k = left
    
    // MAIN MERGING LOGIC
    // Compare elements from both arrays and place smaller one in result
    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        type: 'compare',
        indices: [k],
        message: `Comparing ${leftArr[i]} and ${rightArr[j]}`
      })
      
      // Choose smaller element and place it in the merged array
      if (leftArr[i] <= rightArr[j]) {
        arr[k].value = leftArr[i]
        steps.push({
          type: 'swap',
          indices: [k],
          message: `Placing ${leftArr[i]} at position ${k}`
        })
        i++ // Move to next element in left array
      } else {
        arr[k].value = rightArr[j]
        steps.push({
          type: 'swap',
          indices: [k],
          message: `Placing ${rightArr[j]} at position ${k}`
        })
        j++ // Move to next element in right array
      }
      k++ // Move to next position in merged array
    }
    
    // COPY REMAINING ELEMENTS
    // Copy remaining elements from left array (if any)
    while (i < leftArr.length) {
      arr[k].value = leftArr[i]
      steps.push({
        type: 'swap',
        indices: [k],
        message: `Placing remaining ${leftArr[i]} at position ${k}`
      })
      i++
      k++
    }
    
    // Copy remaining elements from right array (if any)
    while (j < rightArr.length) {
      arr[k].value = rightArr[j]
      steps.push({
        type: 'swap',
        indices: [k],
        message: `Placing remaining ${rightArr[j]} at position ${k}`
      })
      j++
      k++
    }
    
    // Mark the merged section as temporarily sorted
    for (let idx = left; idx <= right; idx++) {
      steps.push({
        type: 'set_sorted',
        indices: [idx],
        message: `Section from ${left} to ${right} is now merged and sorted`
      })
    }
  }
  
  // Start the merge sort process
  mergeSortHelper(0, arr.length - 1)
  
  // Mark completion
  steps.push({
    type: 'complete',
    indices: [],
    message: 'Merge sort completed!'
  })
  
  // Execute steps with animation
  for (const step of steps) {
    updateCallback(step)
    await new Promise(resolve => setTimeout(resolve, speed))
  }
}

// ============================================================================
// INSERTION SORT ALGORITHM WITH DETAILED EXPLANATIONS
// ============================================================================

/**
 * INSERTION SORT IMPLEMENTATION
 * 
 * Algorithm Explanation:
 * - Builds final sorted array one element at a time
 * - Takes each element and inserts it into correct position in sorted portion
 * - Time Complexity: O(n²) worst/average case, O(n) best case
 * - Space Complexity: O(1)
 */
export async function insertionSort(
  array: ArrayElement[],
  updateCallback: (step: SortingStep) => void,
  speed: number
): Promise<void> {
  const arr = [...array]
  const steps: SortingStep[] = []
  
  // Start from second element (index 1) as first element is trivially sorted
  for (let i = 1; i < arr.length; i++) {
    // Current element to be positioned
    const key = arr[i].value
    
    // Start comparing with element before current
    let j = i - 1
    
    steps.push({
      type: 'compare',
      indices: [i],
      message: `Inserting ${key} into sorted portion`
    })
    
    // INSERTION LOGIC
    // Move elements greater than key one position ahead
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
      
      // Shift element to the right
      arr[j + 1].value = arr[j].value
      j-- // Move to previous element
    }
    
    // Place key in its correct position
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

// ============================================================================
// SELECTION SORT ALGORITHM WITH DETAILED EXPLANATIONS
// ============================================================================

/**
 * SELECTION SORT IMPLEMENTATION
 * 
 * Algorithm Explanation:
 * - Finds minimum element from unsorted portion
 * - Swaps it with first element of unsorted portion
 * - Expands sorted portion by one element each iteration
 * - Time Complexity: O(n²) in all cases
 * - Space Complexity: O(1)
 */
export async function selectionSort(
  array: ArrayElement[],
  updateCallback: (step: SortingStep) => void,
  speed: number
): Promise<void> {
  const arr = [...array]
  const steps: SortingStep[] = []
  
  // Outer loop: controls sorted/unsorted boundary
  for (let i = 0; i < arr.length - 1; i++) {
    // Assume first element of unsorted portion is minimum
    let minIndex = i
    
    // FINDING MINIMUM ELEMENT
    // Inner loop: finds minimum in unsorted portion
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        type: 'compare',
        indices: [minIndex, j],
        message: `Comparing ${arr[minIndex].value} and ${arr[j].value}`
      })
      
      // Update minimum index if smaller element found
      if (arr[j].value < arr[minIndex].value) {
        minIndex = j
      }
    }
    
    // SWAPPING IF NECESSARY
    // Only swap if minimum is not already in correct position
    if (minIndex !== i) {
      steps.push({
        type: 'swap',
        indices: [i, minIndex],
        message: `Swapping ${arr[i].value} and ${arr[minIndex].value}`
      })
      
      // Perform the swap
      const temp = arr[i].value
      arr[i].value = arr[minIndex].value
      arr[minIndex].value = temp
    }
    
    // Mark current position as sorted
    steps.push({
      type: 'set_sorted',
      indices: [i],
      message: `${arr[i].value} is in its final position`
    })
  }
  
  // Mark the last element as sorted
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

/*
 * TYPESCRIPT CONCEPTS SUMMARY:
 * ============================
 * 
 * 1. Type Imports: import type { } - imports only type information
 * 2. Interfaces: define contracts for object shapes
 * 3. Union Types: type can be one of several values (|)
 * 4. Optional Properties: ? makes properties optional
 * 5. Function Types: explicit parameter and return types
 * 6. Async/Await: handle asynchronous operations
 * 7. Promise<T>: represents eventual completion of async operation
 * 8. Array Types: Type[] or Array<Type>
 * 9. Template Literals: ${} for string interpolation
 * 10. Spread Operator: ... for array copying/spreading
 * 11. Array Methods: map, slice, push, etc.
 * 12. Const Assertions: ensure type safety
 * 13. Arrow Functions: concise function syntax
 * 14. Destructuring: extract values from arrays/objects
 * 15. For...of Loops: iterate over iterable objects
 */