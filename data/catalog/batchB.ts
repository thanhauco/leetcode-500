import type { Problem } from "../types.ts";

/**
 * Catalog batch B — sliding-window, stack, and binary-search coverage.
 *
 * Every record ships working Python + TypeScript solutions plus a runnable
 * `runner` and hand-verified `tests`. Design problems (Min Stack) use an
 * operation-list runner `entry(ops, args)` returning a results array with
 * `null` for void operations, mirroring the curated Trie entry.
 */
export const batchB: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Sliding Window
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 424,
    slug: "longest-repeating-character-replacement",
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window", "Frequency Count"],
    companies: ["google", "amazon", "microsoft", "bloomberg"],
    frequency: 74,
    leetcodeUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/",
    description:
      "Given a string `s` of uppercase letters and a budget `k`, you may overwrite at most `k` characters with any letter. Return the length of the longest substring that can be made into a single repeated character.",
    examples: [
      { input: 's = "ABAB", k = 2', output: "4", explanation: "Replace both A's (or both B's) to get a run of four equal letters." },
      { input: 's = "AABABBA", k = 1', output: "4", explanation: "Fixing one letter yields a window of length 4 such as \"AABA\" → \"AAAA\"." },
    ],
    intuition:
      "Inside any window the cheapest path to a uniform run is to keep the most frequent letter and rewrite the rest. A window is valid when (window length − count of the most frequent letter) ≤ k. Grow the window greedily and only shrink when that condition breaks.",
    approach: [
      "Slide a right pointer across the string, tallying letter counts in the window.",
      "Track the highest single-letter frequency seen in the window (maxFreq).",
      "If windowSize − maxFreq > k, advance the left pointer and decrement its count.",
      "The best window length encountered is the answer.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "At most 26 distinct uppercase letters." },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def character_replacement(s: str, k: int) -> int:
    count: dict[str, int] = {}
    left = max_freq = res = 0
    for right, c in enumerate(s):
        count[c] = count.get(c, 0) + 1
        max_freq = max(max_freq, count[c])
        while (right - left + 1) - max_freq > k:
            count[s[left]] -= 1
            left += 1
        res = max(res, right - left + 1)
    return res`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function characterReplacement(s: string, k: number): number {
  const count: Record<string, number> = {};
  let left = 0, maxFreq = 0, res = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    count[c] = (count[c] ?? 0) + 1;
    maxFreq = Math.max(maxFreq, count[c]);
    while (right - left + 1 - maxFreq > k) {
      count[s[left]]--;
      left++;
    }
    res = Math.max(res, right - left + 1);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "characterReplacement",
      comparison: "deep",
      jsStarter: `function characterReplacement(s, k) {
  // Longest substring made uniform by replacing at most k characters.
  // TODO: implement
}`,
      jsReference: `function characterReplacement(s, k) {
  const count = {};
  let left = 0, maxFreq = 0, res = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    count[c] = (count[c] || 0) + 1;
    maxFreq = Math.max(maxFreq, count[c]);
    while (right - left + 1 - maxFreq > k) {
      count[s[left]]--;
      left++;
    }
    res = Math.max(res, right - left + 1);
  }
  return res;
}`,
    },
    tests: [
      { name: "two flips", args: ["ABAB", 2], expected: 4 },
      { name: "one flip", args: ["AABABBA", 1], expected: 4 },
      { name: "all distinct", args: ["ABCDE", 1], expected: 2 },
      { name: "already uniform", args: ["AAAA", 0], expected: 4 },
    ],
    relatedIds: [340, 1004, 3],
  },
  {
    id: 567,
    slug: "permutation-in-string",
    title: "Permutation in String",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window", "Frequency Count"],
    companies: ["microsoft", "amazon", "bloomberg", "uber"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/permutation-in-string/",
    description:
      "Given two strings `s1` and `s2`, decide whether any contiguous block of `s2` is a rearrangement of `s1`. Return `true` if such a window exists, otherwise `false`.",
    examples: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: "true", explanation: "The window \"ba\" is a permutation of \"ab\"." },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: "false", explanation: "No length-2 window matches the letter counts of \"ab\"." },
    ],
    intuition:
      "A permutation match is purely about letter counts, not order. Maintain a fixed-size window of length |s1| over s2 and compare its 26-letter histogram to s1's. Slide by one, adding the new letter and dropping the old one, until the histograms align.",
    approach: [
      "Build a frequency array for s1; bail out early if s1 is longer than s2.",
      "Roll a window of width |s1| over s2, updating its frequency array in O(1) per step.",
      "Whenever the window histogram equals s1's histogram, return true.",
      "Return false if no window matches.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Fixed 26-entry histograms." },
    solutions: [
      {
        language: "python",
        label: "Fixed Window",
        code: `def check_inclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2):
        return False
    need = [0] * 26
    win = [0] * 26
    base = ord("a")
    for c in s1:
        need[ord(c) - base] += 1
    for i, c in enumerate(s2):
        win[ord(c) - base] += 1
        if i >= len(s1):
            win[ord(s2[i - len(s1)]) - base] -= 1
        if win == need:
            return True
    return False`,
      },
      {
        language: "typescript",
        label: "Fixed Window",
        code: `function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;
  const need = new Array(26).fill(0);
  const win = new Array(26).fill(0);
  const a = "a".charCodeAt(0);
  for (const c of s1) need[c.charCodeAt(0) - a]++;
  for (let i = 0; i < s2.length; i++) {
    win[s2.charCodeAt(i) - a]++;
    if (i >= s1.length) win[s2.charCodeAt(i - s1.length) - a]--;
    if (i >= s1.length - 1 && need.every((v, j) => v === win[j])) return true;
  }
  return false;
}`,
      },
    ],
    runner: {
      entry: "checkInclusion",
      comparison: "deep",
      jsStarter: `function checkInclusion(s1, s2) {
  // Does s2 contain a permutation of s1 as a substring?
  // TODO: implement
}`,
      jsReference: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const need = new Array(26).fill(0);
  const win = new Array(26).fill(0);
  const a = "a".charCodeAt(0);
  for (const c of s1) need[c.charCodeAt(0) - a]++;
  for (let i = 0; i < s2.length; i++) {
    win[s2.charCodeAt(i) - a]++;
    if (i >= s1.length) win[s2.charCodeAt(i - s1.length) - a]--;
    if (i >= s1.length - 1) {
      let match = true;
      for (let j = 0; j < 26; j++) {
        if (need[j] !== win[j]) { match = false; break; }
      }
      if (match) return true;
    }
  }
  return false;
}`,
    },
    tests: [
      { name: "match present", args: ["ab", "eidbaooo"], expected: true },
      { name: "no match", args: ["ab", "eidboaoo"], expected: false },
      { name: "tail window", args: ["adc", "dcda"], expected: true },
      { name: "s1 longer", args: ["abc", "ab"], expected: false },
    ],
    relatedIds: [438, 76, 242],
  },
  {
    id: 209,
    slug: "minimum-size-subarray-sum",
    title: "Minimum Size Subarray Sum",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window", "Two Pointers"],
    companies: ["amazon", "google", "meta", "bloomberg"],
    frequency: 72,
    leetcodeUrl: "https://leetcode.com/problems/minimum-size-subarray-sum/",
    description:
      "Given a target value and an array of positive integers `nums`, return the length of the shortest contiguous subarray whose sum is at least `target`. If no such subarray exists, return 0.",
    examples: [
      { input: "target = 7, nums = [2,3,1,2,4,3]", output: "2", explanation: "The subarray [4,3] sums to 7 with length 2." },
      { input: "target = 11, nums = [1,1,1,1,1,1,1,1]", output: "0", explanation: "The total is only 8, so no window reaches 11." },
    ],
    intuition:
      "Because every value is positive, extending a window only increases its sum and shrinking only decreases it. Grow the right edge until the sum meets the target, then pull the left edge in as far as possible while still valid, recording the smallest width each time.",
    approach: [
      "Keep a running window sum and a left pointer.",
      "Advance the right pointer, adding each value to the sum.",
      "While the sum is ≥ target, update the best length and remove nums[left], advancing left.",
      "Return the best length found, or 0 if the sum never reached the target.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Each element enters and leaves the window once." },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def min_subarray_len(target: int, nums: list[int]) -> int:
    left = total = 0
    res = float("inf")
    for right, x in enumerate(nums):
        total += x
        while total >= target:
            res = min(res, right - left + 1)
            total -= nums[left]
            left += 1
    return 0 if res == float("inf") else res`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function minSubArrayLen(target: number, nums: number[]): number {
  let left = 0, sum = 0, res = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      res = Math.min(res, right - left + 1);
      sum -= nums[left++];
    }
  }
  return res === Infinity ? 0 : res;
}`,
      },
    ],
    runner: {
      entry: "minSubArrayLen",
      comparison: "deep",
      jsStarter: `function minSubArrayLen(target, nums) {
  // Shortest contiguous subarray with sum >= target, or 0.
  // TODO: implement
}`,
      jsReference: `function minSubArrayLen(target, nums) {
  let left = 0, sum = 0, res = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      res = Math.min(res, right - left + 1);
      sum -= nums[left++];
    }
  }
  return res === Infinity ? 0 : res;
}`,
    },
    tests: [
      { name: "tail pair", args: [7, [2, 3, 1, 2, 4, 3]], expected: 2 },
      { name: "single suffices", args: [4, [1, 4, 4]], expected: 1 },
      { name: "impossible", args: [11, [1, 1, 1, 1, 1, 1, 1, 1]], expected: 0 },
      { name: "whole array", args: [15, [1, 2, 3, 4, 5]], expected: 5 },
    ],
    relatedIds: [76, 713, 862],
  },
  {
    id: 643,
    slug: "maximum-average-subarray-i",
    title: "Maximum Average Subarray I",
    difficulty: "Easy",
    category: "sliding-window",
    patterns: ["Sliding Window", "Prefix Sum"],
    companies: ["bloomberg", "amazon", "google"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/maximum-average-subarray-i/",
    description:
      "Given an integer array `nums` and a window length `k`, find the contiguous subarray of exactly `k` elements with the greatest average and return that average as a floating-point number.",
    examples: [
      { input: "nums = [1,12,-5,-6,50,3], k = 4", output: "12.75", explanation: "The window [12,-5,-6,50] sums to 51, averaging 51/4 = 12.75." },
      { input: "nums = [5], k = 1", output: "5.00000" },
    ],
    intuition:
      "The maximum average over a fixed window size is driven entirely by the maximum window sum. Compute the first window's sum, then slide it by adding the incoming element and subtracting the outgoing one, tracking the largest sum. Divide once at the end.",
    approach: [
      "Sum the first k elements to seed the window.",
      "Slide the window one step at a time, adjusting the sum in O(1).",
      "Keep the maximum window sum seen.",
      "Return maxSum / k as a floating-point value.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def find_max_average(nums: list[int], k: int) -> float:
    total = sum(nums[:k])
    best = total
    for i in range(k, len(nums)):
        total += nums[i] - nums[i - k]
        best = max(best, total)
    return best / k`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function findMaxAverage(nums: number[], k: number): number {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    best = Math.max(best, sum);
  }
  return best / k;
}`,
      },
    ],
    runner: {
      entry: "findMaxAverage",
      comparison: "approx",
      jsStarter: `function findMaxAverage(nums, k) {
  // Maximum average of any length-k contiguous window.
  // TODO: implement
}`,
      jsReference: `function findMaxAverage(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    best = Math.max(best, sum);
  }
  return best / k;
}`,
    },
    tests: [
      { name: "window of 4", args: [[1, 12, -5, -6, 50, 3], 4], expected: 12.75, tolerance: 1e-5 },
      { name: "single element", args: [[5], 1], expected: 5, tolerance: 1e-5 },
      { name: "best single", args: [[0, 4, 0, 3, 2], 1], expected: 4, tolerance: 1e-5 },
      { name: "all negative", args: [[-1, -2, -3, -4], 2], expected: -1.5, tolerance: 1e-5 },
    ],
    relatedIds: [644, 209, 3],
  },
  {
    id: 1004,
    slug: "max-consecutive-ones-iii",
    title: "Max Consecutive Ones III",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window"],
    companies: ["amazon", "google", "microsoft", "adobe"],
    frequency: 68,
    leetcodeUrl: "https://leetcode.com/problems/max-consecutive-ones-iii/",
    description:
      "Given a binary array `nums` and an integer `k`, you may flip at most `k` zeros to ones. Return the length of the longest run of consecutive ones achievable.",
    examples: [
      { input: "nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2", output: "6", explanation: "Flipping two zeros joins a run of six ones." },
      { input: "nums = [1,1,1], k = 0", output: "3", explanation: "No flips are needed; the array is already all ones." },
    ],
    intuition:
      "A window is valid as long as it contains at most k zeros, since each zero can be flipped. Expand the right edge freely and, whenever the zero count exceeds k, shrink from the left until it is valid again. The widest valid window is the answer.",
    approach: [
      "Track the number of zeros currently inside the window.",
      "Advance the right pointer, incrementing the zero count when a zero enters.",
      "While zeros > k, advance the left pointer, decrementing when a zero leaves.",
      "Record the maximum window width seen.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def longest_ones(nums: list[int], k: int) -> int:
    left = zeros = res = 0
    for right, v in enumerate(nums):
        if v == 0:
            zeros += 1
        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        res = max(res, right - left + 1)
    return res`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function longestOnes(nums: number[], k: number): number {
  let left = 0, zeros = 0, res = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    res = Math.max(res, right - left + 1);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "longestOnes",
      comparison: "deep",
      jsStarter: `function longestOnes(nums, k) {
  // Longest run of 1s if up to k zeros may be flipped.
  // TODO: implement
}`,
      jsReference: `function longestOnes(nums, k) {
  let left = 0, zeros = 0, res = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    res = Math.max(res, right - left + 1);
  }
  return res;
}`,
    },
    tests: [
      { name: "flip two", args: [[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2], expected: 6 },
      { name: "flip three", args: [[0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3], expected: 10 },
      { name: "no flips", args: [[1, 1, 1], 0], expected: 3 },
      { name: "flip all", args: [[0, 0, 0], 3], expected: 3 },
    ],
    relatedIds: [485, 487, 424],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Stack
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 155,
    slug: "min-stack",
    title: "Min Stack",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Stack", "Design"],
    companies: ["amazon", "google", "microsoft", "bloomberg", "uber"],
    frequency: 80,
    leetcodeUrl: "https://leetcode.com/problems/min-stack/",
    description:
      "Design a stack that supports `push`, `pop`, `top`, and retrieving the current minimum, each in constant time. The playground replays an operation list and grades the returned results (`null` for void operations).",
    examples: [
      {
        input: 'ops = ["MinStack","push","push","push","getMin","pop","top","getMin"], args = [[],[-2],[0],[-3],[],[],[],[]]',
        output: "[null,null,null,null,-3,null,0,-2]",
        explanation: "getMin reports -3 while -3 is on the stack, then -2 after it is popped.",
      },
    ],
    intuition:
      "The only hard part is O(1) minimum lookup. Keep a parallel stack of running minimums: each time you push, also push the smaller of the new value and the current minimum. Popping both stacks together keeps the minimum in sync without scanning.",
    approach: [
      "Maintain a main stack of values and an auxiliary stack of minimums.",
      "push(x): append x; append min(x, currentMin) to the auxiliary stack.",
      "pop(): pop from both stacks.",
      "top() reads the main stack's last value; getMin() reads the auxiliary stack's last value.",
    ],
    complexity: { time: "O(1) per op", space: "O(n)", note: "One auxiliary entry per element." },
    solutions: [
      {
        language: "python",
        label: "Paired Min Stack",
        code: `class MinStack:
    def __init__(self) -> None:
        self.stack: list[int] = []
        self.mins: list[int] = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        self.mins.append(val if not self.mins else min(val, self.mins[-1]))

    def pop(self) -> None:
        self.stack.pop()
        self.mins.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.mins[-1]`,
      },
      {
        language: "typescript",
        label: "Paired Min Stack",
        code: `class MinStack {
  private stack: number[] = [];
  private mins: number[] = [];

  push(val: number): void {
    this.stack.push(val);
    this.mins.push(this.mins.length ? Math.min(val, this.mins[this.mins.length - 1]) : val);
  }

  pop(): void {
    this.stack.pop();
    this.mins.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.mins[this.mins.length - 1];
  }
}`,
      },
    ],
    runner: {
      entry: "runMinStack",
      comparison: "deep",
      jsStarter: `function runMinStack(ops, args) {
  // Replay the operations and return an array of results.
  // "MinStack"/"push"/"pop" return null; "top"/"getMin" return numbers.
  // TODO: implement the MinStack and the driver loop.
}`,
      jsReference: `function runMinStack(ops, args) {
  class MinStack {
    constructor() { this.stack = []; this.mins = []; }
    push(x) {
      this.stack.push(x);
      this.mins.push(this.mins.length ? Math.min(x, this.mins[this.mins.length - 1]) : x);
    }
    pop() { this.stack.pop(); this.mins.pop(); }
    top() { return this.stack[this.stack.length - 1]; }
    getMin() { return this.mins[this.mins.length - 1]; }
  }
  const out = [];
  let st = null;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i] || [];
    if (op === "MinStack") { st = new MinStack(); out.push(null); }
    else if (op === "push") { st.push(a[0]); out.push(null); }
    else if (op === "pop") { st.pop(); out.push(null); }
    else if (op === "top") out.push(st.top());
    else if (op === "getMin") out.push(st.getMin());
  }
  return out;
}`,
    },
    tests: [
      {
        name: "classic example",
        args: [
          ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"],
          [[], [-2], [0], [-3], [], [], [], []],
        ],
        expected: [null, null, null, null, -3, null, 0, -2],
      },
      {
        name: "min tracks pops",
        args: [
          ["MinStack", "push", "getMin", "push", "getMin", "pop", "getMin"],
          [[], [5], [], [3], [], [], []],
        ],
        expected: [null, null, 5, null, 3, null, 5],
      },
      {
        name: "single value",
        args: [
          ["MinStack", "push", "top", "getMin"],
          [[], [42], [], []],
        ],
        expected: [null, null, 42, 42],
      },
    ],
    relatedIds: [716, 232, 225],
  },
  {
    id: 150,
    slug: "evaluate-reverse-polish-notation",
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Stack"],
    companies: ["amazon", "linkedin", "microsoft", "google"],
    frequency: 66,
    leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    description:
      "Evaluate an arithmetic expression given in Reverse Polish (postfix) notation. The tokens contain integers and the operators `+`, `-`, `*`, `/`, where division truncates toward zero. Return the integer result.",
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: "9", explanation: "((2 + 1) * 3) = 9." },
      { input: 'tokens = ["4","13","5","/","+"]', output: "6", explanation: "(4 + (13 / 5)) = 4 + 2 = 6." },
    ],
    intuition:
      "Postfix notation removes the need for parentheses: operands pile up until an operator consumes the two most recent ones. A stack models this exactly — push numbers, and on each operator pop the right then the left operand, apply, and push the result back.",
    approach: [
      "Iterate through the tokens with a stack of numbers.",
      "If a token is an operator, pop b then a (order matters for - and /).",
      "Apply the operator with truncation-toward-zero division and push the result.",
      "Push numeric tokens directly; the final stack value is the answer.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Stack",
        code: `def eval_rpn(tokens: list[str]) -> int:
    stack: list[int] = []
    ops = {"+", "-", "*", "/"}
    for t in tokens:
        if t in ops:
            b = stack.pop()
            a = stack.pop()
            if t == "+":
                stack.append(a + b)
            elif t == "-":
                stack.append(a - b)
            elif t == "*":
                stack.append(a * b)
            else:
                stack.append(int(a / b))  # truncate toward zero
        else:
            stack.append(int(t))
    return stack.pop()`,
      },
      {
        language: "typescript",
        label: "Stack",
        code: `function evalRPN(tokens: string[]): number {
  const st: number[] = [];
  const ops = new Set(["+", "-", "*", "/"]);
  for (const t of tokens) {
    if (ops.has(t)) {
      const b = st.pop()!;
      const a = st.pop()!;
      if (t === "+") st.push(a + b);
      else if (t === "-") st.push(a - b);
      else if (t === "*") st.push(a * b);
      else st.push(Math.trunc(a / b));
    } else {
      st.push(parseInt(t, 10));
    }
  }
  return st.pop()!;
}`,
      },
    ],
    runner: {
      entry: "evalRPN",
      comparison: "deep",
      jsStarter: `function evalRPN(tokens) {
  // Evaluate the postfix expression; division truncates toward zero.
  // TODO: implement
}`,
      jsReference: `function evalRPN(tokens) {
  const st = [];
  const ops = new Set(["+", "-", "*", "/"]);
  for (const t of tokens) {
    if (ops.has(t)) {
      const b = st.pop();
      const a = st.pop();
      if (t === "+") st.push(a + b);
      else if (t === "-") st.push(a - b);
      else if (t === "*") st.push(a * b);
      else st.push(Math.trunc(a / b));
    } else {
      st.push(parseInt(t, 10));
    }
  }
  return st.pop();
}`,
    },
    tests: [
      { name: "add then multiply", args: [["2", "1", "+", "3", "*"]], expected: 9 },
      { name: "truncating divide", args: [["4", "13", "5", "/", "+"]], expected: 6 },
      { name: "long expression", args: [["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]], expected: 22 },
      { name: "single number", args: [["5"]], expected: 5 },
    ],
    relatedIds: [224, 227, 772],
  },
  {
    id: 22,
    slug: "generate-parentheses",
    title: "Generate Parentheses",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Backtracking", "Recursion"],
    companies: ["amazon", "google", "meta", "microsoft", "uber"],
    frequency: 75,
    leetcodeUrl: "https://leetcode.com/problems/generate-parentheses/",
    description:
      "Given `n` pairs of parentheses, generate every distinct well-formed combination. Return the combinations in any order.",
    examples: [
      { input: "n = 1", output: '["()"]' },
      { input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]', explanation: "All five balanced arrangements of three pairs." },
    ],
    intuition:
      "Build strings one character at a time while respecting two invariants: never use more than n opening brackets, and never close more brackets than are currently open. Those two rules guarantee only valid prefixes are ever extended, so every completed string is well-formed.",
    approach: [
      "Recurse with counts of open and close brackets placed so far.",
      "Add '(' whenever open < n.",
      "Add ')' whenever close < open.",
      "When the string reaches length 2n it is complete; collect it.",
    ],
    complexity: { time: "O(4^n / √n)", space: "O(n)", note: "Catalan-number many results; recursion depth 2n." },
    solutions: [
      {
        language: "python",
        label: "Backtracking",
        code: `def generate_parenthesis(n: int) -> list[str]:
    res: list[str] = []

    def backtrack(cur: str, open_count: int, close_count: int) -> None:
        if len(cur) == 2 * n:
            res.append(cur)
            return
        if open_count < n:
            backtrack(cur + "(", open_count + 1, close_count)
        if close_count < open_count:
            backtrack(cur + ")", open_count, close_count + 1)

    backtrack("", 0, 0)
    return res`,
      },
      {
        language: "typescript",
        label: "Backtracking",
        code: `function generateParenthesis(n: number): string[] {
  const res: string[] = [];
  const backtrack = (cur: string, open: number, close: number): void => {
    if (cur.length === 2 * n) {
      res.push(cur);
      return;
    }
    if (open < n) backtrack(cur + "(", open + 1, close);
    if (close < open) backtrack(cur + ")", open, close + 1);
  };
  backtrack("", 0, 0);
  return res;
}`,
      },
    ],
    runner: {
      entry: "generateParenthesis",
      comparison: "canonical",
      jsStarter: `function generateParenthesis(n) {
  // Return all well-formed combinations of n pairs of parentheses.
  // TODO: implement
}`,
      jsReference: `function generateParenthesis(n) {
  const res = [];
  function backtrack(cur, open, close) {
    if (cur.length === 2 * n) { res.push(cur); return; }
    if (open < n) backtrack(cur + "(", open + 1, close);
    if (close < open) backtrack(cur + ")", open, close + 1);
  }
  backtrack("", 0, 0);
  return res;
}`,
    },
    tests: [
      { name: "one pair", args: [1], expected: ["()"] },
      { name: "two pairs", args: [2], expected: ["(())", "()()"] },
      { name: "three pairs", args: [3], expected: ["((()))", "(()())", "(())()", "()(())", "()()()"] },
    ],
    relatedIds: [20, 17, 46],
  },
  {
    id: 496,
    slug: "next-greater-element-i",
    title: "Next Greater Element I",
    difficulty: "Easy",
    category: "stack",
    patterns: ["Monotonic Stack", "Hash Map"],
    companies: ["amazon", "bloomberg", "microsoft"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/next-greater-element-i/",
    description:
      "`nums1` is a subset of `nums2`. For each value in `nums1`, find the first element to its right in `nums2` that is strictly larger. Return these answers in order, using `-1` when none exists.",
    examples: [
      { input: "nums1 = [4,1,2], nums2 = [1,3,4,2]", output: "[-1,3,-1]", explanation: "4 has nothing larger to its right; the next greater after 1 is 3; 2 has none." },
      { input: "nums1 = [2,4], nums2 = [1,2,3,4]", output: "[3,-1]" },
    ],
    intuition:
      "Precompute the next greater element for every value in nums2 using a monotonic decreasing stack: when a larger number appears, it resolves all smaller numbers waiting on the stack. Store those answers in a map, then look up each nums1 value in O(1).",
    approach: [
      "Scan nums2 with a stack that stays decreasing.",
      "For each value x, pop every smaller value and record x as its next greater in a map.",
      "Push x onto the stack.",
      "Map each nums1 value through the lookup, defaulting to -1.",
    ],
    complexity: { time: "O(n + m)", space: "O(n)", note: "Each nums2 value is pushed and popped once." },
    solutions: [
      {
        language: "python",
        label: "Monotonic Stack",
        code: `def next_greater_element(nums1: list[int], nums2: list[int]) -> list[int]:
    nge: dict[int, int] = {}
    stack: list[int] = []
    for x in nums2:
        while stack and stack[-1] < x:
            nge[stack.pop()] = x
        stack.append(x)
    return [nge.get(x, -1) for x in nums1]`,
      },
      {
        language: "typescript",
        label: "Monotonic Stack",
        code: `function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const nge = new Map<number, number>();
  const st: number[] = [];
  for (const x of nums2) {
    while (st.length && st[st.length - 1] < x) {
      nge.set(st.pop()!, x);
    }
    st.push(x);
  }
  return nums1.map((x) => nge.get(x) ?? -1);
}`,
      },
    ],
    runner: {
      entry: "nextGreaterElement",
      comparison: "deep",
      jsStarter: `function nextGreaterElement(nums1, nums2) {
  // For each nums1 value, the next greater element to its right in nums2.
  // TODO: implement
}`,
      jsReference: `function nextGreaterElement(nums1, nums2) {
  const nge = new Map();
  const st = [];
  for (const x of nums2) {
    while (st.length && st[st.length - 1] < x) {
      nge.set(st.pop(), x);
    }
    st.push(x);
  }
  return nums1.map((x) => (nge.has(x) ? nge.get(x) : -1));
}`,
    },
    tests: [
      { name: "mixed", args: [[4, 1, 2], [1, 3, 4, 2]], expected: [-1, 3, -1] },
      { name: "ascending", args: [[2, 4], [1, 2, 3, 4]], expected: [3, -1] },
      { name: "single", args: [[1], [1]], expected: [-1] },
      { name: "two values", args: [[5, 3], [3, 5]], expected: [-1, 5] },
    ],
    relatedIds: [503, 556, 739],
  },
  {
    id: 394,
    slug: "decode-string",
    title: "Decode String",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Stack"],
    companies: ["google", "amazon", "meta", "bytedance"],
    frequency: 73,
    leetcodeUrl: "https://leetcode.com/problems/decode-string/",
    description:
      "Decode a string encoded with the rule `k[segment]`, meaning the bracketed segment repeats `k` times. Encodings can nest. Return the fully expanded string.",
    examples: [
      { input: 's = "3[a]2[bc]"', output: '"aaabcbc"' },
      { input: 's = "3[a2[c]]"', output: '"accaccacc"', explanation: "The inner 2[c] expands to \"cc\", giving \"acc\", then repeated three times." },
    ],
    intuition:
      "When you hit an opening bracket you must pause the current string and the repeat count, dive into the inner segment, then resume. Two stacks — one for counts, one for the partial string before each bracket — let you save and restore that context as brackets nest and close.",
    approach: [
      "Walk the string building the current segment and current number.",
      "On a digit, extend the number; on '[', push the number and current string, then reset both.",
      "On ']', pop the saved string and repeat count, and splice the repeated segment back.",
      "Append plain letters to the current segment; return it at the end.",
    ],
    complexity: { time: "O(output length)", space: "O(output length)" },
    solutions: [
      {
        language: "python",
        label: "Two Stacks",
        code: `def decode_string(s: str) -> str:
    num_stack: list[int] = []
    str_stack: list[str] = []
    cur = ""
    num = 0
    for c in s:
        if c.isdigit():
            num = num * 10 + int(c)
        elif c == "[":
            num_stack.append(num)
            str_stack.append(cur)
            num, cur = 0, ""
        elif c == "]":
            rep = num_stack.pop()
            cur = str_stack.pop() + cur * rep
        else:
            cur += c
    return cur`,
      },
      {
        language: "typescript",
        label: "Two Stacks",
        code: `function decodeString(s: string): string {
  const numStack: number[] = [];
  const strStack: string[] = [];
  let cur = "";
  let num = 0;
  for (const c of s) {
    if (c >= "0" && c <= "9") {
      num = num * 10 + (c.charCodeAt(0) - 48);
    } else if (c === "[") {
      numStack.push(num);
      strStack.push(cur);
      num = 0;
      cur = "";
    } else if (c === "]") {
      const rep = numStack.pop()!;
      cur = strStack.pop()! + cur.repeat(rep);
    } else {
      cur += c;
    }
  }
  return cur;
}`,
      },
    ],
    runner: {
      entry: "decodeString",
      comparison: "deep",
      jsStarter: `function decodeString(s) {
  // Expand encodings of the form k[segment], allowing nesting.
  // TODO: implement
}`,
      jsReference: `function decodeString(s) {
  const numStack = [];
  const strStack = [];
  let cur = "";
  let num = 0;
  for (const c of s) {
    if (c >= "0" && c <= "9") {
      num = num * 10 + (c.charCodeAt(0) - 48);
    } else if (c === "[") {
      numStack.push(num);
      strStack.push(cur);
      num = 0;
      cur = "";
    } else if (c === "]") {
      const rep = numStack.pop();
      cur = strStack.pop() + cur.repeat(rep);
    } else {
      cur += c;
    }
  }
  return cur;
}`,
    },
    tests: [
      { name: "two groups", args: ["3[a]2[bc]"], expected: "aaabcbc" },
      { name: "nested", args: ["3[a2[c]]"], expected: "accaccacc" },
      { name: "with suffix", args: ["2[abc]3[cd]ef"], expected: "abcabccdcdcdef" },
      { name: "no encoding", args: ["abc"], expected: "abc" },
      { name: "two-digit count", args: ["10[a]"], expected: "aaaaaaaaaa" },
    ],
    relatedIds: [726, 471, 91],
  },
  {
    id: 1047,
    slug: "remove-all-adjacent-duplicates-in-string",
    title: "Remove All Adjacent Duplicates In String",
    difficulty: "Easy",
    category: "stack",
    patterns: ["Stack"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/",
    description:
      "Repeatedly delete any pair of adjacent equal characters from the string until no such pair remains. Return the resulting string, which is unique.",
    examples: [
      { input: 's = "abbaca"', output: '"ca"', explanation: "Remove \"bb\" → \"aaca\", then \"aa\" → \"ca\"." },
      { input: 's = "azxxzy"', output: '"ay"', explanation: "Remove \"xx\" → \"azzy\", then \"zz\" → \"ay\"." },
    ],
    intuition:
      "Process characters left to right with a stack. If the incoming character equals the stack's top, they form an adjacent duplicate and cancel, so pop. Otherwise push. The stack naturally exposes the new neighbor after each cancellation, handling cascading removals in one pass.",
    approach: [
      "Iterate over the characters with a stack.",
      "If the top equals the current character, pop it (they cancel).",
      "Otherwise push the current character.",
      "Join the remaining stack into the final string.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Stack",
        code: `def remove_duplicates(s: str) -> str:
    stack: list[str] = []
    for c in s:
        if stack and stack[-1] == c:
            stack.pop()
        else:
            stack.append(c)
    return "".join(stack)`,
      },
      {
        language: "typescript",
        label: "Stack",
        code: `function removeDuplicates(s: string): string {
  const st: string[] = [];
  for (const c of s) {
    if (st.length && st[st.length - 1] === c) st.pop();
    else st.push(c);
  }
  return st.join("");
}`,
      },
    ],
    runner: {
      entry: "removeDuplicates",
      comparison: "deep",
      jsStarter: `function removeDuplicates(s) {
  // Remove adjacent equal pairs until none remain.
  // TODO: implement
}`,
      jsReference: `function removeDuplicates(s) {
  const st = [];
  for (const c of s) {
    if (st.length && st[st.length - 1] === c) st.pop();
    else st.push(c);
  }
  return st.join("");
}`,
    },
    tests: [
      { name: "cascading", args: ["abbaca"], expected: "ca" },
      { name: "nested pair", args: ["azxxzy"], expected: "ay" },
      { name: "all cancel", args: ["aaaaaa"], expected: "" },
      { name: "no duplicates", args: ["abc"], expected: "abc" },
    ],
    relatedIds: [1209, 20, 26],
  },
  {
    id: 682,
    slug: "baseball-game",
    title: "Baseball Game",
    difficulty: "Easy",
    category: "stack",
    patterns: ["Stack", "Simulation"],
    companies: ["amazon", "adobe"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/baseball-game/",
    description:
      "Process a list of operations that build a record of scores: an integer records that score, `+` records the sum of the last two scores, `D` records double the last score, and `C` cancels the last score. Return the total of all remaining scores.",
    examples: [
      { input: 'ops = ["5","2","C","D","+"]', output: "30", explanation: "Records become [5], [5,2], [5], [5,10], [5,10,15]; total 30." },
      { input: 'ops = ["1","C"]', output: "0", explanation: "The 1 is recorded then cancelled, leaving nothing." },
    ],
    intuition:
      "Each operation only ever touches the most recently recorded scores, which is exactly what a stack gives you. Push new or derived scores, pop on a cancel, and sum the stack at the end.",
    approach: [
      "Keep a stack of recorded scores.",
      "'+' pushes the sum of the top two; 'D' pushes twice the top; 'C' pops the top.",
      "Any other token is an integer and is pushed.",
      "Return the sum of all values left on the stack.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Stack",
        code: `def cal_points(operations: list[str]) -> int:
    stack: list[int] = []
    for op in operations:
        if op == "+":
            stack.append(stack[-1] + stack[-2])
        elif op == "D":
            stack.append(2 * stack[-1])
        elif op == "C":
            stack.pop()
        else:
            stack.append(int(op))
    return sum(stack)`,
      },
      {
        language: "typescript",
        label: "Stack",
        code: `function calPoints(operations: string[]): number {
  const st: number[] = [];
  for (const op of operations) {
    if (op === "+") st.push(st[st.length - 1] + st[st.length - 2]);
    else if (op === "D") st.push(2 * st[st.length - 1]);
    else if (op === "C") st.pop();
    else st.push(parseInt(op, 10));
  }
  return st.reduce((a, b) => a + b, 0);
}`,
      },
    ],
    runner: {
      entry: "calPoints",
      comparison: "deep",
      jsStarter: `function calPoints(operations) {
  // Apply the scoring operations and return the final total.
  // TODO: implement
}`,
      jsReference: `function calPoints(operations) {
  const st = [];
  for (const op of operations) {
    if (op === "+") st.push(st[st.length - 1] + st[st.length - 2]);
    else if (op === "D") st.push(2 * st[st.length - 1]);
    else if (op === "C") st.pop();
    else st.push(parseInt(op, 10));
  }
  return st.reduce((a, b) => a + b, 0);
}`,
    },
    tests: [
      { name: "cancel and double", args: [["5", "2", "C", "D", "+"]], expected: 30 },
      { name: "negatives", args: [["5", "-2", "4", "C", "D", "9", "+", "+"]], expected: 27 },
      { name: "cancel to empty", args: [["1", "C"]], expected: 0 },
      { name: "plain integers", args: [["1", "2", "3"]], expected: 6 },
    ],
    relatedIds: [150, 155, 20],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Binary Search
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 35,
    slug: "search-insert-position",
    title: "Search Insert Position",
    difficulty: "Easy",
    category: "binary-search",
    patterns: ["Binary Search"],
    companies: ["amazon", "google", "microsoft", "apple"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/search-insert-position/",
    description:
      "Given a sorted array of distinct integers and a target, return the index of the target if present, or otherwise the index where it would be inserted to keep the array sorted. Run in O(log n).",
    examples: [
      { input: "nums = [1,3,5,6], target = 5", output: "2" },
      { input: "nums = [1,3,5,6], target = 2", output: "1", explanation: "2 would sit between 1 and 3, at index 1." },
    ],
    intuition:
      "This is a lower-bound search: find the first position whose value is not less than the target. A half-open binary search converges to exactly that index, which doubles as both the found index and the insertion point.",
    approach: [
      "Set lo = 0 and hi = n (one past the end).",
      "While lo < hi, take mid; if nums[mid] < target move lo past mid, else move hi to mid.",
      "lo ends at the first index ≥ target.",
      "Return lo.",
    ],
    complexity: { time: "O(log n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Lower Bound",
        code: `def search_insert(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
      },
      {
        language: "typescript",
        label: "Lower Bound",
        code: `function searchInsert(nums: number[], target: number): number {
  let lo = 0, hi = nums.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,
      },
    ],
    runner: {
      entry: "searchInsert",
      comparison: "deep",
      jsStarter: `function searchInsert(nums, target) {
  // Index of target, or where it would be inserted to stay sorted.
  // TODO: implement
}`,
      jsReference: `function searchInsert(nums, target) {
  let lo = 0, hi = nums.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,
    },
    tests: [
      { name: "found", args: [[1, 3, 5, 6], 5], expected: 2 },
      { name: "insert middle", args: [[1, 3, 5, 6], 2], expected: 1 },
      { name: "insert end", args: [[1, 3, 5, 6], 7], expected: 4 },
      { name: "insert front", args: [[1, 3, 5, 6], 0], expected: 0 },
      { name: "single", args: [[1], 1], expected: 0 },
    ],
    relatedIds: [704, 278, 34],
  },
  {
    id: 74,
    slug: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search", "Matrix"],
    companies: ["amazon", "microsoft", "google", "bloomberg"],
    frequency: 69,
    leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/",
    description:
      "Search a matrix where each row is sorted left to right and the first value of every row exceeds the last value of the previous row. Return whether the target appears, in O(log(m·n)).",
    examples: [
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" },
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13", output: "false" },
    ],
    intuition:
      "The row-ordering guarantees the matrix is fully sorted when read row by row, so it behaves like one sorted array of length m·n. Run a standard binary search over that virtual array, converting each flat index back into a (row, column) with division and modulo.",
    approach: [
      "Treat the matrix as a sorted array of m·n elements.",
      "Binary search over indices 0..m·n-1.",
      "Map index mid to matrix[mid / n][mid % n] for comparison.",
      "Return true on a match, false if the search space empties.",
    ],
    complexity: { time: "O(log(m·n))", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Flattened Binary Search",
        code: `def search_matrix(matrix: list[list[int]], target: int) -> bool:
    m, n = len(matrix), len(matrix[0])
    lo, hi = 0, m * n - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        val = matrix[mid // n][mid % n]
        if val == target:
            return True
        if val < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return False`,
      },
      {
        language: "typescript",
        label: "Flattened Binary Search",
        code: `function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length, n = matrix[0].length;
  let lo = 0, hi = m * n - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const val = matrix[Math.floor(mid / n)][mid % n];
    if (val === target) return true;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}`,
      },
    ],
    runner: {
      entry: "searchMatrix",
      comparison: "deep",
      jsStarter: `function searchMatrix(matrix, target) {
  // Search the row-sorted matrix for target.
  // TODO: implement
}`,
      jsReference: `function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let lo = 0, hi = m * n - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const val = matrix[Math.floor(mid / n)][mid % n];
    if (val === target) return true;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}`,
    },
    tests: [
      { name: "present", args: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3], expected: true },
      { name: "absent", args: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13], expected: false },
      { name: "last cell", args: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 60], expected: true },
      { name: "single match", args: [[[1]], 1], expected: true },
      { name: "single miss", args: [[[1, 1]], 0], expected: false },
    ],
    relatedIds: [240, 33, 35],
  },
  {
    id: 153,
    slug: "find-minimum-in-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search"],
    companies: ["amazon", "microsoft", "google", "goldman-sachs"],
    frequency: 71,
    leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    description:
      "An ascending array of distinct integers has been rotated some number of times. Find the minimum element in O(log n).",
    examples: [
      { input: "nums = [3,4,5,1,2]", output: "1", explanation: "The original [1,2,3,4,5] was rotated, putting the minimum at index 3." },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0" },
    ],
    intuition:
      "Compare the midpoint to the rightmost element. If nums[mid] is larger than nums[hi], the rotation pivot (and thus the minimum) lies strictly to the right of mid; otherwise the minimum is at mid or to its left. This steadily narrows to the single minimum.",
    approach: [
      "Set lo = 0, hi = n − 1.",
      "While lo < hi, compute mid.",
      "If nums[mid] > nums[hi], the minimum is to the right: lo = mid + 1.",
      "Otherwise hi = mid. When lo == hi, that index holds the minimum.",
    ],
    complexity: { time: "O(log n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Binary Search",
        code: `def find_min(nums: list[int]) -> int:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return nums[lo]`,
      },
      {
        language: "typescript",
        label: "Binary Search",
        code: `function findMin(nums: number[]): number {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}`,
      },
    ],
    runner: {
      entry: "findMin",
      comparison: "deep",
      jsStarter: `function findMin(nums) {
  // Minimum of a rotated ascending array of distinct integers.
  // TODO: implement
}`,
      jsReference: `function findMin(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}`,
    },
    tests: [
      { name: "rotated", args: [[3, 4, 5, 1, 2]], expected: 1 },
      { name: "larger rotation", args: [[4, 5, 6, 7, 0, 1, 2]], expected: 0 },
      { name: "not rotated", args: [[11, 13, 15, 17]], expected: 11 },
      { name: "two elements", args: [[2, 1]], expected: 1 },
      { name: "single", args: [[1]], expected: 1 },
    ],
    relatedIds: [33, 154, 162],
  },
  {
    id: 33,
    slug: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search"],
    companies: ["amazon", "meta", "microsoft", "google", "bloomberg"],
    frequency: 79,
    leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    description:
      "A sorted array of distinct integers has been rotated at an unknown pivot. Given a target, return its index, or -1 if it is absent, in O(log n).",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
    ],
    intuition:
      "At any midpoint, one of the two halves is guaranteed to be sorted normally. Detect which half is sorted, check whether the target falls inside its known range, and discard the other half. This keeps the logarithmic guarantee despite the rotation.",
    approach: [
      "Binary search with lo and hi pointers.",
      "If nums[lo] ≤ nums[mid], the left half is sorted; otherwise the right half is.",
      "If the target lies within the sorted half's range, search there; else search the other half.",
      "Return mid on a match, or -1 when the range empties.",
    ],
    complexity: { time: "O(log n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Binary Search",
        code: `def search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1`,
      },
      {
        language: "typescript",
        label: "Binary Search",
        code: `function search(nums: number[], target: number): number {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}`,
      },
    ],
    runner: {
      entry: "search",
      comparison: "deep",
      jsStarter: `function search(nums, target) {
  // Index of target in a rotated sorted array, or -1.
  // TODO: implement
}`,
      jsReference: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}`,
    },
    tests: [
      { name: "found in tail", args: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
      { name: "absent", args: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 },
      { name: "single miss", args: [[1], 0], expected: -1 },
      { name: "single hit", args: [[1], 1], expected: 0 },
      { name: "pivot at front", args: [[5, 1, 3], 5], expected: 0 },
    ],
    relatedIds: [81, 153, 704],
  },
  {
    id: 69,
    slug: "sqrtx",
    title: "Sqrt(x)",
    difficulty: "Easy",
    category: "binary-search",
    patterns: ["Binary Search", "Math"],
    companies: ["amazon", "google", "apple", "bloomberg"],
    frequency: 57,
    leetcodeUrl: "https://leetcode.com/problems/sqrtx/",
    description:
      "Given a non-negative integer `x`, return the integer square root of `x` — that is, the floor of its real square root — without using any built-in square-root function.",
    examples: [
      { input: "x = 4", output: "2" },
      { input: "x = 8", output: "2", explanation: "The real root is about 2.83, and the floor is 2." },
    ],
    intuition:
      "The answer is the largest integer whose square does not exceed x, and squaring is monotonic, so binary search on the candidate root works. Search the range [1, x/2] (for x ≥ 2), keeping the largest mid whose square stays within x.",
    approach: [
      "Return x directly for x < 2.",
      "Binary search lo = 1 to hi = x / 2.",
      "If mid·mid ≤ x, record mid as a candidate and search higher; otherwise search lower.",
      "Return the best candidate.",
    ],
    complexity: { time: "O(log x)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Binary Search",
        code: `def my_sqrt(x: int) -> int:
    if x < 2:
        return x
    lo, hi, ans = 1, x // 2, 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid <= x:
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ans`,
      },
      {
        language: "typescript",
        label: "Binary Search",
        code: `function mySqrt(x: number): number {
  if (x < 2) return x;
  let lo = 1, hi = Math.floor(x / 2), ans = 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (mid * mid <= x) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return ans;
}`,
      },
    ],
    runner: {
      entry: "mySqrt",
      comparison: "deep",
      jsStarter: `function mySqrt(x) {
  // Integer (floored) square root of x, no Math.sqrt.
  // TODO: implement
}`,
      jsReference: `function mySqrt(x) {
  if (x < 2) return x;
  let lo = 1, hi = Math.floor(x / 2), ans = 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (mid * mid <= x) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return ans;
}`,
    },
    tests: [
      { name: "perfect square", args: [4], expected: 2 },
      { name: "floored", args: [8], expected: 2 },
      { name: "zero", args: [0], expected: 0 },
      { name: "one", args: [1], expected: 1 },
      { name: "large perfect square", args: [2147395600], expected: 46340 },
    ],
    relatedIds: [367, 50, 633],
  },
  {
    id: 367,
    slug: "valid-perfect-square",
    title: "Valid Perfect Square",
    difficulty: "Easy",
    category: "binary-search",
    patterns: ["Binary Search", "Math"],
    companies: ["amazon", "microsoft", "linkedin"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/valid-perfect-square/",
    description:
      "Given a positive integer `num`, determine whether it is a perfect square (the square of some integer). Return `true` or `false` without using any built-in square-root function.",
    examples: [
      { input: "num = 16", output: "true", explanation: "16 = 4 × 4." },
      { input: "num = 14", output: "false" },
    ],
    intuition:
      "A perfect square is one whose integer square root squared returns the value itself. Since k·k grows monotonically, binary search for an integer k in [1, num] whose square equals num exactly.",
    approach: [
      "Binary search lo = 1 to hi = num.",
      "Compute mid·mid and compare to num.",
      "Return true on an exact match; move lo or hi based on whether the square is too small or too large.",
      "Return false if no exact square is found.",
    ],
    complexity: { time: "O(log num)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Binary Search",
        code: `def is_perfect_square(num: int) -> bool:
    lo, hi = 1, num
    while lo <= hi:
        mid = (lo + hi) // 2
        sq = mid * mid
        if sq == num:
            return True
        if sq < num:
            lo = mid + 1
        else:
            hi = mid - 1
    return False`,
      },
      {
        language: "typescript",
        label: "Binary Search",
        code: `function isPerfectSquare(num: number): boolean {
  let lo = 1, hi = num;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const sq = mid * mid;
    if (sq === num) return true;
    if (sq < num) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}`,
      },
    ],
    runner: {
      entry: "isPerfectSquare",
      comparison: "deep",
      jsStarter: `function isPerfectSquare(num) {
  // True if num is a perfect square, no Math.sqrt.
  // TODO: implement
}`,
      jsReference: `function isPerfectSquare(num) {
  let lo = 1, hi = num;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const sq = mid * mid;
    if (sq === num) return true;
    if (sq < num) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}`,
    },
    tests: [
      { name: "square", args: [16], expected: true },
      { name: "non-square", args: [14], expected: false },
      { name: "one", args: [1], expected: true },
      { name: "large square", args: [808201], expected: true },
      { name: "large non-square", args: [2147483647], expected: false },
    ],
    relatedIds: [69, 633, 50],
  },
  {
    id: 852,
    slug: "peak-index-in-a-mountain-array",
    title: "Peak Index in a Mountain Array",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search"],
    companies: ["amazon", "google", "apple"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
    description:
      "A mountain array strictly increases to a single peak and then strictly decreases. Given such an array, return the index of the peak in O(log n).",
    examples: [
      { input: "arr = [0,1,0]", output: "1" },
      { input: "arr = [0,10,5,2]", output: "1", explanation: "The values rise to 10 at index 1, then fall." },
    ],
    intuition:
      "Compare each midpoint with its right neighbor. If arr[mid] < arr[mid+1] you are still on the ascending slope, so the peak is to the right; otherwise you are at or past the peak, so it is at mid or to the left. Convergence lands on the peak.",
    approach: [
      "Set lo = 0, hi = n − 1.",
      "While lo < hi, compute mid.",
      "If arr[mid] < arr[mid+1], move lo = mid + 1; else hi = mid.",
      "Return lo once lo == hi.",
    ],
    complexity: { time: "O(log n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Binary Search",
        code: `def peak_index_in_mountain_array(arr: list[int]) -> int:
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] < arr[mid + 1]:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
      },
      {
        language: "typescript",
        label: "Binary Search",
        code: `function peakIndexInMountainArray(arr: number[]): number {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < arr[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,
      },
    ],
    runner: {
      entry: "peakIndexInMountainArray",
      comparison: "deep",
      jsStarter: `function peakIndexInMountainArray(arr) {
  // Index of the single peak in a mountain array.
  // TODO: implement
}`,
      jsReference: `function peakIndexInMountainArray(arr) {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < arr[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,
    },
    tests: [
      { name: "tiny mountain", args: [[0, 1, 0]], expected: 1 },
      { name: "four elements", args: [[0, 2, 1, 0]], expected: 1 },
      { name: "early peak", args: [[0, 10, 5, 2]], expected: 1 },
      { name: "peak in middle", args: [[3, 4, 5, 1]], expected: 2 },
      { name: "longer", args: [[24, 69, 100, 99, 79, 78, 67, 36, 26, 19]], expected: 2 },
    ],
    relatedIds: [162, 1095, 941],
  },
  {
    id: 658,
    slug: "find-k-closest-elements",
    title: "Find K Closest Elements",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search", "Two Pointers"],
    companies: ["amazon", "meta", "google", "microsoft"],
    frequency: 65,
    leetcodeUrl: "https://leetcode.com/problems/find-k-closest-elements/",
    description:
      "Given a sorted array, an integer `k`, and a value `x`, return the `k` elements closest to `x` in ascending order. When two elements are equally close, the smaller one is preferred.",
    examples: [
      { input: "arr = [1,2,3,4,5], k = 4, x = 3", output: "[1,2,3,4]" },
      { input: "arr = [1,2,3,4,5], k = 4, x = -1", output: "[1,2,3,4]", explanation: "x sits left of the array, so the first four are closest." },
    ],
    intuition:
      "The answer is a contiguous window of width k (the array is sorted). Binary search for the best left boundary: at each candidate, compare the distance of the element just left of the window to the element just right of it, shrinking toward whichever side keeps closer values. Tie-breaking toward smaller values falls out of using strict greater-than.",
    approach: [
      "Set lo = 0 and hi = n − k, the range of valid window starts.",
      "While lo < hi, take mid and compare x − arr[mid] against arr[mid+k] − x.",
      "If the left edge is strictly farther, move lo = mid + 1; otherwise hi = mid.",
      "Return the slice arr[lo .. lo + k).",
    ],
    complexity: { time: "O(log(n − k) + k)", space: "O(k)", note: "Binary search for the window, then copy k elements." },
    solutions: [
      {
        language: "python",
        label: "Binary Search Window",
        code: `def find_closest_elements(arr: list[int], k: int, x: int) -> list[int]:
    lo, hi = 0, len(arr) - k
    while lo < hi:
        mid = (lo + hi) // 2
        if x - arr[mid] > arr[mid + k] - x:
            lo = mid + 1
        else:
            hi = mid
    return arr[lo:lo + k]`,
      },
      {
        language: "typescript",
        label: "Binary Search Window",
        code: `function findClosestElements(arr: number[], k: number, x: number): number[] {
  let lo = 0, hi = arr.length - k;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (x - arr[mid] > arr[mid + k] - x) lo = mid + 1;
    else hi = mid;
  }
  return arr.slice(lo, lo + k);
}`,
      },
    ],
    runner: {
      entry: "findClosestElements",
      comparison: "deep",
      jsStarter: `function findClosestElements(arr, k, x) {
  // The k elements closest to x, ascending; ties prefer smaller values.
  // TODO: implement
}`,
      jsReference: `function findClosestElements(arr, k, x) {
  let lo = 0, hi = arr.length - k;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (x - arr[mid] > arr[mid + k] - x) lo = mid + 1;
    else hi = mid;
  }
  return arr.slice(lo, lo + k);
}`,
    },
    tests: [
      { name: "x inside", args: [[1, 2, 3, 4, 5], 4, 3], expected: [1, 2, 3, 4] },
      { name: "x left of array", args: [[1, 2, 3, 4, 5], 4, -1], expected: [1, 2, 3, 4] },
      { name: "tie prefers smaller", args: [[1, 2, 3, 4, 5], 2, 3], expected: [2, 3] },
      { name: "duplicates", args: [[1, 3, 3, 5, 7, 7, 9], 3, 4], expected: [3, 3, 5] },
    ],
    relatedIds: [35, 374, 1471],
  },
];

export default batchB;
