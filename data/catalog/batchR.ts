import type { Problem } from "../types.ts";

/**
 * Batch R — dynamic programming (dp-1d and dp-2d).
 * Every record ships working Python + TypeScript plus a runnable runner + tests.
 */
export const batchR: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // dp-1d
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 264,
    slug: "ugly-number-ii",
    title: "Ugly Number II",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Multiple Pointers"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/ugly-number-ii/",
    description:
      "An ugly number is a positive integer whose only prime factors are 2, 3, and 5. Return the n-th ugly number in increasing order, counting 1 as the first.",
    examples: [
      { input: "n = 10", output: "12", explanation: "The sequence starts 1,2,3,4,5,6,8,9,10,12." },
      { input: "n = 1", output: "1", explanation: "1 is treated as the first ugly number." },
    ],
    intuition:
      "Every ugly number is some earlier ugly number multiplied by 2, 3, or 5. Keep three pointers, each tracking which previous value should next be scaled by that factor, and always emit the smallest of the three candidates.",
    approach: [
      "Initialize dp[0] = 1 and three indices i2 = i3 = i5 = 0.",
      "Each step, form the three candidates dp[i2]*2, dp[i3]*3, dp[i5]*5.",
      "Append the minimum candidate and advance every pointer that produced it (to skip duplicates).",
      "Return dp[n-1].",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each of n values is produced once." },
    solutions: [
      {
        language: "python",
        label: "Three Pointers DP",
        code: `def nth_ugly_number(n: int) -> int:
    dp = [1] * n
    i2 = i3 = i5 = 0
    for i in range(1, n):
        a, b, c = dp[i2] * 2, dp[i3] * 3, dp[i5] * 5
        dp[i] = min(a, b, c)
        if dp[i] == a:
            i2 += 1
        if dp[i] == b:
            i3 += 1
        if dp[i] == c:
            i5 += 1
    return dp[-1]`,
      },
      {
        language: "typescript",
        label: "Three Pointers DP",
        code: `function nthUglyNumber(n: number): number {
  const dp = new Array<number>(n);
  dp[0] = 1;
  let i2 = 0, i3 = 0, i5 = 0;
  for (let i = 1; i < n; i++) {
    const a = dp[i2] * 2, b = dp[i3] * 3, c = dp[i5] * 5;
    const m = Math.min(a, b, c);
    dp[i] = m;
    if (m === a) i2++;
    if (m === b) i3++;
    if (m === c) i5++;
  }
  return dp[n - 1];
}`,
      },
    ],
    runner: {
      entry: "nthUglyNumber",
      comparison: "deep",
      jsStarter: `function nthUglyNumber(n) {
  // Return the n-th positive integer whose only prime factors are 2, 3, 5.
  // TODO: implement
}`,
      jsReference: `function nthUglyNumber(n) {
  const dp = new Array(n);
  dp[0] = 1;
  let i2 = 0, i3 = 0, i5 = 0;
  for (let i = 1; i < n; i++) {
    const a = dp[i2] * 2, b = dp[i3] * 3, c = dp[i5] * 5;
    const m = Math.min(a, b, c);
    dp[i] = m;
    if (m === a) i2++;
    if (m === b) i3++;
    if (m === c) i5++;
  }
  return dp[n - 1];
}`,
    },
    tests: [
      { name: "first", args: [1], expected: 1 },
      { name: "tenth", args: [10], expected: 12 },
      { name: "seventh", args: [7], expected: 8 },
      { name: "eleventh", args: [11], expected: 15 },
    ],
  },
  {
    id: 118,
    slug: "pascals-triangle",
    title: "Pascal's Triangle",
    difficulty: "Easy",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Grid"],
    companies: ["amazon", "apple", "microsoft", "adobe"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/pascals-triangle/",
    description:
      "Return the first numRows of Pascal's triangle, where each row begins and ends with 1 and every interior value is the sum of the two values directly above it.",
    examples: [
      { input: "numRows = 5", output: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]" },
      { input: "numRows = 1", output: "[[1]]" },
    ],
    intuition:
      "Build the triangle row by row. Each new row has length one greater than the previous; its endpoints are 1 and each inner cell is the sum of the two adjacent cells in the row above.",
    approach: [
      "Start with an empty list of rows.",
      "For row r, create an array of r+1 ones.",
      "Fill positions 1..r-1 using rows[r-1][c-1] + rows[r-1][c].",
      "Append the row and continue.",
    ],
    complexity: { time: "O(numRows^2)", space: "O(numRows^2)", note: "Total cells across all rows." },
    solutions: [
      {
        language: "python",
        label: "Row by Row",
        code: `def generate(num_rows: int) -> list[list[int]]:
    rows: list[list[int]] = []
    for r in range(num_rows):
        row = [1] * (r + 1)
        for c in range(1, r):
            row[c] = rows[r - 1][c - 1] + rows[r - 1][c]
        rows.append(row)
    return rows`,
      },
      {
        language: "typescript",
        label: "Row by Row",
        code: `function generate(numRows: number): number[][] {
  const rows: number[][] = [];
  for (let r = 0; r < numRows; r++) {
    const row = new Array<number>(r + 1).fill(1);
    for (let c = 1; c < r; c++) row[c] = rows[r - 1][c - 1] + rows[r - 1][c];
    rows.push(row);
  }
  return rows;
}`,
      },
    ],
    runner: {
      entry: "generate",
      comparison: "deep",
      jsStarter: `function generate(numRows) {
  // Return the first numRows of Pascal's triangle.
  // TODO: implement
}`,
      jsReference: `function generate(numRows) {
  const rows = [];
  for (let r = 0; r < numRows; r++) {
    const row = new Array(r + 1).fill(1);
    for (let c = 1; c < r; c++) row[c] = rows[r - 1][c - 1] + rows[r - 1][c];
    rows.push(row);
  }
  return rows;
}`,
    },
    tests: [
      { name: "one row", args: [1], expected: [[1]] },
      { name: "two rows", args: [2], expected: [[1], [1, 1]] },
      { name: "three rows", args: [3], expected: [[1], [1, 1], [1, 2, 1]] },
      { name: "five rows", args: [5], expected: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]] },
    ],
  },
  {
    id: 119,
    slug: "pascals-triangle-ii",
    title: "Pascal's Triangle II",
    difficulty: "Easy",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "In-place"],
    companies: ["amazon", "microsoft", "adobe"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/pascals-triangle-ii/",
    description:
      "Given a 0-indexed rowIndex, return just that single row of Pascal's triangle as an array.",
    examples: [
      { input: "rowIndex = 3", output: "[1,3,3,1]" },
      { input: "rowIndex = 0", output: "[1]" },
    ],
    intuition:
      "You only need the final row, so repeatedly transform one array. Adding the array shifted by one to itself produces the next row, which is exactly the pairwise-sum rule of Pascal's triangle.",
    approach: [
      "Start with the row [1].",
      "Repeat rowIndex times: combine [0]+row with row+[0] element-wise.",
      "Each combination yields the next deeper row.",
      "Return the resulting array.",
    ],
    complexity: { time: "O(rowIndex^2)", space: "O(rowIndex)", note: "Only one row is kept at a time." },
    solutions: [
      {
        language: "python",
        label: "Rolling Row",
        code: `def get_row(row_index: int) -> list[int]:
    row = [1]
    for _ in range(row_index):
        row = [a + b for a, b in zip([0] + row, row + [0])]
    return row`,
      },
      {
        language: "typescript",
        label: "Rolling Row",
        code: `function getRow(rowIndex: number): number[] {
  let row = [1];
  for (let k = 0; k < rowIndex; k++) {
    const next = new Array<number>(row.length + 1);
    for (let i = 0; i <= row.length; i++) {
      const left = i > 0 ? row[i - 1] : 0;
      const right = i < row.length ? row[i] : 0;
      next[i] = left + right;
    }
    row = next;
  }
  return row;
}`,
      },
    ],
    runner: {
      entry: "getRow",
      comparison: "deep",
      jsStarter: `function getRow(rowIndex) {
  // Return the rowIndex-th (0-indexed) row of Pascal's triangle.
  // TODO: implement
}`,
      jsReference: `function getRow(rowIndex) {
  let row = [1];
  for (let k = 0; k < rowIndex; k++) {
    const next = new Array(row.length + 1);
    for (let i = 0; i <= row.length; i++) {
      const left = i > 0 ? row[i - 1] : 0;
      const right = i < row.length ? row[i] : 0;
      next[i] = left + right;
    }
    row = next;
  }
  return row;
}`,
    },
    tests: [
      { name: "row 0", args: [0], expected: [1] },
      { name: "row 1", args: [1], expected: [1, 1] },
      { name: "row 3", args: [3], expected: [1, 3, 3, 1] },
      { name: "row 4", args: [4], expected: [1, 4, 6, 4, 1] },
    ],
  },
  {
    id: 1218,
    slug: "longest-arithmetic-subsequence-of-given-difference",
    title: "Longest Arithmetic Subsequence of Given Difference",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Hash Map"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference/",
    description:
      "Given an integer array arr and a fixed difference, return the length of the longest subsequence whose consecutive elements differ by exactly that difference.",
    examples: [
      { input: "arr = [1,2,3,4], difference = 1", output: "4" },
      { input: "arr = [1,5,7,8,5,3,4,2,1], difference = -2", output: "4", explanation: "The subsequence [7,5,3,1]." },
    ],
    intuition:
      "For each value x, the best chain ending at x extends the best chain ending at x - difference. A hash map from value to chain length lets each element extend its predecessor in O(1).",
    approach: [
      "Keep a map from value to the longest chain ending at that value.",
      "For each x, set map[x] = map[x - difference] (default 0) + 1.",
      "Track the running maximum chain length.",
      "Return that maximum.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "One pass with constant-time map lookups." },
    solutions: [
      {
        language: "python",
        label: "Hash Map DP",
        code: `def longest_subsequence(arr: list[int], difference: int) -> int:
    dp: dict[int, int] = {}
    best = 0
    for x in arr:
        dp[x] = dp.get(x - difference, 0) + 1
        best = max(best, dp[x])
    return best`,
      },
      {
        language: "typescript",
        label: "Hash Map DP",
        code: `function longestSubsequence(arr: number[], difference: number): number {
  const dp = new Map<number, number>();
  let best = 0;
  for (const x of arr) {
    const len = (dp.get(x - difference) ?? 0) + 1;
    dp.set(x, len);
    best = Math.max(best, len);
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "longestSubsequence",
      comparison: "deep",
      jsStarter: `function longestSubsequence(arr, difference) {
  // Longest subsequence whose consecutive gaps all equal difference.
  // TODO: implement
}`,
      jsReference: `function longestSubsequence(arr, difference) {
  const dp = new Map();
  let best = 0;
  for (const x of arr) {
    const len = (dp.get(x - difference) ?? 0) + 1;
    dp.set(x, len);
    best = Math.max(best, len);
  }
  return best;
}`,
    },
    tests: [
      { name: "all consecutive", args: [[1, 2, 3, 4], 1], expected: 4 },
      { name: "no chain", args: [[1, 3, 5, 7], 1], expected: 1 },
      { name: "negative diff", args: [[1, 5, 7, 8, 5, 3, 4, 2, 1], -2], expected: 4 },
      { name: "zero diff", args: [[1, 1, 1, 1, 1], 0], expected: 5 },
    ],
  },
  {
    id: 673,
    slug: "number-of-longest-increasing-subsequence",
    title: "Number of Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Counting"],
    companies: ["amazon", "google", "microsoft", "uber"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
    description:
      "Given an integer array nums, return how many strictly increasing subsequences have the maximum possible length.",
    examples: [
      { input: "nums = [1,3,5,4,7]", output: "2", explanation: "Both [1,3,4,7] and [1,3,5,7] have length 4." },
      { input: "nums = [2,2,2,2,2]", output: "5", explanation: "Each single element is a length-1 LIS." },
    ],
    intuition:
      "Track two parallel arrays: the LIS length ending at each index and how many such subsequences achieve it. When a longer chain is found, copy its count; when an equal-length chain is found, accumulate the counts.",
    approach: [
      "Initialize length[i] = 1 and count[i] = 1 for all i.",
      "For each i and earlier j with nums[j] < nums[i], extend: if it makes a strictly longer chain, replace length and count; if it ties, add to count.",
      "Find the overall maximum length.",
      "Sum counts of all indices whose length equals that maximum.",
    ],
    complexity: { time: "O(n^2)", space: "O(n)", note: "Pairwise comparison over the array." },
    solutions: [
      {
        language: "python",
        label: "Length + Count DP",
        code: `def find_number_of_lis(nums: list[int]) -> int:
    n = len(nums)
    if n == 0:
        return 0
    length = [1] * n
    count = [1] * n
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i]:
                if length[j] + 1 > length[i]:
                    length[i] = length[j] + 1
                    count[i] = count[j]
                elif length[j] + 1 == length[i]:
                    count[i] += count[j]
    longest = max(length)
    return sum(c for l, c in zip(length, count) if l == longest)`,
      },
      {
        language: "typescript",
        label: "Length + Count DP",
        code: `function findNumberOfLIS(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  const length = new Array<number>(n).fill(1);
  const count = new Array<number>(n).fill(1);
  let maxLen = 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        if (length[j] + 1 > length[i]) {
          length[i] = length[j] + 1;
          count[i] = count[j];
        } else if (length[j] + 1 === length[i]) {
          count[i] += count[j];
        }
      }
    }
    maxLen = Math.max(maxLen, length[i]);
  }
  let total = 0;
  for (let i = 0; i < n; i++) if (length[i] === maxLen) total += count[i];
  return total;
}`,
      },
    ],
    runner: {
      entry: "findNumberOfLIS",
      comparison: "deep",
      jsStarter: `function findNumberOfLIS(nums) {
  // Count the number of longest strictly increasing subsequences.
  // TODO: implement
}`,
      jsReference: `function findNumberOfLIS(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  const length = new Array(n).fill(1);
  const count = new Array(n).fill(1);
  let maxLen = 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        if (length[j] + 1 > length[i]) {
          length[i] = length[j] + 1;
          count[i] = count[j];
        } else if (length[j] + 1 === length[i]) {
          count[i] += count[j];
        }
      }
    }
    maxLen = Math.max(maxLen, length[i]);
  }
  let total = 0;
  for (let i = 0; i < n; i++) if (length[i] === maxLen) total += count[i];
  return total;
}`,
    },
    tests: [
      { name: "two longest", args: [[1, 3, 5, 4, 7]], expected: 2 },
      { name: "all equal", args: [[2, 2, 2, 2, 2]], expected: 5 },
      { name: "single chain", args: [[1, 2, 3]], expected: 1 },
      { name: "decreasing", args: [[3, 2, 1]], expected: 3 },
    ],
  },
  {
    id: 1025,
    slug: "divisor-game",
    title: "Divisor Game",
    difficulty: "Easy",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Game Theory"],
    companies: ["google", "amazon"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/divisor-game/",
    description:
      "Two players alternate turns starting from a number n. On a turn a player replaces n with n - x for any x that strictly divides n; a player who cannot move loses. Return true if the first player wins with optimal play.",
    examples: [
      { input: "n = 2", output: "true", explanation: "Player one subtracts 1, leaving 1 with no move for player two." },
      { input: "n = 3", output: "false" },
    ],
    intuition:
      "A position is winning if any legal move leads to a losing position for the opponent. Building this up from small numbers, the current player wins exactly when some proper divisor leaves a losing state.",
    approach: [
      "Let dp[i] mean the player to move wins at value i.",
      "dp[1] = false (no move available).",
      "For each i, try every proper divisor x: if dp[i - x] is false, dp[i] becomes true.",
      "Return dp[n].",
    ],
    complexity: { time: "O(n^2)", space: "O(n)", note: "Each state scans its divisors." },
    solutions: [
      {
        language: "python",
        label: "Bottom-up DP",
        code: `def divisor_game(n: int) -> bool:
    dp = [False] * (n + 1)
    for i in range(2, n + 1):
        for x in range(1, i):
            if i % x == 0 and not dp[i - x]:
                dp[i] = True
                break
    return dp[n]`,
      },
      {
        language: "typescript",
        label: "Bottom-up DP",
        code: `function divisorGame(n: number): boolean {
  const dp = new Array<boolean>(n + 1).fill(false);
  for (let i = 2; i <= n; i++) {
    for (let x = 1; x < i; x++) {
      if (i % x === 0 && !dp[i - x]) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
}`,
      },
    ],
    runner: {
      entry: "divisorGame",
      comparison: "deep",
      jsStarter: `function divisorGame(n) {
  // Return true if the first player wins the divisor game from n.
  // TODO: implement
}`,
      jsReference: `function divisorGame(n) {
  const dp = new Array(n + 1).fill(false);
  for (let i = 2; i <= n; i++) {
    for (let x = 1; x < i; x++) {
      if (i % x === 0 && !dp[i - x]) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
}`,
    },
    tests: [
      { name: "n=2", args: [2], expected: true },
      { name: "n=3", args: [3], expected: false },
      { name: "n=4", args: [4], expected: true },
      { name: "n=5", args: [5], expected: false },
    ],
  },
  {
    id: 494,
    slug: "target-sum",
    title: "Target Sum",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Subset Sum"],
    companies: ["amazon", "google", "meta", "bloomberg"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/target-sum/",
    description:
      "Given an array nums and an integer target, assign a + or - sign to each number and count how many sign assignments make the total equal to target.",
    examples: [
      { input: "nums = [1,1,1,1,1], target = 3", output: "5" },
      { input: "nums = [1], target = 1", output: "1" },
    ],
    intuition:
      "Split the numbers into a positive group P and a negative group N. Since P - N = target and P + N = total, the positive group must sum to (total + target) / 2, turning the problem into a classic subset-sum count.",
    approach: [
      "Compute total; if target is out of range or (total + target) is odd, return 0.",
      "Let s = (total + target) / 2 be the required positive-subset sum.",
      "Run a 1-D subset-sum count: dp[j] += dp[j - x] iterating j downward.",
      "Return dp[s].",
    ],
    complexity: { time: "O(n * s)", space: "O(s)", note: "s is the derived subset target." },
    solutions: [
      {
        language: "python",
        label: "Subset Sum Count",
        code: `def find_target_sum_ways(nums: list[int], target: int) -> int:
    total = sum(nums)
    if abs(target) > total or (total + target) % 2:
        return 0
    s = (total + target) // 2
    dp = [0] * (s + 1)
    dp[0] = 1
    for x in nums:
        for j in range(s, x - 1, -1):
            dp[j] += dp[j - x]
    return dp[s]`,
      },
      {
        language: "typescript",
        label: "Subset Sum Count",
        code: `function findTargetSumWays(nums: number[], target: number): number {
  const total = nums.reduce((a, b) => a + b, 0);
  if (Math.abs(target) > total || (total + target) % 2 !== 0) return 0;
  const s = (total + target) / 2;
  const dp = new Array<number>(s + 1).fill(0);
  dp[0] = 1;
  for (const x of nums) {
    for (let j = s; j >= x; j--) dp[j] += dp[j - x];
  }
  return dp[s];
}`,
      },
    ],
    runner: {
      entry: "findTargetSumWays",
      comparison: "deep",
      jsStarter: `function findTargetSumWays(nums, target) {
  // Count sign assignments that make the sum equal target.
  // TODO: implement
}`,
      jsReference: `function findTargetSumWays(nums, target) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (Math.abs(target) > total || (total + target) % 2 !== 0) return 0;
  const s = (total + target) / 2;
  const dp = new Array(s + 1).fill(0);
  dp[0] = 1;
  for (const x of nums) {
    for (let j = s; j >= x; j--) dp[j] += dp[j - x];
  }
  return dp[s];
}`,
    },
    tests: [
      { name: "five ones", args: [[1, 1, 1, 1, 1], 3], expected: 5 },
      { name: "single", args: [[1], 1], expected: 1 },
      { name: "with zero", args: [[1, 0], 1], expected: 2 },
      { name: "mixed", args: [[1, 2, 1], 0], expected: 2 },
    ],
  },
  {
    id: 416,
    slug: "partition-equal-subset-sum",
    title: "Partition Equal Subset Sum",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Subset Sum"],
    companies: ["amazon", "google", "meta", "microsoft", "uber"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
    description:
      "Decide whether an integer array can be split into two groups with equal sums. Return true if such a partition exists.",
    examples: [
      { input: "nums = [1,5,11,5]", output: "true", explanation: "{1,5,5} and {11} each sum to 11." },
      { input: "nums = [1,2,3,5]", output: "false" },
    ],
    intuition:
      "An equal split is possible only if the total is even, and then it reduces to asking whether some subset sums to half the total. A boolean knapsack over reachable subset sums answers this.",
    approach: [
      "If the total sum is odd, return false immediately.",
      "Let target = total / 2 and a boolean dp where dp[j] means sum j is reachable.",
      "For each number, update dp[j] |= dp[j - x] iterating j downward.",
      "Return dp[target].",
    ],
    complexity: { time: "O(n * sum)", space: "O(sum)", note: "1-D knapsack over half the total." },
    solutions: [
      {
        language: "python",
        label: "Boolean Knapsack",
        code: `def can_partition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2:
        return False
    t = total // 2
    dp = [False] * (t + 1)
    dp[0] = True
    for x in nums:
        for j in range(t, x - 1, -1):
            dp[j] = dp[j] or dp[j - x]
    return dp[t]`,
      },
      {
        language: "typescript",
        label: "Boolean Knapsack",
        code: `function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  const t = sum / 2;
  const dp = new Array<boolean>(t + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let j = t; j >= x; j--) dp[j] = dp[j] || dp[j - x];
  }
  return dp[t];
}`,
      },
    ],
    runner: {
      entry: "canPartition",
      comparison: "deep",
      jsStarter: `function canPartition(nums) {
  // Return true if nums can split into two equal-sum groups.
  // TODO: implement
}`,
      jsReference: `function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  const t = sum / 2;
  const dp = new Array(t + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let j = t; j >= x; j--) dp[j] = dp[j] || dp[j - x];
  }
  return dp[t];
}`,
    },
    tests: [
      { name: "splittable", args: [[1, 5, 11, 5]], expected: true },
      { name: "odd total", args: [[1, 2, 3, 5]], expected: false },
      { name: "no subset", args: [[1, 2, 5]], expected: false },
      { name: "even halves", args: [[2, 2, 2, 2]], expected: true },
    ],
  },
  {
    id: 1049,
    slug: "last-stone-weight-ii",
    title: "Last Stone Weight II",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Subset Sum"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/last-stone-weight-ii/",
    description:
      "Each turn smashes two stones, leaving the difference of their weights. Return the smallest possible weight of the final remaining stone (0 if none remains).",
    examples: [
      { input: "stones = [2,7,4,1,8,1]", output: "1" },
      { input: "stones = [31,26,33,21,40]", output: "5" },
    ],
    intuition:
      "Every smash assigns each stone a + or - sign, so the final value is the absolute difference between two groups. Minimizing it means picking a subset summing as close as possible to half the total.",
    approach: [
      "Compute total and target t = floor(total / 2).",
      "Use a boolean subset-sum dp to find every reachable subset sum up to t.",
      "Take the largest reachable sum j ≤ t.",
      "Return total - 2 * j.",
    ],
    complexity: { time: "O(n * sum)", space: "O(sum)", note: "Closest subset to half the total." },
    solutions: [
      {
        language: "python",
        label: "Subset Sum",
        code: `def last_stone_weight_ii(stones: list[int]) -> int:
    total = sum(stones)
    t = total // 2
    dp = [False] * (t + 1)
    dp[0] = True
    for x in stones:
        for j in range(t, x - 1, -1):
            dp[j] = dp[j] or dp[j - x]
    for j in range(t, -1, -1):
        if dp[j]:
            return total - 2 * j
    return total`,
      },
      {
        language: "typescript",
        label: "Subset Sum",
        code: `function lastStoneWeightII(stones: number[]): number {
  const total = stones.reduce((a, b) => a + b, 0);
  const t = Math.floor(total / 2);
  const dp = new Array<boolean>(t + 1).fill(false);
  dp[0] = true;
  for (const x of stones) {
    for (let j = t; j >= x; j--) dp[j] = dp[j] || dp[j - x];
  }
  for (let j = t; j >= 0; j--) if (dp[j]) return total - 2 * j;
  return total;
}`,
      },
    ],
    runner: {
      entry: "lastStoneWeightII",
      comparison: "deep",
      jsStarter: `function lastStoneWeightII(stones) {
  // Return the smallest possible weight of the last remaining stone.
  // TODO: implement
}`,
      jsReference: `function lastStoneWeightII(stones) {
  const total = stones.reduce((a, b) => a + b, 0);
  const t = Math.floor(total / 2);
  const dp = new Array(t + 1).fill(false);
  dp[0] = true;
  for (const x of stones) {
    for (let j = t; j >= x; j--) dp[j] = dp[j] || dp[j - x];
  }
  for (let j = t; j >= 0; j--) if (dp[j]) return total - 2 * j;
  return total;
}`,
    },
    tests: [
      { name: "example one", args: [[2, 7, 4, 1, 8, 1]], expected: 1 },
      { name: "example two", args: [[31, 26, 33, 21, 40]], expected: 5 },
      { name: "two stones", args: [[1, 2]], expected: 1 },
      { name: "cancel out", args: [[1, 1]], expected: 0 },
    ],
  },
  {
    id: 714,
    slug: "best-time-to-buy-and-sell-stock-with-transaction-fee",
    title: "Best Time to Buy and Sell Stock with Transaction Fee",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "State Machine"],
    companies: ["amazon", "google", "meta", "bloomberg"],
    frequency: 62,
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
    description:
      "Given daily prices and a fixed fee charged per completed sale, return the maximum profit from any number of buy/sell transactions (you may hold at most one share at a time).",
    examples: [
      { input: "prices = [1,3,2,8,4,9], fee = 2", output: "8" },
      { input: "prices = [1,3,7,5,10,3], fee = 3", output: "6" },
    ],
    intuition:
      "Track two running states each day: the best profit while holding a share and the best while holding cash. Selling pays the fee once, and both states only ever improve, so a single pass suffices.",
    approach: [
      "Initialize cash = 0 and hold = -prices[0].",
      "For each later price, update cash = max(cash, hold + price - fee).",
      "Then update hold = max(hold, cash - price).",
      "Return cash, the best profit ending without a share.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Two rolling state variables." },
    solutions: [
      {
        language: "python",
        label: "State Machine",
        code: `def max_profit(prices: list[int], fee: int) -> int:
    cash, hold = 0, -prices[0]
    for p in prices[1:]:
        cash = max(cash, hold + p - fee)
        hold = max(hold, cash - p)
    return cash`,
      },
      {
        language: "typescript",
        label: "State Machine",
        code: `function maxProfit(prices: number[], fee: number): number {
  let cash = 0;
  let hold = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    cash = Math.max(cash, hold + prices[i] - fee);
    hold = Math.max(hold, cash - prices[i]);
  }
  return cash;
}`,
      },
    ],
    runner: {
      entry: "maxProfit",
      comparison: "deep",
      jsStarter: `function maxProfit(prices, fee) {
  // Maximum profit across unlimited transactions with a per-sale fee.
  // TODO: implement
}`,
      jsReference: `function maxProfit(prices, fee) {
  let cash = 0;
  let hold = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    cash = Math.max(cash, hold + prices[i] - fee);
    hold = Math.max(hold, cash - prices[i]);
  }
  return cash;
}`,
    },
    tests: [
      { name: "example one", args: [[1, 3, 2, 8, 4, 9], 2], expected: 8 },
      { name: "example two", args: [[1, 3, 7, 5, 10, 3], 3], expected: 6 },
      { name: "no profit", args: [[1, 1, 1], 1], expected: 0 },
      { name: "zero fee", args: [[9, 8, 7, 1, 2], 0], expected: 1 },
    ],
  },
  {
    id: 1262,
    slug: "greatest-sum-divisible-by-three",
    title: "Greatest Sum Divisible by Three",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Dynamic Programming", "Remainder States"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/greatest-sum-divisible-by-three/",
    description:
      "Given an array of integers, return the maximum possible sum of a subset whose total is divisible by three.",
    examples: [
      { input: "nums = [3,6,5,1,8]", output: "18", explanation: "Choosing 3,6,1,8 sums to 18." },
      { input: "nums = [4]", output: "0" },
    ],
    intuition:
      "Carry the best achievable sum for each remainder modulo 3. Adding a new number shifts every remainder bucket, and you always keep the larger sum, so the answer is the best sum landing on remainder 0.",
    approach: [
      "Maintain dp[r] = best sum with remainder r, starting dp = [0, -inf, -inf].",
      "For each number, copy dp and, for each reachable remainder, update the new remainder bucket.",
      "Replace dp with the updated copy.",
      "Return dp[0].",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Only three remainder states are tracked." },
    solutions: [
      {
        language: "python",
        label: "Remainder DP",
        code: `def max_sum_div_three(nums: list[int]) -> int:
    dp = [0, float("-inf"), float("-inf")]
    for x in nums:
        cur = dp[:]
        for r in range(3):
            if dp[r] == float("-inf"):
                continue
            nr = (dp[r] + x) % 3
            cur[nr] = max(cur[nr], dp[r] + x)
        dp = cur
    return dp[0]`,
      },
      {
        language: "typescript",
        label: "Remainder DP",
        code: `function maxSumDivThree(nums: number[]): number {
  let dp = [0, -Infinity, -Infinity];
  for (const x of nums) {
    const cur = dp.slice();
    for (let r = 0; r < 3; r++) {
      if (dp[r] === -Infinity) continue;
      const nr = (((dp[r] + x) % 3) + 3) % 3;
      cur[nr] = Math.max(cur[nr], dp[r] + x);
    }
    dp = cur;
  }
  return dp[0];
}`,
      },
    ],
    runner: {
      entry: "maxSumDivThree",
      comparison: "deep",
      jsStarter: `function maxSumDivThree(nums) {
  // Maximum subset sum that is divisible by three.
  // TODO: implement
}`,
      jsReference: `function maxSumDivThree(nums) {
  let dp = [0, -Infinity, -Infinity];
  for (const x of nums) {
    const cur = dp.slice();
    for (let r = 0; r < 3; r++) {
      if (dp[r] === -Infinity) continue;
      const nr = (((dp[r] + x) % 3) + 3) % 3;
      cur[nr] = Math.max(cur[nr], dp[r] + x);
    }
    dp = cur;
  }
  return dp[0];
}`,
    },
    tests: [
      { name: "drop one", args: [[3, 6, 5, 1, 8]], expected: 18 },
      { name: "single not divisible", args: [[4]], expected: 0 },
      { name: "remove smallest", args: [[1, 2, 3, 4, 4]], expected: 12 },
      { name: "remove two", args: [[2, 6, 2, 2, 7]], expected: 15 },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // dp-2d
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1027,
    slug: "longest-arithmetic-subsequence",
    title: "Longest Arithmetic Subsequence",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Hash Map"],
    companies: ["amazon", "google", "microsoft", "uber"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/longest-arithmetic-subsequence/",
    description:
      "Given an array nums, return the length of the longest subsequence whose consecutive elements share a constant difference (an arithmetic subsequence).",
    examples: [
      { input: "nums = [3,6,9,12]", output: "4" },
      { input: "nums = [9,4,7,2,10]", output: "3", explanation: "The subsequence [4,7,10]." },
    ],
    intuition:
      "For each index, store a map from common difference to the best arithmetic chain ending there. Pairing index i with each earlier j extends j's chain for difference nums[i] - nums[j].",
    approach: [
      "Give every index a map from difference to chain length.",
      "For each pair (j, i) with j < i, compute d = nums[i] - nums[j].",
      "Set dp[i][d] = (dp[j][d] or 1) + 1 and track the maximum.",
      "Return the maximum chain length seen.",
    ],
    complexity: { time: "O(n^2)", space: "O(n^2)", note: "One difference map per index." },
    solutions: [
      {
        language: "python",
        label: "Per-index Difference Map",
        code: `def longest_arith_seq_length(nums: list[int]) -> int:
    dp: list[dict[int, int]] = [dict() for _ in nums]
    best = 0
    for i in range(len(nums)):
        for j in range(i):
            d = nums[i] - nums[j]
            dp[i][d] = dp[j].get(d, 1) + 1
            best = max(best, dp[i][d])
    return best`,
      },
      {
        language: "typescript",
        label: "Per-index Difference Map",
        code: `function longestArithSeqLength(nums: number[]): number {
  const n = nums.length;
  const dp: Map<number, number>[] = Array.from({ length: n }, () => new Map());
  let best = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const d = nums[i] - nums[j];
      const len = (dp[j].get(d) ?? 1) + 1;
      dp[i].set(d, len);
      best = Math.max(best, len);
    }
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "longestArithSeqLength",
      comparison: "deep",
      jsStarter: `function longestArithSeqLength(nums) {
  // Length of the longest arithmetic subsequence.
  // TODO: implement
}`,
      jsReference: `function longestArithSeqLength(nums) {
  const n = nums.length;
  const dp = Array.from({ length: n }, () => new Map());
  let best = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const d = nums[i] - nums[j];
      const len = (dp[j].get(d) ?? 1) + 1;
      dp[i].set(d, len);
      best = Math.max(best, len);
    }
  }
  return best;
}`,
    },
    tests: [
      { name: "full arithmetic", args: [[3, 6, 9, 12]], expected: 4 },
      { name: "middle chain", args: [[9, 4, 7, 2, 10]], expected: 3 },
      { name: "negative step", args: [[20, 1, 15, 3, 10, 5, 8]], expected: 4 },
      { name: "even spacing", args: [[2, 4, 6, 8, 10]], expected: 5 },
    ],
  },
  {
    id: 647,
    slug: "palindromic-substrings",
    title: "Palindromic Substrings",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Expand Around Center"],
    companies: ["amazon", "google", "meta", "microsoft"],
    frequency: 66,
    leetcodeUrl: "https://leetcode.com/problems/palindromic-substrings/",
    description:
      "Count how many contiguous substrings of the given string are palindromes; substrings at different positions count separately even if identical.",
    examples: [
      { input: "s = \"abc\"", output: "3", explanation: "The single characters a, b, c." },
      { input: "s = \"aaa\"", output: "6", explanation: "a, a, a, aa, aa, aaa." },
    ],
    intuition:
      "Every palindrome grows symmetrically from a center, and there are 2n-1 possible centers (single characters and gaps between characters). Expanding from each center counts all palindromes anchored there in linear total work per center.",
    approach: [
      "Iterate over all 2n-1 centers.",
      "For each center, set the left/right bounds and expand while the characters match.",
      "Increment the count on every successful expansion.",
      "Return the accumulated count.",
    ],
    complexity: { time: "O(n^2)", space: "O(1)", note: "Expand around each center." },
    solutions: [
      {
        language: "python",
        label: "Expand Around Center",
        code: `def count_substrings(s: str) -> int:
    total = 0
    for center in range(2 * len(s) - 1):
        l = center // 2
        r = l + center % 2
        while l >= 0 and r < len(s) and s[l] == s[r]:
            total += 1
            l -= 1
            r += 1
    return total`,
      },
      {
        language: "typescript",
        label: "Expand Around Center",
        code: `function countSubstrings(s: string): number {
  let total = 0;
  for (let center = 0; center < 2 * s.length - 1; center++) {
    let l = Math.floor(center / 2);
    let r = l + (center % 2);
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      total++;
      l--;
      r++;
    }
  }
  return total;
}`,
      },
    ],
    runner: {
      entry: "countSubstrings",
      comparison: "deep",
      jsStarter: `function countSubstrings(s) {
  // Count palindromic substrings (positions matter).
  // TODO: implement
}`,
      jsReference: `function countSubstrings(s) {
  let total = 0;
  for (let center = 0; center < 2 * s.length - 1; center++) {
    let l = Math.floor(center / 2);
    let r = l + (center % 2);
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      total++;
      l--;
      r++;
    }
  }
  return total;
}`,
    },
    tests: [
      { name: "all distinct", args: ["abc"], expected: 3 },
      { name: "all same", args: ["aaa"], expected: 6 },
      { name: "odd palindrome", args: ["aba"], expected: 4 },
      { name: "single char", args: ["a"], expected: 1 },
    ],
  },
  {
    id: 718,
    slug: "maximum-length-of-repeated-subarray",
    title: "Maximum Length of Repeated Subarray",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Grid"],
    companies: ["amazon", "google", "meta", "pinterest"],
    frequency: 57,
    leetcodeUrl: "https://leetcode.com/problems/maximum-length-of-repeated-subarray/",
    description:
      "Given two integer arrays, return the length of the longest contiguous block that appears in both (a common subarray, not subsequence).",
    examples: [
      { input: "nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]", output: "3", explanation: "[3,2,1] is shared." },
      { input: "nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]", output: "5" },
    ],
    intuition:
      "Let dp[i][j] be the length of the common run ending exactly at nums1[i-1] and nums2[j-1]. When the elements match, that run extends the diagonal predecessor by one; otherwise it resets to zero.",
    approach: [
      "Build a (n+1) x (m+1) grid initialized to 0.",
      "When nums1[i-1] equals nums2[j-1], set dp[i][j] = dp[i-1][j-1] + 1.",
      "Track the maximum dp value as you fill the grid.",
      "Return that maximum.",
    ],
    complexity: { time: "O(n * m)", space: "O(n * m)", note: "Standard grid DP." },
    solutions: [
      {
        language: "python",
        label: "Grid DP",
        code: `def find_length(a: list[int], b: list[int]) -> int:
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    best = 0
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
                best = max(best, dp[i][j])
    return best`,
      },
      {
        language: "typescript",
        label: "Grid DP",
        code: `function findLength(a: number[], b: number[]): number {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  let best = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        best = Math.max(best, dp[i][j]);
      }
    }
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "findLength",
      comparison: "deep",
      jsStarter: `function findLength(nums1, nums2) {
  // Length of the longest common contiguous subarray.
  // TODO: implement
}`,
      jsReference: `function findLength(a, b) {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  let best = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        best = Math.max(best, dp[i][j]);
      }
    }
  }
  return best;
}`,
    },
    tests: [
      { name: "shared run", args: [[1, 2, 3, 2, 1], [3, 2, 1, 4, 7]], expected: 3 },
      { name: "all match", args: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], expected: 5 },
      { name: "no overlap", args: [[1, 2, 3], [4, 5, 6]], expected: 0 },
      { name: "tail overlap", args: [[1, 2, 3, 2, 1], [3, 2, 1]], expected: 3 },
    ],
  },
  {
    id: 931,
    slug: "minimum-falling-path-sum",
    title: "Minimum Falling Path Sum",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Grid"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 53,
    leetcodeUrl: "https://leetcode.com/problems/minimum-falling-path-sum/",
    description:
      "Given an n x n matrix, a falling path starts in any cell of the top row and steps down to a cell that is directly below or diagonally adjacent. Return the minimum sum among all falling paths.",
    examples: [
      { input: "matrix = [[2,1,3],[6,5,4],[7,8,9]]", output: "13", explanation: "1 -> 5 -> 7." },
      { input: "matrix = [[-19,57],[-40,-5]]", output: "-59" },
    ],
    intuition:
      "The cheapest way to reach a cell is its own value plus the minimum of the three cells above it that can step down to it. Propagating this row by row leaves the answer in the final row.",
    approach: [
      "Initialize the running row with the matrix's top row.",
      "For each subsequent row, each cell takes its value plus the min of the up, up-left, up-right neighbors.",
      "Overwrite the running row with the new values.",
      "Return the minimum of the last row.",
    ],
    complexity: { time: "O(n^2)", space: "O(n)", note: "One rolling row." },
    solutions: [
      {
        language: "python",
        label: "Rolling Row DP",
        code: `def min_falling_path_sum(matrix: list[list[int]]) -> int:
    n = len(matrix)
    dp = matrix[0][:]
    for i in range(1, n):
        cur = [0] * n
        for j in range(n):
            best = dp[j]
            if j > 0:
                best = min(best, dp[j - 1])
            if j < n - 1:
                best = min(best, dp[j + 1])
            cur[j] = matrix[i][j] + best
        dp = cur
    return min(dp)`,
      },
      {
        language: "typescript",
        label: "Rolling Row DP",
        code: `function minFallingPathSum(matrix: number[][]): number {
  const n = matrix.length;
  let dp = matrix[0].slice();
  for (let i = 1; i < n; i++) {
    const cur = new Array<number>(n);
    for (let j = 0; j < n; j++) {
      let best = dp[j];
      if (j > 0) best = Math.min(best, dp[j - 1]);
      if (j < n - 1) best = Math.min(best, dp[j + 1]);
      cur[j] = matrix[i][j] + best;
    }
    dp = cur;
  }
  return Math.min(...dp);
}`,
      },
    ],
    runner: {
      entry: "minFallingPathSum",
      comparison: "deep",
      jsStarter: `function minFallingPathSum(matrix) {
  // Minimum top-to-bottom falling path sum.
  // TODO: implement
}`,
      jsReference: `function minFallingPathSum(matrix) {
  const n = matrix.length;
  let dp = matrix[0].slice();
  for (let i = 1; i < n; i++) {
    const cur = new Array(n);
    for (let j = 0; j < n; j++) {
      let best = dp[j];
      if (j > 0) best = Math.min(best, dp[j - 1]);
      if (j < n - 1) best = Math.min(best, dp[j + 1]);
      cur[j] = matrix[i][j] + best;
    }
    dp = cur;
  }
  return Math.min(...dp);
}`,
    },
    tests: [
      { name: "example one", args: [[[2, 1, 3], [6, 5, 4], [7, 8, 9]]], expected: 13 },
      { name: "negatives", args: [[[-19, 57], [-40, -5]]], expected: -59 },
      { name: "single cell", args: [[[1]]], expected: 1 },
      { name: "left column path", args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: 12 },
    ],
  },
  {
    id: 583,
    slug: "delete-operation-for-two-strings",
    title: "Delete Operation for Two Strings",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Longest Common Subsequence"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/delete-operation-for-two-strings/",
    description:
      "Given two strings, return the minimum number of single-character deletions (from either string) needed to make them equal.",
    examples: [
      { input: "word1 = \"sea\", word2 = \"eat\"", output: "2", explanation: "Delete 's' and 't' to leave 'ea'." },
      { input: "word1 = \"leetcode\", word2 = \"etco\"", output: "4" },
    ],
    intuition:
      "Whatever characters survive must form a common subsequence of both strings, and to delete as little as possible that subsequence should be the longest common one. Every character outside the LCS must be deleted from its string.",
    approach: [
      "Compute the length of the longest common subsequence with a grid DP.",
      "Characters not in the LCS in word1 are deletions, and likewise for word2.",
      "The answer is len(word1) + len(word2) - 2 * LCS.",
      "Return that value.",
    ],
    complexity: { time: "O(n * m)", space: "O(n * m)", note: "LCS grid." },
    solutions: [
      {
        language: "python",
        label: "LCS",
        code: `def min_distance(word1: str, word2: str) -> int:
    n, m = len(word1), len(word2)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    lcs = dp[n][m]
    return n + m - 2 * lcs`,
      },
      {
        language: "typescript",
        label: "LCS",
        code: `function minDistance(word1: string, word2: string): number {
  const n = word1.length, m = word2.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return n + m - 2 * dp[n][m];
}`,
      },
    ],
    runner: {
      entry: "minDistance",
      comparison: "deep",
      jsStarter: `function minDistance(word1, word2) {
  // Minimum deletions to make the two strings equal.
  // TODO: implement
}`,
      jsReference: `function minDistance(word1, word2) {
  const n = word1.length, m = word2.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return n + m - 2 * dp[n][m];
}`,
    },
    tests: [
      { name: "sea/eat", args: ["sea", "eat"], expected: 2 },
      { name: "leetcode/etco", args: ["leetcode", "etco"], expected: 4 },
      { name: "identical", args: ["a", "a"], expected: 0 },
      { name: "disjoint", args: ["abc", "def"], expected: 6 },
    ],
  },
  {
    id: 712,
    slug: "minimum-ascii-delete-sum-for-two-strings",
    title: "Minimum ASCII Delete Sum for Two Strings",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Grid"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 46,
    leetcodeUrl: "https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/",
    description:
      "Given two strings, return the lowest possible sum of ASCII codes of characters you must delete so the two strings become equal.",
    examples: [
      { input: "s1 = \"sea\", s2 = \"eat\"", output: "231", explanation: "Delete 's' (115) and 't' (116)." },
      { input: "s1 = \"delete\", s2 = \"leet\"", output: "403" },
    ],
    intuition:
      "This is a weighted edit problem: instead of counting deletions, accumulate their ASCII costs. When characters match they cost nothing; otherwise delete whichever side yields the cheaper running total.",
    approach: [
      "Initialize the first row/column with prefix ASCII sums (cost to delete a whole prefix).",
      "If the current characters match, carry the diagonal value unchanged.",
      "Otherwise take the cheaper of deleting from s1 or s2, adding that character's code.",
      "Return dp[n][m].",
    ],
    complexity: { time: "O(n * m)", space: "O(n * m)", note: "Weighted edit-distance grid." },
    solutions: [
      {
        language: "python",
        label: "Weighted LCS",
        code: `def minimum_delete_sum(s1: str, s2: str) -> int:
    n, m = len(s1), len(s2)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        dp[i][0] = dp[i - 1][0] + ord(s1[i - 1])
    for j in range(1, m + 1):
        dp[0][j] = dp[0][j - 1] + ord(s2[j - 1])
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = min(dp[i - 1][j] + ord(s1[i - 1]), dp[i][j - 1] + ord(s2[j - 1]))
    return dp[n][m]`,
      },
      {
        language: "typescript",
        label: "Weighted LCS",
        code: `function minimumDeleteSum(s1: string, s2: string): number {
  const n = s1.length, m = s2.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = 1; i <= n; i++) dp[i][0] = dp[i - 1][0] + s1.charCodeAt(i - 1);
  for (let j = 1; j <= m; j++) dp[0][j] = dp[0][j - 1] + s2.charCodeAt(j - 1);
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = Math.min(dp[i - 1][j] + s1.charCodeAt(i - 1), dp[i][j - 1] + s2.charCodeAt(j - 1));
    }
  }
  return dp[n][m];
}`,
      },
    ],
    runner: {
      entry: "minimumDeleteSum",
      comparison: "deep",
      jsStarter: `function minimumDeleteSum(s1, s2) {
  // Minimum ASCII-weighted deletions to make the strings equal.
  // TODO: implement
}`,
      jsReference: `function minimumDeleteSum(s1, s2) {
  const n = s1.length, m = s2.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) dp[i][0] = dp[i - 1][0] + s1.charCodeAt(i - 1);
  for (let j = 1; j <= m; j++) dp[0][j] = dp[0][j - 1] + s2.charCodeAt(j - 1);
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = Math.min(dp[i - 1][j] + s1.charCodeAt(i - 1), dp[i][j - 1] + s2.charCodeAt(j - 1));
    }
  }
  return dp[n][m];
}`,
    },
    tests: [
      { name: "sea/eat", args: ["sea", "eat"], expected: 231 },
      { name: "delete/leet", args: ["delete", "leet"], expected: 403 },
      { name: "identical", args: ["a", "a"], expected: 0 },
      { name: "equal pair", args: ["ab", "ab"], expected: 0 },
    ],
  },
  {
    id: 1035,
    slug: "uncrossed-lines",
    title: "Uncrossed Lines",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Longest Common Subsequence"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 51,
    leetcodeUrl: "https://leetcode.com/problems/uncrossed-lines/",
    description:
      "Given two integer arrays written on two rows, connect equal values with straight lines so that no two lines cross. Return the maximum number of connecting lines.",
    examples: [
      { input: "nums1 = [1,4,2], nums2 = [1,2,4]", output: "2" },
      { input: "nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]", output: "3" },
    ],
    intuition:
      "Non-crossing connections must preserve order on both rows, so a set of valid lines is exactly a common subsequence of the two arrays. Maximizing lines is therefore the longest common subsequence.",
    approach: [
      "Fill a grid where dp[i][j] is the LCS of the first i and first j elements.",
      "On a match, extend the diagonal by one.",
      "Otherwise carry the better of dropping one element from either array.",
      "Return dp[n][m].",
    ],
    complexity: { time: "O(n * m)", space: "O(n * m)", note: "Classic LCS grid." },
    solutions: [
      {
        language: "python",
        label: "LCS",
        code: `def max_uncrossed_lines(nums1: list[int], nums2: list[int]) -> int:
    n, m = len(nums1), len(nums2)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if nums1[i - 1] == nums2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]`,
      },
      {
        language: "typescript",
        label: "LCS",
        code: `function maxUncrossedLines(nums1: number[], nums2: number[]): number {
  const n = nums1.length, m = nums2.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (nums1[i - 1] === nums2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[n][m];
}`,
      },
    ],
    runner: {
      entry: "maxUncrossedLines",
      comparison: "deep",
      jsStarter: `function maxUncrossedLines(nums1, nums2) {
  // Maximum number of non-crossing connecting lines.
  // TODO: implement
}`,
      jsReference: `function maxUncrossedLines(nums1, nums2) {
  const n = nums1.length, m = nums2.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (nums1[i - 1] === nums2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[n][m];
}`,
    },
    tests: [
      { name: "example one", args: [[1, 4, 2], [1, 2, 4]], expected: 2 },
      { name: "example two", args: [[2, 5, 1, 2, 5], [10, 5, 2, 1, 5, 2]], expected: 3 },
      { name: "example three", args: [[1, 3, 7, 1, 7, 5], [1, 9, 2, 5, 1]], expected: 2 },
      { name: "no lines", args: [[1, 2, 3], [4, 5, 6]], expected: 0 },
    ],
  },
  {
    id: 877,
    slug: "stone-game",
    title: "Stone Game",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Game Theory", "Interval DP"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/stone-game/",
    description:
      "Two players take turns removing a pile from either end of a row of piles, accumulating its stones. Return true if the first player can end with more stones than the second under optimal play.",
    examples: [
      { input: "piles = [5,3,4,5]", output: "true" },
      { input: "piles = [3,7,2,3]", output: "true" },
    ],
    intuition:
      "Define each subrange's best achievable score margin for the player to move. Choosing an end gives that pile minus the opponent's best margin on the remaining range, so interval DP captures optimal play.",
    approach: [
      "Let dp[i][j] be the score margin the current player secures on piles[i..j].",
      "Base case: a single pile gives a margin equal to its value.",
      "For longer ranges, dp[i][j] = max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1]).",
      "Return whether dp[0][n-1] is positive.",
    ],
    complexity: { time: "O(n^2)", space: "O(n^2)", note: "Interval DP over all subranges." },
    solutions: [
      {
        language: "python",
        label: "Interval DP",
        code: `def stone_game(piles: list[int]) -> bool:
    n = len(piles)
    dp = [[0] * n for _ in range(n)]
    for i in range(n):
        dp[i][i] = piles[i]
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1])
    return dp[0][n - 1] > 0`,
      },
      {
        language: "typescript",
        label: "Interval DP",
        code: `function stoneGame(piles: number[]): boolean {
  const n = piles.length;
  const dp = Array.from({ length: n }, () => new Array<number>(n).fill(0));
  for (let i = 0; i < n; i++) dp[i][i] = piles[i];
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
    }
  }
  return dp[0][n - 1] > 0;
}`,
      },
    ],
    runner: {
      entry: "stoneGame",
      comparison: "deep",
      jsStarter: `function stoneGame(piles) {
  // Return true if the first player wins the stone game.
  // TODO: implement
}`,
      jsReference: `function stoneGame(piles) {
  const n = piles.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) dp[i][i] = piles[i];
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
    }
  }
  return dp[0][n - 1] > 0;
}`,
    },
    tests: [
      { name: "example one", args: [[5, 3, 4, 5]], expected: true },
      { name: "example two", args: [[3, 7, 2, 3]], expected: true },
      { name: "two piles", args: [[1, 2]], expected: true },
      { name: "four piles", args: [[7, 8, 8, 10]], expected: true },
    ],
  },
  {
    id: 174,
    slug: "dungeon-game",
    title: "Dungeon Game",
    difficulty: "Hard",
    category: "dp-2d",
    patterns: ["Dynamic Programming", "Grid", "Backward DP"],
    companies: ["amazon", "google", "microsoft", "uber"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/dungeon-game/",
    description:
      "A knight starts at the top-left of a grid and moves only right or down to reach the bottom-right. Each cell adds or subtracts health, and the knight must always stay above zero. Return the minimum starting health required.",
    examples: [
      { input: "dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]", output: "7" },
      { input: "dungeon = [[0]]", output: "1" },
    ],
    intuition:
      "Because survival depends on future cells, fill the grid backward: each cell needs just enough health so that after its effect the knight can still afford the cheaper of the two onward paths, never dropping below 1.",
    approach: [
      "Pad the grid below and right with a sentinel requirement of 1.",
      "Process cells from bottom-right to top-left.",
      "need = min(down, right) - dungeon[i][j]; clamp to at least 1.",
      "Return the requirement computed for the top-left cell.",
    ],
    complexity: { time: "O(n * m)", space: "O(n * m)", note: "Backward grid DP." },
    solutions: [
      {
        language: "python",
        label: "Backward Grid DP",
        code: `def calculate_minimum_hp(dungeon: list[list[int]]) -> int:
    n, m = len(dungeon), len(dungeon[0])
    dp = [[float("inf")] * (m + 1) for _ in range(n + 1)]
    dp[n][m - 1] = 1
    dp[n - 1][m] = 1
    for i in range(n - 1, -1, -1):
        for j in range(m - 1, -1, -1):
            need = min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j]
            dp[i][j] = 1 if need <= 0 else need
    return dp[0][0]`,
      },
      {
        language: "typescript",
        label: "Backward Grid DP",
        code: `function calculateMinimumHP(dungeon: number[][]): number {
  const n = dungeon.length, m = dungeon[0].length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(Infinity));
  dp[n][m - 1] = 1;
  dp[n - 1][m] = 1;
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      const need = Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
      dp[i][j] = need <= 0 ? 1 : need;
    }
  }
  return dp[0][0];
}`,
      },
    ],
    runner: {
      entry: "calculateMinimumHP",
      comparison: "deep",
      jsStarter: `function calculateMinimumHP(dungeon) {
  // Minimum starting health to reach the bottom-right alive.
  // TODO: implement
}`,
      jsReference: `function calculateMinimumHP(dungeon) {
  const n = dungeon.length, m = dungeon[0].length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(Infinity));
  dp[n][m - 1] = 1;
  dp[n - 1][m] = 1;
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      const need = Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
      dp[i][j] = need <= 0 ? 1 : need;
    }
  }
  return dp[0][0];
}`,
    },
    tests: [
      { name: "example one", args: [[[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]], expected: 7 },
      { name: "neutral cell", args: [[[0]]], expected: 1 },
      { name: "single damage", args: [[[-3]]], expected: 4 },
      { name: "small grid", args: [[[1, -2], [3, -5]]], expected: 2 },
    ],
  },
];

export default batchR;
