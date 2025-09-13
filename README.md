# DSA Interactive Visualizer

An interactive web application for learning and visualizing data structures and algorithms. Built with modern web technologies including React, TypeScript, and Tailwind CSS.

![DSA Visualizer](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-blue) ![Vite](https://img.shields.io/badge/Vite-7.0-green)

## 🚀 Features

### ✅ Sorting Algorithms (Available)
- **Bubble Sort** - Simple comparison-based algorithm
- **Selection Sort** - Finds minimum element repeatedly
- **Insertion Sort** - Builds sorted array one element at a time
- **Merge Sort** - Divide and conquer approach
- **Quick Sort** - Efficient partitioning algorithm

**Interactive Features:**
- ⚡ Real-time visualization with smooth animations
- 🎛️ Adjustable speed controls (1-500%)
- 📊 Performance metrics (comparisons & swaps)
- 🔀 Random array generation
- 📏 Customizable array size (5-100 elements)
- 🎨 Color-coded element states (comparing, swapping, sorted)

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
   git clone https://github.com/devKiNGCRiC/dsa-visualizer.git
   cd dsa-visualizer
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

## 🎯 Learning Objectives

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

**devKiNGCRiC**
- GitHub: [@devKiNGCRiC](https://github.com/devKiNGCRiC)
- Project Link: [https://github.com/devKiNGCRiC/dsa-visualizer](https://github.com/devKiNGCRiC/dsa-visualizer)

## 🙏 Acknowledgments

- Inspired by algorithm visualization tools and educational platforms
- Built with modern React ecosystem and best practices
- Special thanks to the open-source community for the amazing tools

---

**⭐ Star this repository if you found it helpful!**
