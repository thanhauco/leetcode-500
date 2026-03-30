import type { Problem } from "../types.ts";

/**
 * Batch Q — graphs, advanced-graphs, and dynamic programming.
 * Every record ships working Python + TypeScript plus a runnable runner + tests.
 */
export const batchQ: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Graphs
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1162,
    slug: "as-far-from-land-as-possible",
    title: "As Far from Land as Possible",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["BFS", "Multi-source BFS", "Grid"],
    companies: ["amazon", "google", "uber", "bloomberg"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/as-far-from-land-as-possible/",
    description:
      "Given an `n × n` grid of land (1) and water (0) cells, find the water cell whose nearest land is the farthest away and return that Manhattan distance, or -1 if the grid is all land or all water.",
    examples: [
      {
        input: "grid = [[1,0,1],[0,0,0],[1,0,1]]",
        output: "2",
        explanation: "The center cell (1,1) is two steps from every land corner.",
      },
      {
        input: "grid = [[1,0,0],[0,0,0],[0,0,0]]",
        output: "4",
        explanation: "Cell (2,2) is four steps from the only land cell.",
      },
    ],
    constraints: ["n == grid.length == grid[i].length", "1 ≤ n ≤ 100", "grid[i][j] is 0 or 1."],
    intuition:
      "Rather than running a search from each water cell, push every land cell into one queue and expand all of them outward simultaneously. Because each ring of a multi-source BFS represents one extra unit of distance, the very last water cell reached carries the maximum distance to any land.",
    approach: [
      "Clone the grid so repeated runs see a fresh board.",
      "Seed a queue with all land cells at distance 0.",
      "If there are no land cells or no water cells, return -1.",
      "Run BFS, marking each newly reached water cell as land; track the latest distance assigned.",
      "Return that last distance, which is the farthest any water cell sits from land.",
    ],
    complexity: { time: "O(n^2)", space: "O(n^2)", note: "Each cell is enqueued at most once." },
    solutions: [
      {
        language: "python",
        label: "Multi-source BFS",
        code: `from collections import deque


def max_distance(grid: list[list[int]]) -> int:
    n, m = len(grid), len(grid[0])
    grid = [row[:] for row in grid]
    q = deque()
    for r in range(n):
        for c in range(m):
            if grid[r][c] == 1:
                q.append((r, c, 0))
    if not q or len(q) == n * m:
        return -1
    ans = 0
    while q:
        r, c, d = q.popleft()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < m and grid[nr][nc] == 0:
                grid[nr][nc] = 1
                ans = d + 1
                q.append((nr, nc, d + 1))
    return ans`,
      },
      {
        language: "typescript",
        label: "Multi-source BFS",
        code: `function maxDistance(input: number[][]): number {
  const n = input.length, m = input[0].length;
  const grid = input.map((row) => row.slice());
  const q: [number, number, number][] = [];
  for (let r = 0; r < n; r++)
    for (let c = 0; c < m; c++)
      if (grid[r][c] === 1) q.push([r, c, 0]);
  if (q.length === 0 || q.length === n * m) return -1;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let ans = 0, head = 0;
  while (head < q.length) {
    const [r, c, d] = q[head++];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === 0) {
        grid[nr][nc] = 1;
        ans = d + 1;
        q.push([nr, nc, d + 1]);
      }
    }
  }
  return ans;
}`,
      },
    ],
    runner: {
      entry: "maxDistance",
      comparison: "deep",
      jsStarter: `function maxDistance(grid) {
  // grid is an n x n array of 0/1. Return the farthest water-to-land distance.
  // TODO: implement
}`,
      jsReference: `function maxDistance(input) {
  const n = input.length, m = input[0].length;
  const grid = input.map((row) => row.slice());
  const q = [];
  for (let r = 0; r < n; r++)
    for (let c = 0; c < m; c++)
      if (grid[r][c] === 1) q.push([r, c, 0]);
  if (q.length === 0 || q.length === n * m) return -1;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let ans = 0, head = 0;
  while (head < q.length) {
    const [r, c, d] = q[head++];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === 0) {
        grid[nr][nc] = 1;
        ans = d + 1;
        q.push([nr, nc, d + 1]);
      }
    }
  }
  return ans;
}`,
    },
    tests: [
      { name: "symmetric corners", args: [[[1, 0, 1], [0, 0, 0], [1, 0, 1]]], expected: 2 },
      { name: "single land", args: [[[1, 0, 0], [0, 0, 0], [0, 0, 0]]], expected: 4 },
      { name: "all land", args: [[[1, 1], [1, 1]]], expected: -1 },
      { name: "all water", args: [[[0, 0], [0, 0]]], expected: -1 },
    ],
    hints: ["Search from land, not from water.", "Each BFS ring adds one unit of distance."],
    relatedIds: [542, 994],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Advanced Graphs
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 990,
    slug: "satisfiability-of-equality-equations",
    title: "Satisfiability of Equality Equations",
    difficulty: "Medium",
    category: "advanced-graphs",
    patterns: ["Union-Find", "Disjoint Set"],
    companies: ["meta", "amazon", "google"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/satisfiability-of-equality-equations/",
    description:
      "Given equations of the form `\"a==b\"` or `\"a!=b\"` over single-letter variables, decide whether some assignment of integers can satisfy all of them simultaneously.",
    examples: [
      { input: 'equations = ["a==b","b!=a"]', output: "false", explanation: "a and b cannot be both equal and unequal." },
      { input: 'equations = ["b==a","a==b"]', output: "true" },
    ],
    constraints: ["1 ≤ equations.length ≤ 500", "Each equation has length 4 and uses lowercase letters."],
    intuition:
      "Equality is transitive, so all variables joined by `==` must end up in the same group. Process every equality first to build those groups with union-find, then verify that no `!=` constraint asks for two variables in the same group to differ.",
    approach: [
      "Create a union-find keyed by the 26 lowercase letters.",
      "First pass: for every `==` equation, union the two variables.",
      "Second pass: for every `!=` equation, if the two variables share a root, the system is contradictory.",
      "If no contradiction is found, return true.",
    ],
    complexity: { time: "O(n·α(26))", space: "O(1)", note: "At most 26 disjoint-set nodes." },
    solutions: [
      {
        language: "python",
        label: "Union-Find",
        code: `def equations_possible(equations: list[str]) -> bool:
    parent = {chr(c): chr(c) for c in range(ord("a"), ord("z") + 1)}

    def find(x: str) -> str:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for eq in equations:
        if eq[1] == "=":
            parent[find(eq[0])] = find(eq[3])
    for eq in equations:
        if eq[1] == "!" and find(eq[0]) == find(eq[3]):
            return False
    return True`,
      },
      {
        language: "typescript",
        label: "Union-Find",
        code: `function equationsPossible(equations: string[]): boolean {
  const parent: Record<string, string> = {};
  const find = (x: string): string => {
    if (parent[x] === undefined) parent[x] = x;
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  for (const eq of equations)
    if (eq[1] === "=") parent[find(eq[0])] = find(eq[3]);
  for (const eq of equations)
    if (eq[1] === "!" && find(eq[0]) === find(eq[3])) return false;
  return true;
}`,
      },
    ],
    runner: {
      entry: "equationsPossible",
      comparison: "deep",
      jsStarter: `function equationsPossible(equations) {
  // Each string is "x==y" or "x!=y". Return whether all can hold at once.
  // TODO: implement
}`,
      jsReference: `function equationsPossible(equations) {
  const parent = {};
  const find = (x) => {
    if (parent[x] === undefined) parent[x] = x;
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  for (const eq of equations)
    if (eq[1] === "=") parent[find(eq[0])] = find(eq[3]);
  for (const eq of equations)
    if (eq[1] === "!" && find(eq[0]) === find(eq[3])) return false;
  return true;
}`,
    },
    tests: [
      { name: "direct contradiction", args: [["a==b", "b!=a"]], expected: false },
      { name: "consistent equality", args: [["b==a", "a==b"]], expected: true },
      { name: "transitive contradiction", args: [["a==b", "b==c", "c!=a"]], expected: false },
      { name: "disjoint groups", args: [["a==b", "c==d", "b!=c"]], expected: true },
    ],
    hints: ["Union all equalities first.", "Then check each inequality against the groups."],
    relatedIds: [547, 684],
  },
  {
    id: 947,
    slug: "most-stones-removed-with-same-row-or-column",
    title: "Most Stones Removed with Same Row or Column",
    difficulty: "Medium",
    category: "advanced-graphs",
    patterns: ["Union-Find", "Connected Components"],
    companies: ["amazon", "google", "bloomberg", "uber"],
    frequency: 47,
    leetcodeUrl: "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/",
    description:
      "Stones sit on an infinite grid, one per coordinate. A stone may be removed if it shares its row or column with another remaining stone. Return the maximum number of stones that can be removed.",
    examples: [
      { input: "stones = [[0,0],[0,1],[1,0],[1,1],[2,1],[2,2]]", output: "5" },
      { input: "stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]", output: "3" },
    ],
    constraints: ["1 ≤ stones.length ≤ 1000", "0 ≤ x, y ≤ 10^4", "No two stones share the same coordinate."],
    intuition:
      "Stones connected through shared rows or columns form a component, and within any component you can keep removing until a single stone remains. So the most you can remove is the total number of stones minus the number of connected components — union rows with columns to count those components.",
    approach: [
      "Treat each distinct row label and column label as union-find nodes.",
      "For every stone at (r, c), union node `row r` with node `col c`.",
      "Count the distinct roots reachable from the stones — that is the component count.",
      "Return stones.length minus the number of components.",
    ],
    complexity: { time: "O(n·α(n))", space: "O(n)", note: "n stones, each one union operation." },
    solutions: [
      {
        language: "python",
        label: "Union-Find",
        code: `def remove_stones(stones: list[list[int]]) -> int:
    parent: dict[str, str] = {}

    def find(x: str) -> str:
        parent.setdefault(x, x)
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for r, c in stones:
        parent[find(f"r{r}")] = find(f"c{c}")
    roots = {find(f"r{r}") for r, _ in stones}
    return len(stones) - len(roots)`,
      },
      {
        language: "typescript",
        label: "Union-Find",
        code: `function removeStones(stones: number[][]): number {
  const parent: Record<string, string> = {};
  const find = (x: string): string => {
    if (parent[x] === undefined) parent[x] = x;
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  for (const [r, c] of stones) parent[find("r" + r)] = find("c" + c);
  const roots = new Set<string>();
  for (const [r] of stones) roots.add(find("r" + r));
  return stones.length - roots.size;
}`,
      },
    ],
    runner: {
      entry: "removeStones",
      comparison: "deep",
      jsStarter: `function removeStones(stones) {
  // stones is an array of [row, col]. Return the max removable count.
  // TODO: implement
}`,
      jsReference: `function removeStones(stones) {
  const parent = {};
  const find = (x) => {
    if (parent[x] === undefined) parent[x] = x;
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  for (const [r, c] of stones) parent[find("r" + r)] = find("c" + c);
  const roots = new Set();
  for (const [r] of stones) roots.add(find("r" + r));
  return stones.length - roots.size;
}`,
    },
    tests: [
      { name: "one component", args: [[[0, 0], [0, 1], [1, 0], [1, 1], [2, 1], [2, 2]]], expected: 5 },
      { name: "two components", args: [[[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]]], expected: 3 },
      { name: "single stone", args: [[[0, 0]]], expected: 0 },
      { name: "L shape", args: [[[0, 0], [0, 1], [1, 1]]], expected: 2 },
    ],
    hints: ["Removable count = stones − components.", "Union row labels with column labels."],
    relatedIds: [200, 695],
  },
  {
    id: 778,
    slug: "swim-in-rising-water",
    title: "Swim in Rising Water",
    difficulty: "Hard",
    category: "advanced-graphs",
    patterns: ["Dijkstra", "Min-Heap", "Grid"],
    companies: ["google", "amazon", "nvidia"],
    frequency: 44,
    leetcodeUrl: "https://leetcode.com/problems/swim-in-rising-water/",
    description:
      "In an `n × n` grid `grid[r][c]` is the elevation at that cell. At time t, you may stand on any cell with elevation at most t and move between 4-directionally adjacent cells instantly. Return the earliest time you can reach the bottom-right corner from the top-left.",
    examples: [
      { input: "grid = [[0,2],[1,3]]", output: "3", explanation: "You must wait until time 3 to step onto the elevation-3 corner." },
      {
        input: "grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]",
        output: "16",
      },
    ],
    constraints: ["n == grid.length == grid[i].length", "1 ≤ n ≤ 50", "Each elevation is a distinct value in [0, n^2)."],
    intuition:
      "The cost of a path is the maximum elevation along it, and you want to minimize that maximum. This is a shortest-path problem under a min-max metric, so a Dijkstra-style search using a min-heap keyed by the largest elevation seen so far reaches the destination with the smallest possible peak.",
    approach: [
      "Push the start cell with its own elevation into a min-heap and mark it visited.",
      "Repeatedly pop the cell with the smallest elevation-so-far, updating the running answer with that value.",
      "When the bottom-right cell is popped, the running answer is the earliest arrival time.",
      "Otherwise push each unvisited neighbor keyed by its elevation and continue.",
    ],
    complexity: { time: "O(n^2 log n)", space: "O(n^2)", note: "Heap holds up to n^2 cells." },
    solutions: [
      {
        language: "python",
        label: "Dijkstra",
        code: `import heapq


def swim_in_water(grid: list[list[int]]) -> int:
    n = len(grid)
    seen = [[False] * n for _ in range(n)]
    heap = [(grid[0][0], 0, 0)]
    seen[0][0] = True
    ans = 0
    while heap:
        t, r, c = heapq.heappop(heap)
        ans = max(ans, t)
        if r == n - 1 and c == n - 1:
            return ans
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and not seen[nr][nc]:
                seen[nr][nc] = True
                heapq.heappush(heap, (grid[nr][nc], nr, nc))
    return ans`,
      },
      {
        language: "typescript",
        label: "Dijkstra",
        code: `function swimInWater(grid: number[][]): number {
  const n = grid.length;
  const seen = Array.from({ length: n }, () => new Array<boolean>(n).fill(false));
  const heap: [number, number, number][] = [[grid[0][0], 0, 0]];
  const up = (i: number) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]]; i = p;
    }
  };
  const down = () => {
    let i = 0;
    for (;;) {
      let s = i; const l = 2 * i + 1, r = 2 * i + 2;
      if (l < heap.length && heap[l][0] < heap[s][0]) s = l;
      if (r < heap.length && heap[r][0] < heap[s][0]) s = r;
      if (s === i) break;
      [heap[s], heap[i]] = [heap[i], heap[s]]; i = s;
    }
  };
  seen[0][0] = true;
  let ans = 0;
  while (heap.length) {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) { heap[0] = last; down(); }
    const [t, r, c] = top;
    ans = Math.max(ans, t);
    if (r === n - 1 && c === n - 1) return ans;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !seen[nr][nc]) {
        seen[nr][nc] = true;
        heap.push([grid[nr][nc], nr, nc]); up(heap.length - 1);
      }
    }
  }
  return ans;
}`,
      },
    ],
    runner: {
      entry: "swimInWater",
      comparison: "deep",
      jsStarter: `function swimInWater(grid) {
  // grid[r][c] is an elevation. Return the earliest time to reach the corner.
  // TODO: implement
}`,
      jsReference: `function swimInWater(grid) {
  const n = grid.length;
  const seen = Array.from({ length: n }, () => new Array(n).fill(false));
  const heap = [[grid[0][0], 0, 0]];
  const up = (i) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]]; i = p;
    }
  };
  const down = () => {
    let i = 0;
    for (;;) {
      let s = i; const l = 2 * i + 1, r = 2 * i + 2;
      if (l < heap.length && heap[l][0] < heap[s][0]) s = l;
      if (r < heap.length && heap[r][0] < heap[s][0]) s = r;
      if (s === i) break;
      [heap[s], heap[i]] = [heap[i], heap[s]]; i = s;
    }
  };
  seen[0][0] = true;
  let ans = 0;
  while (heap.length) {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) { heap[0] = last; down(); }
    const [t, r, c] = top;
    ans = Math.max(ans, t);
    if (r === n - 1 && c === n - 1) return ans;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !seen[nr][nc]) {
        seen[nr][nc] = true;
        heap.push([grid[nr][nc], nr, nc]); up(heap.length - 1);
      }
    }
  }
  return ans;
}`,
    },
    tests: [
      { name: "two by two", args: [[[0, 2], [1, 3]]], expected: 3 },
      {
        name: "spiral",
        args: [[[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]],
        expected: 16,
      },
      { name: "high start", args: [[[3, 2], [0, 1]]], expected: 3 },
      { name: "single cell", args: [[[0]]], expected: 0 },
    ],
    hints: ["Minimize the maximum elevation on a path.", "Dijkstra with a min-heap keyed by peak elevation."],
    relatedIds: [1631, 743],
  },
  {
    id: 1192,
    slug: "critical-connections-in-a-network",
    title: "Critical Connections in a Network",
    difficulty: "Hard",
    category: "advanced-graphs",
    patterns: ["Tarjan", "Bridges", "DFS"],
    companies: ["amazon", "google", "meta", "databricks"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/critical-connections-in-a-network/",
    description:
      "A network of `n` servers (0..n-1) is connected by undirected links. A connection is critical if removing it disconnects some servers from the rest. Return every critical connection (a bridge).",
    examples: [
      { input: "n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]", output: "[[1,3]]", explanation: "The triangle 0-1-2 has redundancy; only link 1-3 is critical." },
      { input: "n = 2, connections = [[0,1]]", output: "[[0,1]]" },
    ],
    constraints: ["2 ≤ n ≤ 10^5", "n-1 ≤ connections.length ≤ 10^5", "No duplicate connections."],
    intuition:
      "A bridge is an edge that no cycle covers. Tarjan's DFS assigns each node a discovery time and a low-link value (the earliest node reachable without reusing the edge to its parent). Edge (u, v) is a bridge exactly when v's subtree cannot climb back to u or earlier, i.e. low[v] > disc[u].",
    approach: [
      "Build an adjacency list from the connections.",
      "Run a DFS that stamps each node with an increasing discovery time and a low-link value.",
      "On returning from a child v of u, set low[u] = min(low[u], low[v]); if low[v] > disc[u], record edge (u, v) as a bridge.",
      "Normalize each recorded edge to ascending order and return the collected bridges.",
    ],
    complexity: { time: "O(n + e)", space: "O(n + e)", note: "Single DFS over the graph." },
    solutions: [
      {
        language: "python",
        label: "Tarjan Bridges",
        code: `import sys


def critical_connections(n: int, connections: list[list[int]]) -> list[list[int]]:
    sys.setrecursionlimit(300000)
    graph: list[list[int]] = [[] for _ in range(n)]
    for a, b in connections:
        graph[a].append(b)
        graph[b].append(a)
    disc = [-1] * n
    low = [0] * n
    bridges: list[list[int]] = []
    timer = 0

    def dfs(u: int, parent: int) -> None:
        nonlocal timer
        disc[u] = low[u] = timer
        timer += 1
        for v in graph[u]:
            if v == parent:
                continue
            if disc[v] == -1:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > disc[u]:
                    bridges.append([min(u, v), max(u, v)])
            else:
                low[u] = min(low[u], disc[v])

    for i in range(n):
        if disc[i] == -1:
            dfs(i, -1)
    return bridges`,
      },
      {
        language: "typescript",
        label: "Tarjan Bridges",
        code: `function criticalConnections(n: number, connections: number[][]): number[][] {
  const graph: number[][] = Array.from({ length: n }, () => []);
  for (const [a, b] of connections) { graph[a].push(b); graph[b].push(a); }
  const disc = new Array<number>(n).fill(-1);
  const low = new Array<number>(n).fill(0);
  const bridges: number[][] = [];
  let timer = 0;
  const dfs = (u: number, parent: number): void => {
    disc[u] = low[u] = timer++;
    for (const v of graph[u]) {
      if (v === parent) continue;
      if (disc[v] === -1) {
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] > disc[u]) bridges.push([Math.min(u, v), Math.max(u, v)]);
      } else {
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  };
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
  return bridges;
}`,
      },
    ],
    runner: {
      entry: "criticalConnections",
      comparison: "canonical",
      jsStarter: `function criticalConnections(n, connections) {
  // Return every bridge edge as [u, v] with u < v, in any order.
  // TODO: implement
}`,
      jsReference: `function criticalConnections(n, connections) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b] of connections) { graph[a].push(b); graph[b].push(a); }
  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(0);
  const bridges = [];
  let timer = 0;
  const dfs = (u, parent) => {
    disc[u] = low[u] = timer++;
    for (const v of graph[u]) {
      if (v === parent) continue;
      if (disc[v] === -1) {
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] > disc[u]) bridges.push([Math.min(u, v), Math.max(u, v)]);
      } else {
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  };
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
  return bridges;
}`,
    },
    tests: [
      { name: "triangle plus tail", args: [4, [[0, 1], [1, 2], [2, 0], [1, 3]]], expected: [[1, 3]] },
      { name: "single edge", args: [2, [[0, 1]]], expected: [[0, 1]] },
      { name: "two cycles joined", args: [6, [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4], [4, 5], [5, 3]]], expected: [[1, 3]] },
      { name: "path all bridges", args: [4, [[0, 1], [1, 2], [2, 3]]], expected: [[0, 1], [1, 2], [2, 3]] },
    ],
    hints: ["A bridge belongs to no cycle.", "Compare a child's low-link to the parent's discovery time."],
    relatedIds: [1568, 947],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // DP — 1D
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1137,
    slug: "n-th-tribonacci-number",
    title: "N-th Tribonacci Number",
    difficulty: "Easy",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Rolling Variables"],
    companies: ["amazon", "adobe"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/n-th-tribonacci-number/",
    description:
      "The Tribonacci sequence starts T0 = 0, T1 = 1, T2 = 1, and each later term is the sum of the previous three. Return Tn.",
    examples: [
      { input: "n = 4", output: "4", explanation: "T3 = 2 and T4 = 1 + 1 + 2 = 4." },
      { input: "n = 25", output: "1389537" },
    ],
    constraints: ["0 ≤ n ≤ 37"],
    intuition:
      "Each term depends only on the three before it, so there is no need for an array — keep three rolling variables and slide the window forward n times.",
    approach: [
      "Handle the base cases n = 0, 1, 2 directly.",
      "Initialize a, b, c = T0, T1, T2.",
      "Repeatedly compute the next term a + b + c and shift the triple forward.",
      "After reaching index n, the last computed value is the answer.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Three rolling variables." },
    solutions: [
      {
        language: "python",
        label: "Rolling DP",
        code: `def tribonacci(n: int) -> int:
    if n == 0:
        return 0
    if n <= 2:
        return 1
    a, b, c = 0, 1, 1
    for _ in range(3, n + 1):
        a, b, c = b, c, a + b + c
    return c`,
      },
      {
        language: "typescript",
        label: "Rolling DP",
        code: `function tribonacci(n: number): number {
  if (n === 0) return 0;
  if (n <= 2) return 1;
  let a = 0, b = 1, c = 1;
  for (let i = 3; i <= n; i++) {
    const next = a + b + c;
    a = b; b = c; c = next;
  }
  return c;
}`,
      },
    ],
    runner: {
      entry: "tribonacci",
      comparison: "deep",
      jsStarter: `function tribonacci(n) {
  // Return the n-th Tribonacci number.
  // TODO: implement
}`,
      jsReference: `function tribonacci(n) {
  if (n === 0) return 0;
  if (n <= 2) return 1;
  let a = 0, b = 1, c = 1;
  for (let i = 3; i <= n; i++) {
    const next = a + b + c;
    a = b; b = c; c = next;
  }
  return c;
}`,
    },
    tests: [
      { name: "small", args: [4], expected: 4 },
      { name: "large", args: [25], expected: 1389537 },
      { name: "zero", args: [0], expected: 0 },
      { name: "base two", args: [2], expected: 1 },
    ],
    hints: ["Only the last three terms matter.", "Slide a window of three variables."],
    relatedIds: [70, 509],
  },
  {
    id: 96,
    slug: "unique-binary-search-trees",
    title: "Unique Binary Search Trees",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Catalan Numbers"],
    companies: ["amazon", "google", "adobe", "bloomberg"],
    frequency: 46,
    leetcodeUrl: "https://leetcode.com/problems/unique-binary-search-trees/",
    description:
      "Count the number of structurally distinct binary search trees that store the values 1 through n exactly once each.",
    examples: [
      { input: "n = 3", output: "5" },
      { input: "n = 1", output: "1" },
    ],
    constraints: ["1 ≤ n ≤ 19"],
    intuition:
      "Fix which value is the root: if value i is the root, the i-1 smaller values form the left subtree and the n-i larger values form the right subtree, independently. Summing the product of the counts over every choice of root yields the n-th Catalan number.",
    approach: [
      "Let dp[k] be the number of BSTs over k nodes, with dp[0] = 1.",
      "For each k from 1 to n, sum dp[i-1] * dp[k-i] over all roots i in 1..k.",
      "dp[n] is the answer.",
    ],
    complexity: { time: "O(n^2)", space: "O(n)", note: "Catalan recurrence." },
    solutions: [
      {
        language: "python",
        label: "DP / Catalan",
        code: `def num_trees(n: int) -> int:
    dp = [0] * (n + 1)
    dp[0] = 1
    for k in range(1, n + 1):
        for i in range(1, k + 1):
            dp[k] += dp[i - 1] * dp[k - i]
    return dp[n]`,
      },
      {
        language: "typescript",
        label: "DP / Catalan",
        code: `function numTrees(n: number): number {
  const dp = new Array<number>(n + 1).fill(0);
  dp[0] = 1;
  for (let k = 1; k <= n; k++)
    for (let i = 1; i <= k; i++)
      dp[k] += dp[i - 1] * dp[k - i];
  return dp[n];
}`,
      },
    ],
    runner: {
      entry: "numTrees",
      comparison: "deep",
      jsStarter: `function numTrees(n) {
  // Return how many distinct BSTs store values 1..n.
  // TODO: implement
}`,
      jsReference: `function numTrees(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  for (let k = 1; k <= n; k++)
    for (let i = 1; i <= k; i++)
      dp[k] += dp[i - 1] * dp[k - i];
  return dp[n];
}`,
    },
    tests: [
      { name: "three", args: [3], expected: 5 },
      { name: "one", args: [1], expected: 1 },
      { name: "four", args: [4], expected: 14 },
      { name: "five", args: [5], expected: 42 },
    ],
    hints: ["Pick each value as the root.", "Left and right subtree counts multiply."],
    relatedIds: [95, 241],
  },
  {
    id: 279,
    slug: "perfect-squares",
    title: "Perfect Squares",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Unbounded Knapsack"],
    companies: ["amazon", "google", "meta", "microsoft"],
    frequency: 53,
    leetcodeUrl: "https://leetcode.com/problems/perfect-squares/",
    description:
      "Given an integer n, return the least number of perfect-square numbers (1, 4, 9, 16, …) that sum exactly to n.",
    examples: [
      { input: "n = 12", output: "3", explanation: "12 = 4 + 4 + 4." },
      { input: "n = 13", output: "2", explanation: "13 = 4 + 9." },
    ],
    constraints: ["1 ≤ n ≤ 10^4"],
    intuition:
      "Treat each perfect square as a coin you may use unlimited times and find the fewest coins that total n. dp[x] is the best for amount x, built from dp[x - s*s] + 1 over all squares s*s ≤ x.",
    approach: [
      "Create dp of size n+1 with dp[0] = 0 and the rest set to infinity.",
      "For each amount x from 1 to n, try every square s*s ≤ x and take dp[x - s*s] + 1.",
      "Keep the minimum for dp[x].",
      "Return dp[n].",
    ],
    complexity: { time: "O(n·√n)", space: "O(n)", note: "Each amount tries O(√n) squares." },
    solutions: [
      {
        language: "python",
        label: "DP",
        code: `def num_squares(n: int) -> int:
    dp = [0] + [float("inf")] * n
    for x in range(1, n + 1):
        s = 1
        while s * s <= x:
            dp[x] = min(dp[x], dp[x - s * s] + 1)
            s += 1
    return int(dp[n])`,
      },
      {
        language: "typescript",
        label: "DP",
        code: `function numSquares(n: number): number {
  const dp = new Array<number>(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let x = 1; x <= n; x++)
    for (let s = 1; s * s <= x; s++)
      dp[x] = Math.min(dp[x], dp[x - s * s] + 1);
  return dp[n];
}`,
      },
    ],
    runner: {
      entry: "numSquares",
      comparison: "deep",
      jsStarter: `function numSquares(n) {
  // Return the fewest perfect squares that sum to n.
  // TODO: implement
}`,
      jsReference: `function numSquares(n) {
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let x = 1; x <= n; x++)
    for (let s = 1; s * s <= x; s++)
      dp[x] = Math.min(dp[x], dp[x - s * s] + 1);
  return dp[n];
}`,
    },
    tests: [
      { name: "twelve", args: [12], expected: 3 },
      { name: "thirteen", args: [13], expected: 2 },
      { name: "one", args: [1], expected: 1 },
      { name: "perfect square", args: [4], expected: 1 },
    ],
    hints: ["Unbounded coins where coins are squares.", "dp[x] from dp[x - s*s] + 1."],
    relatedIds: [322, 377],
  },
  {
    id: 343,
    slug: "integer-break",
    title: "Integer Break",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Math"],
    companies: ["amazon", "google"],
    frequency: 38,
    leetcodeUrl: "https://leetcode.com/problems/integer-break/",
    description:
      "Given an integer n, break it into a sum of at least two positive integers and maximize the product of those parts. Return that maximum product.",
    examples: [
      { input: "n = 2", output: "1", explanation: "2 = 1 + 1, product 1." },
      { input: "n = 10", output: "36", explanation: "10 = 3 + 3 + 4, product 36." },
    ],
    constraints: ["2 ≤ n ≤ 58"],
    intuition:
      "Let dp[x] be the best product achievable from x. For each x, the first part j (from 1 up to x-1) is either left whole (j * (x-j)) or itself broken further (j * dp[x-j]); take the maximum over all splits.",
    approach: [
      "Set dp[1] = 1.",
      "For each x from 2 to n, and each first part j in 1..x-1, consider j*(x-j) and j*dp[x-j].",
      "Store the largest of those in dp[x].",
      "Return dp[n].",
    ],
    complexity: { time: "O(n^2)", space: "O(n)", note: "Quadratic split enumeration." },
    solutions: [
      {
        language: "python",
        label: "DP",
        code: `def integer_break(n: int) -> int:
    dp = [0] * (n + 1)
    dp[1] = 1
    for x in range(2, n + 1):
        for j in range(1, x):
            dp[x] = max(dp[x], j * (x - j), j * dp[x - j])
    return dp[n]`,
      },
      {
        language: "typescript",
        label: "DP",
        code: `function integerBreak(n: number): number {
  const dp = new Array<number>(n + 1).fill(0);
  dp[1] = 1;
  for (let x = 2; x <= n; x++)
    for (let j = 1; j < x; j++)
      dp[x] = Math.max(dp[x], j * (x - j), j * dp[x - j]);
  return dp[n];
}`,
      },
    ],
    runner: {
      entry: "integerBreak",
      comparison: "deep",
      jsStarter: `function integerBreak(n) {
  // Break n into >= 2 parts to maximize their product.
  // TODO: implement
}`,
      jsReference: `function integerBreak(n) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  for (let x = 2; x <= n; x++)
    for (let j = 1; j < x; j++)
      dp[x] = Math.max(dp[x], j * (x - j), j * dp[x - j]);
  return dp[n];
}`,
    },
    tests: [
      { name: "two", args: [2], expected: 1 },
      { name: "ten", args: [10], expected: 36 },
      { name: "eight", args: [8], expected: 18 },
      { name: "four", args: [4], expected: 4 },
    ],
    hints: ["Each part is kept whole or broken further.", "Prefer factors of 3."],
    relatedIds: [96, 264],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // DP — 2D
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 516,
    slug: "longest-palindromic-subsequence",
    title: "Longest Palindromic Subsequence",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Interval DP"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 51,
    leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-subsequence/",
    description:
      "Given a string s, return the length of its longest subsequence that reads the same forward and backward.",
    examples: [
      { input: 's = "bbbab"', output: "4", explanation: '"bbbb" is the longest palindromic subsequence.' },
      { input: 's = "cbbd"', output: "2", explanation: '"bb" is the longest.' },
    ],
    constraints: ["1 ≤ s.length ≤ 1000", "s consists of lowercase English letters."],
    intuition:
      "Consider the substring from i to j. If the two ends match, they extend the best palindrome of the inside by two; otherwise the answer is the better of dropping either end. Filling this table for widening intervals gives the answer for the whole string.",
    approach: [
      "Let dp[i][j] be the longest palindromic subsequence within s[i..j].",
      "Every single character is a palindrome of length 1 (dp[i][i] = 1).",
      "Process intervals from short to long: if s[i] == s[j], dp[i][j] = dp[i+1][j-1] + 2, else max(dp[i+1][j], dp[i][j-1]).",
      "Return dp[0][n-1].",
    ],
    complexity: { time: "O(n^2)", space: "O(n^2)", note: "Interval DP over all substrings." },
    solutions: [
      {
        language: "python",
        label: "Interval DP",
        code: `def longest_palindrome_subseq(s: str) -> int:
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    for i in range(n - 1, -1, -1):
        dp[i][i] = 1
        for j in range(i + 1, n):
            if s[i] == s[j]:
                dp[i][j] = dp[i + 1][j - 1] + 2
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
    return dp[0][n - 1]`,
      },
      {
        language: "typescript",
        label: "Interval DP",
        code: `function longestPalindromeSubseq(s: string): number {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array<number>(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) dp[i][j] = dp[i + 1][j - 1] + 2;
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
    }
  }
  return dp[0][n - 1];
}`,
      },
    ],
    runner: {
      entry: "longestPalindromeSubseq",
      comparison: "deep",
      jsStarter: `function longestPalindromeSubseq(s) {
  // Return the length of the longest palindromic subsequence of s.
  // TODO: implement
}`,
      jsReference: `function longestPalindromeSubseq(s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) dp[i][j] = dp[i + 1][j - 1] + 2;
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
    }
  }
  return dp[0][n - 1];
}`,
    },
    tests: [
      { name: "bbbab", args: ["bbbab"], expected: 4 },
      { name: "cbbd", args: ["cbbd"], expected: 2 },
      { name: "single", args: ["a"], expected: 1 },
      { name: "embedded palindrome", args: ["agbdba"], expected: 5 },
    ],
    hints: ["Match the two ends or drop one.", "Fill intervals from short to long."],
    relatedIds: [5, 1143],
  },
];

export default batchQ;
