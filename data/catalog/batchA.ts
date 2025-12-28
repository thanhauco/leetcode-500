import type { Problem } from "../types.ts";

/**
 * Batch A — twenty foundational easy/medium problems spanning two-pointers,
 * arrays & hashing, math, and bit manipulation. Every record carries a fully
 * wired playground runner with hand-verified tests.
 */
export const batchA: Problem[] = [
  {
    id: 167,
    slug: "two-sum-ii-input-array-is-sorted",
    title: "Two Sum II - Input Array Is Sorted",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Two Pointers"],
    companies: ["amazon", "apple", "microsoft", "bloomberg"],
    frequency: 72,
    leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    description:
      "Given a 1-indexed array sorted in non-decreasing order, find the two values that sum to a target and return their 1-based positions. Exactly one pair exists.",
    examples: [
      { input: "numbers = [2,7,11,15], target = 9", output: "[1,2]", explanation: "2 + 7 = 9, sitting at positions 1 and 2." },
      { input: "numbers = [2,3,4], target = 6", output: "[1,3]", explanation: "2 + 4 = 6." },
    ],
    intuition:
      "Because the array is sorted, a pair of pointers from both ends can converge intelligently. If the current sum is too large, only shrinking the right end can help; if it is too small, only advancing the left end can help. This removes the need for a hash map and runs in constant extra space.",
    approach: [
      "Set left = 0 and right = numbers.length - 1.",
      "Compute the sum of the two pointed values.",
      "If it equals target, return the 1-based indices [left + 1, right + 1].",
      "If the sum is too small move left rightward; if too large move right leftward.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Single converging sweep, no auxiliary storage." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def two_sum(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        if total < target:
            left += 1
        else:
            right -= 1
    return []`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function twoSum(numbers: number[], target: number): number[] {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const total = numbers[left] + numbers[right];
    if (total === target) return [left + 1, right + 1];
    if (total < target) left++;
    else right--;
  }
  return [];
}`,
      },
    ],
    runner: {
      entry: "twoSum",
      comparison: "deep",
      jsStarter: `function twoSum(numbers, target) {
  // Return the 1-based indices of the pair that sums to target.
  // TODO: implement
}`,
      jsReference: `function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const total = numbers[left] + numbers[right];
    if (total === target) return [left + 1, right + 1];
    if (total < target) left++;
    else right--;
  }
  return [];
}`,
    },
    tests: [
      { name: "basic", args: [[2, 7, 11, 15], 9], expected: [1, 2] },
      { name: "ends", args: [[2, 3, 4], 6], expected: [1, 3] },
      { name: "negatives", args: [[-1, 0], -1], expected: [1, 2] },
      { name: "deep pair", args: [[1, 2, 3, 4, 4, 9, 56, 90], 8], expected: [4, 5] },
      { name: "last two", args: [[5, 25, 75], 100], expected: [2, 3] },
    ],
    relatedIds: [1, 15, 170],
  },
  {
    id: 26,
    slug: "remove-duplicates-from-sorted-array",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["Two Pointers", "In-Place"],
    companies: ["amazon", "microsoft", "apple", "bloomberg"],
    frequency: 66,
    leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    description:
      "Given a sorted array, remove duplicates in place so each value appears once, and return the count k of distinct elements occupying the front of the array.",
    examples: [
      { input: "nums = [1,1,2]", output: "2", explanation: "The first two slots become 1, 2." },
      { input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "5", explanation: "Distinct values are 0,1,2,3,4." },
    ],
    intuition:
      "A slow writer pointer marks where the next unique value belongs while a fast reader scans ahead. Since the array is sorted, a value differs from its predecessor exactly when it is new, so we only copy it forward when it changes.",
    approach: [
      "If the array is empty return 0.",
      "Initialize a write index k = 1 (first element is always kept).",
      "Scan from i = 1; whenever nums[i] differs from nums[i-1], write it at position k and advance k.",
      "Return k as the number of unique elements.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "One pass with in-place writes." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def remove_duplicates(nums: list[int]) -> int:
    if not nums:
        return 0
    k = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1]:
            nums[k] = nums[i]
            k += 1
    return k`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) nums[k++] = nums[i];
  }
  return k;
}`,
      },
    ],
    runner: {
      entry: "removeDuplicates",
      comparison: "deep",
      jsStarter: `function removeDuplicates(nums) {
  // Return the count of unique elements after compacting in place.
  // TODO: implement
}`,
      jsReference: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) nums[k++] = nums[i];
  }
  return k;
}`,
    },
    tests: [
      { name: "small", args: [[1, 1, 2]], expected: 2 },
      { name: "many dups", args: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5 },
      { name: "all unique", args: [[1, 2, 3]], expected: 3 },
      { name: "single", args: [[7]], expected: 1 },
      { name: "empty", args: [[]], expected: 0 },
    ],
    relatedIds: [27, 80, 283],
  },
  {
    id: 27,
    slug: "remove-element",
    title: "Remove Element",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["Two Pointers", "In-Place"],
    companies: ["amazon", "microsoft", "apple"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/remove-element/",
    description:
      "Remove every occurrence of a given value from an array in place and return the count k of the remaining elements packed at the front.",
    examples: [
      { input: "nums = [3,2,2,3], val = 3", output: "2", explanation: "Two non-3 values (2,2) remain." },
      { input: "nums = [0,1,2,2,3,0,4,2], val = 2", output: "5", explanation: "Five values are not equal to 2." },
    ],
    intuition:
      "Keep a write pointer that only advances when the current element should survive. Each value that is not the target is copied to the front, naturally overwriting the ones being removed.",
    approach: [
      "Initialize k = 0 as the write position.",
      "Iterate over every element x in the array.",
      "If x is not the target value, store it at index k and increment k.",
      "Return k, the number of kept elements.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Single pass, constant extra space." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def remove_element(nums: list[int], val: int) -> int:
    k = 0
    for x in nums:
        if x != val:
            nums[k] = x
            k += 1
    return k`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function removeElement(nums: number[], val: number): number {
  let k = 0;
  for (const x of nums) {
    if (x !== val) nums[k++] = x;
  }
  return k;
}`,
      },
    ],
    runner: {
      entry: "removeElement",
      comparison: "deep",
      jsStarter: `function removeElement(nums, val) {
  // Return how many elements remain after removing all copies of val.
  // TODO: implement
}`,
      jsReference: `function removeElement(nums, val) {
  let k = 0;
  for (const x of nums) {
    if (x !== val) nums[k++] = x;
  }
  return k;
}`,
    },
    tests: [
      { name: "basic", args: [[3, 2, 2, 3], 3], expected: 2 },
      { name: "scattered", args: [[0, 1, 2, 2, 3, 0, 4, 2], 2], expected: 5 },
      { name: "remove all", args: [[1], 1], expected: 0 },
      { name: "remove none", args: [[4, 5], 6], expected: 2 },
      { name: "empty", args: [[], 1], expected: 0 },
    ],
    relatedIds: [26, 283],
  },
  {
    id: 283,
    slug: "move-zeroes",
    title: "Move Zeroes",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["Two Pointers", "In-Place"],
    companies: ["amazon", "meta", "apple", "microsoft", "bloomberg"],
    frequency: 74,
    leetcodeUrl: "https://leetcode.com/problems/move-zeroes/",
    description:
      "Shift all zeroes in an array to the end while keeping the relative order of the non-zero values, and return the modified array.",
    examples: [
      { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]", explanation: "Non-zeros keep order; zeros fall to the back." },
      { input: "nums = [0]", output: "[0]", explanation: "A single zero stays put." },
    ],
    intuition:
      "Use a write pointer that tracks the next slot for a non-zero value. As you scan, copy every non-zero forward; once the scan finishes, fill the remaining tail with zeroes. This preserves order without extra arrays.",
    approach: [
      "Walk through the array with a write index starting at 0.",
      "Each time a non-zero value appears, place it at the write index and advance it.",
      "After the scan, set every position from the write index onward to 0.",
      "Return the now-rearranged array.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "In-place; one scan plus a fill." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def move_zeroes(nums: list[int]) -> list[int]:
    write = 0
    for x in nums:
        if x != 0:
            nums[write] = x
            write += 1
    for i in range(write, len(nums)):
        nums[i] = 0
    return nums`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function moveZeroes(nums: number[]): number[] {
  let write = 0;
  for (const x of nums) {
    if (x !== 0) nums[write++] = x;
  }
  for (let i = write; i < nums.length; i++) nums[i] = 0;
  return nums;
}`,
      },
    ],
    runner: {
      entry: "moveZeroes",
      comparison: "deep",
      jsStarter: `function moveZeroes(nums) {
  // Move every zero to the end, preserving order, and return nums.
  // TODO: implement
}`,
      jsReference: `function moveZeroes(nums) {
  let write = 0;
  for (const x of nums) {
    if (x !== 0) nums[write++] = x;
  }
  for (let i = write; i < nums.length; i++) nums[i] = 0;
  return nums;
}`,
    },
    tests: [
      { name: "basic", args: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
      { name: "single zero", args: [[0]], expected: [0] },
      { name: "no zeros", args: [[1, 2, 3]], expected: [1, 2, 3] },
      { name: "leading zeros", args: [[0, 0, 1]], expected: [1, 0, 0] },
      { name: "mixed", args: [[4, 0, 5, 0, 0, 6]], expected: [4, 5, 6, 0, 0, 0] },
    ],
    relatedIds: [26, 27],
  },
  {
    id: 88,
    slug: "merge-sorted-array",
    title: "Merge Sorted Array",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["Two Pointers", "Merge"],
    companies: ["amazon", "meta", "microsoft", "apple", "bloomberg"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/merge-sorted-array/",
    description:
      "Merge two sorted arrays into a single sorted sequence. Here the entry takes nums1, m, nums2, n and returns the combined sorted array of length m + n.",
    examples: [
      { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]", explanation: "All six values interleave in order." },
      { input: "nums1 = [1], m = 1, nums2 = [], n = 0", output: "[1]", explanation: "Nothing to merge in." },
    ],
    intuition:
      "Only the first m entries of nums1 and the first n entries of nums2 are meaningful. Merging two already-sorted lists is a classic linear scan: repeatedly take the smaller front element. Filling from the back avoids overwriting unread values when done in place.",
    approach: [
      "Take the real prefixes: the first m of nums1 and first n of nums2.",
      "Walk two pointers, always appending the smaller current head to the result.",
      "When one list is exhausted, append the remainder of the other.",
      "Return the merged array of length m + n.",
    ],
    complexity: { time: "O(m + n)", space: "O(m + n)", note: "Linear merge of the two prefixes." },
    solutions: [
      {
        language: "python",
        label: "Merge",
        code: `def merge(nums1: list[int], m: int, nums2: list[int], n: int) -> list[int]:
    a, b = nums1[:m], nums2[:n]
    result, i, j = [], 0, 0
    while i < m and j < n:
        if a[i] <= b[j]:
            result.append(a[i]); i += 1
        else:
            result.append(b[j]); j += 1
    result.extend(a[i:])
    result.extend(b[j:])
    return result`,
      },
      {
        language: "typescript",
        label: "Merge",
        code: `function merge(nums1: number[], m: number, nums2: number[], n: number): number[] {
  const a = nums1.slice(0, m), b = nums2.slice(0, n);
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  while (i < m) result.push(a[i++]);
  while (j < n) result.push(b[j++]);
  return result;
}`,
      },
    ],
    runner: {
      entry: "merge",
      comparison: "deep",
      jsStarter: `function merge(nums1, m, nums2, n) {
  // Return the merged sorted array of the first m and first n elements.
  // TODO: implement
}`,
      jsReference: `function merge(nums1, m, nums2, n) {
  const a = nums1.slice(0, m), b = nums2.slice(0, n);
  const result = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  while (i < m) result.push(a[i++]);
  while (j < n) result.push(b[j++]);
  return result;
}`,
    },
    tests: [
      { name: "basic", args: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3], expected: [1, 2, 2, 3, 5, 6] },
      { name: "second empty", args: [[1], 1, [], 0], expected: [1] },
      { name: "first empty", args: [[0], 0, [1], 1], expected: [1] },
      { name: "disjoint", args: [[4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3], expected: [1, 2, 3, 4, 5, 6] },
      { name: "interleave", args: [[2, 0], 1, [1], 1], expected: [1, 2] },
    ],
    relatedIds: [21, 26],
  },
  {
    id: 169,
    slug: "majority-element",
    title: "Majority Element",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Boyer-Moore Voting"],
    companies: ["amazon", "google", "microsoft", "adobe", "bloomberg"],
    frequency: 68,
    leetcodeUrl: "https://leetcode.com/problems/majority-element/",
    description:
      "Find the element that appears more than half the time in an array. Such an element is guaranteed to exist.",
    examples: [
      { input: "nums = [3,2,3]", output: "3", explanation: "3 appears twice out of three." },
      { input: "nums = [2,2,1,1,1,2,2]", output: "2", explanation: "2 appears four times out of seven." },
    ],
    intuition:
      "The Boyer-Moore voting algorithm pairs up differing elements, which cancel out. Because the majority value outnumbers everything else combined, it is the only candidate that can survive all the cancellations with a positive count.",
    approach: [
      "Keep a candidate and a running count starting at 0.",
      "When the count hits 0, adopt the current value as the candidate.",
      "Increment the count when the value matches the candidate, else decrement it.",
      "The final candidate is the majority element.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Single pass, constant memory." },
    solutions: [
      {
        language: "python",
        label: "Boyer-Moore",
        code: `def majority_element(nums: list[int]) -> int:
    candidate, count = None, 0
    for x in nums:
        if count == 0:
            candidate = x
        count += 1 if x == candidate else -1
    return candidate`,
      },
      {
        language: "typescript",
        label: "Boyer-Moore",
        code: `function majorityElement(nums: number[]): number {
  let candidate = 0, count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}`,
      },
    ],
    runner: {
      entry: "majorityElement",
      comparison: "deep",
      jsStarter: `function majorityElement(nums) {
  // Return the value appearing more than n/2 times.
  // TODO: implement
}`,
      jsReference: `function majorityElement(nums) {
  let candidate = 0, count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}`,
    },
    tests: [
      { name: "basic", args: [[3, 2, 3]], expected: 3 },
      { name: "longer", args: [[2, 2, 1, 1, 1, 2, 2]], expected: 2 },
      { name: "single", args: [[1]], expected: 1 },
      { name: "majority three", args: [[6, 6, 6, 7, 7]], expected: 6 },
      { name: "all same", args: [[5, 5, 5, 5]], expected: 5 },
    ],
    relatedIds: [229],
  },
  {
    id: 14,
    slug: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["String Scan"],
    companies: ["amazon", "google", "microsoft", "adobe"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/longest-common-prefix/",
    description:
      "Return the longest string that is a prefix of every string in the input array, or an empty string when no common prefix exists.",
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"', explanation: "All three begin with fl." },
      { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: "They share no leading character." },
    ],
    intuition:
      "Start by assuming the first string is the answer, then shrink it against each other string until it is actually a prefix of that string. Whatever remains after checking everyone is common to all.",
    approach: [
      "Take the first string as the initial prefix candidate.",
      "For every other string, trim characters off the end of the prefix until the string starts with it.",
      "If the prefix ever becomes empty, return an empty string immediately.",
      "Return the surviving prefix.",
    ],
    complexity: { time: "O(S)", space: "O(1)", note: "S is the total number of characters scanned." },
    solutions: [
      {
        language: "python",
        label: "Horizontal Scan",
        code: `def longest_common_prefix(strs: list[str]) -> str:
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ""
    return prefix`,
      },
      {
        language: "typescript",
        label: "Horizontal Scan",
        code: `function longestCommonPrefix(strs: string[]): string {
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}`,
      },
    ],
    runner: {
      entry: "longestCommonPrefix",
      comparison: "deep",
      jsStarter: `function longestCommonPrefix(strs) {
  // Return the longest prefix shared by every string.
  // TODO: implement
}`,
      jsReference: `function longestCommonPrefix(strs) {
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}`,
    },
    tests: [
      { name: "common fl", args: [["flower", "flow", "flight"]], expected: "fl" },
      { name: "none", args: [["dog", "racecar", "car"]], expected: "" },
      { name: "longer prefix", args: [["interspecies", "interstellar", "interstate"]], expected: "inters" },
      { name: "single", args: [["a"]], expected: "a" },
      { name: "identical", args: [["abc", "abc", "abc"]], expected: "abc" },
    ],
    relatedIds: [],
  },
  {
    id: 58,
    slug: "length-of-last-word",
    title: "Length of Last Word",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["String Scan"],
    companies: ["amazon", "microsoft", "linkedin"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/length-of-last-word/",
    description:
      "Given a string of words separated by spaces, return the length of the final word. Trailing spaces should be ignored.",
    examples: [
      { input: 's = "Hello World"', output: "5", explanation: "The last word is World." },
      { input: 's = "   fly me   to   the moon  "', output: "4", explanation: "The last word is moon." },
    ],
    intuition:
      "Scanning from the right, first skip any trailing spaces, then count consecutive non-space characters until you hit the next space or the start. That count is the last word's length.",
    approach: [
      "Set an index to the final character.",
      "Skip backward over any trailing spaces.",
      "Count characters while moving left until a space or the string start.",
      "Return the count.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Reverse scan, no allocation." },
    solutions: [
      {
        language: "python",
        label: "Reverse Scan",
        code: `def length_of_last_word(s: str) -> int:
    i = len(s) - 1
    while i >= 0 and s[i] == " ":
        i -= 1
    length = 0
    while i >= 0 and s[i] != " ":
        length += 1
        i -= 1
    return length`,
      },
      {
        language: "typescript",
        label: "Reverse Scan",
        code: `function lengthOfLastWord(s: string): number {
  let i = s.length - 1;
  while (i >= 0 && s[i] === " ") i--;
  let length = 0;
  while (i >= 0 && s[i] !== " ") {
    length++;
    i--;
  }
  return length;
}`,
      },
    ],
    runner: {
      entry: "lengthOfLastWord",
      comparison: "deep",
      jsStarter: `function lengthOfLastWord(s) {
  // Return the length of the last whitespace-delimited word.
  // TODO: implement
}`,
      jsReference: `function lengthOfLastWord(s) {
  let i = s.length - 1;
  while (i >= 0 && s[i] === " ") i--;
  let length = 0;
  while (i >= 0 && s[i] !== " ") {
    length++;
    i--;
  }
  return length;
}`,
    },
    tests: [
      { name: "two words", args: ["Hello World"], expected: 5 },
      { name: "messy spaces", args: ["   fly me   to   the moon  "], expected: 4 },
      { name: "phrase", args: ["luffy is still joyboy"], expected: 6 },
      { name: "single char", args: ["a"], expected: 1 },
      { name: "trailing space", args: ["word "], expected: 4 },
    ],
    relatedIds: [],
  },
  {
    id: 392,
    slug: "is-subsequence",
    title: "Is Subsequence",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["Two Pointers"],
    companies: ["amazon", "google", "meta", "pinterest"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/is-subsequence/",
    description:
      "Decide whether string s can be formed from string t by deleting some characters without changing the order of the remaining ones.",
    examples: [
      { input: 's = "abc", t = "ahbgdc"', output: "true", explanation: "a, b, c appear in order inside t." },
      { input: 's = "axc", t = "ahbgdc"', output: "false", explanation: "There is no x in t." },
    ],
    intuition:
      "Walk a pointer through t while trying to match each character of s in order. Every time the current t character equals the next needed s character, advance the s pointer. If s is fully consumed, it is a subsequence.",
    approach: [
      "Start pointers i (into s) and j (into t) at 0.",
      "Advance j through t; whenever s[i] equals t[j], also advance i.",
      "Stop when either string is exhausted.",
      "Return true exactly when i reached the end of s.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "n is the length of t." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def is_subsequence(s: str, t: str) -> bool:
    i = 0
    for ch in t:
        if i < len(s) and s[i] == ch:
            i += 1
    return i == len(s)`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function isSubsequence(s: string, t: string): boolean {
  let i = 0;
  for (const ch of t) {
    if (i < s.length && s[i] === ch) i++;
  }
  return i === s.length;
}`,
      },
    ],
    runner: {
      entry: "isSubsequence",
      comparison: "deep",
      jsStarter: `function isSubsequence(s, t) {
  // Return true if s is a subsequence of t.
  // TODO: implement
}`,
      jsReference: `function isSubsequence(s, t) {
  let i = 0;
  for (const ch of t) {
    if (i < s.length && s[i] === ch) i++;
  }
  return i === s.length;
}`,
    },
    tests: [
      { name: "true", args: ["abc", "ahbgdc"], expected: true },
      { name: "missing char", args: ["axc", "ahbgdc"], expected: false },
      { name: "empty s", args: ["", "abc"], expected: true },
      { name: "empty t", args: ["abc", ""], expected: false },
      { name: "wrong order", args: ["ace", "aec"], expected: false },
    ],
    relatedIds: [524],
  },
  {
    id: 268,
    slug: "missing-number",
    title: "Missing Number",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["XOR"],
    companies: ["amazon", "microsoft", "apple", "bloomberg"],
    frequency: 62,
    leetcodeUrl: "https://leetcode.com/problems/missing-number/",
    description:
      "An array holds n distinct numbers drawn from the range 0..n with exactly one value missing. Return that missing number.",
    examples: [
      { input: "nums = [3,0,1]", output: "2", explanation: "Range is 0..3; 2 is absent." },
      { input: "nums = [0,1]", output: "2", explanation: "Range is 0..2; 2 is absent." },
    ],
    intuition:
      "XOR cancels equal values. If you XOR together every index 0..n and every array value, all the present numbers cancel against their indices, leaving only the single missing number behind.",
    approach: [
      "Seed an accumulator with n (the length).",
      "For each index i, XOR in both i and nums[i].",
      "Equal values cancel, isolating the gap.",
      "Return the accumulator.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "One pass of XOR folds." },
    solutions: [
      {
        language: "python",
        label: "XOR",
        code: `def missing_number(nums: list[int]) -> int:
    missing = len(nums)
    for i, x in enumerate(nums):
        missing ^= i ^ x
    return missing`,
      },
      {
        language: "typescript",
        label: "XOR",
        code: `function missingNumber(nums: number[]): number {
  let missing = nums.length;
  for (let i = 0; i < nums.length; i++) {
    missing ^= i ^ nums[i];
  }
  return missing;
}`,
      },
    ],
    runner: {
      entry: "missingNumber",
      comparison: "deep",
      jsStarter: `function missingNumber(nums) {
  // Return the missing value from the range 0..n.
  // TODO: implement
}`,
      jsReference: `function missingNumber(nums) {
  let missing = nums.length;
  for (let i = 0; i < nums.length; i++) {
    missing ^= i ^ nums[i];
  }
  return missing;
}`,
    },
    tests: [
      { name: "basic", args: [[3, 0, 1]], expected: 2 },
      { name: "small", args: [[0, 1]], expected: 2 },
      { name: "scrambled", args: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected: 8 },
      { name: "missing one", args: [[0]], expected: 1 },
      { name: "missing zero", args: [[1]], expected: 0 },
    ],
    relatedIds: [136, 41],
  },
  {
    id: 66,
    slug: "plus-one",
    title: "Plus One",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Digit Arithmetic"],
    companies: ["amazon", "google", "microsoft", "adobe"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/plus-one/",
    description:
      "An array of digits represents a non-negative integer with the most significant digit first. Add one to it and return the resulting digit array.",
    examples: [
      { input: "digits = [1,2,3]", output: "[1,2,4]", explanation: "123 + 1 = 124." },
      { input: "digits = [9]", output: "[1,0]", explanation: "9 + 1 = 10 carries into a new digit." },
    ],
    intuition:
      "Adding one only matters at the last digit unless it is a 9, which rolls to 0 and carries left. Walk from the right turning trailing 9s into 0s; the first non-9 simply increments. If every digit was 9, prepend a leading 1.",
    approach: [
      "Iterate from the least significant digit toward the most significant.",
      "If the digit is less than 9, increment it and return the array.",
      "If it is 9, set it to 0 and continue carrying left.",
      "If the loop completes, prepend a 1 to represent the new high digit.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "May allocate one extra slot on full carry." },
    solutions: [
      {
        language: "python",
        label: "Carry",
        code: `def plus_one(digits: list[int]) -> list[int]:
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,
      },
      {
        language: "typescript",
        label: "Carry",
        code: `function plusOne(digits: number[]): number[] {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  return [1, ...digits];
}`,
      },
    ],
    runner: {
      entry: "plusOne",
      comparison: "deep",
      jsStarter: `function plusOne(digits) {
  // Return the digit array representing the number plus one.
  // TODO: implement
}`,
      jsReference: `function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  return [1, ...digits];
}`,
    },
    tests: [
      { name: "no carry", args: [[1, 2, 3]], expected: [1, 2, 4] },
      { name: "larger", args: [[4, 3, 2, 1]], expected: [4, 3, 2, 2] },
      { name: "single carry", args: [[9]], expected: [1, 0] },
      { name: "all nines", args: [[9, 9]], expected: [1, 0, 0] },
      { name: "partial carry", args: [[1, 9, 9]], expected: [2, 0, 0] },
    ],
    relatedIds: [67, 369],
  },
  {
    id: 9,
    slug: "palindrome-number",
    title: "Palindrome Number",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Digit Arithmetic"],
    companies: ["amazon", "google", "microsoft", "adobe"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/palindrome-number/",
    description:
      "Determine whether an integer reads the same forward and backward without converting it to a string.",
    examples: [
      { input: "x = 121", output: "true", explanation: "121 reversed is 121." },
      { input: "x = -121", output: "false", explanation: "Negative sign breaks the symmetry." },
    ],
    intuition:
      "Negative numbers can never be palindromes because of the leading sign. For the rest, reverse the second half of the digits mathematically and compare it to the first half; meeting in the middle avoids overflow and string allocation.",
    approach: [
      "Return false for negatives and for positive multiples of ten (except zero).",
      "Pop digits off the end and build a reversed-tail number.",
      "Stop once the reversed tail is at least the remaining front half.",
      "It is a palindrome if the halves match, accounting for an odd middle digit.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "Processes half the digits." },
    solutions: [
      {
        language: "python",
        label: "Reverse Half",
        code: `def is_palindrome(x: int) -> bool:
    if x < 0 or (x % 10 == 0 and x != 0):
        return False
    reverted = 0
    while x > reverted:
        reverted = reverted * 10 + x % 10
        x //= 10
    return x == reverted or x == reverted // 10`,
      },
      {
        language: "typescript",
        label: "Reverse Half",
        code: `function isPalindrome(x: number): boolean {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let reverted = 0;
  while (x > reverted) {
    reverted = reverted * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return x === reverted || x === Math.floor(reverted / 10);
}`,
      },
    ],
    runner: {
      entry: "isPalindrome",
      comparison: "deep",
      jsStarter: `function isPalindrome(x) {
  // Return true if the integer is a palindrome.
  // TODO: implement
}`,
      jsReference: `function isPalindrome(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let reverted = 0;
  while (x > reverted) {
    reverted = reverted * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return x === reverted || x === Math.floor(reverted / 10);
}`,
    },
    tests: [
      { name: "palindrome", args: [121], expected: true },
      { name: "negative", args: [-121], expected: false },
      { name: "trailing zero", args: [10], expected: false },
      { name: "zero", args: [0], expected: true },
      { name: "odd length", args: [12321], expected: true },
    ],
    relatedIds: [125, 234],
  },
  {
    id: 13,
    slug: "roman-to-integer",
    title: "Roman to Integer",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Hash Map", "Greedy Scan"],
    companies: ["amazon", "microsoft", "apple", "bloomberg"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/roman-to-integer/",
    description:
      "Convert a Roman numeral string into its integer value, honoring subtractive forms such as IV and IX.",
    examples: [
      { input: 's = "LVIII"', output: "58", explanation: "L=50, V=5, III=3." },
      { input: 's = "MCMXCIV"', output: "1994", explanation: "M=1000, CM=900, XC=90, IV=4." },
    ],
    intuition:
      "Each symbol maps to a value. Normally you add them up, but when a smaller symbol sits directly before a larger one it represents a subtraction. Compare each value to the next to decide whether to add or subtract.",
    approach: [
      "Build a lookup from each Roman symbol to its value.",
      "Scan left to right tracking the current symbol's value.",
      "If it is smaller than the next symbol's value, subtract it; otherwise add it.",
      "Return the running total.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Fixed-size symbol table." },
    solutions: [
      {
        language: "python",
        label: "Greedy Scan",
        code: `def roman_to_int(s: str) -> int:
    values = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
    total = 0
    for i, ch in enumerate(s):
        if i + 1 < len(s) and values[ch] < values[s[i + 1]]:
            total -= values[ch]
        else:
            total += values[ch]
    return total`,
      },
      {
        language: "typescript",
        label: "Greedy Scan",
        code: `function romanToInt(s: string): number {
  const values: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
  };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < s.length && values[s[i]] < values[s[i + 1]]) {
      total -= values[s[i]];
    } else {
      total += values[s[i]];
    }
  }
  return total;
}`,
      },
    ],
    runner: {
      entry: "romanToInt",
      comparison: "deep",
      jsStarter: `function romanToInt(s) {
  // Return the integer value of the Roman numeral.
  // TODO: implement
}`,
      jsReference: `function romanToInt(s) {
  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < s.length && values[s[i]] < values[s[i + 1]]) {
      total -= values[s[i]];
    } else {
      total += values[s[i]];
    }
  }
  return total;
}`,
    },
    tests: [
      { name: "three", args: ["III"], expected: 3 },
      { name: "fifty eight", args: ["LVIII"], expected: 58 },
      { name: "big", args: ["MCMXCIV"], expected: 1994 },
      { name: "four", args: ["IV"], expected: 4 },
      { name: "nine", args: ["IX"], expected: 9 },
    ],
    relatedIds: [12],
  },
  {
    id: 412,
    slug: "fizz-buzz",
    title: "Fizz Buzz",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Simulation"],
    companies: ["amazon", "microsoft", "apple"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/fizz-buzz/",
    description:
      'Produce the strings 1..n, replacing multiples of 3 with "Fizz", multiples of 5 with "Buzz", and multiples of both with "FizzBuzz".',
    examples: [
      { input: "n = 3", output: '["1","2","Fizz"]', explanation: "3 is divisible by 3." },
      { input: "n = 5", output: '["1","2","Fizz","4","Buzz"]', explanation: "5 is divisible by 5." },
    ],
    intuition:
      "Iterate from 1 to n and test divisibility. Check the combined case (divisible by 15) first or build the label by concatenating Fizz and Buzz, falling back to the number itself when neither applies.",
    approach: [
      "Create an empty result array.",
      "For each value i from 1 to n, start with an empty label.",
      "Append Fizz if i is divisible by 3 and Buzz if divisible by 5.",
      "Push the label, or the number as a string if the label stayed empty.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Output array holds n strings." },
    solutions: [
      {
        language: "python",
        label: "Simulation",
        code: `def fizz_buzz(n: int) -> list[str]:
    result = []
    for i in range(1, n + 1):
        label = ""
        if i % 3 == 0:
            label += "Fizz"
        if i % 5 == 0:
            label += "Buzz"
        result.append(label or str(i))
    return result`,
      },
      {
        language: "typescript",
        label: "Simulation",
        code: `function fizzBuzz(n: number): string[] {
  const result: string[] = [];
  for (let i = 1; i <= n; i++) {
    let label = "";
    if (i % 3 === 0) label += "Fizz";
    if (i % 5 === 0) label += "Buzz";
    result.push(label || String(i));
  }
  return result;
}`,
      },
    ],
    runner: {
      entry: "fizzBuzz",
      comparison: "deep",
      jsStarter: `function fizzBuzz(n) {
  // Return the Fizz Buzz sequence from 1 to n as strings.
  // TODO: implement
}`,
      jsReference: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    let label = "";
    if (i % 3 === 0) label += "Fizz";
    if (i % 5 === 0) label += "Buzz";
    result.push(label || String(i));
  }
  return result;
}`,
    },
    tests: [
      { name: "n=3", args: [3], expected: ["1", "2", "Fizz"] },
      { name: "n=5", args: [5], expected: ["1", "2", "Fizz", "4", "Buzz"] },
      {
        name: "n=15",
        args: [15],
        expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"],
      },
      { name: "n=1", args: [1], expected: ["1"] },
    ],
    relatedIds: [],
  },
  {
    id: 350,
    slug: "intersection-of-two-arrays-ii",
    title: "Intersection of Two Arrays II",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Map", "Counting"],
    companies: ["amazon", "google", "meta", "microsoft"],
    frequency: 62,
    leetcodeUrl: "https://leetcode.com/problems/intersection-of-two-arrays-ii/",
    description:
      "Return the multiset intersection of two arrays: each value appears in the result as many times as it occurs in both inputs. Any order is accepted.",
    examples: [
      { input: "nums1 = [1,2,2,1], nums2 = [2,2]", output: "[2,2]", explanation: "2 appears twice in each." },
      { input: "nums1 = [4,9,5], nums2 = [9,4,9,8,4]", output: "[4,9]", explanation: "4 and 9 each appear in both." },
    ],
    intuition:
      "Count how many times each value occurs in the first array. Then scan the second array, and whenever a value still has remaining count, emit it and decrement the count. This naturally handles repeated values up to the smaller multiplicity.",
    approach: [
      "Tally the frequency of every value in nums1 with a hash map.",
      "Walk through nums2; for each value with a positive remaining count, append it and decrement.",
      "Skip values whose count has reached zero.",
      "Return the collected matches.",
    ],
    complexity: { time: "O(m + n)", space: "O(min(m, n))", note: "Counts the smaller array." },
    solutions: [
      {
        language: "python",
        label: "Counting",
        code: `from collections import Counter

def intersect(nums1: list[int], nums2: list[int]) -> list[int]:
    counts = Counter(nums1)
    result = []
    for x in nums2:
        if counts[x] > 0:
            result.append(x)
            counts[x] -= 1
    return result`,
      },
      {
        language: "typescript",
        label: "Counting",
        code: `function intersect(nums1: number[], nums2: number[]): number[] {
  const counts = new Map<number, number>();
  for (const x of nums1) counts.set(x, (counts.get(x) ?? 0) + 1);
  const result: number[] = [];
  for (const x of nums2) {
    const c = counts.get(x) ?? 0;
    if (c > 0) {
      result.push(x);
      counts.set(x, c - 1);
    }
  }
  return result;
}`,
      },
    ],
    runner: {
      entry: "intersect",
      comparison: "canonical",
      jsStarter: `function intersect(nums1, nums2) {
  // Return the multiset intersection of the two arrays.
  // TODO: implement
}`,
      jsReference: `function intersect(nums1, nums2) {
  const counts = new Map();
  for (const x of nums1) counts.set(x, (counts.get(x) ?? 0) + 1);
  const result = [];
  for (const x of nums2) {
    const c = counts.get(x) ?? 0;
    if (c > 0) {
      result.push(x);
      counts.set(x, c - 1);
    }
  }
  return result;
}`,
    },
    tests: [
      { name: "repeated", args: [[1, 2, 2, 1], [2, 2]], expected: [2, 2] },
      { name: "unordered", args: [[4, 9, 5], [9, 4, 9, 8, 4]], expected: [4, 9] },
      { name: "disjoint", args: [[1, 2], [3, 4]], expected: [] },
      { name: "capped count", args: [[1, 1, 1], [1, 1]], expected: [1, 1] },
      { name: "min multiplicity", args: [[2, 2], [2, 2, 2]], expected: [2, 2] },
    ],
    relatedIds: [349],
  },
  {
    id: 219,
    slug: "contains-duplicate-ii",
    title: "Contains Duplicate II",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Map", "Sliding Window"],
    companies: ["amazon", "google", "microsoft", "adobe"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/contains-duplicate-ii/",
    description:
      "Return true if the array has two equal values whose indices differ by at most k.",
    examples: [
      { input: "nums = [1,2,3,1], k = 3", output: "true", explanation: "The two 1s are 3 indices apart." },
      { input: "nums = [1,2,3,1,2,3], k = 2", output: "false", explanation: "Equal values are 3 apart, exceeding k." },
    ],
    intuition:
      "Remember the most recent index where each value appeared. When you see a value again, the closest prior occurrence is the best chance to satisfy the distance constraint, so compare the gap immediately.",
    approach: [
      "Keep a map from value to its latest index.",
      "For each index i, if the value was seen and i minus its last index is at most k, return true.",
      "Otherwise update the value's last index to i.",
      "Return false if no qualifying pair appears.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Map holds at most n distinct values." },
    solutions: [
      {
        language: "python",
        label: "Last-Seen Map",
        code: `def contains_nearby_duplicate(nums: list[int], k: int) -> bool:
    last = {}
    for i, x in enumerate(nums):
        if x in last and i - last[x] <= k:
            return True
        last[x] = i
    return False`,
      },
      {
        language: "typescript",
        label: "Last-Seen Map",
        code: `function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const last = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const prev = last.get(nums[i]);
    if (prev !== undefined && i - prev <= k) return true;
    last.set(nums[i], i);
  }
  return false;
}`,
      },
    ],
    runner: {
      entry: "containsNearbyDuplicate",
      comparison: "deep",
      jsStarter: `function containsNearbyDuplicate(nums, k) {
  // Return true if equal values exist within k indices.
  // TODO: implement
}`,
      jsReference: `function containsNearbyDuplicate(nums, k) {
  const last = new Map();
  for (let i = 0; i < nums.length; i++) {
    const prev = last.get(nums[i]);
    if (prev !== undefined && i - prev <= k) return true;
    last.set(nums[i], i);
  }
  return false;
}`,
    },
    tests: [
      { name: "within range", args: [[1, 2, 3, 1], 3], expected: true },
      { name: "adjacent", args: [[1, 0, 1, 1], 1], expected: true },
      { name: "too far", args: [[1, 2, 3, 1, 2, 3], 2], expected: false },
      { name: "k=2 pair", args: [[99, 99], 2], expected: true },
      { name: "single", args: [[1], 0], expected: false },
    ],
    relatedIds: [217, 220],
  },
  {
    id: 205,
    slug: "isomorphic-strings",
    title: "Isomorphic Strings",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Map", "Bijection"],
    companies: ["amazon", "google", "linkedin", "microsoft"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/isomorphic-strings/",
    description:
      "Two strings are isomorphic if one can be transformed into the other by a consistent one-to-one character mapping that preserves order.",
    examples: [
      { input: 's = "egg", t = "add"', output: "true", explanation: "e maps to a and g maps to d consistently." },
      { input: 's = "foo", t = "bar"', output: "false", explanation: "o would need to map to both a and r." },
    ],
    intuition:
      "A valid isomorphism is a bijection: every character in s maps to exactly one character in t, and no two characters in s map to the same character in t. Track both directions to enforce uniqueness in each.",
    approach: [
      "Reject immediately if the lengths differ.",
      "Maintain two maps: s to t and t to s.",
      "For each aligned pair, either record a fresh consistent mapping or verify it matches both stored directions.",
      "Return false on any conflict, true if all pairs agree.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Bounded by the alphabet size." },
    solutions: [
      {
        language: "python",
        label: "Two Maps",
        code: `def is_isomorphic(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    map_st, map_ts = {}, {}
    for a, b in zip(s, t):
        if a in map_st or b in map_ts:
            if map_st.get(a) != b or map_ts.get(b) != a:
                return False
        else:
            map_st[a] = b
            map_ts[b] = a
    return True`,
      },
      {
        language: "typescript",
        label: "Two Maps",
        code: `function isIsomorphic(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const mapST = new Map<string, string>();
  const mapTS = new Map<string, string>();
  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = t[i];
    if (mapST.has(a) || mapTS.has(b)) {
      if (mapST.get(a) !== b || mapTS.get(b) !== a) return false;
    } else {
      mapST.set(a, b);
      mapTS.set(b, a);
    }
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "isIsomorphic",
      comparison: "deep",
      jsStarter: `function isIsomorphic(s, t) {
  // Return true if s and t are isomorphic.
  // TODO: implement
}`,
      jsReference: `function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  const mapST = new Map();
  const mapTS = new Map();
  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = t[i];
    if (mapST.has(a) || mapTS.has(b)) {
      if (mapST.get(a) !== b || mapTS.get(b) !== a) return false;
    } else {
      mapST.set(a, b);
      mapTS.set(b, a);
    }
  }
  return true;
}`,
    },
    tests: [
      { name: "true", args: ["egg", "add"], expected: true },
      { name: "conflict", args: ["foo", "bar"], expected: false },
      { name: "paper title", args: ["paper", "title"], expected: true },
      { name: "reuse target", args: ["badc", "baba"], expected: false },
      { name: "collapse", args: ["ab", "aa"], expected: false },
    ],
    relatedIds: [290, 242],
  },
  {
    id: 290,
    slug: "word-pattern",
    title: "Word Pattern",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Map", "Bijection"],
    companies: ["amazon", "google", "microsoft", "uber"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/word-pattern/",
    description:
      "Check whether a string of space-separated words follows a single-character pattern under a consistent one-to-one mapping.",
    examples: [
      { input: 'pattern = "abba", s = "dog cat cat dog"', output: "true", explanation: "a maps to dog, b maps to cat." },
      { input: 'pattern = "abba", s = "dog cat cat fish"', output: "false", explanation: "a would map to both dog and fish." },
    ],
    intuition:
      "Split the sentence into words and require a bijection between pattern letters and words. As with isomorphic strings, enforce uniqueness in both directions so no letter and no word is double-assigned.",
    approach: [
      "Split s into words and fail if the count differs from the pattern length.",
      "Maintain letter to word and word to letter maps.",
      "For each aligned pair, add a consistent mapping or verify the existing one in both directions.",
      "Return false on any conflict, otherwise true.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "n is the number of words." },
    solutions: [
      {
        language: "python",
        label: "Two Maps",
        code: `def word_pattern(pattern: str, s: str) -> bool:
    words = s.split()
    if len(pattern) != len(words):
        return False
    p_to_w, w_to_p = {}, {}
    for p, w in zip(pattern, words):
        if p in p_to_w or w in w_to_p:
            if p_to_w.get(p) != w or w_to_p.get(w) != p:
                return False
        else:
            p_to_w[p] = w
            w_to_p[w] = p
    return True`,
      },
      {
        language: "typescript",
        label: "Two Maps",
        code: `function wordPattern(pattern: string, s: string): boolean {
  const words = s.split(" ");
  if (pattern.length !== words.length) return false;
  const pToW = new Map<string, string>();
  const wToP = new Map<string, string>();
  for (let i = 0; i < pattern.length; i++) {
    const p = pattern[i], w = words[i];
    if (pToW.has(p) || wToP.has(w)) {
      if (pToW.get(p) !== w || wToP.get(w) !== p) return false;
    } else {
      pToW.set(p, w);
      wToP.set(w, p);
    }
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "wordPattern",
      comparison: "deep",
      jsStarter: `function wordPattern(pattern, s) {
  // Return true if s follows the pattern under a bijection.
  // TODO: implement
}`,
      jsReference: `function wordPattern(pattern, s) {
  const words = s.split(" ");
  if (pattern.length !== words.length) return false;
  const pToW = new Map();
  const wToP = new Map();
  for (let i = 0; i < pattern.length; i++) {
    const p = pattern[i], w = words[i];
    if (pToW.has(p) || wToP.has(w)) {
      if (pToW.get(p) !== w || wToP.get(w) !== p) return false;
    } else {
      pToW.set(p, w);
      wToP.set(w, p);
    }
  }
  return true;
}`,
    },
    tests: [
      { name: "true", args: ["abba", "dog cat cat dog"], expected: true },
      { name: "word conflict", args: ["abba", "dog cat cat fish"], expected: false },
      { name: "letter conflict", args: ["aaaa", "dog cat cat dog"], expected: false },
      { name: "word reuse", args: ["abba", "dog dog dog dog"], expected: false },
      { name: "three", args: ["abc", "b c a"], expected: true },
    ],
    relatedIds: [205, 242],
  },
  {
    id: 338,
    slug: "counting-bits",
    title: "Counting Bits",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["Dynamic Programming", "Bit Tricks"],
    companies: ["amazon", "google", "apple", "nvidia"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/counting-bits/",
    description:
      "For every integer from 0 through n, return an array where each entry is the number of set bits in that integer.",
    examples: [
      { input: "n = 2", output: "[0,1,1]", explanation: "0 has 0 bits, 1 and 2 each have 1." },
      { input: "n = 5", output: "[0,1,1,2,1,2]", explanation: "3 and 5 each have two set bits." },
    ],
    intuition:
      "The bit count of i equals the bit count of i shifted right by one, plus the lowest bit of i. Since i >> 1 is always smaller than i, its answer is already computed, giving an O(n) dynamic program.",
    approach: [
      "Allocate an answer array of size n + 1 with answer[0] = 0.",
      "For each i from 1 to n, set answer[i] = answer[i >> 1] + (i & 1).",
      "This reuses the previously computed smaller subproblem.",
      "Return the filled array.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "One transition per number." },
    solutions: [
      {
        language: "python",
        label: "DP on Bits",
        code: `def count_bits(n: int) -> list[int]:
    ans = [0] * (n + 1)
    for i in range(1, n + 1):
        ans[i] = ans[i >> 1] + (i & 1)
    return ans`,
      },
      {
        language: "typescript",
        label: "DP on Bits",
        code: `function countBits(n: number): number[] {
  const ans = new Array<number>(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
}`,
      },
    ],
    runner: {
      entry: "countBits",
      comparison: "deep",
      jsStarter: `function countBits(n) {
  // Return the set-bit counts for 0..n.
  // TODO: implement
}`,
      jsReference: `function countBits(n) {
  const ans = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
}`,
    },
    tests: [
      { name: "n=2", args: [2], expected: [0, 1, 1] },
      { name: "n=5", args: [5], expected: [0, 1, 1, 2, 1, 2] },
      { name: "n=0", args: [0], expected: [0] },
      { name: "n=8", args: [8], expected: [0, 1, 1, 2, 1, 2, 2, 3, 1] },
      { name: "n=1", args: [1], expected: [0, 1] },
    ],
    relatedIds: [191],
  },
  {
    id: 190,
    slug: "reverse-bits",
    title: "Reverse Bits",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["Bit Tricks"],
    companies: ["amazon", "apple", "nvidia", "microsoft"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/reverse-bits/",
    description:
      "Reverse the order of the 32 bits of an unsigned integer and return the resulting unsigned value.",
    examples: [
      { input: "n = 43261596", output: "964176192", explanation: "The 32-bit pattern is mirrored end to end." },
      { input: "n = 4294967293", output: "3221225471", explanation: "Only the second-lowest bit is zero, landing near the top after reversal." },
    ],
    intuition:
      "Build the answer bit by bit: shift the result left to make room, append the current lowest bit of n, then shift n right. After 32 iterations the bits sit in reversed positions. Use an unsigned cast so the final value is non-negative.",
    approach: [
      "Initialize result to 0.",
      "Repeat 32 times: shift result left by one and OR in n's least significant bit.",
      "Shift n right (unsigned) to expose the next bit.",
      "Return the result reinterpreted as an unsigned 32-bit integer.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "Fixed 32 iterations." },
    solutions: [
      {
        language: "python",
        label: "Bit by Bit",
        code: `def reverse_bits(n: int) -> int:
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result`,
      },
      {
        language: "typescript",
        label: "Bit by Bit",
        code: `function reverseBits(n: number): number {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n = n >>> 1;
  }
  return result >>> 0;
}`,
      },
    ],
    runner: {
      entry: "reverseBits",
      comparison: "deep",
      jsStarter: `function reverseBits(n) {
  // Return the 32-bit reversal of n as an unsigned integer.
  // TODO: implement
}`,
      jsReference: `function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n = n >>> 1;
  }
  return result >>> 0;
}`,
    },
    tests: [
      { name: "sample", args: [43261596], expected: 964176192 },
      { name: "high bits", args: [4294967293], expected: 3221225471 },
      { name: "zero", args: [0], expected: 0 },
      { name: "lowest bit", args: [1], expected: 2147483648 },
      { name: "highest bit", args: [2147483648], expected: 1 },
    ],
    relatedIds: [191, 7],
  },
];

export default batchA;
