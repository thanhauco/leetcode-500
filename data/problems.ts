import type { Problem } from "./types";

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
];

export default problems;
