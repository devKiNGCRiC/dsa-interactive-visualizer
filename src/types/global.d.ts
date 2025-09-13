// Global type extensions for Google Analytics and custom window functions

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: Record<string, unknown>[]
    trackAlgorithmUsage: (algorithmName: string, arraySize: number) => void
    trackPerformance: (algorithm: string, comparisons: number, swaps: number, timeMs: number) => void
  }
}

export {}