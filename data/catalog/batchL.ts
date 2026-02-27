import type { Problem } from "../types.ts";

/**
 * Batch L — twenty backtracking, graph, advanced-graph, and dynamic-programming
 * problems. Every record ships working Python + TypeScript solutions and a fully
 * wired playground runner whose JavaScript reference passes the hand-verified
 * tests. Grid problems clone their input before any mutation.
 */
export const batchL: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Backtracking
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 51,
    slug: "n-queens",
    title: "N-Queens",
    difficulty: "Hard",
    category: "backtracking",
    patterns: ["Backtracking", "Constraint Propagation"],
    companies: ["amazon", "google", "microsoft", "apple"],
    frequency: 62,
    leetcodeUrl: "https://leetcode.com/problems/n-queens/",
    description:
      "Place n queens on an n×n board so that no two queens share a row, column, or diagonal. Return every distinct board as a list of strings using 'Q' for a queen and '.' for an empty square.",
    examples: [
      { input: "n = 4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: "n = 1", output: '[["Q"]]' },
    ],
    intuition:
      "Place exactly one queen per row, descending row by row. A column is reusable only if no earlier queen occupies it or either diagonal through it. Track occupied columns and both diagonals in sets so each placement check is O(1), and backtrack whenever a row has no legal square.",
    approach: [
      "Recurse one row at a time; the recursion depth equals the row index.",
      "For each column in the current row, skip it if the column, the '\\' diagonal (row - col), or the '/' diagonal (row + col) is taken.",
      "Mark the square, record 'Q', and recurse into the next row.",
      "When the row index reaches n, snapshot the board as joined strings.",
      "Undo every mark on the way back up to explore other placements.",
    ],
    complexity: { time: "O(n!)", space: "O(n^2)", note: "Branching shrinks by the diagonal/column constraints; board storage is O(n^2)." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def solve_n_queens(n: int) -> list[list[str]]:
    res: list[list[str]] = []
    cols: set[int] = set()
    diag: set[int] = set()   # row - col
    anti: set[int] = set()   # row + col
    board = [["."] * n for _ in range(n)]

    def place(r: int) -> None:
        if r == n:
            res.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r - c) in diag or (r + c) in anti:
                continue
            cols.add(c); diag.add(r - c); anti.add(r + c)
            board[r][c] = "Q"
            place(r + 1)
            board[r][c] = "."
            cols.discard(c); diag.discard(r - c); anti.discard(r + c)

    place(0)
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function solveNQueens(n: number): string[][] {
  const res: string[][] = [];
  const cols = new Set<number>();
  const diag = new Set<number>();
  const anti = new Set<number>();
  const board: string[][] = Array.from({ length: n }, () => Array(n).fill("."));
  const place = (r: number): void => {
    if (r === n) {
      res.push(board.map((row) => row.join("")));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r - c) || anti.has(r + c)) continue;
      cols.add(c); diag.add(r - c); anti.add(r + c);
      board[r][c] = "Q";
      place(r + 1);
      board[r][c] = ".";
      cols.delete(c); diag.delete(r - c); anti.delete(r + c);
    }
  };
  place(0);
  return res;
}`,
      },
    ],
    runner: {
      entry: "solveNQueens",
      comparison: "canonical",
      jsStarter: `function solveNQueens(n) {
  // Return every valid n-queens board as an array of row strings.
  // TODO: implement
}`,
      jsReference: `function solveNQueens(n) {
  const res = [];
  const cols = new Set(), diag = new Set(), anti = new Set();
  const board = Array.from({ length: n }, () => Array(n).fill("."));
  const place = (r) => {
    if (r === n) { res.push(board.map((row) => row.join(""))); return; }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r - c) || anti.has(r + c)) continue;
      cols.add(c); diag.add(r - c); anti.add(r + c);
      board[r][c] = "Q";
      place(r + 1);
      board[r][c] = ".";
      cols.delete(c); diag.delete(r - c); anti.delete(r + c);
    }
  };
  place(0);
  return res;
}`,
    },
    tests: [
      { name: "single queen", args: [1], expected: [["Q"]] },
      { name: "no solution n=2", args: [2], expected: [] },
      { name: "no solution n=3", args: [3], expected: [] },
      {
        name: "two boards n=4",
        args: [4],
        expected: [
          [".Q..", "...Q", "Q...", "..Q."],
          ["..Q.", "Q...", "...Q", ".Q.."],
        ],
      },
    ],
    relatedIds: [52],
  },
  {
    id: 93,
    slug: "restore-ip-addresses",
    title: "Restore IP Addresses",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "String Partition"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 47,
    leetcodeUrl: "https://leetcode.com/problems/restore-ip-addresses/",
    description:
      "Given a string of digits, return every valid IPv4 address that can be formed by inserting three dots. Each of the four parts must be between 0 and 255 and may not carry a leading zero unless it is exactly '0'.",
    examples: [
      { input: 's = "25525511135"', output: '["255.255.11.135","255.255.111.35"]' },
      { input: 's = "0000"', output: '["0.0.0.0"]' },
    ],
    intuition:
      "Walk the string choosing a 1-, 2-, or 3-character chunk for each of the four octets. A chunk is legal when it is a single digit, or has no leading zero and is at most 255. Prune as soon as a chunk is invalid, and only accept a candidate once exactly four octets consume the whole string.",
    approach: [
      "Recurse with the current index and the octets chosen so far.",
      "Try chunk lengths 1 through 3 without running past the end of the string.",
      "Validate each chunk: length one is always fine, otherwise reject leading zeros and values above 255.",
      "Recurse with the next index and the extended octet list.",
      "When four octets are chosen and the index reached the end, join them with dots and record the address.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "At most 3^4 chunk combinations regardless of input length up to 12." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def restore_ip_addresses(s: str) -> list[str]:
    res: list[str] = []
    n = len(s)

    def valid(seg: str) -> bool:
        if len(seg) == 1:
            return True
        return seg[0] != "0" and int(seg) <= 255

    def dfs(start: int, parts: list[str]) -> None:
        if len(parts) == 4:
            if start == n:
                res.append(".".join(parts))
            return
        for length in range(1, 4):
            if start + length > n:
                break
            seg = s[start:start + length]
            if valid(seg):
                dfs(start + length, parts + [seg])

    dfs(0, [])
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function restoreIpAddresses(s: string): string[] {
  const res: string[] = [];
  const n = s.length;
  const valid = (seg: string): boolean =>
    seg.length === 1 || (seg[0] !== "0" && Number(seg) <= 255);
  const dfs = (start: number, parts: string[]): void => {
    if (parts.length === 4) {
      if (start === n) res.push(parts.join("."));
      return;
    }
    for (let len = 1; len <= 3 && start + len <= n; len++) {
      const seg = s.slice(start, start + len);
      if (valid(seg)) dfs(start + len, [...parts, seg]);
    }
  };
  dfs(0, []);
  return res;
}`,
      },
    ],
    runner: {
      entry: "restoreIpAddresses",
      comparison: "canonical",
      jsStarter: `function restoreIpAddresses(s) {
  // Return all valid IPv4 addresses formable from the digit string.
  // TODO: implement
}`,
      jsReference: `function restoreIpAddresses(s) {
  const res = [];
  const n = s.length;
  const valid = (seg) => seg.length === 1 || (seg[0] !== "0" && Number(seg) <= 255);
  const dfs = (start, parts) => {
    if (parts.length === 4) {
      if (start === n) res.push(parts.join("."));
      return;
    }
    for (let len = 1; len <= 3 && start + len <= n; len++) {
      const seg = s.slice(start, start + len);
      if (valid(seg)) dfs(start + len, [...parts, seg]);
    }
  };
  dfs(0, []);
  return res;
}`,
    },
    tests: [
      { name: "two ways", args: ["25525511135"], expected: ["255.255.11.135", "255.255.111.35"] },
      { name: "all zeros", args: ["0000"], expected: ["0.0.0.0"] },
      {
        name: "many splits",
        args: ["101023"],
        expected: ["1.0.10.23", "1.0.102.3", "10.1.0.23", "10.10.2.3", "101.0.2.3"],
      },
      { name: "too short", args: ["1"], expected: [] },
    ],
  },
  {
    id: 216,
    slug: "combination-sum-iii",
    title: "Combination Sum III",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "Combinations"],
    companies: ["amazon", "microsoft", "adobe"],
    frequency: 44,
    leetcodeUrl: "https://leetcode.com/problems/combination-sum-iii/",
    description:
      "Find every combination of k distinct digits from 1 to 9 that adds up to n. Each digit may appear at most once per combination, and the order of the digits within a combination does not matter.",
    examples: [
      { input: "k = 3, n = 7", output: "[[1,2,4]]" },
      { input: "k = 3, n = 9", output: "[[1,2,6],[1,3,5],[2,3,4]]" },
    ],
    intuition:
      "Because the pool is fixed (1–9) and each value is used at most once, a single forward scan with a start index avoids permutations of the same set. Carry the remaining sum and remaining count; prune the moment the next digit already exceeds what is left to reach.",
    approach: [
      "Recurse with a starting digit, the count still needed, the leftover sum, and the current path.",
      "When the count hits zero, record the path only if the leftover sum is also zero.",
      "Iterate digits from the start value up to 9.",
      "Break early once a digit exceeds the remaining sum, since later digits are larger.",
      "Recurse with the next digit, one fewer slot, and the reduced sum, then pop to backtrack.",
    ],
    complexity: { time: "O(C(9, k))", space: "O(k)", note: "Bounded by the number of k-subsets of nine digits." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def combination_sum3(k: int, n: int) -> list[list[int]]:
    res: list[list[int]] = []

    def dfs(start: int, need: int, remain: int, path: list[int]) -> None:
        if need == 0:
            if remain == 0:
                res.append(path[:])
            return
        for x in range(start, 10):
            if x > remain:
                break
            path.append(x)
            dfs(x + 1, need - 1, remain - x, path)
            path.pop()

    dfs(1, k, n, [])
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function combinationSum3(k: number, n: number): number[][] {
  const res: number[][] = [];
  const dfs = (start: number, need: number, remain: number, path: number[]): void => {
    if (need === 0) {
      if (remain === 0) res.push([...path]);
      return;
    }
    for (let x = start; x <= 9; x++) {
      if (x > remain) break;
      path.push(x);
      dfs(x + 1, need - 1, remain - x, path);
      path.pop();
    }
  };
  dfs(1, k, n, []);
  return res;
}`,
      },
    ],
    runner: {
      entry: "combinationSum3",
      comparison: "canonical",
      jsStarter: `function combinationSum3(k, n) {
  // Return all size-k combinations of digits 1..9 summing to n.
  // TODO: implement
}`,
      jsReference: `function combinationSum3(k, n) {
  const res = [];
  const dfs = (start, need, remain, path) => {
    if (need === 0) {
      if (remain === 0) res.push([...path]);
      return;
    }
    for (let x = start; x <= 9; x++) {
      if (x > remain) break;
      path.push(x);
      dfs(x + 1, need - 1, remain - x, path);
      path.pop();
    }
  };
  dfs(1, k, n, []);
  return res;
}`,
    },
    tests: [
      { name: "single combo", args: [3, 7], expected: [[1, 2, 4]] },
      { name: "three combos", args: [3, 9], expected: [[1, 2, 6], [1, 3, 5], [2, 3, 4]] },
      { name: "impossible", args: [4, 1], expected: [] },
      { name: "pairs", args: [2, 5], expected: [[1, 4], [2, 3]] },
      { name: "unreachable sum", args: [2, 18], expected: [] },
    ],
  },
  {
    id: 698,
    slug: "partition-to-k-equal-sum-subsets",
    title: "Partition to K Equal Sum Subsets",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "Bitmask"],
    companies: ["amazon", "google", "meta", "uber"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/",
    description:
      "Decide whether an array can be split into exactly k non-empty groups whose sums are all equal. Return true if such a partition exists and false otherwise.",
    examples: [
      { input: "nums = [4,3,2,3,5,2,1], k = 4", output: "true", explanation: "Groups (5), (1,4), (2,3), (2,3) each sum to 5." },
      { input: "nums = [1,2,3,4], k = 3", output: "false" },
    ],
    intuition:
      "Each group must total sum/k, so that value must be an integer and no element may exceed it. Fill one bucket at a time: keep adding unused numbers until a bucket reaches the target, then start the next bucket. Sorting descending and skipping a failed first placement prunes most dead ends.",
    approach: [
      "Return false unless the total is divisible by k and the largest element fits the target.",
      "Sort descending so big numbers are committed early.",
      "Track which numbers are used and recurse with the bucket count, current bucket sum, and a start index.",
      "When a bucket reaches the target, recurse to fill the next bucket from index 0.",
      "If adding a number to an empty bucket fails, stop trying further numbers for that bucket — it can never be filled.",
    ],
    complexity: { time: "O(k * 2^n)", space: "O(n)", note: "Memo-free search with strong pruning; depth is the array length." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def can_partition_k_subsets(nums: list[int], k: int) -> bool:
    total = sum(nums)
    if total % k != 0:
        return False
    target = total // k
    nums.sort(reverse=True)
    if nums[0] > target:
        return False
    used = [False] * len(nums)

    def dfs(count: int, bucket: int, start: int) -> bool:
        if count == k:
            return True
        if bucket == target:
            return dfs(count + 1, 0, 0)
        for i in range(start, len(nums)):
            if used[i] or bucket + nums[i] > target:
                continue
            used[i] = True
            if dfs(count, bucket + nums[i], i + 1):
                return True
            used[i] = False
            if bucket == 0:
                break
        return False

    return dfs(0, 0, 0)`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function canPartitionKSubsets(nums: number[], k: number): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % k !== 0) return false;
  const target = total / k;
  nums.sort((a, b) => b - a);
  if (nums[0] > target) return false;
  const used = new Array<boolean>(nums.length).fill(false);
  const dfs = (count: number, bucket: number, start: number): boolean => {
    if (count === k) return true;
    if (bucket === target) return dfs(count + 1, 0, 0);
    for (let i = start; i < nums.length; i++) {
      if (used[i] || bucket + nums[i] > target) continue;
      used[i] = true;
      if (dfs(count, bucket + nums[i], i + 1)) return true;
      used[i] = false;
      if (bucket === 0) break;
    }
    return false;
  };
  return dfs(0, 0, 0);
}`,
      },
    ],
    runner: {
      entry: "canPartitionKSubsets",
      comparison: "deep",
      jsStarter: `function canPartitionKSubsets(nums, k) {
  // Return true if nums splits into k groups of equal sum.
  // TODO: implement
}`,
      jsReference: `function canPartitionKSubsets(nums, k) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % k !== 0) return false;
  const target = total / k;
  nums.sort((a, b) => b - a);
  if (nums[0] > target) return false;
  const used = new Array(nums.length).fill(false);
  const dfs = (count, bucket, start) => {
    if (count === k) return true;
    if (bucket === target) return dfs(count + 1, 0, 0);
    for (let i = start; i < nums.length; i++) {
      if (used[i] || bucket + nums[i] > target) continue;
      used[i] = true;
      if (dfs(count, bucket + nums[i], i + 1)) return true;
      used[i] = false;
      if (bucket === 0) break;
    }
    return false;
  };
  return dfs(0, 0, 0);
}`,
    },
    tests: [
      { name: "four groups", args: [[4, 3, 2, 3, 5, 2, 1], 4], expected: true },
      { name: "indivisible total", args: [[1, 2, 3, 4], 3], expected: false },
      { name: "all equal", args: [[4, 4, 4, 4], 4], expected: true },
      { name: "lonely four", args: [[2, 2, 2, 2, 3, 4, 5], 4], expected: false },
      { name: "two pairs", args: [[1, 1, 1, 1], 2], expected: true },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Graphs
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 210,
    slug: "course-schedule-ii",
    title: "Course Schedule II",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["Topological Sort", "BFS"],
    companies: ["amazon", "google", "meta", "microsoft", "bytedance"],
    frequency: 72,
    leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii/",
    description:
      "Given a number of courses and a list of prerequisite pairs [a, b] meaning b must be taken before a, return an order in which all courses can be finished. Return an empty array if no such order exists.",
    examples: [
      { input: "numCourses = 4, prerequisites = [[1,0],[2,1],[3,2]]", output: "[0,1,2,3]" },
      { input: "numCourses = 2, prerequisites = [[0,1],[1,0]]", output: "[]" },
    ],
    intuition:
      "Model courses as a directed graph where an edge points from a prerequisite to the course that depends on it. Repeatedly take any course with no unmet prerequisites (in-degree zero); removing it frees its dependents. If every course is emitted this way the order is valid; if a cycle blocks progress, no order exists.",
    approach: [
      "Build an adjacency list and an in-degree count from the prerequisite pairs.",
      "Seed a queue with every course whose in-degree is zero.",
      "Pop a course, append it to the order, and decrement the in-degree of each dependent.",
      "Enqueue any dependent whose in-degree drops to zero.",
      "If the produced order covers all courses return it, otherwise return an empty array (a cycle exists).",
    ],
    complexity: { time: "O(V + E)", space: "O(V + E)", note: "Each course and prerequisite edge is processed once." },
    solutions: [
      {
        language: "python",
        label: "Kahn's Algorithm",
        code: `from collections import deque


