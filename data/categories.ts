import type { Category } from "./types.ts";

/**
 * The 18 canonical interview patterns, in recommended study order.
 * Order and colors are mirrored in the web UI and the docs.
 */
export const categories: Category[] = [
  {
    slug: "arrays-hashing",
    name: "Arrays & Hashing",
    order: 1,
    icon: "🔢",
    color: "#6366f1",
    blurb: "Trade space for time with hash maps and sets.",
    description:
      "The foundation of almost everything else. Use hash maps/sets to turn O(n²) scans into O(n) lookups, count frequencies, and detect duplicates.",
    keyIdeas: [
      "Hash map for O(1) lookup of seen values",
      "Frequency counting",
      "Prefix sums for range queries",
      "Encode/group by a canonical key",
    ],
  },
  {
    slug: "two-pointers",
    name: "Two Pointers",
    order: 2,
    icon: "↔️",
    color: "#8b5cf6",
    blurb: "Converge two indices on sorted or symmetric data.",
    description:
      "Move two indices toward or with each other to avoid nested loops. Ideal for sorted arrays, palindromes, and pair-sum problems.",
    keyIdeas: [
      "Opposite ends converging inward",
      "Fast/slow pointers",
      "Sort first, then scan",
      "Skip duplicates to dedupe results",
    ],
  },
  {
    slug: "sliding-window",
    name: "Sliding Window",
    order: 3,
    icon: "🪟",
    color: "#a855f7",
    blurb: "Maintain a moving range over a sequence.",
    description:
      "Grow and shrink a contiguous window to track a running condition (sum, distinct chars, etc.) in a single pass.",
    keyIdeas: [
      "Expand right, contract left",
      "Track window state with a hash map",
      "Fixed vs variable window size",
      "Best/longest/shortest substring problems",
    ],
  },
  {
    slug: "stack",
    name: "Stack",
    order: 4,
    icon: "📚",
    color: "#ec4899",
    blurb: "LIFO structure for nesting and 'next greater'.",
    description:
      "Use a stack for matching pairs, evaluating expressions, and monotonic-stack problems like next-greater-element.",
    keyIdeas: [
      "Matching brackets / nesting",
      "Monotonic stack",
      "Defer work until you can resolve it",
      "Simulate recursion iteratively",
    ],
  },
  {
    slug: "binary-search",
    name: "Binary Search",
    order: 5,
    icon: "🔍",
    color: "#f43f5e",
    blurb: "Halve the search space each step.",
    description:
      "Apply to sorted arrays and, more powerfully, to monotonic answer spaces ('binary search on the answer').",
    keyIdeas: [
      "lo/hi/mid template",
      "Search on the answer",
      "Find boundary (first/last true)",
      "Avoid overflow with lo + (hi-lo)/2",
    ],
  },
  {
    slug: "linked-list",
    name: "Linked List",
    order: 6,
    icon: "🔗",
    color: "#ef4444",
    blurb: "Pointer surgery without random access.",
    description:
      "Reverse, merge, detect cycles, and reorder nodes using dummy heads and fast/slow pointers.",
    keyIdeas: [
      "Dummy head node",
      "Fast/slow for cycle & midpoint",
      "In-place reversal",
      "Careful pointer reassignment order",
    ],
  },
  {
    slug: "trees",
    name: "Trees",
    order: 7,
    icon: "🌳",
    color: "#22c55e",
    blurb: "Recursion over hierarchical data.",
    description:
      "DFS and BFS traversals, BST invariants, and divide-and-conquer over subtrees power a huge fraction of interviews.",
    keyIdeas: [
      "DFS (pre/in/post-order)",
      "BFS level-order",
      "BST ordering property",
      "Return values bubble up from children",
    ],
  },
  {
    slug: "tries",
    name: "Tries",
    order: 8,
    icon: "🔤",
    color: "#10b981",
    blurb: "Prefix trees for fast string lookup.",
    description:
      "Store words by character path for prefix search, autocomplete, and word-dictionary problems.",
    keyIdeas: [
      "Node-per-character children map",
      "isEnd flag for word boundaries",
      "Prefix vs full-word search",
      "DFS with wildcards",
    ],
  },
  {
    slug: "heap-priority-queue",
    name: "Heap / Priority Queue",
    order: 9,
    icon: "⛰️",
    color: "#14b8a6",
    blurb: "Always-on access to the min or max.",
    description:
      "Keep the top-k, merge k streams, or repeatedly pull the smallest/largest in O(log n).",
    keyIdeas: [
      "Min-heap vs max-heap",
      "Top-K with a size-k heap",
      "Merge k sorted lists",
      "Two heaps for running median",
    ],
  },
  {
    slug: "backtracking",
    name: "Backtracking",
    order: 10,
    icon: "🎯",
    color: "#06b6d4",
    blurb: "Explore choices, undo, and try again.",
    description:
      "Systematically build candidates and abandon ones that can't lead to a solution. Subsets, permutations, combinations, and constraint puzzles.",
    keyIdeas: [
      "Choose → explore → un-choose",
      "Prune invalid branches early",
      "Track used elements / start index",
      "Decision tree recursion",
    ],
  },
  {
    slug: "graphs",
    name: "Graphs",
    order: 11,
    icon: "🕸️",
    color: "#3b82f6",
    blurb: "Nodes, edges, traversal, and connectivity.",
    description:
      "Model grids and networks; traverse with BFS/DFS; detect components, cycles, and topological order.",
    keyIdeas: [
      "Adjacency list / matrix / grid",
      "BFS for shortest unweighted path",
      "DFS for components & cycles",
      "Topological sort (Kahn's / DFS)",
    ],
  },
  {
    slug: "advanced-graphs",
    name: "Advanced Graphs",
    order: 12,
    icon: "🧭",
    color: "#0ea5e9",
    blurb: "Weighted shortest paths and MSTs.",
    description:
      "Dijkstra, Bellman-Ford, Union-Find, and minimum spanning trees for weighted and dynamic connectivity problems.",
    keyIdeas: [
      "Dijkstra with a min-heap",
      "Union-Find (DSU) with path compression",
      "Minimum spanning tree (Prim/Kruskal)",
      "Bellman-Ford for negative edges",
    ],
  },
  {
    slug: "dp-1d",
    name: "1-D Dynamic Programming",
    order: 13,
    icon: "📈",
    color: "#f59e0b",
    blurb: "Optimal substructure over one axis.",
    description:
      "Build answers from smaller subproblems along a single dimension: climbing stairs, house robber, LIS, coin change.",
    keyIdeas: [
      "Define dp[i] precisely",
      "Recurrence from prior states",
      "Top-down memo vs bottom-up table",
      "Roll the array to O(1) space",
    ],
  },
  {
    slug: "dp-2d",
    name: "2-D Dynamic Programming",
    order: 14,
    icon: "🧮",
    color: "#f97316",
    blurb: "Grids and two-sequence subproblems.",
    description:
      "Tabulate over two dimensions: edit distance, LCS, knapsack, and unique grid paths.",
    keyIdeas: [
      "dp[i][j] over two sequences/axes",
      "Fill order & base row/column",
      "Compare match vs skip transitions",
      "Compress rows when possible",
    ],
  },
  {
    slug: "greedy",
    name: "Greedy",
    order: 15,
    icon: "💰",
    color: "#eab308",
    blurb: "Local optimal choices that prove global.",
    description:
      "Make the best immediate choice when an exchange argument guarantees optimality: jump game, intervals, Kadane's.",
    keyIdeas: [
      "Prove the greedy choice is safe",
      "Sort to expose the choice",
      "Maintain a running best",
      "Exchange argument intuition",
    ],
  },
  {
    slug: "intervals",
    name: "Intervals",
    order: 16,
    icon: "📅",
    color: "#84cc16",
    blurb: "Sort, merge, and schedule ranges.",
    description:
      "Overlap detection, merging, and scheduling problems almost always start by sorting on start or end.",
    keyIdeas: [
      "Sort by start (or end)",
      "Merge when current.start <= prev.end",
      "Sweep line / min-heap of ends",
      "Count overlaps",
    ],
  },
  {
    slug: "math-geometry",
    name: "Math & Geometry",
    order: 17,
    icon: "📐",
    color: "#64748b",
    blurb: "Number theory and grid manipulation.",
    description:
      "Matrix rotation, spiral traversal, GCD/modular arithmetic, and overflow-safe number handling.",
    keyIdeas: [
      "In-place matrix transforms",
      "Modular arithmetic",
      "Coordinate math",
      "Edge cases & overflow",
    ],
  },
  {
    slug: "bit-manipulation",
    name: "Bit Manipulation",
    order: 18,
    icon: "🔟",
    color: "#94a3b8",
    blurb: "Think in bits for speed and tricks.",
    description:
      "XOR tricks, masks, and bit counting solve uniqueness, subsets, and arithmetic-without-operators problems.",
    keyIdeas: [
      "XOR cancels equal pairs",
      "n & (n-1) drops the lowest set bit",
      "Masking and shifting",
      "Bitmask to represent subsets",
    ],
  },
];

export const categoryBySlug: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);

export const categorySlugs = categories.map((c) => c.slug);
