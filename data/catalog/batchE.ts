import type { Problem } from "../types.ts";

/**
 * Batch E — twenty array/string/math problems spanning arrays & hashing,
 * two-pointers, sliding-window, and math-geometry. Every record ships working
 * Python + TypeScript solutions plus a wired playground runner whose
 * `jsReference` passes its hand-verified tests.
 */
export const batchE: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Arrays & Hashing
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 36,
    slug: "valid-sudoku",
    title: "Valid Sudoku",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Hash Set", "Matrix"],
    companies: ["amazon", "apple", "microsoft", "uber"],
    frequency: 62,
    leetcodeUrl: "https://leetcode.com/problems/valid-sudoku/",
    description:
      "Decide whether a partially filled 9×9 grid obeys Sudoku rules: no digit repeats within any row, any column, or any of the nine 3×3 sub-boxes. Empty cells are marked with '.' and only the filled cells must be checked.",
    examples: [
      { input: "board with a clean classic layout", output: "true", explanation: "No row, column, or box contains a repeated digit." },
      { input: "same board but with two 8s in column 0", output: "false", explanation: "A duplicate inside one column breaks the rule." },
    ],
    intuition:
      "Validity is purely about collisions, so we never need to solve the puzzle — only detect repeats. Track three families of seen digits (one set per row, per column, and per box) and report failure the instant a filled cell repeats a digit already seen in its row, column, or box.",
    approach: [
      "Keep nine sets for rows, nine for columns, and nine for boxes.",
      "Map cell (r, c) to its box index with (r / 3) * 3 + (c / 3).",
      "Skip empty cells marked '.'.",
      "If a digit already exists in its row, column, or box set, return false; otherwise record it.",
      "Return true if the full scan finds no collision.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "The grid is fixed at 81 cells, so work is constant." },
    solutions: [
      {
        language: "python",
        label: "Hash Sets",
        code: `def is_valid_sudoku(board: list[list[str]]) -> bool:
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    for r in range(9):
        for c in range(9):
            v = board[r][c]
            if v == ".":
                continue
            b = (r // 3) * 3 + c // 3
            if v in rows[r] or v in cols[c] or v in boxes[b]:
                return False
            rows[r].add(v)
            cols[c].add(v)
            boxes[b].add(v)
    return True`,
      },
      {
        language: "typescript",
        label: "Hash Sets",
        code: `function isValidSudoku(board: string[][]): boolean {
  const rows = Array.from({ length: 9 }, () => new Set<string>());
  const cols = Array.from({ length: 9 }, () => new Set<string>());
  const boxes = Array.from({ length: 9 }, () => new Set<string>());
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const v = board[r][c];
      if (v === ".") continue;
      const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(v) || cols[c].has(v) || boxes[b].has(v)) return false;
      rows[r].add(v);
      cols[c].add(v);
      boxes[b].add(v);
    }
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "isValidSudoku",
      comparison: "deep",
      jsStarter: `function isValidSudoku(board) {
  // Return true if the 9x9 board breaks no Sudoku rule.
  // TODO: implement
}`,
      jsReference: `function isValidSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const v = board[r][c];
      if (v === ".") continue;
      const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(v) || cols[c].has(v) || boxes[b].has(v)) return false;
      rows[r].add(v);
      cols[c].add(v);
      boxes[b].add(v);
    }
  }
  return true;
}`,
    },
    tests: [
      {
        name: "valid board",
        args: [[
          ["5", "3", ".", ".", "7", ".", ".", ".", "."],
          ["6", ".", ".", "1", "9", "5", ".", ".", "."],
          [".", "9", "8", ".", ".", ".", ".", "6", "."],
          ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
          ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
          ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
          [".", "6", ".", ".", ".", ".", "2", "8", "."],
          [".", ".", ".", "4", "1", "9", ".", ".", "5"],
          [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ]],
        expected: true,
      },
      {
        name: "duplicate in column",
        args: [[
          ["8", "3", ".", ".", "7", ".", ".", ".", "."],
          ["6", ".", ".", "1", "9", "5", ".", ".", "."],
          [".", "9", "8", ".", ".", ".", ".", "6", "."],
          ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
          ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
          ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
          [".", "6", ".", ".", ".", ".", "2", "8", "."],
          [".", ".", ".", "4", "1", "9", ".", ".", "5"],
          [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ]],
        expected: false,
      },
      {
        name: "empty grid",
        args: [[
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ]],
        expected: true,
      },
      {
        name: "duplicate in row",
        args: [[
          ["1", "1", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ]],
        expected: false,
      },
    ],
    relatedIds: [37],
  },
  {
    id: 41,
    slug: "first-missing-positive",
    title: "First Missing Positive",
    difficulty: "Hard",
    category: "arrays-hashing",
    patterns: ["Cyclic Sort", "In-Place"],
    companies: ["amazon", "google", "microsoft", "stripe", "databricks"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/first-missing-positive/",
    description:
      "Given an unsorted integer array, find the smallest positive integer (1 or greater) that is absent. The challenge is to do it in linear time using only constant extra space.",
    examples: [
      { input: "nums = [1,2,0]", output: "3", explanation: "1 and 2 are present, so 3 is the first gap." },
      { input: "nums = [3,4,-1,1]", output: "2", explanation: "1 is present but 2 is missing." },
    ],
    intuition:
      "The answer must lie between 1 and n+1, where n is the length, because at most n distinct positives can occupy the array. Use the array itself as a hash table: place each value v in slot v-1 via swaps. After this cyclic sort, the first index whose value isn't index+1 reveals the missing number.",
    approach: [
      "For each position, repeatedly swap nums[i] into its correct slot nums[i]-1 while it is in range 1..n and not already placed.",
      "Ignore values that are non-positive or larger than n.",
      "Scan the rearranged array; the first i where nums[i] != i+1 means i+1 is missing.",
      "If every slot matches, the answer is n+1.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Each value is swapped home at most once." },
    solutions: [
      {
        language: "python",
        label: "Cyclic Sort",
        code: `def first_missing_positive(nums: list[int]) -> int:
    n = len(nums)
    for i in range(n):
        while 0 < nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            j = nums[i] - 1
            nums[i], nums[j] = nums[j], nums[i]
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1`,
      },
      {
        language: "typescript",
        label: "Cyclic Sort",
        code: `function firstMissingPositive(nums: number[]): number {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const j = nums[i] - 1;
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return n + 1;
}`,
      },
    ],
    runner: {
      entry: "firstMissingPositive",
      comparison: "deep",
      jsStarter: `function firstMissingPositive(nums) {
  // Return the smallest absent positive integer.
  // TODO: implement
}`,
      jsReference: `function firstMissingPositive(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const j = nums[i] - 1;
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return n + 1;
}`,
    },
    tests: [
      { name: "gap in middle", args: [[1, 2, 0]], expected: 3 },
      { name: "with negatives", args: [[3, 4, -1, 1]], expected: 2 },
      { name: "all above one", args: [[7, 8, 9, 11, 12]], expected: 1 },
      { name: "contiguous", args: [[1, 2, 3]], expected: 4 },
      { name: "empty", args: [[]], expected: 1 },
    ],
    relatedIds: [268, 448],
  },
  {
    id: 442,
    slug: "find-all-duplicates-in-an-array",
    title: "Find All Duplicates in an Array",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Index Marking", "In-Place"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/find-all-duplicates-in-an-array/",
    description:
      "Every value in the array lies in the range 1..n and appears either once or twice. Return all the values that appear exactly twice, using O(n) time and no extra array.",
    examples: [
      { input: "nums = [4,3,2,7,8,2,3,1]", output: "[2,3]", explanation: "2 and 3 each occur twice." },
      { input: "nums = [1,1,2]", output: "[1]", explanation: "Only 1 repeats." },
    ],
    intuition:
      "Because values fit in 1..n, each value v can flag its 'home' slot v-1. Negate the number at that slot the first time v is seen; if you arrive and it's already negative, v has been seen before, so it's a duplicate. Using sign as a visited bit keeps space constant.",
    approach: [
      "Iterate over the array reading the magnitude of each value as v = |nums[i]|.",
      "Look at slot index v-1.",
      "If nums[v-1] is already negative, v is a duplicate — record it.",
      "Otherwise negate nums[v-1] to mark v as seen.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Sign bits act as the visited set." },
    solutions: [
      {
        language: "python",
        label: "Index Marking",
        code: `def find_duplicates(nums: list[int]) -> list[int]:
    res = []
    for x in nums:
        idx = abs(x) - 1
        if nums[idx] < 0:
            res.append(idx + 1)
        else:
            nums[idx] = -nums[idx]
    return res`,
      },
      {
        language: "typescript",
        label: "Index Marking",
        code: `function findDuplicates(nums: number[]): number[] {
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] < 0) res.push(idx + 1);
    else nums[idx] = -nums[idx];
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "findDuplicates",
      comparison: "canonical",
      jsStarter: `function findDuplicates(nums) {
  // Return every value that appears twice.
  // TODO: implement
}`,
      jsReference: `function findDuplicates(nums) {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] < 0) res.push(idx + 1);
    else nums[idx] = -nums[idx];
  }
  return res;
}`,
    },
    tests: [
      { name: "two duplicates", args: [[4, 3, 2, 7, 8, 2, 3, 1]], expected: [2, 3] },
      { name: "single duplicate", args: [[1, 1, 2]], expected: [1] },
      { name: "no duplicates", args: [[1]], expected: [] },
      { name: "empty", args: [[]], expected: [] },
    ],
    relatedIds: [41, 448],
  },
  {
    id: 448,
    slug: "find-all-numbers-disappeared-in-an-array",
    title: "Find All Numbers Disappeared in an Array",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Index Marking", "In-Place"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
    description:
      "An array of length n holds values in the range 1..n with possible repeats. Return every value in 1..n that never appears, using linear time and no extra array beyond the output.",
    examples: [
      { input: "nums = [4,3,2,7,8,2,3,1]", output: "[5,6]", explanation: "5 and 6 are the only values missing." },
      { input: "nums = [1,1]", output: "[2]", explanation: "2 never shows up." },
    ],
    intuition:
      "Each value v should mark slot v-1 as present by negating it. After one pass, any slot that is still positive corresponds to a value that was never used, so its index+1 is one of the missing numbers.",
    approach: [
      "For each value, negate the entry at slot |value| - 1 if it is still positive.",
      "After marking, scan the array.",
      "Any index i whose value remains positive means i+1 never appeared.",
      "Collect those i+1 values as the answer.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Output array aside, marking is in-place." },
    solutions: [
      {
        language: "python",
        label: "Index Marking",
        code: `def find_disappeared_numbers(nums: list[int]) -> list[int]:
    n = len(nums)
    for x in nums:
        idx = abs(x) - 1
        if nums[idx] > 0:
            nums[idx] = -nums[idx]
    return [i + 1 for i in range(n) if nums[i] > 0]`,
      },
      {
        language: "typescript",
        label: "Index Marking",
        code: `function findDisappearedNumbers(nums: number[]): number[] {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) nums[idx] = -nums[idx];
  }
  const res: number[] = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) res.push(i + 1);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "findDisappearedNumbers",
      comparison: "canonical",
      jsStarter: `function findDisappearedNumbers(nums) {
  // Return every value in 1..n that is missing.
  // TODO: implement
}`,
      jsReference: `function findDisappearedNumbers(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) nums[idx] = -nums[idx];
  }
  const res = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) res.push(i + 1);
  }
  return res;
}`,
    },
    tests: [
      { name: "two missing", args: [[4, 3, 2, 7, 8, 2, 3, 1]], expected: [5, 6] },
      { name: "one missing", args: [[1, 1]], expected: [2] },
      { name: "complete", args: [[1]], expected: [] },
      { name: "first missing", args: [[2, 2]], expected: [1] },
    ],
    relatedIds: [41, 442],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Two Pointers
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 165,
    slug: "compare-version-numbers",
    title: "Compare Version Numbers",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["String Parsing", "Two Pointers"],
    companies: ["amazon", "microsoft", "apple", "bloomberg"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/compare-version-numbers/",
    description:
      "Two version strings are made of dot-separated revision numbers. Compare them component by component, treating missing trailing components as 0, and return -1, 1, or 0 depending on which version is larger.",
    examples: [
      { input: "version1 = \"1.2\", version2 = \"1.10\"", output: "-1", explanation: "The second revision 2 is less than 10." },
      { input: "version1 = \"1.01\", version2 = \"1.001\"", output: "0", explanation: "Leading zeros are ignored, so both revisions equal 1." },
    ],
    intuition:
      "Each dotted chunk is an integer with no significance to leading zeros. Walk both versions in lockstep, converting one chunk at a time to a number. When one version runs out of chunks, treat the missing ones as 0 so that '1.0' and '1' compare equal. The first differing chunk decides the result.",
    approach: [
      "Split both strings on '.' into chunk arrays.",
      "Iterate up to the longer length.",
      "Parse each chunk as an integer, defaulting absent chunks to 0.",
      "Return -1 or 1 at the first chunk that differs; return 0 if all match.",
    ],
    complexity: { time: "O(n + m)", space: "O(n + m)", note: "Linear in the combined length of both versions." },
    solutions: [
      {
        language: "python",
        label: "Split & Compare",
        code: `def compare_version(version1: str, version2: str) -> int:
    a = version1.split(".")
    b = version2.split(".")
    for i in range(max(len(a), len(b))):
        x = int(a[i]) if i < len(a) else 0
        y = int(b[i]) if i < len(b) else 0
        if x < y:
            return -1
        if x > y:
            return 1
    return 0`,
      },
      {
        language: "typescript",
        label: "Split & Compare",
        code: `function compareVersion(version1: string, version2: string): number {
  const a = version1.split(".");
  const b = version2.split(".");
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const x = i < a.length ? parseInt(a[i], 10) : 0;
    const y = i < b.length ? parseInt(b[i], 10) : 0;
    if (x < y) return -1;
    if (x > y) return 1;
  }
  return 0;
}`,
      },
    ],
    runner: {
      entry: "compareVersion",
      comparison: "deep",
      jsStarter: `function compareVersion(version1, version2) {
  // Return -1, 0, or 1 comparing the two version strings.
  // TODO: implement
}`,
      jsReference: `function compareVersion(version1, version2) {
  const a = version1.split(".");
  const b = version2.split(".");
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const x = i < a.length ? parseInt(a[i], 10) : 0;
    const y = i < b.length ? parseInt(b[i], 10) : 0;
    if (x < y) return -1;
    if (x > y) return 1;
  }
  return 0;
}`,
    },
    tests: [
      { name: "smaller revision", args: ["1.2", "1.10"], expected: -1 },
      { name: "leading zeros equal", args: ["1.01", "1.001"], expected: 0 },
      { name: "trailing zeros equal", args: ["1.0", "1.0.0.0"], expected: 0 },
      { name: "deep diff", args: ["7.5.2.4", "7.5.3"], expected: -1 },
      { name: "extra chunk", args: ["1.0.1", "1"], expected: 1 },
    ],
    relatedIds: [468],
  },
  {
    id: 151,
    slug: "reverse-words-in-a-string",
    title: "Reverse Words in a String",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["String Parsing", "Two Pointers"],
    companies: ["amazon", "microsoft", "apple", "bloomberg", "snowflake"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/reverse-words-in-a-string/",
    description:
      "Given a sentence that may contain leading, trailing, or repeated spaces, return the words in reverse order separated by exactly one space, with no extra padding.",
    examples: [
      { input: "s = \"the sky is blue\"", output: "\"blue is sky the\"", explanation: "Word order is reversed." },
      { input: "s = \"  hello world  \"", output: "\"hello world\" reversed to \"world hello\"", explanation: "Surrounding spaces are trimmed." },
    ],
    intuition:
      "The messy spacing is the only trap. Trim the ends, collapse any run of whitespace into single separators by splitting on whitespace, reverse the resulting list of words, and rejoin with one space. This normalizes spacing and order in a couple of clean steps.",
    approach: [
      "Trim leading and trailing whitespace.",
      "Split on one-or-more whitespace characters to get clean words.",
      "Reverse the word list.",
      "Join with a single space.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "We allocate the word list and the output string." },
    solutions: [
      {
        language: "python",
        label: "Split & Reverse",
        code: `def reverse_words(s: str) -> str:
    return " ".join(reversed(s.split()))`,
      },
      {
        language: "typescript",
        label: "Split & Reverse",
        code: `function reverseWords(s: string): string {
  return s.trim().split(/\\s+/).reverse().join(" ");
}`,
      },
    ],
    runner: {
      entry: "reverseWords",
      comparison: "deep",
      jsStarter: `function reverseWords(s) {
  // Return the words in reverse order, single-spaced.
  // TODO: implement
}`,
      jsReference: `function reverseWords(s) {
  return s.trim().split(/\\s+/).reverse().join(" ");
}`,
    },
    tests: [
      { name: "basic", args: ["the sky is blue"], expected: "blue is sky the" },
      { name: "surrounding spaces", args: ["  hello world  "], expected: "world hello" },
      { name: "inner gaps", args: ["a good   example"], expected: "example good a" },
      { name: "single word", args: ["single"], expected: "single" },
    ],
    relatedIds: [186, 344],
  },
  {
    id: 344,
    slug: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["Two Pointers", "In-Place"],
    companies: ["amazon", "microsoft", "apple"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/reverse-string/",
    description:
      "Reverse an array of characters in place using O(1) extra memory, then return the mutated array. No new array allocation is allowed for the reversal itself.",
    examples: [
      { input: "s = ['h','e','l','l','o']", output: "['o','l','l','e','h']", explanation: "The characters are swapped end to end." },
      { input: "s = ['H','a','n','n','a','h']", output: "['h','a','n','n','a','H']", explanation: "Mirror swap from both ends." },
    ],
    intuition:
      "Mirror the characters by swapping the outermost pair, then move both pointers inward. When the pointers meet or cross, every character has been moved to its reflected position, and no auxiliary buffer was needed.",
    approach: [
      "Set left at index 0 and right at the last index.",
      "Swap s[left] and s[right].",
      "Advance left and retreat right.",
      "Stop once left is no longer less than right and return the array.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Swaps happen in place." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def reverse_string(s: list[str]) -> list[str]:
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
    return s`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function reverseString(s: string[]): string[] {
  let left = 0, right = s.length - 1;
  while (left < right) {
    const tmp = s[left];
    s[left] = s[right];
    s[right] = tmp;
    left++;
    right--;
  }
  return s;
}`,
      },
    ],
    runner: {
      entry: "reverseString",
      comparison: "deep",
      jsStarter: `function reverseString(s) {
  // Reverse the character array in place and return it.
  // TODO: implement
}`,
      jsReference: `function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    const tmp = s[left];
    s[left] = s[right];
    s[right] = tmp;
    left++;
    right--;
  }
  return s;
}`,
    },
    tests: [
      { name: "hello", args: [["h", "e", "l", "l", "o"]], expected: ["o", "l", "l", "e", "h"] },
      { name: "name", args: [["H", "a", "n", "n", "a", "h"]], expected: ["h", "a", "n", "n", "a", "H"] },
      { name: "single", args: [["a"]], expected: ["a"] },
      { name: "empty", args: [[]], expected: [] },
    ],
    relatedIds: [151, 345],
  },
  {
    id: 345,
    slug: "reverse-vowels-of-a-string",
    title: "Reverse Vowels of a String",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["Two Pointers"],
    companies: ["amazon", "google", "meta"],
    frequency: 44,
    leetcodeUrl: "https://leetcode.com/problems/reverse-vowels-of-a-string/",
    description:
      "Reverse only the vowels of a string while leaving every consonant and other character fixed in place. Both lowercase and uppercase vowels count.",
    examples: [
      { input: "s = \"hello\"", output: "\"holle\"", explanation: "The vowels e and o swap positions." },
      { input: "s = \"leetcode\"", output: "\"leotcede\"", explanation: "Vowels e,e,o,e are reversed to e,o,e,e." },
    ],
    intuition:
      "Only the vowels move, so treat them as a sub-sequence to reverse while ignoring everything else. Two pointers walk inward, each skipping non-vowels until both land on vowels, then swap. Consonants are never touched, so their positions stay intact.",
    approach: [
      "Build a set of the ten vowel characters (both cases).",
      "Place pointers at the two ends of a mutable character array.",
      "Advance the left pointer past consonants and retreat the right pointer past consonants.",
      "When both point at vowels, swap them and step inward; repeat until they meet.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "We work on a character array copy of the string." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def reverse_vowels(s: str) -> str:
    vowels = set("aeiouAEIOU")
    arr = list(s)
    left, right = 0, len(arr) - 1
    while left < right:
        if arr[left] not in vowels:
            left += 1
        elif arr[right] not in vowels:
            right -= 1
        else:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1
    return "".join(arr)`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function reverseVowels(s: string): string {
  const vowels = new Set("aeiouAEIOU");
  const arr = s.split("");
  let left = 0, right = arr.length - 1;
  while (left < right) {
    if (!vowels.has(arr[left])) left++;
    else if (!vowels.has(arr[right])) right--;
    else {
      const tmp = arr[left];
      arr[left] = arr[right];
      arr[right] = tmp;
      left++;
      right--;
    }
  }
  return arr.join("");
}`,
      },
    ],
    runner: {
      entry: "reverseVowels",
      comparison: "deep",
      jsStarter: `function reverseVowels(s) {
  // Reverse only the vowels of s.
  // TODO: implement
}`,
      jsReference: `function reverseVowels(s) {
  const vowels = new Set("aeiouAEIOU");
  const arr = s.split("");
  let left = 0, right = arr.length - 1;
  while (left < right) {
    if (!vowels.has(arr[left])) left++;
    else if (!vowels.has(arr[right])) right--;
    else {
      const tmp = arr[left];
      arr[left] = arr[right];
      arr[right] = tmp;
      left++;
      right--;
    }
  }
  return arr.join("");
}`,
    },
    tests: [
      { name: "basic", args: ["hello"], expected: "holle" },
      { name: "longer", args: ["leetcode"], expected: "leotcede" },
      { name: "mixed case", args: ["aA"], expected: "Aa" },
      { name: "no vowels", args: ["bcd"], expected: "bcd" },
      { name: "all vowels", args: ["AEIOU"], expected: "UOIEA" },
    ],
    relatedIds: [344],
  },
  {
    id: 680,
    slug: "valid-palindrome-ii",
    title: "Valid Palindrome II",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["Two Pointers", "Greedy"],
    companies: ["meta", "amazon", "microsoft", "bloomberg"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/valid-palindrome-ii/",
    description:
      "Determine whether a string can become a palindrome after removing at most one character. Removing zero characters is allowed when the string is already a palindrome.",
    examples: [
      { input: "s = \"aba\"", output: "true", explanation: "Already a palindrome, no deletion needed." },
      { input: "s = \"abca\"", output: "true", explanation: "Deleting 'c' (or 'b') leaves a palindrome." },
    ],
    intuition:
      "Compare characters from both ends. While they match, keep shrinking. At the first mismatch you have exactly one deletion to spend, so try skipping the left character or the right character and check whether either remaining substring is a clean palindrome.",
    approach: [
      "Run two pointers inward while characters match.",
      "On the first mismatch, test two candidates: skip the left char or skip the right char.",
      "Each candidate is verified by a simple palindrome check on the remaining window.",
      "Return true if either candidate is a palindrome; if no mismatch ever occurs, it was already a palindrome.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "At most one extra linear scan after the mismatch." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def valid_palindrome(s: str) -> bool:
    def is_pal(l: int, r: int) -> bool:
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1
            r -= 1
        return True

    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return is_pal(left + 1, right) or is_pal(left, right - 1)
        left += 1
        right -= 1
    return True`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function validPalindrome(s: string): boolean {
  const isPal = (l: number, r: number): boolean => {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  };
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return isPal(left + 1, right) || isPal(left, right - 1);
    left++;
    right--;
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "validPalindrome",
      comparison: "deep",
      jsStarter: `function validPalindrome(s) {
  // Return true if at most one deletion makes s a palindrome.
  // TODO: implement
}`,
      jsReference: `function validPalindrome(s) {
  const isPal = (l, r) => {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  };
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return isPal(left + 1, right) || isPal(left, right - 1);
    left++;
    right--;
  }
  return true;
}`,
    },
    tests: [
      { name: "already palindrome", args: ["aba"], expected: true },
      { name: "one deletion", args: ["abca"], expected: true },
      { name: "impossible", args: ["abc"], expected: false },
      { name: "skip front", args: ["deeee"], expected: true },
      { name: "empty", args: [""], expected: true },
    ],
    relatedIds: [125],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Sliding Window
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 187,
    slug: "repeated-dna-sequences",
    title: "Repeated DNA Sequences",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Hash Set", "Sliding Window"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 46,
    leetcodeUrl: "https://leetcode.com/problems/repeated-dna-sequences/",
    description:
      "Scan a DNA string of A, C, G, T characters and return every length-10 substring that occurs more than once anywhere in the string. Each repeated sequence should be reported only once.",
    examples: [
      { input: "s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"", output: "[\"AAAAACCCCC\",\"CCCCCAAAAA\"]", explanation: "Both ten-letter windows appear at least twice." },
      { input: "s = \"AAAAAAAAAAAAA\"", output: "[\"AAAAAAAAAA\"]", explanation: "The all-A window repeats across the string." },
    ],
    intuition:
      "Slide a fixed window of width 10 across the string. Keep one set of windows already seen and a second set of windows confirmed to repeat. The moment a window reappears, add it to the repeat set, which naturally deduplicates the answer.",
    approach: [
      "Iterate the start index from 0 to len(s) - 10.",
      "Extract the 10-character window.",
      "If it's already in the 'seen' set, add it to the 'repeated' set.",
      "Otherwise record it in 'seen'. Return the repeated set as a list.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each fixed-length slice is treated as a unit." },
    solutions: [
      {
        language: "python",
        label: "Hash Set",
        code: `def find_repeated_dna_sequences(s: str) -> list[str]:
    seen, res = set(), set()
    for i in range(len(s) - 9):
        sub = s[i:i + 10]
        if sub in seen:
            res.add(sub)
        else:
            seen.add(sub)
    return list(res)`,
      },
      {
        language: "typescript",
        label: "Hash Set",
        code: `function findRepeatedDnaSequences(s: string): string[] {
  const seen = new Set<string>();
  const res = new Set<string>();
  for (let i = 0; i + 10 <= s.length; i++) {
    const sub = s.substring(i, i + 10);
    if (seen.has(sub)) res.add(sub);
    else seen.add(sub);
  }
  return [...res];
}`,
      },
    ],
    runner: {
      entry: "findRepeatedDnaSequences",
      comparison: "canonical",
      jsStarter: `function findRepeatedDnaSequences(s) {
  // Return every 10-letter window that repeats.
  // TODO: implement
}`,
      jsReference: `function findRepeatedDnaSequences(s) {
  const seen = new Set();
  const res = new Set();
  for (let i = 0; i + 10 <= s.length; i++) {
    const sub = s.substring(i, i + 10);
    if (seen.has(sub)) res.add(sub);
    else seen.add(sub);
  }
  return [...res];
}`,
    },
    tests: [
      { name: "two repeats", args: ["AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"], expected: ["AAAAACCCCC", "CCCCCAAAAA"] },
      { name: "all A", args: ["AAAAAAAAAAAAA"], expected: ["AAAAAAAAAA"] },
      { name: "single window", args: ["AAAAAAAAAA"], expected: [] },
      { name: "too short", args: ["ACGT"], expected: [] },
    ],
    relatedIds: [438],
  },
  {
    id: 438,
    slug: "find-all-anagrams-in-a-string",
    title: "Find All Anagrams in a String",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window", "Frequency Count"],
    companies: ["amazon", "meta", "google", "uber"],
    frequency: 72,
    leetcodeUrl: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
    description:
      "Return the starting indices of every substring of s that is an anagram of p — that is, every window with the exact same character counts as p.",
    examples: [
      { input: "s = \"cbaebabacd\", p = \"abc\"", output: "[0,6]", explanation: "\"cba\" at 0 and \"bac\" at 6 are anagrams of \"abc\"." },
      { input: "s = \"abab\", p = \"ab\"", output: "[0,1,2]", explanation: "Windows \"ab\", \"ba\", and \"ab\" all match." },
    ],
    intuition:
      "An anagram is fully described by its 26-letter frequency vector. Maintain a sliding window of width |p| and a running count of its letters. Whenever the window's count vector equals p's count vector, the window's start index is an answer. Adding the new char and dropping the old char keeps each step cheap.",
    approach: [
      "Build the target frequency array for p.",
      "Slide a window of length |p| across s, incrementing the entering char and decrementing the leaving char.",
      "Once the window reaches full width, compare its frequency array with the target.",
      "Record the start index whenever the two arrays match.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Frequency arrays are fixed at 26 slots." },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def find_anagrams(s: str, p: str) -> list[int]:
    if len(s) < len(p):
        return []
    need = [0] * 26
    win = [0] * 26
    for ch in p:
        need[ord(ch) - 97] += 1
    res = []
    for i, ch in enumerate(s):
        win[ord(ch) - 97] += 1
        if i >= len(p):
            win[ord(s[i - len(p)]) - 97] -= 1
        if i >= len(p) - 1 and win == need:
            res.append(i - len(p) + 1)
    return res`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function findAnagrams(s: string, p: string): number[] {
  const res: number[] = [];
  if (s.length < p.length) return res;
  const need = new Array(26).fill(0);
  const win = new Array(26).fill(0);
  const a = "a".charCodeAt(0);
  for (const ch of p) need[ch.charCodeAt(0) - a]++;
  for (let i = 0; i < s.length; i++) {
    win[s.charCodeAt(i) - a]++;
    if (i >= p.length) win[s.charCodeAt(i - p.length) - a]--;
    if (i >= p.length - 1) {
      let match = true;
      for (let j = 0; j < 26; j++) {
        if (win[j] !== need[j]) { match = false; break; }
      }
      if (match) res.push(i - p.length + 1);
    }
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "findAnagrams",
      comparison: "canonical",
      jsStarter: `function findAnagrams(s, p) {
  // Return start indices of every anagram of p in s.
  // TODO: implement
}`,
      jsReference: `function findAnagrams(s, p) {
  const res = [];
  if (s.length < p.length) return res;
  const need = new Array(26).fill(0);
  const win = new Array(26).fill(0);
  const a = "a".charCodeAt(0);
  for (const ch of p) need[ch.charCodeAt(0) - a]++;
  for (let i = 0; i < s.length; i++) {
    win[s.charCodeAt(i) - a]++;
    if (i >= p.length) win[s.charCodeAt(i - p.length) - a]--;
    if (i >= p.length - 1) {
      let match = true;
      for (let j = 0; j < 26; j++) {
        if (win[j] !== need[j]) { match = false; break; }
      }
      if (match) res.push(i - p.length + 1);
    }
  }
  return res;
}`,
    },
    tests: [
      { name: "two windows", args: ["cbaebabacd", "abc"], expected: [0, 6] },
      { name: "overlap", args: ["abab", "ab"], expected: [0, 1, 2] },
      { name: "none", args: ["aa", "bb"], expected: [] },
      { name: "single char", args: ["a", "a"], expected: [0] },
    ],
    relatedIds: [76, 567],
  },
  {
    id: 76,
    slug: "minimum-window-substring",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    category: "sliding-window",
    patterns: ["Sliding Window", "Frequency Count"],
    companies: ["meta", "amazon", "google", "uber", "linkedin"],
    frequency: 80,
    leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/",
    description:
      "Find the shortest contiguous substring of s that contains every character of t, counting multiplicities. If no such window exists, return an empty string.",
    examples: [
      { input: "s = \"ADOBECODEBANC\", t = \"ABC\"", output: "\"BANC\"", explanation: "\"BANC\" is the smallest window holding A, B, and C." },
      { input: "s = \"a\", t = \"aa\"", output: "\"\"", explanation: "s lacks a second 'a', so no window works." },
    ],
    intuition:
      "Grow a window on the right until it holds all required characters, then shrink it from the left as far as possible while it stays valid. Track how many distinct required characters are currently satisfied (formed) versus needed (required); when they're equal the window is valid and you can try to tighten it.",
    approach: [
      "Count the required characters of t.",
      "Expand the right edge, updating window counts and the 'formed' tally when a character hits its required count.",
      "While the window is valid, record it if it's the smallest so far, then advance the left edge and update 'formed'.",
      "Return the best window found, or the empty string if none was valid.",
    ],
    complexity: { time: "O(n + m)", space: "O(m)", note: "Each character enters and leaves the window once." },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def min_window(s: str, t: str) -> str:
    if not t or len(s) < len(t):
        return ""
    need = {}
    for c in t:
        need[c] = need.get(c, 0) + 1
    required = len(need)
    formed = 0
    window = {}
    best = (float("inf"), 0, 0)
    left = 0
    for right, c in enumerate(s):
        window[c] = window.get(c, 0) + 1
        if c in need and window[c] == need[c]:
            formed += 1
        while formed == required:
            if right - left + 1 < best[0]:
                best = (right - left + 1, left, right)
            lc = s[left]
            window[lc] -= 1
            if lc in need and window[lc] < need[lc]:
                formed -= 1
            left += 1
    return "" if best[0] == float("inf") else s[best[1]:best[2] + 1]`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function minWindow(s: string, t: string): string {
  if (t.length === 0 || s.length < t.length) return "";
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  const required = need.size;
  let formed = 0;
  const window = new Map<string, number>();
  let left = 0;
  let best: [number, number, number] = [Infinity, 0, 0];
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) ?? 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) formed++;
    while (formed === required) {
      if (right - left + 1 < best[0]) best = [right - left + 1, left, right];
      const lc = s[left];
      window.set(lc, window.get(lc)! - 1);
      if (need.has(lc) && window.get(lc)! < need.get(lc)!) formed--;
      left++;
    }
  }
  return best[0] === Infinity ? "" : s.substring(best[1], best[2] + 1);
}`,
      },
    ],
    runner: {
      entry: "minWindow",
      comparison: "deep",
      jsStarter: `function minWindow(s, t) {
  // Return the smallest window of s containing all of t.
  // TODO: implement
}`,
      jsReference: `function minWindow(s, t) {
  if (t.length === 0 || s.length < t.length) return "";
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  const required = need.size;
  let formed = 0;
  const window = new Map();
  let left = 0;
  let best = [Infinity, 0, 0];
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) ?? 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) formed++;
    while (formed === required) {
      if (right - left + 1 < best[0]) best = [right - left + 1, left, right];
      const lc = s[left];
      window.set(lc, window.get(lc) - 1);
      if (need.has(lc) && window.get(lc) < need.get(lc)) formed--;
      left++;
    }
  }
  return best[0] === Infinity ? "" : s.substring(best[1], best[2] + 1);
}`,
    },
    tests: [
      { name: "classic", args: ["ADOBECODEBANC", "ABC"], expected: "BANC" },
      { name: "exact single", args: ["a", "a"], expected: "a" },
      { name: "impossible", args: ["a", "aa"], expected: "" },
      { name: "full string", args: ["aa", "aa"], expected: "aa" },
      { name: "tail char", args: ["ab", "b"], expected: "b" },
    ],
    relatedIds: [438, 567],
  },
  {
    id: 239,
    slug: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    category: "sliding-window",
    patterns: ["Monotonic Deque", "Sliding Window"],
    companies: ["amazon", "google", "meta", "bytedance"],
    frequency: 76,
    leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/",
    description:
      "Given an array and a window size k, return an array containing the maximum value of every contiguous window of size k as it slides from left to right.",
    examples: [
      { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]", explanation: "Each entry is the max of a length-3 window." },
      { input: "nums = [9,11], k = 2", output: "[11]", explanation: "The single window's max is 11." },
    ],
    intuition:
      "A naive scan rechecks k values per window. Instead keep a deque of indices whose values are in decreasing order, so the front always holds the current window's maximum. Before pushing a new index, pop any smaller tail values (they can never be a future max) and drop a front index that has slid out of range.",
    approach: [
      "Maintain a deque of indices with strictly useful (decreasing) values.",
      "For each index, evict the front if it falls outside the window [i-k+1, i].",
      "Pop tail indices whose values are ≤ the incoming value, then push the new index.",
      "Once the first full window forms, record nums at the deque's front each step.",
    ],
    complexity: { time: "O(n)", space: "O(k)", note: "Every index is pushed and popped at most once." },
    solutions: [
      {
        language: "python",
        label: "Monotonic Deque",
        code: `from collections import deque


