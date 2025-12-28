import type { Problem } from "../types.ts";

/**
 * Catalog batch D — backtracking, graphs, DP, greedy, intervals, and matrix.
 * Every record ships idiomatic Python + TypeScript plus a runnable reference
 * (`runner.jsReference`) graded against `tests`. Grid/board problems clone their
 * input inside the reference so repeated playground runs stay deterministic.
 */
export const batchD: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Backtracking
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 39,
    slug: "combination-sum",
    title: "Combination Sum",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "DFS"],
    companies: ["amazon", "google", "meta", "microsoft", "bloomberg"],
    frequency: 80,
    leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
    description:
      "Given a list of distinct positive integers and a target, return every unique combination of those numbers that sums to the target. Each candidate may be reused as many times as you like.",
    examples: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" },
      { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]" },
    ],
    intuition:
      "Explore combinations with depth-first search. To avoid permutations of the same multiset, never look backward: each recursive call may only start at the current index or later. Reusing a number means recursing with the same index rather than the next one.",
    approach: [
      "Recurse with (start index, remaining target).",
      "When remaining hits 0, record a copy of the current path.",
      "If remaining goes negative, prune the branch.",
      "Loop i from start to end; pick candidates[i], recurse with the same i (reuse allowed) and remaining - candidates[i], then backtrack.",
    ],
    complexity: { time: "O(n^(T/m))", space: "O(T/m)", note: "T = target, m = smallest candidate; bounded by the recursion tree." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    res: list[list[int]] = []
    path: list[int] = []

    def dfs(start: int, remain: int) -> None:
        if remain == 0:
            res.append(path[:])
            return
        if remain < 0:
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            dfs(i, remain - candidates[i])
            path.pop()

    dfs(0, target)
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  const dfs = (start: number, remain: number): void => {
    if (remain === 0) { res.push([...path]); return; }
    if (remain < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, remain - candidates[i]);
      path.pop();
    }
  };
  dfs(0, target);
  return res;
}`,
      },
    ],
    runner: {
      entry: "combinationSum",
      comparison: "canonical",
      jsStarter: `function combinationSum(candidates, target) {
  // Return every combination (numbers reusable) that sums to target.
  // TODO: implement
}`,
      jsReference: `function combinationSum(candidates, target) {
  const res = [];
  const path = [];
  const dfs = (start, remain) => {
    if (remain === 0) { res.push(path.slice()); return; }
    if (remain < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, remain - candidates[i]);
      path.pop();
    }
  };
  dfs(0, target);
  return res;
}`,
    },
    tests: [
      { name: "two combos", args: [[2, 3, 6, 7], 7], expected: [[2, 2, 3], [7]] },
      { name: "three combos", args: [[2, 3, 5], 8], expected: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] },
      { name: "single candidate hits", args: [[3], 3], expected: [[3]] },
      { name: "impossible", args: [[2], 1], expected: [] },
    ],
    relatedIds: [40, 46, 90],
  },
  {
    id: 46,
    slug: "permutations",
    title: "Permutations",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "DFS"],
    companies: ["amazon", "google", "meta", "microsoft", "linkedin"],
    frequency: 79,
    leetcodeUrl: "https://leetcode.com/problems/permutations/",
    description:
      "Given an array of distinct integers, produce every possible ordering of its elements.",
    examples: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
    ],
    intuition:
      "Build each permutation one slot at a time. Track which elements are already placed; at every depth, try every unused element, recurse, then release it. A complete path of length n is one permutation.",
    approach: [
      "Maintain a boolean `used` array and a growing `path`.",
      "When path length equals n, copy it into the results.",
      "Otherwise loop over all indices; skip used ones, mark + push, recurse, then unmark + pop.",
    ],
    complexity: { time: "O(n·n!)", space: "O(n)", note: "n! permutations, each O(n) to copy." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def permute(nums: list[int]) -> list[list[int]]:
    res: list[list[int]] = []
    used = [False] * len(nums)
    path: list[int] = []

    def dfs() -> None:
        if len(path) == len(nums):
            res.append(path[:])
            return
        for i, x in enumerate(nums):
            if used[i]:
                continue
            used[i] = True
            path.append(x)
            dfs()
            path.pop()
            used[i] = False

    dfs()
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  const used = new Array(nums.length).fill(false);
  const path: number[] = [];
  const dfs = (): void => {
    if (path.length === nums.length) { res.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  };
  dfs();
  return res;
}`,
      },
    ],
    runner: {
      entry: "permute",
      comparison: "canonical",
      jsStarter: `function permute(nums) {
  // Return all orderings of the distinct numbers.
  // TODO: implement
}`,
      jsReference: `function permute(nums) {
  const res = [];
  const used = new Array(nums.length).fill(false);
  const path = [];
  const dfs = () => {
    if (path.length === nums.length) { res.push(path.slice()); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  };
  dfs();
  return res;
}`,
    },
    tests: [
      { name: "three elements", args: [[1, 2, 3]], expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
      { name: "two elements", args: [[0, 1]], expected: [[0, 1], [1, 0]] },
      { name: "single", args: [[7]], expected: [[7]] },
    ],
    relatedIds: [47, 39, 78],
  },
  {
    id: 90,
    slug: "subsets-ii",
    title: "Subsets II",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "DFS"],
    companies: ["amazon", "meta", "google", "bloomberg"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/subsets-ii/",
    description:
      "Given an integer array that may contain duplicates, return all possible subsets (the power set) without producing any duplicate subset.",
    examples: [
      { input: "nums = [1,2,2]", output: "[[],[1],[1,2],[1,2,2],[2],[2,2]]" },
      { input: "nums = [0]", output: "[[],[0]]" },
    ],
    intuition:
      "Sort first so equal values sit together. During DFS, every recursion node is itself a valid subset, so record it on entry. To skip duplicate subsets, when iterating choices at a level, ignore a value equal to its immediate predecessor (we already branched on that value once at this level).",
    approach: [
      "Sort the array.",
      "DFS over a start index; push a copy of the current path at every call.",
      "Loop i from start; if i > start and nums[i] == nums[i-1], skip to avoid duplicate subsets.",
      "Pick nums[i], recurse with i+1, then backtrack.",
    ],
    complexity: { time: "O(n·2^n)", space: "O(n)", note: "Up to 2^n subsets, each O(n) to copy." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def subsets_with_dup(nums: list[int]) -> list[list[int]]:
    nums = sorted(nums)
    res: list[list[int]] = []
    path: list[int] = []

    def dfs(start: int) -> None:
        res.append(path[:])
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            path.append(nums[i])
            dfs(i + 1)
            path.pop()

    dfs(0)
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function subsetsWithDup(nums: number[]): number[][] {
  const arr = [...nums].sort((a, b) => a - b);
  const res: number[][] = [];
  const path: number[] = [];
  const dfs = (start: number): void => {
    res.push([...path]);
    for (let i = start; i < arr.length; i++) {
      if (i > start && arr[i] === arr[i - 1]) continue;
      path.push(arr[i]);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(0);
  return res;
}`,
      },
    ],
    runner: {
      entry: "subsetsWithDup",
      comparison: "canonical",
      jsStarter: `function subsetsWithDup(nums) {
  // Return the power set with no duplicate subsets.
  // TODO: implement
}`,
      jsReference: `function subsetsWithDup(nums) {
  const arr = nums.slice().sort((a, b) => a - b);
  const res = [];
  const path = [];
  const dfs = (start) => {
    res.push(path.slice());
    for (let i = start; i < arr.length; i++) {
      if (i > start && arr[i] === arr[i - 1]) continue;
      path.push(arr[i]);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(0);
  return res;
}`,
    },
    tests: [
      { name: "one duplicate", args: [[1, 2, 2]], expected: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]] },
      { name: "single", args: [[0]], expected: [[], [0]] },
      { name: "all equal", args: [[1, 1]], expected: [[], [1], [1, 1]] },
    ],
    relatedIds: [78, 46, 47],
  },
  {
    id: 17,
    slug: "letter-combinations-of-a-phone-number",
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "DFS"],
    companies: ["amazon", "google", "meta", "microsoft", "uber"],
    frequency: 77,
    leetcodeUrl: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    description:
      "Given a string of digits 2-9, return every letter string that could be typed by mapping each digit to its letters on a classic telephone keypad. An empty input yields no combinations.",
    examples: [
      { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
      { input: 'digits = "2"', output: '["a","b","c"]' },
    ],
    intuition:
      "Each digit multiplies the answer set by its letter count — a Cartesian product. Walk the digits left to right with DFS, appending one letter per level; when you have placed a letter for every digit, the assembled string is one combination.",
    approach: [
      "Return [] immediately for an empty string.",
      "Map each digit to its keypad letters.",
      "DFS over the digit index, carrying the string built so far.",
      "At the final index, push the built string; otherwise branch over the current digit's letters.",
    ],
    complexity: { time: "O(4^n · n)", space: "O(n)", note: "Up to 4 letters per digit; n = number of digits." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def letter_combinations(digits: str) -> list[str]:
    if not digits:
        return []
    mapping = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
    }
    res: list[str] = []

    def dfs(i: int, cur: str) -> None:
        if i == len(digits):
            res.append(cur)
            return
        for ch in mapping[digits[i]]:
            dfs(i + 1, cur + ch)

    dfs(0, "")
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];
  const map: Record<string, string> = {
    "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
    "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
  };
  const res: string[] = [];
  const dfs = (i: number, cur: string): void => {
    if (i === digits.length) { res.push(cur); return; }
    for (const ch of map[digits[i]]) dfs(i + 1, cur + ch);
  };
  dfs(0, "");
  return res;
}`,
      },
    ],
    runner: {
      entry: "letterCombinations",
      comparison: "canonical",
      jsStarter: `function letterCombinations(digits) {
  // Return all keypad letter strings for the digit string.
  // TODO: implement
}`,
      jsReference: `function letterCombinations(digits) {
  if (digits.length === 0) return [];
  const map = {
    "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
    "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
  };
  const res = [];
  const dfs = (i, cur) => {
    if (i === digits.length) { res.push(cur); return; }
    for (const ch of map[digits[i]]) dfs(i + 1, cur + ch);
  };
  dfs(0, "");
  return res;
}`,
    },
    tests: [
      { name: "two digits", args: ["23"], expected: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"] },
      { name: "single digit", args: ["2"], expected: ["a", "b", "c"] },
      { name: "empty", args: [""], expected: [] },
    ],
    relatedIds: [39, 46, 22],
  },
  {
    id: 79,
    slug: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "DFS", "Grid"],
    companies: ["amazon", "microsoft", "meta", "google", "bloomberg"],
    frequency: 81,
    leetcodeUrl: "https://leetcode.com/problems/word-search/",
    description:
      "Given a grid of letters and a target word, decide whether the word can be spelled by stepping through adjacent (up/down/left/right) cells without reusing any cell.",
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" },
      { input: 'board = same, word = "ABCB"', output: "false" },
    ],
    intuition:
      "From every cell that matches the first letter, run a DFS that walks to neighbors matching the next letter. Temporarily mark the current cell as visited so a single path never reuses a square, then restore it when the branch unwinds so other paths can use it.",
    approach: [
      "Clone the board so repeated runs are safe, then for each cell start a DFS at word index 0.",
      "DFS succeeds once the index reaches the word length.",
      "Reject out-of-bounds cells or mismatched letters.",
      "Mark the cell, recurse into 4 neighbors, then restore the cell on the way back.",
    ],
    complexity: { time: "O(m·n·4^L)", space: "O(L)", note: "L = word length; recursion depth bounded by L." },
    solutions: [
      {
        language: "python",
        label: "DFS Backtracking",
        code: `def exist(board: list[list[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0]) if board else 0

    def dfs(r: int, c: int, i: int) -> bool:
        if i == len(word):
            return True
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[i]:
            return False
        tmp, board[r][c] = board[r][c], "#"
        found = (
            dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1)
            or dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1)
        )
        board[r][c] = tmp
        return found

    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False`,
      },
      {
        language: "typescript",
        label: "DFS Backtracking",
        code: `function exist(board: string[][], word: string): boolean {
  const rows = board.length, cols = board[0]?.length ?? 0;
  const dfs = (r: number, c: number, i: number): boolean => {
    if (i === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[i]) return false;
    const tmp = board[r][c];
    board[r][c] = "#";
    const found =
      dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    board[r][c] = tmp;
    return found;
  };
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (dfs(r, c, 0)) return true;
  return false;
}`,
      },
    ],
    runner: {
      entry: "exist",
      comparison: "deep",
      jsStarter: `function exist(board, word) {
  // Return true if word can be traced through adjacent cells.
  // TODO: implement
}`,
      jsReference: `function exist(input, word) {
  const board = input.map((row) => row.slice());
  const rows = board.length, cols = board[0]?.length ?? 0;
  const dfs = (r, c, i) => {
    if (i === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[i]) return false;
    const tmp = board[r][c];
    board[r][c] = "#";
    const found =
      dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    board[r][c] = tmp;
    return found;
  };
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (dfs(r, c, 0)) return true;
  return false;
}`,
    },
    tests: [
      { name: "diagonal-ish path", args: [[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED"], expected: true },
      { name: "down then left", args: [[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "SEE"], expected: true },
      { name: "no reuse path", args: [[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCB"], expected: false },
      { name: "single cell", args: [[["a"]], "a"], expected: true },
    ],
    relatedIds: [212, 200],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Graphs
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 207,
    slug: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["Topological Sort", "BFS", "Graph"],
    companies: ["amazon", "google", "meta", "microsoft", "bytedance"],
    frequency: 85,
    leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
    description:
      "You must take `numCourses` courses; each prerequisite pair [a, b] means b must be completed before a. Determine whether it is possible to finish all courses.",
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" },
    ],
    intuition:
      "Model courses as a directed graph (edge b → a). Finishing everything is possible exactly when the graph has no cycle. Kahn's topological sort repeatedly removes a node with no remaining prerequisites; if every node is removed, the graph is acyclic.",
    approach: [
      "Build adjacency lists and an in-degree count from the prerequisite edges.",
      "Seed a queue with every course of in-degree 0.",
      "Pop a course, count it, and decrement each dependent's in-degree, enqueuing any that reach 0.",
      "Return true iff the number of processed courses equals numCourses.",
    ],
    complexity: { time: "O(V + E)", space: "O(V + E)" },
    solutions: [
      {
        language: "python",
        label: "Kahn Topological Sort",
        code: `from collections import deque


def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    indeg = [0] * num_courses
    adj: list[list[int]] = [[] for _ in range(num_courses)]
    for a, b in prerequisites:
        adj[b].append(a)
        indeg[a] += 1
    queue = deque(i for i in range(num_courses) if indeg[i] == 0)
    seen = 0
    while queue:
        node = queue.popleft()
        seen += 1
        for nxt in adj[node]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                queue.append(nxt)
    return seen == num_courses`,
      },
      {
        language: "typescript",
        label: "Kahn Topological Sort",
        code: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const indeg = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
  let seen = 0;
  while (queue.length) {
    const node = queue.shift()!;
    seen++;
    for (const nxt of adj[node]) if (--indeg[nxt] === 0) queue.push(nxt);
  }
  return seen === numCourses;
}`,
      },
    ],
    runner: {
      entry: "canFinish",
      comparison: "deep",
      jsStarter: `function canFinish(numCourses, prerequisites) {
  // Return true if all courses can be completed.
  // TODO: implement
}`,
      jsReference: `function canFinish(numCourses, prerequisites) {
  const indeg = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
  let seen = 0;
  while (queue.length) {
    const node = queue.shift();
    seen++;
    for (const nxt of adj[node]) if (--indeg[nxt] === 0) queue.push(nxt);
  }
  return seen === numCourses;
}`,
    },
    tests: [
      { name: "simple chain", args: [2, [[1, 0]]], expected: true },
      { name: "two-cycle", args: [2, [[1, 0], [0, 1]]], expected: false },
      { name: "longer chain", args: [3, [[1, 0], [2, 1]]], expected: true },
      { name: "cycle in middle", args: [4, [[1, 0], [2, 1], [3, 2], [1, 3]]], expected: false },
    ],
    relatedIds: [210, 261, 994],
  },
  {
    id: 994,
    slug: "rotting-oranges",
    title: "Rotting Oranges",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["BFS", "Grid", "Multi-source BFS"],
    companies: ["amazon", "google", "microsoft", "meta"],
    frequency: 78,
    leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/",
    description:
      "In a grid of 0 (empty), 1 (fresh orange), and 2 (rotten orange), each minute every fresh orange adjacent to a rotten one turns rotten. Return the minutes until no fresh orange remains, or -1 if some can never rot.",
    examples: [
      { input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4" },
      { input: "grid = [[2,1,1],[0,1,1],[1,0,1]]", output: "-1" },
    ],
    intuition:
      "Rot spreads in waves outward from all rotten oranges simultaneously — a multi-source BFS. Enqueue every rotten orange as the level-0 frontier; each BFS level is one minute. The answer is the number of levels needed to reach every fresh orange; any fresh orange left untouched means -1.",
    approach: [
      "Clone the grid, count fresh oranges, and enqueue all rotten cells.",
      "BFS level by level: each level, rot every fresh neighbor and decrement the fresh count.",
      "Increment a minute counter once per level that actually rots something.",
      "Return the counter if no fresh remain, else -1.",
    ],
    complexity: { time: "O(m·n)", space: "O(m·n)" },
    solutions: [
      {
        language: "python",
        label: "Multi-source BFS",
        code: `from collections import deque


def oranges_rotting(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0]) if grid else 0
    queue: deque[tuple[int, int]] = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1
    minutes = 0
    dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    while queue and fresh > 0:
        minutes += 1
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    queue.append((nr, nc))
    return minutes if fresh == 0 else -1`,
      },
      {
        language: "typescript",
        label: "Multi-source BFS",
        code: `function orangesRotting(grid: number[][]): number {
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const queue: [number, number][] = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let minutes = 0;
  while (queue.length && fresh > 0) {
    minutes++;
    const size = queue.length;
    for (let k = 0; k < size; k++) {
      const [r, c] = queue.shift()!;
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] !== 1) continue;
        grid[nr][nc] = 2;
        fresh--;
        queue.push([nr, nc]);
      }
    }
  }
  return fresh === 0 ? minutes : -1;
}`,
      },
    ],
    runner: {
      entry: "orangesRotting",
      comparison: "deep",
      jsStarter: `function orangesRotting(grid) {
  // Return minutes until no fresh orange remains, or -1.
  // TODO: implement
}`,
      jsReference: `function orangesRotting(input) {
  const grid = input.map((row) => row.slice());
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const queue = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let minutes = 0;
  while (queue.length && fresh > 0) {
    minutes++;
    const size = queue.length;
    for (let k = 0; k < size; k++) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] !== 1) continue;
        grid[nr][nc] = 2;
        fresh--;
        queue.push([nr, nc]);
      }
    }
  }
  return fresh === 0 ? minutes : -1;
}`,
    },
    tests: [
      { name: "spreads in 4", args: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], expected: 4 },
      { name: "unreachable orange", args: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], expected: -1 },
      { name: "no fresh", args: [[[0, 2]]], expected: 0 },
    ],
    relatedIds: [286, 542, 207],
  },
  {
    id: 733,
    slug: "flood-fill",
    title: "Flood Fill",
    difficulty: "Easy",
    category: "graphs",
    patterns: ["DFS", "BFS", "Grid"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 65,
    leetcodeUrl: "https://leetcode.com/problems/flood-fill/",
    description:
      "Starting from a chosen pixel in an image, repaint that pixel and every 4-directionally connected pixel of the same original color with a new color, then return the updated image.",
    examples: [
      { input: "image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2", output: "[[2,2,2],[2,2,0],[2,0,1]]" },
      { input: "image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0", output: "[[0,0,0],[0,0,0]]" },
    ],
    intuition:
      "This is a connected-component repaint. Remember the start pixel's color, then DFS to every neighbor sharing that original color, switching it to the new color. Guard against the case where the new color equals the original — otherwise the recursion never terminates.",
    approach: [
      "Clone the image and read the start color.",
      "If the start color already equals the target color, return immediately.",
      "DFS from the start: recolor the cell, then recurse into the 4 neighbors that still hold the original color.",
    ],
    complexity: { time: "O(m·n)", space: "O(m·n)", note: "Recursion stack in the worst case." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def flood_fill(image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:
    start = image[sr][sc]
    if start == color:
        return image
    rows, cols = len(image), len(image[0])

    def dfs(r: int, c: int) -> None:
        if r < 0 or r >= rows or c < 0 or c >= cols or image[r][c] != start:
            return
        image[r][c] = color
        dfs(r + 1, c); dfs(r - 1, c)
        dfs(r, c + 1); dfs(r, c - 1)

    dfs(sr, sc)
    return image`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
  const start = image[sr][sc];
  if (start === color) return image;
  const rows = image.length, cols = image[0]?.length ?? 0;
  const dfs = (r: number, c: number): void => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || image[r][c] !== start) return;
    image[r][c] = color;
    dfs(r + 1, c); dfs(r - 1, c);
    dfs(r, c + 1); dfs(r, c - 1);
  };
  dfs(sr, sc);
  return image;
}`,
      },
    ],
    runner: {
      entry: "floodFill",
      comparison: "deep",
      jsStarter: `function floodFill(image, sr, sc, color) {
  // Repaint the connected same-color region and return the image.
  // TODO: implement
}`,
      jsReference: `function floodFill(input, sr, sc, color) {
  const image = input.map((row) => row.slice());
  const start = image[sr][sc];
  if (start === color) return image;
  const rows = image.length, cols = image[0]?.length ?? 0;
  const dfs = (r, c) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || image[r][c] !== start) return;
    image[r][c] = color;
    dfs(r + 1, c); dfs(r - 1, c);
    dfs(r, c + 1); dfs(r, c - 1);
  };
  dfs(sr, sc);
  return image;
}`,
    },
    tests: [
      { name: "center fill", args: [[[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2], expected: [[2, 2, 2], [2, 2, 0], [2, 0, 1]] },
      { name: "same color no-op", args: [[[0, 0, 0], [0, 0, 0]], 0, 0, 0], expected: [[0, 0, 0], [0, 0, 0]] },
      { name: "partial region", args: [[[0, 0, 0], [0, 1, 1]], 1, 1, 2], expected: [[0, 0, 0], [0, 2, 2]] },
    ],
    relatedIds: [200, 695, 994],
  },
  {
    id: 695,
    slug: "max-area-of-island",
    title: "Max Area of Island",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["DFS", "Grid", "Flood Fill"],
    companies: ["amazon", "google", "meta", "bloomberg"],
    frequency: 74,
    leetcodeUrl: "https://leetcode.com/problems/max-area-of-island/",
    description:
      "In a binary grid of 0 (water) and 1 (land), an island is a group of 1s connected up/down/left/right. Return the area (cell count) of the largest island, or 0 if there is none.",
    examples: [
      { input: "grid = [[1,1,0,0],[1,0,0,1],[0,0,1,1]]", output: "3" },
      { input: "grid = [[0,0,0],[0,0,0]]", output: "0" },
    ],
    intuition:
      "Each island is a connected component; its area is how many cells the flood fill visits. Walk the grid, and whenever you hit unvisited land, DFS to sink the whole island while counting cells, tracking the maximum count seen.",
    approach: [
      "Clone the grid so the input is preserved across runs.",
      "For each land cell, DFS that returns 1 + the areas of its four neighbors.",
      "Sink visited cells to 0 to avoid recounting.",
      "Track and return the largest area.",
    ],
    complexity: { time: "O(m·n)", space: "O(m·n)" },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def max_area_of_island(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0]) if grid else 0

    def dfs(r: int, c: int) -> int:
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != 1:
            return 0
        grid[r][c] = 0
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)

    best = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                best = max(best, dfs(r, c))
    return best`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function maxAreaOfIsland(grid: number[][]): number {
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const dfs = (r: number, c: number): number => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== 1) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };
  let best = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === 1) best = Math.max(best, dfs(r, c));
  return best;
}`,
      },
    ],
    runner: {
      entry: "maxAreaOfIsland",
      comparison: "deep",
      jsStarter: `function maxAreaOfIsland(grid) {
  // Return the area of the largest connected island.
  // TODO: implement
}`,
      jsReference: `function maxAreaOfIsland(input) {
  const grid = input.map((row) => row.slice());
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const dfs = (r, c) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== 1) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };
  let best = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === 1) best = Math.max(best, dfs(r, c));
  return best;
}`,
    },
    tests: [
      { name: "two equal islands", args: [[[1, 1, 0, 0], [1, 0, 0, 1], [0, 0, 1, 1]]], expected: 3 },
      { name: "all water", args: [[[0, 0, 0], [0, 0, 0]]], expected: 0 },
      { name: "single cell", args: [[[1]]], expected: 1 },
      { name: "h-shape", args: [[[1, 1, 1], [0, 1, 0], [1, 1, 1]]], expected: 7 },
    ],
    relatedIds: [200, 733, 463],
  },
  {
    id: 417,
    slug: "pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["DFS", "BFS", "Grid", "Multi-source"],
    companies: ["amazon", "google", "meta", "uber"],
    frequency: 71,
    leetcodeUrl: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    description:
      "Given a grid of cell heights, the Pacific borders the top and left edges and the Atlantic borders the bottom and right edges. Water flows from a cell to a neighbor of equal or lower height. Return every cell from which water can reach both oceans.",
    examples: [
      {
        input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
        output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
      },
    ],
    intuition:
      "Instead of asking which cells reach each ocean (expensive per cell), reverse the flow: start from the ocean border cells and climb to neighbors of equal or greater height. Run this from the Pacific edges and the Atlantic edges separately; cells reachable in both searches can drain to both oceans.",
    approach: [
      "Build two visited grids, one per ocean.",
      "DFS inland from the top/left edges marking Pacific-reachable cells, and from the bottom/right edges for the Atlantic, moving only to neighbors at the same height or higher.",
      "Collect every cell flagged in both grids.",
    ],
    complexity: { time: "O(m·n)", space: "O(m·n)" },
    solutions: [
      {
        language: "python",
        label: "Reverse DFS",
        code: `def pacific_atlantic(heights: list[list[int]]) -> list[list[int]]:
    if not heights or not heights[0]:
        return []
    rows, cols = len(heights), len(heights[0])
    pac = [[False] * cols for _ in range(rows)]
    atl = [[False] * cols for _ in range(rows)]

    def dfs(r: int, c: int, seen: list[list[bool]], prev: int) -> None:
        if r < 0 or r >= rows or c < 0 or c >= cols or seen[r][c] or heights[r][c] < prev:
            return
        seen[r][c] = True
        h = heights[r][c]
        dfs(r + 1, c, seen, h); dfs(r - 1, c, seen, h)
        dfs(r, c + 1, seen, h); dfs(r, c - 1, seen, h)

    for c in range(cols):
        dfs(0, c, pac, heights[0][c])
        dfs(rows - 1, c, atl, heights[rows - 1][c])
    for r in range(rows):
        dfs(r, 0, pac, heights[r][0])
        dfs(r, cols - 1, atl, heights[r][cols - 1])

    return [[r, c] for r in range(rows) for c in range(cols) if pac[r][c] and atl[r][c]]`,
      },
      {
        language: "typescript",
        label: "Reverse DFS",
        code: `function pacificAtlantic(heights: number[][]): number[][] {
  const rows = heights.length, cols = heights[0]?.length ?? 0;
  if (!rows || !cols) return [];
  const pac = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const atl = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const dfs = (r: number, c: number, seen: boolean[][], prev: number): void => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || seen[r][c] || heights[r][c] < prev) return;
    seen[r][c] = true;
    const h = heights[r][c];
    dfs(r + 1, c, seen, h); dfs(r - 1, c, seen, h);
    dfs(r, c + 1, seen, h); dfs(r, c - 1, seen, h);
  };
  for (let c = 0; c < cols; c++) {
    dfs(0, c, pac, heights[0][c]);
    dfs(rows - 1, c, atl, heights[rows - 1][c]);
  }
  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pac, heights[r][0]);
    dfs(r, cols - 1, atl, heights[r][cols - 1]);
  }
  const res: number[][] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
  return res;
}`,
      },
    ],
    runner: {
      entry: "pacificAtlantic",
      comparison: "canonical",
      jsStarter: `function pacificAtlantic(heights) {
  // Return all [r, c] cells that can drain to both oceans.
  // TODO: implement
}`,
      jsReference: `function pacificAtlantic(heights) {
  const rows = heights.length, cols = heights[0]?.length ?? 0;
  if (!rows || !cols) return [];
  const pac = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const atl = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const dfs = (r, c, seen, prev) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || seen[r][c] || heights[r][c] < prev) return;
    seen[r][c] = true;
    const h = heights[r][c];
    dfs(r + 1, c, seen, h); dfs(r - 1, c, seen, h);
    dfs(r, c + 1, seen, h); dfs(r, c - 1, seen, h);
  };
  for (let c = 0; c < cols; c++) {
    dfs(0, c, pac, heights[0][c]);
    dfs(rows - 1, c, atl, heights[rows - 1][c]);
  }
  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pac, heights[r][0]);
    dfs(r, cols - 1, atl, heights[r][cols - 1]);
  }
  const res = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
  return res;
}`,
    },
    tests: [
      {
        name: "classic 5x5",
        args: [[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]],
        expected: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]],
      },
      { name: "single cell", args: [[[1]]], expected: [[0, 0]] },
      { name: "all reach both", args: [[[2, 1], [1, 2]]], expected: [[0, 0], [0, 1], [1, 0], [1, 1]] },
    ],
    relatedIds: [200, 695, 130],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 1-D Dynamic Programming
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 300,
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Binary Search", "Patience Sorting"],
    companies: ["amazon", "google", "meta", "microsoft", "bloomberg"],
    frequency: 82,
    leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
    description:
      "Given an integer array, return the length of the longest strictly increasing subsequence (elements need not be contiguous).",
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4" },
      { input: "nums = [7,7,7,7]", output: "1" },
    ],
    intuition:
      "Keep a `tails` array where tails[k] is the smallest possible tail of any increasing subsequence of length k+1. For each number, binary-search the first tail that is not smaller than it and overwrite it (or append if the number extends every tail). The length of `tails` is the answer.",
    approach: [
      "Maintain an initially empty `tails` list.",
      "For each value x, binary-search for the leftmost tail ≥ x.",
      "If found, replace it with x (a smaller tail for that length); otherwise append x.",
      "Return the length of `tails`.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Patience + Binary Search",
        code: `from bisect import bisect_left


