import type { Problem } from "../types.ts";

/**
 * Batch M — twenty arrays/two-pointer, sliding-window, math-geometry,
 * binary-search, and bit-manipulation problems. Every record ships working
 * Python + TypeScript solutions and a fully wired playground runner whose
 * JavaScript reference passes the hand-verified tests.
 */
export const batchM: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Arrays & Hashing
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 561,
    slug: "array-partition",
    title: "Array Partition",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Sorting", "Greedy"],
    companies: ["amazon", "google"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/array-partition/",
    description:
      "Given an array of 2n integers, split it into n pairs so the sum of the minimum of each pair is as large as possible, and return that maximum sum.",
    examples: [
      { input: "nums = [1,4,3,2]", output: "4", explanation: "Pair as (1,2) and (3,4); the minimums 1 and 3 sum to 4." },
      { input: "nums = [6,2,6,5,1,2]", output: "9" },
    ],
    intuition:
      "Each pair contributes its smaller element. To lose as little as possible to the discarded larger element, you want the two numbers in every pair to be close together. Sorting and pairing neighbours achieves exactly that, so the answer is the sum of every value sitting at an even index.",
    approach: [
      "Sort the array in non-decreasing order.",
      "Walk the sorted array taking elements at indices 0, 2, 4, … — each is the minimum of its adjacent pair.",
      "Accumulate those values and return the total.",
    ],
    complexity: { time: "O(n log n)", space: "O(1)", note: "Dominated by the sort; only a running sum is kept." },
    solutions: [
      {
        language: "python",
        label: "Sort + Greedy",
        code: `def array_pair_sum(nums: list[int]) -> int:
    nums.sort()
    return sum(nums[::2])`,
      },
      {
        language: "typescript",
        label: "Sort + Greedy",
        code: `function arrayPairSum(nums: number[]): number {
  nums.sort((a, b) => a - b);
  let total = 0;
  for (let i = 0; i < nums.length; i += 2) total += nums[i];
  return total;
}`,
      },
    ],
    runner: {
      entry: "arrayPairSum",
      comparison: "deep",
      jsStarter: `function arrayPairSum(nums) {
  // Return the maximised sum of pair minimums.
  // TODO: implement
}`,
      jsReference: `function arrayPairSum(nums) {
  nums.sort((a, b) => a - b);
  let total = 0;
  for (let i = 0; i < nums.length; i += 2) total += nums[i];
  return total;
}`,
    },
    tests: [
      { name: "basic", args: [[1, 4, 3, 2]], expected: 4 },
      { name: "six elements", args: [[6, 2, 6, 5, 1, 2]], expected: 9 },
      { name: "single pair", args: [[1, 1]], expected: 1 },
      { name: "negatives", args: [[-1, -2, -3, -4]], expected: -6 },
    ],
    relatedIds: [455],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Two Pointers
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 28,
    slug: "find-the-index-of-the-first-occurrence-in-a-string",
    title: "Find the Index of the First Occurrence in a String",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["String Matching", "Two Pointers"],
    companies: ["amazon", "microsoft", "apple", "bloomberg"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
    description:
      "Given two strings `haystack` and `needle`, return the index of the first position where `needle` begins inside `haystack`, or -1 if it never appears. An empty needle matches at index 0.",
    examples: [
      { input: 'haystack = "sadbutsad", needle = "sad"', output: "0", explanation: "The first \"sad\" starts at index 0." },
      { input: 'haystack = "leetcode", needle = "leeto"', output: "-1" },
    ],
    intuition:
      "Slide a window the size of `needle` across `haystack`. At each starting position, compare the window character by character; the first position whose characters all match is the answer. Stop scanning once fewer characters than `needle` remain.",
    approach: [
      "If needle is empty, return 0 immediately.",
      "For each start index i where a full needle could still fit, compare needle against haystack[i..i+len-1].",
      "Return the first i whose comparison fully matches.",
      "If no start index matches, return -1.",
    ],
    complexity: { time: "O(n*m)", space: "O(1)", note: "n = haystack length, m = needle length; naive sliding comparison." },
    solutions: [
      {
        language: "python",
        label: "Sliding Compare",
        code: `def str_str(haystack: str, needle: str) -> int:
    n, m = len(haystack), len(needle)
    for i in range(n - m + 1):
        if haystack[i:i + m] == needle:
            return i
    return -1`,
      },
      {
        language: "typescript",
        label: "Sliding Compare",
        code: `function strStr(haystack: string, needle: string): number {
  const n = haystack.length;
  const m = needle.length;
  for (let i = 0; i + m <= n; i++) {
    let j = 0;
    while (j < m && haystack[i + j] === needle[j]) j++;
    if (j === m) return i;
  }
  return -1;
}`,
      },
    ],
    runner: {
      entry: "strStr",
      comparison: "deep",
      jsStarter: `function strStr(haystack, needle) {
  // Return the first index of needle in haystack, or -1.
  // TODO: implement
}`,
      jsReference: `function strStr(haystack, needle) {
  const n = haystack.length;
  const m = needle.length;
  for (let i = 0; i + m <= n; i++) {
    let j = 0;
    while (j < m && haystack[i + j] === needle[j]) j++;
    if (j === m) return i;
  }
  return -1;
}`,
    },
    tests: [
      { name: "match at start", args: ["sadbutsad", "sad"], expected: 0 },
      { name: "no match", args: ["leetcode", "leeto"], expected: -1 },
      { name: "interior match", args: ["hello", "ll"], expected: 2 },
      { name: "empty needle", args: ["abc", ""], expected: 0 },
      { name: "single char", args: ["a", "a"], expected: 0 },
    ],
    relatedIds: [459, 686],
  },
  {
    id: 922,
    slug: "sort-array-by-parity-ii",
    title: "Sort Array By Parity II",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Two Pointers", "In-place"],
    companies: ["amazon", "adobe"],
    frequency: 42,
    leetcodeUrl: "https://leetcode.com/problems/sort-array-by-parity-ii/",
    description:
      "Given an array `nums` with an equal number of even and odd values, rearrange it so that every even index holds an even value and every odd index holds an odd value. Any valid arrangement is accepted.",
    examples: [
      { input: "nums = [4,2,5,7]", output: "[4,5,2,7]", explanation: "Even values land on even indices, odd values on odd indices." },
      { input: "nums = [2,3]", output: "[2,3]" },
    ],
    intuition:
      "Keep two write cursors: one for the next free even index and one for the next free odd index. Scan the input once, dropping each value onto the cursor that matches its parity, then advance that cursor by two. Because the count of evens equals the count of odds, both cursors fill their slots exactly.",
    approach: [
      "Allocate a result array of the same length.",
      "Track `even = 0` and `odd = 1` as the next open slots of each parity.",
      "For each value, if it is even place it at `even` and add 2; otherwise place it at `odd` and add 2.",
      "Return the filled result.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Single pass; an in-place two-pointer swap variant uses O(1) extra space." },
    solutions: [
      {
        language: "python",
        label: "Two Cursors",
        code: `def sort_array_by_parity_ii(nums: list[int]) -> list[int]:
    res = [0] * len(nums)
    even, odd = 0, 1
    for x in nums:
        if x % 2 == 0:
            res[even] = x
            even += 2
        else:
            res[odd] = x
            odd += 2
    return res`,
      },
      {
        language: "typescript",
        label: "Two Cursors",
        code: `function sortArrayByParityII(nums: number[]): number[] {
  const res = new Array<number>(nums.length);
  let even = 0;
  let odd = 1;
  for (const x of nums) {
    if (x % 2 === 0) {
      res[even] = x;
      even += 2;
    } else {
      res[odd] = x;
      odd += 2;
    }
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "sortArrayByParityII",
      comparison: "deep",
      jsStarter: `function sortArrayByParityII(nums) {
  // Place even values on even indices and odd values on odd indices.
  // TODO: implement
}`,
      jsReference: `function sortArrayByParityII(nums) {
  const res = new Array(nums.length);
  let even = 0;
  let odd = 1;
  for (const x of nums) {
    if (x % 2 === 0) {
      res[even] = x;
      even += 2;
    } else {
      res[odd] = x;
      odd += 2;
    }
  }
  return res;
}`,
    },
    tests: [
      { name: "basic", args: [[4, 2, 5, 7]], expected: [4, 5, 2, 7] },
      { name: "two elements", args: [[2, 3]], expected: [2, 3] },
      { name: "odd first input", args: [[1, 2, 3, 4]], expected: [2, 1, 4, 3] },
      { name: "already valid", args: [[6, 5, 8, 7, 10, 9]], expected: [6, 5, 8, 7, 10, 9] },
    ],
    relatedIds: [905],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Sliding Window
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1838,
    slug: "frequency-of-the-most-frequent-element",
    title: "Frequency of the Most Frequent Element",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window", "Sorting", "Prefix Sum"],
    companies: ["amazon", "google", "bytedance"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/frequency-of-the-most-frequent-element/",
    description:
      "You may increase any element by 1 and may apply at most `k` such increments in total. Return the largest frequency any single value can reach after spending the increments.",
    examples: [
      { input: "nums = [1,2,4], k = 5", output: "3", explanation: "Raise 1→4 (3 ops) and 2→4 (2 ops); all three become 4." },
      { input: "nums = [1,4,8,13], k = 5", output: "2" },
    ],
    intuition:
      "Sort the values. To make a window of equal elements you should raise everyone up to the window's largest value. Over a window [l, r], the cost is `nums[r] * windowSize - sum(window)`. Grow `r`, and whenever the cost exceeds `k`, shrink from the left. The widest affordable window is the answer.",
    approach: [
      "Sort nums ascending.",
      "Slide a window with right pointer r, maintaining the running sum of window elements.",
      "Cost to lift the window to nums[r] is nums[r]*(r-l+1) - windowSum.",
      "While the cost exceeds k, drop nums[l] from the sum and advance l.",
      "Track the maximum window size seen.",
    ],
    complexity: { time: "O(n log n)", space: "O(1)", note: "Sort dominates; the window scan is linear." },
    solutions: [
      {
        language: "python",
        label: "Sort + Sliding Window",
        code: `def max_frequency(nums: list[int], k: int) -> int:
    nums.sort()
    left = 0
    total = 0
    best = 1
    for right, x in enumerate(nums):
        total += x
        while x * (right - left + 1) - total > k:
            total -= nums[left]
            left += 1
        best = max(best, right - left + 1)
    return best`,
      },
      {
        language: "typescript",
        label: "Sort + Sliding Window",
        code: `function maxFrequency(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);
  let left = 0;
  let total = 0;
  let best = 1;
  for (let right = 0; right < nums.length; right++) {
    total += nums[right];
    while (nums[right] * (right - left + 1) - total > k) {
      total -= nums[left];
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "maxFrequency",
      comparison: "deep",
      jsStarter: `function maxFrequency(nums, k) {
  // Return the largest achievable frequency given k increments.
  // TODO: implement
}`,
      jsReference: `function maxFrequency(nums, k) {
  nums.sort((a, b) => a - b);
  let left = 0;
  let total = 0;
  let best = 1;
  for (let right = 0; right < nums.length; right++) {
    total += nums[right];
    while (nums[right] * (right - left + 1) - total > k) {
      total -= nums[left];
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    },
    tests: [
      { name: "lift two", args: [[1, 2, 4], 5], expected: 3 },
      { name: "spread out", args: [[1, 4, 8, 13], 5], expected: 2 },
      { name: "small budget", args: [[3, 9, 6], 2], expected: 1 },
      { name: "already equal", args: [[1, 1, 1, 1], 0], expected: 4 },
    ],
    relatedIds: [1004, 424],
  },
  {
    id: 485,
    slug: "max-consecutive-ones",
    title: "Max Consecutive Ones",
    difficulty: "Easy",
    category: "sliding-window",
    patterns: ["Sliding Window", "Counting"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/max-consecutive-ones/",
    description:
      "Given a binary array `nums`, return the length of the longest run of consecutive 1s it contains.",
    examples: [
      { input: "nums = [1,1,0,1,1,1]", output: "3", explanation: "The final three 1s form the longest run." },
      { input: "nums = [1,0,1,1,0,1]", output: "2" },
    ],
    intuition:
      "Walk through the array keeping a running count of the current streak of 1s. Every 1 extends the streak; every 0 resets it to zero. The best answer is simply the largest streak length you ever observed.",
    approach: [
      "Initialise current streak and best streak to 0.",
      "For each value: if it is 1, increment the current streak and update the best; if it is 0, reset the current streak.",
      "Return the best streak.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "One linear pass with two counters." },
    solutions: [
      {
        language: "python",
        label: "Running Streak",
        code: `def find_max_consecutive_ones(nums: list[int]) -> int:
    best = current = 0
    for x in nums:
        current = current + 1 if x == 1 else 0
        best = max(best, current)
    return best`,
      },
      {
        language: "typescript",
        label: "Running Streak",
        code: `function findMaxConsecutiveOnes(nums: number[]): number {
  let best = 0;
  let current = 0;
  for (const x of nums) {
    current = x === 1 ? current + 1 : 0;
    if (current > best) best = current;
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "findMaxConsecutiveOnes",
      comparison: "deep",
      jsStarter: `function findMaxConsecutiveOnes(nums) {
  // Return the length of the longest run of 1s.
  // TODO: implement
}`,
      jsReference: `function findMaxConsecutiveOnes(nums) {
  let best = 0;
  let current = 0;
  for (const x of nums) {
    current = x === 1 ? current + 1 : 0;
    if (current > best) best = current;
  }
  return best;
}`,
    },
    tests: [
      { name: "trailing run", args: [[1, 1, 0, 1, 1, 1]], expected: 3 },
      { name: "broken runs", args: [[1, 0, 1, 1, 0, 1]], expected: 2 },
      { name: "all zeros", args: [[0, 0, 0]], expected: 0 },
      { name: "all ones", args: [[1, 1, 1, 1]], expected: 4 },
    ],
    relatedIds: [487, 1004],
  },
  {
    id: 30,
    slug: "substring-with-concatenation-of-all-words",
    title: "Substring with Concatenation of All Words",
    difficulty: "Hard",
    category: "sliding-window",
    patterns: ["Sliding Window", "Hash Map"],
    companies: ["amazon", "meta", "bloomberg"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/",
    description:
      "Given a string `s` and a list `words` of equal-length strings, return every start index in `s` where a substring is an exact concatenation of all of `words` in any order, using each word the same number of times it appears.",
    examples: [
      { input: 's = "barfoothefoobarman", words = ["foo","bar"]', output: "[0,9]", explanation: '"barfoo" starts at 0 and "foobar" starts at 9.' },
      { input: 's = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]', output: "[]" },
    ],
    intuition:
      "Every candidate substring has the fixed length `wordLen * numWords`. Build a frequency map of the required words. For each start index, chop the window into word-sized chunks and tally them; if the tally never exceeds the required counts and consumes the right number of words, the start index qualifies.",
    approach: [
      "Compute wordLen, the number of words, and the total window length.",
      "Build a count map of the required words.",
      "For each start index where a full window fits, slice consecutive word-length chunks.",
      "Reject a chunk that is not a required word or whose running count exceeds what is needed.",
      "If all chunks pass, record the start index.",
    ],
    complexity: { time: "O(n*m)", space: "O(m)", note: "n = len(s), m = number of words; each start checks m chunks." },
    solutions: [
      {
        language: "python",
        label: "Hash Map Window",
        code: `def find_substring(s: str, words: list[str]) -> list[int]:
    if not words:
        return []
    word_len = len(words[0])
    count = len(words)
    total = word_len * count
    need: dict[str, int] = {}
    for w in words:
        need[w] = need.get(w, 0) + 1
    res: list[int] = []
    for i in range(len(s) - total + 1):
        seen: dict[str, int] = {}
        ok = True
        for j in range(count):
            chunk = s[i + j * word_len:i + (j + 1) * word_len]
            if chunk not in need:
                ok = False
                break
            seen[chunk] = seen.get(chunk, 0) + 1
            if seen[chunk] > need[chunk]:
                ok = False
                break
        if ok:
            res.append(i)
    return res`,
      },
      {
        language: "typescript",
        label: "Hash Map Window",
        code: `function findSubstring(s: string, words: string[]): number[] {
  const res: number[] = [];
  if (words.length === 0) return res;
  const wordLen = words[0].length;
  const count = words.length;
  const total = wordLen * count;
  if (total > s.length) return res;
  const need = new Map<string, number>();
  for (const w of words) need.set(w, (need.get(w) ?? 0) + 1);
  for (let i = 0; i + total <= s.length; i++) {
    const seen = new Map<string, number>();
    let ok = true;
    for (let j = 0; j < count; j++) {
      const chunk = s.slice(i + j * wordLen, i + (j + 1) * wordLen);
      const required = need.get(chunk);
      if (required === undefined) {
        ok = false;
        break;
      }
      const next = (seen.get(chunk) ?? 0) + 1;
      if (next > required) {
        ok = false;
        break;
      }
      seen.set(chunk, next);
    }
    if (ok) res.push(i);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "findSubstring",
      comparison: "canonical",
      jsStarter: `function findSubstring(s, words) {
  // Return every start index of a full concatenation of words.
  // TODO: implement
}`,
      jsReference: `function findSubstring(s, words) {
  const res = [];
  if (words.length === 0) return res;
  const wordLen = words[0].length;
  const count = words.length;
  const total = wordLen * count;
  if (total > s.length) return res;
  const need = new Map();
  for (const w of words) need.set(w, (need.get(w) ?? 0) + 1);
  for (let i = 0; i + total <= s.length; i++) {
    const seen = new Map();
    let ok = true;
    for (let j = 0; j < count; j++) {
      const chunk = s.slice(i + j * wordLen, i + (j + 1) * wordLen);
      const required = need.get(chunk);
      if (required === undefined) { ok = false; break; }
      const next = (seen.get(chunk) ?? 0) + 1;
      if (next > required) { ok = false; break; }
      seen.set(chunk, next);
    }
    if (ok) res.push(i);
  }
  return res;
}`,
    },
    tests: [
      { name: "two words", args: ["barfoothefoobarman", ["foo", "bar"]], expected: [0, 9], comparison: "canonical" },
      { name: "no match", args: ["wordgoodgoodgoodbestword", ["word", "good", "best", "word"]], expected: [], comparison: "canonical" },
      { name: "three words", args: ["barfoofoobarthefoobarman", ["bar", "foo", "the"]], expected: [6, 9, 12], comparison: "canonical" },
      { name: "repeated letter", args: ["aaa", ["a", "a"]], expected: [0, 1], comparison: "canonical" },
    ],
    relatedIds: [76],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Math & Geometry
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 12,
    slug: "integer-to-roman",
    title: "Integer to Roman",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Greedy", "Lookup Table"],
    companies: ["amazon", "microsoft", "adobe", "bloomberg"],
    frequency: 57,
    leetcodeUrl: "https://leetcode.com/problems/integer-to-roman/",
    description:
      "Convert an integer between 1 and 3999 into its Roman numeral representation using the standard subtractive notation (such as IV for 4 and CM for 900).",
    examples: [
      { input: "num = 58", output: '"LVIII"', explanation: "50 + 5 + 1 + 1 + 1." },
      { input: "num = 1994", output: '"MCMXCIV"', explanation: "1000 + 900 + 90 + 4." },
    ],
    intuition:
      "List every Roman value from largest to smallest, including the subtractive pairs (900, 400, 90, 40, 9, 4). Greedily peel off the biggest value that still fits, append its symbol, and subtract it. Because the list already contains the subtractive cases, no special handling is needed.",
    approach: [
      "Store value→symbol pairs sorted by descending value, including subtractive entries.",
      "Iterate the pairs; while the current value fits in num, append its symbol and subtract it.",
      "Stop when num reaches 0 and return the accumulated string.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "The pair table has constant size and num is bounded by 3999." },
    solutions: [
      {
        language: "python",
        label: "Greedy Table",
        code: `def int_to_roman(num: int) -> str:
    pairs = [
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
        (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
        (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I"),
    ]
    out: list[str] = []
    for value, symbol in pairs:
        while num >= value:
            out.append(symbol)
            num -= value
    return "".join(out)`,
      },
      {
        language: "typescript",
        label: "Greedy Table",
        code: `function intToRoman(num: number): string {
  const pairs: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  for (const [value, symbol] of pairs) {
    while (num >= value) {
      out += symbol;
      num -= value;
    }
  }
  return out;
}`,
      },
    ],
    runner: {
      entry: "intToRoman",
      comparison: "deep",
      jsStarter: `function intToRoman(num) {
  // Return the Roman numeral for num.
  // TODO: implement
}`,
      jsReference: `function intToRoman(num) {
  const pairs = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  for (const [value, symbol] of pairs) {
    while (num >= value) {
      out += symbol;
      num -= value;
    }
  }
  return out;
}`,
    },
    tests: [
      { name: "three", args: [3], expected: "III" },
      { name: "fifty-eight", args: [58], expected: "LVIII" },
      { name: "subtractive", args: [1994], expected: "MCMXCIV" },
      { name: "four", args: [4], expected: "IV" },
      { name: "nine", args: [9], expected: "IX" },
    ],
    relatedIds: [13, 273],
  },
  {
    id: 59,
    slug: "spiral-matrix-ii",
    title: "Spiral Matrix II",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Matrix", "Simulation"],
    companies: ["amazon", "microsoft", "apple"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/spiral-matrix-ii/",
    description:
      "Given a positive integer `n`, build an n×n matrix filled with the numbers 1 through n² laid out in clockwise spiral order starting from the top-left corner.",
    examples: [
      { input: "n = 3", output: "[[1,2,3],[8,9,4],[7,6,5]]" },
      { input: "n = 1", output: "[[1]]" },
    ],
    intuition:
      "Track four shrinking boundaries — top, bottom, left, right. Fill the top row left-to-right, the right column top-to-bottom, the bottom row right-to-left, then the left column bottom-to-top, tightening the matching boundary after each pass. A single counter supplies the values in order.",
    approach: [
      "Create an n×n grid and four boundaries plus a counter starting at 1.",
      "Fill the top row, then increment top.",
      "Fill the right column, then decrement right.",
      "Fill the bottom row, then decrement bottom.",
      "Fill the left column, then increment left; repeat until the counter exceeds n².",
    ],
    complexity: { time: "O(n^2)", space: "O(1)", note: "Each of the n² cells is written exactly once; output grid aside." },
    solutions: [
      {
        language: "python",
        label: "Boundary Simulation",
        code: `def generate_matrix(n: int) -> list[list[int]]:
    grid = [[0] * n for _ in range(n)]
    top, bottom, left, right = 0, n - 1, 0, n - 1
    val = 1
    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            grid[top][c] = val
            val += 1
        top += 1
        for r in range(top, bottom + 1):
            grid[r][right] = val
            val += 1
        right -= 1
        for c in range(right, left - 1, -1):
            grid[bottom][c] = val
            val += 1
        bottom -= 1
        for r in range(bottom, top - 1, -1):
            grid[r][left] = val
            val += 1
        left += 1
    return grid`,
      },
      {
        language: "typescript",
        label: "Boundary Simulation",
        code: `function generateMatrix(n: number): number[][] {
  const grid: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  let top = 0;
  let bottom = n - 1;
  let left = 0;
  let right = n - 1;
  let val = 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) grid[top][c] = val++;
    top++;
    for (let r = top; r <= bottom; r++) grid[r][right] = val++;
    right--;
    for (let c = right; c >= left; c--) grid[bottom][c] = val++;
    bottom--;
    for (let r = bottom; r >= top; r--) grid[r][left] = val++;
    left++;
  }
  return grid;
}`,
      },
    ],
    runner: {
      entry: "generateMatrix",
      comparison: "deep",
      jsStarter: `function generateMatrix(n) {
  // Return an n x n matrix filled in clockwise spiral order.
  // TODO: implement
}`,
      jsReference: `function generateMatrix(n) {
  const grid = Array.from({ length: n }, () => Array(n).fill(0));
  let top = 0;
  let bottom = n - 1;
  let left = 0;
  let right = n - 1;
  let val = 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) grid[top][c] = val++;
    top++;
    for (let r = top; r <= bottom; r++) grid[r][right] = val++;
    right--;
    for (let c = right; c >= left; c--) grid[bottom][c] = val++;
    bottom--;
    for (let r = bottom; r >= top; r--) grid[r][left] = val++;
    left++;
  }
  return grid;
}`,
    },
    tests: [
      { name: "three by three", args: [3], expected: [[1, 2, 3], [8, 9, 4], [7, 6, 5]] },
      { name: "one by one", args: [1], expected: [[1]] },
      { name: "two by two", args: [2], expected: [[1, 2], [4, 3]] },
    ],
    relatedIds: [54],
  },
  {
    id: 989,
    slug: "add-to-array-form-of-integer",
    title: "Add to Array-Form of Integer",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Math", "Simulation"],
    companies: ["amazon", "google"],
    frequency: 46,
    leetcodeUrl: "https://leetcode.com/problems/add-to-array-form-of-integer/",
    description:
      "An integer is given as `num`, an array of its decimal digits from most to least significant. Add the integer `k` to it and return the sum, again as an array of digits.",
    examples: [
      { input: "num = [1,2,0,0], k = 34", output: "[1,2,3,4]", explanation: "1200 + 34 = 1234." },
      { input: "num = [2,7,4], k = 181", output: "[4,5,5]" },
    ],
    intuition:
      "Treat `k` as the running carry. Walk the digit array from the least significant end, add the lowest digit of the carry to it, record the result digit, and keep the remaining carry. After consuming all array digits, keep emitting digits while any carry remains, then reverse.",
    approach: [
      "Start from the last index of num with carry = k.",
      "At each step add the current digit (if any) to carry, push carry % 10, and set carry = floor(carry / 10).",
      "Continue while there are digits left or carry is non-zero.",
      "Reverse the collected digits to restore most-significant-first order.",
    ],
    complexity: { time: "O(max(n, log k))", space: "O(max(n, log k))", note: "Process every digit plus any extra carry digits." },
    solutions: [
      {
        language: "python",
        label: "Carry Sweep",
        code: `def add_to_array_form(num: list[int], k: int) -> list[int]:
    res: list[int] = []
    i = len(num) - 1
    carry = k
    while i >= 0 or carry > 0:
        if i >= 0:
            carry += num[i]
            i -= 1
        res.append(carry % 10)
        carry //= 10
    res.reverse()
    return res`,
      },
      {
        language: "typescript",
        label: "Carry Sweep",
        code: `function addToArrayForm(num: number[], k: number): number[] {
  const res: number[] = [];
  let i = num.length - 1;
  let carry = k;
  while (i >= 0 || carry > 0) {
    if (i >= 0) {
      carry += num[i];
      i--;
    }
    res.push(carry % 10);
    carry = Math.floor(carry / 10);
  }
  res.reverse();
  return res;
}`,
      },
    ],
    runner: {
      entry: "addToArrayForm",
      comparison: "deep",
      jsStarter: `function addToArrayForm(num, k) {
  // Return the digit array of num + k.
  // TODO: implement
}`,
      jsReference: `function addToArrayForm(num, k) {
  const res = [];
  let i = num.length - 1;
  let carry = k;
  while (i >= 0 || carry > 0) {
    if (i >= 0) {
      carry += num[i];
      i--;
    }
    res.push(carry % 10);
    carry = Math.floor(carry / 10);
  }
  res.reverse();
  return res;
}`,
    },
    tests: [
      { name: "no extra digit", args: [[1, 2, 0, 0], 34], expected: [1, 2, 3, 4] },
      { name: "carry inside", args: [[2, 7, 4], 181], expected: [4, 5, 5] },
      { name: "grows length", args: [[2, 1, 5], 806], expected: [1, 0, 2, 1] },
      { name: "all nines", args: [[9, 9, 9], 1], expected: [1, 0, 0, 0] },
    ],
    relatedIds: [66, 67, 415],
  },
  {
    id: 67,
    slug: "add-binary",
    title: "Add Binary",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Bit Manipulation", "Simulation"],
    companies: ["amazon", "meta", "microsoft"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/add-binary/",
    description:
      "Given two binary strings `a` and `b`, return their sum as a binary string.",
    examples: [
      { input: 'a = "11", b = "1"', output: '"100"', explanation: "3 + 1 = 4 = 100 in binary." },
      { input: 'a = "1010", b = "1011"', output: '"10101"' },
    ],
    intuition:
      "Add the two strings the way you would by hand: scan both from the rightmost bit, summing matching bits plus a carry. Each column emits `sum % 2` and carries `sum / 2`. Continue past the shorter string until both are exhausted and no carry remains, then reverse.",
    approach: [
      "Set two indices at the ends of a and b and a carry of 0.",
      "At each step add the available bits and the carry.",
      "Append sum & 1 to the output and set carry = sum >> 1.",
      "Continue while either index is valid or carry is set, then reverse the result.",
    ],
    complexity: { time: "O(max(n, m))", space: "O(max(n, m))", note: "One pass over the longer string." },
    solutions: [
      {
        language: "python",
        label: "Column Addition",
        code: `def add_binary(a: str, b: str) -> str:
    i, j = len(a) - 1, len(b) - 1
    carry = 0
    out: list[str] = []
    while i >= 0 or j >= 0 or carry:
        total = carry
        if i >= 0:
            total += ord(a[i]) - ord("0")
            i -= 1
        if j >= 0:
            total += ord(b[j]) - ord("0")
            j -= 1
        out.append(str(total & 1))
        carry = total >> 1
    return "".join(reversed(out))`,
      },
      {
        language: "typescript",
        label: "Column Addition",
        code: `function addBinary(a: string, b: string): string {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  const out: string[] = [];
  while (i >= 0 || j >= 0 || carry) {
    let total = carry;
    if (i >= 0) total += a.charCodeAt(i--) - 48;
    if (j >= 0) total += b.charCodeAt(j--) - 48;
    out.push(String(total & 1));
    carry = total >> 1;
  }
  return out.reverse().join("");
}`,
      },
    ],
    runner: {
      entry: "addBinary",
      comparison: "deep",
      jsStarter: `function addBinary(a, b) {
  // Return the binary sum of a and b as a string.
  // TODO: implement
}`,
      jsReference: `function addBinary(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  const out = [];
  while (i >= 0 || j >= 0 || carry) {
    let total = carry;
    if (i >= 0) total += a.charCodeAt(i--) - 48;
    if (j >= 0) total += b.charCodeAt(j--) - 48;
    out.push(String(total & 1));
    carry = total >> 1;
  }
  return out.reverse().join("");
}`,
    },
    tests: [
      { name: "carry out", args: ["11", "1"], expected: "100" },
      { name: "equal length", args: ["1010", "1011"], expected: "10101" },
      { name: "zeros", args: ["0", "0"], expected: "0" },
      { name: "different length", args: ["1", "111"], expected: "1000" },
    ],
    relatedIds: [2, 415, 989],
  },
  {
    id: 415,
    slug: "add-strings",
    title: "Add Strings",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Math", "Simulation"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 53,
    leetcodeUrl: "https://leetcode.com/problems/add-strings/",
    description:
      "Given two non-negative integers represented as strings `num1` and `num2`, return their sum as a string without converting the inputs to native big integers.",
    examples: [
      { input: 'num1 = "11", num2 = "123"', output: '"134"' },
      { input: 'num1 = "456", num2 = "77"', output: '"533"' },
    ],
    intuition:
      "Mirror grade-school addition: align both numbers at their least significant digit, add column by column carrying overflow into the next column. Each column outputs `sum % 10` and carries `sum / 10`. After both strings end, flush any leftover carry and reverse the digits.",
    approach: [
      "Place indices at the ends of num1 and num2 and a carry of 0.",
      "Add the available digits and the carry at each column.",
      "Append sum % 10 and set carry = floor(sum / 10).",
      "Loop until both indices are exhausted and carry is 0, then reverse.",
    ],
    complexity: { time: "O(max(n, m))", space: "O(max(n, m))", note: "Single pass over the longer string." },
    solutions: [
      {
        language: "python",
        label: "Column Addition",
        code: `def add_strings(num1: str, num2: str) -> str:
    i, j = len(num1) - 1, len(num2) - 1
    carry = 0
    out: list[str] = []
    while i >= 0 or j >= 0 or carry:
        total = carry
        if i >= 0:
            total += ord(num1[i]) - ord("0")
            i -= 1
        if j >= 0:
            total += ord(num2[j]) - ord("0")
            j -= 1
        out.append(str(total % 10))
        carry = total // 10
    return "".join(reversed(out))`,
      },
      {
        language: "typescript",
        label: "Column Addition",
        code: `function addStrings(num1: string, num2: string): string {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let carry = 0;
  const out: string[] = [];
  while (i >= 0 || j >= 0 || carry) {
    let total = carry;
    if (i >= 0) total += num1.charCodeAt(i--) - 48;
    if (j >= 0) total += num2.charCodeAt(j--) - 48;
    out.push(String(total % 10));
    carry = Math.floor(total / 10);
  }
  return out.reverse().join("");
}`,
      },
    ],
    runner: {
      entry: "addStrings",
      comparison: "deep",
      jsStarter: `function addStrings(num1, num2) {
  // Return the decimal sum of num1 and num2 as a string.
  // TODO: implement
}`,
      jsReference: `function addStrings(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let carry = 0;
  const out = [];
  while (i >= 0 || j >= 0 || carry) {
    let total = carry;
    if (i >= 0) total += num1.charCodeAt(i--) - 48;
    if (j >= 0) total += num2.charCodeAt(j--) - 48;
    out.push(String(total % 10));
    carry = Math.floor(total / 10);
  }
  return out.reverse().join("");
}`,
    },
    tests: [
      { name: "different length", args: ["11", "123"], expected: "134" },
      { name: "carry", args: ["456", "77"], expected: "533" },
      { name: "zeros", args: ["0", "0"], expected: "0" },
      { name: "grows length", args: ["99", "1"], expected: "100" },
    ],
    relatedIds: [2, 67, 989],
  },
  {
    id: 263,
    slug: "ugly-number",
    title: "Ugly Number",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Math", "Factorization"],
    companies: ["amazon", "google"],
    frequency: 44,
    leetcodeUrl: "https://leetcode.com/problems/ugly-number/",
    description:
      "An ugly number is a positive integer whose only prime factors are 2, 3, and 5. Return true if the given integer `n` is ugly, and false otherwise.",
    examples: [
      { input: "n = 6", output: "true", explanation: "6 = 2 × 3, only factors 2 and 3." },
      { input: "n = 14", output: "false", explanation: "14 = 2 × 7 includes the prime 7." },
    ],
    intuition:
      "Strip out every factor of 2, 3, and 5 by repeated division. If what remains is exactly 1, then those were the only prime factors and the number is ugly. Any other leftover (or a non-positive input) means it is not.",
    approach: [
      "Return false immediately if n is not positive.",
      "For each prime in {2, 3, 5}, divide n by that prime while it divides evenly.",
      "After removing all such factors, return whether n equals 1.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "Each division shrinks n by a factor of at least 2." },
    solutions: [
      {
        language: "python",
        label: "Factor Stripping",
        code: `def is_ugly(n: int) -> bool:
    if n <= 0:
        return False
    for p in (2, 3, 5):
        while n % p == 0:
            n //= p
    return n == 1`,
      },
      {
        language: "typescript",
        label: "Factor Stripping",
        code: `function isUgly(n: number): boolean {
  if (n <= 0) return false;
  for (const p of [2, 3, 5]) {
    while (n % p === 0) n = Math.floor(n / p);
  }
  return n === 1;
}`,
      },
    ],
    runner: {
      entry: "isUgly",
      comparison: "deep",
      jsStarter: `function isUgly(n) {
  // Return whether n has only prime factors 2, 3, and 5.
  // TODO: implement
}`,
      jsReference: `function isUgly(n) {
  if (n <= 0) return false;
  for (const p of [2, 3, 5]) {
    while (n % p === 0) n = Math.floor(n / p);
  }
  return n === 1;
}`,
    },
    tests: [
      { name: "product of 2 and 3", args: [6], expected: true },
      { name: "one is ugly", args: [1], expected: true },
      { name: "has seven", args: [14], expected: false },
      { name: "power of two", args: [8], expected: true },
      { name: "zero", args: [0], expected: false },
    ],
    relatedIds: [264, 1201],
  },
  {
    id: 204,
    slug: "count-primes",
    title: "Count Primes",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Sieve of Eratosthenes", "Math"],
    companies: ["amazon", "microsoft", "adobe"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/count-primes/",
    description:
      "Given an integer `n`, return how many prime numbers are strictly less than `n`.",
    examples: [
      { input: "n = 10", output: "4", explanation: "The primes below 10 are 2, 3, 5, and 7." },
      { input: "n = 2", output: "0" },
    ],
    intuition:
      "Use the Sieve of Eratosthenes. Assume every number is prime, then for each prime p starting at 2, cross out all of its multiples. Numbers never crossed out are prime. Counting the survivors below n gives the answer without testing each number individually.",
    approach: [
      "If n is 2 or less, there are no primes below it; return 0.",
      "Create a boolean array of size n marking all numbers prime initially.",
      "For each p from 2 while p*p < n, if p is still prime, mark every multiple from p*p upward as composite.",
      "Count the remaining true entries from index 2 to n-1.",
    ],
    complexity: { time: "O(n log log n)", space: "O(n)", note: "Classic sieve; sieve array dominates space." },
    solutions: [
      {
        language: "python",
        label: "Sieve",
        code: `def count_primes(n: int) -> int:
    if n <= 2:
        return 0
    sieve = [True] * n
    sieve[0] = sieve[1] = False
    p = 2
    while p * p < n:
        if sieve[p]:
            for multiple in range(p * p, n, p):
                sieve[multiple] = False
        p += 1
    return sum(sieve)`,
      },
      {
        language: "typescript",
        label: "Sieve",
        code: `function countPrimes(n: number): number {
  if (n <= 2) return 0;
  const sieve = new Array<boolean>(n).fill(true);
  sieve[0] = false;
  sieve[1] = false;
  for (let p = 2; p * p < n; p++) {
    if (!sieve[p]) continue;
    for (let multiple = p * p; multiple < n; multiple += p) {
      sieve[multiple] = false;
    }
  }
  let count = 0;
  for (let i = 2; i < n; i++) if (sieve[i]) count++;
  return count;
}`,
      },
    ],
    runner: {
      entry: "countPrimes",
      comparison: "deep",
      jsStarter: `function countPrimes(n) {
  // Return the count of primes strictly below n.
  // TODO: implement
}`,
      jsReference: `function countPrimes(n) {
  if (n <= 2) return 0;
  const sieve = new Array(n).fill(true);
  sieve[0] = false;
  sieve[1] = false;
  for (let p = 2; p * p < n; p++) {
    if (!sieve[p]) continue;
    for (let multiple = p * p; multiple < n; multiple += p) {
      sieve[multiple] = false;
    }
  }
  let count = 0;
  for (let i = 2; i < n; i++) if (sieve[i]) count++;
  return count;
}`,
    },
    tests: [
      { name: "below ten", args: [10], expected: 4 },
      { name: "zero", args: [0], expected: 0 },
      { name: "two", args: [2], expected: 0 },
      { name: "three", args: [3], expected: 1 },
      { name: "below twenty", args: [20], expected: 8 },
    ],
    relatedIds: [263],
  },
  {
    id: 326,
    slug: "power-of-three",
    title: "Power of Three",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Math"],
    companies: ["amazon", "google"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/power-of-three/",
    description:
      "Return true if the integer `n` is an exact power of three (that is, n equals 3 raised to some non-negative integer), otherwise false.",
    examples: [
      { input: "n = 27", output: "true", explanation: "27 = 3^3." },
      { input: "n = 45", output: "false", explanation: "45 = 9 × 5 is not a pure power of three." },
    ],
    intuition:
      "Repeatedly divide by 3 while the number stays evenly divisible. A genuine power of three collapses all the way down to 1; if at any point a remainder appears or the value never reaches 1, it is not a power of three. Non-positive inputs are rejected up front.",
    approach: [
      "Return false if n is less than 1.",
      "While n is divisible by 3, divide it by 3.",
      "Return whether the remaining value equals 1.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "Each division reduces n by a factor of 3." },
    solutions: [
      {
        language: "python",
        label: "Repeated Division",
        code: `def is_power_of_three(n: int) -> bool:
    if n < 1:
        return False
    while n % 3 == 0:
        n //= 3
    return n == 1`,
      },
      {
        language: "typescript",
        label: "Repeated Division",
        code: `function isPowerOfThree(n: number): boolean {
  if (n < 1) return false;
  while (n % 3 === 0) n = Math.floor(n / 3);
  return n === 1;
}`,
      },
    ],
    runner: {
      entry: "isPowerOfThree",
      comparison: "deep",
      jsStarter: `function isPowerOfThree(n) {
  // Return whether n is an exact power of three.
  // TODO: implement
}`,
      jsReference: `function isPowerOfThree(n) {
  if (n < 1) return false;
  while (n % 3 === 0) n = Math.floor(n / 3);
  return n === 1;
}`,
    },
    tests: [
      { name: "twenty-seven", args: [27], expected: true },
      { name: "zero", args: [0], expected: false },
      { name: "nine", args: [9], expected: true },
      { name: "forty-five", args: [45], expected: false },
      { name: "one", args: [1], expected: true },
    ],
    relatedIds: [231, 342],
  },
  {
    id: 231,
    slug: "power-of-two",
    title: "Power of Two",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Bit Manipulation", "Math"],
    companies: ["amazon", "google", "apple"],
    frequency: 51,
    leetcodeUrl: "https://leetcode.com/problems/power-of-two/",
    description:
      "Return true if the integer `n` is an exact power of two, otherwise false.",
    examples: [
      { input: "n = 16", output: "true", explanation: "16 = 2^4." },
      { input: "n = 3", output: "false" },
    ],
    intuition:
      "A positive power of two has exactly one set bit in binary, so `n & (n - 1)` clears that single bit and yields 0. Combine this with a positivity check, since the trick must not accept zero or negative numbers.",
    approach: [
      "Return false if n is not positive.",
      "Compute n & (n - 1); a power of two makes this 0.",
      "Return whether that result is 0.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "A single bitwise operation." },
    solutions: [
      {
        language: "python",
        label: "Bit Trick",
        code: `def is_power_of_two(n: int) -> bool:
    return n > 0 and (n & (n - 1)) == 0`,
      },
      {
        language: "typescript",
        label: "Bit Trick",
        code: `function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}`,
      },
    ],
    runner: {
      entry: "isPowerOfTwo",
      comparison: "deep",
      jsStarter: `function isPowerOfTwo(n) {
  // Return whether n is an exact power of two.
  // TODO: implement
}`,
      jsReference: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,
    },
    tests: [
      { name: "one", args: [1], expected: true },
      { name: "sixteen", args: [16], expected: true },
      { name: "three", args: [3], expected: false },
      { name: "zero", args: [0], expected: false },
      { name: "six", args: [6], expected: false },
    ],
    relatedIds: [191, 326, 342],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Binary Search
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1539,
    slug: "kth-missing-positive-number",
    title: "Kth Missing Positive Number",
    difficulty: "Easy",
    category: "binary-search",
    patterns: ["Binary Search", "Counting"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/kth-missing-positive-number/",
    description:
      "Given a strictly increasing array `arr` of positive integers and an integer `k`, return the k-th positive integer that is missing from the array.",
    examples: [
      { input: "arr = [2,3,4,7,11], k = 5", output: "9", explanation: "Missing positives are 1, 5, 6, 8, 9, …; the 5th is 9." },
      { input: "arr = [1,2,3,4], k = 2", output: "6" },
    ],
    intuition:
      "At index i, the count of missing positives before arr[i] is `arr[i] - (i + 1)`. This count is monotonic, so binary search for the first index where it reaches k. The answer lies just past that boundary: `k + low`, accounting for the elements that are present before it.",
    approach: [
      "Binary search over indices with lo = 0 and hi = arr.length.",
      "For mid, compute missing = arr[mid] - (mid + 1).",
      "If missing < k, move lo to mid + 1; otherwise move hi to mid.",
      "Return lo + k, which skips the present elements up to the boundary.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "Binary search over the array length." },
    solutions: [
      {
        language: "python",
        label: "Binary Search",
        code: `def find_kth_positive(arr: list[int], k: int) -> int:
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] - (mid + 1) < k:
            lo = mid + 1
        else:
            hi = mid
    return lo + k`,
      },
      {
        language: "typescript",
        label: "Binary Search",
        code: `function findKthPositive(arr: number[], k: number): number {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] - (mid + 1) < k) lo = mid + 1;
    else hi = mid;
  }
  return lo + k;
}`,
      },
    ],
    runner: {
      entry: "findKthPositive",
      comparison: "deep",
      jsStarter: `function findKthPositive(arr, k) {
  // Return the k-th missing positive integer.
  // TODO: implement
}`,
      jsReference: `function findKthPositive(arr, k) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] - (mid + 1) < k) lo = mid + 1;
    else hi = mid;
  }
  return lo + k;
}`,
    },
    tests: [
      { name: "fifth missing", args: [[2, 3, 4, 7, 11], 5], expected: 9 },
      { name: "after array", args: [[1, 2, 3, 4], 2], expected: 6 },
      { name: "first missing", args: [[5, 6, 7], 1], expected: 1 },
      { name: "single element", args: [[2], 1], expected: 1 },
    ],
    relatedIds: [41],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Bit Manipulation
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 201,
    slug: "bitwise-and-of-numbers-range",
    title: "Bitwise AND of Numbers Range",
    difficulty: "Medium",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation", "Common Prefix"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 47,
    leetcodeUrl: "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
    description:
      "Given two integers `left` and `right`, return the bitwise AND of every integer in the inclusive range from `left` to `right`.",
    examples: [
      { input: "left = 5, right = 7", output: "4", explanation: "5 & 6 & 7 = 4." },
      { input: "left = 12, right = 15", output: "12" },
    ],
    intuition:
      "Any bit position that flips somewhere inside the range becomes 0 in the AND, so only the common high-order prefix of `left` and `right` survives. Shift both numbers right until they are equal — that equal value is the shared prefix — then shift it back left by the number of shifts performed.",
    approach: [
      "Initialise a shift counter to 0.",
      "While left is less than right, right-shift both by one and increment the counter.",
      "Once they match, left holds the common prefix.",
      "Shift left back by the counter to restore the trailing zeros and return it.",
    ],
    complexity: { time: "O(log right)", space: "O(1)", note: "At most 32 shifts for 32-bit integers." },
    solutions: [
      {
        language: "python",
        label: "Common Prefix",
        code: `def range_bitwise_and(left: int, right: int) -> int:
    shift = 0
    while left < right:
        left >>= 1
        right >>= 1
        shift += 1
    return left << shift`,
      },
      {
        language: "typescript",
        label: "Common Prefix",
        code: `function rangeBitwiseAnd(left: number, right: number): number {
  let shift = 0;
  while (left < right) {
    left >>= 1;
    right >>= 1;
    shift++;
  }
  return left << shift;
}`,
      },
    ],
    runner: {
      entry: "rangeBitwiseAnd",
      comparison: "deep",
      jsStarter: `function rangeBitwiseAnd(left, right) {
  // Return the AND of all integers in [left, right].
  // TODO: implement
}`,
      jsReference: `function rangeBitwiseAnd(left, right) {
  let shift = 0;
  while (left < right) {
    left >>= 1;
    right >>= 1;
    shift++;
  }
  return left << shift;
}`,
    },
    tests: [
      { name: "five to seven", args: [5, 7], expected: 4 },
      { name: "single number", args: [0, 0], expected: 0 },
      { name: "wide range", args: [1, 2147483647], expected: 0 },
      { name: "twelve to fifteen", args: [12, 15], expected: 12 },
    ],
    relatedIds: [191],
  },
  {
    id: 89,
    slug: "gray-code",
    title: "Gray Code",
    difficulty: "Medium",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation", "Construction"],
    companies: ["amazon", "google"],
    frequency: 41,
    leetcodeUrl: "https://leetcode.com/problems/gray-code/",
    description:
      "Given an integer `n`, return any n-bit Gray code sequence: a permutation of 0 to 2^n − 1 where successive values (including the wrap from last back to first) differ in exactly one bit.",
    examples: [
      { input: "n = 2", output: "[0,1,3,2]", explanation: "Consecutive values differ in a single bit and the set covers 0..3." },
      { input: "n = 1", output: "[0,1]" },
    ],
    intuition:
      "The reflected binary Gray code has a closed form: the i-th value is `i XOR (i >> 1)`. As i counts up, exactly one bit changes between consecutive results, automatically producing a valid sequence that covers every value from 0 to 2^n − 1.",
    approach: [
      "Compute the total count 2^n.",
      "For each i from 0 to 2^n − 1, output i XOR (i >> 1).",
      "Collect the results in order; the sequence is a valid Gray code.",
    ],
    complexity: { time: "O(2^n)", space: "O(2^n)", note: "Output has 2^n entries; each computed in O(1)." },
    solutions: [
      {
        language: "python",
        label: "Reflected Formula",
        code: `def gray_code(n: int) -> list[int]:
    return [i ^ (i >> 1) for i in range(1 << n)]`,
      },
      {
        language: "typescript",
        label: "Reflected Formula",
        code: `function grayCode(n: number): number[] {
  const total = 1 << n;
  const res: number[] = [];
  for (let i = 0; i < total; i++) res.push(i ^ (i >> 1));
  return res;
}`,
      },
    ],
    runner: {
      entry: "grayCode",
      comparison: "canonical",
      jsStarter: `function grayCode(n) {
  // Return an n-bit Gray code sequence.
  // TODO: implement
}`,
      jsReference: `function grayCode(n) {
  const total = 1 << n;
  const res = [];
  for (let i = 0; i < total; i++) res.push(i ^ (i >> 1));
  return res;
}`,
    },
    tests: [
      { name: "one bit", args: [1], expected: [0, 1], comparison: "canonical" },
      { name: "two bits", args: [2], expected: [0, 1, 2, 3], comparison: "canonical" },
      { name: "three bits", args: [3], expected: [0, 1, 2, 3, 4, 5, 6, 7], comparison: "canonical" },
      { name: "four bits", args: [4], expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], comparison: "canonical" },
    ],
    relatedIds: [1238],
  },
  {
    id: 260,
    slug: "single-number-iii",
    title: "Single Number III",
    difficulty: "Medium",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation", "XOR"],
    companies: ["amazon", "google", "meta"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/single-number-iii/",
    description:
      "In an array where exactly two elements appear once and every other element appears twice, find and return the two unique elements in any order.",
    examples: [
      { input: "nums = [1,2,1,3,2,5]", output: "[3,5]", explanation: "3 and 5 are the only values that appear once." },
      { input: "nums = [-1,0]", output: "[-1,0]" },
    ],
    intuition:
      "XOR everything to get `a ^ b`, where a and b are the two singles (paired values cancel). Pick any set bit of that XOR — it distinguishes a from b. Partition the array by that bit and XOR each group independently; each group cancels its pairs and isolates one unique number.",
    approach: [
      "XOR all elements to obtain xorAll = a ^ b.",
      "Isolate the lowest set bit: diff = xorAll & (-xorAll).",
      "XOR only the elements whose diff bit is set to recover one single, a.",
      "The other single is xorAll ^ a; return both.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Two linear passes with constant extra space." },
    solutions: [
      {
        language: "python",
        label: "XOR Partition",
        code: `def single_number(nums: list[int]) -> list[int]:
    xor_all = 0
    for x in nums:
        xor_all ^= x
    diff = xor_all & (-xor_all)
    a = 0
    for x in nums:
        if x & diff:
            a ^= x
    return [a, xor_all ^ a]`,
      },
      {
        language: "typescript",
        label: "XOR Partition",
        code: `function singleNumber(nums: number[]): number[] {
  let xorAll = 0;
  for (const x of nums) xorAll ^= x;
  const diff = xorAll & -xorAll;
  let a = 0;
  for (const x of nums) {
    if (x & diff) a ^= x;
  }
  return [a, xorAll ^ a];
}`,
      },
    ],
    runner: {
      entry: "singleNumber",
      comparison: "canonical",
      jsStarter: `function singleNumber(nums) {
  // Return the two values that appear exactly once.
  // TODO: implement
}`,
      jsReference: `function singleNumber(nums) {
  let xorAll = 0;
  for (const x of nums) xorAll ^= x;
  const diff = xorAll & -xorAll;
  let a = 0;
  for (const x of nums) {
    if (x & diff) a ^= x;
  }
  return [a, xorAll ^ a];
}`,
    },
    tests: [
      { name: "basic", args: [[1, 2, 1, 3, 2, 5]], expected: [3, 5], comparison: "canonical" },
      { name: "two singles only", args: [[-1, 0]], expected: [-1, 0], comparison: "canonical" },
      { name: "zero present", args: [[0, 1, 0, 2]], expected: [1, 2], comparison: "canonical" },
      { name: "pair plus two", args: [[5, 5, 7, 9]], expected: [7, 9], comparison: "canonical" },
    ],
    relatedIds: [136, 137],
  },
  {
    id: 461,
    slug: "hamming-distance",
    title: "Hamming Distance",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation", "XOR"],
    companies: ["amazon", "meta", "nvidia"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/hamming-distance/",
    description:
      "The Hamming distance between two integers is the number of bit positions at which their binary representations differ. Return that distance for the integers `x` and `y`.",
    examples: [
      { input: "x = 1, y = 4", output: "2", explanation: "0001 vs 0100 differ in two positions." },
      { input: "x = 3, y = 1", output: "1" },
    ],
    intuition:
      "XOR the two numbers: a bit is 1 exactly where they differ. The Hamming distance is therefore the population count (number of set bits) of `x ^ y`. Repeatedly clear the lowest set bit and count how many clears occur.",
    approach: [
      "Compute z = x XOR y so set bits mark differing positions.",
      "Count set bits in z, e.g. by repeatedly applying z &= z - 1.",
      "Return the count.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "At most 32 iterations for 32-bit integers." },
    solutions: [
      {
        language: "python",
        label: "XOR + Popcount",
        code: `def hamming_distance(x: int, y: int) -> int:
    z = x ^ y
    count = 0
    while z:
        z &= z - 1
        count += 1
    return count`,
      },
      {
        language: "typescript",
        label: "XOR + Popcount",
        code: `function hammingDistance(x: number, y: number): number {
  let z = x ^ y;
  let count = 0;
  while (z !== 0) {
    z &= z - 1;
    count++;
  }
  return count;
}`,
      },
    ],
    runner: {
      entry: "hammingDistance",
      comparison: "deep",
      jsStarter: `function hammingDistance(x, y) {
  // Return the number of differing bit positions.
  // TODO: implement
}`,
      jsReference: `function hammingDistance(x, y) {
  let z = x ^ y;
  let count = 0;
  while (z !== 0) {
    z &= z - 1;
    count++;
  }
  return count;
}`,
    },
    tests: [
      { name: "two bits", args: [1, 4], expected: 2 },
      { name: "one bit", args: [3, 1], expected: 1 },
      { name: "identical", args: [0, 0], expected: 0 },
      { name: "three bits", args: [7, 0], expected: 3 },
    ],
    relatedIds: [191, 477],
  },
];

export default batchM;
