# 🚀 AlgoVisualizer Pro

An interactive web application for learning and visualizing data structures and algorithms with **real-time performance analysis and dynamic scoring**. Built with modern web technologies including React, TypeScript, and Tailwind CSS.

![AlgoVisualizer Pro](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue) ![Vite](https://img.shields.io/badge/Vite-7.1-green)

## 🌐 Live Demo

**🚀 [Try AlgoVisualizer Pro](https://algovisualizer-pro.vercel.app)**

Experience interactive algorithm learning with real-time visualizations and performance analysis!

## ✨ Features

### 🔄 Sorting Algorithms Visualization
- **5 Interactive Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort
- **Real-time Visualization**: Watch algorithms sort step-by-step with smooth animations
- **Performance Tracking**: Track comparisons, swaps, and execution time
- **Custom Input**: Test with your own arrays or generate random data
- **Speed Control**: Adjust animation speed from slow to ultra-fast

### 📊 Advanced Algorithm Comparison System
- **Dual-Mode Analysis**: 
  - **Theoretical Mode**: Compare time/space complexity, stability, and implementation characteristics
  - **Actual Results Mode**: Compare real performance data with **dynamic scoring system**
- **Performance-Based Scoring**: 
  - **Time Score**: Based on actual comparisons performed (0-10 scale)
  - **Space Score**: Based on memory operations/swaps (0-10 scale)
  - **Overall Score**: Combined efficiency metric based on real performance
- **Smart Sorting**: Sort algorithms by actual performance in both theoretical and actual modes
- **Algorithm Properties**: Clear visual indicators for stability and in-place characteristics

### 🎛️ Interactive Features
- ⚡ Real-time visualization with smooth animations
- 🎛️ Adjustable speed controls (1-500%)
- 📊 **Dynamic performance metrics** that update based on actual algorithm execution
- 🔀 Random array generation with customizable size (5-100 elements)
- 📏 Custom array input for testing specific scenarios
- 🎨 Color-coded element states (comparing, swapping, sorted)
- 📈 **Performance history tracking** across multiple runs

### 🔄 Coming Soon
- **Pathfinding Algorithms** - Dijkstra's, A*, BFS, DFS
- **Data Structures** - Stack, Queue, Binary Tree, Hash Table, Graph
- **Advanced Algorithms** - Heap Sort, Radix Sort, Counting Sort

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Charts:** Recharts (planned)
- **Icons:** Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devKiNGCRiC/dsa-interactive-visualizer.git
   cd dsa-interactive-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 📖 How to Use

### Sorting Visualizer

1. **Select an Algorithm**: Choose from Bubble, Selection, Insertion, Merge, or Quick Sort
2. **Customize Array**: 
   - Adjust array size (5-100 elements)
   - Click "Shuffle" to generate new random data
3. **Control Playback**:
   - Use speed slider to control animation speed
   - Click "Start Sort" to begin visualization
   - Watch the algorithm progress with color-coded states
4. **Analyze Performance**:
   - Track comparisons and swaps in real-time
   - Compare different algorithms on the same dataset

### Color Legend
- 🔵 **Blue**: Normal state
- 🟡 **Yellow**: Being compared
- 🔴 **Red**: Being swapped
- 🟢 **Green**: Sorted/Final position

## 🏗️ Project Structure

```
src/
├── algorithms/           # Algorithm implementations
│   ├── sortingAlgorithms.ts
│   └── pathfindingAlgorithms.ts
├── components/           # React components
│   ├── Layout/          # Header, Footer
│   ├── Sorting/         # Sorting visualizer components
│   ├── Pathfinding/     # Pathfinding components (coming soon)
│   └── DataStructures/  # Data structure components (coming soon)
├── stores/              # Zustand state management
│   └── algorithmStore.ts
└── styles/             # Global styles and Tailwind config
```

## 🎯 Dynamic Scoring System

### How Scoring Works

**In Actual Results Mode**, scores are calculated based on real performance data:

#### Time Score (0-10)
- **Based on**: Number of comparisons performed relative to array size
- **Formula**: `10 - (average_comparisons / array_size²) * 10`
- **Higher is Better**: More efficient algorithms get higher scores
- **Real-time**: Updates based on actual algorithm execution

#### Space Score (0-10)
- **Based on**: Number of swaps/memory operations relative to array size
- **Formula**: `10 - (average_swaps / array_size²) * 5`
- **Higher is Better**: Fewer memory operations = higher score
- **Real-time**: Reflects actual memory efficiency

#### Overall Score (0-10)
- **Formula**: `(Time Score + Space Score) / 2`
- **Dynamic**: Changes based on actual performance data
- **Meaningful Sorting**: Sort functionality now works with real performance metrics

### Algorithm Properties (Static Characteristics)

#### Stability
- **Stable (✅)**: Maintains relative order of equal elements
- **Unstable (❌)**: May change relative order of equal elements
- **Examples**: Bubble Sort (stable), Quick Sort (unstable)

#### In-Place Memory Usage
- **In-Place (✅)**: Uses O(1) additional memory
- **Not In-Place (❌)**: Requires O(n) or more additional memory  
- **Examples**: Quick Sort (in-place), Merge Sort (not in-place)

## 📊 Supported Algorithms

This project helps you understand:

- **Algorithm Analysis**: Time and space complexity
- **Visual Learning**: See how algorithms behave step-by-step
- **Performance Comparison**: Compare different approaches
- **Interactive Education**: Hands-on learning experience

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

### Phase 1: Sorting Algorithms ✅
- [x] Basic sorting algorithms implementation
- [x] Interactive visualization
- [x] Performance metrics
- [x] Responsive design

### Phase 2: Pathfinding (In Progress) 🔄
- [ ] Grid-based pathfinding visualization
- [ ] Dijkstra's Algorithm
- [ ] A* Search
- [ ] BFS and DFS
- [ ] Interactive maze creation

### Phase 3: Data Structures 📅
- [ ] Stack operations
- [ ] Queue operations  
- [ ] Binary tree traversals
- [ ] Hash table operations
- [ ] Graph representations

### Phase 4: Advanced Features 🎯
- [ ] Algorithm comparison mode
- [ ] Custom input support
- [ ] Performance analytics dashboard
- [ ] Educational content integration

## 🐛 Known Issues

- Some Tailwind utility classes may show warnings during build (cosmetic only)
- Mobile responsiveness can be improved for very small screens

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Raj Roy (devKiNGCRiC)**
- GitHub: [@devKiNGCRiC](https://github.com/devKiNGCRiC)
- LinkedIn: [raj-roy-kc2806](https://www.linkedin.com/in/raj-roy-kc2806/)
- Twitter: [@KiNGCRiC28](https://x.com/KiNGCRiC28)
- Live Demo: [https://algovisualizer-pro.vercel.app](https://algovisualizer-pro.vercel.app)
- Repository: [https://github.com/devKiNGCRiC/dsa-interactive-visualizer](https://github.com/devKiNGCRiC/dsa-interactive-visualizer)

## 🙏 Acknowledgments

- Inspired by algorithm visualization tools and educational platforms
- Built with modern React ecosystem and best practices
- Special thanks to the open-source community for the amazing tools

---

**⭐ Star this repository if you found it helpful!**
