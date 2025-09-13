/**
 * ALGORITHM DATA DEFINITIONS
 * =========================
 * 
 * This file contains comprehensive information about sorting algorithms
 * including definitions, complexity analysis, advantages, disadvantages, and code examples.
 */

// TypeScript: Define the structure for algorithm information
export interface AlgorithmInfo {
  name: string
  definition: string
  timeComplexity: {
    best: string
    average: string
    worst: string
  }
  spaceComplexity: string
  stable: boolean
  inPlace: boolean
  advantages: string[]
  disadvantages: string[]
  useCase: string
  codeExamples: {
    [language: string]: string
  }
}

// Algorithm data - comprehensive information for each sorting algorithm
export const algorithmData: { [key: string]: AlgorithmInfo } = {
  bubble: {
    name: "Bubble Sort",
    definition: "Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stable: true,
    inPlace: true,
    advantages: [
      "Simple implementation and easy to understand",
      "No additional memory space needed (in-place sorting)",
      "Stable sorting algorithm (maintains relative order of equal elements)",
      "Can detect if the list is already sorted",
      "Adaptive - performs better on partially sorted arrays"
    ],
    disadvantages: [
      "Poor time complexity for large datasets",
      "More writes compared to other O(n²) algorithms",
      "Generally slower than other simple sorting algorithms",
      "Not practical for large datasets"
    ],
    useCase: "Educational purposes, small datasets, or when simplicity is more important than efficiency.",
    codeExamples: {
      typescript: `function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
      cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`
    }
  },
  quick: {
    name: "Quick Sort",
    definition: "Quick Sort is a highly efficient divide-and-conquer sorting algorithm that works by selecting a 'pivot' element and partitioning the array around it, then recursively sorting the sub-arrays.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(log n)",
    stable: false,
    inPlace: true,
    advantages: [
      "Generally faster than other O(n log n) algorithms",
      "In-place sorting (requires only O(log n) extra space)",
      "Cache-efficient due to good locality of reference",
      "Widely used in practice",
      "Can be easily parallelized"
    ],
    disadvantages: [
      "Worst-case time complexity is O(n²)",
      "Not stable (may change relative order of equal elements)",
      "Performance depends on pivot selection",
      "Recursive implementation may cause stack overflow for large inputs"
    ],
    useCase: "General-purpose sorting, large datasets, when average-case performance is important.",
    codeExamples: {
      typescript: `function quickSort(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    const pivot = partition(arr, low, high);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
  }
  return arr;
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivot = partition(arr, low, high);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot = partition(arr, low, high)
        quick_sort(arr, low, pivot - 1)
        quick_sort(arr, pivot + 1, high)
    
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pivot = partition(arr, low, high);
        quickSort(arr, low, pivot - 1);
        quickSort(arr, pivot + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
}`
    }
  },
  merge: {
    name: "Merge Sort",
    definition: "Merge Sort is a stable, divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves back together.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(n)",
    stable: true,
    inPlace: false,
    advantages: [
      "Guaranteed O(n log n) time complexity",
      "Stable sorting algorithm",
      "Predictable performance",
      "Works well with large datasets",
      "Can be easily parallelized",
      "External sorting capability"
    ],
    disadvantages: [
      "Requires O(n) extra space",
      "Slower than Quick Sort in practice for small arrays",
      "Not in-place",
      "Overhead of recursive calls"
    ],
    useCase: "When stability is required, guaranteed worst-case performance, external sorting, linked lists.",
    codeExamples: {
      typescript: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result`
    }
  },
  insertion: {
    name: "Insertion Sort",
    definition: "Insertion Sort builds the final sorted array one item at a time. It works by taking each element and inserting it into its correct position among the previously sorted elements.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stable: true,
    inPlace: true,
    advantages: [
      "Simple implementation",
      "Efficient for small datasets",
      "Adaptive - efficient for data sets that are already substantially sorted",
      "Stable sorting algorithm",
      "In-place sorting",
      "Online - can sort a list as it receives it"
    ],
    disadvantages: [
      "Inefficient for large datasets",
      "More writes than selection sort",
      "O(n²) comparisons and writes in average and worst case"
    ],
    useCase: "Small datasets, nearly sorted arrays, as a subroutine in hybrid algorithms.",
    codeExamples: {
      typescript: `function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key
    
    return arr`
    }
  },
  selection: {
    name: "Selection Sort",
    definition: "Selection Sort divides the input list into sorted and unsorted regions, and repeatedly selects the smallest element from the unsorted region and moves it to the sorted region.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
    advantages: [
      "Simple implementation",
      "In-place sorting",
      "Minimum number of swaps (O(n))",
      "Performance doesn't depend on input data",
      "Good for situations where write operations are costly"
    ],
    disadvantages: [
      "Poor time complexity",
      "Not stable",
      "Not adaptive",
      "Many unnecessary comparisons even for sorted arrays"
    ],
    useCase: "When memory writes are costly, small datasets, when simplicity is preferred.",
    codeExamples: {
      typescript: `function selectionSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}`,
      javascript: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}`,
      python: `def selection_sort(arr):
    for i in range(len(arr) - 1):
        min_index = i
        
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_index]:
                min_index = j
        
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    
    return arr`
    }
  }
}