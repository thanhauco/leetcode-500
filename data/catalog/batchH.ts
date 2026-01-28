import type { Problem } from "../types.ts";

/**
 * Batch H — twenty medium/hard problems across backtracking, 1-D & 2-D dynamic
 * programming, greedy, intervals, advanced graphs (MST / shortest path), and bit
 * manipulation. Every record ships working Python + TypeScript solutions and a
 * fully wired playground runner with hand-verified tests.
 */
export const batchH: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Backtracking
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 40,
    slug: "combination-sum-ii",
    title: "Combination Sum II",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "Subsets"],
    companies: ["amazon", "microsoft", "bloomberg", "adobe"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/combination-sum-ii/",
    description:
      "Given a collection of candidate numbers (which may contain duplicates) and a target, return every unique combination whose entries sum to the target. Each candidate may be used at most once per combination.",
    examples: [
      { input: "candidates = [10,1,2,7,6,1,5], target = 8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]" },
      { input: "candidates = [2,5,2,1,2], target = 5", output: "[[1,2,2],[5]]" },
    ],
    intuition:
      "Sort the candidates so equal values sit together. Walk forward choosing each candidate at most once, and at every recursion level skip a value identical to the one already tried at that level — that single guard eliminates duplicate combinations without a post-filter.",
    approach: [
      "Sort the candidates ascending.",
      "Recurse with a start index and the remaining target.",
      "When the remainder hits zero, record a copy of the current path.",
      "At each level, skip a candidate equal to its predecessor (i > start), and break early once a candidate exceeds the remainder.",
      "Recurse with i + 1 so each element is used at most once.",
    ],
    complexity: { time: "O(2^n)", space: "O(n)", note: "Bounded by the number of subsets; recursion depth is at most n." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def combination_sum2(candidates: list[int], target: int) -> list[list[int]]:
    candidates.sort()
    res: list[list[int]] = []
    path: list[int] = []

    def bt(start: int, remain: int) -> None:
        if remain == 0:
            res.append(path[:])
            return
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            if candidates[i] > remain:
                break
            path.append(candidates[i])
            bt(i + 1, remain - candidates[i])
            path.pop()

    bt(0, target)
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function combinationSum2(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const res: number[][] = [];
  const path: number[] = [];
  function bt(start: number, remain: number): void {
    if (remain === 0) {
      res.push(path.slice());
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      if (candidates[i] > remain) break;
      path.push(candidates[i]);
      bt(i + 1, remain - candidates[i]);
      path.pop();
    }
  }
  bt(0, target);
  return res;
}`,
      },
    ],
    runner: {
      entry: "combinationSum2",
      comparison: "canonical",
      jsStarter: `function combinationSum2(candidates, target) {
  // Return all unique combinations summing to target (each number used once).
  // TODO: implement
}`,
      jsReference: `function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const res = [];
  const path = [];
  function bt(start, remain) {
    if (remain === 0) {
      res.push(path.slice());
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      if (candidates[i] > remain) break;
      path.push(candidates[i]);
      bt(i + 1, remain - candidates[i]);
      path.pop();
    }
  }
  bt(0, target);
  return res;
}`,
    },
    tests: [
      { name: "duplicates", args: [[10, 1, 2, 7, 6, 1, 5], 8], expected: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]] },
      { name: "repeated twos", args: [[2, 5, 2, 1, 2], 5], expected: [[1, 2, 2], [5]] },
      { name: "no solution", args: [[2], 1], expected: [] },
      { name: "single hit", args: [[1], 1], expected: [[1]] },
    ],
    relatedIds: [39, 90, 216],
  },
  {
    id: 77,
    slug: "combinations",
    title: "Combinations",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "Combinations"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/combinations/",
    description:
      "Given two integers n and k, return every possible combination of k distinct numbers chosen from the range 1 through n. Combinations are unordered, so [1,2] and [2,1] count as the same selection.",
    examples: [
      { input: "n = 4, k = 2", output: "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]" },
      { input: "n = 1, k = 1", output: "[[1]]" },
    ],
    intuition:
      "Build combinations in increasing order so each is generated exactly once. From a starting value, append a number and recurse on the strictly larger numbers; once the path reaches length k, it is a finished combination.",
    approach: [
      "Recurse with the next candidate value `start`.",
      "When the current path has k numbers, record a copy.",
      "Otherwise loop i from start to n, choose i, recurse from i + 1, then undo the choice.",
    ],
    complexity: { time: "O(k · C(n,k))", space: "O(k)", note: "One node per combination; recursion depth is k." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def combine(n: int, k: int) -> list[list[int]]:
    res: list[list[int]] = []
    path: list[int] = []

    def bt(start: int) -> None:
        if len(path) == k:
            res.append(path[:])
            return
        for i in range(start, n + 1):
            path.append(i)
            bt(i + 1)
            path.pop()

    bt(1)
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function combine(n: number, k: number): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  function bt(start: number): void {
    if (path.length === k) {
      res.push(path.slice());
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      bt(i + 1);
      path.pop();
    }
  }
  bt(1);
  return res;
}`,
      },
    ],
    runner: {
      entry: "combine",
      comparison: "canonical",
      jsStarter: `function combine(n, k) {
  // Return all k-length combinations of the numbers 1..n.
  // TODO: implement
}`,
      jsReference: `function combine(n, k) {
  const res = [];
  const path = [];
  function bt(start) {
    if (path.length === k) {
      res.push(path.slice());
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      bt(i + 1);
      path.pop();
    }
  }
  bt(1);
  return res;
}`,
    },
    tests: [
      { name: "n4 k2", args: [4, 2], expected: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]] },
      { name: "single", args: [1, 1], expected: [[1]] },
      { name: "full set", args: [3, 3], expected: [[1, 2, 3]] },
      { name: "singletons", args: [3, 1], expected: [[1], [2], [3]] },
    ],
    relatedIds: [39, 46, 78],
  },
  {
    id: 47,
    slug: "permutations-ii",
    title: "Permutations II",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "Permutations"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/permutations-ii/",
    description:
      "Given a list of numbers that may include duplicates, return all of its distinct orderings. Two arrangements that look identical position-for-position should appear only once in the result.",
    examples: [
      { input: "nums = [1,1,2]", output: "[[1,1,2],[1,2,1],[2,1,1]]" },
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
    ],
    intuition:
      "Sort first so equal values are adjacent. When picking the next value, skip a duplicate whose identical predecessor has not been used in this branch — that forces a fixed relative order among equal elements and prevents generating the same permutation twice.",
    approach: [
      "Sort nums and track a used[] flag per index.",
      "At each level, scan all indices; skip used ones.",
      "Skip nums[i] when it equals nums[i-1] and nums[i-1] is currently unused.",
      "Choose i, recurse, then unchoose; record the path when its length equals n.",
    ],
    complexity: { time: "O(n · n!)", space: "O(n)", note: "Worst case n! permutations, each of length n; depth n." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def permute_unique(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res: list[list[int]] = []
    path: list[int] = []
    used = [False] * len(nums)

    def bt() -> None:
        if len(path) == len(nums):
            res.append(path[:])
            return
        for i in range(len(nums)):
            if used[i]:
                continue
            if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                continue
            used[i] = True
            path.append(nums[i])
            bt()
            path.pop()
            used[i] = False

    bt()
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function permuteUnique(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  const path: number[] = [];
  const used = new Array(nums.length).fill(false);
  function bt(): void {
    if (path.length === nums.length) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      path.push(nums[i]);
      bt();
      path.pop();
      used[i] = false;
    }
  }
  bt();
  return res;
}`,
      },
    ],
    runner: {
      entry: "permuteUnique",
      comparison: "canonical",
      jsStarter: `function permuteUnique(nums) {
  // Return all distinct permutations of nums (which may contain duplicates).
  // TODO: implement
}`,
      jsReference: `function permuteUnique(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  const path = [];
  const used = new Array(nums.length).fill(false);
  function bt() {
    if (path.length === nums.length) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      path.push(nums[i]);
      bt();
      path.pop();
      used[i] = false;
    }
  }
  bt();
  return res;
}`,
    },
    tests: [
      { name: "with duplicate", args: [[1, 1, 2]], expected: [[1, 1, 2], [1, 2, 1], [2, 1, 1]] },
      {
        name: "all distinct",
        args: [[1, 2, 3]],
        expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
      },
      { name: "all equal", args: [[2, 2]], expected: [[2, 2]] },
    ],
    relatedIds: [46, 31, 60],
  },
  {
    id: 131,
    slug: "palindrome-partitioning",
    title: "Palindrome Partitioning",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "Strings"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning/",
    description:
      "Given a string, split it into contiguous substrings such that every piece reads the same forwards and backwards, and return all such ways to partition it.",
    examples: [
      { input: 's = "aab"', output: '[["a","a","b"],["aa","b"]]' },
      { input: 's = "a"', output: '[["a"]]' },
    ],
    intuition:
      "Pick a prefix that is a palindrome, commit to it as the first piece, then recursively partition the rest of the string. Trying every palindromic prefix at every position enumerates all valid partitions.",
    approach: [
      "Recurse with a start index into the string.",
      "When start reaches the end, record a copy of the current piece list.",
      "For each end ≥ start, if s[start..end] is a palindrome, push it and recurse from end + 1.",
      "Undo the choice after returning.",
    ],
    complexity: { time: "O(n · 2^n)", space: "O(n)", note: "Up to 2^(n-1) partitions; each palindrome check is O(n)." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def partition(s: str) -> list[list[str]]:
    res: list[list[str]] = []
    path: list[str] = []

    def is_pal(l: int, r: int) -> bool:
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1
            r -= 1
        return True

    def bt(start: int) -> None:
        if start == len(s):
            res.append(path[:])
            return
        for end in range(start, len(s)):
            if is_pal(start, end):
                path.append(s[start:end + 1])
                bt(end + 1)
                path.pop()

    bt(0)
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function partition(s: string): string[][] {
  const res: string[][] = [];
  const path: string[] = [];
  function isPal(l: number, r: number): boolean {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }
  function bt(start: number): void {
    if (start === s.length) {
      res.push(path.slice());
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (isPal(start, end)) {
        path.push(s.slice(start, end + 1));
        bt(end + 1);
        path.pop();
      }
    }
  }
  bt(0);
  return res;
}`,
      },
    ],
    runner: {
      entry: "partition",
      comparison: "canonical",
      jsStarter: `function partition(s) {
  // Return every partition of s where each piece is a palindrome.
  // TODO: implement
}`,
      jsReference: `function partition(s) {
  const res = [];
  const path = [];
  function isPal(l, r) {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }
  function bt(start) {
    if (start === s.length) {
      res.push(path.slice());
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (isPal(start, end)) {
        path.push(s.slice(start, end + 1));
        bt(end + 1);
        path.pop();
      }
    }
  }
  bt(0);
  return res;
}`,
    },
    tests: [
      { name: "aab", args: ["aab"], expected: [["a", "a", "b"], ["aa", "b"]] },
      { name: "single", args: ["a"], expected: [["a"]] },
      { name: "aba", args: ["aba"], expected: [["a", "b", "a"], ["aba"]] },
      { name: "no multi palindrome", args: ["abc"], expected: [["a", "b", "c"]] },
    ],
    relatedIds: [132, 5, 93],
  },
  {
    id: 52,
    slug: "n-queens-ii",
    title: "N-Queens II",
    difficulty: "Hard",
    category: "backtracking",
    patterns: ["Backtracking", "Constraint Propagation"],
    companies: ["amazon", "microsoft", "nvidia"],
    frequency: 44,
    leetcodeUrl: "https://leetcode.com/problems/n-queens-ii/",
    description:
      "Count how many distinct ways n queens can be placed on an n×n board so that no two queens attack each other along any row, column, or diagonal. Return just the number of valid placements.",
    examples: [
      { input: "n = 4", output: "2", explanation: "There are exactly two non-attacking arrangements on a 4×4 board." },
      { input: "n = 1", output: "1" },
    ],
    intuition:
      "Place one queen per row and move downward. Track occupied columns and both diagonal directions in sets so each candidate square is validated in O(1). Every time a queen reaches the final row, one complete solution has been found.",
    approach: [
      "Maintain sets for used columns, ↘ diagonals (row - col), and ↙ diagonals (row + col).",
      "Recurse row by row; for each free column, place a queen and recurse on the next row.",
      "When row equals n, increment the counter.",
      "Remove the queen's markers when backtracking.",
    ],
    complexity: { time: "O(n!)", space: "O(n)", note: "Pruned permutation search; sets and recursion use O(n) space." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def total_n_queens(n: int) -> int:
    cols: set[int] = set()
    diag1: set[int] = set()
    diag2: set[int] = set()
    count = 0

    def bt(row: int) -> None:
        nonlocal count
        if row == n:
            count += 1
            return
        for c in range(n):
            if c in cols or (row - c) in diag1 or (row + c) in diag2:
                continue
            cols.add(c)
            diag1.add(row - c)
            diag2.add(row + c)
            bt(row + 1)
            cols.remove(c)
            diag1.remove(row - c)
            diag2.remove(row + c)

    bt(0)
    return count`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function totalNQueens(n: number): number {
  const cols = new Set<number>();
  const diag1 = new Set<number>();
  const diag2 = new Set<number>();
  let count = 0;
  function bt(row: number): void {
    if (row === n) {
      count++;
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(row - c) || diag2.has(row + c)) continue;
      cols.add(c);
      diag1.add(row - c);
      diag2.add(row + c);
      bt(row + 1);
      cols.delete(c);
      diag1.delete(row - c);
      diag2.delete(row + c);
    }
  }
  bt(0);
  return count;
}`,
      },
    ],
    runner: {
      entry: "totalNQueens",
      comparison: "deep",
      jsStarter: `function totalNQueens(n) {
  // Return the number of distinct non-attacking n-queens placements.
  // TODO: implement
}`,
      jsReference: `function totalNQueens(n) {
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();
  let count = 0;
  function bt(row) {
    if (row === n) {
      count++;
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(row - c) || diag2.has(row + c)) continue;
      cols.add(c);
      diag1.add(row - c);
      diag2.add(row + c);
      bt(row + 1);
      cols.delete(c);
      diag1.delete(row - c);
      diag2.delete(row + c);
    }
  }
  bt(0);
  return count;
}`,
    },
    tests: [
      { name: "n1", args: [1], expected: 1 },
      { name: "n4", args: [4], expected: 2 },
      { name: "n5", args: [5], expected: 10 },
      { name: "n6", args: [6], expected: 4 },
    ],
    relatedIds: [51],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // 1-D Dynamic Programming
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 213,
    slug: "house-robber-ii",
    title: "House Robber II",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming"],
    companies: ["amazon", "microsoft", "google"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/",
    description:
      "Houses are arranged in a circle, each holding some money, and robbing two adjacent houses triggers an alarm. Because the first and last houses are also neighbors, return the most money you can take without alerting the police.",
    examples: [
      { input: "nums = [2,3,2]", output: "3", explanation: "Rob house 2 alone; you cannot rob houses 1 and 3 together." },
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob houses 1 and 3 for 1 + 3 = 4." },
    ],
    intuition:
      "The circular constraint means the first and last house can never both be robbed. Split into two ordinary linear House Robber problems — one excluding the last house, one excluding the first — and take the better of the two.",
    approach: [
      "Handle the tiny cases of zero or one house directly.",
      "Define a linear robber over a sub-range using two rolling totals.",
      "Run it on indices 0..n-2 and on indices 1..n-1.",
      "Return the maximum of the two runs.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Two linear passes with constant rolling state." },
    solutions: [
      {
        language: "python",
        label: "Rolling DP",
        code: `def rob(nums: list[int]) -> int:
    n = len(nums)
    if n == 0:
        return 0
    if n == 1:
        return nums[0]

    def rob_line(lo: int, hi: int) -> int:
        prev = cur = 0
        for i in range(lo, hi + 1):
            prev, cur = cur, max(cur, prev + nums[i])
        return cur

    return max(rob_line(0, n - 2), rob_line(1, n - 1))`,
      },
      {
        language: "typescript",
        label: "Rolling DP",
        code: `function rob(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  function robLine(lo: number, hi: number): number {
    let prev = 0, cur = 0;
    for (let i = lo; i <= hi; i++) {
      const take = Math.max(cur, prev + nums[i]);
      prev = cur;
      cur = take;
    }
    return cur;
  }
  return Math.max(robLine(0, n - 2), robLine(1, n - 1));
}`,
      },
    ],
    runner: {
      entry: "rob",
      comparison: "deep",
      jsStarter: `function rob(nums) {
  // Houses are in a circle; return the max money with no two adjacent robbed.
  // TODO: implement
}`,
      jsReference: `function rob(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  function robLine(lo, hi) {
    let prev = 0, cur = 0;
    for (let i = lo; i <= hi; i++) {
      const take = Math.max(cur, prev + nums[i]);
      prev = cur;
      cur = take;
    }
    return cur;
  }
  return Math.max(robLine(0, n - 2), robLine(1, n - 1));
}`,
    },
    tests: [
      { name: "circle of three", args: [[2, 3, 2]], expected: 3 },
      { name: "four houses", args: [[1, 2, 3, 1]], expected: 4 },
      { name: "single", args: [[0]], expected: 0 },
      { name: "three line", args: [[1, 2, 3]], expected: 3 },
      { name: "spread", args: [[200, 3, 140, 20, 10]], expected: 340 },
    ],
    relatedIds: [198, 337, 740],
  },
  {
    id: 91,
    slug: "decode-ways",
    title: "Decode Ways",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming"],
    companies: ["amazon", "meta", "microsoft", "uber"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/decode-ways/",
    description:
      "Letters A–Z map to the codes 1–26, and a string of digits can be decoded by grouping its digits into valid one- or two-digit codes. Count how many distinct letter strings the digit string could represent.",
    examples: [
      { input: 's = "12"', output: "2", explanation: '"12" decodes as "AB" or "L".' },
      { input: 's = "226"', output: "3", explanation: '"BZ", "VF", or "BBF".' },
    ],
    intuition:
      "The number of ways to decode a prefix depends only on the previous one or two positions. A single digit (1–9) extends every decoding of the prefix before it, and a valid two-digit code (10–26) extends every decoding two positions back — classic Fibonacci-style accumulation.",
    approach: [
      "Return 0 immediately if the string is empty or starts with '0'.",
      "Track two rolling counts: ways up to i-1 and up to i-2.",
      "Add the previous count when the current digit is non-zero.",
      "Add the count two back when the two-digit window is between 10 and 26.",
      "Shift the rolling counts forward each step.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Single pass with two rolling counters." },
    solutions: [
      {
        language: "python",
        label: "Rolling DP",
        code: `def num_decodings(s: str) -> int:
    if not s or s[0] == "0":
        return 0
    prev2, prev1 = 1, 1
    for i in range(1, len(s)):
        cur = 0
        if s[i] != "0":
            cur += prev1
        two = int(s[i - 1:i + 1])
        if 10 <= two <= 26:
            cur += prev2
        prev2, prev1 = prev1, cur
    return prev1`,
      },
      {
        language: "typescript",
        label: "Rolling DP",
        code: `function numDecodings(s: string): number {
  if (s.length === 0 || s[0] === "0") return 0;
  let prev2 = 1, prev1 = 1;
  for (let i = 1; i < s.length; i++) {
    let cur = 0;
    if (s[i] !== "0") cur += prev1;
    const two = parseInt(s.slice(i - 1, i + 1), 10);
    if (two >= 10 && two <= 26) cur += prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}`,
      },
    ],
    runner: {
      entry: "numDecodings",
      comparison: "deep",
      jsStarter: `function numDecodings(s) {
  // Count how many ways the digit string decodes to letters (A=1..Z=26).
  // TODO: implement
}`,
      jsReference: `function numDecodings(s) {
  if (s.length === 0 || s[0] === "0") return 0;
  let prev2 = 1, prev1 = 1;
  for (let i = 1; i < s.length; i++) {
    let cur = 0;
    if (s[i] !== "0") cur += prev1;
    const two = parseInt(s.slice(i - 1, i + 1), 10);
    if (two >= 10 && two <= 26) cur += prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}`,
    },
    tests: [
      { name: "two ways", args: ["12"], expected: 2 },
      { name: "three ways", args: ["226"], expected: 3 },
      { name: "leading zero", args: ["06"], expected: 0 },
      { name: "ten", args: ["10"], expected: 1 },
      { name: "embedded zero", args: ["2101"], expected: 1 },
    ],
    relatedIds: [639, 70, 639],
  },
  {
    id: 309,
    slug: "best-time-to-buy-and-sell-stock-with-cooldown",
    title: "Best Time to Buy and Sell Stock with Cooldown",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "State Machine"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 57,
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    description:
      "Given daily stock prices, you may complete as many buy/sell transactions as you like, but after selling you must wait one full day before buying again. Return the maximum total profit.",
    examples: [
      { input: "prices = [1,2,3,0,2]", output: "3", explanation: "Buy at 1, sell at 3, cool down, buy at 0, sell at 2." },
      { input: "prices = [1]", output: "0" },
    ],
    intuition:
      "Each day you are in one of three states: holding a share, just sold today (forced cooldown tomorrow), or resting with no share. Track the best profit for each state and roll the transitions forward day by day.",
    approach: [
      "Initialize hold = -∞, sold = 0, rest = 0.",
      "For each price: new sold = hold + price; new hold = max(hold, rest - price); new rest = max(rest, previous sold).",
      "Use the previous sold value when updating rest to honor the cooldown.",
      "Answer is the best of sold and rest after the last day.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Three rolling state variables." },
    solutions: [
      {
        language: "python",
        label: "State Machine DP",
        code: `def max_profit(prices: list[int]) -> int:
    hold = float("-inf")
    sold = 0
    rest = 0
    for p in prices:
        prev_sold = sold
        sold = hold + p
        hold = max(hold, rest - p)
        rest = max(rest, prev_sold)
    return int(max(sold, rest))`,
      },
      {
        language: "typescript",
        label: "State Machine DP",
        code: `function maxProfit(prices: number[]): number {
  let hold = -Infinity, sold = 0, rest = 0;
  for (const p of prices) {
    const prevSold = sold;
    sold = hold + p;
    hold = Math.max(hold, rest - p);
    rest = Math.max(rest, prevSold);
  }
  return Math.max(sold, rest);
}`,
      },
    ],
    runner: {
      entry: "maxProfit",
      comparison: "deep",
      jsStarter: `function maxProfit(prices) {
  // Max profit with unlimited transactions and a 1-day cooldown after selling.
  // TODO: implement
}`,
      jsReference: `function maxProfit(prices) {
  let hold = -Infinity, sold = 0, rest = 0;
  for (const p of prices) {
    const prevSold = sold;
    sold = hold + p;
    hold = Math.max(hold, rest - p);
    rest = Math.max(rest, prevSold);
  }
  return Math.max(sold, rest);
}`,
    },
    tests: [
      { name: "classic", args: [[1, 2, 3, 0, 2]], expected: 3 },
      { name: "single day", args: [[1]], expected: 0 },
      { name: "empty", args: [[]], expected: 0 },
      { name: "decreasing", args: [[2, 1]], expected: 0 },
      { name: "rising", args: [[1, 2, 4]], expected: 3 },
    ],
    relatedIds: [122, 714, 121],
  },
  {
    id: 518,
    slug: "coin-change-ii",
    title: "Coin Change II",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Unbounded Knapsack"],
    companies: ["amazon", "google", "uber"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/coin-change-ii/",
    description:
      "Given coin denominations with unlimited supply and a target amount, count how many distinct combinations of coins add up to exactly that amount. Combinations differing only in order count once.",
    examples: [
      { input: "amount = 5, coins = [1,2,5]", output: "4", explanation: "5; 2+2+1; 2+1+1+1; 1+1+1+1+1." },
      { input: "amount = 3, coins = [2]", output: "0" },
    ],
    intuition:
      "Process the coins one at a time in the outer loop so each denomination is considered as a whole. Sweeping amounts upward lets every coin contribute any number of times, and because coins are introduced in a fixed order, permutations of the same multiset are never double-counted.",
    approach: [
      "Create dp of size amount + 1 with dp[0] = 1 (one way to make zero).",
      "For each coin, iterate amount a from coin to target.",
      "Add dp[a - coin] into dp[a].",
      "Return dp[amount].",
    ],
    complexity: { time: "O(amount · k)", space: "O(amount)", note: "k = number of coin denominations." },
    solutions: [
      {
        language: "python",
        label: "Unbounded Knapsack",
        code: `def change(amount: int, coins: list[int]) -> int:
    dp = [0] * (amount + 1)
    dp[0] = 1
    for c in coins:
        for a in range(c, amount + 1):
            dp[a] += dp[a - c]
    return dp[amount]`,
      },
      {
        language: "typescript",
        label: "Unbounded Knapsack",
        code: `function change(amount: number, coins: number[]): number {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const c of coins) {
    for (let a = c; a <= amount; a++) {
      dp[a] += dp[a - c];
    }
  }
  return dp[amount];
}`,
      },
    ],
    runner: {
      entry: "change",
      comparison: "deep",
      jsStarter: `function change(amount, coins) {
  // Count the combinations of coins that sum to amount (order does not matter).
  // TODO: implement
}`,
      jsReference: `function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const c of coins) {
    for (let a = c; a <= amount; a++) {
      dp[a] += dp[a - c];
    }
  }
  return dp[amount];
}`,
    },
    tests: [
      { name: "classic", args: [5, [1, 2, 5]], expected: 4 },
      { name: "impossible", args: [3, [2]], expected: 0 },
      { name: "zero amount", args: [0, [7]], expected: 1 },
      { name: "exact coin", args: [10, [10]], expected: 1 },
      { name: "three coins", args: [4, [1, 2, 3]], expected: 4 },
    ],
    relatedIds: [322, 377, 39],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // 2-D Dynamic Programming
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 64,
    slug: "minimum-path-sum",
    title: "Minimum Path Sum",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Grid"],
    companies: ["amazon", "google", "apple", "goldman-sachs"],
    frequency: 62,
    leetcodeUrl: "https://leetcode.com/problems/minimum-path-sum/",
    description:
      "Given a grid of non-negative numbers, find a path from the top-left cell to the bottom-right cell that minimizes the sum of values visited, moving only right or down. Return that minimum sum.",
    examples: [
      { input: "grid = [[1,3,1],[1,5,1],[4,2,1]]", output: "7", explanation: "Path 1→3→1→1→1 sums to 7." },
      { input: "grid = [[1,2,3],[4,5,6]]", output: "12" },
    ],
    intuition:
      "Each cell can only be reached from the cell above or the cell to its left, so the cheapest cost to reach it is its own value plus the smaller of those two predecessors. A single rolling row of best costs captures this.",
    approach: [
      "Seed a rolling row with the prefix sums of the first grid row.",
      "For each subsequent row, update the leftmost cell by adding its grid value.",
      "For the rest, set dp[j] = grid[i][j] + min(dp[j], dp[j-1]).",
      "Return the last entry of the rolling row.",
    ],
    complexity: { time: "O(m · n)", space: "O(n)", note: "One rolling row of width n." },
    solutions: [
      {
        language: "python",
        label: "Rolling Row DP",
        code: `def min_path_sum(grid: list[list[int]]) -> int:
    m, n = len(grid), len(grid[0])
    dp = grid[0][:]
    for j in range(1, n):
        dp[j] += dp[j - 1]
    for i in range(1, m):
        dp[0] += grid[i][0]
        for j in range(1, n):
            dp[j] = grid[i][j] + min(dp[j], dp[j - 1])
    return dp[n - 1]`,
      },
      {
        language: "typescript",
        label: "Rolling Row DP",
        code: `function minPathSum(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  const dp = grid[0].slice();
  for (let j = 1; j < n; j++) dp[j] += dp[j - 1];
  for (let i = 1; i < m; i++) {
    dp[0] += grid[i][0];
    for (let j = 1; j < n; j++) {
      dp[j] = grid[i][j] + Math.min(dp[j], dp[j - 1]);
    }
  }
  return dp[n - 1];
}`,
      },
    ],
    runner: {
      entry: "minPathSum",
      comparison: "deep",
      jsStarter: `function minPathSum(grid) {
  // Return the minimum top-left to bottom-right path sum moving only right/down.
  // TODO: implement
}`,
      jsReference: `function minPathSum(grid) {
  const m = grid.length, n = grid[0].length;
  const dp = grid[0].slice();
  for (let j = 1; j < n; j++) dp[j] += dp[j - 1];
  for (let i = 1; i < m; i++) {
    dp[0] += grid[i][0];
    for (let j = 1; j < n; j++) {
      dp[j] = grid[i][j] + Math.min(dp[j], dp[j - 1]);
    }
  }
  return dp[n - 1];
}`,
    },
    tests: [
      { name: "3x3", args: [[[1, 3, 1], [1, 5, 1], [4, 2, 1]]], expected: 7 },
      { name: "2x3", args: [[[1, 2, 3], [4, 5, 6]]], expected: 12 },
      { name: "single cell", args: [[[5]]], expected: 5 },
      { name: "2x2", args: [[[1, 2], [1, 1]]], expected: 3 },
    ],
    relatedIds: [62, 63, 120],
  },
  {
    id: 63,
    slug: "unique-paths-ii",
    title: "Unique Paths II",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Grid"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 53,
    leetcodeUrl: "https://leetcode.com/problems/unique-paths-ii/",
    description:
      "A robot starts at the top-left of a grid and wants to reach the bottom-right, moving only right or down. Some cells contain obstacles (marked 1) that cannot be entered; count the number of obstacle-free paths.",
    examples: [
      { input: "obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]", output: "2" },
      { input: "obstacleGrid = [[0,1],[0,0]]", output: "1" },
    ],
    intuition:
      "Paths into a cell come from the cell above plus the cell to the left, just like the obstacle-free version — except a blocked cell contributes zero paths. Reset blocked cells to 0 as you sweep a rolling row.",
    approach: [
      "Initialize a rolling row of zeros; set dp[0] = 1 unless the start is blocked.",
      "Iterate over every cell row by row.",
      "If the cell is an obstacle, set dp[j] = 0.",
      "Otherwise, when j > 0, add dp[j-1] into dp[j].",
      "Return the final entry of the rolling row.",
    ],
    complexity: { time: "O(m · n)", space: "O(n)", note: "One rolling row reused across rows." },
    solutions: [
      {
        language: "python",
        label: "Rolling Row DP",
        code: `def unique_paths_with_obstacles(grid: list[list[int]]) -> int:
    m, n = len(grid), len(grid[0])
    dp = [0] * n
    dp[0] = 0 if grid[0][0] == 1 else 1
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                dp[j] = 0
            elif j > 0:
                dp[j] += dp[j - 1]
    return dp[n - 1]`,
      },
      {
        language: "typescript",
        label: "Rolling Row DP",
        code: `function uniquePathsWithObstacles(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  const dp = new Array(n).fill(0);
  dp[0] = grid[0][0] === 1 ? 0 : 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) dp[j] = 0;
      else if (j > 0) dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}`,
      },
    ],
    runner: {
      entry: "uniquePathsWithObstacles",
      comparison: "deep",
      jsStarter: `function uniquePathsWithObstacles(obstacleGrid) {
  // Count right/down paths from top-left to bottom-right avoiding obstacles (1).
  // TODO: implement
}`,
      jsReference: `function uniquePathsWithObstacles(grid) {
  const m = grid.length, n = grid[0].length;
  const dp = new Array(n).fill(0);
  dp[0] = grid[0][0] === 1 ? 0 : 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) dp[j] = 0;
      else if (j > 0) dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}`,
    },
    tests: [
      { name: "center obstacle", args: [[[0, 0, 0], [0, 1, 0], [0, 0, 0]]], expected: 2 },
      { name: "corner obstacle", args: [[[0, 1], [0, 0]]], expected: 1 },
      { name: "blocked start", args: [[[1]]], expected: 0 },
      { name: "open single", args: [[[0]]], expected: 1 },
      { name: "blocked middle row", args: [[[0, 0], [1, 1], [0, 0]]], expected: 0 },
    ],
    relatedIds: [62, 64, 980],
  },
  {
    id: 97,
    slug: "interleaving-string",
    title: "Interleaving String",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Strings"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/interleaving-string/",
    description:
      "Given three strings s1, s2, and s3, decide whether s3 can be formed by interleaving the characters of s1 and s2 while preserving the left-to-right order within each. Return true or false.",
    examples: [
      { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', output: "true" },
      { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"', output: "false" },
    ],
    intuition:
      "Whether the first i characters of s1 and first j of s2 can build the first i+j of s3 depends only on smaller prefixes. Each new s3 character must come from either s1 or s2, giving a two-dimensional reachability grid collapsible to one rolling row.",
    approach: [
      "Fail fast if the lengths don't add up.",
      "dp[j] means s1[..i] and s2[..j] interleave to s3[..i+j].",
      "Initialize the first row from s2 alone.",
      "For each i, update dp[0] from s1 alone, then each dp[j] from the cell above (s1 char) or the cell left (s2 char).",
      "Return dp[n].",
    ],
    complexity: { time: "O(m · n)", space: "O(n)", note: "Rolling row over the s2 dimension." },
    solutions: [
      {
        language: "python",
        label: "Rolling Row DP",
        code: `def is_interleave(s1: str, s2: str, s3: str) -> bool:
    m, n = len(s1), len(s2)
    if m + n != len(s3):
        return False
    dp = [False] * (n + 1)
    dp[0] = True
    for j in range(1, n + 1):
        dp[j] = dp[j - 1] and s2[j - 1] == s3[j - 1]
    for i in range(1, m + 1):
        dp[0] = dp[0] and s1[i - 1] == s3[i - 1]
        for j in range(1, n + 1):
            dp[j] = (dp[j] and s1[i - 1] == s3[i + j - 1]) or (
                dp[j - 1] and s2[j - 1] == s3[i + j - 1]
            )
    return dp[n]`,
      },
      {
        language: "typescript",
        label: "Rolling Row DP",
        code: `function isInterleave(s1: string, s2: string, s3: string): boolean {
  const m = s1.length, n = s2.length;
  if (m + n !== s3.length) return false;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;
  for (let j = 1; j <= n; j++) dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
  for (let i = 1; i <= m; i++) {
    dp[0] = dp[0] && s1[i - 1] === s3[i - 1];
    for (let j = 1; j <= n; j++) {
      dp[j] =
        (dp[j] && s1[i - 1] === s3[i + j - 1]) ||
        (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }
  return dp[n];
}`,
      },
    ],
    runner: {
      entry: "isInterleave",
      comparison: "deep",
      jsStarter: `function isInterleave(s1, s2, s3) {
  // Return true if s3 is an interleaving of s1 and s2 preserving order.
  // TODO: implement
}`,
      jsReference: `function isInterleave(s1, s2, s3) {
  const m = s1.length, n = s2.length;
  if (m + n !== s3.length) return false;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;
  for (let j = 1; j <= n; j++) dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
  for (let i = 1; i <= m; i++) {
    dp[0] = dp[0] && s1[i - 1] === s3[i - 1];
    for (let j = 1; j <= n; j++) {
      dp[j] =
        (dp[j] && s1[i - 1] === s3[i + j - 1]) ||
        (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }
  return dp[n];
}`,
    },
    tests: [
      { name: "valid interleave", args: ["aabcc", "dbbca", "aadbbcbcac"], expected: true },
      { name: "invalid interleave", args: ["aabcc", "dbbca", "aadbbbaccc"], expected: false },
      { name: "all empty", args: ["", "", ""], expected: true },
      { name: "one source", args: ["a", "", "a"], expected: true },
      { name: "wrong order", args: ["abc", "", "acb"], expected: false },
    ],
    relatedIds: [72, 115, 1143],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Greedy
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 763,
    slug: "partition-labels",
    title: "Partition Labels",
    difficulty: "Medium",
    category: "greedy",
    patterns: ["Greedy", "Two Pointers"],
    companies: ["amazon", "google", "linkedin"],
    frequency: 61,
    leetcodeUrl: "https://leetcode.com/problems/partition-labels/",
    description:
      "Split a string into as many contiguous parts as possible so that each letter appears in at most one part. Return the lengths of those parts in order.",
    examples: [
      { input: 's = "ababcbacadefegdehijhklij"', output: "[9,7,8]" },
      { input: 's = "abc"', output: "[1,1,1]" },
    ],
    intuition:
      "A part can only close once we have passed the last occurrence of every letter it contains. Record each letter's final index, then sweep while extending the current part's end to the farthest last-index seen; when the cursor reaches that end, cut.",
    approach: [
      "Record the last index of every character.",
      "Walk the string tracking the current part's start and a running end.",
      "Extend end to the maximum last-index of characters seen so far.",
      "When the cursor equals end, append the part length and start a new part.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "The last-index map holds at most the alphabet size." },
    solutions: [
      {
        language: "python",
        label: "Greedy",
        code: `def partition_labels(s: str) -> list[int]:
    last = {ch: i for i, ch in enumerate(s)}
    res: list[int] = []
    start = end = 0
    for i, ch in enumerate(s):
        end = max(end, last[ch])
        if i == end:
            res.append(end - start + 1)
            start = i + 1
    return res`,
      },
      {
        language: "typescript",
        label: "Greedy",
        code: `function partitionLabels(s: string): number[] {
  const last: Record<string, number> = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const res: number[] = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]]);
    if (i === end) {
      res.push(end - start + 1);
      start = i + 1;
    }
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "partitionLabels",
      comparison: "deep",
      jsStarter: `function partitionLabels(s) {
  // Return the sizes of the maximal parts where no letter spans two parts.
  // TODO: implement
}`,
      jsReference: `function partitionLabels(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const res = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]]);
    if (i === end) {
      res.push(end - start + 1);
      start = i + 1;
    }
  }
  return res;
}`,
    },
    tests: [
      { name: "classic", args: ["ababcbacadefegdehijhklij"], expected: [9, 7, 8] },
      { name: "single part", args: ["eccbbbbdec"], expected: [10] },
      { name: "all unique", args: ["abc"], expected: [1, 1, 1] },
      { name: "single char", args: ["a"], expected: [1] },
    ],
    relatedIds: [56, 435, 86],
  },
  {
    id: 678,
    slug: "valid-parenthesis-string",
    title: "Valid Parenthesis String",
    difficulty: "Medium",
    category: "greedy",
    patterns: ["Greedy"],
    companies: ["amazon", "meta", "google"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/valid-parenthesis-string/",
    description:
      "A string contains '(', ')', and '*', where each '*' may stand for a single '(' or ')' or an empty string. Determine whether the string can be interpreted as a balanced sequence of parentheses.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "(*))"', output: "true" },
    ],
    intuition:
      "Track the range of possible open-paren counts as you scan. '(' raises both bounds, ')' lowers both, and '*' widens the range by one in each direction. The string is valid if the low bound can be clamped back to a state where zero open parens is reachable at the end.",
    approach: [
      "Maintain lo and hi: the minimum and maximum possible unmatched '(' count.",
      "On '(' increment both; on ')' decrement both; on '*' decrement lo and increment hi.",
      "If hi ever goes negative there are too many ')' — return false.",
      "Clamp lo at 0 (an excess '*' as ')' is simply unused).",
      "Valid exactly when lo finishes at 0.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Two integer bounds, single pass." },
    solutions: [
      {
        language: "python",
        label: "Greedy Range",
        code: `def check_valid_string(s: str) -> bool:
    lo = hi = 0
    for ch in s:
        if ch == "(":
            lo += 1
            hi += 1
        elif ch == ")":
            lo -= 1
            hi -= 1
        else:
            lo -= 1
            hi += 1
        if hi < 0:
            return False
        if lo < 0:
            lo = 0
    return lo == 0`,
      },
      {
        language: "typescript",
        label: "Greedy Range",
        code: `function checkValidString(s: string): boolean {
  let lo = 0, hi = 0;
  for (const ch of s) {
    if (ch === "(") {
      lo++;
      hi++;
    } else if (ch === ")") {
      lo--;
      hi--;
    } else {
      lo--;
      hi++;
    }
    if (hi < 0) return false;
    if (lo < 0) lo = 0;
  }
  return lo === 0;
}`,
      },
    ],
    runner: {
      entry: "checkValidString",
      comparison: "deep",
      jsStarter: `function checkValidString(s) {
  // Return true if s (with '*' wildcards) can be balanced parentheses.
  // TODO: implement
}`,
      jsReference: `function checkValidString(s) {
  let lo = 0, hi = 0;
  for (const ch of s) {
    if (ch === "(") {
      lo++;
      hi++;
    } else if (ch === ")") {
      lo--;
      hi--;
    } else {
      lo--;
      hi++;
    }
    if (hi < 0) return false;
    if (lo < 0) lo = 0;
  }
  return lo === 0;
}`,
    },
    tests: [
      { name: "balanced", args: ["()"], expected: true },
      { name: "star as paren", args: ["(*)"], expected: true },
      { name: "star closes extra", args: ["(*))"], expected: true },
      { name: "too many open", args: ["(((**"], expected: false },
      { name: "wrong order", args: [")("], expected: false },
    ],
    relatedIds: [20, 32, 921],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Intervals
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 253,
    slug: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    difficulty: "Medium",
    category: "intervals",
    patterns: ["Intervals", "Sweep Line"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 70,
    premium: true,
    leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/",
    description:
      "Given the start and end times of several meetings, determine the minimum number of rooms required so that no two overlapping meetings share a room.",
    examples: [
      { input: "intervals = [[0,30],[5,10],[15,20]]", output: "2" },
      { input: "intervals = [[7,10],[2,4]]", output: "1" },
    ],
    intuition:
      "Separate all start and end times and sort each list. Sweep through start times; before opening a room for a meeting, free any room whose meeting has already ended. The peak number of simultaneously open rooms is the answer.",
    approach: [
      "Extract and sort the start times and the end times independently.",
      "Walk the start times with a pointer into the end times.",
      "For each start, release every room whose end time is ≤ the current start.",
      "Occupy a room and track the running maximum of concurrent rooms.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)", note: "Dominated by sorting the start and end arrays." },
    solutions: [
      {
        language: "python",
        label: "Sweep Line",
        code: `def min_meeting_rooms(intervals: list[list[int]]) -> int:
    starts = sorted(x[0] for x in intervals)
    ends = sorted(x[1] for x in intervals)
    rooms = max_rooms = e = 0
    for s in starts:
        while e < len(ends) and ends[e] <= s:
            rooms -= 1
            e += 1
        rooms += 1
        max_rooms = max(max_rooms, rooms)
    return max_rooms`,
      },
      {
        language: "typescript",
        label: "Sweep Line",
        code: `function minMeetingRooms(intervals: number[][]): number {
  const starts = intervals.map((x) => x[0]).sort((a, b) => a - b);
  const ends = intervals.map((x) => x[1]).sort((a, b) => a - b);
  let rooms = 0, maxRooms = 0, e = 0;
  for (let i = 0; i < starts.length; i++) {
    while (e < ends.length && ends[e] <= starts[i]) {
      rooms--;
      e++;
    }
    rooms++;
    maxRooms = Math.max(maxRooms, rooms);
  }
  return maxRooms;
}`,
      },
    ],
    runner: {
      entry: "minMeetingRooms",
      comparison: "deep",
      jsStarter: `function minMeetingRooms(intervals) {
  // Return the minimum number of rooms to host all meetings without overlap.
  // TODO: implement
}`,
      jsReference: `function minMeetingRooms(intervals) {
  const starts = intervals.map((x) => x[0]).sort((a, b) => a - b);
  const ends = intervals.map((x) => x[1]).sort((a, b) => a - b);
  let rooms = 0, maxRooms = 0, e = 0;
  for (let i = 0; i < starts.length; i++) {
    while (e < ends.length && ends[e] <= starts[i]) {
      rooms--;
      e++;
    }
    rooms++;
    maxRooms = Math.max(maxRooms, rooms);
  }
  return maxRooms;
}`,
    },
    tests: [
      { name: "two needed", args: [[[0, 30], [5, 10], [15, 20]]], expected: 2 },
      { name: "non-overlapping", args: [[[7, 10], [2, 4]]], expected: 1 },
      { name: "empty", args: [[]], expected: 0 },
      { name: "all overlap", args: [[[1, 5], [2, 6], [3, 7]]], expected: 3 },
      { name: "back to back", args: [[[1, 2], [2, 3], [3, 4]]], expected: 1 },
    ],
    relatedIds: [252, 56, 1094],
  },
  {
    id: 252,
    slug: "meeting-rooms",
    title: "Meeting Rooms",
    difficulty: "Easy",
    category: "intervals",
    patterns: ["Intervals", "Sorting"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 63,
    premium: true,
    leetcodeUrl: "https://leetcode.com/problems/meeting-rooms/",
    description:
      "Given the time intervals of several meetings, decide whether a single person could attend all of them — that is, whether none of the meetings overlap in time.",
    examples: [
      { input: "intervals = [[0,30],[5,10],[15,20]]", output: "false", explanation: "[0,30] overlaps the other two." },
      { input: "intervals = [[7,10],[2,4]]", output: "true" },
    ],
    intuition:
      "Sort the meetings by start time; once ordered, a conflict can only happen between consecutive meetings. If any meeting begins before the previous one ends, attending all of them is impossible.",
    approach: [
      "Sort the intervals by start time.",
      "Scan adjacent pairs.",
      "If a later meeting starts before the earlier one finishes, return false.",
      "If no overlap is found, return true.",
    ],
    complexity: { time: "O(n log n)", space: "O(1)", note: "Sorting dominates; comparison is a single pass." },
    solutions: [
      {
        language: "python",
        label: "Sort & Scan",
        code: `def can_attend_meetings(intervals: list[list[int]]) -> bool:
    intervals.sort(key=lambda x: x[0])
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    return True`,
      },
      {
        language: "typescript",
        label: "Sort & Scan",
        code: `function canAttendMeetings(intervals: number[][]): boolean {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "canAttendMeetings",
      comparison: "deep",
      jsStarter: `function canAttendMeetings(intervals) {
  // Return true if a person can attend every meeting (no overlaps).
  // TODO: implement
}`,
      jsReference: `function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }
  return true;
}`,
    },
    tests: [
      { name: "overlap", args: [[[0, 30], [5, 10], [15, 20]]], expected: false },
      { name: "disjoint", args: [[[7, 10], [2, 4]]], expected: true },
      { name: "empty", args: [[]], expected: true },
      { name: "touching ok", args: [[[1, 2], [2, 3]]], expected: true },
      { name: "partial overlap", args: [[[1, 5], [4, 6]]], expected: false },
    ],
    relatedIds: [253, 56, 57],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Advanced Graphs
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1584,
    slug: "min-cost-to-connect-all-points",
    title: "Min Cost to Connect All Points",
    difficulty: "Medium",
    category: "advanced-graphs",
    patterns: ["Minimum Spanning Tree", "Prim's Algorithm"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
    description:
      "Given points on a 2-D plane, connect all of them so every pair is reachable, where the cost of an edge is the Manhattan distance between its two points. Return the minimum total cost to connect everything.",
    examples: [
      { input: "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]", output: "20" },
      { input: "points = [[3,12],[-2,5],[-4,1]]", output: "18" },
    ],
    intuition:
      "This is a minimum spanning tree where every pair of points is a candidate edge weighted by Manhattan distance. Prim's algorithm grows the tree from one point, repeatedly absorbing the nearest point not yet connected.",
    approach: [
      "Track which points are in the tree and the cheapest known edge to each outside point.",
      "Start from point 0 with distance 0.",
      "Repeatedly pick the unvisited point with the smallest distance, add its cost, and mark it visited.",
      "Relax the distances of remaining points using Manhattan distance to the newly added point.",
    ],
    complexity: { time: "O(n^2)", space: "O(n)", note: "Dense Prim's over the complete graph of n points." },
    solutions: [
      {
        language: "python",
        label: "Prim's MST",
        code: `def min_cost_connect_points(points: list[list[int]]) -> int:
    n = len(points)
    if n <= 1:
        return 0
    in_mst = [False] * n
    dist = [float("inf")] * n
    dist[0] = 0
    total = 0
    for _ in range(n):
        u = -1
        for i in range(n):
            if not in_mst[i] and (u == -1 or dist[i] < dist[u]):
                u = i
        in_mst[u] = True
        total += dist[u]
        for v in range(n):
            if not in_mst[v]:
                d = abs(points[u][0] - points[v][0]) + abs(points[u][1] - points[v][1])
                if d < dist[v]:
                    dist[v] = d
    return int(total)`,
      },
      {
        language: "typescript",
        label: "Prim's MST",
        code: `function minCostConnectPoints(points: number[][]): number {
  const n = points.length;
  if (n <= 1) return 0;
  const inMST = new Array(n).fill(false);
  const dist = new Array(n).fill(Infinity);
  dist[0] = 0;
  let total = 0;
  for (let k = 0; k < n; k++) {
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!inMST[i] && (u === -1 || dist[i] < dist[u])) u = i;
    }
    inMST[u] = true;
    total += dist[u];
    for (let v = 0; v < n; v++) {
      if (!inMST[v]) {
        const d =
          Math.abs(points[u][0] - points[v][0]) +
          Math.abs(points[u][1] - points[v][1]);
        if (d < dist[v]) dist[v] = d;
      }
    }
  }
  return total;
}`,
      },
    ],
    runner: {
      entry: "minCostConnectPoints",
      comparison: "deep",
      jsStarter: `function minCostConnectPoints(points) {
  // Return the minimum Manhattan-distance cost to connect all points (MST).
  // TODO: implement
}`,
      jsReference: `function minCostConnectPoints(points) {
  const n = points.length;
  if (n <= 1) return 0;
  const inMST = new Array(n).fill(false);
  const dist = new Array(n).fill(Infinity);
  dist[0] = 0;
  let total = 0;
  for (let k = 0; k < n; k++) {
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!inMST[i] && (u === -1 || dist[i] < dist[u])) u = i;
    }
    inMST[u] = true;
    total += dist[u];
    for (let v = 0; v < n; v++) {
      if (!inMST[v]) {
        const d =
          Math.abs(points[u][0] - points[v][0]) +
          Math.abs(points[u][1] - points[v][1]);
        if (d < dist[v]) dist[v] = d;
      }
    }
  }
  return total;
}`,
    },
    tests: [
      { name: "five points", args: [[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]], expected: 20 },
      { name: "three points", args: [[[3, 12], [-2, 5], [-4, 1]]], expected: 18 },
      { name: "single point", args: [[[0, 0]]], expected: 0 },
      { name: "two points", args: [[[0, 0], [1, 1]]], expected: 2 },
    ],
    relatedIds: [1135, 1168, 743],
  },
  {
    id: 787,
    slug: "cheapest-flights-within-k-stops",
    title: "Cheapest Flights Within K Stops",
    difficulty: "Medium",
    category: "advanced-graphs",
    patterns: ["Bellman-Ford", "Shortest Path"],
    companies: ["amazon", "google", "uber", "bloomberg"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    description:
      "Given flights between cities with prices, find the cheapest fare from a source city to a destination using at most k intermediate stops. Return -1 if no such route exists.",
    examples: [
      { input: "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1", output: "700" },
      { input: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1", output: "200" },
    ],
    intuition:
      "Limiting the number of stops to k means using at most k+1 edges. Bellman-Ford relaxes edges in rounds, and running exactly k+1 rounds — each from a snapshot of the previous round — yields the cheapest cost reachable within that edge budget.",
    approach: [
      "Initialize all distances to infinity except the source at 0.",
      "Repeat k+1 times: copy the current distances into a fresh array.",
      "Relax every flight using the previous round's distances into the copy.",
      "Swap in the copy as the new distances.",
      "Return the destination's distance, or -1 if still infinite.",
    ],
    complexity: { time: "O(k · E)", space: "O(n)", note: "E flights relaxed across k+1 rounds." },
    solutions: [
      {
        language: "python",
        label: "Bellman-Ford",
        code: `def find_cheapest_price(
    n: int, flights: list[list[int]], src: int, dst: int, k: int
) -> int:
    dist = [float("inf")] * n
    dist[src] = 0
    for _ in range(k + 1):
        nxt = dist[:]
        for u, v, w in flights:
            if dist[u] != float("inf") and dist[u] + w < nxt[v]:
                nxt[v] = dist[u] + w
        dist = nxt
    return -1 if dist[dst] == float("inf") else int(dist[dst])`,
      },
      {
        language: "typescript",
        label: "Bellman-Ford",
        code: `function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number,
): number {
  let dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  for (let i = 0; i <= k; i++) {
    const next = dist.slice();
    for (const [u, v, w] of flights) {
      if (dist[u] !== Infinity && dist[u] + w < next[v]) {
        next[v] = dist[u] + w;
      }
    }
    dist = next;
  }
  return dist[dst] === Infinity ? -1 : dist[dst];
}`,
      },
    ],
    runner: {
      entry: "findCheapestPrice",
      comparison: "deep",
      jsStarter: `function findCheapestPrice(n, flights, src, dst, k) {
  // Cheapest src->dst price using at most k stops, or -1 if unreachable.
  // TODO: implement
}`,
      jsReference: `function findCheapestPrice(n, flights, src, dst, k) {
  let dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  for (let i = 0; i <= k; i++) {
    const next = dist.slice();
    for (const [u, v, w] of flights) {
      if (dist[u] !== Infinity && dist[u] + w < next[v]) {
        next[v] = dist[u] + w;
      }
    }
    dist = next;
  }
  return dist[dst] === Infinity ? -1 : dist[dst];
}`,
    },
    tests: [
      {
        name: "one stop detour",
        args: [4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1],
        expected: 700,
      },
      { name: "cheaper with stop", args: [3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1], expected: 200 },
      { name: "direct only", args: [3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0], expected: 500 },
      { name: "single edge", args: [2, [[0, 1, 50]], 0, 1, 0], expected: 50 },
      { name: "unreachable", args: [2, [], 0, 1, 5], expected: -1 },
    ],
    relatedIds: [743, 1334, 882],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Bit Manipulation
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 137,
    slug: "single-number-ii",
    title: "Single Number II",
    difficulty: "Medium",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 51,
    leetcodeUrl: "https://leetcode.com/problems/single-number-ii/",
    description:
      "Every value in an integer array appears exactly three times except for one value that appears once. Identify and return that unique value using constant extra space.",
    examples: [
      { input: "nums = [2,2,3,2]", output: "3" },
      { input: "nums = [0,1,0,1,0,1,99]", output: "99" },
    ],
    intuition:
      "Count each bit position modulo three. Two accumulators, `ones` and `twos`, act as a base-3 counter per bit: a bit reaches `ones` after one occurrence and clears after the third. The lone element's bits survive in `ones`.",
    approach: [
      "Initialize ones = 0 and twos = 0.",
      "For each number, fold it into ones masked by the complement of twos.",
      "Then fold it into twos masked by the complement of the updated ones.",
      "After processing every number, ones holds the unique value.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Two integer accumulators, one pass." },
    solutions: [
      {
        language: "python",
        label: "Bit Counters",
        code: `def single_number(nums: list[int]) -> int:
    ones = twos = 0
    for x in nums:
        ones = (ones ^ x) & ~twos
        twos = (twos ^ x) & ~ones
    return ones`,
      },
      {
        language: "typescript",
        label: "Bit Counters",
        code: `function singleNumber(nums: number[]): number {
  let ones = 0, twos = 0;
  for (const x of nums) {
    ones = (ones ^ x) & ~twos;
    twos = (twos ^ x) & ~ones;
  }
  return ones;
}`,
      },
    ],
    runner: {
      entry: "singleNumber",
      comparison: "deep",
      jsStarter: `function singleNumber(nums) {
  // Every value appears three times except one; return that one value.
  // TODO: implement
}`,
      jsReference: `function singleNumber(nums) {
  let ones = 0, twos = 0;
  for (const x of nums) {
    ones = (ones ^ x) & ~twos;
    twos = (twos ^ x) & ~ones;
  }
  return ones;
}`,
    },
    tests: [
      { name: "small", args: [[2, 2, 3, 2]], expected: 3 },
      { name: "with 99", args: [[0, 1, 0, 1, 0, 1, 99]], expected: 99 },
      { name: "negatives", args: [[-2, -2, 1, 1, -3, 1, -2]], expected: -3 },
      { name: "single element", args: [[1]], expected: 1 },
      { name: "larger values", args: [[30000, 500, 100, 30000, 100, 30000, 100]], expected: 500 },
    ],
    relatedIds: [136, 260, 268],
  },
  {
    id: 371,
    slug: "sum-of-two-integers",
    title: "Sum of Two Integers",
    difficulty: "Medium",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation"],
    companies: ["amazon", "apple", "microsoft"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/sum-of-two-integers/",
    description:
      "Compute the sum of two signed integers without using the addition or subtraction operators. Use bitwise operations to simulate the arithmetic.",
    examples: [
      { input: "a = 1, b = 2", output: "3" },
      { input: "a = -1, b = 1", output: "0" },
    ],
    intuition:
      "Addition splits into a carry-free part and a carry part. XOR adds bits while ignoring carries, and AND shifted left by one captures exactly where carries occur. Repeat until no carry remains, treating values as 32-bit two's-complement.",
    approach: [
      "Loop while b (the carry) is non-zero.",
      "Compute carry = (a & b) << 1.",
      "Set a = a ^ b (sum without carry).",
      "Set b = carry and repeat.",
      "Return a once the carry is exhausted.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "At most 32 carry-propagation iterations." },
    solutions: [
      {
        language: "python",
        label: "Bitwise Add",
        code: `def get_sum(a: int, b: int) -> int:
    mask = 0xFFFFFFFF
    while b & mask:
        carry = (a & b) << 1
        a, b = a ^ b, carry
    a &= mask
    return a if a <= 0x7FFFFFFF else ~(a ^ mask)`,
      },
      {
        language: "typescript",
        label: "Bitwise Add",
        code: `function getSum(a: number, b: number): number {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,
      },
    ],
    runner: {
      entry: "getSum",
      comparison: "deep",
      jsStarter: `function getSum(a, b) {
  // Return a + b without using the + or - operators.
  // TODO: implement
}`,
      jsReference: `function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,
    },
    tests: [
      { name: "positives", args: [1, 2], expected: 3 },
      { name: "both positive", args: [2, 3], expected: 5 },
      { name: "cancel out", args: [-1, 1], expected: 0 },
      { name: "mixed sign", args: [-2, 3], expected: 1 },
      { name: "zeros", args: [0, 0], expected: 0 },
    ],
    relatedIds: [2, 67, 415],
  },
];

export default batchH;
