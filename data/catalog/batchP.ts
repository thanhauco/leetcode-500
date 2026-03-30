import type { Problem } from "../types.ts";

/**
 * Catalog batch P — heap, backtracking, and grid-graph problems.
 *
 * Grid problems clone their board before mutating so repeated test runs stay
 * deterministic. Problems whose answer may legitimately vary in order use
 * `comparison: "canonical"` (deep equality after recursively sorting arrays).
 */
export const batchP: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Heap / Priority Queue
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 502,
    slug: "ipo",
    title: "IPO",
    difficulty: "Hard",
    category: "heap-priority-queue",
    patterns: ["Greedy", "Two Heaps", "Sorting"],
    companies: ["amazon", "google", "meta", "bloomberg"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/ipo/",
    description:
      "You may launch at most `k` projects starting from capital `w`. A project can only be started once you can afford its capital requirement, and finishing it adds its profit to your capital. Return the maximum capital reachable after picking up to `k` projects.",
    examples: [
      {
        input: "k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]",
        output: "4",
        explanation: "Start project 0 (capital 1), then the project paying 3 → 0 + 1 + 3 = 4.",
      },
      { input: "k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]", output: "6" },
    ],
    intuition:
      "Each round you may start any project you can currently afford, so it is always best to take the single most profitable affordable one. Sort projects by their capital requirement, and as your capital grows, push every newly-affordable profit into a max-heap. Popping the largest profit `k` times is optimal because picking a smaller profit now can never unlock more options than picking the larger one.",
    approach: [
      "Pair each project as (capital, profit) and sort ascending by capital.",
      "Maintain a max-heap of profits for all projects whose capital ≤ current w.",
      "Repeat up to k times: add every project now affordable into the heap, then pop the max profit and add it to w.",
      "Stop early if the heap is empty (nothing affordable). Return w.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)", note: "Sort plus heap pushes/pops over n projects." },
    solutions: [
      {
        language: "python",
        label: "Greedy + max-heap",
        code: `import heapq

def find_maximized_capital(k: int, w: int, profits: list[int], capital: list[int]) -> int:
    projects = sorted(zip(capital, profits))
    heap: list[int] = []
    i = 0
    for _ in range(k):
        while i < len(projects) and projects[i][0] <= w:
            heapq.heappush(heap, -projects[i][1])
            i += 1
        if not heap:
            break
        w -= heapq.heappop(heap)
    return w`,
      },
      {
        language: "typescript",
        label: "Greedy + max-heap",
        code: `function findMaximizedCapital(
  k: number,
  w: number,
  profits: number[],
  capital: number[],
): number {
  const n = profits.length;
  const order = [...Array(n).keys()].sort((a, b) => capital[a] - capital[b]);
  const heap: number[] = []; // binary max-heap of affordable profits
  const push = (x: number): void => {
    heap.push(x);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p] >= heap[i]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = (): number => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      const m = heap.length;
      while (true) {
        let big = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < m && heap[l] > heap[big]) big = l;
        if (r < m && heap[r] > heap[big]) big = r;
        if (big === i) break;
        [heap[big], heap[i]] = [heap[i], heap[big]];
        i = big;
      }
    }
    return top;
  };
  let p = 0;
  for (let t = 0; t < k; t++) {
    while (p < n && capital[order[p]] <= w) push(profits[order[p++]]);
    if (heap.length === 0) break;
    w += pop();
  }
  return w;
}`,
      },
    ],
    runner: {
      entry: "findMaximizedCapital",
      comparison: "deep",
      jsStarter: `function findMaximizedCapital(k, w, profits, capital) {
  // Pick up to k affordable projects to maximize final capital.
  // TODO: implement
}`,
      jsReference: `function findMaximizedCapital(k, w, profits, capital) {
  const n = profits.length;
  const order = [...Array(n).keys()].sort((a, b) => capital[a] - capital[b]);
  const heap = [];
  const push = (x) => {
    heap.push(x);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p] >= heap[i]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = () => {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      const m = heap.length;
      while (true) {
        let big = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < m && heap[l] > heap[big]) big = l;
        if (r < m && heap[r] > heap[big]) big = r;
        if (big === i) break;
        [heap[big], heap[i]] = [heap[i], heap[big]];
        i = big;
      }
    }
    return top;
  };
  let p = 0;
  for (let t = 0; t < k; t++) {
    while (p < n && capital[order[p]] <= w) push(profits[order[p++]]);
    if (heap.length === 0) break;
    w += pop();
  }
  return w;
}`,
    },
    tests: [
      { name: "two picks", args: [2, 0, [1, 2, 3], [0, 1, 1]], expected: 4 },
      { name: "three picks", args: [3, 0, [1, 2, 3], [0, 1, 2]], expected: 6 },
      { name: "all affordable", args: [1, 2, [1, 2, 3], [1, 1, 2]], expected: 5 },
      { name: "none affordable", args: [2, 0, [5], [3]], expected: 0 },
    ],
    hints: ["Among affordable projects, why is the most profitable always best?", "Two structures: sorted-by-capital list and a max-heap of profits."],
    relatedIds: [253, 1383],
  },
  {
    id: 373,
    slug: "find-k-pairs-with-smallest-sums",
    title: "Find K Pairs with Smallest Sums",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Heap", "K-way Merge"],
    companies: ["amazon", "google", "linkedin", "uber"],
    frequency: 45,
    leetcodeUrl: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
    description:
      "Given two ascending integer arrays `nums1` and `nums2`, form pairs `(u, v)` with `u` from the first and `v` from the second. Return the `k` pairs whose sums are the smallest.",
    examples: [
      {
        input: "nums1 = [1,7,11], nums2 = [2,4,6], k = 3",
        output: "[[1,2],[1,4],[1,6]]",
        explanation: "Sums 3, 5, 7 are the three smallest.",
      },
      { input: "nums1 = [1,1,2], nums2 = [1,2,3], k = 2", output: "[[1,1],[1,1]]" },
    ],
    intuition:
      "Because both arrays are sorted, the very smallest pair must be `(nums1[0], nums2[0])`. Seed a min-heap with the first column `(nums1[i], nums2[0])`, and each time you pop a pair `(i, j)` push its right neighbor `(i, j+1)`. This explores candidate sums in increasing order without generating all n·m pairs.",
    approach: [
      "Edge case: if either array is empty or k ≤ 0, return [].",
      "Push (sum, i, 0) for i in 0..min(len(nums1), k)-1 into a min-heap keyed on sum.",
      "Pop the smallest pair, record [nums1[i], nums2[j]], and push (sum, i, j+1) if j+1 is in range.",
      "Repeat until k pairs are collected or the heap empties.",
    ],
    complexity: { time: "O(k log k)", space: "O(k)", note: "Heap holds at most k candidate pairs at a time." },
    solutions: [
      {
        language: "python",
        label: "Min-heap of frontier",
        code: `import heapq

def k_smallest_pairs(nums1: list[int], nums2: list[int], k: int) -> list[list[int]]:
    if not nums1 or not nums2 or k <= 0:
        return []
    heap: list[tuple[int, int, int]] = []
    for i in range(min(len(nums1), k)):
        heapq.heappush(heap, (nums1[i] + nums2[0], i, 0))
    res: list[list[int]] = []
    while heap and len(res) < k:
        _, i, j = heapq.heappop(heap)
        res.append([nums1[i], nums2[j]])
        if j + 1 < len(nums2):
            heapq.heappush(heap, (nums1[i] + nums2[j + 1], i, j + 1))
    return res`,
      },
      {
        language: "typescript",
        label: "Min-heap of frontier",
        code: `function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
  const res: number[][] = [];
  if (!nums1.length || !nums2.length || k <= 0) return res;
  const heap: [number, number, number][] = []; // [sum, i, j]
  const push = (node: [number, number, number]): void => {
    heap.push(node);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = (): [number, number, number] => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      const m = heap.length;
      while (true) {
        let sm = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < m && heap[l][0] < heap[sm][0]) sm = l;
        if (r < m && heap[r][0] < heap[sm][0]) sm = r;
        if (sm === i) break;
        [heap[sm], heap[i]] = [heap[i], heap[sm]];
        i = sm;
      }
    }
    return top;
  };
  for (let i = 0; i < Math.min(nums1.length, k); i++) push([nums1[i] + nums2[0], i, 0]);
  while (heap.length && res.length < k) {
    const [, i, j] = pop();
    res.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) push([nums1[i] + nums2[j + 1], i, j + 1]);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "kSmallestPairs",
      comparison: "canonical",
      jsStarter: `function kSmallestPairs(nums1, nums2, k) {
  // Return the k pairs with the smallest sums.
  // TODO: implement
}`,
      jsReference: `function kSmallestPairs(nums1, nums2, k) {
  const res = [];
  if (!nums1.length || !nums2.length || k <= 0) return res;
  const heap = [];
  const push = (node) => {
    heap.push(node);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = () => {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      const m = heap.length;
      while (true) {
        let sm = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < m && heap[l][0] < heap[sm][0]) sm = l;
        if (r < m && heap[r][0] < heap[sm][0]) sm = r;
        if (sm === i) break;
        [heap[sm], heap[i]] = [heap[i], heap[sm]];
        i = sm;
      }
    }
    return top;
  };
  for (let i = 0; i < Math.min(nums1.length, k); i++) push([nums1[i] + nums2[0], i, 0]);
  while (heap.length && res.length < k) {
    const [, i, j] = pop();
    res.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) push([nums1[i] + nums2[j + 1], i, j + 1]);
  }
  return res;
}`,
    },
    tests: [
      { name: "distinct sums", args: [[1, 7, 11], [2, 4, 6], 3], expected: [[1, 2], [1, 4], [1, 6]] },
      { name: "duplicate pairs", args: [[1, 1, 2], [1, 2, 3], 2], expected: [[1, 1], [1, 1]] },
      { name: "k exceeds total", args: [[1, 2], [3], 3], expected: [[1, 3], [2, 3]] },
      { name: "single each", args: [[1], [2], 1], expected: [[1, 2]] },
    ],
    hints: ["The global minimum pair is always (nums1[0], nums2[0]).", "When you pop (i, j), only (i, j+1) becomes a new candidate."],
    relatedIds: [378, 264, 23],
  },
  {
    id: 1985,
    slug: "find-the-kth-largest-integer-in-the-array",
    title: "Find the Kth Largest Integer in the Array",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Sorting", "Custom Comparator", "Heap"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array/",
    description:
      "You are given an array `nums` where each entry is a non-negative integer written as a string with no leading zeros. Return the `k`-th largest of these integers, again as a string.",
    examples: [
      {
        input: 'nums = ["3","6","7","10"], k = 4',
        output: '"3"',
        explanation: "Ordered largest→smallest: 10, 7, 6, 3 — the 4th is 3.",
      },
      { input: 'nums = ["2","21","12","1"], k = 3', output: '"2"' },
    ],
    intuition:
      "Numeric magnitude for strings without leading zeros is decided first by length (longer means larger) and, when lengths tie, by ordinary lexicographic order. Sorting with that two-level key gives true numeric order; the k-th largest is the element k positions from the end.",
    approach: [
      "Sort a copy ascending using the key (length, lexicographic string).",
      "Because there are no leading zeros, equal length implies lexicographic order equals numeric order.",
      "Return the element at index n - k.",
    ],
    complexity: { time: "O(n log n · L)", space: "O(n)", note: "L is the maximum string length compared per step." },
    solutions: [
      {
        language: "python",
        label: "Length-then-lex sort",
        code: `def kth_largest_number(nums: list[str], k: int) -> str:
    nums.sort(key=lambda s: (len(s), s))
    return nums[len(nums) - k]`,
      },
      {
        language: "typescript",
        label: "Length-then-lex sort",
        code: `function kthLargestNumber(nums: string[], k: number): string {
  const sorted = [...nums].sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    return a < b ? -1 : a > b ? 1 : 0;
  });
  return sorted[sorted.length - k];
}`,
      },
    ],
    runner: {
      entry: "kthLargestNumber",
      comparison: "deep",
      jsStarter: `function kthLargestNumber(nums, k) {
  // Return the kth largest numeric string.
  // TODO: implement
}`,
      jsReference: `function kthLargestNumber(nums, k) {
  const sorted = [...nums].sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    return a < b ? -1 : a > b ? 1 : 0;
  });
  return sorted[sorted.length - k];
}`,
    },
    tests: [
      { name: "smallest wanted", args: [["3", "6", "7", "10"], 4], expected: "3" },
      { name: "mixed lengths", args: [["2", "21", "12", "1"], 3], expected: "2" },
      { name: "all equal", args: [["0", "0"], 2], expected: "0" },
      { name: "largest wanted", args: [["100", "99", "9999"], 1], expected: "9999" },
    ],
    hints: ["Comparing as raw strings is wrong: \"9\" > \"100\" lexicographically.", "Compare by length first, then lexicographically."],
    relatedIds: [215],
  },
  {
    id: 506,
    slug: "relative-ranks",
    title: "Relative Ranks",
    difficulty: "Easy",
    category: "heap-priority-queue",
    patterns: ["Sorting", "Indirect Sort"],
    companies: ["amazon", "google"],
    frequency: 30,
    leetcodeUrl: "https://leetcode.com/problems/relative-ranks/",
    description:
      "Each athlete has a distinct score. The top three scores earn the labels \"Gold Medal\", \"Silver Medal\", and \"Bronze Medal\"; everyone else gets their placement as a string (4th place → \"4\"). Return the label for each athlete in original order.",
    examples: [
      {
        input: "score = [5,4,3,2,1]",
        output: '["Gold Medal","Silver Medal","Bronze Medal","4","5"]',
        explanation: "Already sorted descending, so positions map directly.",
      },
      { input: "score = [10,3,8,9,4]", output: '["Gold Medal","5","Bronze Medal","Silver Medal","4"]' },
    ],
    intuition:
      "Ranks come from sorting scores in descending order, but the output must stay in the athletes' original positions. Sort the indices by score instead of the scores themselves; the rank of each index is its position in that sorted order, which you then write back into the answer at that original index.",
    approach: [
      "Build an index list and sort it by descending score.",
      "Walk the sorted indices; rank 0/1/2 map to the three medals, otherwise use str(rank + 1).",
      "Assign each label to the answer at its original index.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)", note: "Sorting the index array dominates." },
    solutions: [
      {
        language: "python",
        label: "Indirect sort",
        code: `def find_relative_ranks(score: list[int]) -> list[str]:
    order = sorted(range(len(score)), key=lambda i: -score[i])
    medals = ["Gold Medal", "Silver Medal", "Bronze Medal"]
    res = [""] * len(score)
    for rank, i in enumerate(order):
        res[i] = medals[rank] if rank < 3 else str(rank + 1)
    return res`,
      },
      {
        language: "typescript",
        label: "Indirect sort",
        code: `function findRelativeRanks(score: number[]): string[] {
  const n = score.length;
  const order = [...Array(n).keys()].sort((a, b) => score[b] - score[a]);
  const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];
  const res: string[] = new Array(n);
  for (let r = 0; r < n; r++) {
    res[order[r]] = r < 3 ? medals[r] : String(r + 1);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "findRelativeRanks",
      comparison: "deep",
      jsStarter: `function findRelativeRanks(score) {
  // Return each athlete's medal or placement string.
  // TODO: implement
}`,
      jsReference: `function findRelativeRanks(score) {
  const n = score.length;
  const order = [...Array(n).keys()].sort((a, b) => score[b] - score[a]);
  const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];
  const res = new Array(n);
  for (let r = 0; r < n; r++) {
    res[order[r]] = r < 3 ? medals[r] : String(r + 1);
  }
  return res;
}`,
    },
    tests: [
      { name: "sorted desc", args: [[5, 4, 3, 2, 1]], expected: ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"] },
      { name: "scrambled", args: [[10, 3, 8, 9, 4]], expected: ["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"] },
      { name: "single athlete", args: [[1]], expected: ["Gold Medal"] },
      { name: "two athletes", args: [[2, 1]], expected: ["Gold Medal", "Silver Medal"] },
    ],
    hints: ["Sort indices, not values, so you can write ranks back in place.", "Only the first three ranks become medal strings."],
    relatedIds: [347],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Backtracking
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 37,
    slug: "sudoku-solver",
    title: "Sudoku Solver",
    difficulty: "Hard",
    category: "backtracking",
    patterns: ["Backtracking", "Constraint Propagation"],
    companies: ["amazon", "google", "microsoft", "uber"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/sudoku-solver/",
    description:
      "Fill every empty cell (marked '.') of a 9×9 Sudoku board so that each row, each column, and each of the nine 3×3 boxes contains the digits 1–9 exactly once. The board is guaranteed to have a unique solution; return the completed board.",
    examples: [
      {
        input: "board with a handful of '.' cells",
        output: "the fully filled 9×9 board",
        explanation: "Each blank is forced by the digits already present in its row, column, and box.",
      },
    ],
    intuition:
      "Scan for the first empty cell and try every digit 1–9 that does not clash with its row, column, or 3×3 box. Recurse; if the rest of the board cannot be completed, undo the guess and try the next digit. Because the puzzle has a unique solution, the search settles on exactly one completed board.",
    approach: [
      "Clone the board so the input is never mutated.",
      "Find the first '.' cell; for each digit, check the row, column, and enclosing 3×3 box for conflicts.",
      "Place a valid digit and recurse; on failure reset the cell and continue.",
      "When no empty cell remains the board is solved — return the clone.",
    ],
    complexity: { time: "O(9^m)", space: "O(m)", note: "m is the number of blanks; pruning makes practical cases fast." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def solve_sudoku(board: list[list[str]]) -> list[list[str]]:
    g = [row[:] for row in board]

    def valid(r: int, c: int, ch: str) -> bool:
        for i in range(9):
            if g[r][i] == ch or g[i][c] == ch:
                return False
            if g[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch:
                return False
        return True

    def solve() -> bool:
        for r in range(9):
            for c in range(9):
                if g[r][c] == '.':
                    for ch in '123456789':
                        if valid(r, c, ch):
                            g[r][c] = ch
                            if solve():
                                return True
                            g[r][c] = '.'
                    return False
        return True

    solve()
    return g`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function solveSudoku(board: string[][]): string[][] {
  const g = board.map((row) => row.slice());
  const valid = (r: number, c: number, ch: string): boolean => {
    for (let i = 0; i < 9; i++) {
      if (g[r][i] === ch || g[i][c] === ch) return false;
      const br = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const bc = 3 * Math.floor(c / 3) + (i % 3);
      if (g[br][bc] === ch) return false;
    }
    return true;
  };
  const solve = (): boolean => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (g[r][c] === ".") {
          for (let d = 1; d <= 9; d++) {
            const ch = String(d);
            if (valid(r, c, ch)) {
              g[r][c] = ch;
              if (solve()) return true;
              g[r][c] = ".";
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  solve();
  return g;
}`,
      },
    ],
    runner: {
      entry: "solveSudoku",
      comparison: "deep",
      jsStarter: `function solveSudoku(board) {
  // Return the completed 9x9 board (do not mutate the input).
  // TODO: implement
}`,
      jsReference: `function solveSudoku(board) {
  const g = board.map((row) => row.slice());
  const valid = (r, c, ch) => {
    for (let i = 0; i < 9; i++) {
      if (g[r][i] === ch || g[i][c] === ch) return false;
      const br = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const bc = 3 * Math.floor(c / 3) + (i % 3);
      if (g[br][bc] === ch) return false;
    }
    return true;
  };
  const solve = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (g[r][c] === ".") {
          for (let d = 1; d <= 9; d++) {
            const ch = String(d);
            if (valid(r, c, ch)) {
              g[r][c] = ch;
              if (solve()) return true;
              g[r][c] = ".";
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  solve();
  return g;
}`,
    },
    tests: [
      {
        name: "four forced blanks",
        args: [
          [
            [".", "3", "4", "6", "7", "8", "9", "1", "2"],
            ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
            ["1", "9", ".", "3", "4", "2", "5", "6", "7"],
            ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
            ["4", "2", "6", "8", ".", "3", "7", "9", "1"],
            ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
            ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
            ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
            ["3", "4", "5", "2", "8", "6", "1", "7", "."],
          ],
        ],
        expected: [
          ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
          ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
          ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
          ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
          ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
          ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
          ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
          ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
          ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
        ],
      },
      {
        name: "already solved",
        args: [
          [
            ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
            ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
            ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
            ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
            ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
            ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
            ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
            ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
            ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
          ],
        ],
        expected: [
          ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
          ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
          ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
          ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
          ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
          ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
          ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
          ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
          ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
        ],
      },
      {
        name: "two-blank row",
        args: [
          [
            [".", ".", "4", "6", "7", "8", "9", "1", "2"],
            ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
            ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
            ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
            ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
            ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
            ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
            ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
            ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
          ],
        ],
        expected: [
          ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
          ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
          ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
          ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
          ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
          ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
          ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
          ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
          ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
        ],
      },
    ],
    hints: ["Validate a digit against its row, column, and 3×3 box before placing it.", "Undo a placement when the recursion below it fails."],
    relatedIds: [36, 51],
  },
  {
    id: 526,
    slug: "beautiful-arrangement",
    title: "Beautiful Arrangement",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "Permutations"],
    companies: ["google", "amazon"],
    frequency: 34,
    leetcodeUrl: "https://leetcode.com/problems/beautiful-arrangement/",
    description:
      "Count the permutations of the numbers 1 through `n` such that, for every position `i` (1-indexed), either the value placed there is divisible by `i` or `i` is divisible by that value.",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "[1,2] and [2,1] both satisfy the divisibility rule at every position.",
      },
      { input: "n = 1", output: "1" },
    ],
    intuition:
      "Build the arrangement position by position. At position `pos`, only the unused values `v` with `v % pos == 0` or `pos % v == 0` are legal, which prunes most branches early. Counting how many ways every position can be filled to the end gives the total number of beautiful arrangements.",
    approach: [
      "Track which values are already used with a boolean array.",
      "At position pos, try each unused value v that satisfies the divisibility condition.",
      "Mark v used, recurse to pos + 1, then unmark to explore other choices.",
      "Each time pos exceeds n, one full arrangement is counted.",
    ],
    complexity: { time: "O(k)", space: "O(n)", note: "k is the number of valid arrangements explored; pruning keeps it far below n!." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def count_arrangement(n: int) -> int:
    used = [False] * (n + 1)

    def backtrack(pos: int) -> int:
        if pos > n:
            return 1
        total = 0
        for v in range(1, n + 1):
            if not used[v] and (v % pos == 0 or pos % v == 0):
                used[v] = True
                total += backtrack(pos + 1)
                used[v] = False
        return total

    return backtrack(1)`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function countArrangement(n: number): number {
  const used = new Array<boolean>(n + 1).fill(false);
  const backtrack = (pos: number): number => {
    if (pos > n) return 1;
    let total = 0;
    for (let v = 1; v <= n; v++) {
      if (!used[v] && (v % pos === 0 || pos % v === 0)) {
        used[v] = true;
        total += backtrack(pos + 1);
        used[v] = false;
      }
    }
    return total;
  };
  return backtrack(1);
}`,
      },
    ],
    runner: {
      entry: "countArrangement",
      comparison: "deep",
      jsStarter: `function countArrangement(n) {
  // Count beautiful arrangements of 1..n.
  // TODO: implement
}`,
      jsReference: `function countArrangement(n) {
  const used = new Array(n + 1).fill(false);
  const backtrack = (pos) => {
    if (pos > n) return 1;
    let total = 0;
    for (let v = 1; v <= n; v++) {
      if (!used[v] && (v % pos === 0 || pos % v === 0)) {
        used[v] = true;
        total += backtrack(pos + 1);
        used[v] = false;
      }
    }
    return total;
  };
  return backtrack(1);
}`,
    },
    tests: [
      { name: "n=1", args: [1], expected: 1 },
      { name: "n=2", args: [2], expected: 2 },
      { name: "n=3", args: [3], expected: 3 },
      { name: "n=4", args: [4], expected: 8 },
    ],
    hints: ["Place values position by position and prune on the divisibility rule.", "Indexing positions from 1 keeps the condition clean."],
    relatedIds: [46, 47],
  },
  {
    id: 491,
    slug: "non-decreasing-subsequences",
    title: "Non-decreasing Subsequences",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "Subsequences", "Deduplication"],
    companies: ["amazon", "bytedance", "google"],
    frequency: 38,
    leetcodeUrl: "https://leetcode.com/problems/non-decreasing-subsequences/",
    description:
      "Return every distinct subsequence of `nums` that has length at least two and is non-decreasing. The relative order of the elements must be preserved, and no duplicate subsequence should be returned.",
    examples: [
      {
        input: "nums = [4,6,7,7]",
        output: "[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]",
        explanation: "Every listed subsequence is non-decreasing and appears once.",
      },
      { input: "nums = [4,4,3,2,1]", output: "[[4,4]]" },
    ],
    intuition:
      "Grow a subsequence by choosing each next element from positions after the current one, but only if it is ≥ the last chosen value. To avoid duplicates, within a single recursion level skip any value already tried at that level — that prevents picking the same value from two different indices as the next step.",
    approach: [
      "DFS from a start index, recording the current path whenever its length is ≥ 2.",
      "At each level keep a 'used this level' set so equal values are only branched once.",
      "Only extend with nums[i] when the path is empty or nums[i] ≥ path's last element.",
      "Recurse with i + 1, then backtrack by popping the last element.",
    ],
    complexity: { time: "O(2^n · n)", space: "O(n)", note: "Up to 2^n subsequences, each costing O(n) to copy." },
    solutions: [
      {
        language: "python",
        label: "DFS with level dedup",
        code: `def find_subsequences(nums: list[int]) -> list[list[int]]:
    res: list[list[int]] = []
    path: list[int] = []

    def dfs(start: int) -> None:
        if len(path) >= 2:
            res.append(path[:])
        used: set[int] = set()
        for i in range(start, len(nums)):
            if (not path or nums[i] >= path[-1]) and nums[i] not in used:
                used.add(nums[i])
                path.append(nums[i])
                dfs(i + 1)
                path.pop()

    dfs(0)
    return res`,
      },
      {
        language: "typescript",
        label: "DFS with level dedup",
        code: `function findSubsequences(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  const dfs = (start: number): void => {
    if (path.length >= 2) res.push([...path]);
    const used = new Set<number>();
    for (let i = start; i < nums.length; i++) {
      if ((path.length === 0 || nums[i] >= path[path.length - 1]) && !used.has(nums[i])) {
        used.add(nums[i]);
        path.push(nums[i]);
        dfs(i + 1);
        path.pop();
      }
    }
  };
  dfs(0);
  return res;
}`,
      },
    ],
    runner: {
      entry: "findSubsequences",
      comparison: "canonical",
      jsStarter: `function findSubsequences(nums) {
  // Return all non-decreasing subsequences of length >= 2.
  // TODO: implement
}`,
      jsReference: `function findSubsequences(nums) {
  const res = [];
  const path = [];
  const dfs = (start) => {
    if (path.length >= 2) res.push([...path]);
    const used = new Set();
    for (let i = start; i < nums.length; i++) {
      if ((path.length === 0 || nums[i] >= path[path.length - 1]) && !used.has(nums[i])) {
        used.add(nums[i]);
        path.push(nums[i]);
        dfs(i + 1);
        path.pop();
      }
    }
  };
  dfs(0);
  return res;
}`,
    },
    tests: [
      {
        name: "with duplicates",
        args: [[4, 6, 7, 7]],
        expected: [[4, 6], [4, 6, 7], [4, 6, 7, 7], [4, 7], [4, 7, 7], [6, 7], [6, 7, 7], [7, 7]],
      },
      { name: "mostly decreasing", args: [[4, 4, 3, 2, 1]], expected: [[4, 4]] },
      { name: "single pair", args: [[1, 2]], expected: [[1, 2]] },
      { name: "increasing triple", args: [[1, 2, 3]], expected: [[1, 2], [1, 3], [2, 3], [1, 2, 3]] },
    ],
    hints: ["Use a per-level set to skip equal values and dodge duplicates.", "Only extend when the next value is ≥ the last chosen one."],
    relatedIds: [90, 78],
  },
  {
    id: 1239,
    slug: "maximum-length-of-a-concatenated-string-with-unique-characters",
    title: "Maximum Length of a Concatenated String with Unique Characters",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "Bitmask"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 42,
    leetcodeUrl: "https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/",
    description:
      "Given a list of strings `arr`, choose any subset and concatenate them in any order. The concatenation is valid only if it uses no repeated character. Return the maximum possible length of such a valid concatenation.",
    examples: [
      {
        input: 'arr = ["un","iq","ue"]',
        output: "4",
        explanation: '"uniq" or "ique" uses four distinct characters.',
      },
      { input: 'arr = ["cha","r","act","ers"]', output: "6" },
    ],
    intuition:
      "A string is only usable if its own characters are all distinct, and two strings can be combined only if their character sets don't overlap. Represent each usable string as a 26-bit mask; then a subset is valid exactly when the chosen masks share no bits. Backtrack over the strings, tracking the running mask, and record the longest total length reached.",
    approach: [
      "Precompute a bitmask for each string, discarding any with an internal duplicate.",
      "DFS over the masks: at each step either skip the string or include it when its bits don't collide with the running mask.",
      "Track the best total length seen across all reachable subsets.",
      "Return that maximum.",
    ],
    complexity: { time: "O(2^n)", space: "O(n)", note: "n usable strings; mask checks are O(1)." },
    solutions: [
      {
        language: "python",
        label: "Bitmask backtracking",
        code: `def max_length(arr: list[str]) -> int:
    masks: list[tuple[int, int]] = []
    for s in arr:
        m = 0
        ok = True
        for ch in s:
            b = 1 << (ord(ch) - 97)
            if m & b:
                ok = False
                break
            m |= b
        if ok:
            masks.append((m, len(s)))

    best = 0

    def dfs(i: int, cur: int, length: int) -> None:
        nonlocal best
        best = max(best, length)
        for j in range(i, len(masks)):
            mask, size = masks[j]
            if cur & mask == 0:
                dfs(j + 1, cur | mask, length + size)

    dfs(0, 0, 0)
    return best`,
      },
      {
        language: "typescript",
        label: "Bitmask backtracking",
        code: `function maxLength(arr: string[]): number {
  const masks: [number, number][] = [];
  for (const s of arr) {
    let m = 0;
    let ok = true;
    for (const ch of s) {
      const b = 1 << (ch.charCodeAt(0) - 97);
      if (m & b) {
        ok = false;
        break;
      }
      m |= b;
    }
    if (ok) masks.push([m, s.length]);
  }
  let best = 0;
  const dfs = (i: number, cur: number, length: number): void => {
    best = Math.max(best, length);
    for (let j = i; j < masks.length; j++) {
      const [mask, size] = masks[j];
      if ((cur & mask) === 0) dfs(j + 1, cur | mask, length + size);
    }
  };
  dfs(0, 0, 0);
  return best;
}`,
      },
    ],
    runner: {
      entry: "maxLength",
      comparison: "deep",
      jsStarter: `function maxLength(arr) {
  // Return the longest concatenation with all-unique characters.
  // TODO: implement
}`,
      jsReference: `function maxLength(arr) {
  const masks = [];
  for (const s of arr) {
    let m = 0;
    let ok = true;
    for (const ch of s) {
      const b = 1 << (ch.charCodeAt(0) - 97);
      if (m & b) { ok = false; break; }
      m |= b;
    }
    if (ok) masks.push([m, s.length]);
  }
  let best = 0;
  const dfs = (i, cur, length) => {
    best = Math.max(best, length);
    for (let j = i; j < masks.length; j++) {
      const [mask, size] = masks[j];
      if ((cur & mask) === 0) dfs(j + 1, cur | mask, length + size);
    }
  };
  dfs(0, 0, 0);
  return best;
}`,
    },
    tests: [
      { name: "two of three fit", args: [["un", "iq", "ue"]], expected: 4 },
      { name: "longer chain", args: [["cha", "r", "act", "ers"]], expected: 6 },
      { name: "all invalid", args: [["aa", "bb"]], expected: 0 },
      { name: "singletons", args: [["a", "b", "c"]], expected: 3 },
    ],
    hints: ["Strings with internal duplicates can never be used.", "A 26-bit mask makes overlap checks a single AND."],
    relatedIds: [2305],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Graphs (grid flood fill)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1020,
    slug: "number-of-enclaves",
    title: "Number of Enclaves",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["Flood Fill", "DFS", "Boundary"],
    companies: ["amazon", "google", "meta"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/number-of-enclaves/",
    description:
      "You are given a binary grid where `1` is land and `0` is sea. Moving only up, down, left, or right, count the land cells from which it is impossible to walk off the edge of the grid.",
    examples: [
      {
        input: "grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]",
        output: "3",
        explanation: "Only the boundary-touching land at (1,0) can escape; the other three land cells are enclosed.",
      },
      { input: "grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]", output: "0" },
    ],
    intuition:
      "Any land connected to the border can reach the edge, so it is never an enclave. Flood-fill from every border land cell and sink that connected land to sea. Whatever land remains is fully enclosed, and counting those cells is the answer.",
    approach: [
      "Clone the grid so the original is untouched.",
      "Run DFS from every land cell on the four borders, flipping reachable land to sea.",
      "Scan the remaining grid and count cells still equal to 1.",
    ],
    complexity: { time: "O(m·n)", space: "O(m·n)", note: "Recursion stack and grid copy are both bounded by the cell count." },
    solutions: [
      {
        language: "python",
        label: "Border flood fill",
        code: `def num_enclaves(grid: list[list[int]]) -> int:
    g = [row[:] for row in grid]
    m, n = len(g), len(g[0])

    def dfs(r: int, c: int) -> None:
        if r < 0 or r >= m or c < 0 or c >= n or g[r][c] == 0:
            return
        g[r][c] = 0
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for i in range(m):
        dfs(i, 0)
        dfs(i, n - 1)
    for j in range(n):
        dfs(0, j)
        dfs(m - 1, j)

    return sum(cell for row in g for cell in row)`,
      },
      {
        language: "typescript",
        label: "Border flood fill",
        code: `function numEnclaves(grid: number[][]): number {
  const g = grid.map((row) => row.slice());
  const m = g.length;
  const n = g[0].length;
  const dfs = (r: number, c: number): void => {
    if (r < 0 || r >= m || c < 0 || c >= n || g[r][c] === 0) return;
    g[r][c] = 0;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  for (let i = 0; i < m; i++) {
    dfs(i, 0);
    dfs(i, n - 1);
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j);
    dfs(m - 1, j);
  }
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (g[i][j] === 1) count++;
    }
  }
  return count;
}`,
      },
    ],
    runner: {
      entry: "numEnclaves",
      comparison: "deep",
      jsStarter: `function numEnclaves(grid) {
  // Count land cells that cannot reach the border.
  // TODO: implement
}`,
      jsReference: `function numEnclaves(grid) {
  const g = grid.map((row) => row.slice());
  const m = g.length;
  const n = g[0].length;
  const dfs = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n || g[r][c] === 0) return;
    g[r][c] = 0;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  for (let i = 0; i < m; i++) {
    dfs(i, 0);
    dfs(i, n - 1);
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j);
    dfs(m - 1, j);
  }
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (g[i][j] === 1) count++;
    }
  }
  return count;
}`,
    },
    tests: [
      { name: "one escapes", args: [[[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]], expected: 3 },
      { name: "all reach border", args: [[[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]]], expected: 0 },
      { name: "no land", args: [[[0, 0], [0, 0]]], expected: 0 },
      { name: "single interior", args: [[[0, 0, 0], [0, 1, 0], [0, 0, 0]]], expected: 1 },
    ],
    hints: ["Sink everything reachable from the border first.", "Whatever land survives is enclosed."],
    relatedIds: [200, 1254, 695],
  },
  {
    id: 1254,
    slug: "number-of-closed-islands",
    title: "Number of Closed Islands",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["Flood Fill", "DFS", "Boundary"],
    companies: ["amazon", "google", "meta", "bytedance"],
    frequency: 41,
    leetcodeUrl: "https://leetcode.com/problems/number-of-closed-islands/",
    description:
      "In this grid `0` is land and `1` is water. An island is a 4-directionally connected group of land cells; it is closed when it is entirely surrounded by water and never touches the grid border. Count the closed islands.",
    examples: [
      {
        input: "grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]",
        output: "1",
        explanation: "Only the single land cell fully ringed by water is closed.",
      },
      { input: "grid = [[1,1,1],[1,0,1],[1,1,1]]", output: "1" },
    ],
    intuition:
      "Land touching the border can never form a closed island, so flood-fill from the border and convert every border-connected land cell to water. After that, each remaining land group is guaranteed to be closed, so a standard island count over the leftover land gives the answer.",
    approach: [
      "Clone the grid to keep the input intact.",
      "Flood-fill (turning land to water) starting from every land cell on the four borders.",
      "Scan the interior; each time an untouched land cell is found, increment the count and flood-fill it away.",
      "Return the number of closed islands found.",
    ],
    complexity: { time: "O(m·n)", space: "O(m·n)", note: "Each cell is visited a constant number of times." },
    solutions: [
      {
        language: "python",
        label: "Border flood fill",
        code: `def closed_island(grid: list[list[int]]) -> int:
    g = [row[:] for row in grid]
    m, n = len(g), len(g[0])

    def flood(r: int, c: int) -> None:
        if r < 0 or r >= m or c < 0 or c >= n or g[r][c] != 0:
            return
        g[r][c] = 1
        flood(r + 1, c)
        flood(r - 1, c)
        flood(r, c + 1)
        flood(r, c - 1)

    for i in range(m):
        flood(i, 0)
        flood(i, n - 1)
    for j in range(n):
        flood(0, j)
        flood(m - 1, j)

    count = 0
    for i in range(m):
        for j in range(n):
            if g[i][j] == 0:
                count += 1
                flood(i, j)
    return count`,
      },
      {
        language: "typescript",
        label: "Border flood fill",
        code: `function closedIsland(grid: number[][]): number {
  const g = grid.map((row) => row.slice());
  const m = g.length;
  const n = g[0].length;
  const flood = (r: number, c: number): void => {
    if (r < 0 || r >= m || c < 0 || c >= n || g[r][c] !== 0) return;
    g[r][c] = 1;
    flood(r + 1, c);
    flood(r - 1, c);
    flood(r, c + 1);
    flood(r, c - 1);
  };
  for (let i = 0; i < m; i++) {
    flood(i, 0);
    flood(i, n - 1);
  }
  for (let j = 0; j < n; j++) {
    flood(0, j);
    flood(m - 1, j);
  }
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (g[i][j] === 0) {
        count++;
        flood(i, j);
      }
    }
  }
  return count;
}`,
      },
    ],
    runner: {
      entry: "closedIsland",
      comparison: "deep",
      jsStarter: `function closedIsland(grid) {
  // Count islands of 0s that never touch the border.
  // TODO: implement
}`,
      jsReference: `function closedIsland(grid) {
  const g = grid.map((row) => row.slice());
  const m = g.length;
  const n = g[0].length;
  const flood = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n || g[r][c] !== 0) return;
    g[r][c] = 1;
    flood(r + 1, c);
    flood(r - 1, c);
    flood(r, c + 1);
    flood(r, c - 1);
  };
  for (let i = 0; i < m; i++) {
    flood(i, 0);
    flood(i, n - 1);
  }
  for (let j = 0; j < n; j++) {
    flood(0, j);
    flood(m - 1, j);
  }
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (g[i][j] === 0) {
        count++;
        flood(i, j);
      }
    }
  }
  return count;
}`,
    },
    tests: [
      {
        name: "leetcode sample",
        args: [
          [
            [1, 1, 1, 1, 1, 1, 1, 0],
            [1, 0, 0, 0, 0, 1, 1, 0],
            [1, 0, 1, 0, 1, 1, 1, 0],
            [1, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0],
          ],
        ],
        expected: 2,
      },
      { name: "one closed", args: [[[0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [0, 1, 1, 1, 0]]], expected: 1 },
      { name: "ringed cell", args: [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], expected: 1 },
      { name: "touches border", args: [[[1, 1, 1], [1, 0, 1], [1, 0, 1]]], expected: 0 },
    ],
    hints: ["Eliminate border-connected land before counting.", "Reuse the same flood fill to both clear borders and count interiors."],
    relatedIds: [1020, 200, 695],
  },
];

export default batchP;