def find_order(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    indeg = [0] * num_courses
    adj: list[list[int]] = [[] for _ in range(num_courses)]
    for a, b in prerequisites:
        adj[b].append(a)
        indeg[a] += 1

    queue = deque(i for i in range(num_courses) if indeg[i] == 0)
    order: list[int] = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)

    return order if len(order) == num_courses else []`,
      },
      {
        language: "typescript",
        label: "Kahn's Algorithm",
        code: `function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const indeg = new Array<number>(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    indeg[a]++;
  }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
  const order: number[] = [];
  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    order.push(u);
    for (const v of adj[u]) if (--indeg[v] === 0) queue.push(v);
  }
  return order.length === numCourses ? order : [];
}`,
      },
    ],
    runner: {
      entry: "findOrder",
      comparison: "deep",
      jsStarter: `function findOrder(numCourses, prerequisites) {
  // Return a valid course order, or [] if impossible.
  // TODO: implement
}`,
      jsReference: `function findOrder(numCourses, prerequisites) {
  const indeg = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
  const order = [];
  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    order.push(u);
    for (const v of adj[u]) if (--indeg[v] === 0) queue.push(v);
  }
  return order.length === numCourses ? order : [];
}`,
    },
    tests: [
      { name: "linear chain", args: [4, [[1, 0], [2, 1], [3, 2]]], expected: [0, 1, 2, 3] },
      { name: "single dependency", args: [2, [[1, 0]]], expected: [0, 1] },
      { name: "no prerequisites", args: [1, []], expected: [0] },
      { name: "cycle", args: [2, [[0, 1], [1, 0]]], expected: [] },
      { name: "partial chain", args: [3, [[1, 0], [2, 1]]], expected: [0, 1, 2] },
    ],
    relatedIds: [207],
  },
  {
    id: 802,
    slug: "find-eventual-safe-states",
    title: "Find Eventual Safe States",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["DFS", "Cycle Detection", "Graph Coloring"],
    companies: ["amazon", "google", "bytedance"],
    frequency: 41,
    leetcodeUrl: "https://leetcode.com/problems/find-eventual-safe-states/",
    description:
      "In a directed graph, a node is safe if every path leaving it eventually reaches a terminal node (one with no outgoing edges). Return all safe nodes in ascending order.",
    examples: [
      { input: "graph = [[1,2],[2,3],[5],[0],[5],[],[]]", output: "[2,4,5,6]" },
      { input: "graph = [[1],[2],[0]]", output: "[]" },
    ],
    intuition:
      "A node is safe exactly when it can never enter a cycle. Color nodes during DFS: white = unvisited, gray = on the current path, black = proven safe. If DFS revisits a gray node a cycle exists, so the start node is unsafe; a node becomes black only after all its successors are confirmed safe.",
    approach: [
      "Keep a color array: 0 unvisited, 1 visiting (on stack), 2 safe.",
      "Run DFS from each node; a node already colored returns whether it is safe (color 2).",
      "Mark a node visiting, then recurse into every successor.",
      "If any successor is not safe, the node is unsafe and stays out of the result.",
      "If all successors are safe, color the node 2; finally collect every node colored safe in index order.",
    ],
    complexity: { time: "O(V + E)", space: "O(V + E)", note: "Each node and edge is explored once; recursion depth is at most V." },
    solutions: [
      {
        language: "python",
        label: "DFS Coloring",
        code: `def eventual_safe_nodes(graph: list[list[int]]) -> list[int]:
    n = len(graph)
    color = [0] * n  # 0 unvisited, 1 visiting, 2 safe

    def safe(u: int) -> bool:
        if color[u] != 0:
            return color[u] == 2
        color[u] = 1
        for v in graph[u]:
            if not safe(v):
                return False
        color[u] = 2
        return True

    return [i for i in range(n) if safe(i)]`,
      },
      {
        language: "typescript",
        label: "DFS Coloring",
        code: `function eventualSafeNodes(graph: number[][]): number[] {
  const n = graph.length;
  const color = new Array<number>(n).fill(0); // 0 unvisited, 1 visiting, 2 safe
  const safe = (u: number): boolean => {
    if (color[u] !== 0) return color[u] === 2;
    color[u] = 1;
    for (const v of graph[u]) if (!safe(v)) return false;
    color[u] = 2;
    return true;
  };
  const res: number[] = [];
  for (let i = 0; i < n; i++) if (safe(i)) res.push(i);
  return res;
}`,
      },
    ],
    runner: {
      entry: "eventualSafeNodes",
      comparison: "canonical",
      jsStarter: `function eventualSafeNodes(graph) {
  // Return all nodes whose every path ends at a terminal node.
  // TODO: implement
}`,
      jsReference: `function eventualSafeNodes(graph) {
  const n = graph.length;
  const color = new Array(n).fill(0);
  const safe = (u) => {
    if (color[u] !== 0) return color[u] === 2;
    color[u] = 1;
    for (const v of graph[u]) if (!safe(v)) return false;
    color[u] = 2;
    return true;
  };
  const res = [];
  for (let i = 0; i < n; i++) if (safe(i)) res.push(i);
  return res;
}`,
    },
    tests: [
      { name: "mixed graph", args: [[[1, 2], [2, 3], [5], [0], [5], [], []]], expected: [2, 4, 5, 6] },
      { name: "all in cycle", args: [[[1], [2], [0]]], expected: [] },
      { name: "acyclic all safe", args: [[[], [0, 2, 3, 4], [3], [4], []]], expected: [0, 1, 2, 3, 4] },
      { name: "single terminal", args: [[[]]], expected: [0] },
      { name: "chain to terminal", args: [[[1], []]], expected: [0, 1] },
    ],
  },
  {
    id: 841,
    slug: "keys-and-rooms",
    title: "Keys and Rooms",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["DFS", "BFS", "Connectivity"],
    companies: ["amazon", "microsoft", "salesforce"],
    frequency: 43,
    leetcodeUrl: "https://leetcode.com/problems/keys-and-rooms/",
    description:
      "There are n rooms numbered from 0, and each room holds a list of keys to other rooms. Starting unlocked in room 0, determine whether you can eventually enter every room.",
    examples: [
      { input: "rooms = [[1],[2],[3],[]]", output: "true" },
      { input: "rooms = [[1,3],[3,0,1],[2],[0]]", output: "false", explanation: "Room 2 is never reachable." },
    ],
    intuition:
      "This is plain graph reachability from node 0, where a room's keys are its outgoing edges. Do a depth-first or breadth-first walk, collecting every room you can unlock, and check at the end whether the count of visited rooms equals the total number of rooms.",
    approach: [
      "Mark room 0 as visited and push it on a stack.",
      "Pop a room and look at each key it contains.",
      "For any key opening an unvisited room, mark that room visited and push it.",
      "Continue until the stack empties.",
      "Return whether the number of visited rooms equals the total room count.",
    ],
    complexity: { time: "O(V + E)", space: "O(V)", note: "Each room is visited once and every key examined once." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def can_visit_all_rooms(rooms: list[list[int]]) -> bool:
    seen = {0}
    stack = [0]
    while stack:
        room = stack.pop()
        for key in rooms[room]:
            if key not in seen:
                seen.add(key)
                stack.append(key)
    return len(seen) == len(rooms)`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function canVisitAllRooms(rooms: number[][]): boolean {
  const seen = new Set<number>([0]);
  const stack: number[] = [0];
  while (stack.length) {
    const room = stack.pop()!;
    for (const key of rooms[room]) {
      if (!seen.has(key)) {
        seen.add(key);
        stack.push(key);
      }
    }
  }
  return seen.size === rooms.length;
}`,
      },
    ],
    runner: {
      entry: "canVisitAllRooms",
      comparison: "deep",
      jsStarter: `function canVisitAllRooms(rooms) {
  // Return true if every room is reachable starting from room 0.
  // TODO: implement
}`,
      jsReference: `function canVisitAllRooms(rooms) {
  const seen = new Set([0]);
  const stack = [0];
  while (stack.length) {
    const room = stack.pop();
    for (const key of rooms[room]) {
      if (!seen.has(key)) { seen.add(key); stack.push(key); }
    }
  }
  return seen.size === rooms.length;
}`,
    },
    tests: [
      { name: "linear keys", args: [[[1], [2], [3], []]], expected: true },
      { name: "unreachable room", args: [[[1, 3], [3, 0, 1], [2], [0]]], expected: false },
      { name: "single room", args: [[[]]], expected: true },
      { name: "two rooms", args: [[[1], []]], expected: true },
      { name: "jump order", args: [[[2], [], [1]]], expected: true },
    ],
  },
  {
    id: 1971,
    slug: "find-if-path-exists-in-graph",
    title: "Find if Path Exists in Graph",
    difficulty: "Easy",
    category: "graphs",
    patterns: ["Union-Find", "BFS"],
    companies: ["amazon", "microsoft", "oracle"],
    frequency: 39,
    leetcodeUrl: "https://leetcode.com/problems/find-if-path-exists-in-graph/",
    description:
      "Given an undirected graph with n nodes and an edge list, decide whether there is a path connecting a given source node to a destination node. Return true if such a path exists.",
    examples: [
      { input: "n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2", output: "true" },
      { input: "n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5", output: "false" },
    ],
    intuition:
      "Source and destination are connected exactly when they belong to the same connected component. Union-Find merges the endpoints of every edge into shared sets, after which the answer is simply whether source and destination resolve to the same representative root.",
    approach: [
      "Initialize each node as its own parent.",
      "Define find with path compression to return a node's set root.",
      "Union the two endpoints of every edge.",
      "Return whether find(source) equals find(destination).",
    ],
    complexity: { time: "O((V + E) * α(V))", space: "O(V)", note: "Near-constant amortized union/find with path compression." },
    solutions: [
      {
        language: "python",
        label: "Union-Find",
        code: `def valid_path(n: int, edges: list[list[int]], source: int, destination: int) -> bool:
    parent = list(range(n))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in edges:
        parent[find(a)] = find(b)

    return find(source) == find(destination)`,
      },
      {
        language: "typescript",
        label: "Union-Find",
        code: `function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  for (const [a, b] of edges) parent[find(a)] = find(b);
  return find(source) === find(destination);
}`,
      },
    ],
    runner: {
      entry: "validPath",
      comparison: "deep",
      jsStarter: `function validPath(n, edges, source, destination) {
  // Return true if source connects to destination.
  // TODO: implement
}`,
      jsReference: `function validPath(n, edges, source, destination) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  for (const [a, b] of edges) parent[find(a)] = find(b);
  return find(source) === find(destination);
}`,
    },
    tests: [
      { name: "triangle", args: [3, [[0, 1], [1, 2], [2, 0]], 0, 2], expected: true },
      { name: "separate components", args: [6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], 0, 5], expected: false },
      { name: "same node", args: [1, [], 0, 0], expected: true },
      { name: "single edge", args: [2, [[0, 1]], 0, 1], expected: true },
      { name: "disconnected", args: [4, [[0, 1], [2, 3]], 0, 3], expected: false },
    ],
  },
  {
    id: 797,
    slug: "all-paths-from-source-to-target",
    title: "All Paths From Source to Target",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["DFS", "Backtracking"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 46,
    leetcodeUrl: "https://leetcode.com/problems/all-paths-from-source-to-target/",
    description:
      "Given a directed acyclic graph with n nodes where graph[i] lists the nodes reachable from i, return every path that starts at node 0 and ends at node n - 1.",
    examples: [
      { input: "graph = [[1,2],[3],[3],[]]", output: "[[0,1,3],[0,2,3]]" },
      { input: "graph = [[1],[]]", output: "[[0,1]]" },
    ],
    intuition:
      "Because the graph is acyclic, a straightforward DFS that extends the current path along each outgoing edge will never loop. Every time the walk reaches the target node, the accumulated path is a complete answer; backtrack by popping the last node before trying the next branch.",
    approach: [
      "Start a DFS at node 0 with the path containing only 0.",
      "If the current node is n - 1, record a copy of the path.",
      "Otherwise, for each neighbor, append it, recurse, then pop it to backtrack.",
      "Collect every recorded path as the result.",
    ],
    complexity: { time: "O(2^n * n)", space: "O(n)", note: "Exponentially many paths possible; each costs O(n) to copy." },
    solutions: [
      {
        language: "python",
        label: "DFS Backtracking",
        code: `def all_paths_source_target(graph: list[list[int]]) -> list[list[int]]:
    target = len(graph) - 1
    res: list[list[int]] = []

    def dfs(node: int, path: list[int]) -> None:
        if node == target:
            res.append(path[:])
            return
        for nxt in graph[node]:
            path.append(nxt)
            dfs(nxt, path)
            path.pop()

    dfs(0, [0])
    return res`,
      },
      {
        language: "typescript",
        label: "DFS Backtracking",
        code: `function allPathsSourceTarget(graph: number[][]): number[][] {
  const target = graph.length - 1;
  const res: number[][] = [];
  const dfs = (node: number, path: number[]): void => {
    if (node === target) {
      res.push([...path]);
      return;
    }
    for (const nxt of graph[node]) {
      path.push(nxt);
      dfs(nxt, path);
      path.pop();
    }
  };
  dfs(0, [0]);
  return res;
}`,
      },
    ],
    runner: {
      entry: "allPathsSourceTarget",
      comparison: "canonical",
      jsStarter: `function allPathsSourceTarget(graph) {
  // Return every path from node 0 to node n-1.
  // TODO: implement
}`,
      jsReference: `function allPathsSourceTarget(graph) {
  const target = graph.length - 1;
  const res = [];
  const dfs = (node, path) => {
    if (node === target) { res.push([...path]); return; }
    for (const nxt of graph[node]) {
      path.push(nxt);
      dfs(nxt, path);
      path.pop();
    }
  };
  dfs(0, [0]);
  return res;
}`,
    },
    tests: [
      { name: "two paths", args: [[[1, 2], [3], [3], []]], expected: [[0, 1, 3], [0, 2, 3]] },
      {
        name: "five paths",
        args: [[[4, 3, 1], [3, 2, 4], [3], [4], []]],
        expected: [[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]],
      },
      { name: "single edge", args: [[[1], []]], expected: [[0, 1]] },
      { name: "only direct", args: [[[1, 2, 3], [], [], []]], expected: [[0, 3]] },
    ],
  },
  {
    id: 463,
    slug: "island-perimeter",
    title: "Island Perimeter",
    difficulty: "Easy",
    category: "graphs",
    patterns: ["Grid", "Counting"],
    companies: ["amazon", "google", "meta"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/island-perimeter/",
    description:
      "A grid of 0s and 1s contains exactly one connected island of land cells. Compute the perimeter of that island, counting every edge of a land cell that borders water or the grid boundary.",
    examples: [
      { input: "grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]", output: "16" },
      { input: "grid = [[1]]", output: "4" },
    ],
    intuition:
      "Each land cell contributes four edges, but every pair of horizontally or vertically adjacent land cells hides two of them (one from each cell). Add four per land cell, then subtract two for each shared border; checking only the top and left neighbor counts every shared edge exactly once.",
    approach: [
      "Scan every cell of the grid.",
      "For each land cell add 4 to the perimeter.",
      "If its upper neighbor is land, subtract 2 for the shared horizontal edge.",
      "If its left neighbor is land, subtract 2 for the shared vertical edge.",
      "Return the accumulated perimeter.",
    ],
    complexity: { time: "O(rows * cols)", space: "O(1)", note: "Single pass with constant extra space." },
    solutions: [
      {
        language: "python",
        label: "Edge Counting",
        code: `def island_perimeter(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    perimeter = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                perimeter += 4
                if r > 0 and grid[r - 1][c] == 1:
                    perimeter -= 2
                if c > 0 and grid[r][c - 1] == 1:
                    perimeter -= 2
    return perimeter`,
      },
      {
        language: "typescript",
        label: "Edge Counting",
        code: `function islandPerimeter(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  let perimeter = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        perimeter += 4;
        if (r > 0 && grid[r - 1][c] === 1) perimeter -= 2;
        if (c > 0 && grid[r][c - 1] === 1) perimeter -= 2;
      }
    }
  }
  return perimeter;
}`,
      },
    ],
    runner: {
      entry: "islandPerimeter",
      comparison: "deep",
      jsStarter: `function islandPerimeter(grid) {
  // grid holds 0 (water) and 1 (land). Return the island perimeter.
  // TODO: implement
}`,
      jsReference: `function islandPerimeter(grid) {
  const rows = grid.length, cols = grid[0].length;
  let perimeter = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        perimeter += 4;
        if (r > 0 && grid[r - 1][c] === 1) perimeter -= 2;
        if (c > 0 && grid[r][c - 1] === 1) perimeter -= 2;
      }
    }
  }
  return perimeter;
}`,
    },
    tests: [
      { name: "classic island", args: [[[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]]], expected: 16 },
      { name: "single cell", args: [[[1]]], expected: 4 },
      { name: "horizontal pair", args: [[[1, 1]]], expected: 6 },
      { name: "two by two block", args: [[[1, 1], [1, 1]]], expected: 8 },
    ],
  },
  {
    id: 542,
    slug: "01-matrix",
    title: "01 Matrix",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["BFS", "Multi-Source", "Grid"],
    companies: ["amazon", "google", "meta", "bytedance"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/01-matrix/",
    description:
      "Given a matrix of 0s and 1s, return a matrix of the same shape where each cell holds its distance to the nearest 0, measured in horizontal and vertical steps.",
    examples: [
      { input: "mat = [[0,0,0],[0,1,0],[0,0,0]]", output: "[[0,0,0],[0,1,0],[0,0,0]]" },
      { input: "mat = [[0,0,0],[0,1,0],[1,1,1]]", output: "[[0,0,0],[0,1,0],[1,2,1]]" },
    ],
    intuition:
      "Instead of searching outward from each 1, flood inward from every 0 at once. A multi-source BFS that starts with all zero cells at distance 0 fills the grid layer by layer, so the first time a cell is reached is guaranteed to be along a shortest path.",
    approach: [
      "Clone the input so the original matrix is never mutated.",
      "Create a distance grid, set every 0 cell to distance 0, and enqueue all of them.",
      "Pop a cell and look at its four neighbors.",
      "For any neighbor not yet assigned a distance, set it to the current distance plus one and enqueue it.",
      "Return the completed distance grid once the queue empties.",
    ],
    complexity: { time: "O(rows * cols)", space: "O(rows * cols)", note: "Every cell enters the BFS queue exactly once." },
    solutions: [
      {
        language: "python",
        label: "Multi-Source BFS",
        code: `from collections import deque


