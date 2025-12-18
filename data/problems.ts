import type { Problem } from "./types.ts";

/**
 * The curated, fully-explained core of the LeetCode 500.
 *
 * Every record is the single source of truth for the web app, the docs, and the
 * interactive playground. Problems are grouped by category in study order.
 * Append new typed records here and the entire app picks them up automatically.
 *
 * Playground note: `runner.entry` is invoked in a sandboxed Web Worker with each
 * test's `args` spread as positional parameters. Linked-list / tree problems use
 * array I/O (with inline build/serialize helpers) so test data stays plain JSON.
 */
export const problems: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Arrays & Hashing
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Map"],
    companies: ["amazon", "google", "apple", "microsoft", "meta", "bloomberg", "adobe"],
    frequency: 98,
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    pseudocode: `function twoSum(nums, target):
  seen = {}                      // value -> index
  for i, x in nums:
    need = target - x
    if need in seen:
      return [seen[need], i]
    seen[x] = i
  return []`,
    statement:
      "You are given an array of integers `nums` and a single integer `target`. Exactly one pair of distinct positions in the array adds up to `target`, and your task is to return those two positions as a list `[i, j]`.\n\nThe two indices must be different (you cannot use the same element twice), and the pair may be returned in any order. A valid answer is guaranteed to exist, so there is no 'no solution' case to handle. The goal is a single-pass $O(n)$ solution rather than the $O(n^2)$ brute force that checks every possible pair.",
    description:
      "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. Each input has exactly one solution and you may not reuse the same element.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10^4", "-10^9 ≤ nums[i], target ≤ 10^9", "Exactly one valid answer exists."],
    intuition:
      "The brute force checks every pair in O(n²). Instead, as you scan once, remember every value you've seen in a hash map. For each number `x`, the partner you need is `target - x`; if you've already seen it, you're done in O(1).",
    approach: [
      "Create an empty map of value → index.",
      "For each index i, compute complement = target - nums[i].",
      "If complement is already in the map, return [map[complement], i].",
      "Otherwise store nums[i] → i and continue.",
    ],
    diagram: `graph LR
  A["x = 2, need 7"] -->|not seen| B["store 2 → 0"]
  B --> C["x = 7, need 2"]
  C -->|seen at 0| D["return [0, 1]"]`,
    complexity: { time: "O(n)", space: "O(n)", note: "One pass; the map holds at most n entries." },
    solutions: [
      {
        language: "python",
        label: "Hash Map",
        code: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:
            return [seen[need], i]
        seen[x] = i
    return []`,
      },
      {
        language: "typescript",
        label: "Hash Map",
        code: `function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need)!, i];
    seen.set(nums[i], i);
  }
  return [];
}`,
      },
    ],
    runner: {
      entry: "twoSum",
      comparison: "deep",
      jsStarter: `function twoSum(nums, target) {
  // Return the indices of the two numbers adding up to target.
  // TODO: implement
}`,
      jsReference: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
    },
    tests: [
      { name: "basic", args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { name: "middle pair", args: [[3, 2, 4], 6], expected: [1, 2] },
      { name: "duplicates", args: [[3, 3], 6], expected: [0, 1] },
      { name: "negatives", args: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
    ],
    hints: ["What value would complete the current number?", "Trade space for time with a hash map."],
    relatedIds: [15, 167, 653],
  },
  {
    id: 217,
    slug: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Set"],
    companies: ["amazon", "apple", "microsoft", "adobe"],
    frequency: 84,
    leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/",
    pseudocode: `function containsDuplicate(nums):
  seen = empty set
  for x in nums:
    if x in seen:
      return true
    add x to seen
  return false`,
    statement:
      "Given an integer array `nums`, determine whether any value appears more than once. Return `true` if at least one value occurs two or more times anywhere in the array, and `false` only when every element is distinct.\n\nThe values may appear in any order and can be negative. A single linear scan backed by a hash set is enough to decide.",
    description:
      "Given an integer array `nums`, return `true` if any value appears at least twice, and `false` if every element is distinct.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^9 ≤ nums[i] ≤ 10^9"],
    intuition:
      "A set answers 'have I seen this before?' in O(1). Add as you go and bail the moment an insert collides — or simply compare the set's size to the array's length.",
    approach: [
      "Create an empty hash set.",
      "Scan the array; if the current value is already in the set, return true.",
      "Otherwise add it.",
      "If the scan finishes with no collision, return false.",
    ],
    diagram: `graph LR
  A["1"] --> B["2"] --> C["3"] --> D["1 already in set"]
  D --> E["return true"]`,
    complexity: { time: "O(n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Hash Set",
        code: `def contains_duplicate(nums: list[int]) -> bool:
    return len(set(nums)) < len(nums)`,
      },
      {
        language: "typescript",
        label: "Hash Set",
        code: `function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}`,
      },
    ],
    runner: {
      entry: "containsDuplicate",
      comparison: "deep",
      jsStarter: `function containsDuplicate(nums) {
  // Return true if any value appears at least twice.
  // TODO: implement
}`,
      jsReference: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}`,
    },
    tests: [
      { name: "has duplicate", args: [[1, 2, 3, 1]], expected: true },
      { name: "all unique", args: [[1, 2, 3, 4]], expected: false },
      { name: "single element", args: [[7]], expected: false },
      { name: "many duplicates", args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
    ],
    hints: ["A set membership test is O(1).", "Compare unique count to total count."],
    relatedIds: [1, 242],
  },
  {
    id: 49,
    slug: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Hash Map", "Encode Key"],
    companies: ["amazon", "google", "meta", "microsoft", "uber", "bloomberg"],
    frequency: 79,
    leetcodeUrl: "https://leetcode.com/problems/group-anagrams/",
    pseudocode: `function groupAnagrams(strs):
  groups = {}                    // key -> list of words
  for s in strs:
    key = sort(characters of s)
    groups[key].append(s)
  return values of groups`,
    statement:
      "You are given an array of strings `strs`. Group together the strings that are anagrams of one another and return the collection of groups.\n\nTwo strings are anagrams when one is a rearrangement of the other — they use exactly the same letters with the same counts. Every input string belongs to exactly one group, and a group may contain only a single string. Both the order of the groups and the order of the strings inside each group are unrestricted.",
    description:
      "Given an array of strings `strs`, group the anagrams together. Anagrams share the same multiset of letters. Return the groups in any order.",
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
    ],
    constraints: ["1 ≤ strs.length ≤ 10^4", "0 ≤ strs[i].length ≤ 100", "strs[i] is lowercase English letters."],
    intuition:
      "Two words are anagrams iff some canonical form matches. Sorting the letters (or a 26-length count signature) gives every anagram the same key. Bucket words under that key in a hash map.",
    approach: [
      "Create a map from key → list of words.",
      "For each word, build a canonical key: its sorted characters (or a 26-letter count tuple).",
      "Append the original word to the bucket for that key.",
      "Return all the buckets' values.",
    ],
    diagram: `graph TD
  E["eat"] --> K1["key 'aet'"]
  T["tea"] --> K1
  A["ate"] --> K1
  TAN["tan"] --> K2["key 'ant'"]
  NAT["nat"] --> K2
  BAT["bat"] --> K3["key 'abt'"]`,
    complexity: { time: "O(n·k log k)", space: "O(n·k)", note: "n words of length k; the count-based key is O(n·k)." },
    solutions: [
      {
        language: "python",
        label: "Sorted key",
        code: `from collections import defaultdict

def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups: dict[str, list[str]] = defaultdict(list)
    for s in strs:
        key = "".join(sorted(s))
        groups[key].append(s)
    return list(groups.values())`,
      },
      {
        language: "typescript",
        label: "Sorted key",
        code: `function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const s of strs) {
    const key = s.split("").sort().join("");
    (groups.get(key) ?? groups.set(key, []).get(key)!).push(s);
  }
  return [...groups.values()];
}`,
      },
    ],
    runner: {
      entry: "groupAnagrams",
      comparison: "canonical",
      jsStarter: `function groupAnagrams(strs) {
  // Group anagrams together; return an array of groups (any order).
  // TODO: implement
}`,
      jsReference: `function groupAnagrams(strs) {
  const groups = new Map();
  for (const s of strs) {
    const key = s.split("").sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  return [...groups.values()];
}`,
    },
    tests: [
      { name: "classic", args: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]] },
      { name: "empty string", args: [[""]], expected: [[""]] },
      { name: "single", args: [["a"]], expected: [["a"]] },
    ],
    hints: ["What do all anagrams share?", "A sorted string or letter-count makes a stable key."],
    relatedIds: [242, 1],
  },
  {
    id: 238,
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Prefix Product", "Suffix Product"],
    companies: ["amazon", "meta", "apple", "microsoft", "lyft", "bloomberg"],
    frequency: 81,
    leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
    pseudocode: `function productExceptSelf(nums):
  n = length(nums)
  answer = array of n ones
  prefix = 1
  for i from 0 to n-1:
    answer[i] = prefix
    prefix = prefix * nums[i]
  suffix = 1
  for i from n-1 down to 0:
    answer[i] = answer[i] * suffix
    suffix = suffix * nums[i]
  return answer`,
    statement:
      "Given an integer array `nums` of length `n`, return a new array `answer` of the same length in which `answer[i]` is the product of every element of `nums` other than `nums[i]`.\n\nThe intended solution must run in $O(n)$ time and is not allowed to use the division operator — so you cannot simply divide the total product by each element (which would also break whenever the array contains a zero). The problem guarantees that each of these products fits within a 32-bit integer.",
    description:
      "Given an integer array `nums`, return an array `answer` where `answer[i]` is the product of all elements except `nums[i]`. Solve it without division and in O(n) time.",
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10^5", "-30 ≤ nums[i] ≤ 30", "The answer fits in a 32-bit integer."],
    intuition:
      "Each answer is (product of everything to the left) × (product of everything to the right). Compute a running prefix product, then a running suffix product in a second pass — no division needed.",
    approach: [
      "Initialize answer[i] = 1 for all i.",
      "Left pass: keep a running prefix; set answer[i] = prefix, then multiply prefix by nums[i].",
      "Right pass: keep a running suffix; multiply answer[i] by suffix, then multiply suffix by nums[i].",
      "Return answer.",
    ],
    diagram: `graph LR
  subgraph Prefix
    P0["1"] --> P1["1"] --> P2["2"] --> P3["6"]
  end
  subgraph Suffix
    S3["1"] --> S2["4"] --> S1["12"] --> S0["24"]
  end`,
    complexity: { time: "O(n)", space: "O(1)", note: "Output array doesn't count as extra space." },
    solutions: [
      {
        language: "python",
        label: "Prefix · Suffix",
        code: `def product_except_self(nums: list[int]) -> list[int]:
    n = len(nums)
    answer = [1] * n
    prefix = 1
    for i in range(n):
        answer[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        answer[i] *= suffix
        suffix *= nums[i]
    return answer`,
      },
      {
        language: "typescript",
        label: "Prefix · Suffix",
        code: `function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const answer = new Array<number>(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }
  return answer;
}`,
      },
    ],
    runner: {
      entry: "productExceptSelf",
      comparison: "deep",
      jsStarter: `function productExceptSelf(nums) {
  // Return products of all elements except self, without division.
  // TODO: implement
}`,
      jsReference: `function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) { answer[i] = prefix; prefix *= nums[i]; }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) { answer[i] *= suffix; suffix *= nums[i]; }
  return answer;
}`,
    },
    tests: [
      { name: "basic", args: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { name: "with zero", args: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
      { name: "two elements", args: [[2, 3]], expected: [3, 2] },
    ],
    hints: ["Split into left and right products.", "Two passes avoid division."],
    relatedIds: [152, 42],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Two Pointers
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 125,
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["Converging Pointers"],
    companies: ["meta", "microsoft", "amazon", "apple"],
    frequency: 76,
    leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/",
    pseudocode: `function isPalindrome(s):
  l = 0; r = length(s) - 1
  while l < r:
    while l < r and not isAlnum(s[l]): l = l + 1
    while l < r and not isAlnum(s[r]): r = r - 1
    if lower(s[l]) != lower(s[r]): return false
    l = l + 1; r = r - 1
  return true`,
    statement:
      "For this problem a string counts as a palindrome if, after lowercasing every letter and removing all characters that are not letters or digits, the resulting sequence reads the same forwards and backwards.\n\nGiven a string `s`, return `true` when it meets this definition and `false` otherwise. Spaces, punctuation, and capitalization are ignored entirely. An empty string — or any string that contains no alphanumeric characters at all — is treated as a valid palindrome.",
    description:
      "A phrase is a palindrome if, after lowercasing and removing all non-alphanumeric characters, it reads the same forward and backward. Return whether `s` is a palindrome.",
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: "false" },
    ],
    constraints: ["1 ≤ s.length ≤ 2·10^5", "s consists of printable ASCII."],
    intuition:
      "Walk one pointer from each end toward the middle, skipping anything that isn't a letter or digit. Compare the two characters case-insensitively; the first mismatch proves it's not a palindrome.",
    approach: [
      "Set left = 0 and right = last index.",
      "While left < right, advance left past non-alphanumeric, retreat right past non-alphanumeric.",
      "Compare lowercased characters; mismatch → return false.",
      "Move both inward and continue; if pointers cross, return true.",
    ],
    diagram: `graph LR
  L["left →"] --- M["...meet..."] --- R["← right"]
  M --> C{"chars equal?"}
  C -- no --> F["false"]
  C -- yes --> N["move inward"]`,
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left, right = left + 1, right - 1
    return True`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function isPalindrome(s: string): boolean {
  const ok = (c: string) => /[a-z0-9]/i.test(c);
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !ok(s[l])) l++;
    while (l < r && !ok(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "isPalindrome",
      comparison: "deep",
      jsStarter: `function isPalindrome(s) {
  // Ignore case and non-alphanumeric characters.
  // TODO: implement
}`,
      jsReference: `function isPalindrome(s) {
  const ok = (c) => /[a-z0-9]/i.test(c);
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !ok(s[l])) l++;
    while (l < r && !ok(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
  }
  return true;
}`,
    },
    tests: [
      { name: "classic", args: ["A man, a plan, a canal: Panama"], expected: true },
      { name: "not palindrome", args: ["race a car"], expected: false },
      { name: "only punctuation", args: [" "], expected: true },
      { name: "alphanumeric", args: ["0P"], expected: false },
    ],
    hints: ["Skip non-alphanumeric characters.", "Compare from both ends inward."],
    relatedIds: [680, 5],
  },
  {
    id: 15,
    slug: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Sort", "Converging Pointers"],
    companies: ["amazon", "meta", "google", "apple", "microsoft", "adobe"],
    frequency: 88,
    leetcodeUrl: "https://leetcode.com/problems/3sum/",
    pseudocode: `function threeSum(nums):
  sort(nums)
  res = []
  for i from 0 to n-3:
    if i > 0 and nums[i] == nums[i-1]: continue   // skip dup
    l = i + 1; r = n - 1
    while l < r:
      s = nums[i] + nums[l] + nums[r]
      if s < 0: l = l + 1
      else if s > 0: r = r - 1
      else:
        res.append([nums[i], nums[l], nums[r]])
        l = l + 1; r = r - 1
        while l < r and nums[l] == nums[l-1]: l = l + 1
        while l < r and nums[r] == nums[r+1]: r = r - 1
  return res`,
    statement:
      "Given an integer array `nums`, return every unique triplet of values `[a, b, c]`, taken from three different indices, whose elements sum to zero.\n\nThe returned list must not contain duplicate triplets: two triplets made of the same three values are considered identical even when they come from different positions in the array. The order of the triplets, and the order of the numbers within each triplet, does not matter. If no qualifying triplet exists, return an empty list.",
    description:
      "Given an integer array `nums`, return all unique triplets `[a, b, c]` such that a + b + c = 0. The solution set must not contain duplicate triplets.",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
    ],
    constraints: ["3 ≤ nums.length ≤ 3000", "-10^5 ≤ nums[i] ≤ 10^5"],
    intuition:
      "Sort the array. Fix one number, then the problem reduces to two-sum on the remaining suffix — solvable with converging pointers. Sorting also makes it trivial to skip duplicates and keep triplets unique.",
    approach: [
      "Sort nums ascending.",
      "For each index i (skipping equal neighbors), set l = i+1, r = end.",
      "Move pointers by the sign of nums[i]+nums[l]+nums[r]; on a zero sum, record the triplet.",
      "After recording, skip duplicate values for l and r before continuing.",
    ],
    diagram: `graph LR
  F["fix nums[i]"] --> TP["two-pointer on suffix"]
  TP --> S{"sum < 0?"}
  S -- yes --> RL["l++"]
  S -- "> 0" --> RR["r--"]
  S -- "= 0" --> REC["record + skip dups"]`,
    complexity: { time: "O(n²)", space: "O(1)", note: "Excluding the output and sort's stack." },
    solutions: [
      {
        language: "python",
        label: "Sort + Two Pointers",
        code: `def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res: list[list[int]] = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            total = nums[i] + nums[l] + nums[r]
            if total < 0:
                l += 1
            elif total > 0:
                r -= 1
            else:
                res.append([nums[i], nums[l], nums[r]])
                l += 1
                r -= 1
                while l < r and nums[l] == nums[l - 1]:
                    l += 1
                while l < r and nums[r] == nums[r + 1]:
                    r -= 1
    return res`,
      },
      {
        language: "typescript",
        label: "Sort + Two Pointers",
        code: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum < 0) l++;
      else if (sum > 0) r--;
      else {
        res.push([nums[i], nums[l], nums[r]]);
        l++; r--;
        while (l < r && nums[l] === nums[l - 1]) l++;
        while (l < r && nums[r] === nums[r + 1]) r--;
      }
    }
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "threeSum",
      comparison: "canonical",
      jsStarter: `function threeSum(nums) {
  // Return all unique triplets summing to zero.
  // TODO: implement
}`,
      jsReference: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum < 0) l++;
      else if (sum > 0) r--;
      else {
        res.push([nums[i], nums[l], nums[r]]);
        l++; r--;
        while (l < r && nums[l] === nums[l - 1]) l++;
        while (l < r && nums[r] === nums[r + 1]) r--;
      }
    }
  }
  return res;
}`,
    },
    tests: [
      { name: "classic", args: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
      { name: "no triplet", args: [[0, 1, 1]], expected: [] },
      { name: "all zeros", args: [[0, 0, 0]], expected: [[0, 0, 0]] },
    ],
    hints: ["Sort first.", "Fix one number and two-pointer the rest.", "Skip duplicates to stay unique."],
    relatedIds: [1, 16, 18],
  },
  {
    id: 11,
    slug: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Converging Pointers", "Greedy"],
    companies: ["amazon", "google", "meta", "bloomberg"],
    frequency: 74,
    leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
    pseudocode: `function maxArea(height):
  l = 0; r = length(height) - 1
  best = 0
  while l < r:
    area = (r - l) * min(height[l], height[r])
    best = max(best, area)
    if height[l] < height[r]: l = l + 1
    else: r = r - 1
  return best`,
    statement:
      "You are given an array `height` of `n` non-negative integers, where `height[i]` is the height of a vertical line standing at x-coordinate `i`. Choosing any two of these lines, together with the x-axis, forms a container.\n\nReturn the largest amount of water such a container can hold. Because the container cannot be tilted, the water is bounded by the shorter of the two chosen lines, so for lines at indices `l` and `r` the area is `(r - l) × min(height[l], height[r])`. Maximize this quantity over every pair of lines.",
    description:
      "Given heights of vertical lines, pick two lines that together with the x-axis form a container holding the most water. Return that maximum area.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: ["2 ≤ height.length ≤ 10^5", "0 ≤ height[i] ≤ 10^4"],
    intuition:
      "Area is width × min(left, right). Start as wide as possible and move the shorter wall inward: the shorter wall caps the area, so keeping it can never beat moving past it. This greedily explores every potentially-better pair in one pass.",
    approach: [
      "Set l = 0, r = last index, best = 0.",
      "Compute area = (r - l) × min(height[l], height[r]); update best.",
      "Move the pointer at the shorter line inward.",
      "Repeat until the pointers meet.",
    ],
    diagram: `graph LR
  L["l (short)"] -->|move in| L2["l+1"]
  R["r (tall)"]
  L2 --- R
  note["shorter wall limits area → advance it"]`,
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def max_area(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    best = 0
    while l < r:
        best = max(best, (r - l) * min(height[l], height[r]))
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return best`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function maxArea(height: number[]): number {
  let l = 0, r = height.length - 1, best = 0;
  while (l < r) {
    best = Math.max(best, (r - l) * Math.min(height[l], height[r]));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "maxArea",
      comparison: "deep",
      jsStarter: `function maxArea(height) {
  // Return the maximum water a container can hold.
  // TODO: implement
}`,
      jsReference: `function maxArea(height) {
  let l = 0, r = height.length - 1, best = 0;
  while (l < r) {
    best = Math.max(best, (r - l) * Math.min(height[l], height[r]));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return best;
}`,
    },
    tests: [
      { name: "classic", args: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { name: "minimal", args: [[1, 1]], expected: 1 },
      { name: "descending", args: [[4, 3, 2, 1, 4]], expected: 16 },
    ],
    hints: ["Area is limited by the shorter line.", "Always move the shorter wall inward."],
    relatedIds: [42],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Sliding Window
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 121,
    slug: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "sliding-window",
    patterns: ["Running Minimum", "One Pass"],
    companies: ["amazon", "meta", "google", "microsoft", "bloomberg", "apple"],
    frequency: 90,
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    pseudocode: `function maxProfit(prices):
  minPrice = +infinity
  best = 0
  for price in prices:
    minPrice = min(minPrice, price)
    best = max(best, price - minPrice)
  return best`,
    statement:
      "You are given an array `prices` where `prices[i]` is the price of a given stock on day `i`. You may complete at most one transaction: choose a day to buy a single share and a strictly later day to sell it.\n\nReturn the maximum profit achievable from that single buy-then-sell. If no pair of days lets you sell higher than you bought (prices only fall or stay flat), the best you can do is not trade at all, so return `0`. You cannot sell before you buy.",
    description:
      "You are given prices where `prices[i]` is the price of a stock on day i. Buy on one day and sell on a later day. Return the maximum profit, or 0 if no profit is possible.",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy at 1 (day 2), sell at 6 (day 5)." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "Prices only fall — no profit." },
    ],
    constraints: ["1 ≤ prices.length ≤ 10^5", "0 ≤ prices[i] ≤ 10^4"],
    intuition:
      "Think of a window whose left edge is the cheapest day seen so far. For each day, the best sale is today's price minus that running minimum. Track both the minimum and the best profit in a single sweep.",
    approach: [
      "Track minPrice = +∞ and best = 0.",
      "For each price: update minPrice with the smaller of itself and the price.",
      "Compute price - minPrice and update best if larger.",
      "Return best.",
    ],
    diagram: `graph LR
  A["7 → min=7"] --> B["1 → min=1"] --> C["5 → profit 4"] --> D["6 → profit 5"] --> E["best = 5"]`,
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "One Pass",
        code: `def max_profit(prices: list[int]) -> int:
    min_price = float("inf")
    best = 0
    for price in prices:
        min_price = min(min_price, price)
        best = max(best, price - min_price)
    return best`,
      },
      {
        language: "typescript",
        label: "One Pass",
        code: `function maxProfit(prices: number[]): number {
  let minPrice = Infinity, best = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    best = Math.max(best, price - minPrice);
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "maxProfit",
      comparison: "deep",
      jsStarter: `function maxProfit(prices) {
  // Return the maximum profit from one buy and one later sell.
  // TODO: implement
}`,
      jsReference: `function maxProfit(prices) {
  let minPrice = Infinity, best = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    best = Math.max(best, price - minPrice);
  }
  return best;
}`,
    },
    tests: [
      { name: "profit exists", args: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { name: "no profit", args: [[7, 6, 4, 3, 1]], expected: 0 },
      { name: "single day", args: [[5]], expected: 0 },
      { name: "rising", args: [[1, 2, 3, 4, 5]], expected: 4 },
    ],
    hints: ["Track the cheapest price so far.", "Best profit = today − running minimum."],
    relatedIds: [122, 53],
  },
  {
    id: 3,
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Variable Window", "Hash Set"],
    companies: ["amazon", "google", "meta", "microsoft", "bloomberg", "adobe", "apple"],
    frequency: 92,
    leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    pseudocode: `function lengthOfLongestSubstring(s):
  seen = empty set
  left = 0; best = 0
  for right from 0 to length(s)-1:
    while s[right] in seen:
      remove s[left] from seen
      left = left + 1
    add s[right] to seen
    best = max(best, right - left + 1)
  return best`,
    statement:
      "Given a string `s`, find the length of the longest substring that contains no repeated characters.\n\nA substring is a contiguous run of characters within `s` (unlike a subsequence, you cannot skip positions). Among all substrings in which every character is distinct, return the length of the longest one. The string may include letters, digits, symbols, and spaces; if `s` is empty the answer is `0`.",
    description:
      "Given a string `s`, return the length of the longest substring that contains no repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: '"abc" has length 3.' },
      { input: 's = "bbbbb"', output: "1" },
      { input: 's = "pwwkew"', output: "3", explanation: '"wke" — note "pwke" is a subsequence, not a substring.' },
    ],
    constraints: ["0 ≤ s.length ≤ 5·10^4", "s consists of English letters, digits, symbols and spaces."],
    intuition:
      "Maintain a window with all-unique characters. Expand the right edge one character at a time; whenever the new character is already inside, shrink from the left until the duplicate is gone. The largest window width seen is the answer.",
    approach: [
      "Keep a set of characters currently in the window and a left index.",
      "For each right index, while s[right] is in the set, remove s[left] and advance left.",
      "Add s[right]; update the best length with right - left + 1.",
      "Return the best length.",
    ],
    diagram: `graph LR
  A["right expands →"] --> B{"duplicate?"}
  B -- yes --> C["shrink left until unique"]
  B -- no --> D["update best length"]`,
    complexity: { time: "O(n)", space: "O(min(n, alphabet))" },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def length_of_longest_substring(s: str) -> int:
    seen: set[str] = set()
    left = best = 0
    for right, ch in enumerate(s):
        while ch in seen:
            seen.remove(s[left])
            left += 1
        seen.add(ch)
        best = max(best, right - left + 1)
    return best`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function lengthOfLongestSubstring(s: string): number {
  const seen = new Set<string>();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "lengthOfLongestSubstring",
      comparison: "deep",
      jsStarter: `function lengthOfLongestSubstring(s) {
  // Return the length of the longest substring without repeats.
  // TODO: implement
}`,
      jsReference: `function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) { seen.delete(s[left]); left++; }
    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    },
    tests: [
      { name: "abc", args: ["abcabcbb"], expected: 3 },
      { name: "all same", args: ["bbbbb"], expected: 1 },
      { name: "pwwkew", args: ["pwwkew"], expected: 3 },
      { name: "empty", args: [""], expected: 0 },
      { name: "spaces", args: [" "], expected: 1 },
    ],
    hints: ["Grow a window and shrink on a repeat.", "A set tracks what's inside the window."],
    relatedIds: [159, 340, 76],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Stack
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 20,
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "stack",
    patterns: ["Stack", "Matching Pairs"],
    companies: ["amazon", "meta", "google", "microsoft", "bloomberg", "apple"],
    frequency: 89,
    leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
    pseudocode: `function isValid(s):
  match = { ')':'(', ']':'[', '}':'{' }
  stack = empty
  for ch in s:
    if ch is a closing bracket:
      if stack empty or pop(stack) != match[ch]:
        return false
    else:
      push ch onto stack
  return stack is empty`,
    statement:
      "You are given a string `s` made up only of the six bracket characters `(`, `)`, `{`, `}`, `[`, and `]`. Decide whether the brackets are arranged validly.\n\nThe string is valid when every opening bracket is closed by a bracket of the same type, brackets close in the correct order (most-recently-opened closes first), and no closing bracket appears without a matching opener. Return `true` if all of these hold and `false` otherwise.",
    description:
      "Given a string `s` of just the characters '()[]{}', determine if the brackets are validly opened and closed in the correct order and nesting.",
    examples: [
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
      { input: 's = "([)]"', output: "false" },
    ],
    constraints: ["1 ≤ s.length ≤ 10^4", "s consists only of '()[]{}'."],
    intuition:
      "Brackets must close in reverse order of opening — that's exactly LIFO. Push every opener; on a closer, the top of the stack must be its matching opener, otherwise it's invalid. A valid string ends with an empty stack.",
    approach: [
      "Map each closing bracket to its opening bracket.",
      "Scan: push opening brackets onto a stack.",
      "On a closing bracket, pop and check it matches; mismatch or empty → false.",
      "Valid iff the stack is empty at the end.",
    ],
    diagram: `graph LR
  A["( push"] --> B["[ push"] --> C["] pop matches ["] --> D[") pop matches ("] --> E["empty → true"]`,
    complexity: { time: "O(n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Stack",
        code: `def is_valid(s: str) -> bool:
    pairs = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack`,
      },
      {
        language: "typescript",
        label: "Stack",
        code: `function isValid(s: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];
  for (const ch of s) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
      },
    ],
    runner: {
      entry: "isValid",
      comparison: "deep",
      jsStarter: `function isValid(s) {
  // Return true if all brackets are correctly matched and nested.
  // TODO: implement
}`,
      jsReference: `function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
    },
    tests: [
      { name: "all types", args: ["()[]{}"], expected: true },
      { name: "mismatch", args: ["(]"], expected: false },
      { name: "bad nesting", args: ["([)]"], expected: false },
      { name: "nested ok", args: ["{[]}"], expected: true },
      { name: "unclosed", args: ["("], expected: false },
    ],
    hints: ["Closers must match the most recent opener.", "That's a stack."],
    relatedIds: [22, 32, 1249],
  },
  {
    id: 739,
    slug: "daily-temperatures",
    title: "Daily Temperatures",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Monotonic Stack"],
    companies: ["amazon", "google", "meta", "microsoft", "bloomberg"],
    frequency: 72,
    leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
    pseudocode: `function dailyTemperatures(temps):
  answer = array of zeros, length n
  stack = empty            // indices, temps decreasing
  for i from 0 to n-1:
    while stack not empty and temps[top(stack)] < temps[i]:
      j = pop(stack)
      answer[j] = i - j
    push i onto stack
  return answer`,
    statement:
      "You are given an array `temperatures` listing the daily temperature for a sequence of days. For each day, you want to know how long you must wait until a warmer day arrives.\n\nReturn an array `answer` of the same length where `answer[i]` is the number of days you have to wait after day `i` to reach a day with a strictly higher temperature. If no future day is warmer, set `answer[i]` to `0`.",
    description:
      "Given daily `temperatures`, return an array `answer` where `answer[i]` is the number of days you must wait after day i to get a warmer temperature, or 0 if there is no future warmer day.",
    examples: [
      { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
      { input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]" },
    ],
    constraints: ["1 ≤ temperatures.length ≤ 10^5", "30 ≤ temperatures[i] ≤ 100"],
    intuition:
      "Keep a stack of days that are still waiting for a warmer day, with temperatures decreasing down the stack. When today is warmer than the day on top, that day's wait is resolved — pop it and record the gap. Each day is pushed and popped once.",
    approach: [
      "Initialize answer with zeros and an empty stack of indices.",
      "For each day i, while the stack's top day is cooler than today, pop it and set answer[top] = i - top.",
      "Push i.",
      "Return answer.",
    ],
    diagram: `graph LR
  A["push cooler days"] --> B{"today warmer than top?"}
  B -- yes --> C["pop, answer = i - top"]
  C --> B
  B -- no --> D["push i"]`,
    complexity: { time: "O(n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Monotonic Stack",
        code: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    answer = [0] * len(temperatures)
    stack: list[int] = []  # indices, temps decreasing
    for i, t in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < t:
            j = stack.pop()
            answer[j] = i - j
        stack.append(i)
    return answer`,
      },
      {
        language: "typescript",
        label: "Monotonic Stack",
        code: `function dailyTemperatures(temperatures: number[]): number[] {
  const answer = new Array<number>(temperatures.length).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const j = stack.pop()!;
      answer[j] = i - j;
    }
    stack.push(i);
  }
  return answer;
}`,
      },
    ],
    runner: {
      entry: "dailyTemperatures",
      comparison: "deep",
      jsStarter: `function dailyTemperatures(temperatures) {
  // For each day, how many days until a warmer temperature?
  // TODO: implement
}`,
      jsReference: `function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const j = stack.pop();
      answer[j] = i - j;
    }
    stack.push(i);
  }
  return answer;
}`,
    },
    tests: [
      { name: "classic", args: [[73, 74, 75, 71, 69, 72, 76, 73]], expected: [1, 1, 4, 2, 1, 1, 0, 0] },
      { name: "strictly rising", args: [[30, 40, 50, 60]], expected: [1, 1, 1, 0] },
      { name: "strictly falling", args: [[60, 50, 40, 30]], expected: [0, 0, 0, 0] },
    ],
    hints: ["Keep indices waiting for a warmer day.", "Resolve them when a warmer day arrives."],
    relatedIds: [496, 503, 84],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Binary Search
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 704,
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "binary-search",
    patterns: ["Classic Binary Search"],
    companies: ["amazon", "google", "microsoft", "apple"],
    frequency: 80,
    leetcodeUrl: "https://leetcode.com/problems/binary-search/",
    pseudocode: `function search(nums, target):
  lo = 0; hi = n - 1
  while lo <= hi:
    mid = lo + (hi - lo) / 2     // floor division
    if nums[mid] == target: return mid
    if nums[mid] < target: lo = mid + 1
    else: hi = mid - 1
  return -1`,
    statement:
      "You are given a `nums` array sorted in ascending order with all-distinct values, plus an integer `target`. Search the array for `target`.\n\nReturn the index at which `target` occurs, or `-1` if it is not present. The expected running time is $O(\\log n)$, which rules out a linear scan and points to repeatedly halving the search range.",
    description:
      "Given a sorted (ascending) array of distinct integers `nums` and a `target`, return its index, or -1 if it is absent. Run in O(log n).",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10^4", "nums is sorted ascending with distinct values."],
    intuition:
      "Because the array is sorted, comparing the middle element to the target tells you which half can possibly contain it. Discard the other half each step, shrinking the search space geometrically.",
    approach: [
      "Set lo = 0, hi = n - 1.",
      "While lo ≤ hi, compute mid = lo + (hi - lo) / 2 to avoid overflow.",
      "If nums[mid] == target return mid; if smaller, search right (lo = mid + 1); else search left (hi = mid - 1).",
      "Return -1 if the loop ends.",
    ],
    diagram: `graph LR
  A["lo ... mid ... hi"] --> B{"nums[mid] vs target"}
  B -- "=" --> C["return mid"]
  B -- "<" --> D["lo = mid + 1"]
  B -- ">" --> E["hi = mid - 1"]`,
    complexity: { time: "O(log n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Iterative",
        code: `def search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
      },
      {
        language: "typescript",
        label: "Iterative",
        code: `function search(nums: number[], target: number): number {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
      },
    ],
    runner: {
      entry: "search",
      comparison: "deep",
      jsStarter: `function search(nums, target) {
  // Return the index of target in the sorted array, or -1.
  // TODO: implement
}`,
      jsReference: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    },
    tests: [
      { name: "found", args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { name: "absent", args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { name: "first", args: [[5], 5], expected: 0 },
      { name: "missing single", args: [[5], -5], expected: -1 },
    ],
    hints: ["Use lo + (hi - lo)/2 to avoid overflow.", "Discard half each iteration."],
    relatedIds: [33, 35, 374],
  },
  {
    id: 875,
    slug: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search on Answer"],
    companies: ["amazon", "google", "meta", "bloomberg", "doordash"],
    frequency: 73,
    leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/",
    pseudocode: `function minEatingSpeed(piles, h):
  lo = 1; hi = max(piles)
  while lo < hi:
    mid = (lo + hi) / 2          // floor division
    hours = sum(ceil(p / mid) for p in piles)
    if hours <= h: hi = mid      // feasible -> try slower
    else: lo = mid + 1           // too slow -> go faster
  return lo`,
    statement:
      "There are `piles` of bananas, where `piles[i]` is the number of bananas in the i-th pile, and the guards return in `h` hours. Koko picks a single constant eating speed `k` (bananas per hour) before she starts.\n\nEach hour she chooses one pile and eats up to `k` bananas from it; if the pile has fewer than `k` bananas left she finishes it and stops eating for that hour (she does not move on to another pile within the same hour). Return the smallest integer speed `k` that lets her finish every pile within `h` hours. It is always feasible because `h` is at least the number of piles.",
    description:
      "Koko has `piles` of bananas and `h` hours before the guards return. At speed k bananas/hour she eats ⌈pile / k⌉ hours per pile. Return the minimum integer speed k that lets her finish all piles within h hours.",
    examples: [
      { input: "piles = [3,6,7,11], h = 8", output: "4" },
      { input: "piles = [30,11,23,4,20], h = 5", output: "30" },
    ],
    constraints: ["1 ≤ piles.length ≤ 10^4", "piles.length ≤ h ≤ 10^9", "1 ≤ piles[i] ≤ 10^9"],
    intuition:
      "The hours needed decrease monotonically as speed increases — a perfect setup for binary searching the answer. The slowest workable speed lies between 1 and max(pile). Test the middle speed; if she finishes in time, try slower, otherwise faster.",
    approach: [
      "Binary search k over [1, max(piles)].",
      "For a candidate k, total hours = Σ ⌈pile / k⌉.",
      "If hours ≤ h, k is feasible — record it and search slower (hi = mid - 1).",
      "Otherwise search faster (lo = mid + 1). Return the smallest feasible k.",
    ],
    diagram: `graph LR
  A["speed range [1, max]"] --> B{"hours(mid) ≤ h?"}
  B -- yes --> C["try slower"]
  B -- no --> D["need faster"]`,
    complexity: { time: "O(n log m)", space: "O(1)", note: "m = max pile size." },
    solutions: [
      {
        language: "python",
        label: "Search on Answer",
        code: `import math

def min_eating_speed(piles: list[int], h: int) -> int:
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        hours = sum(math.ceil(p / mid) for p in piles)
        if hours <= h:
            hi = mid
        else:
            lo = mid + 1
    return lo`,
      },
      {
        language: "typescript",
        label: "Search on Answer",
        code: `function minEatingSpeed(piles: number[], h: number): number {
  let lo = 1, hi = Math.max(...piles);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    const hours = piles.reduce((s, p) => s + Math.ceil(p / mid), 0);
    if (hours <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
    ],
    runner: {
      entry: "minEatingSpeed",
      comparison: "deep",
      jsStarter: `function minEatingSpeed(piles, h) {
  // Return the minimum integer speed to finish within h hours.
  // TODO: implement
}`,
      jsReference: `function minEatingSpeed(piles, h) {
  let lo = 1, hi = Math.max(...piles);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    const hours = piles.reduce((s, p) => s + Math.ceil(p / mid), 0);
    if (hours <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
    },
    tests: [
      { name: "classic", args: [[3, 6, 7, 11], 8], expected: 4 },
      { name: "tight", args: [[30, 11, 23, 4, 20], 5], expected: 30 },
      { name: "loose", args: [[30, 11, 23, 4, 20], 6], expected: 23 },
    ],
    hints: ["Hours needed is monotonic in speed.", "Binary search the smallest feasible speed."],
    relatedIds: [1011, 410, 704],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Linked List
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 206,
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "linked-list",
    patterns: ["In-place Reversal", "Pointers"],
    companies: ["amazon", "meta", "microsoft", "apple", "google", "adobe"],
    frequency: 91,
    leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
    pseudocode: `function reverseList(head):
  prev = null
  while head != null:
    next = head.next       // save the rest
    head.next = prev       // flip the pointer
    prev = head            // advance prev
    head = next            // advance head
  return prev`,
    statement:
      "You are given the `head` of a singly linked list. Reverse the list so that the node order is flipped end to end, and return the head of the reversed list.\n\nEvery node's `next` pointer should now point to what was previously its predecessor, the old tail becomes the new head, and the old head becomes the new tail (its `next` becomes null). An empty list or a single-node list is returned unchanged. The classic approach rewires pointers in place in one pass using $O(1)$ extra space.\n\n*In this repo's playground the list is represented as a plain array, e.g. `[1,2,3]` stands for 1 → 2 → 3, and you return the reversed array.*",
    description:
      "Reverse a singly linked list and return the new head. The playground uses array form for the list (e.g. `[1,2,3]` represents 1→2→3).",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = []", output: "[]" },
    ],
    constraints: ["0 ≤ list length ≤ 5000", "-5000 ≤ Node.val ≤ 5000"],
    intuition:
      "Walk the list once, flipping each node's `next` to point backward. Keep three references — previous, current, and the saved next — so you never lose the rest of the list while rewiring a pointer.",
    approach: [
      "Set prev = null, curr = head.",
      "While curr: save next = curr.next, point curr.next = prev, advance prev = curr, curr = next.",
      "When curr is null, prev is the new head.",
    ],
    diagram: `graph LR
  N1["1"] -->|was| N2["2"] -->|was| N3["3"]
  R3["3"] -->|now| R2["2"] -->|now| R1["1"]`,
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Iterative",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def reverse_list(head: ListNode | None) -> ListNode | None:
    prev = None
    while head:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt
    return prev`,
      },
      {
        language: "typescript",
        label: "Iterative",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}`,
      },
    ],
    runner: {
      entry: "reverseList",
      comparison: "deep",
      jsStarter: `function reverseList(values) {
  // 'values' is the list as an array, e.g. [1,2,3]. Return the reversed array.
  // Tip: build nodes if you like, or operate on the array directly.
  // TODO: implement
}`,
      jsReference: `function reverseList(values) {
  // Build a real singly linked list from the array.
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  // Classic in-place reversal.
  let prev = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  // Serialize back to an array for grading.
  const out = [];
  for (let n = prev; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "five nodes", args: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { name: "two nodes", args: [[1, 2]], expected: [2, 1] },
      { name: "empty", args: [[]], expected: [] },
      { name: "single", args: [[7]], expected: [7] },
    ],
    hints: ["Track previous, current, and next.", "Flip next, then step forward."],
    relatedIds: [92, 25, 234],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Trees
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 104,
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "google", "microsoft", "apple", "linkedin"],
    frequency: 78,
    leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    pseudocode: `function maxDepth(node):
  if node == null:
    return 0
  return 1 + max(maxDepth(node.left), maxDepth(node.right))`,
    statement:
      "You are given the `root` of a binary tree. Return its maximum depth.\n\nThe maximum depth is the number of nodes along the longest path from the root down to the farthest leaf node. An empty tree has depth `0`, and a tree consisting of a single node has depth `1`.\n\n*In this repo's playground the tree is supplied as a level-order array using `null` for absent children (LeetCode's serialization format), and you return the depth as an integer.*",
    description:
      "Return the maximum depth of a binary tree (the number of nodes along the longest root-to-leaf path). The playground encodes the tree as a level-order array with `null` for missing children.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    constraints: ["0 ≤ number of nodes ≤ 10^4", "-100 ≤ Node.val ≤ 100"],
    intuition:
      "A tree's depth is one more than the deeper of its two subtrees. That recurrence is the entire solution: recurse left and right, take the max, add one. An empty subtree contributes depth 0.",
    approach: [
      "If the node is null, return 0.",
      "Recursively compute the depth of the left and right children.",
      "Return 1 + max(left, right).",
    ],
    diagram: `graph TD
  A["3"] --> B["9"]
  A --> C["20"]
  C --> D["15"]
  C --> E["7"]`,
    complexity: { time: "O(n)", space: "O(h)", note: "h = tree height (recursion stack)." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root: TreeNode | None) -> int:
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      },
    ],
    runner: {
      entry: "maxDepth",
      comparison: "deep",
      jsStarter: `function maxDepth(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree (helper provided in the reference) and return its depth.
}`,
      jsReference: `function maxDepth(level) {
  // Build a binary tree from a LeetCode level-order array.
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const queue = [root];
    let i = 1;
    while (queue.length && i < arr.length) {
      const node = queue.shift();
      if (i < arr.length) {
        const lv = arr[i++];
        if (lv !== null) { node.left = { val: lv, left: null, right: null }; queue.push(node.left); }
      }
      if (i < arr.length) {
        const rv = arr[i++];
        if (rv !== null) { node.right = { val: rv, left: null, right: null }; queue.push(node.right); }
      }
    }
    return root;
  }
  const depth = (n) => (n ? 1 + Math.max(depth(n.left), depth(n.right)) : 0);
  return depth(build(level));
}`,
    },
    tests: [
      { name: "balanced-ish", args: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
      { name: "right lean", args: [[1, null, 2]], expected: 2 },
      { name: "empty", args: [[]], expected: 0 },
      { name: "single", args: [[0]], expected: 1 },
    ],
    hints: ["Depth = 1 + max(left, right).", "Base case: null → 0."],
    relatedIds: [110, 111, 543],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Tries
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 208,
    slug: "implement-trie-prefix-tree",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    category: "tries",
    patterns: ["Trie", "Design"],
    companies: ["amazon", "google", "microsoft", "meta", "bloomberg"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/",
    pseudocode: `class Trie:
  root = new node            // node has children map + isEnd flag

  insert(word):
    node = root
    for ch in word:
      if ch not in node.children:
        node.children[ch] = new node
      node = node.children[ch]
    node.isEnd = true

  walk(s):                   // return last node or null
    node = root
    for ch in s:
      if ch not in node.children: return null
      node = node.children[ch]
    return node

  search(word):
    node = walk(word)
    return node != null and node.isEnd

  startsWith(prefix):
    return walk(prefix) != null`,
    statement:
      "Design and implement a trie (prefix tree), a data structure for storing and retrieving strings by their characters. Your `Trie` class must support three operations:\n\n- `insert(word)` — add `word` to the trie.\n- `search(word)` — return `true` if `word` was previously inserted as a complete word, and `false` otherwise.\n- `startsWith(prefix)` — return `true` if any previously inserted word begins with `prefix`.\n\nThe key distinction is that `search` requires a full-word match (an inserted word terminates exactly there), whereas `startsWith` only needs the prefix path to exist.\n\n*In this repo's playground you are handed an `ops` list and an `args` list and return the array of results, with `null` for the void operations.*",
    description:
      "Implement a trie supporting `insert(word)`, `search(word)` (exact match), and `startsWith(prefix)`. The playground replays an operation list and grades the returned results (`null` for void operations).",
    examples: [
      {
        input: 'ops = ["Trie","insert","search","search","startsWith","insert","search"], args = [[],["apple"],["apple"],["app"],["app"],["app"],["app"]]',
        output: "[null,null,true,false,true,null,true]",
      },
    ],
    constraints: ["1 ≤ word.length, prefix.length ≤ 2000", "Lowercase English letters", "Up to 3·10^4 calls total."],
    intuition:
      "Store words as paths down a tree of character nodes. Shared prefixes share nodes, so lookups cost only the length of the query. A boolean end-flag marks where a complete word terminates, distinguishing `search` from `startsWith`.",
    approach: [
      "Each node holds a map of child characters and an `isEnd` flag.",
      "insert: walk/create nodes for each character, mark the final node isEnd.",
      "search: walk the characters; succeed only if the path exists and ends on isEnd.",
      "startsWith: same walk but success only requires the path to exist.",
    ],
    diagram: `graph TD
  R["root"] --> A["a"] --> P1["p"] --> P2["p"]
  P2 --> L["l (app·end)"]
  L --> E["e (apple·end)"]`,
    complexity: { time: "O(L) per op", space: "O(total chars)", note: "L = word/prefix length." },
    solutions: [
      {
        language: "python",
        label: "Nested dict",
        code: `class Trie:
    def __init__(self):
        self.root: dict = {}

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node["$"] = True  # word end

    def _find(self, s: str) -> dict | None:
        node = self.root
        for ch in s:
            if ch not in node:
                return None
            node = node[ch]
        return node

    def search(self, word: str) -> bool:
        node = self._find(word)
        return bool(node and node.get("$"))

    def startsWith(self, prefix: str) -> bool:
        return self._find(prefix) is not None`,
      },
      {
        language: "typescript",
        label: "Nested map",
        code: `class Trie {
  private root: Record<string, any> = {};

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) node = node[ch] ??= {};
    node.$ = true;
  }

  private find(s: string): Record<string, any> | null {
    let node = this.root;
    for (const ch of s) {
      if (!node[ch]) return null;
      node = node[ch];
    }
    return node;
  }

  search(word: string): boolean {
    const node = this.find(word);
    return !!(node && node.$);
  }

  startsWith(prefix: string): boolean {
    return this.find(prefix) !== null;
  }
}`,
      },
    ],
    runner: {
      entry: "runTrie",
      comparison: "deep",
      jsStarter: `function runTrie(ops, args) {
  // Replay the operations and return an array of results.
  // "Trie"/"insert" return null; "search"/"startsWith" return booleans.
  // TODO: implement the Trie and the driver loop.
}`,
      jsReference: `function runTrie(ops, args) {
  class Trie {
    constructor() { this.root = {}; }
    insert(w) { let n = this.root; for (const c of w) n = (n[c] ??= {}); n.$ = true; }
    find(s) { let n = this.root; for (const c of s) { if (!n[c]) return null; n = n[c]; } return n; }
    search(w) { const n = this.find(w); return !!(n && n.$); }
    startsWith(p) { return this.find(p) !== null; }
  }
  const out = [];
  let trie = null;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i] || [];
    if (op === "Trie") { trie = new Trie(); out.push(null); }
    else if (op === "insert") { trie.insert(a[0]); out.push(null); }
    else if (op === "search") out.push(trie.search(a[0]));
    else if (op === "startsWith") out.push(trie.startsWith(a[0]));
  }
  return out;
}`,
    },
    tests: [
      {
        name: "apple / app",
        args: [
          ["Trie", "insert", "search", "search", "startsWith", "insert", "search"],
          [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]],
        ],
        expected: [null, null, true, false, true, null, true],
      },
      {
        name: "prefix only",
        args: [
          ["Trie", "insert", "startsWith", "search"],
          [[], ["car"], ["ca"], ["ca"]],
        ],
        expected: [null, null, true, false],
      },
    ],
    hints: ["One node per character.", "Mark word endings to separate search from startsWith."],
    relatedIds: [211, 212, 14],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Heap / Priority Queue
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 215,
    slug: "kth-largest-element-in-an-array",
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Heap", "Quickselect"],
    companies: ["amazon", "meta", "google", "microsoft", "apple", "bloomberg"],
    frequency: 83,
    leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    pseudocode: `function findKthLargest(nums, k):
  minHeap = empty
  for x in nums:
    push x onto minHeap
    if size(minHeap) > k:
      pop smallest from minHeap
  return top of minHeap        // the k-th largest`,
    statement:
      "Given an integer array `nums` and an integer `k`, return the k-th largest element in the array.\n\nThis is the k-th largest element in sorted order, counting from the largest — not the k-th distinct element. Duplicates count individually, so for `k = 2` the answer is the second value you would see scanning the sorted array from the top, even if it equals the maximum. A strong solution beats the obvious full sort, for example with a size-`k` heap ($O(n \\log k)$) or Quickselect ($O(n)$ average).",
    description:
      "Return the kth largest element in an unsorted array `nums`. This is the kth largest in sorted order, not necessarily distinct.",
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
      { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
    ],
    constraints: ["1 ≤ k ≤ nums.length ≤ 10^5", "-10^4 ≤ nums[i] ≤ 10^4"],
    intuition:
      "Keep a min-heap of the k largest values seen so far. Once it exceeds size k, pop the smallest — whatever survives at the root after the full pass is exactly the kth largest. (Quickselect achieves O(n) average if you want to beat O(n log k).)",
    approach: [
      "Push each number onto a min-heap.",
      "Whenever the heap grows beyond k, pop the minimum.",
      "After processing all numbers, the heap's root is the kth largest.",
    ],
    diagram: `graph LR
  A["stream of nums"] --> H["min-heap size k"]
  H -->|"size > k"| P["pop smallest"]
  H --> R["root = kth largest"]`,
    complexity: { time: "O(n log k)", space: "O(k)", note: "Quickselect: O(n) average, O(1) extra." },
    solutions: [
      {
        language: "python",
        label: "Min-heap size k",
        code: `import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    heap: list[int] = []
    for x in nums:
        heapq.heappush(heap, x)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
      },
      {
        language: "typescript",
        label: "Sort (clear) / heap (optimal)",
        code: `function findKthLargest(nums: number[], k: number): number {
  // Clear O(n log n). For O(n log k) use a size-k min-heap.
  return [...nums].sort((a, b) => b - a)[k - 1];
}`,
      },
    ],
    runner: {
      entry: "findKthLargest",
      comparison: "deep",
      jsStarter: `function findKthLargest(nums, k) {
  // Return the kth largest element.
  // TODO: implement
}`,
      jsReference: `function findKthLargest(nums, k) {
  return [...nums].sort((a, b) => b - a)[k - 1];
}`,
    },
    tests: [
      { name: "k=2", args: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
      { name: "with dups", args: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 },
      { name: "single", args: [[1], 1], expected: 1 },
      { name: "largest", args: [[7, 10, 4, 3, 20, 15], 1], expected: 20 },
    ],
    hints: ["A size-k min-heap keeps the k largest.", "Quickselect gives O(n) average."],
    relatedIds: [347, 703, 973],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Backtracking
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 78,
    slug: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    category: "backtracking",
    patterns: ["Backtracking", "Decision Tree"],
    companies: ["amazon", "meta", "google", "apple", "microsoft", "uber"],
    frequency: 77,
    leetcodeUrl: "https://leetcode.com/problems/subsets/",
    pseudocode: `function subsets(nums):
  res = []
  backtrack(start, path):
    res.append(copy of path)        // record this subset
    for i from start to n-1:
      path.append(nums[i])          // choose
      backtrack(i + 1, path)        // explore
      path.pop()                    // un-choose
  backtrack(0, [])
  return res`,
    statement:
      "You are given an integer array `nums` whose elements are all distinct. Return every possible subset (the power set).\n\nThe power set includes the empty subset and the full array itself, giving $2^n$ subsets for an array of length `n`. The result must not contain any duplicate subset, and you may return the subsets — and the elements within each subset — in any order.",
    description:
      "Given an array `nums` of distinct integers, return all possible subsets (the power set). The solution set must not contain duplicates; any order is accepted.",
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]", output: "[[],[0]]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10", "-10 ≤ nums[i] ≤ 10", "All numbers are unique."],
    intuition:
      "Every element is either in a subset or not — that's a binary decision tree of depth n with 2ⁿ leaves. Backtracking walks the tree: record the current path at each node, then for each later index, include it, recurse, and remove it (undo) before trying the next.",
    approach: [
      "Start a recursion with a start index and an empty path.",
      "At each call, record a copy of the current path as a subset.",
      "For each index i ≥ start: append nums[i], recurse from i+1, then pop to backtrack.",
      "Return all recorded subsets.",
    ],
    diagram: `graph TD
  Root["[]"] --> A["[1]"]
  Root --> B["[2]"]
  Root --> C["[3]"]
  A --> AB["[1,2]"]
  A --> AC["[1,3]"]
  AB --> ABC["[1,2,3]"]`,
    complexity: { time: "O(n·2^n)", space: "O(n)", note: "2^n subsets, each up to length n; recursion depth n." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def subsets(nums: list[int]) -> list[list[int]]:
    res: list[list[int]] = []

    def backtrack(start: int, path: list[int]) -> None:
        res.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function subsets(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  const backtrack = (start: number): void => {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  };
  backtrack(0);
  return res;
}`,
      },
    ],
    runner: {
      entry: "subsets",
      comparison: "canonical",
      jsStarter: `function subsets(nums) {
  // Return the power set (all subsets), in any order.
  // TODO: implement
}`,
      jsReference: `function subsets(nums) {
  const res = [];
  const path = [];
  const backtrack = (start) => {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  };
  backtrack(0);
  return res;
}`,
    },
    tests: [
      { name: "three", args: [[1, 2, 3]], expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]] },
      { name: "single", args: [[0]], expected: [[], [0]] },
      { name: "two", args: [[4, 5]], expected: [[], [4], [5], [4, 5]] },
    ],
    hints: ["Each element: take it or skip it.", "Record the path at every node, then undo."],
    relatedIds: [90, 77, 46],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Graphs
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 200,
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["DFS", "Flood Fill", "Grid"],
    companies: ["amazon", "meta", "google", "microsoft", "bloomberg", "uber"],
    frequency: 87,
    leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
    pseudocode: `function numIslands(grid):
  count = 0
  for r in rows, c in cols:
    if grid[r][c] == '1':
      count = count + 1
      sink(r, c)
  return count

function sink(r, c):
  if out of bounds or grid[r][c] != '1': return
  grid[r][c] = '0'                 // mark visited
  sink(r+1, c); sink(r-1, c)
  sink(r, c+1); sink(r, c-1)`,
    statement:
      "You are given an `m × n` grid whose cells are either `'1'` (land) or `'0'` (water). Count the number of islands.\n\nAn island is a maximal group of land cells connected horizontally or vertically (diagonal adjacency does not connect cells), and you may assume the grid is completely surrounded by water around its edges. Return how many separate islands the grid contains.",
    description:
      'Given an `m × n` grid of "1" (land) and "0" (water), return the number of islands. An island is land connected 4-directionally and surrounded by water.',
    examples: [
      {
        input: 'grid = [["1","1","0"],["1","0","0"],["0","0","1"]]',
        output: "2",
      },
    ],
    constraints: ["1 ≤ m, n ≤ 300", 'grid[i][j] is "0" or "1".'],
    intuition:
      "Each island is a connected component. Scan the grid; the first land cell of an unvisited island triggers a flood fill (DFS/BFS) that sinks the whole island so it's counted once. The number of flood fills you start equals the island count.",
    approach: [
      "Initialize count = 0.",
      "For each cell: if it is land ('1'), increment count and flood-fill from it.",
      "Flood fill marks the cell as visited ('0') and recurses into its 4 neighbors that are land.",
      "Return count.",
    ],
    diagram: `graph TD
  S["scan grid"] --> F{"cell == '1'?"}
  F -- yes --> C["count++ and DFS sink island"]
  F -- no --> N["skip"]
  C --> S
  N --> S`,
    complexity: { time: "O(m·n)", space: "O(m·n)", note: "Recursion stack in the worst case." },
    solutions: [
      {
        language: "python",
        label: "DFS Flood Fill",
        code: `def num_islands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])

    def sink(r: int, c: int) -> None:
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != "1":
            return
        grid[r][c] = "0"
        sink(r + 1, c); sink(r - 1, c)
        sink(r, c + 1); sink(r, c - 1)

    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count += 1
                sink(r, c)
    return count`,
      },
      {
        language: "typescript",
        label: "DFS Flood Fill",
        code: `function numIslands(grid: string[][]): number {
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const sink = (r: number, c: number): void => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    sink(r + 1, c); sink(r - 1, c);
    sink(r, c + 1); sink(r, c - 1);
  };
  let count = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === "1") { count++; sink(r, c); }
  return count;
}`,
      },
    ],
    runner: {
      entry: "numIslands",
      comparison: "deep",
      jsStarter: `function numIslands(grid) {
  // grid is a 2-D array of "1"/"0" strings. Return the island count.
  // TODO: implement
}`,
      jsReference: `function numIslands(input) {
  // Clone so repeated runs don't see a sunk grid.
  const grid = input.map((row) => row.slice());
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const sink = (r, c) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1);
  };
  let count = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === "1") { count++; sink(r, c); }
  return count;
}`,
    },
    tests: [
      {
        name: "one island",
        args: [[["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]],
        expected: 1,
      },
      {
        name: "three islands",
        args: [[["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]]],
        expected: 3,
      },
      { name: "all water", args: [[["0", "0"], ["0", "0"]]], expected: 0 },
    ],
    hints: ["Count connected components.", "Sink each island so it's only counted once."],
    relatedIds: [695, 130, 417],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Advanced Graphs
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 743,
    slug: "network-delay-time",
    title: "Network Delay Time",
    difficulty: "Medium",
    category: "advanced-graphs",
    patterns: ["Dijkstra", "Shortest Path"],
    companies: ["amazon", "google", "uber", "snowflake"],
    frequency: 66,
    leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
    pseudocode: `function networkDelayTime(times, n, k):
  adj = adjacency list from times
  dist = map every node -> infinity
  dist[k] = 0
  pq = min-heap holding (0, k)
  while pq not empty:
    (d, u) = pop smallest by distance
    if d > dist[u]: continue
    for (v, w) in adj[u]:
      if d + w < dist[v]:
        dist[v] = d + w
        push (dist[v], v) onto pq
  ans = max(dist[node] for all nodes)
  return ans if ans < infinity else -1`,
    statement:
      "There are `n` network nodes labelled from `1` to `n`. You are given a list `times` of directed, weighted edges where `times[i] = [u, v, w]` means a signal travels from node `u` to node `v` taking `w` units of time. A signal is sent simultaneously from a starting node `k`.\n\nReturn the minimum time needed for every one of the `n` nodes to receive the signal. If one or more nodes can never be reached from `k`, return `-1`. Equivalently, this is the largest of the shortest-path distances from `k` to all nodes.",
    description:
      "A signal starts at node `k` in a directed weighted graph given as `times[i] = [u, v, w]` (travel time w from u to v). Return the time for all `n` nodes to receive it, or -1 if some node is unreachable.",
    examples: [
      { input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2", output: "2" },
      { input: "times = [[1,2,1]], n = 2, k = 1", output: "1" },
    ],
    constraints: ["1 ≤ k ≤ n ≤ 100", "1 ≤ times.length ≤ 6000", "0 ≤ w ≤ 100"],
    intuition:
      "The time for everyone to receive the signal is the longest shortest-path from the source. Run Dijkstra from k to get each node's earliest arrival; the answer is the maximum of those, unless any node stays at infinity (unreachable).",
    approach: [
      "Build an adjacency list from times.",
      "Dijkstra from k: repeatedly settle the closest unsettled node and relax its edges.",
      "Take the maximum settled distance over all nodes.",
      "Return it, or -1 if any node is still unreachable.",
    ],
    diagram: `graph LR
  K["k = 2"] -->|1| A["1"]
  K -->|1| B["3"]
  B -->|1| C["4"]
  note["answer = max shortest-path = 2"]`,
    complexity: { time: "O(E log V)", space: "O(V + E)" },
    solutions: [
      {
        language: "python",
        label: "Dijkstra",
        code: `import heapq

def network_delay_time(times: list[list[int]], n: int, k: int) -> int:
    adj: dict[int, list[tuple[int, int]]] = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        adj[u].append((v, w))
    dist: dict[int, int] = {}
    pq = [(0, k)]
    while pq:
        d, u = heapq.heappop(pq)
        if u in dist:
            continue
        dist[u] = d
        for v, w in adj[u]:
            if v not in dist:
                heapq.heappush(pq, (d + w, v))
    return max(dist.values()) if len(dist) == n else -1`,
      },
      {
        language: "typescript",
        label: "Dijkstra",
        code: `function networkDelayTime(times: number[][], n: number, k: number): number {
  const adj: number[][][] = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) adj[u].push([v, w]);
  const dist = new Array<number>(n + 1).fill(Infinity);
  dist[k] = 0;
  const pq: [number, number][] = [[0, k]];
  while (pq.length) {
    let mi = 0;
    for (let i = 1; i < pq.length; i++) if (pq[i][0] < pq[mi][0]) mi = i;
    const [d, u] = pq.splice(mi, 1)[0];
    if (d > dist[u]) continue;
    for (const [v, w] of adj[u])
      if (d + w < dist[v]) { dist[v] = d + w; pq.push([dist[v], v]); }
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) ans = Math.max(ans, dist[i]);
  return ans === Infinity ? -1 : ans;
}`,
      },
    ],
    runner: {
      entry: "networkDelayTime",
      comparison: "deep",
      jsStarter: `function networkDelayTime(times, n, k) {
  // Return the time for all nodes to receive the signal, or -1.
  // TODO: implement
}`,
      jsReference: `function networkDelayTime(times, n, k) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) adj[u].push([v, w]);
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const pq = [[0, k]];
  while (pq.length) {
    let mi = 0;
    for (let i = 1; i < pq.length; i++) if (pq[i][0] < pq[mi][0]) mi = i;
    const [d, u] = pq.splice(mi, 1)[0];
    if (d > dist[u]) continue;
    for (const [v, w] of adj[u])
      if (d + w < dist[v]) { dist[v] = d + w; pq.push([dist[v], v]); }
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) ans = Math.max(ans, dist[i]);
  return ans === Infinity ? -1 : ans;
}`,
    },
    tests: [
      { name: "reachable", args: [[[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2], expected: 2 },
      { name: "single edge", args: [[[1, 2, 1]], 2, 1], expected: 1 },
      { name: "unreachable", args: [[[1, 2, 1]], 2, 2], expected: -1 },
    ],
    hints: ["Shortest paths from the source.", "Answer is the max shortest-path; -1 if unreachable."],
    relatedIds: [787, 1514, 1631],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 1-D Dynamic Programming
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 70,
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "dp-1d",
    patterns: ["Fibonacci DP"],
    companies: ["amazon", "google", "apple", "adobe"],
    frequency: 82,
    leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
    pseudocode: `function climbStairs(n):
  prev2 = 1; prev1 = 1
  for i from 2 to n:
    curr = prev1 + prev2
    prev2 = prev1
    prev1 = curr
  return prev1`,
    statement:
      "You are climbing a staircase that takes `n` steps to reach the top. On each move you may climb either `1` step or `2` steps.\n\nReturn the number of distinct ordered sequences of moves that bring you exactly to the top. Two ways are different if at some point one takes a single step where the other takes a double. The count grows like the Fibonacci sequence.",
    description:
      "You climb a staircase of `n` steps, taking 1 or 2 steps at a time. Return the number of distinct ways to reach the top.",
    examples: [
      { input: "n = 2", output: "2", explanation: "1+1 or 2." },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, or 2+1." },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    intuition:
      "To stand on step n you arrived either from step n-1 (a 1-step) or step n-2 (a 2-step), so ways(n) = ways(n-1) + ways(n-2) — the Fibonacci sequence. Only the last two values matter, so two rolling variables suffice.",
    approach: [
      "Base: 1 way to stand on step 0, 1 way on step 1.",
      "Iterate i from 2 to n, computing curr = prev1 + prev2.",
      "Roll the two previous values forward.",
      "Return the final value.",
    ],
    diagram: `graph LR
  A["ways(n-2)"] --> C["ways(n)"]
  B["ways(n-1)"] --> C
  C --> D["= sum of the two below"]`,
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Rolling DP",
        code: `def climb_stairs(n: int) -> int:
    prev2, prev1 = 1, 1
    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev1 + prev2
    return prev1`,
      },
      {
        language: "typescript",
        label: "Rolling DP",
        code: `function climbStairs(n: number): number {
  let prev2 = 1, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    [prev2, prev1] = [prev1, prev1 + prev2];
  }
  return prev1;
}`,
      },
    ],
    runner: {
      entry: "climbStairs",
      comparison: "deep",
      jsStarter: `function climbStairs(n) {
  // Count distinct ways to climb n steps (1 or 2 at a time).
  // TODO: implement
}`,
      jsReference: `function climbStairs(n) {
  let prev2 = 1, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    [prev2, prev1] = [prev1, prev1 + prev2];
  }
  return prev1;
}`,
    },
    tests: [
      { name: "two", args: [2], expected: 2 },
      { name: "three", args: [3], expected: 3 },
      { name: "five", args: [5], expected: 8 },
      { name: "one", args: [1], expected: 1 },
    ],
    hints: ["How can you reach step n?", "ways(n) = ways(n-1) + ways(n-2)."],
    relatedIds: [746, 198, 509],
  },
  {
    id: 198,
    slug: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Linear DP", "Take/Skip"],
    companies: ["amazon", "google", "microsoft", "linkedin"],
    frequency: 79,
    leetcodeUrl: "https://leetcode.com/problems/house-robber/",
    pseudocode: `function rob(nums):
  rob = 0; skip = 0
  for v in nums:
    newRob = skip + v          // rob this house
    skip = max(rob, skip)      // best if we skip it
    rob = newRob
  return max(rob, skip)`,
    statement:
      "Houses along a street each hold some money, given by the array `nums`. A security system links every pair of directly adjacent houses and triggers an alarm if both are robbed on the same night.\n\nReturn the maximum total amount of money you can rob tonight without ever robbing two adjacent houses. You are free to skip any houses you like; the only restriction is that no two chosen houses may be next to each other.",
    description:
      "Houses in a row hold `nums[i]` money. You cannot rob two adjacent houses (alarms link them). Return the maximum amount you can rob.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob houses 1 and 3 (1 + 3)." },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob houses 1, 3, 5 (2 + 9 + 1)." },
    ],
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 400"],
    intuition:
      "At each house you either skip it (keep the best up to the previous house) or rob it (its value plus the best from two houses back). best(i) = max(best(i-1), nums[i] + best(i-2)). Two rolling totals capture the whole recurrence.",
    approach: [
      "Track rob = best including the current house, skip = best excluding it (both start at 0).",
      "For each value v: newRob = skip + v, newSkip = max(rob, skip).",
      "Advance rob, skip.",
      "Return max(rob, skip).",
    ],
    diagram: `graph LR
  P2["best(i-2)"] -->|+ nums[i]| R["rob i"]
  P1["best(i-1)"] --> S["skip i"]
  R --> M["best(i) = max(rob, skip)"]
  S --> M`,
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Rolling DP",
        code: `def rob(nums: list[int]) -> int:
    rob_cur = skip = 0
    for v in nums:
        rob_cur, skip = skip + v, max(rob_cur, skip)
    return max(rob_cur, skip)`,
      },
      {
        language: "typescript",
        label: "Rolling DP",
        code: `function rob(nums: number[]): number {
  let robCur = 0, skip = 0;
  for (const v of nums) {
    [robCur, skip] = [skip + v, Math.max(robCur, skip)];
  }
  return Math.max(robCur, skip);
}`,
      },
    ],
    runner: {
      entry: "rob",
      comparison: "deep",
      jsStarter: `function rob(nums) {
  // Max money without robbing two adjacent houses.
  // TODO: implement
}`,
      jsReference: `function rob(nums) {
  let robCur = 0, skip = 0;
  for (const v of nums) {
    [robCur, skip] = [skip + v, Math.max(robCur, skip)];
  }
  return Math.max(robCur, skip);
}`,
    },
    tests: [
      { name: "small", args: [[1, 2, 3, 1]], expected: 4 },
      { name: "larger", args: [[2, 7, 9, 3, 1]], expected: 12 },
      { name: "single", args: [[5]], expected: 5 },
      { name: "adjacent peaks", args: [[2, 1, 1, 2]], expected: 4 },
    ],
    hints: ["Rob or skip each house.", "best(i) = max(best(i-1), nums[i] + best(i-2))."],
    relatedIds: [213, 337, 740],
  },
  {
    id: 322,
    slug: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "dp-1d",
    patterns: ["Unbounded Knapsack", "Bottom-up DP"],
    companies: ["amazon", "google", "meta", "uber", "bloomberg"],
    frequency: 84,
    leetcodeUrl: "https://leetcode.com/problems/coin-change/",
    pseudocode: `function coinChange(coins, amount):
  dp = array[0..amount] filled with INF
  dp[0] = 0
  for a from 1 to amount:
    for coin in coins:
      if coin <= a:
        dp[a] = min(dp[a], dp[a - coin] + 1)
  return dp[amount] if dp[amount] != INF else -1`,
    statement:
      "You are given an array `coins` of distinct coin denominations and an integer `amount` of money. You have an unlimited supply of each kind of coin.\n\nReturn the fewest number of coins whose values add up exactly to `amount`. If that total cannot be formed by any combination of the coins, return `-1`. When `amount` is `0`, the answer is `0` because no coins are needed.",
    description:
      "Given coin denominations `coins` and a target `amount`, return the fewest coins that sum to the amount, or -1 if it cannot be made. You have unlimited coins of each type.",
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1." },
      { input: "coins = [2], amount = 3", output: "-1" },
    ],
    constraints: ["1 ≤ coins.length ≤ 12", "1 ≤ coins[i] ≤ 2^31 - 1", "0 ≤ amount ≤ 10^4"],
    intuition:
      "Build the answer for every sub-amount from 0 up to the target. The minimum coins for amount a is 1 + the smallest dp[a - coin] over all coins that fit. dp[0] = 0; anything still unreachable stays 'infinity' and becomes -1.",
    approach: [
      "Create dp[0..amount] filled with amount+1 (a sentinel ∞), set dp[0] = 0.",
      "For each sub-amount a, try every coin ≤ a: dp[a] = min(dp[a], dp[a - coin] + 1).",
      "If dp[amount] is still the sentinel, return -1, else dp[amount].",
    ],
    diagram: `graph LR
  Z["dp[0]=0"] --> A["dp[a] = min over coins"]
  A --> B["dp[a-coin] + 1"]
  B --> C["dp[amount] or -1"]`,
    complexity: { time: "O(amount · coins)", space: "O(amount)" },
    solutions: [
      {
        language: "python",
        label: "Bottom-up DP",
        code: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for coin in coins:
            if coin <= a:
                dp[a] = min(dp[a], dp[a - coin] + 1)
    return dp[amount] if dp[amount] <= amount else -1`,
      },
      {
        language: "typescript",
        label: "Bottom-up DP",
        code: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array<number>(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}`,
      },
    ],
    runner: {
      entry: "coinChange",
      comparison: "deep",
      jsStarter: `function coinChange(coins, amount) {
  // Fewest coins to make amount, or -1.
  // TODO: implement
}`,
      jsReference: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}`,
    },
    tests: [
      { name: "makeable", args: [[1, 2, 5], 11], expected: 3 },
      { name: "impossible", args: [[2], 3], expected: -1 },
      { name: "zero amount", args: [[1], 0], expected: 0 },
      { name: "exact", args: [[2, 5, 10, 1], 27], expected: 4 },
    ],
    hints: ["Solve for every amount up to the target.", "dp[a] = min(dp[a-coin]) + 1."],
    relatedIds: [518, 983, 279],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2-D Dynamic Programming
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 62,
    slug: "unique-paths",
    title: "Unique Paths",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Grid DP", "Combinatorics"],
    companies: ["amazon", "google", "bloomberg", "apple"],
    frequency: 71,
    leetcodeUrl: "https://leetcode.com/problems/unique-paths/",
    pseudocode: `function uniquePaths(m, n):
  row = array of n ones
  repeat (m - 1) times:
    for c from 1 to n-1:
      row[c] = row[c] + row[c-1]
  return row[n-1]`,
    statement:
      "A robot starts in the top-left cell of an `m × n` grid. At each step it can move only one cell to the right or one cell down, and it wants to reach the bottom-right cell.\n\nReturn the number of distinct paths the robot can take from the start corner to the destination corner. The answer is guaranteed to fit in a 32-bit integer. (Combinatorially this is choosing which of the total moves are 'down', but it also has a clean grid-DP solution.)",
    description:
      "A robot at the top-left of an `m × n` grid can only move right or down. Return the number of distinct paths to the bottom-right corner.",
    examples: [
      { input: "m = 3, n = 7", output: "28" },
      { input: "m = 3, n = 2", output: "3" },
    ],
    constraints: ["1 ≤ m, n ≤ 100", "The answer fits in a 32-bit integer."],
    intuition:
      "You reach a cell only from the cell above or the cell to its left, so paths(r,c) = paths(r-1,c) + paths(r,c-1). The top row and left column each have exactly one path. A single rolling row collapses the table to O(n) space.",
    approach: [
      "Initialize a row of n ones (the top row).",
      "For each subsequent row, update row[c] += row[c-1] left to right.",
      "row[c] now holds paths to that cell.",
      "Return the last cell after processing all rows.",
    ],
    diagram: `graph TD
  A["paths(r-1,c)"] --> C["paths(r,c)"]
  B["paths(r,c-1)"] --> C
  C --> D["sum from top + left"]`,
    complexity: { time: "O(m·n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Rolling Row DP",
        code: `def unique_paths(m: int, n: int) -> int:
    row = [1] * n
    for _ in range(1, m):
        for c in range(1, n):
            row[c] += row[c - 1]
    return row[-1]`,
      },
      {
        language: "typescript",
        label: "Rolling Row DP",
        code: `function uniquePaths(m: number, n: number): number {
  const row = new Array<number>(n).fill(1);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      row[c] += row[c - 1];
    }
  }
  return row[n - 1];
}`,
      },
    ],
    runner: {
      entry: "uniquePaths",
      comparison: "deep",
      jsStarter: `function uniquePaths(m, n) {
  // Count right/down-only paths across an m x n grid.
  // TODO: implement
}`,
      jsReference: `function uniquePaths(m, n) {
  const row = new Array(n).fill(1);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      row[c] += row[c - 1];
    }
  }
  return row[n - 1];
}`,
    },
    tests: [
      { name: "3x7", args: [3, 7], expected: 28 },
      { name: "3x2", args: [3, 2], expected: 3 },
      { name: "1x1", args: [1, 1], expected: 1 },
      { name: "square", args: [4, 4], expected: 20 },
    ],
    hints: ["Each cell sums the cell above and to the left.", "One row of state is enough."],
    relatedIds: [63, 64, 980],
  },
  {
    id: 1143,
    slug: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    category: "dp-2d",
    patterns: ["Two-sequence DP"],
    companies: ["amazon", "google", "microsoft", "adobe"],
    frequency: 75,
    leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
    pseudocode: `function LCS(a, b):
  dp = (len(a)+1) x (len(b)+1) grid of zeros
  for i from 1 to len(a):
    for j from 1 to len(b):
      if a[i-1] == b[j-1]:
        dp[i][j] = dp[i-1][j-1] + 1      // match -> diagonal
      else:
        dp[i][j] = max(dp[i-1][j], dp[i][j-1])
  return dp[len(a)][len(b)]`,
    statement:
      "Given two strings `text1` and `text2`, return the length of their longest common subsequence, or `0` if they share no subsequence.\n\nA subsequence is formed by deleting zero or more characters from a string without changing the relative order of the characters that remain. A common subsequence is one that appears in both strings. For example, `\"ace\"` is a subsequence of `\"abcde\"`. You only need the length of the longest such shared subsequence, not the subsequence itself.",
    description:
      "Given two strings `text1` and `text2`, return the length of their longest common subsequence (characters in order but not necessarily contiguous), or 0 if there is none.",
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: '"ace".' },
      { input: 'text1 = "abc", text2 = "def"', output: "0" },
    ],
    constraints: ["1 ≤ text1.length, text2.length ≤ 1000", "Strings are lowercase English letters."],
    intuition:
      "Compare the two strings character by character in a table. If the current characters match, the LCS grows by one from the diagonal; if not, carry over the better of dropping one character from either string. dp[i][j] is the LCS of the first i and first j characters.",
    approach: [
      "Build a (m+1) × (n+1) table of zeros.",
      "For each i, j: if text1[i-1] == text2[j-1], dp[i][j] = dp[i-1][j-1] + 1.",
      "Otherwise dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
      "Return dp[m][n].",
    ],
    diagram: `graph TD
  M{"chars match?"}
  M -- yes --> D["1 + dp[i-1][j-1] (diagonal)"]
  M -- no --> X["max(dp[i-1][j], dp[i][j-1])"]`,
    complexity: { time: "O(m·n)", space: "O(m·n)", note: "Reducible to O(min(m,n)) with two rows." },
    solutions: [
      {
        language: "python",
        label: "Tabulation",
        code: `def longest_common_subsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
      },
      {
        language: "typescript",
        label: "Tabulation",
        code: `function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = text1[i - 1] === text2[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}`,
      },
    ],
    runner: {
      entry: "longestCommonSubsequence",
      comparison: "deep",
      jsStarter: `function longestCommonSubsequence(text1, text2) {
  // Return the length of the longest common subsequence.
  // TODO: implement
}`,
      jsReference: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = text1[i - 1] === text2[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}`,
    },
    tests: [
      { name: "ace", args: ["abcde", "ace"], expected: 3 },
      { name: "identical", args: ["abc", "abc"], expected: 3 },
      { name: "disjoint", args: ["abc", "def"], expected: 0 },
      { name: "interleaved", args: ["bsbininm", "jmjkbkjkv"], expected: 1 },
    ],
    hints: ["Match → diagonal + 1.", "Mismatch → best of dropping one character."],
    relatedIds: [1092, 583, 72],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Greedy
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 53,
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "greedy",
    patterns: ["Kadane's Algorithm"],
    companies: ["amazon", "meta", "microsoft", "apple", "linkedin", "bloomberg"],
    frequency: 86,
    leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
    pseudocode: `function maxSubArray(nums):
  current = nums[0]
  best = nums[0]
  for v in nums from index 1:
    current = max(v, current + v)     // restart or extend
    best = max(best, current)
  return best`,
    statement:
      "Given an integer array `nums`, find the contiguous subarray (containing at least one element) that has the largest possible sum, and return that sum.\n\nA subarray is a contiguous, non-empty slice of the array. Because the values can be negative, the answer is not simply the sum of all positives; you must choose the best continuous run. When every element is negative, the answer is the single largest (least negative) element.",
    description:
      "Given an integer array `nums`, find the contiguous subarray with the largest sum and return that sum.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "[4,-1,2,1] sums to 6." },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^4 ≤ nums[i] ≤ 10^4"],
    intuition:
      "Scan left to right keeping a running sum. The greedy insight: if the running sum ever goes negative it can only hurt what follows, so drop it and start fresh at the current element. Track the best sum seen along the way (Kadane's algorithm).",
    approach: [
      "Set current = nums[0] and best = nums[0].",
      "For each later value v: current = max(v, current + v).",
      "Update best = max(best, current).",
      "Return best.",
    ],
    diagram: `graph LR
  A["current + v"] --> M{"max"}
  B["v (restart)"] --> M
  M --> C["best = max(best, current)"]`,
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Kadane",
        code: `def max_sub_array(nums: list[int]) -> int:
    current = best = nums[0]
    for v in nums[1:]:
        current = max(v, current + v)
        best = max(best, current)
    return best`,
      },
      {
        language: "typescript",
        label: "Kadane",
        code: `function maxSubArray(nums: number[]): number {
  let current = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "maxSubArray",
      comparison: "deep",
      jsStarter: `function maxSubArray(nums) {
  // Return the largest contiguous subarray sum.
  // TODO: implement
}`,
      jsReference: `function maxSubArray(nums) {
  let current = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}`,
    },
    tests: [
      { name: "mixed", args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { name: "all positive", args: [[5, 4, -1, 7, 8]], expected: 23 },
      { name: "single", args: [[1]], expected: 1 },
      { name: "all negative", args: [[-3, -1, -2]], expected: -1 },
    ],
    hints: ["Drop the running sum when it turns negative.", "Track the best sum as you go."],
    relatedIds: [121, 152, 918],
  },
  {
    id: 55,
    slug: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    category: "greedy",
    patterns: ["Greedy Reach"],
    companies: ["amazon", "google", "meta", "apple"],
    frequency: 76,
    leetcodeUrl: "https://leetcode.com/problems/jump-game/",
    pseudocode: `function canJump(nums):
  reach = 0
  for i from 0 to n-1:
    if i > reach: return false        // stranded
    reach = max(reach, i + nums[i])
  return true`,
    statement:
      "You are given an integer array `nums`. You begin at the first index, and each `nums[i]` is the maximum number of indices you may jump forward from position `i` (you may also jump any smaller amount).\n\nReturn `true` if it is possible to reach the last index starting from the first, and `false` if you can become stranded before reaching it. A value of `0` means you cannot advance from that position, so reaching such a cell with no remaining reach leaves you stuck.",
    description:
      "Each `nums[i]` is the maximum jump length from index i. Starting at index 0, return whether you can reach the last index.",
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "true" },
      { input: "nums = [3,2,1,0,4]", output: "false", explanation: "You always land on index 3 (value 0) and stall." },
    ],
    constraints: ["1 ≤ nums.length ≤ 10^4", "0 ≤ nums[i] ≤ 10^5"],
    intuition:
      "Track the farthest index reachable so far. Sweep left to right; if you ever stand on an index beyond that frontier, you're stuck. Otherwise extend the frontier by i + nums[i]. Reaching or passing the last index means success.",
    approach: [
      "Set reach = 0.",
      "For each index i: if i > reach, return false (unreachable).",
      "Update reach = max(reach, i + nums[i]).",
      "If the loop completes, the end is reachable — return true.",
    ],
    diagram: `graph LR
  A["i ≤ reach?"] -- no --> F["false"]
  A -- yes --> B["reach = max(reach, i + nums[i])"]
  B --> C["end reachable → true"]`,
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Greedy",
        code: `def can_jump(nums: list[int]) -> bool:
    reach = 0
    for i, n in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + n)
    return True`,
      },
      {
        language: "typescript",
        label: "Greedy",
        code: `function canJump(nums: number[]): boolean {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "canJump",
      comparison: "deep",
      jsStarter: `function canJump(nums) {
  // Return true if you can reach the last index.
  // TODO: implement
}`,
      jsReference: `function canJump(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}`,
    },
    tests: [
      { name: "reachable", args: [[2, 3, 1, 1, 4]], expected: true },
      { name: "stuck", args: [[3, 2, 1, 0, 4]], expected: false },
      { name: "single", args: [[0]], expected: true },
      { name: "big first jump", args: [[5, 0, 0, 0, 0]], expected: true },
    ],
    hints: ["Track the farthest reachable index.", "Fail the moment an index exceeds it."],
    relatedIds: [45, 1306, 1340],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Intervals
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 56,
    slug: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "intervals",
    patterns: ["Sort", "Sweep"],
    companies: ["amazon", "google", "meta", "microsoft", "bloomberg", "salesforce"],
    frequency: 88,
    leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",
    pseudocode: `function merge(intervals):
  sort intervals by start
  merged = []
  for [start, end] in intervals:
    if merged not empty and start <= merged.last.end:
      merged.last.end = max(merged.last.end, end)
    else:
      merged.append([start, end])
  return merged`,
    statement:
      "You are given an array `intervals` where each element `[start, end]` represents a closed interval. Merge all intervals that overlap and return the resulting set of non-overlapping intervals that together cover exactly the same ranges as the input.\n\nTwo intervals overlap when they share at least one point, including the case where one ends exactly where the next begins (e.g. `[1,4]` and `[4,5]` merge into `[1,5]`). The output should be sorted in ascending order by start value.",
    description:
      "Given an array of intervals `[start, end]`, merge all overlapping intervals and return the non-overlapping result, sorted by start.",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "[1,3] and [2,6] overlap into [1,6]." },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
    ],
    constraints: ["1 ≤ intervals.length ≤ 10^4", "intervals[i] = [start, end] with start ≤ end"],
    intuition:
      "Sort by start so any overlaps become adjacent. Walk the sorted list keeping the last merged interval; if the next one starts at or before that interval's end, extend the end, otherwise it begins a new block. One pass after sorting does it.",
    approach: [
      "Sort intervals by start ascending.",
      "Initialize the result with the first interval.",
      "For each next interval: if its start ≤ last.end, set last.end = max(last.end, next.end); else append it.",
      "Return the result.",
    ],
    diagram: `graph LR
  S["sort by start"] --> O{"next.start ≤ last.end?"}
  O -- yes --> M["extend last.end"]
  O -- no --> A["append new interval"]`,
    complexity: { time: "O(n log n)", space: "O(n)", note: "Dominated by the sort." },
    solutions: [
      {
        language: "python",
        label: "Sort + Merge",
        code: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged: list[list[int]] = []
    for start, end in intervals:
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,
      },
      {
        language: "typescript",
        label: "Sort + Merge",
        code: `function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [];
  for (const [start, end] of intervals) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }
  return merged;
}`,
      },
    ],
    runner: {
      entry: "merge",
      comparison: "deep",
      jsStarter: `function merge(intervals) {
  // Merge overlapping intervals; return sorted by start.
  // TODO: implement
}`,
      jsReference: `function merge(input) {
  const intervals = input.map((iv) => iv.slice()).sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [start, end] of intervals) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }
  return merged;
}`,
    },
    tests: [
      { name: "classic", args: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
      { name: "touching", args: [[[1, 4], [4, 5]]], expected: [[1, 5]] },
      { name: "unsorted", args: [[[15, 18], [1, 3], [8, 10], [2, 6]]], expected: [[1, 6], [8, 10], [15, 18]] },
      { name: "engulfed", args: [[[1, 10], [2, 3], [4, 5]]], expected: [[1, 10]] },
    ],
    hints: ["Sort by start first.", "Overlap when next.start ≤ last.end."],
    relatedIds: [57, 435, 252],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Math & Geometry
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 48,
    slug: "rotate-image",
    title: "Rotate Image",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Matrix", "Transpose + Reverse"],
    companies: ["amazon", "meta", "google", "microsoft", "apple"],
    frequency: 74,
    leetcodeUrl: "https://leetcode.com/problems/rotate-image/",
    pseudocode: `function rotate(matrix):
  n = size(matrix)
  // 1) transpose across the main diagonal
  for i from 0 to n-1:
    for j from i+1 to n-1:
      swap(matrix[i][j], matrix[j][i])
  // 2) reverse each row
  for each row in matrix:
    reverse(row)`,
    statement:
      "You are given an `n × n` 2D matrix representing an image. Rotate the image by 90 degrees clockwise.\n\nThe rotation must be done in place: modify the input matrix directly using $O(1)$ extra space rather than allocating a second matrix. After rotation, the element originally at row `r`, column `c` ends up at row `c`, column `n-1-r`.\n\n*In this repo's playground the rotated matrix is returned so it can be graded.*",
    description:
      "Rotate an `n × n` matrix 90° clockwise in place. The playground returns the rotated matrix so it can be graded.",
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" },
      { input: "matrix = [[1,2],[3,4]]", output: "[[3,1],[4,2]]" },
    ],
    constraints: ["n == matrix.length == matrix[i].length", "1 ≤ n ≤ 20", "-1000 ≤ matrix[i][j] ≤ 1000"],
    intuition:
      "A 90° clockwise rotation equals two simple reflections: first transpose the matrix (swap across the main diagonal), then reverse each row. Both steps are in place and avoid any extra matrix allocation.",
    approach: [
      "Transpose: for i < j, swap matrix[i][j] with matrix[j][i].",
      "Reverse each row in place.",
      "The matrix is now rotated 90° clockwise.",
    ],
    diagram: `graph LR
  A["original"] --> T["transpose (swap i,j)"] --> R["reverse each row"] --> O["rotated 90° CW"]`,
    complexity: { time: "O(n²)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Transpose + Reverse",
        code: `def rotate(matrix: list[list[int]]) -> None:
    n = len(matrix)
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for row in matrix:
        row.reverse()`,
      },
      {
        language: "typescript",
        label: "Transpose + Reverse",
        code: `function rotate(matrix: number[][]): void {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (const row of matrix) row.reverse();
}`,
      },
    ],
    runner: {
      entry: "rotate",
      comparison: "deep",
      jsStarter: `function rotate(matrix) {
  // Rotate 90 degrees clockwise. Return the rotated matrix for grading.
  // TODO: implement
}`,
      jsReference: `function rotate(input) {
  const matrix = input.map((row) => row.slice());
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (const row of matrix) row.reverse();
  return matrix;
}`,
    },
    tests: [
      { name: "3x3", args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] },
      { name: "2x2", args: [[[1, 2], [3, 4]]], expected: [[3, 1], [4, 2]] },
      { name: "1x1", args: [[[1]]], expected: [[1]] },
    ],
    hints: ["Transpose, then reverse rows.", "Both steps are in place."],
    relatedIds: [54, 59, 73],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Bit Manipulation
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 136,
    slug: "single-number",
    title: "Single Number",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["XOR"],
    companies: ["amazon", "google", "apple", "microsoft"],
    frequency: 80,
    leetcodeUrl: "https://leetcode.com/problems/single-number/",
    pseudocode: `function singleNumber(nums):
  result = 0
  for x in nums:
    result = result XOR x       // equal pairs cancel to 0
  return result`,
    statement:
      "You are given a non-empty integer array `nums` in which every value appears exactly twice except for one value, which appears only once. Find and return that single value.\n\nThe intended solution runs in linear time and uses only constant extra space — so sorting or a hash map, while correct, miss the point. The XOR trick (a value XOR'd with itself cancels to zero) folds the whole array down to the lone element.",
    description:
      "Every element in `nums` appears twice except for one. Find that single element in O(n) time and O(1) extra space.",
    examples: [
      { input: "nums = [2,2,1]", output: "1" },
      { input: "nums = [4,1,2,1,2]", output: "4" },
    ],
    constraints: ["1 ≤ nums.length ≤ 3·10^4", "Each element appears twice except one which appears once."],
    intuition:
      "XOR is the perfect tool: x ^ x = 0 and x ^ 0 = x. Fold the whole array with XOR — every duplicated pair cancels to zero, leaving exactly the lone element. No hash map or extra space needed.",
    approach: [
      "Initialize result = 0.",
      "XOR every element into result.",
      "Pairs cancel; result holds the unique value.",
      "Return result.",
    ],
    diagram: `graph LR
  A["2 ^ 2 = 0"] --> B["0 ^ 1 = 1"]
  B --> C["pairs cancel → unique remains"]`,
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "XOR fold",
        code: `from functools import reduce
from operator import xor

def single_number(nums: list[int]) -> int:
    return reduce(xor, nums, 0)`,
      },
      {
        language: "typescript",
        label: "XOR fold",
        code: `function singleNumber(nums: number[]): number {
  return nums.reduce((acc, x) => acc ^ x, 0);
}`,
      },
    ],
    runner: {
      entry: "singleNumber",
      comparison: "deep",
      jsStarter: `function singleNumber(nums) {
  // Return the element that appears only once.
  // TODO: implement
}`,
      jsReference: `function singleNumber(nums) {
  return nums.reduce((acc, x) => acc ^ x, 0);
}`,
    },
    tests: [
      { name: "first", args: [[2, 2, 1]], expected: 1 },
      { name: "middle", args: [[4, 1, 2, 1, 2]], expected: 4 },
      { name: "single", args: [[7]], expected: 7 },
      { name: "negatives", args: [[-1, -1, -3]], expected: -3 },
    ],
    hints: ["x ^ x = 0.", "XOR the whole array together."],
    relatedIds: [137, 260, 268],
  },
  {
    id: 191,
    slug: "number-of-1-bits",
    title: "Number of 1 Bits",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["Bit Counting", "Brian Kernighan"],
    companies: ["amazon", "apple", "microsoft"],
    frequency: 68,
    leetcodeUrl: "https://leetcode.com/problems/number-of-1-bits/",
    pseudocode: `function hammingWeight(n):
  count = 0
  while n != 0:
    n = n AND (n - 1)          // clear the lowest set bit
    count = count + 1
  return count`,
    statement:
      "Given an unsigned 32-bit integer `n`, return the number of bits set to `1` in its binary representation. This count is also known as the Hamming weight.\n\nFor example, `11` is `1011` in binary and therefore has three set bits. A neat approach repeatedly clears the lowest set bit with `n & (n - 1)`, looping once per one-bit instead of once per bit position.",
    description:
      "Return the number of set bits (1s) in the binary representation of an unsigned integer `n` (its Hamming weight).",
    examples: [
      { input: "n = 11  (1011)", output: "3" },
      { input: "n = 128 (10000000)", output: "1" },
    ],
    constraints: ["0 ≤ n ≤ 2^31 - 1"],
    intuition:
      "Brian Kernighan's trick clears the lowest set bit with n & (n - 1). Each iteration removes exactly one 1, so the loop runs once per set bit — counting them while skipping every zero in between.",
    approach: [
      "Initialize count = 0.",
      "While n is non-zero: do n = n & (n - 1) to drop the lowest set bit and increment count.",
      "Return count.",
    ],
    diagram: `graph LR
  A["n & (n-1)"] --> B["drops lowest set bit"]
  B --> C["count++"]
  C --> D{"n == 0?"}
  D -- no --> A
  D -- yes --> E["return count"]`,
    complexity: { time: "O(set bits)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Kernighan",
        code: `def hamming_weight(n: int) -> int:
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count`,
      },
      {
        language: "typescript",
        label: "Unsigned shift",
        code: `function hammingWeight(n: number): number {
  let count = 0;
  let x = n >>> 0; // treat as unsigned 32-bit
  while (x) {
    count += x & 1;
    x >>>= 1;
  }
  return count;
}`,
      },
    ],
    runner: {
      entry: "hammingWeight",
      comparison: "deep",
      jsStarter: `function hammingWeight(n) {
  // Count the set bits of n (unsigned 32-bit).
  // TODO: implement
}`,
      jsReference: `function hammingWeight(n) {
  let count = 0;
  let x = n >>> 0;
  while (x) {
    count += x & 1;
    x >>>= 1;
  }
  return count;
}`,
    },
    tests: [
      { name: "eleven", args: [11], expected: 3 },
      { name: "power of two", args: [128], expected: 1 },
      { name: "zero", args: [0], expected: 0 },
      { name: "many bits", args: [2147483645], expected: 30 },
    ],
    hints: ["n & (n-1) clears the lowest set bit.", "Loop until n becomes 0."],
    relatedIds: [338, 190, 461],
  },
];

export default problems;