def max_sliding_window(nums: list[int], k: int) -> list[int]:
    dq = deque()
    res = []
    for i, x in enumerate(nums):
        while dq and dq[0] <= i - k:
            dq.popleft()
        while dq and nums[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res`,
      },
      {
        language: "typescript",
        label: "Monotonic Deque",
        code: `function maxSlidingWindow(nums: number[], k: number): number[] {
  const res: number[] = [];
  const dq: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    while (dq.length && dq[0] <= i - k) dq.shift();
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
    dq.push(i);
    if (i >= k - 1) res.push(nums[dq[0]]);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "maxSlidingWindow",
      comparison: "deep",
      jsStarter: `function maxSlidingWindow(nums, k) {
  // Return the maximum of each sliding window of size k.
  // TODO: implement
}`,
      jsReference: `function maxSlidingWindow(nums, k) {
  const res = [];
  const dq = [];
  for (let i = 0; i < nums.length; i++) {
    while (dq.length && dq[0] <= i - k) dq.shift();
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
    dq.push(i);
    if (i >= k - 1) res.push(nums[dq[0]]);
  }
  return res;
}`,
    },
    tests: [
      { name: "classic", args: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7] },
      { name: "single element window", args: [[1], 1], expected: [1] },
      { name: "window one", args: [[1, -1], 1], expected: [1, -1] },
      { name: "two element window", args: [[9, 11], 2], expected: [11] },
      { name: "descending", args: [[4, -2], 2], expected: [4] },
    ],
    relatedIds: [480],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Math & Geometry
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 50,
    slug: "powx-n",
    title: "Pow(x, n)",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Fast Exponentiation", "Divide and Conquer"],
    companies: ["amazon", "google", "meta", "bloomberg"],
    frequency: 68,
    leetcodeUrl: "https://leetcode.com/problems/powx-n/",
    description:
      "Compute x raised to the integer power n. The exponent may be negative, in which case the result is the reciprocal of the positive power.",
    examples: [
      { input: "x = 2.0, n = 10", output: "1024.0", explanation: "2^10 = 1024." },
      { input: "x = 2.0, n = -2", output: "0.25", explanation: "2^-2 = 1 / 4." },
    ],
    intuition:
      "Multiplying x by itself n times is O(n); binary exponentiation makes it O(log n). Square the base while halving the exponent, multiplying the running result by the base only when the current exponent bit is set. Negative exponents are handled by inverting the base up front.",
    approach: [
      "If n is negative, replace x with 1/x and negate n.",
      "Initialize result = 1 and loop while the exponent is positive.",
      "If the lowest bit of the exponent is 1, multiply result by x.",
      "Square x and halve the exponent each iteration.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "Iterative binary exponentiation." },
    solutions: [
      {
        language: "python",
        label: "Fast Power",
        code: `def my_pow(x: float, n: int) -> float:
    if n < 0:
        x = 1 / x
        n = -n
    result = 1.0
    while n > 0:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2
    return result`,
      },
      {
        language: "typescript",
        label: "Fast Power",
        code: `function myPow(x: number, n: number): number {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) result *= x;
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
}`,
      },
    ],
    runner: {
      entry: "myPow",
      comparison: "approx",
      jsStarter: `function myPow(x, n) {
  // Return x raised to the power n.
  // TODO: implement
}`,
      jsReference: `function myPow(x, n) {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) result *= x;
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
}`,
    },
    tests: [
      { name: "power of two", args: [2, 10], expected: 1024, tolerance: 1e-5 },
      { name: "fractional base", args: [2.1, 3], expected: 9.261, tolerance: 1e-5 },
      { name: "negative exponent", args: [2, -2], expected: 0.25, tolerance: 1e-5 },
      { name: "small power", args: [3, 4], expected: 81, tolerance: 1e-5 },
      { name: "base one", args: [1, 2147483647], expected: 1, tolerance: 1e-5 },
    ],
    relatedIds: [69, 372],
  },
  {
    id: 43,
    slug: "multiply-strings",
    title: "Multiply Strings",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Simulation", "Grade-School Multiplication"],
    companies: ["meta", "amazon", "microsoft", "google"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/multiply-strings/",
    description:
      "Multiply two non-negative integers given as decimal strings and return the product as a string, without converting the inputs to a built-in big-integer type.",
    examples: [
      { input: "num1 = \"2\", num2 = \"3\"", output: "\"6\"", explanation: "2 * 3 = 6." },
      { input: "num1 = \"123\", num2 = \"456\"", output: "\"56088\"", explanation: "Standard long multiplication." },
    ],
    intuition:
      "Mimic grade-school multiplication. The product of digit i of num1 and digit j of num2 lands in result positions i+j and i+j+1. Accumulate every digit-pair product into a fixed-size buffer of length m+n, carrying as you go, then strip leading zeros to form the answer.",
    approach: [
      "Short-circuit to \"0\" if either factor is \"0\".",
      "Allocate an integer buffer of length m+n initialized to zero.",
      "For each digit pair (i, j), add the product into position i+j+1, propagating the carry into i+j.",
      "Join the buffer into a string and trim leading zeros.",
    ],
    complexity: { time: "O(m·n)", space: "O(m + n)", note: "Buffer holds all positional digits." },
    solutions: [
      {
        language: "python",
        label: "Grade-School",
        code: `def multiply(num1: str, num2: str) -> str:
    if num1 == "0" or num2 == "0":
        return "0"
    m, n = len(num1), len(num2)
    pos = [0] * (m + n)
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            mul = (ord(num1[i]) - 48) * (ord(num2[j]) - 48)
            p1, p2 = i + j, i + j + 1
            total = mul + pos[p2]
            pos[p2] = total % 10
            pos[p1] += total // 10
    res = "".join(map(str, pos)).lstrip("0")
    return res or "0"`,
      },
      {
        language: "typescript",
        label: "Grade-School",
        code: `function multiply(num1: string, num2: string): string {
  if (num1 === "0" || num2 === "0") return "0";
  const m = num1.length, n = num2.length;
  const pos = new Array(m + n).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const mul = (num1.charCodeAt(i) - 48) * (num2.charCodeAt(j) - 48);
      const p1 = i + j, p2 = i + j + 1;
      const sum = mul + pos[p2];
      pos[p2] = sum % 10;
      pos[p1] += Math.floor(sum / 10);
    }
  }
  let res = pos.join("").replace(/^0+/, "");
  return res === "" ? "0" : res;
}`,
      },
    ],
    runner: {
      entry: "multiply",
      comparison: "deep",
      jsStarter: `function multiply(num1, num2) {
  // Return the product of two decimal-string integers.
  // TODO: implement
}`,
      jsReference: `function multiply(num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";
  const m = num1.length, n = num2.length;
  const pos = new Array(m + n).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const mul = (num1.charCodeAt(i) - 48) * (num2.charCodeAt(j) - 48);
      const p1 = i + j, p2 = i + j + 1;
      const sum = mul + pos[p2];
      pos[p2] = sum % 10;
      pos[p1] += Math.floor(sum / 10);
    }
  }
  let res = pos.join("").replace(/^0+/, "");
  return res === "" ? "0" : res;
}`,
    },
    tests: [
      { name: "single digits", args: ["2", "3"], expected: "6" },
      { name: "three digits", args: ["123", "456"], expected: "56088" },
      { name: "zero factor", args: ["0", "9999"], expected: "0" },
      { name: "carry", args: ["9", "99"], expected: "891" },
      { name: "large", args: ["123456789", "987654321"], expected: "121932631112635269" },
    ],
    relatedIds: [2, 67, 415],
  },
  {
    id: 7,
    slug: "reverse-integer",
    title: "Reverse Integer",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Math", "Overflow Handling"],
    companies: ["amazon", "apple", "bloomberg", "adobe"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/reverse-integer/",
    description:
      "Reverse the decimal digits of a signed 32-bit integer, preserving the sign. If the reversed value falls outside the signed 32-bit range, return 0 instead.",
    examples: [
      { input: "x = 123", output: "321", explanation: "Digits reversed." },
      { input: "x = -123", output: "-321", explanation: "Sign is kept, digits reversed." },
    ],
    intuition:
      "Peel digits off the end of the absolute value with mod-10 and rebuild the reversed number by shifting the accumulator. Track the sign separately. After reversing, a single range check against the 32-bit bounds catches any overflow case and returns 0.",
    approach: [
      "Record the sign and work with the absolute value.",
      "Repeatedly take the last digit (n % 10) and append it to the result (result * 10 + digit).",
      "Reapply the sign once digits are exhausted.",
      "Return 0 if the result exceeds the signed 32-bit range.",
    ],
    complexity: { time: "O(log x)", space: "O(1)", note: "Work scales with the digit count." },
    solutions: [
      {
        language: "python",
        label: "Digit Peel",
        code: `def reverse(x: int) -> int:
    sign = -1 if x < 0 else 1
    n = abs(x)
    rev = 0
    while n > 0:
        rev = rev * 10 + n % 10
        n //= 10
    rev *= sign
    if rev < -(2 ** 31) or rev > 2 ** 31 - 1:
        return 0
    return rev`,
      },
      {
        language: "typescript",
        label: "Digit Peel",
        code: `function reverse(x: number): number {
  const sign = x < 0 ? -1 : 1;
  let n = Math.abs(x);
  let rev = 0;
  while (n > 0) {
    rev = rev * 10 + (n % 10);
    n = Math.floor(n / 10);
  }
  rev *= sign;
  if (rev < -(2 ** 31) || rev > 2 ** 31 - 1) return 0;
  return rev;
}`,
      },
    ],
    runner: {
      entry: "reverse",
      comparison: "deep",
      jsStarter: `function reverse(x) {
  // Return x with its digits reversed, or 0 on overflow.
  // TODO: implement
}`,
      jsReference: `function reverse(x) {
  const sign = x < 0 ? -1 : 1;
  let n = Math.abs(x);
  let rev = 0;
  while (n > 0) {
    rev = rev * 10 + (n % 10);
    n = Math.floor(n / 10);
  }
  rev *= sign;
  if (rev < -(2 ** 31) || rev > 2 ** 31 - 1) return 0;
  return rev;
}`,
    },
    tests: [
      { name: "positive", args: [123], expected: 321 },
      { name: "negative", args: [-123], expected: -321 },
      { name: "trailing zero", args: [120], expected: 21 },
      { name: "zero", args: [0], expected: 0 },
      { name: "overflow", args: [1534236469], expected: 0 },
    ],
    relatedIds: [8, 190],
  },
  {
    id: 8,
    slug: "string-to-integer-atoi",
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["String Parsing", "Simulation"],
    companies: ["amazon", "microsoft", "bloomberg", "uber"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/string-to-integer-atoi/",
    description:
      "Convert the leading numeric portion of a string into a signed 32-bit integer: skip leading spaces, read an optional sign, consume digits until a non-digit, and clamp the result to the 32-bit range.",
    examples: [
      { input: "s = \"42\"", output: "42", explanation: "Plain number." },
      { input: "s = \"   -42\"", output: "-42", explanation: "Leading spaces skipped, sign honored." },
    ],
    intuition:
      "Process the string left to right in distinct phases: discard spaces, capture at most one sign, then accumulate digits until something non-numeric appears. Any trailing text is irrelevant. A final clamp to the signed 32-bit boundaries handles overflow.",
    approach: [
      "Advance past leading spaces.",
      "Read an optional single '+' or '-' to set the sign.",
      "Accumulate consecutive digit characters into a running number.",
      "Apply the sign and clamp to [-2^31, 2^31 - 1].",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "One linear pass over the prefix." },
    solutions: [
      {
        language: "python",
        label: "Phased Parse",
        code: `def my_atoi(s: str) -> int:
    i, n = 0, len(s)
    while i < n and s[i] == " ":
        i += 1
    sign = 1
    if i < n and s[i] in "+-":
        if s[i] == "-":
            sign = -1
        i += 1
    num = 0
    while i < n and s[i].isdigit():
        num = num * 10 + (ord(s[i]) - 48)
        i += 1
    num *= sign
    return max(-(2 ** 31), min(2 ** 31 - 1, num))`,
      },
      {
        language: "typescript",
        label: "Phased Parse",
        code: `function myAtoi(s: string): number {
  let i = 0;
  const n = s.length;
  while (i < n && s[i] === " ") i++;
  let sign = 1;
  if (i < n && (s[i] === "+" || s[i] === "-")) {
    if (s[i] === "-") sign = -1;
    i++;
  }
  let num = 0;
  while (i < n && s[i] >= "0" && s[i] <= "9") {
    num = num * 10 + (s.charCodeAt(i) - 48);
    i++;
  }
  num *= sign;
  const INT_MIN = -(2 ** 31), INT_MAX = 2 ** 31 - 1;
  if (num < INT_MIN) return INT_MIN;
  if (num > INT_MAX) return INT_MAX;
  return num;
}`,
      },
    ],
    runner: {
      entry: "myAtoi",
      comparison: "deep",
      jsStarter: `function myAtoi(s) {
  // Parse the leading integer from s with clamping.
  // TODO: implement
}`,
      jsReference: `function myAtoi(s) {
  let i = 0;
  const n = s.length;
  while (i < n && s[i] === " ") i++;
  let sign = 1;
  if (i < n && (s[i] === "+" || s[i] === "-")) {
    if (s[i] === "-") sign = -1;
    i++;
  }
  let num = 0;
  while (i < n && s[i] >= "0" && s[i] <= "9") {
    num = num * 10 + (s.charCodeAt(i) - 48);
    i++;
  }
  num *= sign;
  const INT_MIN = -(2 ** 31), INT_MAX = 2 ** 31 - 1;
  if (num < INT_MIN) return INT_MIN;
  if (num > INT_MAX) return INT_MAX;
  return num;
}`,
    },
    tests: [
      { name: "plain", args: ["42"], expected: 42 },
      { name: "leading spaces sign", args: ["   -42"], expected: -42 },
      { name: "trailing words", args: ["4193 with words"], expected: 4193 },
      { name: "leading words", args: ["words and 987"], expected: 0 },
      { name: "underflow clamp", args: ["-91283472332"], expected: -2147483648 },
    ],
    relatedIds: [7, 65],
  },
  {
    id: 202,
    slug: "happy-number",
    title: "Happy Number",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Hash Set", "Cycle Detection"],
    companies: ["amazon", "google", "uber", "airbnb"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/happy-number/",
    description:
      "Repeatedly replace a positive integer with the sum of the squares of its digits. The number is 'happy' if this process eventually reaches 1; report whether it does.",
    examples: [
      { input: "n = 19", output: "true", explanation: "1^2 + 9^2 = 82 → 68 → 100 → 1." },
      { input: "n = 2", output: "false", explanation: "The sequence falls into a loop that never hits 1." },
    ],
    intuition:
      "The digit-square process either reaches 1 or cycles forever. Detecting the cycle is the whole game: store every number seen, and if one repeats before you reach 1, the chain loops and the number is not happy.",
    approach: [
      "Maintain a set of numbers already encountered.",
      "Replace n with the sum of the squares of its digits each step.",
      "If n becomes 1, return true.",
      "If n reappears in the set, a cycle exists, so return false.",
    ],
    complexity: { time: "O(log n)", space: "O(log n)", note: "The chain length is bounded for any input." },
    solutions: [
      {
        language: "python",
        label: "Cycle Detection",
        code: `def is_happy(n: int) -> bool:
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(d) ** 2 for d in str(n))
    return n == 1`,
      },
      {
        language: "typescript",
        label: "Cycle Detection",
        code: `function isHappy(n: number): boolean {
  const seen = new Set<number>();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    let sum = 0;
    while (n > 0) {
      const d = n % 10;
      sum += d * d;
      n = Math.floor(n / 10);
    }
    n = sum;
  }
  return n === 1;
}`,
      },
    ],
    runner: {
      entry: "isHappy",
      comparison: "deep",
      jsStarter: `function isHappy(n) {
  // Return true if n is a happy number.
  // TODO: implement
}`,
      jsReference: `function isHappy(n) {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    let sum = 0;
    while (n > 0) {
      const d = n % 10;
      sum += d * d;
      n = Math.floor(n / 10);
    }
    n = sum;
  }
  return n === 1;
}`,
    },
    tests: [
      { name: "happy", args: [19], expected: true },
      { name: "unhappy two", args: [2], expected: false },
      { name: "one", args: [1], expected: true },
      { name: "happy seven", args: [7], expected: true },
      { name: "unhappy four", args: [4], expected: false },
    ],
    relatedIds: [141, 258],
  },
  {
    id: 168,
    slug: "excel-sheet-column-title",
    title: "Excel Sheet Column Title",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Math", "Base Conversion"],
    companies: ["amazon", "microsoft", "apple"],
    frequency: 46,
    leetcodeUrl: "https://leetcode.com/problems/excel-sheet-column-title/",
    description:
      "Convert a positive integer into its Excel column label, where 1 maps to 'A', 26 to 'Z', 27 to 'AA', and so on. This is a base-26 system with no zero digit.",
    examples: [
      { input: "columnNumber = 1", output: "\"A\"", explanation: "The first column." },
      { input: "columnNumber = 28", output: "\"AB\"", explanation: "26 + 2 maps to AB." },
    ],
    intuition:
      "It's base-26, but the alphabet starts at 1 (A) instead of 0, so there is no zero digit. Subtracting one before each modulo shifts the range into 0..25, letting you pick a letter and divide down. Build the label from least-significant letter to most, then reverse.",
    approach: [
      "While the number is positive, decrement it by 1 to make the system 0-indexed.",
      "Take number % 26 to choose the next letter ('A' + remainder).",
      "Integer-divide the number by 26 and continue.",
      "Reverse the collected letters to get the final title.",
    ],
    complexity: { time: "O(log n)", space: "O(log n)", note: "One letter per base-26 digit." },
    solutions: [
      {
        language: "python",
        label: "Base-26",
        code: `def convert_to_title(column_number: int) -> str:
    res = []
    while column_number > 0:
        column_number -= 1
        res.append(chr(65 + column_number % 26))
        column_number //= 26
    return "".join(reversed(res))`,
      },
      {
        language: "typescript",
        label: "Base-26",
        code: `function convertToTitle(columnNumber: number): string {
  let res = "";
  while (columnNumber > 0) {
    columnNumber--;
    res = String.fromCharCode(65 + (columnNumber % 26)) + res;
    columnNumber = Math.floor(columnNumber / 26);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "convertToTitle",
      comparison: "deep",
      jsStarter: `function convertToTitle(columnNumber) {
  // Return the Excel column title for the given number.
  // TODO: implement
}`,
      jsReference: `function convertToTitle(columnNumber) {
  let res = "";
  while (columnNumber > 0) {
    columnNumber--;
    res = String.fromCharCode(65 + (columnNumber % 26)) + res;
    columnNumber = Math.floor(columnNumber / 26);
  }
  return res;
}`,
    },
    tests: [
      { name: "first", args: [1], expected: "A" },
      { name: "two letters", args: [28], expected: "AB" },
      { name: "ZY", args: [701], expected: "ZY" },
      { name: "boundary Z", args: [26], expected: "Z" },
      { name: "max int", args: [2147483647], expected: "FXSHRXW" },
    ],
    relatedIds: [171],
  },
  {
    id: 171,
    slug: "excel-sheet-column-number",
    title: "Excel Sheet Column Number",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Math", "Base Conversion"],
    companies: ["amazon", "microsoft", "apple"],
    frequency: 44,
    leetcodeUrl: "https://leetcode.com/problems/excel-sheet-column-number/",
    description:
      "Given an Excel column label such as 'A', 'Z', or 'AB', return its 1-based column number. This is the inverse of converting a number to a column title.",
    examples: [
      { input: "columnTitle = \"A\"", output: "1", explanation: "The first column." },
      { input: "columnTitle = \"AB\"", output: "28", explanation: "26 * 1 + 2 = 28." },
    ],
    intuition:
      "Read the label as a base-26 number where 'A' is the digit 1 and 'Z' is 26. Process letters left to right, multiplying the running total by 26 and adding the current letter's value — exactly like evaluating digits of a positional number.",
    approach: [
      "Start the result at 0.",
      "For each letter from left to right, compute its value (char - 'A' + 1).",
      "Update result = result * 26 + value.",
      "Return the accumulated result.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "One pass over the label." },
    solutions: [
      {
        language: "python",
        label: "Base-26",
        code: `def title_to_number(column_title: str) -> int:
    result = 0
    for ch in column_title:
        result = result * 26 + (ord(ch) - 64)
    return result`,
      },
      {
        language: "typescript",
        label: "Base-26",
        code: `function titleToNumber(columnTitle: string): number {
  let result = 0;
  for (let i = 0; i < columnTitle.length; i++) {
    result = result * 26 + (columnTitle.charCodeAt(i) - 64);
  }
  return result;
}`,
      },
    ],
    runner: {
      entry: "titleToNumber",
      comparison: "deep",
      jsStarter: `function titleToNumber(columnTitle) {
  // Return the column number for the Excel title.
  // TODO: implement
}`,
      jsReference: `function titleToNumber(columnTitle) {
  let result = 0;
  for (let i = 0; i < columnTitle.length; i++) {
    result = result * 26 + (columnTitle.charCodeAt(i) - 64);
  }
  return result;
}`,
    },
    tests: [
      { name: "first", args: ["A"], expected: 1 },
      { name: "two letters", args: ["AB"], expected: 28 },
      { name: "ZY", args: ["ZY"], expected: 701 },
      { name: "boundary Z", args: ["Z"], expected: 26 },
      { name: "max int", args: ["FXSHRXW"], expected: 2147483647 },
    ],
    relatedIds: [168],
  },
];

export default batchE;