def update_matrix(mat: list[list[int]]) -> list[list[int]]:
    grid = [row[:] for row in mat]
    rows, cols = len(grid), len(grid[0])
    dist = [[-1] * cols for _ in range(rows)]
    queue: deque[tuple[int, int]] = deque()
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 0:
                dist[r][c] = 0
                queue.append((r, c))

    while queue:
        r, c = queue.popleft()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))

    return dist`,
      },
      {
        language: "typescript",
        label: "Multi-Source BFS",
        code: `function updateMatrix(mat: number[][]): number[][] {
  const grid = mat.map((row) => row.slice());
  const rows = grid.length;
  const cols = grid[0].length;
  const dist: number[][] = Array.from({ length: rows }, () => new Array<number>(cols).fill(-1));
  const queue: [number, number][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 0) {
        dist[r][c] = 0;
        queue.push([r, c]);
      }
    }
  }
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let head = 0;
  while (head < queue.length) {
    const [r, c] = queue[head++];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
  return dist;
}`,
      },
    ],
    runner: {
      entry: "updateMatrix",
      comparison: "deep",
      jsStarter: `function updateMatrix(mat) {
  // Return a grid of distances from each cell to the nearest 0.
  // TODO: implement
}`,
      jsReference: `function updateMatrix(mat) {
  const grid = mat.map((row) => row.slice());
  const rows = grid.length, cols = grid[0].length;
  const dist = Array.from({ length: rows }, () => new Array(cols).fill(-1));
  const queue = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === 0) { dist[r][c] = 0; queue.push([r, c]); }
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let head = 0;
  while (head < queue.length) {
    const [r, c] = queue[head++];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
  return dist;
}`,
    },
    tests: [
      { name: "single center one", args: [[[0, 0, 0], [0, 1, 0], [0, 0, 0]]], expected: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] },
      { name: "bottom row ones", args: [[[0, 0, 0], [0, 1, 0], [1, 1, 1]]], expected: [[0, 0, 0], [0, 1, 0], [1, 2, 1]] },
      { name: "single zero", args: [[[0]]], expected: [[0]] },
      { name: "corner zero", args: [[[0, 1], [1, 1]]], expected: [[0, 1], [1, 2]] },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Advanced Graphs
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 684,
    slug: "redundant-connection",
    title: "Redundant Connection",
    difficulty: "Medium",
    category: "advanced-graphs",
    patterns: ["Union-Find", "Cycle Detection"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/redundant-connection/",
    description:
      "A tree of n nodes had one extra edge added, producing a single cycle. Given the edges in input order, return the edge that can be removed so the remaining graph is again a tree — if several qualify, return the one appearing last.",
    examples: [
      { input: "edges = [[1,2],[1,3],[2,3]]", output: "[2,3]" },
      { input: "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]", output: "[1,4]" },
    ],
    intuition:
      "Process edges in order with Union-Find. Each edge that joins two previously separate components is part of the tree; the first edge whose endpoints already share a root closes the cycle. Because edges are scanned in order, that edge is exactly the last one that creates redundancy.",
    approach: [
      "Initialize each node as its own parent (nodes are 1-indexed).",
      "Define find with path compression.",
      "For each edge, find the roots of both endpoints.",
      "If the roots match, the edge completes a cycle — return it.",
      "Otherwise union the two roots and continue.",
    ],
    complexity: { time: "O(n * α(n))", space: "O(n)", note: "One near-constant union/find per edge." },
    solutions: [
      {
        language: "python",
        label: "Union-Find",
        code: `def find_redundant_connection(edges: list[list[int]]) -> list[int]:
    n = len(edges)
    parent = list(range(n + 1))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for u, v in edges:
        ru, rv = find(u), find(v)
        if ru == rv:
            return [u, v]
        parent[ru] = rv
    return []`,
      },
      {
        language: "typescript",
        label: "Union-Find",
        code: `function findRedundantConnection(edges: number[][]): number[] {
  const n = edges.length;
  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  for (const [u, v] of edges) {
    const ru = find(u);
    const rv = find(v);
    if (ru === rv) return [u, v];
    parent[ru] = rv;
  }
  return [];
}`,
      },
    ],
    runner: {
      entry: "findRedundantConnection",
      comparison: "deep",
      jsStarter: `function findRedundantConnection(edges) {
  // Return the redundant edge that closes a cycle.
  // TODO: implement
}`,
      jsReference: `function findRedundantConnection(edges) {
  const n = edges.length;
  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  for (const [u, v] of edges) {
    const ru = find(u), rv = find(v);
    if (ru === rv) return [u, v];
    parent[ru] = rv;
  }
  return [];
}`,
    },
    tests: [
      { name: "triangle", args: [[[1, 2], [1, 3], [2, 3]]], expected: [2, 3] },
      { name: "later cycle", args: [[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]], expected: [1, 4] },
      { name: "small loop", args: [[[1, 2], [2, 3], [1, 3]]], expected: [1, 3] },
    ],
  },
  {
    id: 127,
    slug: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    category: "advanced-graphs",
    patterns: ["BFS", "Implicit Graph"],
    companies: ["amazon", "google", "meta", "linkedin"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/word-ladder/",
    description:
      "Given a begin word, an end word, and a dictionary, find the length of the shortest sequence that transforms the begin word into the end word by changing one letter at a time, where every intermediate word is in the dictionary. Return 0 if no such sequence exists.",
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5" },
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', output: "0" },
    ],
    intuition:
      "Treat each word as a node with edges to every dictionary word that differs by exactly one letter. The shortest transformation is the shortest path in that implicit graph, so a breadth-first search from the begin word, generating neighbors by trying every single-letter substitution, finds the minimum length.",
    approach: [
      "Put the dictionary in a set and immediately return 0 if the end word is absent.",
      "BFS level by level starting from the begin word, tracking the current sequence length.",
      "For each word, try replacing every position with each letter a–z to form candidates.",
      "Any candidate still in the set is enqueued and removed so it is visited once.",
      "Return the length when the end word is dequeued, or 0 if the search exhausts.",
    ],
    complexity: { time: "O(N * L * 26)", space: "O(N * L)", note: "N words of length L; each generates 26L candidates." },
    solutions: [
      {
        language: "python",
        label: "BFS",
        code: `from collections import deque
