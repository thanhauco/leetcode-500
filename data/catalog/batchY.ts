import type { Problem } from "../types.ts";

/**
 * Batch Y — graphs, dp, greedy, intervals, heap, and linked-list coverage.
 * Every entry ships Python + TypeScript references plus a runnable playground
 * spec whose `jsReference` (named exactly `runner.entry`) passes all `tests`.
 */
export const batchY: Problem[] = [
  // ── Graphs ────────────────────────────────────────────────────────────────
  {
    id: 433,
    slug: "minimum-genetic-mutation",
    title: "Minimum Genetic Mutation",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["BFS", "Shortest Path"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/minimum-genetic-mutation/",
    description:
      "A gene is an 8-character string over {A, C, G, T}. One mutation flips a single character. Return the fewest mutations to turn the start gene into the end gene, where every intermediate gene must appear in the allowed bank, or -1 if impossible.",
    examples: [
      { input: 'start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]', output: "1" },
      {
        input: 'start = "AACCGGTT", end = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]',
        output: "2",
      },
    ],
    intuition:
      "Each valid gene is a node; an edge connects two genes that differ by exactly one allowed character. Because every mutation costs the same, breadth-first search from the start gene finds the minimum number of steps to reach the end gene.",
    approach: [
      "Put the bank into a set for O(1) membership checks; if end is absent, return -1.",
      "BFS level by level from the start gene, tracking visited genes.",
      "From each gene, try every position and every other base; enqueue mutations that are in the bank and unseen.",
      "Return the level on which end is dequeued, else -1.",
    ],
    complexity: { time: "O(B · L · 4)", space: "O(B)", note: "B = bank size, L = gene length (8)." },
    solutions: [
      {
        language: "python",
        label: "BFS",
        code: `from collections import deque

def min_mutation(start: str, end: str, bank: list[str]) -> int:
    valid = set(bank)
    if end not in valid:
        return -1
    queue = deque([(start, 0)])
    seen = {start}
    while queue:
        gene, steps = queue.popleft()
        if gene == end:
            return steps
        for i in range(len(gene)):
            for ch in "ACGT":
                if ch == gene[i]:
                    continue
                mut = gene[:i] + ch + gene[i + 1:]
                if mut in valid and mut not in seen:
                    seen.add(mut)
                    queue.append((mut, steps + 1))
    return -1`,
      },
      {
        language: "typescript",
        label: "BFS",
        code: `function minMutation(start: string, end: string, bank: string[]): number {
  const valid = new Set(bank);
  if (!valid.has(end)) return -1;
  let queue: string[] = [start];
  const seen = new Set([start]);
  let steps = 0;
  while (queue.length) {
    const next: string[] = [];
    for (const gene of queue) {
      if (gene === end) return steps;
      for (let i = 0; i < gene.length; i++) {
        for (const ch of "ACGT") {
          if (ch === gene[i]) continue;
          const mut = gene.slice(0, i) + ch + gene.slice(i + 1);
          if (valid.has(mut) && !seen.has(mut)) {
            seen.add(mut);
            next.push(mut);
          }
        }
      }
    }
    queue = next;
    steps++;
  }
  return -1;
}`,
      },
    ],
    runner: {
      entry: "minMutation",
      comparison: "deep",
      jsStarter: `function minMutation(start, end, bank) {
  // Return the fewest single-character mutations from start to end through bank, or -1.
  // TODO: implement
}`,
      jsReference: `function minMutation(start, end, bank) {
  const valid = new Set(bank);
  if (!valid.has(end)) return -1;
  let queue = [start];
  const seen = new Set([start]);
  let steps = 0;
  while (queue.length) {
    const next = [];
    for (const gene of queue) {
      if (gene === end) return steps;
      for (let i = 0; i < gene.length; i++) {
        for (const ch of "ACGT") {
          if (ch === gene[i]) continue;
          const mut = gene.slice(0, i) + ch + gene.slice(i + 1);
          if (valid.has(mut) && !seen.has(mut)) {
            seen.add(mut);
            next.push(mut);
          }
        }
      }
    }
    queue = next;
    steps++;
  }
  return -1;
}`,
    },
    tests: [
      { name: "one step", args: ["AACCGGTT", "AACCGGTA", ["AACCGGTA"]], expected: 1 },
      { name: "two steps", args: ["AACCGGTT", "AAACGGTA", ["AACCGGTA", "AACCGCTA", "AAACGGTA"]], expected: 2 },
      { name: "three steps", args: ["AAAAACCC", "AACCCCCC", ["AAAACCCC", "AAACCCCC", "AACCCCCC"]], expected: 3 },
      { name: "unreachable", args: ["AACCGGTT", "AACCGGTA", []], expected: -1 },
    ],
    relatedIds: [127, 126],
  },
  {
    id: 785,
    slug: "is-graph-bipartite",
    title: "Is Graph Bipartite?",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["BFS", "Graph Coloring"],
    companies: ["amazon", "google", "meta", "bloomberg"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/is-graph-bipartite/",
    description:
      "Given an undirected graph as an adjacency list, decide whether its nodes can be split into two sets so that every edge connects a node from one set to the other. Return true if such a two-coloring exists.",
    examples: [
      { input: "graph = [[1,3],[0,2],[1,3],[0,2]]", output: "true" },
      { input: "graph = [[1,2,3],[0,2],[0,1,3],[0,2]]", output: "false" },
    ],
    intuition:
      "A graph is bipartite exactly when it has no odd-length cycle. Try to two-color it: give a node one color and all its neighbors the opposite color. If you ever need to color two adjacent nodes the same, an odd cycle exists and the graph is not bipartite.",
    approach: [
      "Keep a color array (0 = uncolored, 1 and -1 = the two sides).",
      "For every uncolored node, BFS and color neighbors with the negated color.",
      "If a neighbor already has the same color as the current node, return false.",
      "If all components color cleanly, return true.",
    ],
    complexity: { time: "O(V + E)", space: "O(V)" },
    solutions: [
      {
        language: "python",
        label: "BFS coloring",
        code: `from collections import deque

def is_bipartite(graph: list[list[int]]) -> bool:
    color = [0] * len(graph)
    for start in range(len(graph)):
        if color[start]:
            continue
        color[start] = 1
        queue = deque([start])
        while queue:
            u = queue.popleft()
            for v in graph[u]:
                if color[v] == 0:
                    color[v] = -color[u]
                    queue.append(v)
                elif color[v] == color[u]:
                    return False
    return True`,
      },
      {
        language: "typescript",
        label: "BFS coloring",
        code: `function isBipartite(graph: number[][]): boolean {
  const color = new Array(graph.length).fill(0);
  for (let s = 0; s < graph.length; s++) {
    if (color[s] !== 0) continue;
    color[s] = 1;
    const queue: number[] = [s];
    while (queue.length) {
      const u = queue.shift()!;
      for (const v of graph[u]) {
        if (color[v] === 0) {
          color[v] = -color[u];
          queue.push(v);
        } else if (color[v] === color[u]) {
          return false;
        }
      }
    }
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "isBipartite",
      comparison: "deep",
      jsStarter: `function isBipartite(graph) {
  // Return true if the undirected graph can be two-colored.
  // TODO: implement
}`,
      jsReference: `function isBipartite(graph) {
  const color = new Array(graph.length).fill(0);
  for (let s = 0; s < graph.length; s++) {
    if (color[s] !== 0) continue;
    color[s] = 1;
    const queue = [s];
    while (queue.length) {
      const u = queue.shift();
      for (const v of graph[u]) {
        if (color[v] === 0) {
          color[v] = -color[u];
          queue.push(v);
        } else if (color[v] === color[u]) {
          return false;
        }
      }
    }
  }
  return true;
}`,
    },
    tests: [
      { name: "even cycle", args: [[[1, 3], [0, 2], [1, 3], [0, 2]]], expected: true },
      { name: "triangle", args: [[[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]]], expected: false },
      { name: "single node", args: [[[]]], expected: true },
      { name: "one edge", args: [[[1], [0]]], expected: true },
    ],
    relatedIds: [886, 886],
  },
  {
    id: 886,
    slug: "possible-bipartition",
    title: "Possible Bipartition",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["BFS", "Graph Coloring"],
    companies: ["amazon", "microsoft", "uber"],
    frequency: 47,
    leetcodeUrl: "https://leetcode.com/problems/possible-bipartition/",
    description:
      "There are n people numbered 1..n and a list of dislike pairs. Split everyone into exactly two groups so that no pair of people who dislike each other share a group. Return whether such a split is possible.",
    examples: [
      { input: "n = 4, dislikes = [[1,2],[1,3],[2,4]]", output: "true" },
      { input: "n = 3, dislikes = [[1,2],[1,3],[2,3]]", output: "false" },
    ],
    intuition:
      "Model each person as a node and each dislike as an edge. A valid two-group split is exactly a proper two-coloring, so the answer is yes precisely when the dislike graph is bipartite (contains no odd cycle).",
    approach: [
      "Build an adjacency list over 1..n from the dislike pairs.",
      "Color each uncolored person and BFS, assigning neighbors the opposite color.",
      "If a disliked neighbor already shares the current color, return false.",
      "Return true if all components color consistently.",
    ],
    complexity: { time: "O(n + E)", space: "O(n + E)" },
    solutions: [
      {
        language: "python",
        label: "BFS coloring",
        code: `from collections import deque

def possible_bipartition(n: int, dislikes: list[list[int]]) -> bool:
    adj = [[] for _ in range(n + 1)]
    for a, b in dislikes:
        adj[a].append(b)
        adj[b].append(a)
    color = [0] * (n + 1)
    for s in range(1, n + 1):
        if color[s]:
            continue
        color[s] = 1
        queue = deque([s])
        while queue:
            u = queue.popleft()
            for v in adj[u]:
                if color[v] == 0:
                    color[v] = -color[u]
                    queue.append(v)
                elif color[v] == color[u]:
                    return False
    return True`,
      },
      {
        language: "typescript",
        label: "BFS coloring",
        code: `function possibleBipartition(n: number, dislikes: number[][]): boolean {
  const adj: number[][] = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of dislikes) {
    adj[a].push(b);
    adj[b].push(a);
  }
  const color = new Array(n + 1).fill(0);
  for (let s = 1; s <= n; s++) {
    if (color[s] !== 0) continue;
    color[s] = 1;
    const queue: number[] = [s];
    while (queue.length) {
      const u = queue.shift()!;
      for (const v of adj[u]) {
        if (color[v] === 0) {
          color[v] = -color[u];
          queue.push(v);
        } else if (color[v] === color[u]) {
          return false;
        }
      }
    }
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "possibleBipartition",
      comparison: "deep",
      jsStarter: `function possibleBipartition(n, dislikes) {
  // Return true if the n people can be split into two dislike-free groups.
  // TODO: implement
}`,
      jsReference: `function possibleBipartition(n, dislikes) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of dislikes) {
    adj[a].push(b);
    adj[b].push(a);
  }
  const color = new Array(n + 1).fill(0);
  for (let s = 1; s <= n; s++) {
    if (color[s] !== 0) continue;
    color[s] = 1;
    const queue = [s];
    while (queue.length) {
      const u = queue.shift();
      for (const v of adj[u]) {
        if (color[v] === 0) {
          color[v] = -color[u];
          queue.push(v);
        } else if (color[v] === color[u]) {
          return false;
        }
      }
    }
  }
  return true;
}`,
    },
    tests: [
      { name: "splittable", args: [4, [[1, 2], [1, 3], [2, 4]]], expected: true },
      { name: "triangle", args: [3, [[1, 2], [1, 3], [2, 3]]], expected: false },
      { name: "odd cycle", args: [5, [[1, 2], [2, 3], [3, 4], [4, 5], [1, 5]]], expected: false },
      { name: "two pairs", args: [4, [[1, 2], [3, 4]]], expected: true },
    ],
    relatedIds: [785],
  },
  {
    id: 323,
    slug: "number-of-connected-components-in-an-undirected-graph",
    title: "Number of Connected Components in an Undirected Graph",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["Union-Find", "DFS"],
    companies: ["amazon", "google", "meta", "microsoft"],
    frequency: 55,
    premium: true,
    leetcodeUrl: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
    description:
      "Given n nodes labeled 0..n-1 and an undirected edge list, count how many connected components the graph has. Isolated nodes each count as their own component.",
    examples: [
      { input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2" },
      { input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]", output: "1" },
    ],
    intuition:
      "Start by assuming each node is its own component (n total). Every edge that links two nodes from different components merges them into one, reducing the count by one. Union-Find makes those merges efficient.",
    approach: [
      "Initialize a parent array where each node is its own root and set count = n.",
      "For each edge, find the roots of both endpoints.",
      "If the roots differ, union them and decrement count.",
      "Return the final count.",
    ],
    complexity: { time: "O(n + E · α(n))", space: "O(n)", note: "Near-constant union/find with path compression." },
    solutions: [
      {
        language: "python",
        label: "Union-Find",
        code: `def count_components(n: int, edges: list[list[int]]) -> int:
    parent = list(range(n))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    count = n
    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            count -= 1
    return count`,
      },
      {
        language: "typescript",
        label: "Union-Find",
        code: `function countComponents(n: number, edges: number[][]): number {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  let count = n;
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      count--;
    }
  }
  return count;
}`,
      },
    ],
    runner: {
      entry: "countComponents",
      comparison: "deep",
      jsStarter: `function countComponents(n, edges) {
  // Return the number of connected components.
  // TODO: implement
}`,
      jsReference: `function countComponents(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  let count = n;
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      count--;
    }
  }
  return count;
}`,
    },
    tests: [
      { name: "two components", args: [5, [[0, 1], [1, 2], [3, 4]]], expected: 2 },
      { name: "one chain", args: [5, [[0, 1], [1, 2], [2, 3], [3, 4]]], expected: 1 },
      { name: "all isolated", args: [4, []], expected: 4 },
      { name: "single node", args: [1, []], expected: 1 },
    ],
    relatedIds: [547, 261],
  },

  // ── DP (1D) ───────────────────────────────────────────────────────────────
  {
    id: 413,
    slug: "arithmetic-slices",
    title: "Arithmetic Slices",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming"],
    companies: ["amazon", "bloomberg"],
    frequency: 41,
    leetcodeUrl: "https://leetcode.com/problems/arithmetic-slices/",
    description:
      "Count the number of contiguous subarrays of length at least 3 that form an arithmetic sequence (the difference between consecutive elements is constant).",
    examples: [
      { input: "nums = [1,2,3,4]", output: "3", explanation: "[1,2,3], [2,3,4], and [1,2,3,4]." },
      { input: "nums = [1,3,5,7,9]", output: "6" },
    ],
    intuition:
      "Let cur be the number of arithmetic slices ending exactly at index i. If the current difference matches the previous one, every slice ending at i-1 extends by one and one brand-new length-3 slice appears, so cur grows by one and contributes cur to the total; otherwise cur resets to zero.",
    approach: [
      "Track a running cur (slices ending at the current index) and a total.",
      "Scan from index 2; if nums[i]-nums[i-1] equals nums[i-1]-nums[i-2], increment cur and add it to total.",
      "Otherwise reset cur to 0.",
      "Return total.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Running count",
        code: `def number_of_arithmetic_slices(nums: list[int]) -> int:
    total = cur = 0
    for i in range(2, len(nums)):
        if nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]:
            cur += 1
            total += cur
        else:
            cur = 0
    return total`,
      },
      {
        language: "typescript",
        label: "Running count",
        code: `function numberOfArithmeticSlices(nums: number[]): number {
  let total = 0, cur = 0;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
      cur++;
      total += cur;
    } else {
      cur = 0;
    }
  }
  return total;
}`,
      },
    ],
    runner: {
      entry: "numberOfArithmeticSlices",
      comparison: "deep",
      jsStarter: `function numberOfArithmeticSlices(nums) {
  // Count contiguous arithmetic subarrays of length >= 3.
  // TODO: implement
}`,
      jsReference: `function numberOfArithmeticSlices(nums) {
  let total = 0, cur = 0;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
      cur++;
      total += cur;
    } else {
      cur = 0;
    }
  }
  return total;
}`,
    },
    tests: [
      { name: "length four", args: [[1, 2, 3, 4]], expected: 3 },
      { name: "long run", args: [[1, 3, 5, 7, 9]], expected: 6 },
      { name: "two runs", args: [[1, 2, 3, 8, 9, 10]], expected: 2 },
      { name: "constant", args: [[1, 1, 1]], expected: 1 },
    ],
    relatedIds: [446],
  },
  {
    id: 918,
    slug: "maximum-sum-circular-subarray",
    title: "Maximum Sum Circular Subarray",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Kadane", "Dynamic Programming"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 57,
    leetcodeUrl: "https://leetcode.com/problems/maximum-sum-circular-subarray/",
    description:
      "Given a circular integer array, find the maximum possible sum of a non-empty subarray, where the subarray may wrap around from the end of the array back to the beginning.",
    examples: [
      { input: "nums = [1,-2,3,-2]", output: "3" },
      { input: "nums = [5,-3,5]", output: "10", explanation: "Wrap to take the two 5s." },
    ],
    intuition:
      "The best subarray is either a normal (non-wrapping) one — handled by standard Kadane — or a wrapping one. A wrapping maximum equals the total sum minus the minimum non-wrapping subarray. Take the larger of the two, with a guard for the all-negative case where the wrapping formula would pick an empty middle.",
    approach: [
      "Run Kadane to get the maximum non-wrapping subarray sum.",
      "Run inverse Kadane to get the minimum subarray sum and accumulate the total.",
      "If the max is negative, every element is negative; return that max.",
      "Otherwise return max(maxSum, total - minSum).",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Dual Kadane",
        code: `def max_subarray_sum_circular(nums: list[int]) -> int:
    total = 0
    cur_max = max_sum = float("-inf")
    cur_min = min_sum = float("inf")
    cur_max = cur_min = 0
    max_sum, min_sum = float("-inf"), float("inf")
    for x in nums:
        cur_max = max(cur_max + x, x)
        max_sum = max(max_sum, cur_max)
        cur_min = min(cur_min + x, x)
        min_sum = min(min_sum, cur_min)
        total += x
    if max_sum < 0:
        return max_sum
    return max(max_sum, total - min_sum)`,
      },
      {
        language: "typescript",
        label: "Dual Kadane",
        code: `function maxSubarraySumCircular(nums: number[]): number {
  let total = 0;
  let curMax = 0, maxSum = -Infinity;
  let curMin = 0, minSum = Infinity;
  for (const x of nums) {
    curMax = Math.max(curMax + x, x);
    maxSum = Math.max(maxSum, curMax);
    curMin = Math.min(curMin + x, x);
    minSum = Math.min(minSum, curMin);
    total += x;
  }
  return maxSum < 0 ? maxSum : Math.max(maxSum, total - minSum);
}`,
      },
    ],
    runner: {
      entry: "maxSubarraySumCircular",
      comparison: "deep",
      jsStarter: `function maxSubarraySumCircular(nums) {
  // Return the maximum non-empty subarray sum in a circular array.
  // TODO: implement
}`,
      jsReference: `function maxSubarraySumCircular(nums) {
  let total = 0;
  let curMax = 0, maxSum = -Infinity;
  let curMin = 0, minSum = Infinity;
  for (const x of nums) {
    curMax = Math.max(curMax + x, x);
    maxSum = Math.max(maxSum, curMax);
    curMin = Math.min(curMin + x, x);
    minSum = Math.min(minSum, curMin);
    total += x;
  }
  return maxSum < 0 ? maxSum : Math.max(maxSum, total - minSum);
}`,
    },
    tests: [
      { name: "no wrap", args: [[1, -2, 3, -2]], expected: 3 },
      { name: "wrap", args: [[5, -3, 5]], expected: 10 },
      { name: "all negative", args: [[-3, -2, -3]], expected: -2 },
      { name: "mixed", args: [[3, -1, 2, -1]], expected: 4 },
    ],
    relatedIds: [53],
  },
  {
    id: 1014,
    slug: "best-sightseeing-pair",
    title: "Best Sightseeing Pair",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Running Best", "Dynamic Programming"],
    companies: ["amazon", "google"],
    frequency: 38,
    leetcodeUrl: "https://leetcode.com/problems/best-sightseeing-pair/",
    description:
      "Given an array of sightseeing values, the score of a pair (i, j) with i < j is values[i] + values[j] + i - j. Return the maximum score over all valid pairs.",
    examples: [
      { input: "values = [8,1,5,2,6]", output: "11", explanation: "Pair (0,2): 8 + 5 + 0 - 2 = 11." },
      { input: "values = [1,2]", output: "2" },
    ],
    intuition:
      "Rewrite the score as (values[i] + i) + (values[j] - j). As you sweep j from left to right, the first term only depends on earlier indices, so keep the best (values[i] + i) seen so far and pair it with the current (values[j] - j).",
    approach: [
      "Initialize best = values[0] + 0 and ans = -infinity.",
      "For each j from 1, update ans with best + values[j] - j.",
      "Then update best with max(best, values[j] + j).",
      "Return ans.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Running best",
        code: `def max_score_sightseeing_pair(values: list[int]) -> int:
    best = values[0]
    ans = float("-inf")
    for j in range(1, len(values)):
        ans = max(ans, best + values[j] - j)
        best = max(best, values[j] + j)
    return ans`,
      },
      {
        language: "typescript",
        label: "Running best",
        code: `function maxScoreSightseeingPair(values: number[]): number {
  let best = values[0];
  let ans = -Infinity;
  for (let j = 1; j < values.length; j++) {
    ans = Math.max(ans, best + values[j] - j);
    best = Math.max(best, values[j] + j);
  }
  return ans;
}`,
      },
    ],
    runner: {
      entry: "maxScoreSightseeingPair",
      comparison: "deep",
      jsStarter: `function maxScoreSightseeingPair(values) {
  // Return the maximum values[i] + values[j] + i - j for i < j.
  // TODO: implement
}`,
      jsReference: `function maxScoreSightseeingPair(values) {
  let best = values[0];
  let ans = -Infinity;
  for (let j = 1; j < values.length; j++) {
    ans = Math.max(ans, best + values[j] - j);
    best = Math.max(best, values[j] + j);
  }
  return ans;
}`,
    },
    tests: [
      { name: "example", args: [[8, 1, 5, 2, 6]], expected: 11 },
      { name: "pair", args: [[1, 2]], expected: 2 },
      { name: "equal values", args: [[5, 5, 5]], expected: 9 },
      { name: "descending", args: [[10, 4, 8, 2]], expected: 16 },
    ],
    relatedIds: [121],
  },

  // ── DP (2D) ───────────────────────────────────────────────────────────────
  {
    id: 256,
    slug: "paint-house",
    title: "Paint House",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming"],
    companies: ["amazon", "linkedin"],
    frequency: 44,
    premium: true,
    leetcodeUrl: "https://leetcode.com/problems/paint-house/",
    description:
      "A row of houses must each be painted red, green, or blue. costs[i] gives the price of painting house i each color. No two adjacent houses may share a color. Return the minimum total painting cost.",
    examples: [
      { input: "costs = [[17,2,17],[16,16,5],[14,3,19]]", output: "10", explanation: "green + blue + green." },
      { input: "costs = [[7,6,2]]", output: "2" },
    ],
    intuition:
      "Process houses left to right tracking the cheapest total to reach the current house painted each color. Painting the next house a color costs its price plus the best of the two other colors at the previous house, since adjacent houses must differ.",
    approach: [
      "Carry forward three running totals r, g, b for the previous house.",
      "For each next house, the new red total = cost.red + min(prev g, prev b), and similarly for green and blue.",
      "Advance the totals.",
      "Return the minimum of the three final totals (0 for an empty input).",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Rolling DP",
        code: `def min_cost(costs: list[list[int]]) -> int:
    if not costs:
        return 0
    r, g, b = costs[0]
    for cr, cg, cb in costs[1:]:
        r, g, b = cr + min(g, b), cg + min(r, b), cb + min(r, g)
    return min(r, g, b)`,
      },
      {
        language: "typescript",
        label: "Rolling DP",
        code: `function minCost(costs: number[][]): number {
  if (costs.length === 0) return 0;
  let [r, g, b] = costs[0];
  for (let i = 1; i < costs.length; i++) {
    const [cr, cg, cb] = costs[i];
    const nr = cr + Math.min(g, b);
    const ng = cg + Math.min(r, b);
    const nb = cb + Math.min(r, g);
    r = nr; g = ng; b = nb;
  }
  return Math.min(r, g, b);
}`,
      },
    ],
    runner: {
      entry: "minCost",
      comparison: "deep",
      jsStarter: `function minCost(costs) {
  // costs[i] = [red, green, blue]; no two adjacent houses share a color.
  // Return the minimum total cost.
  // TODO: implement
}`,
      jsReference: `function minCost(costs) {
  if (costs.length === 0) return 0;
  let [r, g, b] = costs[0];
  for (let i = 1; i < costs.length; i++) {
    const [cr, cg, cb] = costs[i];
    const nr = cr + Math.min(g, b);
    const ng = cg + Math.min(r, b);
    const nb = cb + Math.min(r, g);
    r = nr; g = ng; b = nb;
  }
  return Math.min(r, g, b);
}`,
    },
    tests: [
      { name: "three houses", args: [[[17, 2, 17], [16, 16, 5], [14, 3, 19]]], expected: 10 },
      { name: "one house", args: [[[7, 6, 2]]], expected: 2 },
      { name: "two houses", args: [[[1, 2, 3], [1, 4, 6]]], expected: 3 },
      { name: "empty", args: [[]], expected: 0 },
    ],
    relatedIds: [265, 276],
  },
  {
    id: 935,
    slug: "knight-dialer",
    title: "Knight Dialer",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming"],
    companies: ["google", "amazon"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/knight-dialer/",
    description:
      "A chess knight stands on a phone keypad and makes n-1 valid knight moves, dialing the digit on each cell it lands on. Count how many distinct phone numbers of length n it can dial, modulo 1e9+7.",
    examples: [
      { input: "n = 1", output: "10" },
      { input: "n = 2", output: "20" },
    ],
    intuition:
      "Let dp[d] be the number of length-k numbers ending on digit d. Each knight move maps a digit to a fixed set of reachable digits, so the next layer accumulates counts from every digit that can jump onto d. Sum the final layer for the answer.",
    approach: [
      "Precompute the knight-move adjacency for each digit 0-9.",
      "Start with dp[d] = 1 for all digits (length-1 numbers).",
      "Repeat n-1 times: build the next dp by adding dp[d] into each reachable digit, modulo 1e9+7.",
      "Return the sum of the final dp modulo 1e9+7.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Constant 10-digit state per step." },
    solutions: [
      {
        language: "python",
        label: "Layered DP",
        code: `def knight_dialer(n: int) -> int:
    MOD = 10 ** 9 + 7
    moves = [[4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
             [], [0, 1, 7], [2, 6], [1, 3], [2, 4]]
    dp = [1] * 10
    for _ in range(n - 1):
        nxt = [0] * 10
        for d in range(10):
            for m in moves[d]:
                nxt[m] = (nxt[m] + dp[d]) % MOD
        dp = nxt
    return sum(dp) % MOD`,
      },
      {
        language: "typescript",
        label: "Layered DP",
        code: `function knightDialer(n: number): number {
  const MOD = 1000000007n;
  const moves: number[][] = [[4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
    [], [0, 1, 7], [2, 6], [1, 3], [2, 4]];
  let dp: bigint[] = new Array(10).fill(1n);
  for (let step = 1; step < n; step++) {
    const next: bigint[] = new Array(10).fill(0n);
    for (let d = 0; d < 10; d++) {
      for (const m of moves[d]) next[m] = (next[m] + dp[d]) % MOD;
    }
    dp = next;
  }
  return Number(dp.reduce((a, b) => (a + b) % MOD, 0n));
}`,
      },
    ],
    runner: {
      entry: "knightDialer",
      comparison: "deep",
      jsStarter: `function knightDialer(n) {
  // Count distinct length-n knight-dialed numbers modulo 1e9+7.
  // TODO: implement
}`,
      jsReference: `function knightDialer(n) {
  const MOD = 1000000007n;
  const moves = [[4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
    [], [0, 1, 7], [2, 6], [1, 3], [2, 4]];
  let dp = new Array(10).fill(1n);
  for (let step = 1; step < n; step++) {
    const next = new Array(10).fill(0n);
    for (let d = 0; d < 10; d++) {
      for (const m of moves[d]) next[m] = (next[m] + dp[d]) % MOD;
    }
    dp = next;
  }
  let sum = 0n;
  for (const v of dp) sum = (sum + v) % MOD;
  return Number(sum);
}`,
    },
    tests: [
      { name: "length one", args: [1], expected: 10 },
      { name: "length two", args: [2], expected: 20 },
      { name: "length three", args: [3], expected: 46 },
      { name: "length four", args: [4], expected: 104 },
    ],
    relatedIds: [576, 688],
  },

  // ── Greedy ────────────────────────────────────────────────────────────────
  {
    id: 1029,
    slug: "two-city-scheduling",
    title: "Two City Scheduling",
    difficulty: "Medium",
    category: "greedy",
    patterns: ["Greedy", "Sorting"],
    companies: ["amazon", "google", "adobe"],
    frequency: 51,
    leetcodeUrl: "https://leetcode.com/problems/two-city-scheduling/",
    description:
      "2n people must be flown for interviews, exactly n to city A and n to city B. costs[i] = [aCost, bCost] gives each person's flight prices. Return the minimum total cost to send half to each city.",
    examples: [
      { input: "costs = [[10,20],[30,200],[400,50],[30,20]]", output: "110" },
      { input: "costs = [[10,20],[30,20]]", output: "30" },
    ],
    intuition:
      "Imagine sending everyone to city A first, then refunding by flipping n of them to city B. The saving from flipping person i is aCost - bCost, so to minimize the total you flip the people with the most negative aCost - bCost — equivalently, sort by aCost - bCost and assign the first half to A and the rest to B.",
    approach: [
      "Sort people by aCost - bCost ascending.",
      "Send the first n (smallest differences favor A) to city A at their aCost.",
      "Send the remaining n to city B at their bCost.",
      "Sum and return.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Sort by difference",
        code: `def two_city_sched_cost(costs: list[list[int]]) -> int:
    costs.sort(key=lambda c: c[0] - c[1])
    n = len(costs) // 2
    total = 0
    for i, (a, b) in enumerate(costs):
        total += a if i < n else b
    return total`,
      },
      {
        language: "typescript",
        label: "Sort by difference",
        code: `function twoCitySchedCost(costs: number[][]): number {
  const sorted = costs.slice().sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));
  const n = sorted.length / 2;
  let total = 0;
  for (let i = 0; i < sorted.length; i++) {
    total += i < n ? sorted[i][0] : sorted[i][1];
  }
  return total;
}`,
      },
    ],
    runner: {
      entry: "twoCitySchedCost",
      comparison: "deep",
      jsStarter: `function twoCitySchedCost(costs) {
  // Send n people to A and n to B for minimum total cost.
  // TODO: implement
}`,
      jsReference: `function twoCitySchedCost(costs) {
  const sorted = costs.slice().sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));
  const n = sorted.length / 2;
  let total = 0;
  for (let i = 0; i < sorted.length; i++) {
    total += i < n ? sorted[i][0] : sorted[i][1];
  }
  return total;
}`,
    },
    tests: [
      { name: "four people", args: [[[10, 20], [30, 200], [400, 50], [30, 20]]], expected: 110 },
      { name: "six people", args: [[[259, 770], [448, 54], [926, 667], [184, 139], [840, 118], [577, 469]]], expected: 1859 },
      { name: "two people", args: [[[10, 20], [30, 20]]], expected: 30 },
    ],
    relatedIds: [1383],
  },
  {
    id: 135,
    slug: "candy",
    title: "Candy",
    difficulty: "Hard",
    category: "greedy",
    patterns: ["Greedy", "Two Passes"],
    companies: ["amazon", "google", "microsoft", "uber"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/candy/",
    description:
      "Children stand in a line with integer ratings. Each child must get at least one candy, and any child with a higher rating than an immediate neighbor must receive more candy than that neighbor. Return the minimum total candies needed.",
    examples: [
      { input: "ratings = [1,0,2]", output: "5", explanation: "Give 2,1,2 candies." },
      { input: "ratings = [1,2,2]", output: "4" },
    ],
    intuition:
      "Two sweeps settle the two directional constraints independently. A left-to-right pass guarantees each child outranks a lower-rated left neighbor; a right-to-left pass does the same for right neighbors, taking the max so both constraints hold at once.",
    approach: [
      "Give every child one candy.",
      "Left to right: if ratings[i] > ratings[i-1], set candy[i] = candy[i-1] + 1.",
      "Right to left: if ratings[i] > ratings[i+1], set candy[i] = max(candy[i], candy[i+1] + 1).",
      "Sum the candies.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Two passes",
        code: `def candy(ratings: list[int]) -> int:
    n = len(ratings)
    candies = [1] * n
    for i in range(1, n):
        if ratings[i] > ratings[i - 1]:
            candies[i] = candies[i - 1] + 1
    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i + 1]:
            candies[i] = max(candies[i], candies[i + 1] + 1)
    return sum(candies)`,
      },
      {
        language: "typescript",
        label: "Two passes",
        code: `function candy(ratings: number[]): number {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
  }
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);
  }
  return candies.reduce((a, b) => a + b, 0);
}`,
      },
    ],
    runner: {
      entry: "candy",
      comparison: "deep",
      jsStarter: `function candy(ratings) {
  // Return the minimum candies satisfying the neighbor rule.
  // TODO: implement
}`,
      jsReference: `function candy(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
  }
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);
  }
  return candies.reduce((a, b) => a + b, 0);
}`,
    },
    tests: [
      { name: "valley", args: [[1, 0, 2]], expected: 5 },
      { name: "plateau", args: [[1, 2, 2]], expected: 4 },
      { name: "peak", args: [[1, 3, 2, 2, 1]], expected: 7 },
      { name: "ascending", args: [[1, 2, 3, 4, 5]], expected: 15 },
    ],
    relatedIds: [42],
  },
  {
    id: 738,
    slug: "monotone-increasing-digits",
    title: "Monotone Increasing Digits",
    difficulty: "Medium",
    category: "greedy",
    patterns: ["Greedy"],
    companies: ["google", "amazon"],
    frequency: 36,
    leetcodeUrl: "https://leetcode.com/problems/monotone-increasing-digits/",
    description:
      "Given an integer n, return the largest integer less than or equal to n whose digits are monotonically non-decreasing from left to right.",
    examples: [
      { input: "n = 10", output: "9" },
      { input: "n = 332", output: "299" },
    ],
    intuition:
      "Scan from the right for the first place where a digit exceeds its right neighbor — that violation must be fixed by dropping that digit by one and maximizing everything after it as nines. Repeating right to left handles cascades like 332 → 329 → 299.",
    approach: [
      "Convert n to a digit array.",
      "Scan from the right; whenever digit[i-1] > digit[i], decrement digit[i-1] and remember position i as the cutoff.",
      "Set every digit from the cutoff onward to 9.",
      "Convert back to an integer.",
    ],
    complexity: { time: "O(d)", space: "O(d)", note: "d = number of digits." },
    solutions: [
      {
        language: "python",
        label: "Greedy from right",
        code: `def monotone_increasing_digits(n: int) -> int:
    d = list(map(int, str(n)))
    mark = len(d)
    for i in range(len(d) - 1, 0, -1):
        if d[i - 1] > d[i]:
            d[i - 1] -= 1
            mark = i
    for i in range(mark, len(d)):
        d[i] = 9
    return int("".join(map(str, d)))`,
      },
      {
        language: "typescript",
        label: "Greedy from right",
        code: `function monotoneIncreasingDigits(n: number): number {
  const d = String(n).split("").map(Number);
  let mark = d.length;
  for (let i = d.length - 1; i > 0; i--) {
    if (d[i - 1] > d[i]) {
      d[i - 1]--;
      mark = i;
    }
  }
  for (let i = mark; i < d.length; i++) d[i] = 9;
  return Number(d.join(""));
}`,
      },
    ],
    runner: {
      entry: "monotoneIncreasingDigits",
      comparison: "deep",
      jsStarter: `function monotoneIncreasingDigits(n) {
  // Return the largest value <= n with non-decreasing digits.
  // TODO: implement
}`,
      jsReference: `function monotoneIncreasingDigits(n) {
  const d = String(n).split("").map(Number);
  let mark = d.length;
  for (let i = d.length - 1; i > 0; i--) {
    if (d[i - 1] > d[i]) {
      d[i - 1]--;
      mark = i;
    }
  }
  for (let i = mark; i < d.length; i++) d[i] = 9;
  return Number(d.join(""));
}`,
    },
    tests: [
      { name: "single drop", args: [10], expected: 9 },
      { name: "already monotone", args: [1234], expected: 1234 },
      { name: "cascade", args: [332], expected: 299 },
      { name: "trailing zero", args: [120], expected: 119 },
    ],
    relatedIds: [402],
  },

  // ── Intervals ─────────────────────────────────────────────────────────────
  {
    id: 646,
    slug: "maximum-length-of-pair-chain",
    title: "Maximum Length of Pair Chain",
    difficulty: "Medium",
    category: "intervals",
    patterns: ["Greedy", "Sorting"],
    companies: ["amazon", "google"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/maximum-length-of-pair-chain/",
    description:
      "Each pair [a, b] satisfies a < b. A pair [c, d] can follow [a, b] in a chain only when b < c. Return the length of the longest chain that can be formed using the given pairs in any order.",
    examples: [
      { input: "pairs = [[1,2],[2,3],[3,4]]", output: "2", explanation: "[1,2] -> [3,4]." },
      { input: "pairs = [[1,2],[7,8],[4,5]]", output: "3" },
    ],
    intuition:
      "This mirrors interval scheduling: to fit as many non-overlapping pairs as possible, always extend the chain with the pair that ends earliest among those that can still be appended. Sorting by second element and greedily picking achieves the optimum.",
    approach: [
      "Sort the pairs by their second value.",
      "Track the end of the last chosen pair (start at -infinity).",
      "Greedily take any pair whose start strictly exceeds that end, updating the end.",
      "Return how many pairs were taken.",
    ],
    complexity: { time: "O(n log n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Greedy by end",
        code: `def find_longest_chain(pairs: list[list[int]]) -> int:
    pairs.sort(key=lambda p: p[1])
    count = 0
    end = float("-inf")
    for a, b in pairs:
        if a > end:
            count += 1
            end = b
    return count`,
      },
      {
        language: "typescript",
        label: "Greedy by end",
        code: `function findLongestChain(pairs: number[][]): number {
  const sorted = pairs.slice().sort((a, b) => a[1] - b[1]);
  let count = 0;
  let end = -Infinity;
  for (const [a, b] of sorted) {
    if (a > end) {
      count++;
      end = b;
    }
  }
  return count;
}`,
      },
    ],
    runner: {
      entry: "findLongestChain",
      comparison: "deep",
      jsStarter: `function findLongestChain(pairs) {
  // Return the longest chain length where each next pair starts after the prior ends.
  // TODO: implement
}`,
      jsReference: `function findLongestChain(pairs) {
  const sorted = pairs.slice().sort((a, b) => a[1] - b[1]);
  let count = 0;
  let end = -Infinity;
  for (const [a, b] of sorted) {
    if (a > end) {
      count++;
      end = b;
    }
  }
  return count;
}`,
    },
    tests: [
      { name: "adjacent", args: [[[1, 2], [2, 3], [3, 4]]], expected: 2 },
      { name: "disjoint", args: [[[1, 2], [7, 8], [4, 5]]], expected: 3 },
      { name: "overlaps", args: [[[5, 24], [15, 25], [27, 40], [50, 60]]], expected: 3 },
      { name: "single", args: [[[1, 2]]], expected: 1 },
    ],
    relatedIds: [435, 300],
  },
  {
    id: 1024,
    slug: "video-stitching",
    title: "Video Stitching",
    difficulty: "Medium",
    category: "intervals",
    patterns: ["Greedy", "Dynamic Programming"],
    companies: ["amazon", "adobe"],
    frequency: 35,
    leetcodeUrl: "https://leetcode.com/problems/video-stitching/",
    description:
      "Given clips [start, end] of a sporting event and a target duration time, return the minimum number of clips needed to cover the whole interval [0, time]. Clips may overlap and be cut. Return -1 if full coverage is impossible.",
    examples: [
      { input: "clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10", output: "3" },
      { input: "clips = [[0,1],[1,2]], time = 5", output: "-1" },
    ],
    intuition:
      "Let dp[i] be the fewest clips covering [0, i]. A clip [s, e] can extend any already-covered point s up to i (for s < i ≤ e), so dp[i] is one more than the best reachable starting point. Filling dp from 1 to time yields the answer at dp[time].",
    approach: [
      "Initialize dp of size time+1 to infinity, with dp[0] = 0.",
      "For each i from 1 to time, scan clips; if s < i ≤ e, relax dp[i] with dp[s] + 1.",
      "If dp[time] is still infinity, return -1.",
      "Otherwise return dp[time].",
    ],
    complexity: { time: "O(time · C)", space: "O(time)", note: "C = number of clips." },
    solutions: [
      {
        language: "python",
        label: "Interval DP",
        code: `def video_stitching(clips: list[list[int]], time: int) -> int:
    INF = float("inf")
    dp = [INF] * (time + 1)
    dp[0] = 0
    for i in range(1, time + 1):
        for s, e in clips:
            if s < i <= e and dp[s] + 1 < dp[i]:
                dp[i] = dp[s] + 1
    return -1 if dp[time] == INF else dp[time]`,
      },
      {
        language: "typescript",
        label: "Interval DP",
        code: `function videoStitching(clips: number[][], time: number): number {
  const dp = new Array(time + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= time; i++) {
    for (const [s, e] of clips) {
      if (s < i && i <= e && dp[s] + 1 < dp[i]) dp[i] = dp[s] + 1;
    }
  }
  return dp[time] === Infinity ? -1 : dp[time];
}`,
      },
    ],
    runner: {
      entry: "videoStitching",
      comparison: "deep",
      jsStarter: `function videoStitching(clips, time) {
  // Return the fewest clips covering [0, time], or -1.
  // TODO: implement
}`,
      jsReference: `function videoStitching(clips, time) {
  const dp = new Array(time + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= time; i++) {
    for (const [s, e] of clips) {
      if (s < i && i <= e && dp[s] + 1 < dp[i]) dp[i] = dp[s] + 1;
    }
  }
  return dp[time] === Infinity ? -1 : dp[time];
}`,
    },
    tests: [
      { name: "coverable", args: [[[0, 2], [4, 6], [8, 10], [1, 9], [1, 5], [5, 9]], 10], expected: 3 },
      { name: "gap", args: [[[0, 1], [1, 2]], 5], expected: -1 },
      { name: "two clips", args: [[[0, 4], [2, 8]], 5], expected: 2 },
    ],
    relatedIds: [45, 1326],
  },

  // ── Heap / Priority Queue ─────────────────────────────────────────────────
  {
    id: 1167,
    slug: "minimum-cost-to-connect-sticks",
    title: "Minimum Cost to Connect Sticks",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Heap", "Greedy"],
    companies: ["amazon", "google"],
    frequency: 43,
    premium: true,
    leetcodeUrl: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/",
    description:
      "You have sticks with positive integer lengths. Connecting two sticks costs the sum of their lengths and produces one combined stick. Return the minimum total cost to connect all sticks into a single stick.",
    examples: [
      { input: "sticks = [2,4,3]", output: "14", explanation: "2+3=5, then 5+4=9; total 14." },
      { input: "sticks = [1,8,3,5]", output: "30" },
    ],
    intuition:
      "Like building a Huffman tree, the shortest sticks get combined most often, so each merge should join the two currently smallest sticks. A min-heap always surfaces those two cheapest pieces.",
    approach: [
      "Heapify all stick lengths.",
      "Repeatedly pop the two smallest, add their sum to the running cost, and push the sum back.",
      "Stop when one stick remains.",
      "Return the accumulated cost.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Min-heap",
        code: `import heapq

def connect_sticks(sticks: list[int]) -> int:
    heap = sticks[:]
    heapq.heapify(heap)
    total = 0
    while len(heap) > 1:
        a = heapq.heappop(heap)
        b = heapq.heappop(heap)
        total += a + b
        heapq.heappush(heap, a + b)
    return total`,
      },
      {
        language: "typescript",
        label: "Min-heap",
        code: `function connectSticks(sticks: number[]): number {
  const heap = sticks.slice();
  let total = 0;
  while (heap.length > 1) {
    heap.sort((a, b) => a - b);
    const a = heap.shift()!;
    const b = heap.shift()!;
    total += a + b;
    heap.push(a + b);
  }
  return total;
}`,
      },
    ],
    runner: {
      entry: "connectSticks",
      comparison: "deep",
      jsStarter: `function connectSticks(sticks) {
  // Return the minimum total cost to connect all sticks.
  // TODO: implement
}`,
      jsReference: `function connectSticks(sticks) {
  const heap = sticks.slice();
  let total = 0;
  while (heap.length > 1) {
    heap.sort((a, b) => a - b);
    const a = heap.shift();
    const b = heap.shift();
    total += a + b;
    heap.push(a + b);
  }
  return total;
}`,
    },
    tests: [
      { name: "three sticks", args: [[2, 4, 3]], expected: 14 },
      { name: "four sticks", args: [[1, 8, 3, 5]], expected: 30 },
      { name: "single stick", args: [[5]], expected: 0 },
      { name: "five sticks", args: [[1, 2, 3, 4, 5]], expected: 33 },
    ],
    relatedIds: [1199],
  },
  {
    id: 1086,
    slug: "high-five",
    title: "High Five",
    difficulty: "Easy",
    category: "heap-priority-queue",
    patterns: ["Heap", "Hash Map"],
    companies: ["amazon", "linkedin"],
    frequency: 33,
    premium: true,
    leetcodeUrl: "https://leetcode.com/problems/high-five/",
    description:
      "Given a list of [studentId, score] records, compute each student's average of their top five scores using integer division. Return the results sorted by student id ascending as [id, average] pairs.",
    examples: [
      {
        input: "items = [[1,91],[1,92],[2,93],[2,97],[1,60],[2,77],[1,65],[1,87],[1,100],[2,100],[2,76]]",
        output: "[[1,87],[2,88]]",
      },
    ],
    intuition:
      "Bucket every score by student, then for each student take the five highest scores and average them with floor division. A per-student max-heap or a simple sort surfaces the top five.",
    approach: [
      "Group scores into a map keyed by student id.",
      "For each id, sort that student's scores descending and keep the top five.",
      "Compute the floor average of those scores.",
      "Emit [id, average] for ids in ascending order.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Group + top 5",
        code: `from collections import defaultdict

def high_five(items: list[list[int]]) -> list[list[int]]:
    scores = defaultdict(list)
    for sid, score in items:
        scores[sid].append(score)
    result = []
    for sid in sorted(scores):
        top = sorted(scores[sid], reverse=True)[:5]
        result.append([sid, sum(top) // len(top)])
    return result`,
      },
      {
        language: "typescript",
        label: "Group + top 5",
        code: `function highFive(items: number[][]): number[][] {
  const map = new Map<number, number[]>();
  for (const [id, score] of items) {
    if (!map.has(id)) map.set(id, []);
    map.get(id)!.push(score);
  }
  const ids = [...map.keys()].sort((a, b) => a - b);
  return ids.map((id) => {
    const top = map.get(id)!.sort((a, b) => b - a).slice(0, 5);
    const avg = Math.floor(top.reduce((a, b) => a + b, 0) / top.length);
    return [id, avg];
  });
}`,
      },
    ],
    runner: {
      entry: "highFive",
      comparison: "deep",
      jsStarter: `function highFive(items) {
  // Return [id, top-5 average] pairs sorted by id ascending.
  // TODO: implement
}`,
      jsReference: `function highFive(items) {
  const map = new Map();
  for (const [id, score] of items) {
    if (!map.has(id)) map.set(id, []);
    map.get(id).push(score);
  }
  const ids = [...map.keys()].sort((a, b) => a - b);
  return ids.map((id) => {
    const top = map.get(id).sort((a, b) => b - a).slice(0, 5);
    const avg = Math.floor(top.reduce((a, b) => a + b, 0) / top.length);
    return [id, avg];
  });
}`,
    },
    tests: [
      {
        name: "two students",
        args: [[[1, 91], [1, 92], [2, 93], [2, 97], [1, 60], [2, 77], [1, 65], [1, 87], [1, 100], [2, 100], [2, 76]]],
        expected: [[1, 87], [2, 88]],
      },
      {
        name: "all perfect",
        args: [[[1, 100], [7, 100], [1, 100], [7, 100], [1, 100], [7, 100], [1, 100], [7, 100], [1, 100], [7, 100]]],
        expected: [[1, 100], [7, 100]],
      },
      { name: "fewer than five", args: [[[1, 84], [1, 72], [1, 38], [1, 90]]], expected: [[1, 71]] },
    ],
    relatedIds: [215],
  },

  // ── Linked List ───────────────────────────────────────────────────────────
  {
    id: 445,
    slug: "add-two-numbers-ii",
    title: "Add Two Numbers II",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Linked List", "Math"],
    companies: ["amazon", "microsoft", "bloomberg", "adobe"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/add-two-numbers-ii/",
    description:
      "Two non-negative integers are stored as linked lists with the most significant digit first. Add them and return the sum as a linked list in the same most-significant-first order. (Playground uses array I/O for the lists.)",
    examples: [
      { input: "l1 = [7,2,4,3], l2 = [5,6,4]", output: "[7,8,0,7]", explanation: "7243 + 564 = 7807." },
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[8,0,7]" },
    ],
    intuition:
      "Addition naturally proceeds from the least significant digit, which sits at the tail. Reverse both digit sequences (or use stacks), add with carry, then reverse the result back to most-significant-first order.",
    approach: [
      "Reverse both digit arrays so the units align at index 0.",
      "Add digit by digit, tracking a carry.",
      "Continue while either list has digits or a carry remains.",
      "Reverse the accumulated digits to restore most-significant-first order.",
    ],
    complexity: { time: "O(m + n)", space: "O(m + n)" },
    solutions: [
      {
        language: "python",
        label: "Reverse + add",
        code: `def add_two_numbers(l1: list[int], l2: list[int]) -> list[int]:
    a, b = l1[::-1], l2[::-1]
    out = []
    carry = 0
    i = 0
    while i < len(a) or i < len(b) or carry:
        total = carry
        if i < len(a):
            total += a[i]
        if i < len(b):
            total += b[i]
        out.append(total % 10)
        carry = total // 10
        i += 1
    return out[::-1]`,
      },
      {
        language: "typescript",
        label: "Reverse + add",
        code: `function addTwoNumbers(l1: number[], l2: number[]): number[] {
  const a = l1.slice().reverse();
  const b = l2.slice().reverse();
  const out: number[] = [];
  let carry = 0;
  for (let i = 0; i < Math.max(a.length, b.length) || carry; i++) {
    const sum = (a[i] ?? 0) + (b[i] ?? 0) + carry;
    out.push(sum % 10);
    carry = Math.floor(sum / 10);
  }
  return out.reverse();
}`,
      },
    ],
    runner: {
      entry: "addTwoNumbers",
      comparison: "deep",
      jsStarter: `function addTwoNumbers(l1, l2) {
  // l1, l2 are digit arrays, most significant first. Return their sum as a digit array.
  // TODO: implement
}`,
      jsReference: `function addTwoNumbers(l1, l2) {
  const a = l1.slice().reverse();
  const b = l2.slice().reverse();
  const out = [];
  let carry = 0;
  for (let i = 0; i < Math.max(a.length, b.length) || carry; i++) {
    const sum = (a[i] ?? 0) + (b[i] ?? 0) + carry;
    out.push(sum % 10);
    carry = Math.floor(sum / 10);
  }
  return out.reverse();
}`,
    },
    tests: [
      { name: "carry chain", args: [[7, 2, 4, 3], [5, 6, 4]], expected: [7, 8, 0, 7] },
      { name: "no leading carry", args: [[2, 4, 3], [5, 6, 4]], expected: [8, 0, 7] },
      { name: "zeros", args: [[0], [0]], expected: [0] },
      { name: "grows a digit", args: [[9, 9], [1]], expected: [1, 0, 0] },
    ],
    relatedIds: [2, 67],
  },
  {
    id: 725,
    slug: "split-linked-list-in-parts",
    title: "Split Linked List in Parts",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Linked List"],
    companies: ["amazon", "adobe"],
    frequency: 34,
    leetcodeUrl: "https://leetcode.com/problems/split-linked-list-in-parts/",
    description:
      "Split a linked list into k consecutive parts whose sizes differ by at most one, with earlier parts no smaller than later parts. Some parts may be empty. (Playground uses array I/O, returning an array of k arrays.)",
    examples: [
      { input: "head = [1,2,3], k = 5", output: "[[1],[2],[3],[],[]]" },
      { input: "head = [1,2,3,4,5,6,7,8,9,10], k = 3", output: "[[1,2,3,4],[5,6,7],[8,9,10]]" },
    ],
    intuition:
      "With n nodes and k parts, every part gets at least floor(n/k) nodes, and the first n mod k parts get one extra. Walking the list and cutting after each computed size produces the required balanced split.",
    approach: [
      "Compute base = floor(n/k) and rem = n mod k.",
      "For each of the k parts, the size is base plus one for the first rem parts.",
      "Slice that many nodes off the front in order.",
      "Collect the k slices (some possibly empty).",
    ],
    complexity: { time: "O(n + k)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Compute sizes",
        code: `def split_list_to_parts(head: list[int], k: int) -> list[list[int]]:
    n = len(head)
    base, rem = divmod(n, k)
    result = []
    idx = 0
    for i in range(k):
        size = base + (1 if i < rem else 0)
        result.append(head[idx:idx + size])
        idx += size
    return result`,
      },
      {
        language: "typescript",
        label: "Compute sizes",
        code: `function splitListToParts(head: number[], k: number): number[][] {
  const n = head.length;
  const base = Math.floor(n / k);
  const rem = n % k;
  const result: number[][] = [];
  let idx = 0;
  for (let i = 0; i < k; i++) {
    const size = base + (i < rem ? 1 : 0);
    result.push(head.slice(idx, idx + size));
    idx += size;
  }
  return result;
}`,
      },
    ],
    runner: {
      entry: "splitListToParts",
      comparison: "deep",
      jsStarter: `function splitListToParts(head, k) {
  // head is the list as an array. Return k balanced parts as an array of arrays.
  // TODO: implement
}`,
      jsReference: `function splitListToParts(head, k) {
  const n = head.length;
  const base = Math.floor(n / k);
  const rem = n % k;
  const result = [];
  let idx = 0;
  for (let i = 0; i < k; i++) {
    const size = base + (i < rem ? 1 : 0);
    result.push(head.slice(idx, idx + size));
    idx += size;
  }
  return result;
}`,
    },
    tests: [
      { name: "more parts than nodes", args: [[1, 2, 3], 5], expected: [[1], [2], [3], [], []] },
      { name: "uneven split", args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3], expected: [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]] },
      { name: "empty list", args: [[], 3], expected: [[], [], []] },
      { name: "even split", args: [[1, 2, 3, 4], 2], expected: [[1, 2], [3, 4]] },
    ],
    relatedIds: [61, 328],
  },
];

export default batchY;
