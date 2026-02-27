import type { Problem } from "../types.ts";

/**
 * Batch I — twenty easy/medium/hard problems spanning arrays & hashing
 * (prefix sums, frequency counting, two design-by-operations problems),
 * two-pointers (partitioning, in-place rotation, water trapping), and
 * sliding-window. Every record ships working Python + TypeScript solutions and
 * a fully wired playground runner with hand-verified tests.
 */
export const batchI: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Arrays & Hashing
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 525,
    slug: "contiguous-array",
    title: "Contiguous Array",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Prefix Sum", "Hash Map"],
    companies: ["amazon", "meta", "google", "microsoft"],
    frequency: 72,
    leetcodeUrl: "https://leetcode.com/problems/contiguous-array/",
    description:
      "Given a binary array of 0s and 1s, find the length of the longest contiguous slice that holds an equal count of each value.",
    examples: [
      { input: "nums = [0,1]", output: "2", explanation: "The whole array has one 0 and one 1." },
      { input: "nums = [0,1,0]", output: "2", explanation: "Either [0,1] or [1,0] is a longest balanced slice." },
    ],
    intuition:
      "Treat every 0 as -1 and every 1 as +1, then track a running sum. Two indices that share the same running sum enclose a stretch that nets to zero — meaning equal 0s and 1s. Remember the first index at which each sum appears so any later repeat yields a candidate length.",
    approach: [
      "Initialize a map with running sum 0 mapped to index -1 (the empty prefix).",
      "Scan the array, adding +1 for a 1 and -1 for a 0.",
      "If the current sum was seen before, update the best length with i minus its first index.",
      "Otherwise record the current index as the first time this sum occurred.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "One pass; the map stores at most n+1 distinct sums." },
    solutions: [
      {
        language: "python",
        label: "Prefix Sum",
        code: `def find_max_length(nums: list[int]) -> int:
    first = {0: -1}
    count = best = 0
    for i, x in enumerate(nums):
        count += 1 if x == 1 else -1
        if count in first:
            best = max(best, i - first[count])
        else:
            first[count] = i
    return best`,
      },
      {
        language: "typescript",
        label: "Prefix Sum",
        code: `function findMaxLength(nums: number[]): number {
  const first = new Map<number, number>([[0, -1]]);
  let count = 0;
  let best = 0;
  for (let i = 0; i < nums.length; i++) {
    count += nums[i] === 1 ? 1 : -1;
    if (first.has(count)) best = Math.max(best, i - first.get(count)!);
    else first.set(count, i);
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "findMaxLength",
      comparison: "deep",
      jsStarter: `function findMaxLength(nums) {
  // Return the longest contiguous subarray with equal 0s and 1s.
  // TODO: implement
}`,
      jsReference: `function findMaxLength(nums) {
  const first = new Map([[0, -1]]);
  let count = 0;
  let best = 0;
  for (let i = 0; i < nums.length; i++) {
    count += nums[i] === 1 ? 1 : -1;
    if (first.has(count)) best = Math.max(best, i - first.get(count));
    else first.set(count, i);
  }
  return best;
}`,
    },
    tests: [
      { name: "pair", args: [[0, 1]], expected: 2 },
      { name: "odd length", args: [[0, 1, 0]], expected: 2 },
      { name: "whole array balanced", args: [[0, 1, 1, 1, 0, 0]], expected: 6 },
      { name: "all ones", args: [[1, 1, 1, 1]], expected: 0 },
    ],
    hints: ["Map 0 to -1 so balance means a zero-sum window.", "Store the earliest index of each running sum."],
    relatedIds: [560, 974],
  },
  {
    id: 560,
    slug: "subarray-sum-equals-k",
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Prefix Sum", "Hash Map"],
    companies: ["amazon", "meta", "google", "microsoft", "bloomberg"],
    frequency: 80,
    leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/",
    description:
      "Count how many contiguous subarrays of an integer array add up to exactly k. Values may be negative.",
    examples: [
      { input: "nums = [1,1,1], k = 2", output: "2", explanation: "The two windows [1,1] (indices 0-1 and 1-2)." },
      { input: "nums = [1,2,3], k = 3", output: "2", explanation: "[1,2] and [3] both total 3." },
    ],
    intuition:
      "A window from i+1..j sums to k exactly when prefix[j] - prefix[i] = k, i.e. prefix[i] = prefix[j] - k. So as you sweep the prefix sums, count how many earlier prefixes equal the current sum minus k. A hash map of prefix-sum frequencies makes each lookup O(1).",
    approach: [
      "Seed a frequency map with prefix sum 0 occurring once.",
      "Maintain a running sum as you scan.",
      "Add to the answer the number of times (sum - k) has already appeared.",
      "Increment the frequency of the current running sum.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Single pass with a prefix-sum frequency map." },
    solutions: [
      {
        language: "python",
        label: "Prefix Sum",
        code: `def subarray_sum(nums: list[int], k: int) -> int:
    counts = {0: 1}
    total = res = 0
    for x in nums:
        total += x
        res += counts.get(total - k, 0)
        counts[total] = counts.get(total, 0) + 1
    return res`,
      },
      {
        language: "typescript",
        label: "Prefix Sum",
        code: `function subarraySum(nums: number[], k: number): number {
  const counts = new Map<number, number>([[0, 1]]);
  let total = 0;
  let res = 0;
  for (const x of nums) {
    total += x;
    res += counts.get(total - k) ?? 0;
    counts.set(total, (counts.get(total) ?? 0) + 1);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "subarraySum",
      comparison: "deep",
      jsStarter: `function subarraySum(nums, k) {
  // Count contiguous subarrays summing to k.
  // TODO: implement
}`,
      jsReference: `function subarraySum(nums, k) {
  const counts = new Map([[0, 1]]);
  let total = 0;
  let res = 0;
  for (const x of nums) {
    total += x;
    res += counts.get(total - k) || 0;
    counts.set(total, (counts.get(total) || 0) + 1);
  }
  return res;
}`,
    },
    tests: [
      { name: "overlapping ones", args: [[1, 1, 1], 2], expected: 2 },
      { name: "distinct windows", args: [[1, 2, 3], 3], expected: 2 },
      { name: "zeros and negatives", args: [[1, -1, 0], 0], expected: 3 },
      { name: "longer mix", args: [[3, 4, 7, 2, -3, 1, 4, 2], 7], expected: 4 },
    ],
    hints: ["Convert window sums into a difference of prefix sums.", "Look up (sum - k) in a frequency map."],
    relatedIds: [525, 974],
  },
  {
    id: 974,
    slug: "subarray-sums-divisible-by-k",
    title: "Subarray Sums Divisible by K",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Prefix Sum", "Hash Map", "Modular Arithmetic"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/subarray-sums-divisible-by-k/",
    description:
      "Count the contiguous subarrays whose sum is a multiple of k (a sum of 0 counts as divisible).",
    examples: [
      { input: "nums = [4,5,0,-2,-3,1], k = 5", output: "7" },
      { input: "nums = [5], k = 5", output: "1", explanation: "The single element 5 is divisible by 5." },
    ],
    intuition:
      "A window sums to a multiple of k exactly when its two enclosing prefix sums share the same remainder modulo k. Track the running remainder and count how many earlier prefixes had that same remainder. Normalize negative remainders into the range 0..k-1 so the buckets line up.",
    approach: [
      "Seed a remainder-frequency map with remainder 0 seen once.",
      "Keep a running sum and compute its non-negative remainder mod k.",
      "Add the current count of that remainder to the answer.",
      "Increment the frequency of the current remainder.",
    ],
    complexity: { time: "O(n)", space: "O(k)", note: "Map holds at most k distinct remainders." },
    solutions: [
      {
        language: "python",
        label: "Prefix Remainders",
        code: `def subarrays_div_by_k(nums: list[int], k: int) -> int:
    counts = {0: 1}
    total = res = 0
    for x in nums:
        total += x
        r = total % k  # Python keeps this non-negative for positive k
        res += counts.get(r, 0)
        counts[r] = counts.get(r, 0) + 1
    return res`,
      },
      {
        language: "typescript",
        label: "Prefix Remainders",
        code: `function subarraysDivByK(nums: number[], k: number): number {
  const counts = new Map<number, number>([[0, 1]]);
  let total = 0;
  let res = 0;
  for (const x of nums) {
    total += x;
    const r = ((total % k) + k) % k;
    res += counts.get(r) ?? 0;
    counts.set(r, (counts.get(r) ?? 0) + 1);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "subarraysDivByK",
      comparison: "deep",
      jsStarter: `function subarraysDivByK(nums, k) {
  // Count subarrays whose sum is divisible by k.
  // TODO: implement
}`,
      jsReference: `function subarraysDivByK(nums, k) {
  const counts = new Map([[0, 1]]);
  let total = 0;
  let res = 0;
  for (const x of nums) {
    total += x;
    const r = ((total % k) + k) % k;
    res += counts.get(r) || 0;
    counts.set(r, (counts.get(r) || 0) + 1);
  }
  return res;
}`,
    },
    tests: [
      { name: "classic", args: [[4, 5, 0, -2, -3, 1], 5], expected: 7 },
      { name: "single multiple", args: [[5], 5], expected: 1 },
      { name: "negatives", args: [[-1, 2, 9], 2], expected: 2 },
      { name: "balanced pairs", args: [[2, -2, 2, -4], 6], expected: 2 },
    ],
    hints: ["Equal prefix remainders bound a divisible window.", "Fold negative remainders back into 0..k-1."],
    relatedIds: [523, 560],
  },
  {
    id: 705,
    slug: "design-hashset",
    title: "Design HashSet",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Design", "Hashing"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/design-hashset/",
    description:
      "Implement a set of integers from scratch supporting add, remove, and membership tests without relying on a built-in set.",
    examples: [
      {
        input:
          'ops = ["MyHashSet","add","add","contains","contains","add","contains","remove","contains"], args = [[],[1],[2],[1],[3],[2],[2],[2],[2]]',
        output: "[null,null,null,true,false,null,true,null,false]",
        explanation: "After adding 1 and 2, contains(1) is true and contains(3) is false; removing 2 makes contains(2) false.",
      },
    ],
    intuition:
      "Spread keys across a fixed number of buckets using key % size, and keep a small list per bucket for collisions. Add appends only when the key is absent, remove deletes it from its bucket, and contains scans the matching bucket. With a reasonable bucket count each operation touches just a short list.",
    approach: [
      "Allocate an array of empty buckets (e.g. 1000 lists).",
      "Hash a key to a bucket with key modulo the bucket count.",
      "add: append the key to its bucket if not already present.",
      "remove: delete the key from its bucket if present.",
      "contains: report whether the key sits in its bucket.",
    ],
    complexity: { time: "O(1) average", space: "O(n)", note: "Worst case O(n) if all keys collide into one bucket." },
    solutions: [
      {
        language: "python",
        label: "Bucket Chaining",
        code: `class MyHashSet:
    def __init__(self) -> None:
        self.buckets: list[list[int]] = [[] for _ in range(1000)]

    def _bucket(self, key: int) -> list[int]:
        return self.buckets[key % 1000]

    def add(self, key: int) -> None:
        b = self._bucket(key)
        if key not in b:
            b.append(key)

    def remove(self, key: int) -> None:
        b = self._bucket(key)
        if key in b:
            b.remove(key)

    def contains(self, key: int) -> bool:
        return key in self._bucket(key)`,
      },
      {
        language: "typescript",
        label: "Bucket Chaining",
        code: `class MyHashSet {
  private buckets: number[][] = Array.from({ length: 1000 }, () => []);

  private bucket(key: number): number[] {
    return this.buckets[key % 1000];
  }

  add(key: number): void {
    const b = this.bucket(key);
    if (!b.includes(key)) b.push(key);
  }

  remove(key: number): void {
    const b = this.bucket(key);
    const i = b.indexOf(key);
    if (i !== -1) b.splice(i, 1);
  }

  contains(key: number): boolean {
    return this.bucket(key).includes(key);
  }
}`,
      },
    ],
    runner: {
      entry: "runHashSet",
      comparison: "deep",
      jsStarter: `function runHashSet(ops, args) {
  // Replay the operations and return an array of results.
  // "MyHashSet"/"add"/"remove" return null; "contains" returns a boolean.
  // TODO: implement the hash set and the driver loop.
}`,
      jsReference: `function runHashSet(ops, args) {
  class MyHashSet {
    constructor() { this.buckets = Array.from({ length: 1000 }, () => []); }
    bucket(key) { return this.buckets[key % 1000]; }
    add(key) { const b = this.bucket(key); if (!b.includes(key)) b.push(key); }
    remove(key) { const b = this.bucket(key); const i = b.indexOf(key); if (i !== -1) b.splice(i, 1); }
    contains(key) { return this.bucket(key).includes(key); }
  }
  const out = [];
  let set = null;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i] || [];
    if (op === "MyHashSet") { set = new MyHashSet(); out.push(null); }
    else if (op === "add") { set.add(a[0]); out.push(null); }
    else if (op === "remove") { set.remove(a[0]); out.push(null); }
    else if (op === "contains") out.push(set.contains(a[0]));
  }
  return out;
}`,
    },
    tests: [
      {
        name: "leetcode sequence",
        args: [
          ["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"],
          [[], [1], [2], [1], [3], [2], [2], [2], [2]],
        ],
        expected: [null, null, null, true, false, null, true, null, false],
      },
      {
        name: "contains before add",
        args: [
          ["MyHashSet", "contains", "add", "contains"],
          [[], [5], [5], [5]],
        ],
        expected: [null, false, null, true],
      },
      {
        name: "remove then check",
        args: [
          ["MyHashSet", "add", "remove", "contains"],
          [[], [7], [7], [7]],
        ],
        expected: [null, null, null, false],
      },
    ],
    hints: ["Hash keys into a fixed array of buckets.", "Resolve collisions with a list per bucket."],
    relatedIds: [706],
  },
  {
    id: 706,
    slug: "design-hashmap",
    title: "Design HashMap",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Design", "Hashing"],
    companies: ["amazon", "microsoft", "bloomberg", "apple"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/design-hashmap/",
    description:
      "Build a key-to-value map of integers from scratch supporting put, get, and remove, where get returns -1 for a missing key.",
    examples: [
      {
        input:
          'ops = ["MyHashMap","put","put","get","get","put","get","remove","get"], args = [[],[1,1],[2,2],[1],[3],[2,1],[2],[2],[2]]',
        output: "[null,null,null,1,-1,null,1,null,-1]",
        explanation: "put(2,1) overwrites the value for key 2, then removing key 2 makes get(2) return -1.",
      },
    ],
    intuition:
      "Hash each key into a bucket and store (key, value) pairs there. put either overwrites the matching key or appends a new pair, get scans the bucket for the key, and remove drops the pair. Distributing keys across many buckets keeps each list short.",
    approach: [
      "Allocate an array of empty buckets keyed by key modulo the bucket count.",
      "put: update the value if the key already exists in its bucket, else append a new pair.",
      "get: return the value of the matching pair, or -1 if absent.",
      "remove: delete the matching pair from its bucket.",
    ],
    complexity: { time: "O(1) average", space: "O(n)", note: "Worst case O(n) if many keys hash to one bucket." },
    solutions: [
      {
        language: "python",
        label: "Bucket Chaining",
        code: `class MyHashMap:
    def __init__(self) -> None:
        self.buckets: list[list[tuple[int, int]]] = [[] for _ in range(1000)]

    def _bucket(self, key: int) -> list[tuple[int, int]]:
        return self.buckets[key % 1000]

    def put(self, key: int, value: int) -> None:
        b = self._bucket(key)
        for i, (k, _) in enumerate(b):
            if k == key:
                b[i] = (key, value)
                return
        b.append((key, value))

    def get(self, key: int) -> int:
        for k, v in self._bucket(key):
            if k == key:
                return v
        return -1

    def remove(self, key: int) -> None:
        b = self._bucket(key)
        for i, (k, _) in enumerate(b):
            if k == key:
                b.pop(i)
                return`,
      },
      {
        language: "typescript",
        label: "Bucket Chaining",
        code: `class MyHashMap {
  private buckets: [number, number][][] = Array.from({ length: 1000 }, () => []);

  private bucket(key: number): [number, number][] {
    return this.buckets[key % 1000];
  }

  put(key: number, value: number): void {
    const b = this.bucket(key);
    for (const pair of b) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    b.push([key, value]);
  }

  get(key: number): number {
    for (const [k, v] of this.bucket(key)) {
      if (k === key) return v;
    }
    return -1;
  }

  remove(key: number): void {
    const b = this.bucket(key);
    const i = b.findIndex((p) => p[0] === key);
    if (i !== -1) b.splice(i, 1);
  }
}`,
      },
    ],
    runner: {
      entry: "runHashMap",
      comparison: "deep",
      jsStarter: `function runHashMap(ops, args) {
  // Replay the operations and return an array of results.
  // "MyHashMap"/"put"/"remove" return null; "get" returns the value or -1.
  // TODO: implement the hash map and the driver loop.
}`,
      jsReference: `function runHashMap(ops, args) {
  class MyHashMap {
    constructor() { this.buckets = Array.from({ length: 1000 }, () => []); }
    bucket(key) { return this.buckets[key % 1000]; }
    put(key, value) {
      const b = this.bucket(key);
      for (const pair of b) { if (pair[0] === key) { pair[1] = value; return; } }
      b.push([key, value]);
    }
    get(key) {
      for (const [k, v] of this.bucket(key)) { if (k === key) return v; }
      return -1;
    }
    remove(key) {
      const b = this.bucket(key);
      const i = b.findIndex((p) => p[0] === key);
      if (i !== -1) b.splice(i, 1);
    }
  }
  const out = [];
  let map = null;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i] || [];
    if (op === "MyHashMap") { map = new MyHashMap(); out.push(null); }
    else if (op === "put") { map.put(a[0], a[1]); out.push(null); }
    else if (op === "get") out.push(map.get(a[0]));
    else if (op === "remove") { map.remove(a[0]); out.push(null); }
  }
  return out;
}`,
    },
    tests: [
      {
        name: "leetcode sequence",
        args: [
          ["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"],
          [[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]],
        ],
        expected: [null, null, null, 1, -1, null, 1, null, -1],
      },
      {
        name: "get missing then set",
        args: [
          ["MyHashMap", "get", "put", "get"],
          [[], [0], [0, 10], [0]],
        ],
        expected: [null, -1, null, 10],
      },
      {
        name: "remove clears value",
        args: [
          ["MyHashMap", "put", "remove", "get"],
          [[], [3, 9], [3], [3]],
        ],
        expected: [null, null, null, -1],
      },
    ],
    hints: ["Store (key, value) pairs inside hashed buckets.", "On put, overwrite a matching key before appending."],
    relatedIds: [705],
  },
  {
    id: 387,
    slug: "first-unique-character-in-a-string",
    title: "First Unique Character in a String",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Map", "Counting"],
    companies: ["amazon", "google", "microsoft", "bloomberg", "goldman-sachs"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/first-unique-character-in-a-string/",
    description:
      "Return the index of the first character in a string that never repeats, or -1 if every character appears more than once.",
    examples: [
      { input: 's = "leetcode"', output: "0", explanation: "'l' appears once and is the earliest such character." },
      { input: 's = "loveleetcode"', output: "2", explanation: "'v' at index 2 is the first non-repeating letter." },
    ],
    intuition:
      "Frequencies are all you need. Count every character in one pass, then scan the string again and return the first position whose character has a count of exactly one. If none qualify, the answer is -1.",
    approach: [
      "Tally the frequency of each character.",
      "Iterate over the string by index a second time.",
      "Return the first index whose character has frequency one.",
      "If the loop finishes with no unique character, return -1.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Frequency table is bounded by the alphabet size." },
    solutions: [
      {
        language: "python",
        label: "Frequency Count",
        code: `from collections import Counter


def first_uniq_char(s: str) -> int:
    counts = Counter(s)
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1`,
      },
      {
        language: "typescript",
        label: "Frequency Count",
        code: `function firstUniqChar(s: string): number {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (counts.get(s[i]) === 1) return i;
  }
  return -1;
}`,
      },
    ],
    runner: {
      entry: "firstUniqChar",
      comparison: "deep",
      jsStarter: `function firstUniqChar(s) {
  // Return the index of the first non-repeating character, or -1.
  // TODO: implement
}`,
      jsReference: `function firstUniqChar(s) {
  const counts = new Map();
  for (const ch of s) counts.set(ch, (counts.get(ch) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (counts.get(s[i]) === 1) return i;
  }
  return -1;
}`,
    },
    tests: [
      { name: "first char unique", args: ["leetcode"], expected: 0 },
      { name: "unique in middle", args: ["loveleetcode"], expected: 2 },
      { name: "no unique", args: ["aabb"], expected: -1 },
      { name: "single char", args: ["z"], expected: 0 },
    ],
    hints: ["Count first, then locate.", "The earliest index with frequency one wins."],
    relatedIds: [383, 451],
  },
  {
    id: 383,
    slug: "ransom-note",
    title: "Ransom Note",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Map", "Counting"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/ransom-note/",
    description:
      "Decide whether a ransom note can be assembled using only the letters available in a magazine, where each magazine letter may be used at most once.",
    examples: [
      { input: 'ransomNote = "a", magazine = "b"', output: "false" },
      { input: 'ransomNote = "aa", magazine = "aab"', output: "true", explanation: "The magazine supplies two 'a's." },
    ],
    intuition:
      "This is a multiset containment check. Count how many of each letter the magazine offers, then verify the note never asks for more of any letter than is available. Equivalent to comparing two frequency tables.",
    approach: [
      "Count each character available in the magazine.",
      "Count each character required by the ransom note.",
      "Return false if any required count exceeds the available count.",
      "Otherwise return true.",
    ],
    complexity: { time: "O(n + m)", space: "O(1)", note: "Bounded by the alphabet size." },
    solutions: [
      {
        language: "python",
        label: "Frequency Compare",
        code: `from collections import Counter


def can_construct(ransom_note: str, magazine: str) -> bool:
    have = Counter(magazine)
    need = Counter(ransom_note)
    return all(have[ch] >= cnt for ch, cnt in need.items())`,
      },
      {
        language: "typescript",
        label: "Frequency Compare",
        code: `function canConstruct(ransomNote: string, magazine: string): boolean {
  const counts = new Map<string, number>();
  for (const ch of magazine) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  for (const ch of ransomNote) {
    const c = counts.get(ch) ?? 0;
    if (c === 0) return false;
    counts.set(ch, c - 1);
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "canConstruct",
      comparison: "deep",
      jsStarter: `function canConstruct(ransomNote, magazine) {
  // Return true if the note can be built from the magazine letters.
  // TODO: implement
}`,
      jsReference: `function canConstruct(ransomNote, magazine) {
  const counts = new Map();
  for (const ch of magazine) counts.set(ch, (counts.get(ch) || 0) + 1);
  for (const ch of ransomNote) {
    const c = counts.get(ch) || 0;
    if (c === 0) return false;
    counts.set(ch, c - 1);
  }
  return true;
}`,
    },
    tests: [
      { name: "missing letter", args: ["a", "b"], expected: false },
      { name: "not enough copies", args: ["aa", "ab"], expected: false },
      { name: "exactly enough", args: ["aa", "aab"], expected: true },
      { name: "empty note", args: ["", "abc"], expected: true },
    ],
    hints: ["Treat each string as a letter multiset.", "Every required letter must be covered by supply."],
    relatedIds: [242, 387],
  },
  {
    id: 451,
    slug: "sort-characters-by-frequency",
    title: "Sort Characters By Frequency",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Hash Map", "Sorting", "Counting"],
    companies: ["amazon", "google", "bloomberg", "nvidia"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/sort-characters-by-frequency/",
    description:
      "Rearrange the characters of a string so that the most frequent characters come first, emitting each character as many times as it occurs.",
    examples: [
      { input: 's = "aaabbc"', output: '"aaabbc"', explanation: "'a' (3) before 'b' (2) before 'c' (1)." },
      { input: 's = "Aaa"', output: '"aaA"', explanation: "Lowercase 'a' (2) outranks uppercase 'A' (1)." },
    ],
    intuition:
      "Count how often each character appears, then order the distinct characters by descending frequency and rebuild the string by repeating each one its count of times. When the counts are all different the ordering is fully determined.",
    approach: [
      "Tally the frequency of every character.",
      "Sort the distinct characters by frequency, highest first.",
      "Concatenate each character repeated by its count.",
      "Return the assembled string.",
    ],
    complexity: { time: "O(n + k log k)", space: "O(n)", note: "k distinct characters; n total length." },
    solutions: [
      {
        language: "python",
        label: "Counter.most_common",
        code: `from collections import Counter


def frequency_sort(s: str) -> str:
    counts = Counter(s)
    return "".join(ch * cnt for ch, cnt in counts.most_common())`,
      },
      {
        language: "typescript",
        label: "Sort by Count",
        code: `function frequencySort(s: string): string {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  const chars = [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)!);
  return chars.map((ch) => ch.repeat(counts.get(ch)!)).join("");
}`,
      },
    ],
    runner: {
      entry: "frequencySort",
      comparison: "deep",
      jsStarter: `function frequencySort(s) {
  // Return the string with characters ordered by descending frequency.
  // TODO: implement
}`,
      jsReference: `function frequencySort(s) {
  const counts = new Map();
  for (const ch of s) counts.set(ch, (counts.get(ch) || 0) + 1);
  const chars = [...counts.keys()].sort((a, b) => counts.get(b) - counts.get(a));
  return chars.map((ch) => ch.repeat(counts.get(ch))).join("");
}`,
    },
    tests: [
      { name: "descending counts", args: ["aaabbc"], expected: "aaabbc" },
      { name: "four three one", args: ["ccccbba"], expected: "ccccbba" },
      { name: "wide gap", args: ["wwwwxxy"], expected: "wwwwxxy" },
      { name: "case sensitive", args: ["Aaa"], expected: "aaA" },
    ],
    hints: ["Count then sort the distinct characters.", "Emit each character count-many times."],
    relatedIds: [347, 387],
  },
  {
    id: 791,
    slug: "custom-sort-string",
    title: "Custom Sort String",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Hash Map", "Counting", "Sorting"],
    companies: ["meta", "amazon", "google"],
    frequency: 45,
    leetcodeUrl: "https://leetcode.com/problems/custom-sort-string/",
    description:
      "Reorder a string so that characters listed in a priority order appear in that order, with any remaining characters placed afterward.",
    examples: [
      { input: 'order = "cba", s = "abcd"', output: '"cbad"', explanation: "c, b, a follow the order; d trails." },
      { input: 'order = "bcafg", s = "abcd"', output: '"bcad"', explanation: "b, c, a follow order; d is left over." },
    ],
    intuition:
      "The priority string only constrains the characters it actually contains. Count the characters of s, walk the order string emitting each listed character its full count of times, then append whatever characters of s were not mentioned in order.",
    approach: [
      "Count the frequency of each character in s.",
      "For each character in order, append it count-many times and drop it from the tally.",
      "Append every remaining character its count-many times.",
      "Return the result.",
    ],
    complexity: { time: "O(n + m)", space: "O(n)", note: "m = order length, n = length of s." },
    solutions: [
      {
        language: "python",
        label: "Counting",
        code: `from collections import Counter


def custom_sort_string(order: str, s: str) -> str:
    counts = Counter(s)
    res: list[str] = []
    for ch in order:
        if ch in counts:
            res.append(ch * counts[ch])
            del counts[ch]
    for ch, cnt in counts.items():
        res.append(ch * cnt)
    return "".join(res)`,
      },
      {
        language: "typescript",
        label: "Counting",
        code: `function customSortString(order: string, s: string): string {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  let res = "";
  for (const ch of order) {
    if (counts.has(ch)) {
      res += ch.repeat(counts.get(ch)!);
      counts.delete(ch);
    }
  }
  for (const [ch, cnt] of counts) res += ch.repeat(cnt);
  return res;
}`,
      },
    ],
    runner: {
      entry: "customSortString",
      comparison: "deep",
      jsStarter: `function customSortString(order, s) {
  // Return s reordered to match the priority in order.
  // TODO: implement
}`,
      jsReference: `function customSortString(order, s) {
  const counts = new Map();
  for (const ch of s) counts.set(ch, (counts.get(ch) || 0) + 1);
  let res = "";
  for (const ch of order) {
    if (counts.has(ch)) {
      res += ch.repeat(counts.get(ch));
      counts.delete(ch);
    }
  }
  for (const [ch, cnt] of counts) res += ch.repeat(cnt);
  return res;
}`,
    },
    tests: [
      { name: "leftover trails", args: ["cba", "abcd"], expected: "cbad" },
      { name: "order with extras", args: ["bcafg", "abcd"], expected: "bcad" },
      { name: "repeats", args: ["kqep", "pekeq"], expected: "kqeep" },
      { name: "none in order", args: ["xyz", "aaa"], expected: "aaa" },
    ],
    hints: ["Order only governs the characters it lists.", "Append unmentioned characters at the end."],
    relatedIds: [451],
  },
  {
    id: 819,
    slug: "most-common-word",
    title: "Most Common Word",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Map", "String Parsing", "Counting"],
    companies: ["amazon", "bloomberg", "microsoft"],
    frequency: 42,
    leetcodeUrl: "https://leetcode.com/problems/most-common-word/",
    description:
      "Given a paragraph and a list of banned words, return the most frequent word that is not banned, comparing words case-insensitively and ignoring punctuation.",
    examples: [
      {
        input: 'paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]',
        output: '"ball"',
        explanation: '"hit" is banned, so "ball" (appearing twice) wins.',
      },
      { input: 'paragraph = "Hello, hello world!", banned = ["world"]', output: '"hello"' },
    ],
    intuition:
      "Normalize the text to lowercase, split it into alphabetic words, and tally the ones not on the banned list. Track the running leader as you count so the first word to reach the highest frequency is returned.",
    approach: [
      "Lowercase the banned list into a set for O(1) checks.",
      "Extract lowercase alphabetic word tokens from the paragraph.",
      "Count each non-banned word, updating the current best when a count strictly exceeds it.",
      "Return the leading word.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "n = paragraph length; tokens and counts stored in maps." },
    solutions: [
      {
        language: "python",
        label: "Regex + Counter",
        code: `import re
from collections import Counter


def most_common_word(paragraph: str, banned: list[str]) -> str:
    ban = {w.lower() for w in banned}
    words = re.findall(r"[a-z]+", paragraph.lower())
    counts = Counter(w for w in words if w not in ban)
    return counts.most_common(1)[0][0]`,
      },
      {
        language: "typescript",
        label: "Regex + Map",
        code: `function mostCommonWord(paragraph: string, banned: string[]): string {
  const ban = new Set(banned.map((w) => w.toLowerCase()));
  const words = paragraph.toLowerCase().match(/[a-z]+/g) ?? [];
  const counts = new Map<string, number>();
  let best = "";
  let bestCount = 0;
  for (const w of words) {
    if (ban.has(w)) continue;
    const c = (counts.get(w) ?? 0) + 1;
    counts.set(w, c);
    if (c > bestCount) {
      bestCount = c;
      best = w;
    }
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "mostCommonWord",
      comparison: "deep",
      jsStarter: `function mostCommonWord(paragraph, banned) {
  // Return the most frequent non-banned word, lowercase.
  // TODO: implement
}`,
      jsReference: `function mostCommonWord(paragraph, banned) {
  const ban = new Set(banned.map((w) => w.toLowerCase()));
  const words = paragraph.toLowerCase().match(/[a-z]+/g) || [];
  const counts = new Map();
  let best = "";
  let bestCount = 0;
  for (const w of words) {
    if (ban.has(w)) continue;
    const c = (counts.get(w) || 0) + 1;
    counts.set(w, c);
    if (c > bestCount) {
      bestCount = c;
      best = w;
    }
  }
  return best;
}`,
    },
    tests: [
      {
        name: "banned hit",
        args: ["Bob hit a ball, the hit BALL flew far after it was hit.", ["hit"]],
        expected: "ball",
      },
      { name: "single word", args: ["a.", []], expected: "a" },
      { name: "banned world", args: ["Hello, hello world!", ["world"]], expected: "hello" },
      { name: "clear winner", args: ["apple banana apple banana apple", ["banana"]], expected: "apple" },
    ],
    hints: ["Strip punctuation by matching letter runs.", "Keep the running leader while counting."],
    relatedIds: [387],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Two Pointers
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 42,
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "two-pointers",
    patterns: ["Two Pointers", "Prefix Max"],
    companies: ["amazon", "google", "meta", "apple", "microsoft", "goldman-sachs"],
    frequency: 88,
    leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
    description:
      "Given an elevation map where each bar has unit width, compute how many units of water are trapped between the bars after rain.",
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    intuition:
      "Water above a bar is bounded by the shorter of the tallest wall to its left and to its right. Walk two pointers inward and always advance the side with the smaller wall, because that side's running max definitively caps the water there. Each step adds (running max on that side) minus the bar height.",
    approach: [
      "Place pointers at both ends and track the max height seen from each side.",
      "Compare the two end heights; process the smaller side.",
      "Update that side's running max and add max minus the current bar to the total.",
      "Move that pointer inward and repeat until the pointers meet.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Single pass with two pointers and two running maxima." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def trap(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    left_max = right_max = res = 0
    while l < r:
        if height[l] < height[r]:
            left_max = max(left_max, height[l])
            res += left_max - height[l]
            l += 1
        else:
            right_max = max(right_max, height[r])
            res += right_max - height[r]
            r -= 1
    return res`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function trap(height: number[]): number {
  let l = 0;
  let r = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let res = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      leftMax = Math.max(leftMax, height[l]);
      res += leftMax - height[l];
      l++;
    } else {
      rightMax = Math.max(rightMax, height[r]);
      res += rightMax - height[r];
      r--;
    }
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "trap",
      comparison: "deep",
      jsStarter: `function trap(height) {
  // Return total trapped rain water.
  // TODO: implement
}`,
      jsReference: `function trap(height) {
  let l = 0;
  let r = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let res = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      leftMax = Math.max(leftMax, height[l]);
      res += leftMax - height[l];
      l++;
    } else {
      rightMax = Math.max(rightMax, height[r]);
      res += rightMax - height[r];
      r--;
    }
  }
  return res;
}`,
    },
    tests: [
      { name: "classic", args: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
      { name: "deep basin", args: [[4, 2, 0, 3, 2, 5]], expected: 9 },
      { name: "flat", args: [[1, 1, 1]], expected: 0 },
      { name: "descending tail", args: [[5, 4, 1, 2]], expected: 1 },
    ],
    hints: ["Water is capped by the shorter side wall.", "Advance the pointer on the smaller side."],
    relatedIds: [11, 84],
  },
  {
    id: 18,
    slug: "4sum",
    title: "4Sum",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Two Pointers", "Sorting"],
    companies: ["amazon", "google", "apple", "adobe"],
    frequency: 62,
    leetcodeUrl: "https://leetcode.com/problems/4sum/",
    description:
      "Find every unique quadruplet of values from the array that sums to a given target. The quadruplets may be returned in any order.",
    examples: [
      { input: "nums = [1,0,-1,0,-2,2], target = 0", output: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]" },
      { input: "nums = [2,2,2,2,2], target = 8", output: "[[2,2,2,2]]" },
    ],
    intuition:
      "Generalize 3Sum: sort the array, fix the two outer indices with nested loops, then use two pointers to close the remaining gap in linear time. Skipping over duplicate values at every level keeps the output unique without any post-processing.",
    approach: [
      "Sort the array ascending.",
      "Loop the first index i and the second index j, skipping repeats at each level.",
      "Use left/right pointers on the remaining suffix to hit target minus the two fixed values.",
      "On a match, record the quadruplet and skip duplicate left/right values before moving both inward.",
    ],
    complexity: { time: "O(n^3)", space: "O(1)", note: "Excludes the output list; sorting dominates the setup." },
    solutions: [
      {
        language: "python",
        label: "Sort + Two Pointers",
        code: `def four_sum(nums: list[int], target: int) -> list[list[int]]:
    nums.sort()
    n = len(nums)
    res: list[list[int]] = []
    for i in range(n - 3):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        for j in range(i + 1, n - 2):
            if j > i + 1 and nums[j] == nums[j - 1]:
                continue
            l, r = j + 1, n - 1
            while l < r:
                total = nums[i] + nums[j] + nums[l] + nums[r]
                if total == target:
                    res.append([nums[i], nums[j], nums[l], nums[r]])
                    while l < r and nums[l] == nums[l + 1]:
                        l += 1
                    while l < r and nums[r] == nums[r - 1]:
                        r -= 1
                    l += 1
                    r -= 1
                elif total < target:
                    l += 1
                else:
                    r -= 1
    return res`,
      },
      {
        language: "typescript",
        label: "Sort + Two Pointers",
        code: `function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const res: number[][] = [];
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let l = j + 1;
      let r = n - 1;
      while (l < r) {
        const sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum === target) {
          res.push([nums[i], nums[j], nums[l], nums[r]]);
          while (l < r && nums[l] === nums[l + 1]) l++;
          while (l < r && nums[r] === nums[r - 1]) r--;
          l++;
          r--;
        } else if (sum < target) {
          l++;
        } else {
          r--;
        }
      }
    }
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "fourSum",
      comparison: "canonical",
      jsStarter: `function fourSum(nums, target) {
  // Return all unique quadruplets summing to target.
  // TODO: implement
}`,
      jsReference: `function fourSum(nums, target) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const res = [];
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let l = j + 1;
      let r = n - 1;
      while (l < r) {
        const sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum === target) {
          res.push([nums[i], nums[j], nums[l], nums[r]]);
          while (l < r && nums[l] === nums[l + 1]) l++;
          while (l < r && nums[r] === nums[r - 1]) r--;
          l++;
          r--;
        } else if (sum < target) {
          l++;
        } else {
          r--;
        }
      }
    }
  }
  return res;
}`,
    },
    tests: [
      {
        name: "target zero",
        args: [[1, 0, -1, 0, -2, 2], 0],
        expected: [
          [-2, -1, 1, 2],
          [-2, 0, 0, 2],
          [-1, 0, 0, 1],
        ],
      },
      { name: "all equal", args: [[2, 2, 2, 2, 2], 8], expected: [[2, 2, 2, 2]] },
      { name: "no quadruplet", args: [[], 0], expected: [] },
      { name: "single solution", args: [[-3, -1, 0, 2, 4, 5], 2], expected: [[-3, -1, 2, 4]] },
    ],
    hints: ["Fix two values, two-pointer the rest.", "Skip duplicates at every level for uniqueness."],
    relatedIds: [1, 15, 16],
  },
  {
    id: 16,
    slug: "3sum-closest",
    title: "3Sum Closest",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Two Pointers", "Sorting"],
    companies: ["amazon", "google", "bloomberg", "apple"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/3sum-closest/",
    description:
      "Pick three values from the array whose sum is as close as possible to a target, and return that closest sum.",
    examples: [
      { input: "nums = [-1,2,1,-4], target = 1", output: "2", explanation: "-1 + 2 + 1 = 2 is nearest to 1." },
      { input: "nums = [0,0,0], target = 1", output: "0" },
    ],
    intuition:
      "Sort the array so a two-pointer sweep can steer the sum toward the target. For each fixed first element, move the inner pointers in or out depending on whether the current triple is below or above the target, recording whichever sum is closest seen so far.",
    approach: [
      "Sort the array and seed the best sum with the first three values.",
      "Fix each index i, then use left/right pointers over the rest.",
      "Update best whenever the current triple is nearer to the target.",
      "Move left up if the sum is below target, right down if above; stop early on an exact hit.",
    ],
    complexity: { time: "O(n^2)", space: "O(1)", note: "Outer loop times a linear two-pointer scan." },
    solutions: [
      {
        language: "python",
        label: "Sort + Two Pointers",
        code: `def three_sum_closest(nums: list[int], target: int) -> int:
    nums.sort()
    best = nums[0] + nums[1] + nums[2]
    for i in range(len(nums) - 2):
        l, r = i + 1, len(nums) - 1
        while l < r:
            total = nums[i] + nums[l] + nums[r]
            if abs(total - target) < abs(best - target):
                best = total
            if total == target:
                return total
            if total < target:
                l += 1
            else:
                r -= 1
    return best`,
      },
      {
        language: "typescript",
        label: "Sort + Two Pointers",
        code: `function threeSumClosest(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);
  let best = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < nums.length - 2; i++) {
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
      if (sum === target) return sum;
      if (sum < target) l++;
      else r--;
    }
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "threeSumClosest",
      comparison: "deep",
      jsStarter: `function threeSumClosest(nums, target) {
  // Return the triple sum closest to target.
  // TODO: implement
}`,
      jsReference: `function threeSumClosest(nums, target) {
  nums.sort((a, b) => a - b);
  let best = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < nums.length - 2; i++) {
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
      if (sum === target) return sum;
      if (sum < target) l++;
      else r--;
    }
  }
  return best;
}`,
    },
    tests: [
      { name: "near positive", args: [[-1, 2, 1, -4], 1], expected: 2 },
      { name: "all zeros", args: [[0, 0, 0], 1], expected: 0 },
      { name: "far target", args: [[1, 1, 1, 0], -100], expected: 2 },
      { name: "negatives", args: [[-3, -2, -5, 3, -4], -1], expected: -2 },
    ],
    hints: ["Sort to enable a directed two-pointer scan.", "Track the minimal absolute difference."],
    relatedIds: [15, 18],
  },
  {
    id: 75,
    slug: "sort-colors",
    title: "Sort Colors",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Two Pointers", "Dutch National Flag"],
    companies: ["amazon", "microsoft", "meta", "nvidia"],
    frequency: 78,
    leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
    description:
      "Sort an array containing only the values 0, 1, and 2 in place so that equal values are grouped, using a single pass.",
    examples: [
      { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" },
      { input: "nums = [2,0,1]", output: "[0,1,2]" },
    ],
    intuition:
      "Maintain three regions with the Dutch National Flag scheme: a low boundary for 0s, a high boundary for 2s, and a moving cursor. Swap 0s to the front and 2s to the back as you scan; a 1 just advances the cursor. One pass settles every element.",
    approach: [
      "Set low and mid to 0 and high to the last index.",
      "While mid is at or before high, inspect nums[mid].",
      "On 0, swap with low and advance both low and mid.",
      "On 1, advance mid; on 2, swap with high and decrement high (without advancing mid).",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "In-place single pass with three pointers." },
    solutions: [
      {
        language: "python",
        label: "Dutch National Flag",
        code: `def sort_colors(nums: list[int]) -> list[int]:
    low = mid = 0
    high = len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    return nums`,
      },
      {
        language: "typescript",
        label: "Dutch National Flag",
        code: `function sortColors(nums: number[]): number[] {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
  return nums;
}`,
      },
    ],
    runner: {
      entry: "sortColors",
      comparison: "deep",
      jsStarter: `function sortColors(nums) {
  // Sort the array of 0s, 1s, and 2s in place and return it.
  // TODO: implement
}`,
      jsReference: `function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
  return nums;
}`,
    },
    tests: [
      { name: "mixed", args: [[2, 0, 2, 1, 1, 0]], expected: [0, 0, 1, 1, 2, 2] },
      { name: "tiny", args: [[2, 0, 1]], expected: [0, 1, 2] },
      { name: "single", args: [[0]], expected: [0] },
      { name: "uneven counts", args: [[1, 1, 0, 2, 2, 0, 1]], expected: [0, 0, 1, 1, 1, 2, 2] },
    ],
    hints: ["Partition into three regions in one pass.", "Don't advance the cursor after swapping in a 2."],
    relatedIds: [905, 977],
  },
  {
    id: 977,
    slug: "squares-of-a-sorted-array",
    title: "Squares of a Sorted Array",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["Two Pointers"],
    companies: ["amazon", "meta", "google", "apple"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/squares-of-a-sorted-array/",
    description:
      "Given a sorted array of integers, return a new sorted array of their squares.",
    examples: [
      { input: "nums = [-4,-1,0,3,10]", output: "[0,1,9,16,100]" },
      { input: "nums = [-7,-3,2,3,11]", output: "[4,9,9,49,121]" },
    ],
    intuition:
      "The largest square comes from whichever end has the bigger absolute value, since the input is sorted. Use two pointers at the ends and fill the result from the back, always taking the larger square. This avoids squaring then re-sorting.",
    approach: [
      "Place pointers at both ends of the sorted array.",
      "Compare absolute values at the two ends.",
      "Write the larger square into the next slot from the right of the output.",
      "Move the chosen pointer inward and repeat until the output is filled.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "One pass; output array is the only extra space." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def sorted_squares(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [0] * n
    l, r = 0, n - 1
    for i in range(n - 1, -1, -1):
        if abs(nums[l]) > abs(nums[r]):
            res[i] = nums[l] * nums[l]
            l += 1
        else:
            res[i] = nums[r] * nums[r]
            r -= 1
    return res`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function sortedSquares(nums: number[]): number[] {
  const n = nums.length;
  const res = new Array<number>(n);
  let l = 0;
  let r = n - 1;
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(nums[l]) > Math.abs(nums[r])) {
      res[i] = nums[l] * nums[l];
      l++;
    } else {
      res[i] = nums[r] * nums[r];
      r--;
    }
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "sortedSquares",
      comparison: "deep",
      jsStarter: `function sortedSquares(nums) {
  // Return the sorted squares of a sorted array.
  // TODO: implement
}`,
      jsReference: `function sortedSquares(nums) {
  const n = nums.length;
  const res = new Array(n);
  let l = 0;
  let r = n - 1;
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(nums[l]) > Math.abs(nums[r])) {
      res[i] = nums[l] * nums[l];
      l++;
    } else {
      res[i] = nums[r] * nums[r];
      r--;
    }
  }
  return res;
}`,
    },
    tests: [
      { name: "spanning zero", args: [[-4, -1, 0, 3, 10]], expected: [0, 1, 9, 16, 100] },
      { name: "tie squares", args: [[-7, -3, 2, 3, 11]], expected: [4, 9, 9, 49, 121] },
      { name: "all negative", args: [[-5, -3, -1]], expected: [1, 9, 25] },
      { name: "all positive", args: [[1, 2, 3]], expected: [1, 4, 9] },
    ],
    hints: ["Largest square is at one of the ends.", "Fill the output from the back."],
    relatedIds: [75, 88],
  },
  {
    id: 905,
    slug: "sort-array-by-parity",
    title: "Sort Array By Parity",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["Two Pointers", "Partition"],
    companies: ["amazon", "microsoft"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/sort-array-by-parity/",
    description:
      "Rearrange an array so that every even value precedes every odd value; the values within each group may appear in any order.",
    examples: [
      { input: "nums = [3,1,2,4]", output: "[2,4,3,1]", explanation: "Any arrangement with evens before odds is accepted." },
      { input: "nums = [0]", output: "[0]" },
    ],
    intuition:
      "A two-pointer partition does the job in place: advance from the left over even numbers, retreat from the right over odd numbers, and swap whenever the left points at an odd and the right at an even. The order inside each parity group is unconstrained.",
    approach: [
      "Set a left pointer at the start and a right pointer at the end.",
      "Skip the left pointer forward while it sees an even value.",
      "Skip the right pointer backward while it sees an odd value.",
      "Swap the mismatched pair and continue until the pointers cross.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "In-place partition (the runner copies first to stay pure)." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `def sort_array_by_parity(nums: list[int]) -> list[int]:
    res = nums[:]
    l, r = 0, len(res) - 1
    while l < r:
        if res[l] % 2 == 0:
            l += 1
        elif res[r] % 2 == 1:
            r -= 1
        else:
            res[l], res[r] = res[r], res[l]
            l += 1
            r -= 1
    return res`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function sortArrayByParity(nums: number[]): number[] {
  const res = nums.slice();
  let l = 0;
  let r = res.length - 1;
  while (l < r) {
    if (res[l] % 2 === 0) l++;
    else if (res[r] % 2 === 1) r--;
    else {
      [res[l], res[r]] = [res[r], res[l]];
      l++;
      r--;
    }
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "sortArrayByParity",
      comparison: "canonical",
      jsStarter: `function sortArrayByParity(nums) {
  // Return the array with even values before odd values.
  // TODO: implement
}`,
      jsReference: `function sortArrayByParity(nums) {
  const res = nums.slice();
  let l = 0;
  let r = res.length - 1;
  while (l < r) {
    if (res[l] % 2 === 0) l++;
    else if (res[r] % 2 === 1) r--;
    else {
      [res[l], res[r]] = [res[r], res[l]];
      l++;
      r--;
    }
  }
  return res;
}`,
    },
    tests: [
      { name: "mixed", args: [[3, 1, 2, 4]], expected: [1, 2, 3, 4] },
      { name: "single even", args: [[0]], expected: [0] },
      { name: "odds then evens", args: [[1, 3, 5, 2, 4]], expected: [1, 2, 3, 4, 5] },
      { name: "all even", args: [[2, 4, 6]], expected: [2, 4, 6] },
    ],
    hints: ["Partition with two pointers from both ends.", "Group order is order-insensitive here."],
    relatedIds: [75, 922],
  },
  {
    id: 189,
    slug: "rotate-array",
    title: "Rotate Array",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Two Pointers", "Array Reversal"],
    companies: ["amazon", "microsoft", "google", "apple", "bloomberg"],
    frequency: 74,
    leetcodeUrl: "https://leetcode.com/problems/rotate-array/",
    description:
      "Rotate an array to the right by k positions in place, where k can exceed the array length.",
    examples: [
      { input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]" },
      { input: "nums = [-1,-100,3,99], k = 2", output: "[3,99,-1,-100]" },
    ],
    intuition:
      "Three reversals achieve the rotation without extra space. Reverse the whole array, then reverse the first k elements and the rest separately. Reducing k modulo the length first handles rotations larger than the array.",
    approach: [
      "Reduce k modulo the array length.",
      "Reverse the entire array.",
      "Reverse the first k elements.",
      "Reverse the remaining n minus k elements and return the array.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Three in-place reversals." },
    solutions: [
      {
        language: "python",
        label: "Triple Reverse",
        code: `def rotate(nums: list[int], k: int) -> list[int]:
    n = len(nums)
    k %= n
    nums.reverse()
    nums[:k] = reversed(nums[:k])
    nums[k:] = reversed(nums[k:])
    return nums`,
      },
      {
        language: "typescript",
        label: "Triple Reverse",
        code: `function rotate(nums: number[], k: number): number[] {
  const n = nums.length;
  k %= n;
  const reverse = (i: number, j: number): void => {
    while (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j--;
    }
  };
  reverse(0, n - 1);
  reverse(0, k - 1);
  reverse(k, n - 1);
  return nums;
}`,
      },
    ],
    runner: {
      entry: "rotate",
      comparison: "deep",
      jsStarter: `function rotate(nums, k) {
  // Rotate the array right by k and return it.
  // TODO: implement
}`,
      jsReference: `function rotate(nums, k) {
  const n = nums.length;
  k %= n;
  const reverse = (i, j) => {
    while (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j--;
    }
  };
  reverse(0, n - 1);
  reverse(0, k - 1);
  reverse(k, n - 1);
  return nums;
}`,
    },
    tests: [
      { name: "rotate by 3", args: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4] },
      { name: "rotate by 2", args: [[-1, -100, 3, 99], 2], expected: [3, 99, -1, -100] },
      { name: "k exceeds length", args: [[1, 2], 3], expected: [2, 1] },
      { name: "no rotation", args: [[1], 0], expected: [1] },
    ],
    hints: ["Reverse whole, then both pieces.", "Take k modulo n before rotating."],
    relatedIds: [48, 61],
  },
  {
    id: 31,
    slug: "next-permutation",
    title: "Next Permutation",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Two Pointers", "Array Manipulation"],
    companies: ["google", "amazon", "meta", "bytedance"],
    frequency: 66,
    leetcodeUrl: "https://leetcode.com/problems/next-permutation/",
    description:
      "Rearrange the array in place into the next lexicographically greater permutation, wrapping around to the smallest order if it is already the largest.",
    examples: [
      { input: "nums = [1,2,3]", output: "[1,3,2]" },
      { input: "nums = [3,2,1]", output: "[1,2,3]", explanation: "Already the largest, so wrap to the smallest." },
    ],
    intuition:
      "Scanning from the right, find the first index where the value dips below its successor — that pivot is what must increase. Swap it with the smallest value to its right that is still larger, then reverse the suffix so it becomes the smallest possible tail.",
    approach: [
      "Walk from the right to find the first index i with nums[i] < nums[i+1].",
      "If such i exists, find the rightmost j with nums[j] > nums[i] and swap them.",
      "Reverse the suffix after index i to make it ascending.",
      "If no pivot exists, the whole array is reversed to the smallest permutation.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "A scan, a swap, and a suffix reversal." },
    solutions: [
      {
        language: "python",
        label: "Pivot + Reverse",
        code: `def next_permutation(nums: list[int]) -> list[int]:
    i = len(nums) - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    if i >= 0:
        j = len(nums) - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    nums[i + 1:] = reversed(nums[i + 1:])
    return nums`,
      },
      {
        language: "typescript",
        label: "Pivot + Reverse",
        code: `function nextPermutation(nums: number[]): number[] {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  let l = i + 1;
  let r = nums.length - 1;
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++;
    r--;
  }
  return nums;
}`,
      },
    ],
    runner: {
      entry: "nextPermutation",
      comparison: "deep",
      jsStarter: `function nextPermutation(nums) {
  // Transform nums into its next permutation in place and return it.
  // TODO: implement
}`,
      jsReference: `function nextPermutation(nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  let l = i + 1;
  let r = nums.length - 1;
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++;
    r--;
  }
  return nums;
}`,
    },
    tests: [
      { name: "simple next", args: [[1, 2, 3]], expected: [1, 3, 2] },
      { name: "wrap around", args: [[3, 2, 1]], expected: [1, 2, 3] },
      { name: "duplicate tail", args: [[1, 1, 5]], expected: [1, 5, 1] },
      { name: "pivot in middle", args: [[1, 3, 2]], expected: [2, 1, 3] },
    ],
    hints: ["Find the rightmost ascending step.", "Swap then reverse the suffix."],
    relatedIds: [46, 47],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Sliding Window
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 904,
    slug: "fruit-into-baskets",
    title: "Fruit Into Baskets",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window", "Hash Map"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/fruit-into-baskets/",
    description:
      "Given a row of fruit trees, find the length of the longest contiguous stretch you can pick while collecting at most two distinct fruit types.",
    examples: [
      { input: "fruits = [1,2,1]", output: "3", explanation: "All three trees use only two types." },
      { input: "fruits = [0,1,2,2]", output: "3", explanation: "The window [1,2,2] holds two types." },
    ],
    intuition:
      "This is the longest subarray with at most two distinct values. Slide a window rightward, counting fruit types inside it; whenever a third type appears, shrink from the left until only two remain. The widest valid window is the answer.",
    approach: [
      "Expand the window by adding the current fruit to a type-count map.",
      "While the map holds more than two types, remove the leftmost fruit and shrink.",
      "Drop a type from the map when its count reaches zero.",
      "Track the largest window width seen.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "The window map never exceeds three keys." },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def total_fruit(fruits: list[int]) -> int:
    counts: dict[int, int] = {}
    left = best = 0
    for right, f in enumerate(fruits):
        counts[f] = counts.get(f, 0) + 1
        while len(counts) > 2:
            g = fruits[left]
            counts[g] -= 1
            if counts[g] == 0:
                del counts[g]
            left += 1
        best = max(best, right - left + 1)
    return best`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function totalFruit(fruits: number[]): number {
  const counts = new Map<number, number>();
  let left = 0;
  let best = 0;
  for (let right = 0; right < fruits.length; right++) {
    counts.set(fruits[right], (counts.get(fruits[right]) ?? 0) + 1);
    while (counts.size > 2) {
      const g = fruits[left];
      counts.set(g, counts.get(g)! - 1);
      if (counts.get(g) === 0) counts.delete(g);
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "totalFruit",
      comparison: "deep",
      jsStarter: `function totalFruit(fruits) {
  // Return the longest window with at most two distinct values.
  // TODO: implement
}`,
      jsReference: `function totalFruit(fruits) {
  const counts = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < fruits.length; right++) {
    counts.set(fruits[right], (counts.get(fruits[right]) || 0) + 1);
    while (counts.size > 2) {
      const g = fruits[left];
      counts.set(g, counts.get(g) - 1);
      if (counts.get(g) === 0) counts.delete(g);
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    },
    tests: [
      { name: "two types", args: [[1, 2, 1]], expected: 3 },
      { name: "trailing pair", args: [[0, 1, 2, 2]], expected: 3 },
      { name: "window shifts", args: [[1, 2, 3, 2, 2]], expected: 4 },
      { name: "long run", args: [[3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]], expected: 5 },
    ],
    hints: ["At most two distinct = classic window.", "Shrink left when a third type enters."],
    relatedIds: [3, 159, 340],
  },
  {
    id: 1456,
    slug: "maximum-number-of-vowels-in-a-substring-of-given-length",
    title: "Maximum Number of Vowels in a Substring of Given Length",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window", "Fixed Window"],
    companies: ["amazon", "microsoft", "adobe"],
    frequency: 54,
    leetcodeUrl:
      "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/",
    description:
      "Find the greatest number of vowels contained in any contiguous substring of a fixed length k.",
    examples: [
      { input: 's = "abciiidef", k = 3', output: "3", explanation: '"iii" contains three vowels.' },
      { input: 's = "leetcode", k = 3', output: "2", explanation: '"lee" and "ode" each have two vowels.' },
    ],
    intuition:
      "A fixed-size window means you can keep a running vowel count instead of recounting each substring. Add the incoming character's vowel contribution and subtract the one leaving the window, recording the maximum once the window reaches size k.",
    approach: [
      "Maintain a count of vowels currently inside the window.",
      "Add one when the new right character is a vowel.",
      "Once past the first k characters, subtract the character leaving on the left.",
      "Record the best count whenever the window is full.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Constant vowel set; single pass." },
    solutions: [
      {
        language: "python",
        label: "Fixed Window",
        code: `def max_vowels(s: str, k: int) -> int:
    vowels = set("aeiou")
    count = best = 0
    for i, ch in enumerate(s):
        if ch in vowels:
            count += 1
        if i >= k and s[i - k] in vowels:
            count -= 1
        if i >= k - 1:
            best = max(best, count)
    return best`,
      },
      {
        language: "typescript",
        label: "Fixed Window",
        code: `function maxVowels(s: string, k: number): number {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let count = 0;
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    if (vowels.has(s[i])) count++;
    if (i >= k && vowels.has(s[i - k])) count--;
    if (i >= k - 1) best = Math.max(best, count);
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "maxVowels",
      comparison: "deep",
      jsStarter: `function maxVowels(s, k) {
  // Return the max vowels in any length-k substring.
  // TODO: implement
}`,
      jsReference: `function maxVowels(s, k) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let count = 0;
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    if (vowels.has(s[i])) count++;
    if (i >= k && vowels.has(s[i - k])) count--;
    if (i >= k - 1) best = Math.max(best, count);
  }
  return best;
}`,
    },
    tests: [
      { name: "triple i", args: ["abciiidef", 3], expected: 3 },
      { name: "all vowels", args: ["aeiou", 2], expected: 2 },
      { name: "sparse vowels", args: ["leetcode", 3], expected: 2 },
      { name: "no vowels", args: ["rhythms", 4], expected: 0 },
    ],
    hints: ["Slide a fixed-size window of length k.", "Adjust the count by the entering and leaving chars."],
    relatedIds: [3, 209, 643],
  },
];

export default batchI;
