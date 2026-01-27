import type { Problem } from "../types.ts";

/**
 * Batch F — twenty stack, binary-search, and linked-list problems. Each record
 * ships working Python + TypeScript solutions plus a fully wired playground
 * runner with hand-verified tests. Design problems use an ops/args driver that
 * returns a results array (null for void operations); linked-list problems use
 * array I/O and build real nodes inside the runner.
 */
export const batchF: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Stack
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 901,
    slug: "online-stock-span",
    title: "Online Stock Span",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Monotonic Stack", "Design"],
    companies: ["amazon", "google", "bloomberg", "microsoft"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/online-stock-span/",
    description:
      "Design a class that streams daily stock prices through `next(price)` and returns the span: the count of consecutive days up to and including today whose price was not greater than today's.",
    examples: [
      {
        input: 'next calls with 100, 80, 60, 70, 60, 75, 85',
        output: "1, 1, 1, 2, 1, 4, 6",
        explanation: "When 75 arrives, days 60, 70, 60 plus today all sit at or below 75, giving a span of 4.",
      },
    ],
    intuition:
      "A day's span only grows by absorbing earlier days whose price is less than or equal to today's. Keep a stack of (price, span) blocks; when a new price dominates the top blocks, pop them and add their spans together. Each day is pushed and popped at most once, so the amortized cost is O(1).",
    approach: [
      "Maintain a stack of [price, span] pairs.",
      "For each new price start span = 1.",
      "While the top of the stack has price <= today's price, pop it and add its span to today's span.",
      "Push [price, span] and return span.",
    ],
    complexity: { time: "O(1) amortized per call", space: "O(n)", note: "Each price is pushed and popped once." },
    solutions: [
      {
        language: "python",
        label: "Monotonic stack",
        code: `class StockSpanner:
    def __init__(self) -> None:
        self.stack: list[list[int]] = []  # [price, span]

    def next(self, price: int) -> int:
        span = 1
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack.pop()[1]
        self.stack.append([price, span])
        return span`,
      },
      {
        language: "typescript",
        label: "Monotonic stack",
        code: `class StockSpanner {
  private stack: [number, number][] = []; // [price, span]

  next(price: number): number {
    let span = 1;
    while (this.stack.length && this.stack[this.stack.length - 1][0] <= price) {
      span += this.stack.pop()![1];
    }
    this.stack.push([price, span]);
    return span;
  }
}`,
      },
    ],
    runner: {
      entry: "runStockSpanner",
      comparison: "deep",
      jsStarter: `function runStockSpanner(ops, args) {
  // Replay the calls. "StockSpanner" returns null; "next" returns the span.
  // TODO: implement
}`,
      jsReference: `function runStockSpanner(ops, args) {
  class StockSpanner {
    constructor() { this.stack = []; }
    next(price) {
      let span = 1;
      while (this.stack.length && this.stack[this.stack.length - 1][0] <= price) {
        span += this.stack.pop()[1];
      }
      this.stack.push([price, span]);
      return span;
    }
  }
  const out = [];
  let s = null;
  for (let i = 0; i < ops.length; i++) {
    const a = args[i] || [];
    if (ops[i] === "StockSpanner") { s = new StockSpanner(); out.push(null); }
    else if (ops[i] === "next") out.push(s.next(a[0]));
  }
  return out;
}`,
    },
    tests: [
      {
        name: "classic stream",
        args: [
          ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"],
          [[], [100], [80], [60], [70], [60], [75], [85]],
        ],
        expected: [null, 1, 1, 1, 2, 1, 4, 6],
      },
      {
        name: "ascending",
        args: [["StockSpanner", "next", "next", "next"], [[], [10], [20], [30]]],
        expected: [null, 1, 2, 3],
      },
      {
        name: "descending",
        args: [["StockSpanner", "next", "next", "next"], [[], [30], [20], [10]]],
        expected: [null, 1, 1, 1],
      },
      {
        name: "single price",
        args: [["StockSpanner", "next"], [[], [42]]],
        expected: [null, 1],
      },
    ],
    relatedIds: [739, 503, 84],
  },
  {
    id: 503,
    slug: "next-greater-element-ii",
    title: "Next Greater Element II",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Monotonic Stack", "Circular Array"],
    companies: ["amazon", "google", "bloomberg", "uber"],
    frequency: 61,
    leetcodeUrl: "https://leetcode.com/problems/next-greater-element-ii/",
    description:
      "Given a circular integer array, return for each element the first strictly greater value found while scanning forward (wrapping past the end), or -1 when no such value exists.",
    examples: [
      { input: "nums = [1,2,1]", output: "[2,-1,2]", explanation: "The last 1 wraps around to find the 2." },
      { input: "nums = [1,2,3,4,3]", output: "[2,3,4,-1,4]" },
    ],
    intuition:
      "This is the standard next-greater pattern with a wrap. Simulate two passes over the array using indices modulo n. A decreasing monotonic stack of indices waits for a larger value; when one arrives it resolves every smaller index on top. Only push indices during the first pass so each gets answered at most once.",
    approach: [
      "Initialize the result array with -1 and an empty index stack.",
      "Loop i from 0 to 2n - 1 and read nums[i % n].",
      "While the stack's top index points to a smaller value, pop it and record the current value as its answer.",
      "Push i only while i < n.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Two passes, each index handled once." },
    solutions: [
      {
        language: "python",
        label: "Monotonic stack",
        code: `def next_greater_elements(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [-1] * n
    stack: list[int] = []  # indices
    for i in range(2 * n):
        cur = nums[i % n]
        while stack and nums[stack[-1]] < cur:
            res[stack.pop()] = cur
        if i < n:
            stack.append(i)
    return res`,
      },
      {
        language: "typescript",
        label: "Monotonic stack",
        code: `function nextGreaterElements(nums: number[]): number[] {
  const n = nums.length;
  const res = new Array<number>(n).fill(-1);
  const stack: number[] = [];
  for (let i = 0; i < 2 * n; i++) {
    const cur = nums[i % n];
    while (stack.length && nums[stack[stack.length - 1]] < cur) {
      res[stack.pop()!] = cur;
    }
    if (i < n) stack.push(i);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "nextGreaterElements",
      comparison: "deep",
      jsStarter: `function nextGreaterElements(nums) {
  // Return the next greater element (circular) for each index, or -1.
  // TODO: implement
}`,
      jsReference: `function nextGreaterElements(nums) {
  const n = nums.length;
  const res = new Array(n).fill(-1);
  const stack = [];
  for (let i = 0; i < 2 * n; i++) {
    const cur = nums[i % n];
    while (stack.length && nums[stack[stack.length - 1]] < cur) {
      res[stack.pop()] = cur;
    }
    if (i < n) stack.push(i);
  }
  return res;
}`,
    },
    tests: [
      { name: "wrap", args: [[1, 2, 1]], expected: [2, -1, 2] },
      { name: "mixed", args: [[1, 2, 3, 4, 3]], expected: [2, 3, 4, -1, 4] },
      { name: "strictly decreasing", args: [[5, 4, 3, 2, 1]], expected: [-1, 5, 5, 5, 5] },
      { name: "all equal", args: [[1, 1, 1]], expected: [-1, -1, -1] },
      { name: "single", args: [[9]], expected: [-1] },
    ],
    relatedIds: [496, 739, 901],
  },
  {
    id: 232,
    slug: "implement-queue-using-stacks",
    title: "Implement Queue using Stacks",
    difficulty: "Easy",
    category: "stack",
    patterns: ["Stack", "Design", "Amortized Analysis"],
    companies: ["amazon", "microsoft", "bloomberg", "apple"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/implement-queue-using-stacks/",
    description:
      "Build a FIFO queue supporting push, pop, peek, and empty using only two LIFO stacks as the underlying storage.",
    examples: [
      {
        input: 'push 1, push 2, peek, pop, empty',
        output: "_, _, 1, 1, false",
        explanation: "peek and pop both surface 1 (the oldest element); the queue still holds 2.",
      },
    ],
    intuition:
      "One stack reverses order, two stacks reverse it twice — restoring FIFO. Push always lands on an input stack. Reads come from an output stack; only when it is empty do you pour the entire input stack into it, flipping the order so the oldest element ends up on top. Each element moves between stacks at most once, so reads are amortized O(1).",
    approach: [
      "Keep an input stack for pushes and an output stack for reads.",
      "push(x): append x to the input stack.",
      "When popping or peeking and the output stack is empty, move every input element onto the output stack.",
      "pop/peek then operate on the top of the output stack; empty checks both stacks.",
    ],
    complexity: { time: "O(1) amortized per op", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Two stacks",
        code: `class MyQueue:
    def __init__(self) -> None:
        self.in_stk: list[int] = []
        self.out_stk: list[int] = []

    def push(self, x: int) -> None:
        self.in_stk.append(x)

    def _shift(self) -> None:
        if not self.out_stk:
            while self.in_stk:
                self.out_stk.append(self.in_stk.pop())

    def pop(self) -> int:
        self._shift()
        return self.out_stk.pop()

    def peek(self) -> int:
        self._shift()
        return self.out_stk[-1]

    def empty(self) -> bool:
        return not self.in_stk and not self.out_stk`,
      },
      {
        language: "typescript",
        label: "Two stacks",
        code: `class MyQueue {
  private inStk: number[] = [];
  private outStk: number[] = [];

  push(x: number): void {
    this.inStk.push(x);
  }

  private shift(): void {
    if (this.outStk.length === 0) {
      while (this.inStk.length) this.outStk.push(this.inStk.pop()!);
    }
  }

  pop(): number {
    this.shift();
    return this.outStk.pop()!;
  }

  peek(): number {
    this.shift();
    return this.outStk[this.outStk.length - 1];
  }

  empty(): boolean {
    return this.inStk.length === 0 && this.outStk.length === 0;
  }
}`,
      },
    ],
    runner: {
      entry: "runQueue",
      comparison: "deep",
      jsStarter: `function runQueue(ops, args) {
  // "MyQueue"/"push" return null; "pop"/"peek" return ints; "empty" returns a boolean.
  // TODO: implement
}`,
      jsReference: `function runQueue(ops, args) {
  class MyQueue {
    constructor() { this.inStk = []; this.outStk = []; }
    push(x) { this.inStk.push(x); }
    shift() { if (this.outStk.length === 0) { while (this.inStk.length) this.outStk.push(this.inStk.pop()); } }
    pop() { this.shift(); return this.outStk.pop(); }
    peek() { this.shift(); return this.outStk[this.outStk.length - 1]; }
    empty() { return this.inStk.length === 0 && this.outStk.length === 0; }
  }
  const out = [];
  let q = null;
  for (let i = 0; i < ops.length; i++) {
    const a = args[i] || [];
    const op = ops[i];
    if (op === "MyQueue") { q = new MyQueue(); out.push(null); }
    else if (op === "push") { q.push(a[0]); out.push(null); }
    else if (op === "pop") out.push(q.pop());
    else if (op === "peek") out.push(q.peek());
    else if (op === "empty") out.push(q.empty());
  }
  return out;
}`,
    },
    tests: [
      {
        name: "peek then pop",
        args: [["MyQueue", "push", "push", "peek", "pop", "empty"], [[], [1], [2], [], [], []]],
        expected: [null, null, null, 1, 1, false],
      },
      {
        name: "drain to empty",
        args: [["MyQueue", "push", "pop", "empty"], [[], [5], [], []]],
        expected: [null, null, 5, true],
      },
      {
        name: "empty from start",
        args: [["MyQueue", "empty"], [[], []]],
        expected: [null, true],
      },
      {
        name: "fifo order",
        args: [["MyQueue", "push", "push", "push", "pop", "pop", "peek"], [[], [1], [2], [3], [], [], []]],
        expected: [null, null, null, null, 1, 2, 3],
      },
    ],
    relatedIds: [225, 622, 641],
  },
  {
    id: 71,
    slug: "simplify-path",
    title: "Simplify Path",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Stack", "String"],
    companies: ["amazon", "microsoft", "meta", "bloomberg"],
    frequency: 57,
    leetcodeUrl: "https://leetcode.com/problems/simplify-path/",
    description:
      "Convert an absolute Unix-style file path into its canonical form, collapsing '.', resolving '..', and removing redundant slashes.",
    examples: [
      { input: 'path = "/home//foo/"', output: '"/home/foo"' },
      { input: 'path = "/a/./b/../../c/"', output: '"/c"', explanation: "Two '..' segments cancel a and b, leaving c." },
    ],
    intuition:
      "Split the path on slashes and treat the directory names as a stack. A normal name gets pushed, a single dot is a no-op, and '..' pops the previous directory (if any). Joining the surviving names with single slashes and a leading slash yields the canonical path.",
    approach: [
      "Split the path on '/'.",
      "Ignore empty tokens and '.'.",
      "On '..', pop the stack when it is non-empty.",
      "Otherwise push the directory name.",
      "Return '/' joined with the stacked names.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Stack",
        code: `def simplify_path(path: str) -> str:
    stack: list[str] = []
    for part in path.split("/"):
        if part == "" or part == ".":
            continue
        if part == "..":
            if stack:
                stack.pop()
        else:
            stack.append(part)
    return "/" + "/".join(stack)`,
      },
      {
        language: "typescript",
        label: "Stack",
        code: `function simplifyPath(path: string): string {
  const stack: string[] = [];
  for (const part of path.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      if (stack.length) stack.pop();
    } else {
      stack.push(part);
    }
  }
  return "/" + stack.join("/");
}`,
      },
    ],
    runner: {
      entry: "simplifyPath",
      comparison: "deep",
      jsStarter: `function simplifyPath(path) {
  // Return the canonical absolute path.
  // TODO: implement
}`,
      jsReference: `function simplifyPath(path) {
  const stack = [];
  for (const part of path.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      if (stack.length) stack.pop();
    } else {
      stack.push(part);
    }
  }
  return "/" + stack.join("/");
}`,
    },
    tests: [
      { name: "trailing slash", args: ["/home/"], expected: "/home" },
      { name: "above root", args: ["/../"], expected: "/" },
      { name: "double slash", args: ["/home//foo/"], expected: "/home/foo" },
      { name: "relative segments", args: ["/a/./b/../../c/"], expected: "/c" },
      { name: "triple dot is a name", args: ["/..."], expected: "/..." },
    ],
    relatedIds: [388, 65, 273],
  },
  {
    id: 853,
    slug: "car-fleet",
    title: "Car Fleet",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Monotonic Stack", "Sorting", "Greedy"],
    companies: ["amazon", "google", "meta", "uber"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/car-fleet/",
    description:
      "Cars drive toward a shared target on a single lane and cannot pass one another. Given each car's position and speed, count how many distinct fleets arrive at the target.",
    examples: [
      {
        input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
        output: "3",
        explanation: "Cars at 10 and 8 merge; the car at 5 forms its own fleet; cars at 3 and 0 form the third.",
      },
    ],
    intuition:
      "Process cars from the one closest to the target backward. Compute each car's arrival time assuming an empty road. A car catches the fleet ahead exactly when its time is at most the current fleet's slowest arrival time; otherwise it cannot reach that fleet and starts a new one. Counting the cars that exceed the running maximum time gives the fleet count.",
    approach: [
      "Sort car indices by starting position, nearest the target first.",
      "For each car compute time = (target - position) / speed.",
      "Track the slowest arrival time seen so far.",
      "If a car's time is strictly greater, it leads a new fleet; bump the count and update the running time.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)", note: "Dominated by the sort." },
    solutions: [
      {
        language: "python",
        label: "Sort + sweep",
        code: `def car_fleet(target: int, position: list[int], speed: list[int]) -> int:
    cars = sorted(zip(position, speed), reverse=True)
    fleets = 0
    cur = 0.0
    for pos, spd in cars:
        t = (target - pos) / spd
        if t > cur:
            fleets += 1
            cur = t
    return fleets`,
      },
      {
        language: "typescript",
        label: "Sort + sweep",
        code: `function carFleet(target: number, position: number[], speed: number[]): number {
  const idx = position.map((_, i) => i).sort((a, b) => position[b] - position[a]);
  let fleets = 0;
  let cur = 0;
  for (const i of idx) {
    const t = (target - position[i]) / speed[i];
    if (t > cur) {
      fleets++;
      cur = t;
    }
  }
  return fleets;
}`,
      },
    ],
    runner: {
      entry: "carFleet",
      comparison: "deep",
      jsStarter: `function carFleet(target, position, speed) {
  // Return the number of fleets that reach the target.
  // TODO: implement
}`,
      jsReference: `function carFleet(target, position, speed) {
  const idx = position.map((_, i) => i).sort((a, b) => position[b] - position[a]);
  let fleets = 0;
  let cur = 0;
  for (const i of idx) {
    const t = (target - position[i]) / speed[i];
    if (t > cur) {
      fleets++;
      cur = t;
    }
  }
  return fleets;
}`,
    },
    tests: [
      { name: "classic", args: [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]], expected: 3 },
      { name: "single car", args: [10, [3], [3]], expected: 1 },
      { name: "all merge", args: [100, [0, 2, 4], [4, 2, 1]], expected: 1 },
      { name: "two fleets", args: [10, [6, 8], [3, 2]], expected: 2 },
      { name: "no cars", args: [10, [], []], expected: 0 },
    ],
    relatedIds: [1776, 2211, 901],
  },
  {
    id: 946,
    slug: "validate-stack-sequences",
    title: "Validate Stack Sequences",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Stack", "Simulation", "Greedy"],
    companies: ["amazon", "google", "bloomberg", "adobe"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/validate-stack-sequences/",
    description:
      "Given two integer sequences with distinct values, decide whether they could be a valid push order and pop order of the same stack.",
    examples: [
      {
        input: "pushed = [1,2,3,4,5], popped = [4,5,3,2,1]",
        output: "true",
        explanation: "Push 1-4, pop 4, push 5, pop 5, then pop 3, 2, 1.",
      },
      { input: "pushed = [1,2,3,4,5], popped = [4,3,5,1,2]", output: "false" },
    ],
    intuition:
      "Simulate the stack directly. Push values in the given order, and whenever the top equals the next value to pop, pop it and advance the pop pointer. This greedy popping is forced because values are distinct. If the stack is empty after consuming all pushes, the popped sequence was achievable.",
    approach: [
      "Use an explicit stack and a pointer j into popped.",
      "Push each value from pushed in order.",
      "After each push, while the stack top equals popped[j], pop and increment j.",
      "Return whether the stack ends empty.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Simulation",
        code: `def validate_stack_sequences(pushed: list[int], popped: list[int]) -> bool:
    stack: list[int] = []
    j = 0
    for x in pushed:
        stack.append(x)
        while stack and stack[-1] == popped[j]:
            stack.pop()
            j += 1
    return not stack`,
      },
      {
        language: "typescript",
        label: "Simulation",
        code: `function validateStackSequences(pushed: number[], popped: number[]): boolean {
  const stack: number[] = [];
  let j = 0;
  for (const x of pushed) {
    stack.push(x);
    while (stack.length && stack[stack.length - 1] === popped[j]) {
      stack.pop();
      j++;
    }
  }
  return stack.length === 0;
}`,
      },
    ],
    runner: {
      entry: "validateStackSequences",
      comparison: "deep",
      jsStarter: `function validateStackSequences(pushed, popped) {
  // Return true if popped is a valid pop order for pushed.
  // TODO: implement
}`,
      jsReference: `function validateStackSequences(pushed, popped) {
  const stack = [];
  let j = 0;
  for (const x of pushed) {
    stack.push(x);
    while (stack.length && stack[stack.length - 1] === popped[j]) {
      stack.pop();
      j++;
    }
  }
  return stack.length === 0;
}`,
    },
    tests: [
      { name: "valid", args: [[1, 2, 3, 4, 5], [4, 5, 3, 2, 1]], expected: true },
      { name: "invalid", args: [[1, 2, 3, 4, 5], [4, 3, 5, 1, 2]], expected: false },
      { name: "reverse", args: [[1, 2], [2, 1]], expected: true },
      { name: "same order", args: [[1, 2], [1, 2]], expected: true },
      { name: "blocked middle", args: [[1, 2, 3], [3, 1, 2]], expected: false },
    ],
    relatedIds: [20, 155, 901],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Binary Search
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 162,
    slug: "find-peak-element",
    title: "Find Peak Element",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search"],
    companies: ["amazon", "google", "meta", "microsoft", "bloomberg"],
    frequency: 66,
    leetcodeUrl: "https://leetcode.com/problems/find-peak-element/",
    description:
      "A peak is any element strictly greater than its neighbors, with imaginary -infinity sentinels beyond the array ends. Return the index of any peak in O(log n) time.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "2", explanation: "nums[2] = 3 is greater than both neighbors." },
      { input: "nums = [1,3,5,4,2]", output: "2" },
    ],
    intuition:
      "You do not need to see the whole array. Compare the middle element with its right neighbor: if the slope rises, a peak must exist to the right, so move right; if it falls, a peak exists at the middle or to the left. Either way you discard half the search space and converge on a peak.",
    approach: [
      "Set lo = 0 and hi = n - 1.",
      "While lo < hi, take mid = (lo + hi) / 2.",
      "If nums[mid] > nums[mid + 1] the peak is at mid or left, so hi = mid.",
      "Otherwise lo = mid + 1.",
      "Return lo when the bounds meet.",
    ],
    complexity: { time: "O(log n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Binary search",
        code: `def find_peak_element(nums: list[int]) -> int:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[mid + 1]:
            hi = mid
        else:
            lo = mid + 1
    return lo`,
      },
      {
        language: "typescript",
        label: "Binary search",
        code: `function findPeakElement(nums: number[]): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[mid + 1]) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
    ],
    runner: {
      entry: "findPeakElement",
      comparison: "deep",
      jsStarter: `function findPeakElement(nums) {
  // Return the index of any peak element.
  // TODO: implement
}`,
      jsReference: `function findPeakElement(nums) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[mid + 1]) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
    },
    tests: [
      { name: "peak in middle", args: [[1, 2, 3, 1]], expected: 2 },
      { name: "unique peak", args: [[1, 3, 5, 4, 2]], expected: 2 },
      { name: "single", args: [[1]], expected: 0 },
      { name: "rising", args: [[1, 2]], expected: 1 },
      { name: "falling", args: [[2, 1]], expected: 0 },
    ],
    relatedIds: [852, 1901, 153],
  },
  {
    id: 34,
    slug: "find-first-and-last-position-of-element-in-sorted-array",
    title: "Find First and Last Position of Element in Sorted Array",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search", "Lower/Upper Bound"],
    companies: ["amazon", "google", "meta", "microsoft", "linkedin"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    description:
      "In a non-decreasing array, return the starting and ending indices of a target value as `[first, last]`, or `[-1, -1]` if the target is absent.",
    examples: [
      { input: "nums = [5,7,7,8,8,10], target = 8", output: "[3,4]" },
      { input: "nums = [5,7,7,8,8,10], target = 6", output: "[-1,-1]" },
    ],
    intuition:
      "Run two biased binary searches. The first keeps moving left even after a match to pin the leftmost occurrence; the second keeps moving right to pin the rightmost. Recording the last matching index found in each pass gives the boundaries without scanning the equal run linearly.",
    approach: [
      "Write a helper that binary searches and, on equality, leans left or right based on a flag.",
      "Track the most recent index where nums[mid] equals target.",
      "Call it once leaning left for the first index and once leaning right for the last.",
      "Return both results.",
    ],
    complexity: { time: "O(log n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Two boundary searches",
        code: `def search_range(nums: list[int], target: int) -> list[int]:
    def bound(is_lower: bool) -> int:
        lo, hi, ans = 0, len(nums) - 1, -1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] > target or (is_lower and nums[mid] == target):
                hi = mid - 1
            else:
                lo = mid + 1
            if nums[mid] == target:
                ans = mid
        return ans

    return [bound(True), bound(False)]`,
      },
      {
        language: "typescript",
        label: "Two boundary searches",
        code: `function searchRange(nums: number[], target: number): number[] {
  const bound = (isLower: boolean): number => {
    let lo = 0;
    let hi = nums.length - 1;
    let ans = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (nums[mid] > target || (isLower && nums[mid] === target)) hi = mid - 1;
      else lo = mid + 1;
      if (nums[mid] === target) ans = mid;
    }
    return ans;
  };
  return [bound(true), bound(false)];
}`,
      },
    ],
    runner: {
      entry: "searchRange",
      comparison: "deep",
      jsStarter: `function searchRange(nums, target) {
  // Return [firstIndex, lastIndex] of target, or [-1, -1].
  // TODO: implement
}`,
      jsReference: `function searchRange(nums, target) {
  function bound(isLower) {
    let lo = 0;
    let hi = nums.length - 1;
    let ans = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (nums[mid] > target || (isLower && nums[mid] === target)) hi = mid - 1;
      else lo = mid + 1;
      if (nums[mid] === target) ans = mid;
    }
    return ans;
  }
  return [bound(true), bound(false)];
}`,
    },
    tests: [
      { name: "range", args: [[5, 7, 7, 8, 8, 10], 8], expected: [3, 4] },
      { name: "absent", args: [[5, 7, 7, 8, 8, 10], 6], expected: [-1, -1] },
      { name: "empty", args: [[], 0], expected: [-1, -1] },
      { name: "single match", args: [[1], 1], expected: [0, 0] },
      { name: "all same", args: [[2, 2, 2, 2], 2], expected: [0, 3] },
    ],
    relatedIds: [35, 704, 278],
  },
  {
    id: 81,
    slug: "search-in-rotated-sorted-array-ii",
    title: "Search in Rotated Sorted Array II",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search", "Rotated Array"],
    companies: ["amazon", "microsoft", "bloomberg", "uber"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
    description:
      "A sorted array (with possible duplicates) has been rotated at an unknown pivot. Determine whether a target value is present, returning a boolean.",
    examples: [
      { input: "nums = [2,5,6,0,0,1,2], target = 0", output: "true" },
      { input: "nums = [2,5,6,0,0,1,2], target = 3", output: "false" },
    ],
    intuition:
      "Binary search still applies, but duplicates can hide which half is sorted when nums[lo], nums[mid], and nums[hi] are all equal. In that ambiguous case, shrink both ends by one. Otherwise identify the sorted half and check whether the target lies inside it to decide which way to go.",
    approach: [
      "While lo <= hi, take mid and return true on a match.",
      "If nums[lo], nums[mid], nums[hi] are all equal, increment lo and decrement hi.",
      "Else if the left half is sorted, search it when target fits there, otherwise go right.",
      "Else the right half is sorted; search it when target fits, otherwise go left.",
    ],
    complexity: { time: "O(n) worst case", space: "O(1)", note: "Average O(log n); duplicates force linear shrink." },
    solutions: [
      {
        language: "python",
        label: "Binary search",
        code: `def search(nums: list[int], target: int) -> bool:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return True
        if nums[lo] == nums[mid] == nums[hi]:
            lo += 1
            hi -= 1
        elif nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return False`,
      },
      {
        language: "typescript",
        label: "Binary search",
        code: `function search(nums: number[], target: number): boolean {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return true;
    if (nums[lo] === nums[mid] && nums[mid] === nums[hi]) {
      lo++;
      hi--;
    } else if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return false;
}`,
      },
    ],
    runner: {
      entry: "search",
      comparison: "deep",
      jsStarter: `function search(nums, target) {
  // Return true if target exists in the rotated array (duplicates allowed).
  // TODO: implement
}`,
      jsReference: `function search(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return true;
    if (nums[lo] === nums[mid] && nums[mid] === nums[hi]) {
      lo++;
      hi--;
    } else if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return false;
}`,
    },
    tests: [
      { name: "found", args: [[2, 5, 6, 0, 0, 1, 2], 0], expected: true },
      { name: "missing", args: [[2, 5, 6, 0, 0, 1, 2], 3], expected: false },
      { name: "duplicates around pivot", args: [[1, 0, 1, 1, 1], 0], expected: true },
      { name: "all equal miss", args: [[1, 1, 1, 1, 1], 2], expected: false },
      { name: "single", args: [[1], 1], expected: true },
    ],
    relatedIds: [33, 153, 154],
  },
  {
    id: 4,
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "binary-search",
    patterns: ["Binary Search", "Partitioning"],
    companies: ["amazon", "google", "meta", "microsoft", "apple", "adobe"],
    frequency: 74,
    leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    description:
      "Given two sorted arrays, return the median of their combined elements. The combined length may be even or odd.",
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.0", explanation: "Merged is [1,2,3]; the middle value is 2." },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5" },
    ],
    intuition:
      "The median splits the merged sequence into two equal halves. Binary search the shorter array for a cut so that everything on the left of both cuts is <= everything on the right. When the partition is valid, the median comes from the boundary values — either the max of the left side (odd total) or the average of the two boundary maxima/minima (even total).",
    approach: [
      "Ensure nums1 is the shorter array.",
      "Binary search a cut i in nums1; the matching cut j in nums2 is determined by the half size.",
      "Use +/-infinity sentinels for cuts at the ends.",
      "Adjust the search when left maxima exceed right minima.",
      "Return the boundary value(s) once balanced.",
    ],
    complexity: { time: "O(log(min(m, n)))", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Partition binary search",
        code: `def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    half = (m + n + 1) // 2
    lo, hi = 0, m
    while lo <= hi:
        i = (lo + hi) // 2
        j = half - i
        left1 = nums1[i - 1] if i > 0 else float("-inf")
        right1 = nums1[i] if i < m else float("inf")
        left2 = nums2[j - 1] if j > 0 else float("-inf")
        right2 = nums2[j] if j < n else float("inf")
        if left1 <= right2 and left2 <= right1:
            if (m + n) % 2:
                return float(max(left1, left2))
            return (max(left1, left2) + min(right1, right2)) / 2
        if left1 > right2:
            hi = i - 1
        else:
            lo = i + 1
    return 0.0`,
      },
      {
        language: "typescript",
        label: "Partition binary search",
        code: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
  const m = nums1.length;
  const n = nums2.length;
  const half = (m + n + 1) >> 1;
  let lo = 0;
  let hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = half - i;
    const left1 = i > 0 ? nums1[i - 1] : -Infinity;
    const right1 = i < m ? nums1[i] : Infinity;
    const left2 = j > 0 ? nums2[j - 1] : -Infinity;
    const right2 = j < n ? nums2[j] : Infinity;
    if (left1 <= right2 && left2 <= right1) {
      if ((m + n) % 2) return Math.max(left1, left2);
      return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
    }
    if (left1 > right2) hi = i - 1;
    else lo = i + 1;
  }
  return 0;
}`,
      },
    ],
    runner: {
      entry: "findMedianSortedArrays",
      comparison: "approx",
      jsStarter: `function findMedianSortedArrays(nums1, nums2) {
  // Return the median of the two sorted arrays as a number.
  // TODO: implement
}`,
      jsReference: `function findMedianSortedArrays(nums1, nums2) {
  const merged = [];
  let i = 0;
  let j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) merged.push(nums1[i++]);
    else merged.push(nums2[j++]);
  }
  while (i < nums1.length) merged.push(nums1[i++]);
  while (j < nums2.length) merged.push(nums2[j++]);
  const n = merged.length;
  const m = n >> 1;
  return n % 2 ? merged[m] : (merged[m - 1] + merged[m]) / 2;
}`,
    },
    tests: [
      { name: "odd total", args: [[1, 3], [2]], expected: 2.0, tolerance: 1e-5 },
      { name: "even total", args: [[1, 2], [3, 4]], expected: 2.5, tolerance: 1e-5 },
      { name: "one empty", args: [[], [1]], expected: 1.0, tolerance: 1e-5 },
      { name: "all zeros", args: [[0, 0], [0, 0]], expected: 0.0, tolerance: 1e-5 },
      { name: "interleaved", args: [[1, 3], [2, 7]], expected: 2.5, tolerance: 1e-5 },
    ],
    relatedIds: [215, 295, 4],
  },
  {
    id: 1011,
    slug: "capacity-to-ship-packages-within-d-days",
    title: "Capacity To Ship Packages Within D Days",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search on Answer", "Greedy"],
    companies: ["amazon", "google", "microsoft", "uber"],
    frequency: 63,
    leetcodeUrl: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
    description:
      "Packages must ship in the given order within `days` days. Find the smallest ship capacity so the weights can be partitioned into at most `days` contiguous groups, each summing to at most the capacity.",
    examples: [
      {
        input: "weights = [1,2,3,4,5,6,7,8,9,10], days = 5",
        output: "15",
        explanation: "Groups [1..5], [6,7], [8,9], [10]? Capacity 15 yields a valid five-day plan.",
      },
    ],
    intuition:
      "Feasibility is monotonic: any capacity that works keeps working as it grows, so binary search the capacity. The minimum candidate is the heaviest single package (it must fit) and the maximum is the total weight (one day). For each guessed capacity, greedily fill days and count how many you need.",
    approach: [
      "Set lo = max(weights) and hi = sum(weights).",
      "Define feasible(cap): sweep weights, starting a new day whenever the running load would exceed cap; check the day count.",
      "Binary search for the smallest feasible capacity.",
      "Return lo.",
    ],
    complexity: { time: "O(n log(sum))", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Binary search on answer",
        code: `def ship_within_days(weights: list[int], days: int) -> int:
    def feasible(cap: int) -> bool:
        d, cur = 1, 0
        for w in weights:
            if cur + w > cap:
                d += 1
                cur = 0
            cur += w
        return d <= days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo`,
      },
      {
        language: "typescript",
        label: "Binary search on answer",
        code: `function shipWithinDays(weights: number[], days: number): number {
  const feasible = (cap: number): boolean => {
    let d = 1;
    let cur = 0;
    for (const w of weights) {
      if (cur + w > cap) {
        d++;
        cur = 0;
      }
      cur += w;
    }
    return d <= days;
  };
  let lo = Math.max(...weights);
  let hi = weights.reduce((a, b) => a + b, 0);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (feasible(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
    ],
    runner: {
      entry: "shipWithinDays",
      comparison: "deep",
      jsStarter: `function shipWithinDays(weights, days) {
  // Return the minimum ship capacity to deliver within 'days' days.
  // TODO: implement
}`,
      jsReference: `function shipWithinDays(weights, days) {
  const feasible = (cap) => {
    let d = 1;
    let cur = 0;
    for (const w of weights) {
      if (cur + w > cap) {
        d++;
        cur = 0;
      }
      cur += w;
    }
    return d <= days;
  };
  let lo = Math.max(...weights);
  let hi = weights.reduce((a, b) => a + b, 0);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (feasible(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
    },
    tests: [
      { name: "five days", args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5], expected: 15 },
      { name: "three days", args: [[3, 2, 2, 4, 1, 4], 3], expected: 6 },
      { name: "four days", args: [[1, 2, 3, 1, 1], 4], expected: 3 },
      { name: "single package", args: [[10], 1], expected: 10 },
      { name: "one per day", args: [[1, 2, 3, 4, 5], 5], expected: 5 },
    ],
    relatedIds: [410, 875, 1482],
  },
  {
    id: 410,
    slug: "split-array-largest-sum",
    title: "Split Array Largest Sum",
    difficulty: "Hard",
    category: "binary-search",
    patterns: ["Binary Search on Answer", "Greedy"],
    companies: ["amazon", "google", "meta", "bytedance"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/split-array-largest-sum/",
    description:
      "Split an array of non-negative integers into `k` non-empty contiguous subarrays so that the largest subarray sum is as small as possible, and return that minimized largest sum.",
    examples: [
      {
        input: "nums = [7,2,5,10,8], k = 2",
        output: "18",
        explanation: "Splitting as [7,2,5] and [10,8] gives sums 14 and 18; 18 is the minimum possible maximum.",
      },
    ],
    intuition:
      "Binary search the answer — the largest allowed subarray sum. For a candidate cap, greedily extend each subarray until adding the next number would exceed cap, then start a new piece. If this needs at most k pieces, the cap is achievable. The search range runs from the largest single element up to the total sum.",
    approach: [
      "Set lo = max(nums) and hi = sum(nums).",
      "Define feasible(cap): greedily count contiguous pieces whose sums stay within cap.",
      "If the count is at most k, cap works; shrink hi, otherwise raise lo.",
      "Return lo.",
    ],
    complexity: { time: "O(n log(sum))", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Binary search on answer",
        code: `def split_array(nums: list[int], k: int) -> int:
    def feasible(cap: int) -> bool:
        parts, cur = 1, 0
        for x in nums:
            if cur + x > cap:
                parts += 1
                cur = 0
            cur += x
        return parts <= k

    lo, hi = max(nums), sum(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo`,
      },
      {
        language: "typescript",
        label: "Binary search on answer",
        code: `function splitArray(nums: number[], k: number): number {
  const feasible = (cap: number): boolean => {
    let parts = 1;
    let cur = 0;
    for (const x of nums) {
      if (cur + x > cap) {
        parts++;
        cur = 0;
      }
      cur += x;
    }
    return parts <= k;
  };
  let lo = Math.max(...nums);
  let hi = nums.reduce((a, b) => a + b, 0);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (feasible(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
    ],
    runner: {
      entry: "splitArray",
      comparison: "deep",
      jsStarter: `function splitArray(nums, k) {
  // Return the minimized largest subarray sum over k splits.
  // TODO: implement
}`,
      jsReference: `function splitArray(nums, k) {
  const feasible = (cap) => {
    let parts = 1;
    let cur = 0;
    for (const x of nums) {
      if (cur + x > cap) {
        parts++;
        cur = 0;
      }
      cur += x;
    }
    return parts <= k;
  };
  let lo = Math.max(...nums);
  let hi = nums.reduce((a, b) => a + b, 0);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (feasible(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
    },
    tests: [
      { name: "two splits", args: [[7, 2, 5, 10, 8], 2], expected: 18 },
      { name: "balanced", args: [[1, 2, 3, 4, 5], 2], expected: 9 },
      { name: "each alone", args: [[1, 4, 4], 3], expected: 4 },
      { name: "single piece", args: [[10], 1], expected: 10 },
      { name: "k equals n", args: [[1, 2, 3, 4, 5], 5], expected: 5 },
    ],
    relatedIds: [1011, 1231, 1335],
  },
  {
    id: 540,
    slug: "single-element-in-a-sorted-array",
    title: "Single Element in a Sorted Array",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search", "Parity"],
    companies: ["amazon", "google", "microsoft", "adobe"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/single-element-in-a-sorted-array/",
    description:
      "Every element in a sorted array appears exactly twice except for one element that appears once. Find that single element in O(log n) time.",
    examples: [
      { input: "nums = [1,1,2,3,3,4,4,8,8]", output: "2" },
      { input: "nums = [3,3,7,7,10,11,11]", output: "10" },
    ],
    intuition:
      "Before the unique element, each pair starts at an even index and its twin sits at the next odd index. After the unique element, that alignment shifts by one. Binary search on even indices: if nums[mid] equals nums[mid+1] the single element is to the right; otherwise it is at mid or to the left.",
    approach: [
      "Search the range with lo = 0 and hi = n - 1.",
      "Take mid and force it even by decrementing when it is odd.",
      "If nums[mid] equals nums[mid + 1], the break is to the right, so lo = mid + 2.",
      "Otherwise hi = mid.",
      "Return nums[lo] when the bounds meet.",
    ],
    complexity: { time: "O(log n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Binary search on pairs",
        code: `def single_non_duplicate(nums: list[int]) -> int:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if mid % 2 == 1:
            mid -= 1
        if nums[mid] == nums[mid + 1]:
            lo = mid + 2
        else:
            hi = mid
    return nums[lo]`,
      },
      {
        language: "typescript",
        label: "Binary search on pairs",
        code: `function singleNonDuplicate(nums: number[]): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    let mid = (lo + hi) >> 1;
    if (mid % 2 === 1) mid--;
    if (nums[mid] === nums[mid + 1]) lo = mid + 2;
    else hi = mid;
  }
  return nums[lo];
}`,
      },
    ],
    runner: {
      entry: "singleNonDuplicate",
      comparison: "deep",
      jsStarter: `function singleNonDuplicate(nums) {
  // Return the element that appears exactly once.
  // TODO: implement
}`,
      jsReference: `function singleNonDuplicate(nums) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    let mid = (lo + hi) >> 1;
    if (mid % 2 === 1) mid--;
    if (nums[mid] === nums[mid + 1]) lo = mid + 2;
    else hi = mid;
  }
  return nums[lo];
}`,
    },
    tests: [
      { name: "middle single", args: [[1, 1, 2, 3, 3, 4, 4, 8, 8]], expected: 2 },
      { name: "later single", args: [[3, 3, 7, 7, 10, 11, 11]], expected: 10 },
      { name: "single element", args: [[1]], expected: 1 },
      { name: "single at end", args: [[1, 1, 2]], expected: 2 },
      { name: "single is last", args: [[1, 1, 2, 2, 3]], expected: 3 },
    ],
    relatedIds: [136, 137, 268],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Linked List
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 92,
    slug: "reverse-linked-list-ii",
    title: "Reverse Linked List II",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["In-place Reversal", "Pointers"],
    companies: ["amazon", "meta", "microsoft", "apple"],
    frequency: 67,
    leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list-ii/",
    description:
      "Reverse the nodes of a singly linked list between positions `left` and `right` (1-indexed, inclusive) and return the modified list. The playground uses array form for the list.",
    examples: [
      { input: "head = [1,2,3,4,5], left = 2, right = 4", output: "[1,4,3,2,5]" },
      { input: "head = [5], left = 1, right = 1", output: "[5]" },
    ],
    intuition:
      "Walk to the node just before position left, then repeatedly splice the node after the current one to the front of the sublist (head-insertion). Doing this right - left times reverses exactly the target window in a single pass, while a dummy head keeps the left = 1 case uniform.",
    approach: [
      "Create a dummy node in front of the head.",
      "Advance a prev pointer to the node before position left.",
      "Let cur be the first node of the window; right - left times, detach cur.next and reinsert it right after prev.",
      "Return dummy.next.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Head insertion",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def reverse_between(head: ListNode | None, left: int, right: int) -> ListNode | None:
    dummy = ListNode(0, head)
    prev = dummy
    for _ in range(left - 1):
        prev = prev.next
    cur = prev.next
    for _ in range(right - left):
        move = cur.next
        cur.next = move.next
        move.next = prev.next
        prev.next = move
    return dummy.next`,
      },
      {
        language: "typescript",
        label: "Head insertion",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let prev: ListNode = dummy;
  for (let i = 1; i < left; i++) prev = prev.next!;
  const cur = prev.next!;
  for (let i = 0; i < right - left; i++) {
    const move = cur.next!;
    cur.next = move.next;
    move.next = prev.next;
    prev.next = move;
  }
  return dummy.next;
}`,
      },
    ],
    runner: {
      entry: "reverseBetween",
      comparison: "deep",
      jsStarter: `function reverseBetween(values, left, right) {
  // 'values' is the list as an array. Reverse positions left..right (1-indexed).
  // TODO: implement
}`,
      jsReference: `function reverseBetween(values, left, right) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  const dummy = { val: 0, next: head };
  let prev = dummy;
  for (let i = 1; i < left; i++) prev = prev.next;
  const cur = prev.next;
  for (let i = 0; i < right - left; i++) {
    const move = cur.next;
    cur.next = move.next;
    move.next = prev.next;
    prev.next = move;
  }
  const out = [];
  for (let n = dummy.next; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "inner window", args: [[1, 2, 3, 4, 5], 2, 4], expected: [1, 4, 3, 2, 5] },
      { name: "single node", args: [[5], 1, 1], expected: [5] },
      { name: "whole list", args: [[1, 2, 3], 1, 3], expected: [3, 2, 1] },
      { name: "prefix", args: [[1, 2, 3, 4, 5], 1, 2], expected: [2, 1, 3, 4, 5] },
      { name: "two nodes", args: [[1, 2], 1, 2], expected: [2, 1] },
    ],
    relatedIds: [206, 25, 61],
  },
  {
    id: 25,
    slug: "reverse-nodes-in-k-group",
    title: "Reverse Nodes in k-Group",
    difficulty: "Hard",
    category: "linked-list",
    patterns: ["In-place Reversal", "Pointers"],
    companies: ["amazon", "meta", "microsoft", "google", "bytedance"],
    frequency: 68,
    leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    description:
      "Reverse the nodes of a linked list in consecutive groups of `k`. A trailing group with fewer than `k` nodes stays in its original order. The playground uses array form for the list.",
    examples: [
      { input: "head = [1,2,3,4,5], k = 2", output: "[2,1,4,3,5]" },
      { input: "head = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]" },
    ],
    intuition:
      "Process the list group by group. Before reversing, scan ahead k nodes to confirm a full group exists; if it does, reverse those k pointers and stitch the reversed block between the previous group and the rest. A node marking the end of the previous group lets you reconnect cleanly and advance to the next group.",
    approach: [
      "Use a dummy node and a groupPrev pointer.",
      "From groupPrev, walk k steps to find the k-th node; if it is null, stop.",
      "Reverse the k nodes between groupPrev.next and the node after the k-th.",
      "Reconnect groupPrev to the new front, then move groupPrev to the old front (new tail).",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Group reversal",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def reverse_k_group(head: ListNode | None, k: int) -> ListNode | None:
    dummy = ListNode(0, head)
    group_prev = dummy
    while True:
        kth = group_prev
        for _ in range(k):
            kth = kth.next if kth else None
        if not kth:
            break
        group_next = kth.next
        prev, cur = group_next, group_prev.next
        while cur is not group_next:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        new_group_prev = group_prev.next
        group_prev.next = kth
        group_prev = new_group_prev
    return dummy.next`,
      },
      {
        language: "typescript",
        label: "Group reversal",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let groupPrev: ListNode = dummy;
  while (true) {
    let kth: ListNode | null = groupPrev;
    for (let i = 0; i < k && kth; i++) kth = kth.next;
    if (!kth) break;
    const groupNext = kth.next;
    let prev: ListNode | null = groupNext;
    let cur: ListNode | null = groupPrev.next;
    while (cur !== groupNext) {
      const nxt: ListNode | null = cur!.next;
      cur!.next = prev;
      prev = cur;
      cur = nxt;
    }
    const newGroupPrev = groupPrev.next!;
    groupPrev.next = kth;
    groupPrev = newGroupPrev;
  }
  return dummy.next;
}`,
      },
    ],
    runner: {
      entry: "reverseKGroup",
      comparison: "deep",
      jsStarter: `function reverseKGroup(values, k) {
  // 'values' is the list as an array. Reverse every k nodes; leftover stays.
  // TODO: implement
}`,
      jsReference: `function reverseKGroup(values, k) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  const dummy = { val: 0, next: head };
  let groupPrev = dummy;
  while (true) {
    let kth = groupPrev;
    for (let i = 0; i < k && kth; i++) kth = kth.next;
    if (!kth) break;
    const groupNext = kth.next;
    let prev = groupNext;
    let cur = groupPrev.next;
    while (cur !== groupNext) {
      const nxt = cur.next;
      cur.next = prev;
      prev = cur;
      cur = nxt;
    }
    const newGroupPrev = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = newGroupPrev;
  }
  const out = [];
  for (let n = dummy.next; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "pairs", args: [[1, 2, 3, 4, 5], 2], expected: [2, 1, 4, 3, 5] },
      { name: "triples", args: [[1, 2, 3, 4, 5], 3], expected: [3, 2, 1, 4, 5] },
      { name: "k=1 unchanged", args: [[1, 2, 3, 4, 5], 1], expected: [1, 2, 3, 4, 5] },
      { name: "full reverse", args: [[1, 2, 3, 4], 4], expected: [4, 3, 2, 1] },
      { name: "leftover stays", args: [[1], 2], expected: [1] },
    ],
    relatedIds: [206, 92, 24],
  },
  {
    id: 86,
    slug: "partition-list",
    title: "Partition List",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Two Pointers", "Dummy Nodes"],
    companies: ["amazon", "microsoft", "bloomberg", "adobe"],
    frequency: 53,
    leetcodeUrl: "https://leetcode.com/problems/partition-list/",
    description:
      "Reorder a linked list so that every node with value less than `x` comes before all nodes with value greater than or equal to `x`, preserving the original relative order within each group. The playground uses array form for the list.",
    examples: [
      { input: "head = [1,4,3,2,5,2], x = 3", output: "[1,2,2,4,3,5]" },
      { input: "head = [2,1], x = 2", output: "[1,2]" },
    ],
    intuition:
      "Build two separate chains with dummy heads — one for nodes below x and one for the rest — appending each original node to the appropriate chain as you scan. Because you append in order, relative ordering is preserved. Finally link the tail of the 'less' chain to the front of the 'greater-or-equal' chain.",
    approach: [
      "Create dummy heads for the 'less' and 'greater-or-equal' lists.",
      "Traverse the list, appending each node to the matching chain.",
      "Terminate the second chain with null.",
      "Connect the less-tail to the second chain's head and return the less-head.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Two chains",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def partition(head: ListNode | None, x: int) -> ListNode | None:
    less_dummy = ListNode()
    ge_dummy = ListNode()
    less, ge = less_dummy, ge_dummy
    node = head
    while node:
        if node.val < x:
            less.next = node
            less = node
        else:
            ge.next = node
            ge = node
        node = node.next
    ge.next = None
    less.next = ge_dummy.next
    return less_dummy.next`,
      },
      {
        language: "typescript",
        label: "Two chains",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function partition(head: ListNode | null, x: number): ListNode | null {
  const lessDummy = new ListNode();
  const geDummy = new ListNode();
  let less = lessDummy;
  let ge = geDummy;
  for (let node = head; node; node = node.next) {
    if (node.val < x) {
      less.next = node;
      less = node;
    } else {
      ge.next = node;
      ge = node;
    }
  }
  ge.next = null;
  less.next = geDummy.next;
  return lessDummy.next;
}`,
      },
    ],
    runner: {
      entry: "partition",
      comparison: "deep",
      jsStarter: `function partition(values, x) {
  // 'values' is the list as an array. Move nodes < x before nodes >= x (stable).
  // TODO: implement
}`,
      jsReference: `function partition(values, x) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  const lessDummy = { val: 0, next: null };
  const geDummy = { val: 0, next: null };
  let less = lessDummy;
  let ge = geDummy;
  for (let n = head; n; n = n.next) {
    if (n.val < x) {
      less.next = n;
      less = n;
    } else {
      ge.next = n;
      ge = n;
    }
  }
  ge.next = null;
  less.next = geDummy.next;
  const out = [];
  for (let n = lessDummy.next; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "mixed", args: [[1, 4, 3, 2, 5, 2], 3], expected: [1, 2, 2, 4, 3, 5] },
      { name: "swap pair", args: [[2, 1], 2], expected: [1, 2] },
      { name: "all greater", args: [[1, 2, 3], 0], expected: [1, 2, 3] },
      { name: "all less", args: [[1, 2, 3], 10], expected: [1, 2, 3] },
      { name: "empty", args: [[], 1], expected: [] },
    ],
    relatedIds: [328, 61, 148],
  },
  {
    id: 328,
    slug: "odd-even-linked-list",
    title: "Odd Even Linked List",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Pointers", "In-place Rewiring"],
    companies: ["amazon", "microsoft", "bloomberg", "adobe"],
    frequency: 51,
    leetcodeUrl: "https://leetcode.com/problems/odd-even-linked-list/",
    description:
      "Group the nodes at odd positions together followed by the nodes at even positions (positions are 1-indexed by node order, not by value), keeping the relative order in each group. The playground uses array form for the list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[1,3,5,2,4]" },
      { input: "head = [2,1,3,5,6,4,7]", output: "[2,3,6,7,1,5,4]" },
    ],
    intuition:
      "Weave two sublists in place. An odd pointer walks the odd-indexed nodes and an even pointer walks the even-indexed nodes, each skipping forward by two. After the traversal, attach the saved head of the even chain to the tail of the odd chain. No extra nodes are allocated.",
    approach: [
      "Handle the empty list directly.",
      "Set odd = head, even = head.next, and remember evenHead = even.",
      "While even and even.next exist, link odd to even.next then advance odd; link even to odd.next then advance even.",
      "Connect odd.next to evenHead and return head.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Interleave pointers",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def odd_even_list(head: ListNode | None) -> ListNode | None:
    if not head:
        return None
    odd = head
    even = head.next
    even_head = even
    while even and even.next:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    odd.next = even_head
    return head`,
      },
      {
        language: "typescript",
        label: "Interleave pointers",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head) return null;
  let odd = head;
  let even = head.next;
  const evenHead = even;
  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
}`,
      },
    ],
    runner: {
      entry: "oddEvenList",
      comparison: "deep",
      jsStarter: `function oddEvenList(values) {
  // 'values' is the list as an array. Group odd-indexed nodes, then even-indexed.
  // TODO: implement
}`,
      jsReference: `function oddEvenList(values) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  if (!head) return [];
  let odd = head;
  let even = head.next;
  const evenHead = even;
  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  const out = [];
  for (let n = head; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "five nodes", args: [[1, 2, 3, 4, 5]], expected: [1, 3, 5, 2, 4] },
      { name: "seven nodes", args: [[2, 1, 3, 5, 6, 4, 7]], expected: [2, 3, 6, 7, 1, 5, 4] },
      { name: "empty", args: [[]], expected: [] },
      { name: "single", args: [[1]], expected: [1] },
      { name: "two nodes", args: [[1, 2]], expected: [1, 2] },
    ],
    relatedIds: [86, 725, 206],
  },
  {
    id: 61,
    slug: "rotate-list",
    title: "Rotate List",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Pointers", "Cyclic List"],
    companies: ["amazon", "microsoft", "apple", "bloomberg"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/rotate-list/",
    description:
      "Rotate a linked list to the right by `k` places, where `k` may exceed the list length. The playground uses array form for the list.",
    examples: [
      { input: "head = [1,2,3,4,5], k = 2", output: "[4,5,1,2,3]" },
      { input: "head = [0,1,2], k = 4", output: "[2,0,1]", explanation: "k mod 3 = 1, so rotate right by one." },
    ],
    intuition:
      "Rotating right by k is equivalent to choosing a new head that sits k positions from the end. Measure the length, close the list into a ring, then break it at the right spot. Reducing k modulo the length avoids redundant full rotations.",
    approach: [
      "Handle empty, single-node, or k = 0 lists by returning as-is.",
      "Find the length and the tail, then connect the tail to the head to form a cycle.",
      "Reduce k modulo length; the new tail is length - k steps from the head.",
      "Cut after the new tail and return the new head.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Close the ring",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def rotate_right(head: ListNode | None, k: int) -> ListNode | None:
    if not head or not head.next or k == 0:
        return head
    length, tail = 1, head
    while tail.next:
        tail = tail.next
        length += 1
    k %= length
    if k == 0:
        return head
    tail.next = head
    steps = length - k
    new_tail = head
    for _ in range(steps - 1):
        new_tail = new_tail.next
    new_head = new_tail.next
    new_tail.next = None
    return new_head`,
      },
      {
        language: "typescript",
        label: "Close the ring",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head || !head.next || k === 0) return head;
  let length = 1;
  let tail = head;
  while (tail.next) {
    tail = tail.next;
    length++;
  }
  k %= length;
  if (k === 0) return head;
  tail.next = head;
  let newTail = head;
  for (let i = 1; i < length - k; i++) newTail = newTail.next!;
  const newHead = newTail.next;
  newTail.next = null;
  return newHead;
}`,
      },
    ],
    runner: {
      entry: "rotateRight",
      comparison: "deep",
      jsStarter: `function rotateRight(values, k) {
  // 'values' is the list as an array. Rotate right by k and return the array.
  // TODO: implement
}`,
      jsReference: `function rotateRight(values, k) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  if (!head || !head.next || k === 0) {
    const o0 = [];
    for (let n = head; n; n = n.next) o0.push(n.val);
    return o0;
  }
  let length = 1;
  let tail = head;
  while (tail.next) {
    tail = tail.next;
    length++;
  }
  k %= length;
  if (k === 0) {
    const o = [];
    for (let n = head; n; n = n.next) o.push(n.val);
    return o;
  }
  tail.next = head;
  let newTail = head;
  for (let i = 1; i < length - k; i++) newTail = newTail.next;
  const newHead = newTail.next;
  newTail.next = null;
  const out = [];
  for (let n = newHead; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "rotate two", args: [[1, 2, 3, 4, 5], 2], expected: [4, 5, 1, 2, 3] },
      { name: "k exceeds length", args: [[0, 1, 2], 4], expected: [2, 0, 1] },
      { name: "empty", args: [[], 1], expected: [] },
      { name: "single big k", args: [[1], 99], expected: [1] },
      { name: "full rotation", args: [[1, 2], 2], expected: [1, 2] },
    ],
    relatedIds: [189, 92, 25],
  },
  {
    id: 148,
    slug: "sort-list",
    title: "Sort List",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Merge Sort", "Divide and Conquer"],
    companies: ["amazon", "meta", "microsoft", "google", "bytedance"],
    frequency: 62,
    leetcodeUrl: "https://leetcode.com/problems/sort-list/",
    description:
      "Sort a linked list in ascending order. The playground uses array form for the list and expects the sorted array back.",
    examples: [
      { input: "head = [4,2,1,3]", output: "[1,2,3,4]" },
      { input: "head = [-1,5,3,4,0]", output: "[-1,0,3,4,5]" },
    ],
    intuition:
      "Merge sort suits linked lists because splitting and merging only rewire pointers — no random access needed. Use a slow/fast walk to find the midpoint, recursively sort each half, then merge the two sorted halves with a dummy-headed merge. This achieves O(n log n) time with only O(log n) recursion stack.",
    approach: [
      "If the list has zero or one node, it is already sorted.",
      "Split it into halves using slow and fast pointers.",
      "Recursively sort each half.",
      "Merge the two sorted halves into one ordered list.",
    ],
    complexity: { time: "O(n log n)", space: "O(log n)", note: "Recursion stack from the splits." },
    solutions: [
      {
        language: "python",
        label: "Merge sort",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def sort_list(head: ListNode | None) -> ListNode | None:
    if not head or not head.next:
        return head
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    mid = slow.next
    slow.next = None
    left = sort_list(head)
    right = sort_list(mid)
    dummy = tail = ListNode()
    while left and right:
        if left.val <= right.val:
            tail.next = left
            left = left.next
        else:
            tail.next = right
            right = right.next
        tail = tail.next
    tail.next = left or right
    return dummy.next`,
      },
      {
        language: "typescript",
        label: "Merge sort",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  let slow = head;
  let fast: ListNode | null = head.next;
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  const mid = slow.next;
  slow.next = null;
  let left = sortList(head);
  let right = sortList(mid);
  const dummy = new ListNode();
  let tail = dummy;
  while (left && right) {
    if (left.val <= right.val) {
      tail.next = left;
      left = left.next;
    } else {
      tail.next = right;
      right = right.next;
    }
    tail = tail.next;
  }
  tail.next = left ?? right;
  return dummy.next;
}`,
      },
    ],
    runner: {
      entry: "sortList",
      comparison: "deep",
      jsStarter: `function sortList(values) {
  // 'values' is the list as an array. Return the values sorted ascending.
  // TODO: implement
}`,
      jsReference: `function sortList(values) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  function merge(a, b) {
    const dummy = { val: 0, next: null };
    let tail = dummy;
    while (a && b) {
      if (a.val <= b.val) {
        tail.next = a;
        a = a.next;
      } else {
        tail.next = b;
        b = b.next;
      }
      tail = tail.next;
    }
    tail.next = a || b;
    return dummy.next;
  }
  function msort(node) {
    if (!node || !node.next) return node;
    let slow = node;
    let fast = node.next;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    const mid = slow.next;
    slow.next = null;
    return merge(msort(node), msort(mid));
  }
  head = msort(head);
  const out = [];
  for (let n = head; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "unsorted", args: [[4, 2, 1, 3]], expected: [1, 2, 3, 4] },
      { name: "with negatives", args: [[-1, 5, 3, 4, 0]], expected: [-1, 0, 3, 4, 5] },
      { name: "empty", args: [[]], expected: [] },
      { name: "single", args: [[1]], expected: [1] },
      { name: "duplicates", args: [[3, 3, 1, 2, 2]], expected: [1, 2, 2, 3, 3] },
    ],
    relatedIds: [21, 23, 147],
  },
  {
    id: 1290,
    slug: "convert-binary-number-in-a-linked-list-to-integer",
    title: "Convert Binary Number in a Linked List to Integer",
    difficulty: "Easy",
    category: "linked-list",
    patterns: ["Bit Manipulation", "Traversal"],
    companies: ["amazon", "microsoft", "adobe"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/",
    description:
      "Each node holds a single binary digit (0 or 1), with the most significant bit at the head. Return the decimal value the list represents. The playground uses array form for the list.",
    examples: [
      { input: "head = [1,0,1]", output: "5", explanation: "Binary 101 equals 5." },
      { input: "head = [1,1,1,1]", output: "15" },
    ],
    intuition:
      "Read the bits from most significant to least, exactly as the list is ordered. Maintain a running accumulator: for each node, double the current value (shift left) and add the node's bit. After visiting every node the accumulator holds the decimal result.",
    approach: [
      "Start with result = 0.",
      "For each node, set result = result * 2 + node.val.",
      "Return result after the final node.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Horner accumulation",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def get_decimal_value(head: ListNode | None) -> int:
    num = 0
    node = head
    while node:
        num = num * 2 + node.val
        node = node.next
    return num`,
      },
      {
        language: "typescript",
        label: "Horner accumulation",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function getDecimalValue(head: ListNode | null): number {
  let num = 0;
  for (let node = head; node; node = node.next) {
    num = num * 2 + node.val;
  }
  return num;
}`,
      },
    ],
    runner: {
      entry: "getDecimalValue",
      comparison: "deep",
      jsStarter: `function getDecimalValue(values) {
  // 'values' is the list of bits as an array (MSB first). Return the decimal value.
  // TODO: implement
}`,
      jsReference: `function getDecimalValue(values) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  let num = 0;
  for (let node = head; node; node = node.next) {
    num = num * 2 + node.val;
  }
  return num;
}`,
    },
    tests: [
      { name: "five", args: [[1, 0, 1]], expected: 5 },
      { name: "all ones", args: [[1, 1, 1, 1]], expected: 15 },
      { name: "zero", args: [[0]], expected: 0 },
      { name: "six", args: [[1, 1, 0]], expected: 6 },
      { name: "ten", args: [[1, 0, 1, 0]], expected: 10 },
    ],
    relatedIds: [2, 1342, 67],
  },
];

export default batchF;
