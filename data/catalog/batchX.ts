import type { Problem } from "../types.ts";

/**
 * Batch X — eighteen arrays/strings/two-pointers/sliding-window/stack problems.
 * Every record carries a hand-verified playground runner whose `jsReference`
 * passes all listed tests.
 */
export const batchX: Problem[] = [
  {
    id: 179,
    slug: "largest-number",
    title: "Largest Number",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Custom Sort", "Greedy"],
    companies: ["amazon", "microsoft", "apple", "bloomberg"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/largest-number/",
    description:
      "Given a list of non-negative integers, arrange them so their concatenation forms the largest possible number, and return that number as a string.",
    examples: [
      { input: "nums = [10,2]", output: '"210"', explanation: "\"210\" beats \"102\"." },
      { input: "nums = [3,30,34,5,9]", output: '"9534330"' },
    ],
    intuition:
      "Sorting by raw numeric value fails: 3 should come before 30 because '330' > '303'. The right rule compares two candidates a and b by which concatenation order produces the bigger string — put a first when a+b > b+a. One guard handles the all-zeros case so the answer is '0' rather than '000'.",
    approach: [
      "Convert every number to its string form.",
      "Sort the strings with a comparator that places a before b when a+b > b+a.",
      "If the largest string is '0', every number is zero, so return '0'.",
      "Otherwise join the sorted strings and return them.",
    ],
    complexity: { time: "O(n log n · k)", space: "O(n)", note: "k is the average digit length compared per swap." },
    solutions: [
      {
        language: "python",
        label: "Custom Sort",
        code: `from functools import cmp_to_key


def largest_number(nums: list[int]) -> str:
    strs = [str(x) for x in nums]

    def cmp(a: str, b: str) -> int:
        if a + b > b + a:
            return -1
        if a + b < b + a:
            return 1
        return 0

    strs.sort(key=cmp_to_key(cmp))
    if strs[0] == "0":
        return "0"
    return "".join(strs)`,
      },
      {
        language: "typescript",
        label: "Custom Sort",
        code: `function largestNumber(nums: number[]): string {
  const arr = nums.map(String);
  arr.sort((a, b) => {
    const ab = a + b, ba = b + a;
    if (ab === ba) return 0;
    return ab > ba ? -1 : 1;
  });
  if (arr[0] === "0") return "0";
  return arr.join("");
}`,
      },
    ],
    runner: {
      entry: "largestNumber",
      comparison: "deep",
      jsStarter: `function largestNumber(nums) {
  // Concatenate the numbers into the largest possible value (as a string).
  // TODO: implement
}`,
      jsReference: `function largestNumber(nums) {
  const arr = nums.map(String);
  arr.sort((a, b) => {
    const ab = a + b, ba = b + a;
    if (ab === ba) return 0;
    return ab > ba ? -1 : 1;
  });
  if (arr[0] === "0") return "0";
  return arr.join("");
}`,
    },
    tests: [
      { name: "two values", args: [[10, 2]], expected: "210" },
      { name: "classic", args: [[3, 30, 34, 5, 9]], expected: "9534330" },
      { name: "all zeros", args: [[0, 0]], expected: "0" },
      { name: "single", args: [[1]], expected: "1" },
    ],
    relatedIds: [49],
  },
  {
    id: 228,
    slug: "summary-ranges",
    title: "Summary Ranges",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Two Pointers", "Scan"],
    companies: ["google", "amazon", "microsoft"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/summary-ranges/",
    description:
      "Given a sorted array of distinct integers, collapse every maximal run of consecutive values into a compact range string and return the list of ranges in order.",
    examples: [
      { input: "nums = [0,1,2,4,5,7]", output: '["0->2","4->5","7"]' },
      { input: "nums = [0,2,3,4,6,8,9]", output: '["0","2->4","6","8->9"]' },
    ],
    intuition:
      "Because the array is sorted with no duplicates, a run of consecutive numbers is simply a stretch where each value is one more than the last. Anchor the start of a run, extend while the next value continues the sequence, then emit either a single number or a 'start->end' string.",
    approach: [
      "Walk the array with an index i.",
      "Let j scan forward while nums[j+1] equals nums[j] + 1.",
      "If i equals j the run is one element, otherwise format 'nums[i]->nums[j]'.",
      "Jump i to j + 1 and repeat until the array is consumed.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Output array aside, only a couple of indices are tracked." },
    solutions: [
      {
        language: "python",
        label: "Linear Scan",
        code: `def summary_ranges(nums: list[int]) -> list[str]:
    res: list[str] = []
    i, n = 0, len(nums)
    while i < n:
        j = i
        while j + 1 < n and nums[j + 1] == nums[j] + 1:
            j += 1
        if i == j:
            res.append(str(nums[i]))
        else:
            res.append(f"{nums[i]}->{nums[j]}")
        i = j + 1
    return res`,
      },
      {
        language: "typescript",
        label: "Linear Scan",
        code: `function summaryRanges(nums: number[]): string[] {
  const res: string[] = [];
  let i = 0;
  const n = nums.length;
  while (i < n) {
    let j = i;
    while (j + 1 < n && nums[j + 1] === nums[j] + 1) j++;
    res.push(i === j ? String(nums[i]) : nums[i] + "->" + nums[j]);
    i = j + 1;
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "summaryRanges",
      comparison: "deep",
      jsStarter: `function summaryRanges(nums) {
  // Return the list of consecutive ranges as strings.
  // TODO: implement
}`,
      jsReference: `function summaryRanges(nums) {
  const res = [];
  let i = 0;
  const n = nums.length;
  while (i < n) {
    let j = i;
    while (j + 1 < n && nums[j + 1] === nums[j] + 1) j++;
    res.push(i === j ? String(nums[i]) : nums[i] + "->" + nums[j]);
    i = j + 1;
  }
  return res;
}`,
    },
    tests: [
      { name: "mixed runs", args: [[0, 1, 2, 4, 5, 7]], expected: ["0->2", "4->5", "7"] },
      { name: "leading single", args: [[0, 2, 3, 4, 6, 8, 9]], expected: ["0", "2->4", "6", "8->9"] },
      { name: "empty", args: [[]], expected: [] },
      { name: "negative single", args: [[-1]], expected: ["-1"] },
    ],
    relatedIds: [56],
  },
  {
    id: 229,
    slug: "majority-element-ii",
    title: "Majority Element II",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Boyer-Moore Voting"],
    companies: ["amazon", "google", "meta", "microsoft"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/majority-element-ii/",
    description:
      "Find every value in an integer array that appears strictly more than ⌊n/3⌋ times. At most two such values can exist; return them in any order.",
    examples: [
      { input: "nums = [3,2,3]", output: "[3]" },
      { input: "nums = [1,2]", output: "[1,2]" },
    ],
    intuition:
      "There can be at most two numbers exceeding n/3, so a generalized Boyer-Moore vote tracks two candidates and two counters. Elements not matching either candidate cancel one vote from each. A final verification pass confirms whether each surviving candidate truly clears the n/3 bar.",
    approach: [
      "Maintain two candidates and two counts.",
      "For each value: match a candidate to bump its count, seed an empty candidate, or decrement both counts.",
      "After the vote, recount the two finalists in the array.",
      "Keep only those appearing more than floor(n/3) times.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Two candidates and counters, plus a verification pass." },
    solutions: [
      {
        language: "python",
        label: "Boyer-Moore",
        code: `def majority_element(nums: list[int]) -> list[int]:
    c1 = c2 = None
    n1 = n2 = 0
    for x in nums:
        if c1 == x:
            n1 += 1
        elif c2 == x:
            n2 += 1
        elif n1 == 0:
            c1, n1 = x, 1
        elif n2 == 0:
            c2, n2 = x, 1
        else:
            n1 -= 1
            n2 -= 1
    res: list[int] = []
    for c in (c1, c2):
        if c is not None and nums.count(c) > len(nums) // 3:
            res.append(c)
    return res`,
      },
      {
        language: "typescript",
        label: "Boyer-Moore",
        code: `function majorityElement(nums: number[]): number[] {
  let c1: number | null = null, c2: number | null = null;
  let n1 = 0, n2 = 0;
  for (const x of nums) {
    if (c1 === x) n1++;
    else if (c2 === x) n2++;
    else if (n1 === 0) { c1 = x; n1 = 1; }
    else if (n2 === 0) { c2 = x; n2 = 1; }
    else { n1--; n2--; }
  }
  const res: number[] = [];
  for (const c of [c1, c2]) {
    if (c === null) continue;
    let cnt = 0;
    for (const x of nums) if (x === c) cnt++;
    if (cnt > Math.floor(nums.length / 3)) res.push(c);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "majorityElement",
      comparison: "canonical",
      jsStarter: `function majorityElement(nums) {
  // Return all values appearing more than n/3 times.
  // TODO: implement
}`,
      jsReference: `function majorityElement(nums) {
  let c1 = null, c2 = null, n1 = 0, n2 = 0;
  for (const x of nums) {
    if (c1 === x) n1++;
    else if (c2 === x) n2++;
    else if (n1 === 0) { c1 = x; n1 = 1; }
    else if (n2 === 0) { c2 = x; n2 = 1; }
    else { n1--; n2--; }
  }
  const res = [];
  for (const c of [c1, c2]) {
    if (c === null) continue;
    let cnt = 0;
    for (const x of nums) if (x === c) cnt++;
    if (cnt > Math.floor(nums.length / 3)) res.push(c);
  }
  return res;
}`,
    },
    tests: [
      { name: "single majority", args: [[3, 2, 3]], expected: [3] },
      { name: "tiny both", args: [[1, 2]], expected: [1, 2] },
      { name: "lonely", args: [[1]], expected: [1] },
      { name: "one survivor", args: [[2, 2, 1, 3]], expected: [2] },
    ],
    relatedIds: [169],
  },
  {
    id: 349,
    slug: "intersection-of-two-arrays",
    title: "Intersection of Two Arrays",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Set"],
    companies: ["amazon", "google", "apple", "oracle"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/intersection-of-two-arrays/",
    description:
      "Return the unique values that appear in both input arrays. Each value in the result must be distinct, and the order is unimportant.",
    examples: [
      { input: "nums1 = [1,2,2,1], nums2 = [2,2]", output: "[2]" },
      { input: "nums1 = [4,9,5], nums2 = [9,4,9,8,4]", output: "[9,4]" },
    ],
    intuition:
      "Membership testing is the whole problem. Drop the first array into a hash set for O(1) lookups, then scan the second array and collect any value that the set contains, using a second set to keep the answer free of duplicates.",
    approach: [
      "Build a set from the first array.",
      "Create an empty result set.",
      "For each value in the second array, add it to the result set when the first set contains it.",
      "Return the result set as an array.",
    ],
    complexity: { time: "O(n + m)", space: "O(n)", note: "n and m are the two array lengths." },
    solutions: [
      {
        language: "python",
        label: "Hash Set",
        code: `def intersection(nums1: list[int], nums2: list[int]) -> list[int]:
    seen = set(nums1)
    res = set()
    for x in nums2:
        if x in seen:
            res.add(x)
    return list(res)`,
      },
      {
        language: "typescript",
        label: "Hash Set",
        code: `function intersection(nums1: number[], nums2: number[]): number[] {
  const seen = new Set(nums1);
  const res = new Set<number>();
  for (const x of nums2) if (seen.has(x)) res.add(x);
  return [...res];
}`,
      },
    ],
    runner: {
      entry: "intersection",
      comparison: "canonical",
      jsStarter: `function intersection(nums1, nums2) {
  // Return the unique values present in both arrays.
  // TODO: implement
}`,
      jsReference: `function intersection(nums1, nums2) {
  const seen = new Set(nums1);
  const res = new Set();
  for (const x of nums2) if (seen.has(x)) res.add(x);
  return [...res];
}`,
    },
    tests: [
      { name: "dedup", args: [[1, 2, 2, 1], [2, 2]], expected: [2] },
      { name: "two shared", args: [[4, 9, 5], [9, 4, 9, 8, 4]], expected: [9, 4] },
      { name: "disjoint", args: [[1, 2, 3], [4, 5, 6]], expected: [] },
      { name: "single", args: [[1], [1]], expected: [1] },
    ],
    relatedIds: [350],
  },
  {
    id: 389,
    slug: "find-the-difference",
    title: "Find the Difference",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Counting", "Bit Manipulation"],
    companies: ["google", "amazon", "microsoft"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/find-the-difference/",
    description:
      "String t is built by shuffling string s and inserting exactly one extra letter. Identify and return that added letter.",
    examples: [
      { input: 's = "abcd", t = "abcde"', output: '"e"' },
      { input: 's = "", t = "y"', output: '"y"' },
    ],
    intuition:
      "Every letter of s appears in t, plus one more. Summing the character codes of t and subtracting the codes of s cancels all the shared letters, leaving exactly the code of the inserted character.",
    approach: [
      "Initialize an accumulator to zero.",
      "Add the char code of every character in t.",
      "Subtract the char code of every character in s.",
      "Convert the remaining code back to a character.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "A single integer accumulator." },
    solutions: [
      {
        language: "python",
        label: "Code Sum",
        code: `def find_the_difference(s: str, t: str) -> str:
    code = 0
    for ch in t:
        code += ord(ch)
    for ch in s:
        code -= ord(ch)
    return chr(code)`,
      },
      {
        language: "typescript",
        label: "Code Sum",
        code: `function findTheDifference(s: string, t: string): string {
  let code = 0;
  for (const ch of t) code += ch.charCodeAt(0);
  for (const ch of s) code -= ch.charCodeAt(0);
  return String.fromCharCode(code);
}`,
      },
    ],
    runner: {
      entry: "findTheDifference",
      comparison: "deep",
      jsStarter: `function findTheDifference(s, t) {
  // Return the extra character added to t.
  // TODO: implement
}`,
      jsReference: `function findTheDifference(s, t) {
  let code = 0;
  for (const ch of t) code += ch.charCodeAt(0);
  for (const ch of s) code -= ch.charCodeAt(0);
  return String.fromCharCode(code);
}`,
    },
    tests: [
      { name: "append", args: ["abcd", "abcde"], expected: "e" },
      { name: "empty source", args: ["", "y"], expected: "y" },
      { name: "duplicate letter", args: ["a", "aa"], expected: "a" },
      { name: "shuffled", args: ["ae", "aea"], expected: "a" },
    ],
    relatedIds: [136],
  },
  {
    id: 409,
    slug: "longest-palindrome",
    title: "Longest Palindrome",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Counting", "Greedy"],
    companies: ["amazon", "google", "adobe"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/longest-palindrome/",
    description:
      "Using the letters of a string (case-sensitive), determine the length of the longest palindrome you could assemble from them.",
    examples: [
      { input: 's = "abccccdd"', output: "7", explanation: "One option is \"dccaccd\"." },
      { input: 's = "a"', output: "1" },
    ],
    intuition:
      "A palindrome pairs letters symmetrically around its center, so every letter contributes its largest even count. At most one leftover letter with an odd count can sit alone in the very middle, adding one more to the total.",
    approach: [
      "Count how many times each character occurs.",
      "For each count add the largest even number not exceeding it.",
      "Track whether any count was odd.",
      "If at least one odd count existed, add one for a center character.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Bounded alphabet keeps the count map small." },
    solutions: [
      {
        language: "python",
        label: "Counting",
        code: `from collections import Counter


def longest_palindrome(s: str) -> int:
    counts = Counter(s)
    length = 0
    has_odd = False
    for c in counts.values():
        length += (c // 2) * 2
        if c % 2 == 1:
            has_odd = True
    return length + (1 if has_odd else 0)`,
      },
      {
        language: "typescript",
        label: "Counting",
        code: `function longestPalindrome(s: string): number {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  let length = 0;
  let hasOdd = false;
  for (const c of counts.values()) {
    length += Math.floor(c / 2) * 2;
    if (c % 2 === 1) hasOdd = true;
  }
  return length + (hasOdd ? 1 : 0);
}`,
      },
    ],
    runner: {
      entry: "longestPalindrome",
      comparison: "deep",
      jsStarter: `function longestPalindrome(s) {
  // Return the length of the longest palindrome buildable from s.
  // TODO: implement
}`,
      jsReference: `function longestPalindrome(s) {
  const counts = new Map();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  let length = 0;
  let hasOdd = false;
  for (const c of counts.values()) {
    length += Math.floor(c / 2) * 2;
    if (c % 2 === 1) hasOdd = true;
  }
  return length + (hasOdd ? 1 : 0);
}`,
    },
    tests: [
      { name: "mixed", args: ["abccccdd"], expected: 7 },
      { name: "single", args: ["a"], expected: 1 },
      { name: "pair", args: ["bb"], expected: 2 },
      { name: "triple", args: ["ccc"], expected: 3 },
    ],
    relatedIds: [125],
  },
  {
    id: 594,
    slug: "longest-harmonious-subsequence",
    title: "Longest Harmonious Subsequence",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Counting", "Hash Map"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 44,
    leetcodeUrl: "https://leetcode.com/problems/longest-harmonious-subsequence/",
    description:
      "A harmonious sequence is one where the gap between its largest and smallest value is exactly one. Return the length of the longest harmonious subsequence inside the array.",
    examples: [
      { input: "nums = [1,3,2,2,5,2,3,7]", output: "5", explanation: "The values [3,2,2,2,3] span exactly 1." },
      { input: "nums = [1,1,1,1]", output: "0" },
    ],
    intuition:
      "Order does not matter for a subsequence, only how many of each value you have. For every value v, the best harmonious group pairs all v's with all (v+1)'s, so tally the counts and check adjacent keys.",
    approach: [
      "Count occurrences of each distinct value.",
      "For every key k present, check whether k + 1 also exists.",
      "When it does, the candidate length is count[k] + count[k + 1].",
      "Return the maximum candidate, or 0 if none exists.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "One pass to count, one over distinct keys." },
    solutions: [
      {
        language: "python",
        label: "Counting",
        code: `from collections import Counter


def find_lhs(nums: list[int]) -> int:
    counts = Counter(nums)
    best = 0
    for k, c in counts.items():
        if k + 1 in counts:
            best = max(best, c + counts[k + 1])
    return best`,
      },
      {
        language: "typescript",
        label: "Counting",
        code: `function findLHS(nums: number[]): number {
  const counts = new Map<number, number>();
  for (const x of nums) counts.set(x, (counts.get(x) ?? 0) + 1);
  let best = 0;
  for (const [k, c] of counts) {
    const next = counts.get(k + 1);
    if (next !== undefined) best = Math.max(best, c + next);
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "findLHS",
      comparison: "deep",
      jsStarter: `function findLHS(nums) {
  // Return the length of the longest harmonious subsequence.
  // TODO: implement
}`,
      jsReference: `function findLHS(nums) {
  const counts = new Map();
  for (const x of nums) counts.set(x, (counts.get(x) ?? 0) + 1);
  let best = 0;
  for (const [k, c] of counts) {
    const next = counts.get(k + 1);
    if (next !== undefined) best = Math.max(best, c + next);
  }
  return best;
}`,
    },
    tests: [
      { name: "classic", args: [[1, 3, 2, 2, 5, 2, 3, 7]], expected: 5 },
      { name: "spread", args: [[1, 2, 3, 4]], expected: 2 },
      { name: "all same", args: [[1, 1, 1, 1]], expected: 0 },
      { name: "two pairs", args: [[1, 2, 2, 1]], expected: 4 },
    ],
    relatedIds: [697],
  },
  {
    id: 80,
    slug: "remove-duplicates-from-sorted-array-ii",
    title: "Remove Duplicates from Sorted Array II",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Two Pointers", "In-Place"],
    companies: ["amazon", "microsoft", "apple", "bloomberg"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/",
    description:
      "Trim a sorted array in place so that no value appears more than twice, then return the new logical length k of the kept prefix.",
    examples: [
      { input: "nums = [1,1,1,2,2,3]", output: "5", explanation: "Front becomes 1,1,2,2,3." },
      { input: "nums = [0,0,1,1,1,1,2,3,3]", output: "7" },
    ],
    intuition:
      "A write pointer marks where the next kept element belongs. An element is safe to keep whenever fewer than two have been written or it differs from the value two slots back, which guarantees at most two copies of anything survive.",
    approach: [
      "Start a write index k at 0.",
      "Iterate over every value x in the array.",
      "Keep x when k < 2 or nums[k-2] differs from x, writing it at position k and advancing k.",
      "Return k as the trimmed length.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Single pass with in-place writes." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def remove_duplicates(nums: list[int]) -> int:
    k = 0
    for x in nums:
        if k < 2 or nums[k - 2] != x:
            nums[k] = x
            k += 1
    return k`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function removeDuplicates(nums: number[]): number {
  let k = 0;
  for (const x of nums) {
    if (k < 2 || nums[k - 2] !== x) {
      nums[k] = x;
      k++;
    }
  }
  return k;
}`,
      },
    ],
    runner: {
      entry: "removeDuplicates",
      comparison: "deep",
      jsStarter: `function removeDuplicates(nums) {
  // Keep each value at most twice in place; return the new length.
  // TODO: implement
}`,
      jsReference: `function removeDuplicates(nums) {
  let k = 0;
  for (const x of nums) {
    if (k < 2 || nums[k - 2] !== x) {
      nums[k] = x;
      k++;
    }
  }
  return k;
}`,
    },
    tests: [
      { name: "triple to double", args: [[1, 1, 1, 2, 2, 3]], expected: 5 },
      { name: "long run", args: [[0, 0, 1, 1, 1, 1, 2, 3, 3]], expected: 7 },
      { name: "already fine", args: [[1, 1]], expected: 2 },
      { name: "all distinct", args: [[1, 2, 3]], expected: 3 },
    ],
    relatedIds: [26],
  },
  {
    id: 443,
    slug: "string-compression",
    title: "String Compression",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Two Pointers", "In-Place"],
    companies: ["amazon", "microsoft", "google", "bloomberg"],
    frequency: 53,
    leetcodeUrl: "https://leetcode.com/problems/string-compression/",
    description:
      "Compress an array of characters in place: write each group's character, then its count only when the group is longer than one. Return the length of the compressed prefix.",
    examples: [
      { input: 'chars = ["a","a","b","b","c","c","c"]', output: "6", explanation: "Becomes a2b2c3." },
      { input: 'chars = ["a"]', output: "1" },
    ],
    intuition:
      "Separate reading from writing. A read pointer measures the length of each consecutive run, while a write pointer lays down the character and—if the run has more than one element—the digits of its count, all within the same array.",
    approach: [
      "Use a read pointer to count each consecutive run of equal characters.",
      "Write the run's character at the write pointer.",
      "If the run length exceeds one, write each digit of the count.",
      "Return the final write pointer position.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Counts are written as digits within the same array." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def compress(chars: list[str]) -> int:
    write = 0
    read = 0
    n = len(chars)
    while read < n:
        ch = chars[read]
        count = 0
        while read < n and chars[read] == ch:
            read += 1
            count += 1
        chars[write] = ch
        write += 1
        if count > 1:
            for d in str(count):
                chars[write] = d
                write += 1
    return write`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function compress(chars: string[]): number {
  let write = 0;
  let read = 0;
  const n = chars.length;
  while (read < n) {
    const ch = chars[read];
    let count = 0;
    while (read < n && chars[read] === ch) { read++; count++; }
    chars[write++] = ch;
    if (count > 1) {
      for (const d of String(count)) chars[write++] = d;
    }
  }
  return write;
}`,
      },
    ],
    runner: {
      entry: "compress",
      comparison: "deep",
      jsStarter: `function compress(chars) {
  // Compress runs in place and return the compressed length.
  // TODO: implement
}`,
      jsReference: `function compress(chars) {
  let write = 0;
  let read = 0;
  const n = chars.length;
  while (read < n) {
    const ch = chars[read];
    let count = 0;
    while (read < n && chars[read] === ch) { read++; count++; }
    chars[write++] = ch;
    if (count > 1) {
      for (const d of String(count)) chars[write++] = d;
    }
  }
  return write;
}`,
    },
    tests: [
      { name: "basic", args: [["a", "a", "b", "b", "c", "c", "c"]], expected: 6 },
      { name: "single", args: [["a"]], expected: 1 },
      { name: "two-digit count", args: [["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]], expected: 4 },
      { name: "repeated char", args: [["a", "a", "a", "b", "b", "a", "a"]], expected: 6 },
    ],
    relatedIds: [38],
  },
  {
    id: 524,
    slug: "longest-word-in-dictionary-through-deleting",
    title: "Longest Word in Dictionary through Deleting",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Two Pointers", "Subsequence"],
    companies: ["amazon", "google", "uber"],
    frequency: 42,
    leetcodeUrl: "https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/",
    description:
      "Given a string and a list of candidate words, return the longest candidate that is a subsequence of the string. Break ties by choosing the lexicographically smallest word.",
    examples: [
      { input: 's = "abpcplea", dictionary = ["ale","apple","monkey","plea"]', output: '"apple"' },
      { input: 's = "abpcplea", dictionary = ["a","b","c"]', output: '"a"' },
    ],
    intuition:
      "Checking whether a word is a subsequence is a simple two-pointer walk over the string. Among all words that pass, keep the best by length, falling back to lexicographic order on ties.",
    approach: [
      "For each candidate word, scan the string with two pointers to test subsequence-ness.",
      "If the word's pointer reaches its end, the word is achievable.",
      "Update the answer when a word is longer, or equal length but lexicographically smaller.",
      "Return the best word found, or an empty string.",
    ],
    complexity: { time: "O(d · n)", space: "O(1)", note: "d words each scanned against the length-n string." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def find_longest_word(s: str, dictionary: list[str]) -> str:
    best = ""
    for word in dictionary:
        i = 0
        for ch in s:
            if i < len(word) and ch == word[i]:
                i += 1
        if i == len(word):
            if len(word) > len(best) or (len(word) == len(best) and word < best):
                best = word
    return best`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function findLongestWord(s: string, dictionary: string[]): string {
  let best = "";
  for (const word of dictionary) {
    let i = 0;
    for (let j = 0; j < s.length && i < word.length; j++) {
      if (s[j] === word[i]) i++;
    }
    if (i === word.length) {
      if (word.length > best.length || (word.length === best.length && word < best)) {
        best = word;
      }
    }
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "findLongestWord",
      comparison: "deep",
      jsStarter: `function findLongestWord(s, dictionary) {
  // Return the longest dictionary word that is a subsequence of s.
  // TODO: implement
}`,
      jsReference: `function findLongestWord(s, dictionary) {
  let best = "";
  for (const word of dictionary) {
    let i = 0;
    for (let j = 0; j < s.length && i < word.length; j++) {
      if (s[j] === word[i]) i++;
    }
    if (i === word.length) {
      if (word.length > best.length || (word.length === best.length && word < best)) {
        best = word;
      }
    }
  }
  return best;
}`,
    },
    tests: [
      { name: "longest wins", args: ["abpcplea", ["ale", "apple", "monkey", "plea"]], expected: "apple" },
      { name: "tie lexicographic", args: ["abpcplea", ["a", "b", "c"]], expected: "a" },
      { name: "two length-two", args: ["bab", ["ba", "ab", "a", "b"]], expected: "ab" },
      { name: "none match", args: ["x", ["y"]], expected: "" },
    ],
    relatedIds: [392],
  },
  {
    id: 541,
    slug: "reverse-string-ii",
    title: "Reverse String II",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["Two Pointers", "Simulation"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/reverse-string-ii/",
    description:
      "Walk the string in blocks of 2k characters and reverse the first k characters of each block, leaving the rest in place. Return the resulting string.",
    examples: [
      { input: 's = "abcdefg", k = 2', output: '"bacdfeg"' },
      { input: 's = "abcd", k = 2', output: '"bacd"' },
    ],
    intuition:
      "The pattern repeats every 2k characters: reverse a prefix of length k, skip the next k, repeat. Stepping the start index by 2k and reversing the bounded segment handles the partial-tail edge cases automatically.",
    approach: [
      "Convert the string to a mutable array of characters.",
      "Loop a start index from 0 in steps of 2k.",
      "Reverse the segment from start to min(start + k - 1, end) with two pointers.",
      "Join the characters back into a string.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Character array copy for in-place style swaps." },
    solutions: [
      {
        language: "python",
        label: "Simulation",
        code: `def reverse_str(s: str, k: int) -> str:
    arr = list(s)
    for i in range(0, len(arr), 2 * k):
        left, right = i, min(i + k - 1, len(arr) - 1)
        while left < right:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1
    return "".join(arr)`,
      },
      {
        language: "typescript",
        label: "Simulation",
        code: `function reverseStr(s: string, k: number): string {
  const arr = s.split("");
  for (let i = 0; i < arr.length; i += 2 * k) {
    let left = i;
    let right = Math.min(i + k - 1, arr.length - 1);
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  return arr.join("");
}`,
      },
    ],
    runner: {
      entry: "reverseStr",
      comparison: "deep",
      jsStarter: `function reverseStr(s, k) {
  // Reverse the first k of every 2k characters; return the new string.
  // TODO: implement
}`,
      jsReference: `function reverseStr(s, k) {
  const arr = s.split("");
  for (let i = 0; i < arr.length; i += 2 * k) {
    let left = i;
    let right = Math.min(i + k - 1, arr.length - 1);
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  return arr.join("");
}`,
    },
    tests: [
      { name: "full and partial", args: ["abcdefg", 2], expected: "bacdfeg" },
      { name: "exact block", args: ["abcd", 2], expected: "bacd" },
      { name: "k equals three", args: ["abcdefg", 3], expected: "cbadefg" },
      { name: "single char", args: ["a", 1], expected: "a" },
    ],
    relatedIds: [344],
  },
  {
    id: 713,
    slug: "subarray-product-less-than-k",
    title: "Subarray Product Less Than K",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window"],
    companies: ["amazon", "google", "meta", "bloomberg"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/subarray-product-less-than-k/",
    description:
      "Count the contiguous subarrays of positive integers whose elements multiply to a value strictly less than k.",
    examples: [
      { input: "nums = [10,5,2,6], k = 100", output: "8" },
      { input: "nums = [1,2,3], k = 0", output: "0" },
    ],
    intuition:
      "All values are positive, so extending a window only grows the product. Maintain a window whose product stays below k by shrinking from the left when it overflows; every right endpoint then contributes (right - left + 1) new valid subarrays ending there.",
    approach: [
      "Return 0 immediately when k ≤ 1 since no product can be smaller.",
      "Grow a window by multiplying in nums[right].",
      "While the product reaches k, divide out nums[left] and advance left.",
      "Add (right - left + 1) to the running count for each right.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Each index enters and leaves the window once." },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def num_subarray_product_less_than_k(nums: list[int], k: int) -> int:
    if k <= 1:
        return 0
    prod = 1
    left = 0
    count = 0
    for right, x in enumerate(nums):
        prod *= x
        while prod >= k:
            prod //= nums[left]
            left += 1
        count += right - left + 1
    return count`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function numSubarrayProductLessThanK(nums: number[], k: number): number {
  if (k <= 1) return 0;
  let prod = 1;
  let left = 0;
  let count = 0;
  for (let right = 0; right < nums.length; right++) {
    prod *= nums[right];
    while (prod >= k) {
      prod /= nums[left];
      left++;
    }
    count += right - left + 1;
  }
  return count;
}`,
      },
    ],
    runner: {
      entry: "numSubarrayProductLessThanK",
      comparison: "deep",
      jsStarter: `function numSubarrayProductLessThanK(nums, k) {
  // Count contiguous subarrays whose product is strictly less than k.
  // TODO: implement
}`,
      jsReference: `function numSubarrayProductLessThanK(nums, k) {
  if (k <= 1) return 0;
  let prod = 1;
  let left = 0;
  let count = 0;
  for (let right = 0; right < nums.length; right++) {
    prod *= nums[right];
    while (prod >= k) {
      prod /= nums[left];
      left++;
    }
    count += right - left + 1;
  }
  return count;
}`,
    },
    tests: [
      { name: "classic", args: [[10, 5, 2, 6], 100], expected: 8 },
      { name: "k too small", args: [[1, 2, 3], 0], expected: 0 },
      { name: "all ones", args: [[1, 1, 1], 2], expected: 6 },
      { name: "single", args: [[10], 11], expected: 1 },
    ],
    relatedIds: [209],
  },
  {
    id: 930,
    slug: "binary-subarrays-with-sum",
    title: "Binary Subarrays With Sum",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window", "Prefix Sum"],
    companies: ["amazon", "google", "meta"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/binary-subarrays-with-sum/",
    description:
      "Count the contiguous subarrays of a 0/1 array whose elements sum to exactly the given goal.",
    examples: [
      { input: "nums = [1,0,1,0,1], goal = 2", output: "4" },
      { input: "nums = [0,0,0,0,0], goal = 0", output: "15" },
    ],
    intuition:
      "Counting subarrays with sum exactly equal to a goal is the difference between counting those with sum at most goal and those with sum at most goal-1. Each 'at most' count is a clean sliding-window computation since values are non-negative.",
    approach: [
      "Write a helper that counts subarrays with sum at most a bound.",
      "Slide a window, shrinking from the left whenever the sum exceeds the bound.",
      "Each right endpoint contributes (right - left + 1) subarrays.",
      "Return atMost(goal) minus atMost(goal - 1).",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Two linear passes via the helper." },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def num_subarrays_with_sum(nums: list[int], goal: int) -> int:
    def at_most(g: int) -> int:
        if g < 0:
            return 0
        left = 0
        total = 0
        count = 0
        for right, x in enumerate(nums):
            total += x
            while total > g:
                total -= nums[left]
                left += 1
            count += right - left + 1
        return count

    return at_most(goal) - at_most(goal - 1)`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function numSubarraysWithSum(nums: number[], goal: number): number {
  const atMost = (g: number): number => {
    if (g < 0) return 0;
    let left = 0;
    let sum = 0;
    let count = 0;
    for (let right = 0; right < nums.length; right++) {
      sum += nums[right];
      while (sum > g) {
        sum -= nums[left];
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };
  return atMost(goal) - atMost(goal - 1);
}`,
      },
    ],
    runner: {
      entry: "numSubarraysWithSum",
      comparison: "deep",
      jsStarter: `function numSubarraysWithSum(nums, goal) {
  // Count subarrays of the 0/1 array whose sum equals goal.
  // TODO: implement
}`,
      jsReference: `function numSubarraysWithSum(nums, goal) {
  const atMost = (g) => {
    if (g < 0) return 0;
    let left = 0;
    let sum = 0;
    let count = 0;
    for (let right = 0; right < nums.length; right++) {
      sum += nums[right];
      while (sum > g) {
        sum -= nums[left];
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };
  return atMost(goal) - atMost(goal - 1);
}`,
    },
    tests: [
      { name: "classic", args: [[1, 0, 1, 0, 1], 2], expected: 4 },
      { name: "all zeros goal zero", args: [[0, 0, 0, 0, 0], 0], expected: 15 },
      { name: "ones goal one", args: [[1, 1, 1], 1], expected: 3 },
      { name: "single zero", args: [[1, 0, 1], 0], expected: 1 },
    ],
    relatedIds: [560],
  },
  {
    id: 1248,
    slug: "count-number-of-nice-subarrays",
    title: "Count Number of Nice Subarrays",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window", "Prefix Sum"],
    companies: ["amazon", "google", "uber", "bloomberg"],
    frequency: 57,
    leetcodeUrl: "https://leetcode.com/problems/count-number-of-nice-subarrays/",
    description:
      "A subarray is nice when it contains exactly k odd numbers. Count how many contiguous nice subarrays the array has.",
    examples: [
      { input: "nums = [1,1,2,1,1], k = 3", output: "2" },
      { input: "nums = [2,4,6], k = 1", output: "0" },
    ],
    intuition:
      "Only parity matters, so treat each odd number as a 1 and each even as a 0. Counting subarrays with exactly k odds becomes counting subarrays with at most k odds minus those with at most k-1, each solved with a sliding window.",
    approach: [
      "Define a helper counting subarrays containing at most g odd numbers.",
      "Slide a window over the array, shrinking left when the odd count exceeds g.",
      "Accumulate (right - left + 1) for each right endpoint.",
      "Return atMost(k) minus atMost(k - 1).",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Two linear sliding-window passes." },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def number_of_subarrays(nums: list[int], k: int) -> int:
    def at_most(g: int) -> int:
        if g < 0:
            return 0
        left = 0
        odd = 0
        count = 0
        for right, x in enumerate(nums):
            odd += x % 2
            while odd > g:
                odd -= nums[left] % 2
                left += 1
            count += right - left + 1
        return count

    return at_most(k) - at_most(k - 1)`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function numberOfSubarrays(nums: number[], k: number): number {
  const atMost = (g: number): number => {
    if (g < 0) return 0;
    let left = 0;
    let odd = 0;
    let count = 0;
    for (let right = 0; right < nums.length; right++) {
      odd += nums[right] % 2;
      while (odd > g) {
        odd -= nums[left] % 2;
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };
  return atMost(k) - atMost(k - 1);
}`,
      },
    ],
    runner: {
      entry: "numberOfSubarrays",
      comparison: "deep",
      jsStarter: `function numberOfSubarrays(nums, k) {
  // Count subarrays containing exactly k odd numbers.
  // TODO: implement
}`,
      jsReference: `function numberOfSubarrays(nums, k) {
  const atMost = (g) => {
    if (g < 0) return 0;
    let left = 0;
    let odd = 0;
    let count = 0;
    for (let right = 0; right < nums.length; right++) {
      odd += nums[right] % 2;
      while (odd > g) {
        odd -= nums[left] % 2;
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };
  return atMost(k) - atMost(k - 1);
}`,
    },
    tests: [
      { name: "classic", args: [[1, 1, 2, 1, 1], 3], expected: 2 },
      { name: "no odds", args: [[2, 4, 6], 1], expected: 0 },
      { name: "spread odds", args: [[2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2], expected: 16 },
      { name: "single odd", args: [[1], 1], expected: 1 },
    ],
    relatedIds: [930],
  },
  {
    id: 1358,
    slug: "number-of-substrings-containing-all-three-characters",
    title: "Number of Substrings Containing All Three Characters",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window"],
    companies: ["amazon", "google", "meta"],
    frequency: 51,
    leetcodeUrl: "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
    description:
      "Given a string made only of the characters a, b, and c, count the substrings that contain at least one of each.",
    examples: [
      { input: 's = "abcabc"', output: "10" },
      { input: 's = "aaacb"', output: "3" },
    ],
    intuition:
      "Fix the right endpoint and shrink the window from the left until it no longer contains all three letters. At that moment every starting index strictly before the new left forms a valid substring, so the count of valid starts equals the current left pointer.",
    approach: [
      "Track counts of a, b, and c inside the window.",
      "Extend the window by one character on the right.",
      "While all three counts are positive, drop the leftmost character and advance left.",
      "Add the current left value to the answer for each right endpoint.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Only three counters are maintained." },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def number_of_substrings(s: str) -> int:
    count = {"a": 0, "b": 0, "c": 0}
    left = 0
    res = 0
    for ch in s:
        count[ch] += 1
        while count["a"] > 0 and count["b"] > 0 and count["c"] > 0:
            count[s[left]] -= 1
            left += 1
        res += left
    return res`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function numberOfSubstrings(s: string): number {
  const count: Record<string, number> = { a: 0, b: 0, c: 0 };
  let left = 0;
  let res = 0;
  for (let right = 0; right < s.length; right++) {
    count[s[right]]++;
    while (count.a > 0 && count.b > 0 && count.c > 0) {
      count[s[left]]--;
      left++;
    }
    res += left;
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "numberOfSubstrings",
      comparison: "deep",
      jsStarter: `function numberOfSubstrings(s) {
  // Count substrings containing at least one a, b, and c.
  // TODO: implement
}`,
      jsReference: `function numberOfSubstrings(s) {
  const count = { a: 0, b: 0, c: 0 };
  let left = 0;
  let res = 0;
  for (let right = 0; right < s.length; right++) {
    count[s[right]]++;
    while (count.a > 0 && count.b > 0 && count.c > 0) {
      count[s[left]]--;
      left++;
    }
    res += left;
  }
  return res;
}`,
    },
    tests: [
      { name: "repeating", args: ["abcabc"], expected: 10 },
      { name: "front heavy", args: ["aaacb"], expected: 3 },
      { name: "exact", args: ["abc"], expected: 1 },
      { name: "missing letters", args: ["ccc"], expected: 0 },
    ],
    relatedIds: [3],
  },
  {
    id: 456,
    slug: "132-pattern",
    title: "132 Pattern",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Monotonic Stack"],
    companies: ["amazon", "google", "bloomberg", "microsoft"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/132-pattern/",
    description:
      "Decide whether the array contains indices i < j < k such that nums[i] < nums[k] < nums[j] — a so-called 132 pattern.",
    examples: [
      { input: "nums = [1,2,3,4]", output: "false" },
      { input: "nums = [3,1,4,2]", output: "true", explanation: "The triple (1,4,2) satisfies 1 < 2 < 4." },
    ],
    intuition:
      "Scan from the right and keep a decreasing stack of candidate 'twos' (the middle value of the pattern). Popping smaller stack values as a larger number arrives lets you remember the best possible 'third' value; if any later element is below that third, a 132 pattern exists.",
    approach: [
      "Iterate the array from right to left, tracking the best 'third' value seen.",
      "If the current value is less than that third, return true.",
      "While the stack top is below the current value, pop it and raise the third.",
      "Push the current value and continue; return false if the scan finishes.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each element is pushed and popped at most once." },
    solutions: [
      {
        language: "python",
        label: "Monotonic Stack",
        code: `def find_132_pattern(nums: list[int]) -> bool:
    stack: list[int] = []
    third = float("-inf")
    for x in reversed(nums):
        if x < third:
            return True
        while stack and stack[-1] < x:
            third = stack.pop()
        stack.append(x)
    return False`,
      },
      {
        language: "typescript",
        label: "Monotonic Stack",
        code: `function find132pattern(nums: number[]): boolean {
  const stack: number[] = [];
  let third = -Infinity;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < third) return true;
    while (stack.length && stack[stack.length - 1] < nums[i]) {
      third = stack.pop()!;
    }
    stack.push(nums[i]);
  }
  return false;
}`,
      },
    ],
    runner: {
      entry: "find132pattern",
      comparison: "deep",
      jsStarter: `function find132pattern(nums) {
  // Return true if a 132 pattern exists in the array.
  // TODO: implement
}`,
      jsReference: `function find132pattern(nums) {
  const stack = [];
  let third = -Infinity;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < third) return true;
    while (stack.length && stack[stack.length - 1] < nums[i]) {
      third = stack.pop();
    }
    stack.push(nums[i]);
  }
  return false;
}`,
    },
    tests: [
      { name: "increasing", args: [[1, 2, 3, 4]], expected: false },
      { name: "exists", args: [[3, 1, 4, 2]], expected: true },
      { name: "with negative", args: [[-1, 3, 2, 0]], expected: true },
      { name: "too short", args: [[1, 2]], expected: false },
    ],
    relatedIds: [496],
  },
  {
    id: 962,
    slug: "maximum-width-ramp",
    title: "Maximum Width Ramp",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Monotonic Stack"],
    companies: ["amazon", "google", "databricks"],
    frequency: 47,
    leetcodeUrl: "https://leetcode.com/problems/maximum-width-ramp/",
    description:
      "A ramp is a pair of indices i < j where nums[i] ≤ nums[j]. Return the largest possible width j - i, or 0 if no ramp exists.",
    examples: [
      { input: "nums = [6,0,8,2,1,5]", output: "4", explanation: "Indices 1 and 5 give width 4." },
      { input: "nums = [9,8,1,0,1,9,4,0,4,1]", output: "7" },
    ],
    intuition:
      "Only indices whose values strictly decrease can ever be the left end of the widest ramp, so collect them in a stack while scanning left to right. Then scan from the right, popping each stack index that can pair with the current position to extend the maximum width.",
    approach: [
      "Build a stack of indices whose values are strictly decreasing.",
      "Scan j from the end of the array toward the start.",
      "While the value at the stack's top index is ≤ nums[j], pop it and update the best width.",
      "Return the largest width found.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each index is pushed once and popped at most once." },
    solutions: [
      {
        language: "python",
        label: "Monotonic Stack",
        code: `def max_width_ramp(nums: list[int]) -> int:
    stack: list[int] = []
    for i, x in enumerate(nums):
        if not stack or nums[stack[-1]] > x:
            stack.append(i)
    res = 0
    for j in range(len(nums) - 1, -1, -1):
        while stack and nums[stack[-1]] <= nums[j]:
            res = max(res, j - stack.pop())
    return res`,
      },
      {
        language: "typescript",
        label: "Monotonic Stack",
        code: `function maxWidthRamp(nums: number[]): number {
  const stack: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (stack.length === 0 || nums[stack[stack.length - 1]] > nums[i]) {
      stack.push(i);
    }
  }
  let res = 0;
  for (let j = nums.length - 1; j >= 0; j--) {
    while (stack.length && nums[stack[stack.length - 1]] <= nums[j]) {
      res = Math.max(res, j - stack.pop()!);
    }
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "maxWidthRamp",
      comparison: "deep",
      jsStarter: `function maxWidthRamp(nums) {
  // Return the maximum width ramp, or 0 if none exists.
  // TODO: implement
}`,
      jsReference: `function maxWidthRamp(nums) {
  const stack = [];
  for (let i = 0; i < nums.length; i++) {
    if (stack.length === 0 || nums[stack[stack.length - 1]] > nums[i]) {
      stack.push(i);
    }
  }
  let res = 0;
  for (let j = nums.length - 1; j >= 0; j--) {
    while (stack.length && nums[stack[stack.length - 1]] <= nums[j]) {
      res = Math.max(res, j - stack.pop());
    }
  }
  return res;
}`,
    },
    tests: [
      { name: "basic", args: [[6, 0, 8, 2, 1, 5]], expected: 4 },
      { name: "longer", args: [[9, 8, 1, 0, 1, 9, 4, 0, 4, 1]], expected: 7 },
      { name: "equal pair", args: [[1, 1]], expected: 1 },
      { name: "strictly decreasing", args: [[5, 4, 3, 2, 1]], expected: 0 },
    ],
    relatedIds: [739],
  },
  {
    id: 388,
    slug: "longest-absolute-file-path",
    title: "Longest Absolute File Path",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Stack", "Parsing"],
    companies: ["google", "amazon", "microsoft"],
    frequency: 45,
    leetcodeUrl: "https://leetcode.com/problems/longest-absolute-file-path/",
    description:
      "A filesystem is encoded as a single string where newlines separate entries and tab characters indicate nesting depth. Return the length of the longest absolute path to a file (a name containing a dot), or 0 if there is none.",
    examples: [
      { input: 'input = "dir\\n\\tsubdir1\\n\\tsubdir2\\n\\t\\tfile.ext"', output: "20", explanation: '"dir/subdir2/file.ext" has length 20.' },
      { input: 'input = "a"', output: "0", explanation: "No file is present." },
    ],
    intuition:
      "Each entry's depth is the number of leading tabs, and a stack indexed by depth holds the cumulative path length up to that level. Trimming the stack back to the current depth before extending it keeps every running length consistent with the directory hierarchy.",
    approach: [
      "Split the input on newlines into individual entries.",
      "For each entry, count leading tabs to get its depth and strip them to get the name.",
      "Pop the stack until its size equals the depth, then push prevLength + nameLength (+1 for a separator when nested).",
      "If the name contains a dot, update the maximum with the current cumulative length.",
    ],
    complexity: { time: "O(n)", space: "O(d)", note: "n input characters; d is the directory nesting depth." },
    solutions: [
      {
        language: "python",
        label: "Stack",
        code: `def length_longest_path(input: str) -> int:
    stack: list[int] = []
    max_len = 0
    for line in input.split("\\n"):
        depth = 0
        while depth < len(line) and line[depth] == "\\t":
            depth += 1
        name = line[depth:]
        while len(stack) > depth:
            stack.pop()
        prev = stack[-1] if stack else 0
        cur = prev + len(name) + (1 if stack else 0)
        stack.append(cur)
        if "." in name:
            max_len = max(max_len, cur)
    return max_len`,
      },
      {
        language: "typescript",
        label: "Stack",
        code: `function lengthLongestPath(input: string): number {
  const lines = input.split("\\n");
  const stack: number[] = [];
  let maxLen = 0;
  for (const line of lines) {
    let depth = 0;
    while (line[depth] === "\\t") depth++;
    const name = line.slice(depth);
    while (stack.length > depth) stack.pop();
    const prev = stack.length > 0 ? stack[stack.length - 1] : 0;
    const cur = prev + name.length + (stack.length > 0 ? 1 : 0);
    stack.push(cur);
    if (name.includes(".")) maxLen = Math.max(maxLen, cur);
  }
  return maxLen;
}`,
      },
    ],
    runner: {
      entry: "lengthLongestPath",
      comparison: "deep",
      jsStarter: `function lengthLongestPath(input) {
  // Return the length of the longest absolute path to a file.
  // TODO: implement
}`,
      jsReference: `function lengthLongestPath(input) {
  const lines = input.split("\\n");
  const stack = [];
  let maxLen = 0;
  for (const line of lines) {
    let depth = 0;
    while (line[depth] === "\\t") depth++;
    const name = line.slice(depth);
    while (stack.length > depth) stack.pop();
    const prev = stack.length > 0 ? stack[stack.length - 1] : 0;
    const cur = prev + name.length + (stack.length > 0 ? 1 : 0);
    stack.push(cur);
    if (name.includes(".")) maxLen = Math.max(maxLen, cur);
  }
  return maxLen;
}`,
    },
    tests: [
      { name: "nested file", args: ["dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"], expected: 20 },
      { name: "deeper tree", args: ["dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext"], expected: 32 },
      { name: "no file", args: ["a"], expected: 0 },
      { name: "single file", args: ["file.txt"], expected: 8 },
    ],
    relatedIds: [71],
  },
];

export default batchX;