from string import ascii_lowercase


def ladder_length(begin_word: str, end_word: str, word_list: list[str]) -> int:
    words = set(word_list)
    if end_word not in words:
        return 0
    queue: deque[tuple[str, int]] = deque([(begin_word, 1)])
    words.discard(begin_word)
    while queue:
        word, steps = queue.popleft()
        if word == end_word:
            return steps
        for i in range(len(word)):
            for ch in ascii_lowercase:
                cand = word[:i] + ch + word[i + 1:]
                if cand in words:
                    words.discard(cand)
                    queue.append((cand, steps + 1))
    return 0`,
      },
      {
        language: "typescript",
        label: "BFS",
        code: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;
  const queue: [string, number][] = [[beginWord, 1]];
  words.delete(beginWord);
  let head = 0;
  while (head < queue.length) {
    const [word, steps] = queue[head++];
    if (word === endWord) return steps;
    const chars = word.split("");
    for (let i = 0; i < chars.length; i++) {
      const original = chars[i];
      for (let c = 97; c <= 122; c++) {
        chars[i] = String.fromCharCode(c);
        const cand = chars.join("");
        if (words.has(cand)) {
          words.delete(cand);
          queue.push([cand, steps + 1]);
        }
      }
      chars[i] = original;
    }
  }
  return 0;
}`,
      },
    ],
    runner: {
      entry: "ladderLength",
      comparison: "deep",
      jsStarter: `function ladderLength(beginWord, endWord, wordList) {
  // Return the shortest transformation length, or 0 if none.
  // TODO: implement
}`,
      jsReference: `function ladderLength(beginWord, endWord, wordList) {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;
  const queue = [[beginWord, 1]];
  words.delete(beginWord);
  let head = 0;
  while (head < queue.length) {
    const [word, steps] = queue[head++];
    if (word === endWord) return steps;
    const chars = word.split("");
    for (let i = 0; i < chars.length; i++) {
      const original = chars[i];
      for (let c = 97; c <= 122; c++) {
        chars[i] = String.fromCharCode(c);
        const cand = chars.join("");
        if (words.has(cand)) { words.delete(cand); queue.push([cand, steps + 1]); }
      }
      chars[i] = original;
    }
  }
  return 0;
}`,
    },
    tests: [
      { name: "reachable", args: ["hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]], expected: 5 },
      { name: "missing end", args: ["hit", "cog", ["hot", "dot", "dog", "lot", "log"]], expected: 0 },
      { name: "direct step", args: ["a", "c", ["a", "b", "c"]], expected: 2 },
      { name: "short chain", args: ["hot", "dog", ["hot", "dog", "dot"]], expected: 3 },
    ],
  },
  {
    id: 1631,
    slug: "path-with-minimum-effort",
    title: "Path With Minimum Effort",
    difficulty: "Medium",
    category: "advanced-graphs",
    patterns: ["Dijkstra", "Heap", "Grid"],
    companies: ["amazon", "google", "uber", "databricks"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/path-with-minimum-effort/",
    description:
      "You start at the top-left cell of a height grid and want to reach the bottom-right cell moving in four directions. The effort of a path is the largest absolute height difference between consecutive cells; return the minimum possible effort.",
    examples: [
      { input: "heights = [[1,2,2],[3,8,2],[5,3,5]]", output: "2" },
      { input: "heights = [[1,2,3],[3,8,4],[5,3,5]]", output: "1" },
    ],
    intuition:
      "The cost of a path is its single worst step, not the sum, so this is a shortest-path problem under a max metric. Run Dijkstra where a cell's tentative effort is the maximum of the path's effort so far and the difference to the next cell; the first time the destination is popped, its recorded effort is optimal.",
    approach: [
      "Keep an effort grid initialized to infinity with the start at 0.",
      "Use a min-heap keyed by effort, seeded with the top-left cell.",
      "Pop the smallest-effort cell; if it is the destination, return its effort.",
      "For each neighbor, the new effort is max(current effort, |height difference|).",
      "If that improves the neighbor's recorded effort, update it and push it onto the heap.",
    ],
    complexity: { time: "O(R * C * log(R * C))", space: "O(R * C)", note: "Dijkstra over the grid with a binary heap." },
    solutions: [
      {
        language: "python",
        label: "Dijkstra",
        code: `import heapq


def minimum_effort_path(heights: list[list[int]]) -> int:
    rows, cols = len(heights), len(heights[0])
    effort = [[float("inf")] * cols for _ in range(rows)]
    effort[0][0] = 0
    heap: list[tuple[int, int, int]] = [(0, 0, 0)]
    while heap:
        e, r, c = heapq.heappop(heap)
        if r == rows - 1 and c == cols - 1:
            return e
        if e > effort[r][c]:
            continue
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                ne = max(e, abs(heights[nr][nc] - heights[r][c]))
                if ne < effort[nr][nc]:
                    effort[nr][nc] = ne
                    heapq.heappush(heap, (ne, nr, nc))
    return 0`,
      },
      {
        language: "typescript",
        label: "Dijkstra",
        code: `function minimumEffortPath(heights: number[][]): number {
  const rows = heights.length;
  const cols = heights[0].length;
  const effort: number[][] = Array.from({ length: rows }, () => new Array<number>(cols).fill(Infinity));
  effort[0][0] = 0;
  const heap: [number, number, number][] = [[0, 0, 0]];
  const swap = (i: number, j: number): void => { const t = heap[i]; heap[i] = heap[j]; heap[j] = t; };
  const push = (item: [number, number, number]): void => {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      swap(p, i); i = p;
    }
  };
  const pop = (): [number, number, number] => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        let s = i;
        const l = 2 * i + 1, r = 2 * i + 2;
        if (l < heap.length && heap[l][0] < heap[s][0]) s = l;
        if (r < heap.length && heap[r][0] < heap[s][0]) s = r;
        if (s === i) break;
        swap(s, i); i = s;
      }
    }
    return top;
  };
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (heap.length) {
    const [e, r, c] = pop();
    if (r === rows - 1 && c === cols - 1) return e;
    if (e > effort[r][c]) continue;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      const ne = Math.max(e, Math.abs(heights[nr][nc] - heights[r][c]));
      if (ne < effort[nr][nc]) {
        effort[nr][nc] = ne;
        push([ne, nr, nc]);
      }
    }
  }
  return 0;
}`,
      },
    ],
    runner: {
      entry: "minimumEffortPath",
      comparison: "deep",
      jsStarter: `function minimumEffortPath(heights) {
  // Return the minimum possible maximum step along a top-left to bottom-right path.
  // TODO: implement
}`,
      jsReference: `function minimumEffortPath(heights) {
  const rows = heights.length, cols = heights[0].length;
  const effort = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));
  effort[0][0] = 0;
  const heap = [[0, 0, 0]];
  const swap = (i, j) => { const t = heap[i]; heap[i] = heap[j]; heap[j] = t; };
  const push = (item) => {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (heap[p][0] <= heap[i][0]) break; swap(p, i); i = p; }
  };
  const pop = () => {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        let s = i; const l = 2 * i + 1, r = 2 * i + 2;
        if (l < heap.length && heap[l][0] < heap[s][0]) s = l;
        if (r < heap.length && heap[r][0] < heap[s][0]) s = r;
        if (s === i) break;
        swap(s, i); i = s;
      }
    }
    return top;
  };
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (heap.length) {
    const [e, r, c] = pop();
    if (r === rows - 1 && c === cols - 1) return e;
    if (e > effort[r][c]) continue;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      const ne = Math.max(e, Math.abs(heights[nr][nc] - heights[r][c]));
      if (ne < effort[nr][nc]) { effort[nr][nc] = ne; push([ne, nr, nc]); }
    }
  }
  return 0;
}`,
    },
    tests: [
      { name: "small grid", args: [[[1, 2, 2], [3, 8, 2], [5, 3, 5]]], expected: 2 },
      { name: "smooth path", args: [[[1, 2, 3], [3, 8, 4], [5, 3, 5]]], expected: 1 },
      {
        name: "zero effort lane",
        args: [[[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]]],
        expected: 0,
      },
      { name: "single cell", args: [[[1]]], expected: 0 },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Dynamic Programming — 1-D
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 377,
    slug: "combination-sum-iv",
    title: "Combination Sum IV",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Counting"],
    companies: ["amazon", "google", "microsoft", "snowflake"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/combination-sum-iv/",
    description:
      "Given distinct positive integers and a target, count how many ordered sequences of those numbers add up to the target. Sequences that use the same numbers in a different order are counted separately.",
    examples: [
      { input: "nums = [1,2,3], target = 4", output: "7" },
      { input: "nums = [9], target = 3", output: "0" },
    ],
    intuition:
      "Because order matters, the number of ways to make t is the sum over each value v of the ways to make t − v: the value v is the last element placed. Build a 1-D table from 0 up to the target, with one way to make zero (the empty sequence).",
    approach: [
      "Create a dp array of size target + 1 with dp[0] = 1.",
      "For each subtotal t from 1 to target, consider every value v.",
      "If v does not exceed t, add dp[t - v] to dp[t].",
      "Return dp[target].",
    ],
    complexity: { time: "O(target * len(nums))", space: "O(target)", note: "Each subtotal sums over the value list once." },
    solutions: [
      {
        language: "python",
        label: "Bottom-Up DP",
        code: `def combination_sum4(nums: list[int], target: int) -> int:
    dp = [0] * (target + 1)
    dp[0] = 1
    for t in range(1, target + 1):
        for v in nums:
            if v <= t:
                dp[t] += dp[t - v]
    return dp[target]`,
      },
      {
        language: "typescript",
        label: "Bottom-Up DP",
        code: `function combinationSum4(nums: number[], target: number): number {
  const dp = new Array<number>(target + 1).fill(0);
  dp[0] = 1;
  for (let t = 1; t <= target; t++) {
    for (const v of nums) {
      if (v <= t) dp[t] += dp[t - v];
    }
  }
  return dp[target];
}`,
      },
    ],
    runner: {
      entry: "combinationSum4",
      comparison: "deep",
      jsStarter: `function combinationSum4(nums, target) {
  // Count ordered sequences of nums summing to target.
  // TODO: implement
}`,
      jsReference: `function combinationSum4(nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let t = 1; t <= target; t++) {
    for (const v of nums) {
      if (v <= t) dp[t] += dp[t - v];
    }
  }
  return dp[target];
}`,
    },
    tests: [
      { name: "classic", args: [[1, 2, 3], 4], expected: 7 },
      { name: "too large", args: [[9], 3], expected: 0 },
      { name: "two values", args: [[1, 2], 3], expected: 3 },
      { name: "single unit", args: [[1], 5], expected: 1 },
    ],
  },
  {
    id: 740,
    slug: "delete-and-earn",
    title: "Delete and Earn",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "House Robber"],
    companies: ["amazon", "google", "adobe"],
    frequency: 45,
    leetcodeUrl: "https://leetcode.com/problems/delete-and-earn/",
    description:
      "Repeatedly pick any value from the array to earn points equal to that value times its count, but every element equal to one less or one more is then deleted. Maximize the total points earned.",
    examples: [
      { input: "nums = [3,4,2]", output: "6", explanation: "Take 4 (deleting 3), then take 2 for 4 + 2 = 6." },
      { input: "nums = [2,2,3,3,3,4]", output: "9" },
    ],
    intuition:
      "Taking a value forbids taking its neighbors by one, which is exactly the house-robber constraint on the number line. Sum the points available at each distinct value, then run the rob recurrence over consecutive values: at each value choose the better of skipping it or taking it plus the best up to two values back.",
    approach: [
      "Bucket the total points for each value into a points array indexed by value.",
      "Iterate values from 1 to the maximum.",
      "Track two running totals: the best including up to the previous value and up to the one before it.",
      "At each value, take = (best two back) + points[value], skip = (best one back); keep the larger.",
      "Return the best total after the final value.",
    ],
    complexity: { time: "O(n + max)", space: "O(max)", note: "Linear in the array plus the value range." },
    solutions: [
      {
        language: "python",
        label: "House Robber DP",
        code: `def delete_and_earn(nums: list[int]) -> int:
    max_val = max(nums)
    points = [0] * (max_val + 1)
    for x in nums:
        points[x] += x

    prev, curr = 0, 0
    for v in range(1, max_val + 1):
        take = prev + points[v]
        skip = curr
        prev, curr = curr, max(take, skip)
    return curr`,
      },
      {
        language: "typescript",
        label: "House Robber DP",
        code: `function deleteAndEarn(nums: number[]): number {
  const maxVal = Math.max(...nums);
  const points = new Array<number>(maxVal + 1).fill(0);
  for (const x of nums) points[x] += x;

  let prev = 0;
  let curr = 0;
  for (let v = 1; v <= maxVal; v++) {
    const take = prev + points[v];
    const skip = curr;
    prev = curr;
    curr = Math.max(take, skip);
  }
  return curr;
}`,
      },
    ],
    runner: {
      entry: "deleteAndEarn",
      comparison: "deep",
      jsStarter: `function deleteAndEarn(nums) {
  // Maximize points earned under the delete-neighbors rule.
  // TODO: implement
}`,
      jsReference: `function deleteAndEarn(nums) {
  const maxVal = Math.max(...nums);
  const points = new Array(maxVal + 1).fill(0);
  for (const x of nums) points[x] += x;
  let prev = 0, curr = 0;
  for (let v = 1; v <= maxVal; v++) {
    const take = prev + points[v];
    const skip = curr;
    prev = curr;
    curr = Math.max(take, skip);
  }
  return curr;
}`,
    },
    tests: [
      { name: "take four", args: [[3, 4, 2]], expected: 6 },
      { name: "take threes", args: [[2, 2, 3, 3, 3, 4]], expected: 9 },
      { name: "single value", args: [[1]], expected: 1 },
      { name: "non-adjacent", args: [[3, 1]], expected: 4 },
    ],
  },
  {
    id: 983,
    slug: "minimum-cost-for-tickets",
    title: "Minimum Cost For Tickets",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming"],
    companies: ["amazon", "google", "uber"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/minimum-cost-for-tickets/",
    description:
      "You must travel on certain days of the year and can buy 1-day, 7-day, or 30-day passes at given costs. Each pass covers consecutive calendar days from its purchase; return the minimum total cost to cover every travel day.",
    examples: [
      { input: "days = [1,4,6,7,8,20], costs = [2,7,15]", output: "11" },
      { input: "days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]", output: "17" },
    ],
    intuition:
      "Define the cheapest cost to cover all travel through each calendar day. On a non-travel day the cost is unchanged from the day before; on a travel day choose the best of buying a 1-, 7-, or 30-day pass that ends on that day, looking back the appropriate number of days.",
    approach: [
      "Mark which days require travel and find the last travel day.",
      "Build a dp array over calendar days 0 to the last travel day.",
      "On a non-travel day copy the previous day's cost.",
      "On a travel day take the minimum of dp[d-1]+cost1, dp[d-7]+cost7, and dp[d-30]+cost30 (clamping indices at 0).",
      "Return the cost at the last travel day.",
    ],
    complexity: { time: "O(last day)", space: "O(last day)", note: "One pass over the calendar up to the final travel day." },
    solutions: [
      {
        language: "python",
        label: "Calendar DP",
        code: `def mincost_tickets(days: list[int], costs: list[int]) -> int:
    day_set = set(days)
    last = days[-1]
    dp = [0] * (last + 1)
    for d in range(1, last + 1):
        if d not in day_set:
            dp[d] = dp[d - 1]
            continue
        dp[d] = min(
            dp[d - 1] + costs[0],
            dp[max(0, d - 7)] + costs[1],
            dp[max(0, d - 30)] + costs[2],
        )
    return dp[last]`,
      },
      {
        language: "typescript",
        label: "Calendar DP",
        code: `function mincostTickets(days: number[], costs: number[]): number {
  const daySet = new Set(days);
  const last = days[days.length - 1];
  const dp = new Array<number>(last + 1).fill(0);
  for (let d = 1; d <= last; d++) {
    if (!daySet.has(d)) {
      dp[d] = dp[d - 1];
      continue;
    }
    dp[d] = Math.min(
      dp[d - 1] + costs[0],
      dp[Math.max(0, d - 7)] + costs[1],
      dp[Math.max(0, d - 30)] + costs[2],
    );
  }
  return dp[last];
}`,
      },
    ],
    runner: {
      entry: "mincostTickets",
      comparison: "deep",
      jsStarter: `function mincostTickets(days, costs) {
  // Return the minimum cost of passes covering every travel day.
  // TODO: implement
}`,
      jsReference: `function mincostTickets(days, costs) {
  const daySet = new Set(days);
  const last = days[days.length - 1];
  const dp = new Array(last + 1).fill(0);
  for (let d = 1; d <= last; d++) {
    if (!daySet.has(d)) { dp[d] = dp[d - 1]; continue; }
    dp[d] = Math.min(
      dp[d - 1] + costs[0],
      dp[Math.max(0, d - 7)] + costs[1],
      dp[Math.max(0, d - 30)] + costs[2],
    );
  }
  return dp[last];
}`,
    },
    tests: [
      { name: "sparse travel", args: [[1, 4, 6, 7, 8, 20], [2, 7, 15]], expected: 11 },
      { name: "monthly pass wins", args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]], expected: 17 },
      { name: "single day", args: [[1], [2, 7, 15]], expected: 2 },
      { name: "weekly pass wins", args: [[1, 2, 3], [2, 7, 15]], expected: 6 },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Dynamic Programming — 2-D
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 72,
    slug: "edit-distance",
    title: "Edit Distance",
    difficulty: "Hard",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Strings"],
    companies: ["amazon", "google", "meta", "microsoft", "bloomberg"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
    description:
      "Given two strings, compute the minimum number of single-character insertions, deletions, or replacements needed to turn the first string into the second.",
    examples: [
      { input: 'word1 = "horse", word2 = "ros"', output: "3" },
      { input: 'word1 = "intention", word2 = "execution"', output: "5" },
    ],
    intuition:
      "Let dp[i][j] be the edit distance between the first i characters of word1 and the first j of word2. If the current characters match, no new edit is needed; otherwise take one plus the cheapest of replace, delete, or insert, which correspond to the three diagonal and orthogonal neighbors.",
    approach: [
      "Allocate a (m+1) by (n+1) table where row 0 and column 0 are the costs of building from an empty string.",
      "For each pair of prefixes, if the last characters match copy the diagonal value.",
      "Otherwise set dp[i][j] = 1 + min(replace = dp[i-1][j-1], delete = dp[i-1][j], insert = dp[i][j-1]).",
      "Return dp[m][n].",
    ],
    complexity: { time: "O(m * n)", space: "O(m * n)", note: "Fills one table cell per prefix pair." },
    solutions: [
      {
        language: "python",
        label: "2-D DP",
        code: `def min_distance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
      },
      {
        language: "typescript",
        label: "2-D DP",
        code: `function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = word1[i - 1] === word2[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}`,
      },
    ],
    runner: {
      entry: "minDistance",
      comparison: "deep",
      jsStarter: `function minDistance(word1, word2) {
  // Return the minimum edit distance between the two strings.
  // TODO: implement
}`,
      jsReference: `function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = word1[i - 1] === word2[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}`,
    },
    tests: [
      { name: "horse to ros", args: ["horse", "ros"], expected: 3 },
      { name: "intention to execution", args: ["intention", "execution"], expected: 5 },
      { name: "empty source", args: ["", "abc"], expected: 3 },
      { name: "identical", args: ["abc", "abc"], expected: 0 },
    ],
  },
  {
    id: 120,
    slug: "triangle",
    title: "Triangle",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming"],
    companies: ["amazon", "adobe", "bloomberg"],
    frequency: 42,
    leetcodeUrl: "https://leetcode.com/problems/triangle/",
    description:
      "Given a triangle of numbers, find the minimum path sum from the top to the bottom, where each step you move to one of the two adjacent numbers on the row below.",
    examples: [
      { input: "triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]", output: "11", explanation: "Path 2 + 3 + 5 + 1 = 11." },
      { input: "triangle = [[-10]]", output: "-10" },
    ],
    intuition:
      "Work from the bottom up: the best sum reachable from a cell is its value plus the smaller of the two best sums directly below it. Reusing a single row of running minima collapses the whole triangle into the answer stored at the apex.",
    approach: [
      "Copy the last row of the triangle as the initial running minima.",
      "Move upward row by row.",
      "For each cell, add its value to the smaller of the two adjacent running minima below it.",
      "After processing the top row, the single remaining value is the answer.",
    ],
    complexity: { time: "O(n^2)", space: "O(n)", note: "n is the number of rows; one row of state is reused." },
    solutions: [
      {
        language: "python",
        label: "Bottom-Up DP",
        code: `def minimum_total(triangle: list[list[int]]) -> int:
    dp = list(triangle[-1])
    for r in range(len(triangle) - 2, -1, -1):
        for c in range(r + 1):
            dp[c] = triangle[r][c] + min(dp[c], dp[c + 1])
    return dp[0]`,
      },
      {
        language: "typescript",
        label: "Bottom-Up DP",
        code: `function minimumTotal(triangle: number[][]): number {
  const dp = [...triangle[triangle.length - 1]];
  for (let r = triangle.length - 2; r >= 0; r--) {
    for (let c = 0; c <= r; c++) {
      dp[c] = triangle[r][c] + Math.min(dp[c], dp[c + 1]);
    }
  }
  return dp[0];
}`,
      },
    ],
    runner: {
      entry: "minimumTotal",
      comparison: "deep",
      jsStarter: `function minimumTotal(triangle) {
  // Return the minimum top-to-bottom path sum.
  // TODO: implement
}`,
      jsReference: `function minimumTotal(triangle) {
  const dp = [...triangle[triangle.length - 1]];
  for (let r = triangle.length - 2; r >= 0; r--) {
    for (let c = 0; c <= r; c++) {
      dp[c] = triangle[r][c] + Math.min(dp[c], dp[c + 1]);
    }
  }
  return dp[0];
}`,
    },
    tests: [
      { name: "four rows", args: [[[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]], expected: 11 },
      { name: "single negative", args: [[[-10]]], expected: -10 },
      { name: "two rows", args: [[[1], [2, 3]]], expected: 3 },
      { name: "three rows", args: [[[1], [2, 3], [4, 5, 6]]], expected: 7 },
    ],
  },
  {
    id: 221,
    slug: "maximal-square",
    title: "Maximal Square",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Grid"],
    companies: ["amazon", "google", "meta", "apple"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/maximal-square/",
    description:
      "Given a matrix whose cells are the characters '0' and '1', find the largest square made entirely of '1' cells and return its area.",
    examples: [
      { input: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]', output: "4" },
      { input: 'matrix = [["0","1"],["1","0"]]', output: "1" },
    ],
    intuition:
      "The side of the largest all-ones square whose bottom-right corner is a given cell is limited by its top, left, and top-left neighbors. If the cell is '1', its square side is one more than the smallest of those three neighbors' sides; track the largest side seen and square it for the area.",
    approach: [
      "Use a dp grid padded with an extra zero row and column so edge cells have neighbors.",
      "For each '1' cell, set dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).",
      "Keep the maximum side length encountered.",
      "Return that side length squared as the area.",
    ],
    complexity: { time: "O(rows * cols)", space: "O(rows * cols)", note: "One table cell computed per matrix cell." },
    solutions: [
      {
        language: "python",
        label: "2-D DP",
        code: `def maximal_square(matrix: list[list[str]]) -> int:
    rows, cols = len(matrix), len(matrix[0])
    dp = [[0] * (cols + 1) for _ in range(rows + 1)]
    best = 0
    for i in range(1, rows + 1):
        for j in range(1, cols + 1):
            if matrix[i - 1][j - 1] == "1":
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
                best = max(best, dp[i][j])
    return best * best`,
      },
      {
        language: "typescript",
        label: "2-D DP",
        code: `function maximalSquare(matrix: string[][]): number {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const dp: number[][] = Array.from({ length: rows + 1 }, () => new Array<number>(cols + 1).fill(0));
  let best = 0;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (matrix[i - 1][j - 1] === "1") {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        best = Math.max(best, dp[i][j]);
      }
    }
  }
  return best * best;
}`,
      },
    ],
    runner: {
      entry: "maximalSquare",
      comparison: "deep",
      jsStarter: `function maximalSquare(matrix) {
  // matrix holds "0"/"1" strings. Return the area of the largest all-ones square.
  // TODO: implement
}`,
      jsReference: `function maximalSquare(matrix) {
  const rows = matrix.length, cols = matrix[0].length;
  const dp = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));
  let best = 0;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (matrix[i - 1][j - 1] === "1") {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        best = Math.max(best, dp[i][j]);
      }
    }
  }
  return best * best;
}`,
    },
    tests: [
      {
        name: "side two square",
        args: [[["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]],
        expected: 4,
      },
      { name: "no two by two", args: [[["0", "1"], ["1", "0"]]], expected: 1 },
      { name: "all water", args: [[["0"]]], expected: 0 },
      { name: "full block", args: [[["1", "1"], ["1", "1"]]], expected: 4 },
    ],
  },
];

export default batchL;