def length_of_lis(nums: list[int]) -> int:
    tails: list[int] = []
    for x in nums:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)`,
      },
      {
        language: "typescript",
        label: "Patience + Binary Search",
        code: `function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];
  for (const x of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x;
  }
  return tails.length;
}`,
      },
    ],
    runner: {
      entry: "lengthOfLIS",
      comparison: "deep",
      jsStarter: `function lengthOfLIS(nums) {
  // Return the length of the longest strictly increasing subsequence.
  // TODO: implement
}`,
      jsReference: `function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x;
  }
  return tails.length;
}`,
    },
    tests: [
      { name: "mixed", args: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },
      { name: "zigzag", args: [[0, 1, 0, 3, 2, 3]], expected: 4 },
      { name: "all equal", args: [[7, 7, 7, 7]], expected: 1 },
      { name: "single", args: [[1]], expected: 1 },
    ],
    relatedIds: [354, 673, 674],
  },
  {
    id: 139,
    slug: "word-break",
    title: "Word Break",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Hash Set"],
    companies: ["amazon", "google", "meta", "microsoft", "bloomberg"],
    frequency: 80,
    leetcodeUrl: "https://leetcode.com/problems/word-break/",
    description:
      "Given a string and a dictionary of words, decide whether the string can be segmented into a sequence of one or more dictionary words (words may be reused).",
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true" },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: "false" },
    ],
    intuition:
      "Let dp[i] mean 'the first i characters can be segmented'. dp[0] is true (empty prefix). The prefix of length i is breakable if some split point j exists where dp[j] is true and the substring s[j..i) is a dictionary word.",
    approach: [
      "Put the dictionary into a hash set for O(1) lookups.",
      "Create dp of length n+1 with dp[0] = true.",
      "For each end i, scan split points j < i; if dp[j] and s[j..i) is a word, set dp[i] = true and stop.",
      "Return dp[n].",
    ],
    complexity: { time: "O(n^2)", space: "O(n)", note: "Substring checks dominate." },
    solutions: [
      {
        language: "python",
        label: "DP",
        code: `def word_break(s: str, word_dict: list[str]) -> bool:
    words = set(word_dict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break
    return dp[n]`,
      },
      {
        language: "typescript",
        label: "DP",
        code: `function wordBreak(s: string, wordDict: string[]): boolean {
  const words = new Set(wordDict);
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && words.has(s.slice(j, i))) { dp[i] = true; break; }
    }
  }
  return dp[n];
}`,
      },
    ],
    runner: {
      entry: "wordBreak",
      comparison: "deep",
      jsStarter: `function wordBreak(s, wordDict) {
  // Return true if s splits into dictionary words.
  // TODO: implement
}`,
      jsReference: `function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && words.has(s.slice(j, i))) { dp[i] = true; break; }
    }
  }
  return dp[n];
}`,
    },
    tests: [
      { name: "two words", args: ["leetcode", ["leet", "code"]], expected: true },
      { name: "reuse word", args: ["applepenapple", ["apple", "pen"]], expected: true },
      { name: "cannot segment", args: ["catsandog", ["cats", "dog", "sand", "and", "cat"]], expected: false },
      { name: "single char", args: ["a", ["a"]], expected: true },
    ],
    relatedIds: [140, 300, 91],
  },
  {
    id: 152,
    slug: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming"],
    companies: ["amazon", "google", "microsoft", "linkedin"],
    frequency: 76,
    leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/",
    description:
      "Given an integer array, find the contiguous subarray with the largest product and return that product.",
    examples: [
      { input: "nums = [2,3,-2,4]", output: "6" },
      { input: "nums = [-2,3,-4]", output: "24" },
    ],
    intuition:
      "A negative number flips the sign, so today's minimum product can become tomorrow's maximum. Track both the running maximum and minimum product ending at the current index; at each step the new max/min is the best of x alone, x·prevMax, and x·prevMin.",
    approach: [
      "Initialize best, curMax, curMin to nums[0].",
      "For each later x, compute candidates x, curMax·x, curMin·x.",
      "Set curMax to the largest candidate and curMin to the smallest.",
      "Update best with curMax and return it.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Track Max & Min",
        code: `def max_product(nums: list[int]) -> int:
    best = cur_max = cur_min = nums[0]
    for x in nums[1:]:
        a, b = cur_max * x, cur_min * x
        cur_max = max(x, a, b)
        cur_min = min(x, a, b)
        best = max(best, cur_max)
    return best`,
      },
      {
        language: "typescript",
        label: "Track Max & Min",
        code: `function maxProduct(nums: number[]): number {
  let best = nums[0], curMax = nums[0], curMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const a = curMax * x, b = curMin * x;
    curMax = Math.max(x, a, b);
    curMin = Math.min(x, a, b);
    best = Math.max(best, curMax);
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "maxProduct",
      comparison: "deep",
      jsStarter: `function maxProduct(nums) {
  // Return the largest product of a contiguous subarray.
  // TODO: implement
}`,
      jsReference: `function maxProduct(nums) {
  let best = nums[0], curMax = nums[0], curMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const a = curMax * x, b = curMin * x;
    curMax = Math.max(x, a, b);
    curMin = Math.min(x, a, b);
    best = Math.max(best, curMax);
  }
  return best;
}`,
    },
    tests: [
      { name: "positive run", args: [[2, 3, -2, 4]], expected: 6 },
      { name: "zero resets", args: [[-2, 0, -1]], expected: 0 },
      { name: "two negatives", args: [[-2, 3, -4]], expected: 24 },
      { name: "single negative", args: [[-2]], expected: -2 },
    ],
    relatedIds: [53, 238, 198],
  },
  {
    id: 746,
    slug: "min-cost-climbing-stairs",
    title: "Min Cost Climbing Stairs",
    difficulty: "Easy",
    category: "dp-1d",
    patterns: ["Dynamic Programming"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/min-cost-climbing-stairs/",
    description:
      "Each step on a staircase has a cost; from a step you may climb one or two steps. Starting from either step 0 or step 1, return the minimum total cost to climb past the top.",
    examples: [
      { input: "cost = [10,15,20]", output: "15" },
      { input: "cost = [1,100,1,1,1,100,1,1,100,1]", output: "6" },
    ],
    intuition:
      "Let dp[i] be the cheapest cost to reach step i (the floor beyond the array is step n). Reaching step i means arriving from i-1 or i-2 and paying that step's cost: dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]). Two rolling variables suffice.",
    approach: [
      "Start with the cost to reach steps 0 and 1, both 0 (you may begin there free).",
      "Iterate i from 2 to n, taking the cheaper of arriving from one or two steps below plus that step's cost.",
      "Return the cost to reach step n (just past the last stair).",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Rolling DP",
        code: `def min_cost_climbing_stairs(cost: list[int]) -> int:
    n = len(cost)
    a = b = 0  # cost to reach step i-2 and i-1
    for i in range(2, n + 1):
        cur = min(b + cost[i - 1], a + cost[i - 2])
        a, b = b, cur
    return b`,
      },
      {
        language: "typescript",
        label: "Rolling DP",
        code: `function minCostClimbingStairs(cost: number[]): number {
  const n = cost.length;
  let a = 0, b = 0; // cost to reach step i-2 and i-1
  for (let i = 2; i <= n; i++) {
    const cur = Math.min(b + cost[i - 1], a + cost[i - 2]);
    a = b;
    b = cur;
  }
  return b;
}`,
      },
    ],
    runner: {
      entry: "minCostClimbingStairs",
      comparison: "deep",
      jsStarter: `function minCostClimbingStairs(cost) {
  // Return the minimum cost to climb past the top.
  // TODO: implement
}`,
      jsReference: `function minCostClimbingStairs(cost) {
  const n = cost.length;
  let a = 0, b = 0;
  for (let i = 2; i <= n; i++) {
    const cur = Math.min(b + cost[i - 1], a + cost[i - 2]);
    a = b;
    b = cur;
  }
  return b;
}`,
    },
    tests: [
      { name: "three steps", args: [[10, 15, 20]], expected: 15 },
      { name: "longer", args: [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]], expected: 6 },
      { name: "two free", args: [[0, 0]], expected: 0 },
      { name: "pick cheaper start", args: [[1, 2]], expected: 1 },
    ],
    relatedIds: [70, 198, 322],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2-D Dynamic Programming
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    slug: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Expand Around Center", "Two Pointers"],
    companies: ["amazon", "google", "meta", "microsoft", "adobe"],
    frequency: 83,
    leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
    description:
      "Given a string, return the longest contiguous substring that reads the same forward and backward.",
    examples: [
      { input: 's = "cbbd"', output: '"bb"' },
      { input: 's = "abccba"', output: '"abccba"' },
    ],
    intuition:
      "Every palindrome grows outward from a center. There are 2n-1 possible centers (each character and each gap between characters). Expand around each center while the two ends match, and keep the longest stretch found.",
    approach: [
      "For each index, expand around an odd center (i, i) and an even center (i, i+1).",
      "While the left and right characters match and stay in bounds, widen the window.",
      "Record the start and length whenever a longer palindrome appears.",
      "Return the recorded substring.",
    ],
    complexity: { time: "O(n^2)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Expand Around Center",
        code: `def longest_palindrome(s: str) -> str:
    if len(s) < 2:
        return s
    start, max_len = 0, 1

    def expand(l: int, r: int) -> None:
        nonlocal start, max_len
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        if r - l - 1 > max_len:
            max_len = r - l - 1
            start = l + 1

    for i in range(len(s)):
        expand(i, i)
        expand(i, i + 1)
    return s[start:start + max_len]`,
      },
      {
        language: "typescript",
        label: "Expand Around Center",
        code: `function longestPalindrome(s: string): string {
  if (s.length < 2) return s;
  let start = 0, maxLen = 1;
  const expand = (l: number, r: number): void => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > maxLen) { maxLen = r - l - 1; start = l + 1; }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(start, start + maxLen);
}`,
      },
    ],
    runner: {
      entry: "longestPalindrome",
      comparison: "deep",
      jsStarter: `function longestPalindrome(s) {
  // Return the longest palindromic substring.
  // TODO: implement
}`,
      jsReference: `function longestPalindrome(s) {
  if (s.length < 2) return s;
  let start = 0, maxLen = 1;
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > maxLen) { maxLen = r - l - 1; start = l + 1; }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(start, start + maxLen);
}`,
    },
    tests: [
      { name: "even palindrome", args: ["cbbd"], expected: "bb" },
      { name: "odd inside", args: ["bananas"], expected: "anana" },
      { name: "whole string", args: ["abccba"], expected: "abccba" },
      { name: "single char", args: ["a"], expected: "a" },
    ],
    relatedIds: [647, 516, 9],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Greedy
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 45,
    slug: "jump-game-ii",
    title: "Jump Game II",
    difficulty: "Medium",
    category: "greedy",
    patterns: ["Greedy", "BFS"],
    companies: ["amazon", "google", "meta", "microsoft"],
    frequency: 75,
    leetcodeUrl: "https://leetcode.com/problems/jump-game-ii/",
    description:
      "Given an array where each value is the maximum jump length from that position, return the minimum number of jumps needed to reach the last index (a solution is always possible).",
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "2" },
      { input: "nums = [2,3,0,1,4]", output: "2" },
    ],
    intuition:
      "Think of it as a level-by-level BFS over reachable ranges. While scanning, track the farthest index reachable so far. When you reach the end of the current jump's range, you must spend another jump and the new range extends to that farthest index.",
    approach: [
      "Track jumps, the end of the current jump window (curEnd), and the farthest reachable index.",
      "Iterate up to the second-to-last index, updating farthest = max(farthest, i + nums[i]).",
      "When i reaches curEnd, increment jumps and set curEnd = farthest.",
      "Return jumps.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Greedy Windows",
        code: `def jump(nums: list[int]) -> int:
    jumps = cur_end = farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = farthest
    return jumps`,
      },
      {
        language: "typescript",
        label: "Greedy Windows",
        code: `function jump(nums: number[]): number {
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curEnd) {
      jumps++;
      curEnd = farthest;
    }
  }
  return jumps;
}`,
      },
    ],
    runner: {
      entry: "jump",
      comparison: "deep",
      jsStarter: `function jump(nums) {
  // Return the minimum jumps to reach the last index.
  // TODO: implement
}`,
      jsReference: `function jump(nums) {
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curEnd) {
      jumps++;
      curEnd = farthest;
    }
  }
  return jumps;
}`,
    },
    tests: [
      { name: "two jumps", args: [[2, 3, 1, 1, 4]], expected: 2 },
      { name: "skip the zero", args: [[2, 3, 0, 1, 4]], expected: 2 },
      { name: "already there", args: [[0]], expected: 0 },
      { name: "small steps", args: [[1, 2, 3]], expected: 2 },
    ],
    relatedIds: [55, 1306],
  },
  {
    id: 134,
    slug: "gas-station",
    title: "Gas Station",
    difficulty: "Medium",
    category: "greedy",
    patterns: ["Greedy"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 72,
    leetcodeUrl: "https://leetcode.com/problems/gas-station/",
    description:
      "Around a circular route, station i gives gas[i] fuel and it costs cost[i] to drive to the next station. Return the starting station index from which you can complete the loop, or -1 if impossible. The answer is unique when it exists.",
    examples: [
      { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3" },
      { input: "gas = [2,3,4], cost = [3,4,3]", output: "-1" },
    ],
    intuition:
      "If the total gas is at least the total cost, a solution exists. Sweep once tracking the running tank; whenever it dips below zero, no station in the segment just covered can be a valid start, so restart the candidate at the next station with a fresh tank.",
    approach: [
      "Accumulate total = Σ(gas[i] - cost[i]) and a running tank.",
      "When the running tank goes negative, set the candidate start to i+1 and reset the tank to 0.",
      "If total ≥ 0, the recorded candidate start is the answer; otherwise return -1.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Greedy One Pass",
        code: `def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    total = tank = start = 0
    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total += diff
        tank += diff
        if tank < 0:
            start = i + 1
            tank = 0
    return start if total >= 0 else -1`,
      },
      {
        language: "typescript",
        label: "Greedy One Pass",
        code: `function canCompleteCircuit(gas: number[], cost: number[]): number {
  let total = 0, tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return total >= 0 ? start : -1;
}`,
      },
    ],
    runner: {
      entry: "canCompleteCircuit",
      comparison: "deep",
      jsStarter: `function canCompleteCircuit(gas, cost) {
  // Return a valid starting index, or -1.
  // TODO: implement
}`,
      jsReference: `function canCompleteCircuit(gas, cost) {
  let total = 0, tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return total >= 0 ? start : -1;
}`,
    },
    tests: [
      { name: "start at 3", args: [[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]], expected: 3 },
      { name: "impossible", args: [[2, 3, 4], [3, 4, 3]], expected: -1 },
      { name: "start at 4", args: [[5, 1, 2, 3, 4], [4, 4, 1, 5, 1]], expected: 4 },
    ],
    relatedIds: [55, 45],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Intervals
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 57,
    slug: "insert-interval",
    title: "Insert Interval",
    difficulty: "Medium",
    category: "intervals",
    patterns: ["Intervals", "Greedy"],
    companies: ["amazon", "google", "meta", "microsoft", "linkedin"],
    frequency: 74,
    leetcodeUrl: "https://leetcode.com/problems/insert-interval/",
    description:
      "Given a list of non-overlapping intervals sorted by start and a new interval, insert it and merge any overlaps so the result stays sorted and non-overlapping.",
    examples: [
      { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" },
      { input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]", output: "[[1,2],[3,10],[12,16]]" },
    ],
    intuition:
      "Because the input is already sorted, sweep left to right in three phases: copy intervals that end before the new one starts, merge every interval that overlaps the new one into a single widened interval, then copy the rest.",
    approach: [
      "Append all intervals ending before newInterval starts.",
      "While the current interval starts at or before the (growing) new end, merge by taking min start and max end.",
      "Push the merged interval, then append all remaining intervals.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Three-phase sweep",
        code: `def insert(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:
    res: list[list[int]] = []
    ns, ne = new_interval
    i, n = 0, len(intervals)
    while i < n and intervals[i][1] < ns:
        res.append(intervals[i])
        i += 1
    while i < n and intervals[i][0] <= ne:
        ns = min(ns, intervals[i][0])
        ne = max(ne, intervals[i][1])
        i += 1
    res.append([ns, ne])
    while i < n:
        res.append(intervals[i])
        i += 1
    return res`,
      },
      {
        language: "typescript",
        label: "Three-phase sweep",
        code: `function insert(intervals: number[][], newInterval: number[]): number[][] {
  const res: number[][] = [];
  let [ns, ne] = newInterval;
  let i = 0;
  const n = intervals.length;
  while (i < n && intervals[i][1] < ns) res.push(intervals[i++]);
  while (i < n && intervals[i][0] <= ne) {
    ns = Math.min(ns, intervals[i][0]);
    ne = Math.max(ne, intervals[i][1]);
    i++;
  }
  res.push([ns, ne]);
  while (i < n) res.push(intervals[i++]);
  return res;
}`,
      },
    ],
    runner: {
      entry: "insert",
      comparison: "deep",
      jsStarter: `function insert(intervals, newInterval) {
  // Insert newInterval and merge overlaps.
  // TODO: implement
}`,
      jsReference: `function insert(intervals, newInterval) {
  const res = [];
  let ns = newInterval[0], ne = newInterval[1];
  let i = 0;
  const n = intervals.length;
  while (i < n && intervals[i][1] < ns) res.push(intervals[i++]);
  while (i < n && intervals[i][0] <= ne) {
    ns = Math.min(ns, intervals[i][0]);
    ne = Math.max(ne, intervals[i][1]);
    i++;
  }
  res.push([ns, ne]);
  while (i < n) res.push(intervals[i++]);
  return res;
}`,
    },
    tests: [
      { name: "merge one", args: [[[1, 3], [6, 9]], [2, 5]], expected: [[1, 5], [6, 9]] },
      { name: "merge several", args: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]], expected: [[1, 2], [3, 10], [12, 16]] },
      { name: "empty list", args: [[], [5, 7]], expected: [[5, 7]] },
      { name: "contained", args: [[[1, 5]], [2, 3]], expected: [[1, 5]] },
    ],
    relatedIds: [56, 435, 252],
  },
  {
    id: 435,
    slug: "non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    category: "intervals",
    patterns: ["Intervals", "Greedy"],
    companies: ["amazon", "google", "meta", "bloomberg"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/",
    description:
      "Given a set of intervals, return the minimum number you must remove so that none of the remaining intervals overlap.",
    examples: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1" },
      { input: "intervals = [[1,2],[1,2],[1,2]]", output: "2" },
    ],
    intuition:
      "Keeping the maximum number of non-overlapping intervals is the classic activity-selection problem: always keep the interval that finishes earliest, leaving the most room for the rest. Sort by end time; whenever the next interval starts before the last kept one ends, it must be removed.",
    approach: [
      "Sort intervals by end coordinate.",
      "Track the end of the last interval kept (start with the first).",
      "For each later interval, if its start is before the tracked end, count a removal; otherwise update the tracked end.",
      "Return the removal count.",
    ],
    complexity: { time: "O(n log n)", space: "O(1)", note: "Dominated by the sort." },
    solutions: [
      {
        language: "python",
        label: "Greedy by End",
        code: `def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    if not intervals:
        return 0
    intervals.sort(key=lambda iv: iv[1])
    end = intervals[0][1]
    removed = 0
    for i in range(1, len(intervals)):
        if intervals[i][0] < end:
            removed += 1
        else:
            end = intervals[i][1]
    return removed`,
      },
      {
        language: "typescript",
        label: "Greedy by End",
        code: `function eraseOverlapIntervals(intervals: number[][]): number {
  if (intervals.length === 0) return 0;
  const arr = [...intervals].sort((a, b) => a[1] - b[1]);
  let end = arr[0][1], removed = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][0] < end) removed++;
    else end = arr[i][1];
  }
  return removed;
}`,
      },
    ],
    runner: {
      entry: "eraseOverlapIntervals",
      comparison: "deep",
      jsStarter: `function eraseOverlapIntervals(intervals) {
  // Return the min removals to make intervals non-overlapping.
  // TODO: implement
}`,
      jsReference: `function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;
  const arr = intervals.slice().sort((a, b) => a[1] - b[1]);
  let end = arr[0][1], removed = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][0] < end) removed++;
    else end = arr[i][1];
  }
  return removed;
}`,
    },
    tests: [
      { name: "remove one", args: [[[1, 2], [2, 3], [3, 4], [1, 3]]], expected: 1 },
      { name: "duplicates", args: [[[1, 2], [1, 2], [1, 2]]], expected: 2 },
      { name: "already clean", args: [[[1, 2], [2, 3]]], expected: 0 },
      { name: "nested overlaps", args: [[[1, 100], [11, 22], [1, 11], [2, 12]]], expected: 2 },
    ],
    relatedIds: [56, 57, 452],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Math & Geometry
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 54,
    slug: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Matrix", "Simulation"],
    companies: ["amazon", "google", "meta", "microsoft", "apple"],
    frequency: 78,
    leetcodeUrl: "https://leetcode.com/problems/spiral-matrix/",
    description:
      "Given an m × n matrix, return all of its elements in spiral order, starting from the top-left and moving clockwise inward.",
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" },
      { input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", output: "[1,2,3,4,8,12,11,10,9,5,6,7]" },
    ],
    intuition:
      "Peel the matrix like an onion. Maintain four shrinking boundaries — top, bottom, left, right. Each loop walks the top row left-to-right, the right column top-to-bottom, then (if rows/cols remain) the bottom row and left column, tightening the boundary after each edge.",
    approach: [
      "Initialize top, bottom, left, right boundaries.",
      "While top ≤ bottom and left ≤ right: traverse the top row, then increment top.",
      "Traverse the right column, then decrement right.",
      "If rows remain, traverse the bottom row and decrement bottom; if cols remain, traverse the left column and increment left.",
    ],
    complexity: { time: "O(m·n)", space: "O(1)", note: "Excluding the output array." },
    solutions: [
      {
        language: "python",
        label: "Boundary Peel",
        code: `def spiral_order(matrix: list[list[int]]) -> list[int]:
    if not matrix:
        return []
    res: list[int] = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            res.append(matrix[top][c])
        top += 1
        for r in range(top, bottom + 1):
            res.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1):
                res.append(matrix[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1):
                res.append(matrix[r][left])
            left += 1
    return res`,
      },
      {
        language: "typescript",
        label: "Boundary Peel",
        code: `function spiralOrder(matrix: number[][]): number[] {
  const res: number[] = [];
  if (matrix.length === 0) return res;
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "spiralOrder",
      comparison: "deep",
      jsStarter: `function spiralOrder(matrix) {
  // Return the matrix elements in clockwise spiral order.
  // TODO: implement
}`,
      jsReference: `function spiralOrder(matrix) {
  const res = [];
  if (matrix.length === 0) return res;
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}`,
    },
    tests: [
      { name: "3x3", args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
      { name: "3x4", args: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]], expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7] },
      { name: "single cell", args: [[[1]]], expected: [1] },
      { name: "2x2", args: [[[1, 2], [3, 4]]], expected: [1, 2, 4, 3] },
    ],
    relatedIds: [59, 48, 73],
  },
];

export default batchD;
