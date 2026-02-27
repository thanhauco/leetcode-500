import type { Problem } from "../types.ts";

/**
 * Batch J — twenty stack, binary-search, and linked-list problems. Stack covers
 * monotonic-stack rectangles, expression evaluation, and greedy digit removal;
 * binary-search covers "search on the answer" predicates; linked-list problems
 * use array (or array + pos) I/O and build real nodes inside the runner. Every
 * record ships working Python + TypeScript and a hand-verified playground runner.
 */
export const batchJ: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Stack
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 225,
    slug: "implement-stack-using-queues",
    title: "Implement Stack using Queues",
    difficulty: "Easy",
    category: "stack",
    patterns: ["Stack", "Queue", "Design"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/implement-stack-using-queues/",
    description:
      "Build a last-in-first-out stack that only uses standard queue operations (push to back, pop from front, peek front, size) internally. Support push, pop, top, and empty. The playground replays an operation list and grades the returned results (`null` for void calls).",
    examples: [
      {
        input: 'ops = ["MyStack","push","push","top","pop","empty"], args = [[],[1],[2],[],[],[]]',
        output: "[null,null,null,2,2,false]",
      },
    ],
    intuition:
      "A queue removes from the front, but a stack needs the most recently added element first. After each push, rotate the queue: dequeue and re-enqueue every earlier element so the new value bubbles to the front. Then pop and top are just the queue's normal front operations.",
    approach: [
      "Keep one queue. On push(x), enqueue x, then move each of the previously present elements from front to back.",
      "After rotation the newest element sits at the front, matching LIFO order.",
      "pop dequeues the front; top peeks the front; empty checks the size.",
    ],
    complexity: { time: "O(n) push, O(1) others", space: "O(n)", note: "Each push rotates the whole queue once." },
    solutions: [
      {
        language: "python",
        label: "Single queue",
        code: `from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x: int) -> None:
        self.q.append(x)
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())

    def pop(self) -> int:
        return self.q.popleft()

    def top(self) -> int:
        return self.q[0]

    def empty(self) -> bool:
        return len(self.q) == 0`,
      },
      {
        language: "typescript",
        label: "Single queue",
        code: `class MyStack {
  private q: number[] = [];

  push(x: number): void {
    this.q.push(x);
    for (let i = 0; i < this.q.length - 1; i++) this.q.push(this.q.shift()!);
  }

  pop(): number {
    return this.q.shift()!;
  }

  top(): number {
    return this.q[0];
  }

  empty(): boolean {
    return this.q.length === 0;
  }
}`,
      },
    ],
    runner: {
      entry: "runStack",
      comparison: "deep",
      jsStarter: `function runStack(ops, args) {
  // Replay the operations on your queue-backed stack and return the results.
  // "MyStack"/"push" return null; "pop"/"top" return numbers; "empty" returns a boolean.
  // TODO: implement
}`,
      jsReference: `function runStack(ops, args) {
  class MyStack {
    constructor() { this.q = []; }
    push(x) { this.q.push(x); for (let i = 0; i < this.q.length - 1; i++) this.q.push(this.q.shift()); }
    pop() { return this.q.shift(); }
    top() { return this.q[0]; }
    empty() { return this.q.length === 0; }
  }
  const out = [];
  let st = null;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i] || [];
    if (op === "MyStack") { st = new MyStack(); out.push(null); }
    else if (op === "push") { st.push(a[0]); out.push(null); }
    else if (op === "pop") out.push(st.pop());
    else if (op === "top") out.push(st.top());
    else if (op === "empty") out.push(st.empty());
  }
  return out;
}`,
    },
    tests: [
      {
        name: "push/top/pop/empty",
        args: [
          ["MyStack", "push", "push", "top", "pop", "empty"],
          [[], [1], [2], [], [], []],
        ],
        expected: [null, null, null, 2, 2, false],
      },
      {
        name: "drain to empty",
        args: [
          ["MyStack", "push", "pop", "empty"],
          [[], [5], [], []],
        ],
        expected: [null, null, 5, true],
      },
      {
        name: "empty at start",
        args: [
          ["MyStack", "empty"],
          [[], []],
        ],
        expected: [null, true],
      },
      {
        name: "three pushes",
        args: [
          ["MyStack", "push", "push", "push", "pop", "top", "pop"],
          [[], [1], [2], [3], [], [], []],
        ],
        expected: [null, null, null, null, 3, 2, 2],
      },
    ],
    relatedIds: [232, 155],
  },
  {
    id: 84,
    slug: "largest-rectangle-in-histogram",
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    category: "stack",
    patterns: ["Monotonic Stack"],
    companies: ["amazon", "google", "microsoft", "bloomberg", "uber"],
    frequency: 66,
    leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    description:
      "Given an array of bar heights forming a histogram where each bar has width 1, return the area of the largest axis-aligned rectangle that fits entirely under the bars.",
    examples: [
      { input: "heights = [2,1,5,6,2,3]", output: "10", explanation: "Bars 5 and 6 form a 2-wide, 5-tall rectangle." },
      { input: "heights = [2,4]", output: "4" },
    ],
    intuition:
      "For each bar, the widest rectangle of that exact height extends left and right until it meets a shorter bar. A stack of increasing-height indices lets you finalize a bar's rectangle the moment a shorter bar appears: the popped bar's width spans from just after the new stack top up to the current index.",
    approach: [
      "Iterate with an index that runs one past the end using a sentinel height of 0.",
      "Maintain a stack of indices whose heights are non-decreasing.",
      "When the current height is smaller than the stack top, pop it and compute area = height * width, where width is the gap between the current index and the new top (or the whole prefix if the stack empties).",
      "Track the running maximum area.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each index is pushed and popped at most once." },
    solutions: [
      {
        language: "python",
        label: "Monotonic stack",
        code: `def largest_rectangle_area(heights: list[int]) -> int:
    stack: list[int] = []
    max_area = 0
    n = len(heights)
    for i in range(n + 1):
        h = 0 if i == n else heights[i]
        while stack and heights[stack[-1]] >= h:
            top = stack.pop()
            height = heights[top]
            width = i - stack[-1] - 1 if stack else i
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area`,
      },
      {
        language: "typescript",
        label: "Monotonic stack",
        code: `function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  let maxArea = 0;
  const n = heights.length;
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] >= h) {
      const top = stack.pop()!;
      const height = heights[top];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}`,
      },
    ],
    runner: {
      entry: "largestRectangleArea",
      comparison: "deep",
      jsStarter: `function largestRectangleArea(heights) {
  // Return the area of the largest rectangle that fits under the histogram.
  // TODO: implement
}`,
      jsReference: `function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  const n = heights.length;
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] >= h) {
      const top = stack.pop();
      const height = heights[top];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}`,
    },
    tests: [
      { name: "classic", args: [[2, 1, 5, 6, 2, 3]], expected: 10 },
      { name: "two bars", args: [[2, 4]], expected: 4 },
      { name: "single", args: [[1]], expected: 1 },
      { name: "valley", args: [[2, 1, 2]], expected: 3 },
      { name: "zero", args: [[0]], expected: 0 },
    ],
    relatedIds: [85, 42],
  },
  {
    id: 735,
    slug: "asteroid-collision",
    title: "Asteroid Collision",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Stack", "Simulation"],
    companies: ["amazon", "google", "uber", "tesla"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/asteroid-collision/",
    description:
      "Each integer is an asteroid: its magnitude is the size and its sign is the direction (positive moves right, negative moves left). When a right-mover meets a left-mover they collide and the smaller one explodes; equal sizes destroy both. Return the asteroids that survive.",
    examples: [
      { input: "asteroids = [5,10,-5]", output: "[5,10]", explanation: "The 10 destroys the -5." },
      { input: "asteroids = [8,-8]", output: "[]", explanation: "Equal sizes annihilate each other." },
    ],
    intuition:
      "Only a positive asteroid currently on top of the stack can collide with an incoming negative one. Resolve each new negative against the stack top repeatedly: it keeps destroying smaller positives until it meets an equal one (both die), a larger one (it dies), or empties the stack (it survives).",
    approach: [
      "Process asteroids left to right with a stack of survivors.",
      "For a negative asteroid, while the top is a positive smaller than its magnitude, pop the top.",
      "If the top equals its magnitude, pop the top and discard the incoming one too.",
      "If a larger positive top remains, the incoming asteroid is destroyed; otherwise push it.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each asteroid is pushed and popped at most once." },
    solutions: [
      {
        language: "python",
        label: "Stack",
        code: `def asteroid_collision(asteroids: list[int]) -> list[int]:
    stack: list[int] = []
    for a in asteroids:
        alive = True
        while alive and a < 0 and stack and stack[-1] > 0:
            top = stack[-1]
            if top < -a:
                stack.pop()
            elif top == -a:
                stack.pop()
                alive = False
            else:
                alive = False
        if alive:
            stack.append(a)
    return stack`,
      },
      {
        language: "typescript",
        label: "Stack",
        code: `function asteroidCollision(asteroids: number[]): number[] {
  const stack: number[] = [];
  for (const a of asteroids) {
    let alive = true;
    while (alive && a < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -a) stack.pop();
      else if (top === -a) { stack.pop(); alive = false; }
      else alive = false;
    }
    if (alive) stack.push(a);
  }
  return stack;
}`,
      },
    ],
    runner: {
      entry: "asteroidCollision",
      comparison: "deep",
      jsStarter: `function asteroidCollision(asteroids) {
  // Return the asteroids that survive all collisions.
  // TODO: implement
}`,
      jsReference: `function asteroidCollision(asteroids) {
  const stack = [];
  for (const a of asteroids) {
    let alive = true;
    while (alive && a < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -a) stack.pop();
      else if (top === -a) { stack.pop(); alive = false; }
      else alive = false;
    }
    if (alive) stack.push(a);
  }
  return stack;
}`,
    },
    tests: [
      { name: "small explodes", args: [[5, 10, -5]], expected: [5, 10] },
      { name: "mutual destruction", args: [[8, -8]], expected: [] },
      { name: "chain", args: [[10, 2, -5]], expected: [10] },
      { name: "no collision", args: [[-2, -1, 1, 2]], expected: [-2, -1, 1, 2] },
      { name: "many lefts", args: [[1, -2, -2, -2]], expected: [-2, -2, -2] },
    ],
    relatedIds: [682, 71],
  },
  {
    id: 227,
    slug: "basic-calculator-ii",
    title: "Basic Calculator II",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Stack", "String Parsing"],
    companies: ["amazon", "google", "microsoft", "bloomberg", "uber"],
    frequency: 63,
    leetcodeUrl: "https://leetcode.com/problems/basic-calculator-ii/",
    description:
      "Evaluate a string arithmetic expression containing non-negative integers and the operators +, -, *, and / (with normal precedence and no parentheses). Division truncates toward zero. Return the integer result.",
    examples: [
      { input: 's = "3+2*2"', output: "7" },
      { input: 's = " 3/2 "', output: "1" },
    ],
    intuition:
      "Defer addition and subtraction by pushing signed numbers onto a stack, but apply multiplication and division immediately against the previous number. The pending operator tells you how to fold each freshly parsed number; summing the stack at the end yields the answer with correct precedence.",
    approach: [
      "Scan the string, building each multi-digit number as you go.",
      "Track the operator that precedes the current number (start with '+').",
      "When you hit a new operator or the end: for '+'/'-' push the (signed) number; for '*'/'/' pop, combine with the number, and push the result.",
      "Return the sum of the stack.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Stack holds at most one entry per additive term." },
    solutions: [
      {
        language: "python",
        label: "Operator stack",
        code: `def calculate(s: str) -> int:
    stack: list[int] = []
    num = 0
    op = "+"
    for i, c in enumerate(s):
        if c.isdigit():
            num = num * 10 + int(c)
        if (not c.isdigit() and c != " ") or i == len(s) - 1:
            if op == "+":
                stack.append(num)
            elif op == "-":
                stack.append(-num)
            elif op == "*":
                stack.append(stack.pop() * num)
            else:
                prev = stack.pop()
                stack.append(int(prev / num))
            op = c
            num = 0
    return sum(stack)`,
      },
      {
        language: "typescript",
        label: "Operator stack",
        code: `function calculate(s: string): number {
  const stack: number[] = [];
  let num = 0;
  let op = "+";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c >= "0" && c <= "9") num = num * 10 + (c.charCodeAt(0) - 48);
    if ((c !== " " && (c < "0" || c > "9")) || i === s.length - 1) {
      if (op === "+") stack.push(num);
      else if (op === "-") stack.push(-num);
      else if (op === "*") stack.push(stack.pop()! * num);
      else stack.push(Math.trunc(stack.pop()! / num));
      op = c;
      num = 0;
    }
  }
  return stack.reduce((a, b) => a + b, 0);
}`,
      },
    ],
    runner: {
      entry: "calculate",
      comparison: "deep",
      jsStarter: `function calculate(s) {
  // Evaluate the +, -, *, / expression (no parentheses), division truncates toward zero.
  // TODO: implement
}`,
      jsReference: `function calculate(s) {
  const stack = [];
  let num = 0;
  let op = "+";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c >= "0" && c <= "9") num = num * 10 + (c.charCodeAt(0) - 48);
    if ((c !== " " && (c < "0" || c > "9")) || i === s.length - 1) {
      if (op === "+") stack.push(num);
      else if (op === "-") stack.push(-num);
      else if (op === "*") stack.push(stack.pop() * num);
      else stack.push(Math.trunc(stack.pop() / num));
      op = c;
      num = 0;
    }
  }
  return stack.reduce((a, b) => a + b, 0);
}`,
    },
    tests: [
      { name: "precedence", args: ["3+2*2"], expected: 7 },
      { name: "division floors", args: ["14-3/2"], expected: 13 },
      { name: "spaces", args: [" 3+5 / 2 "], expected: 5 },
      { name: "mixed", args: ["1*2-3/4"], expected: 2 },
      { name: "single", args: ["0"], expected: 0 },
    ],
    relatedIds: [224, 772, 150],
  },
  {
    id: 402,
    slug: "remove-k-digits",
    title: "Remove K Digits",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Monotonic Stack", "Greedy"],
    companies: ["amazon", "google", "snowflake", "bloomberg"],
    frequency: 57,
    leetcodeUrl: "https://leetcode.com/problems/remove-k-digits/",
    description:
      "Given a non-negative integer represented as the string `num`, remove exactly `k` digits so the remaining digits form the smallest possible number. Return that number as a string with no leading zeros (return \"0\" if nothing remains).",
    examples: [
      { input: 'num = "1432219", k = 3', output: '"1219"' },
      { input: 'num = "10200", k = 1', output: '"200"' },
    ],
    intuition:
      "A digit should be deleted when a smaller digit follows it, because removing the larger leading digit shrinks the number most. Keep a stack of kept digits that stays non-decreasing: pop a larger top whenever a smaller digit arrives and you still have removals left. Any leftover removals trim from the end.",
    approach: [
      "Iterate over the digits maintaining a stack.",
      "While k > 0 and the stack top is greater than the current digit, pop and decrement k.",
      "Push the current digit.",
      "If k remains, remove that many digits from the end; strip leading zeros and default to \"0\".",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each digit is pushed and popped at most once." },
    solutions: [
      {
        language: "python",
        label: "Monotonic stack",
        code: `def remove_k_digits(num: str, k: int) -> str:
    stack: list[str] = []
    for d in num:
        while k > 0 and stack and stack[-1] > d:
            stack.pop()
            k -= 1
        stack.append(d)
    if k > 0:
        stack = stack[:-k]
    res = "".join(stack).lstrip("0")
    return res or "0"`,
      },
      {
        language: "typescript",
        label: "Monotonic stack",
        code: `function removeKdigits(num: string, k: number): string {
  const stack: string[] = [];
  for (const d of num) {
    while (k > 0 && stack.length && stack[stack.length - 1] > d) {
      stack.pop();
      k--;
    }
    stack.push(d);
  }
  while (k > 0) {
    stack.pop();
    k--;
  }
  const res = stack.join("").replace(/^0+/, "");
  return res === "" ? "0" : res;
}`,
      },
    ],
    runner: {
      entry: "removeKdigits",
      comparison: "deep",
      jsStarter: `function removeKdigits(num, k) {
  // Remove exactly k digits to form the smallest number; return it as a string.
  // TODO: implement
}`,
      jsReference: `function removeKdigits(num, k) {
  const stack = [];
  for (const d of num) {
    while (k > 0 && stack.length && stack[stack.length - 1] > d) {
      stack.pop();
      k--;
    }
    stack.push(d);
  }
  while (k > 0) {
    stack.pop();
    k--;
  }
  const res = stack.join("").replace(/^0+/, "");
  return res === "" ? "0" : res;
}`,
    },
    tests: [
      { name: "classic", args: ["1432219", 3], expected: "1219" },
      { name: "leading zeros", args: ["10200", 1], expected: "200" },
      { name: "remove all", args: ["10", 2], expected: "0" },
      { name: "trim end", args: ["112", 1], expected: "11" },
      { name: "increasing", args: ["1234", 1], expected: "123" },
    ],
    relatedIds: [316, 321, 1081],
  },
  {
    id: 316,
    slug: "remove-duplicate-letters",
    title: "Remove Duplicate Letters",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Monotonic Stack", "Greedy"],
    companies: ["amazon", "google", "bloomberg", "uber"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/remove-duplicate-letters/",
    description:
      "Given a string, delete duplicate letters so each one appears exactly once, while choosing the lexicographically smallest result among all such selections. Return the resulting string.",
    examples: [
      { input: 's = "bcabc"', output: '"abc"' },
      { input: 's = "cbacdcbc"', output: '"acdb"' },
    ],
    intuition:
      "Greedily build a result that stays as small as possible. Track each letter's last occurrence. When a new letter arrives, pop any larger letter from the stack as long as that letter appears again later (so we can re-add it). Skip letters already in the result to keep each unique.",
    approach: [
      "Record the last index of every character.",
      "Scan left to right; skip a character already on the stack.",
      "While the top is greater than the current character and the top occurs again later, pop it (and mark it absent).",
      "Push the current character and mark it present; join the stack at the end.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Stack and bookkeeping hold at most 26 letters." },
    solutions: [
      {
        language: "python",
        label: "Greedy stack",
        code: `def remove_duplicate_letters(s: str) -> str:
    last = {c: i for i, c in enumerate(s)}
    stack: list[str] = []
    seen: set[str] = set()
    for i, c in enumerate(s):
        if c in seen:
            continue
        while stack and stack[-1] > c and last[stack[-1]] > i:
            seen.discard(stack.pop())
        stack.append(c)
        seen.add(c)
    return "".join(stack)`,
      },
      {
        language: "typescript",
        label: "Greedy stack",
        code: `function removeDuplicateLetters(s: string): string {
  const last: Record<string, number> = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const stack: string[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (seen.has(c)) continue;
    while (stack.length && stack[stack.length - 1] > c && last[stack[stack.length - 1]] > i) {
      seen.delete(stack.pop()!);
    }
    stack.push(c);
    seen.add(c);
  }
  return stack.join("");
}`,
      },
    ],
    runner: {
      entry: "removeDuplicateLetters",
      comparison: "deep",
      jsStarter: `function removeDuplicateLetters(s) {
  // Keep each letter once and return the lexicographically smallest result.
  // TODO: implement
}`,
      jsReference: `function removeDuplicateLetters(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const stack = [];
  const seen = new Set();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (seen.has(c)) continue;
    while (stack.length && stack[stack.length - 1] > c && last[stack[stack.length - 1]] > i) {
      seen.delete(stack.pop());
    }
    stack.push(c);
    seen.add(c);
  }
  return stack.join("");
}`,
    },
    tests: [
      { name: "basic", args: ["bcabc"], expected: "abc" },
      { name: "interleaved", args: ["cbacdcbc"], expected: "acdb" },
      { name: "already unique", args: ["abc"], expected: "abc" },
      { name: "order forced", args: ["bbcaac"], expected: "bac" },
      { name: "single", args: ["a"], expected: "a" },
    ],
    relatedIds: [402, 1081],
  },
  {
    id: 224,
    slug: "basic-calculator",
    title: "Basic Calculator",
    difficulty: "Hard",
    category: "stack",
    patterns: ["Stack", "String Parsing"],
    companies: ["amazon", "google", "microsoft", "meta", "bloomberg"],
    frequency: 62,
    leetcodeUrl: "https://leetcode.com/problems/basic-calculator/",
    description:
      "Evaluate a string expression containing non-negative integers, the binary operators + and -, and parentheses for grouping. Return the integer result. (Multiplication and division are not present.)",
    examples: [
      { input: 's = "1 + 1"', output: "2" },
      { input: 's = "(1+(4+5+2)-3)+(6+8)"', output: "23" },
    ],
    intuition:
      "Sweep left to right keeping a running result and the current sign. A '(' starts a fresh sub-expression, so push the result and sign accumulated so far and reset; a ')' folds the finished sub-expression back by multiplying with the saved sign and adding the saved result.",
    approach: [
      "Maintain result, the current sign (+1/-1), and a number accumulator.",
      "On a digit, extend the number; on + or -, fold the number into result and set the new sign.",
      "On '(', push result then sign, and reset both for the inner expression.",
      "On ')', fold the pending number, multiply by the popped sign, and add the popped outer result.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Stack depth equals the nesting of parentheses." },
    solutions: [
      {
        language: "python",
        label: "Sign stack",
        code: `def calculate(s: str) -> int:
    result = 0
    sign = 1
    num = 0
    stack: list[int] = []
    for c in s:
        if c.isdigit():
            num = num * 10 + int(c)
        elif c == "+":
            result += sign * num
            num, sign = 0, 1
        elif c == "-":
            result += sign * num
            num, sign = 0, -1
        elif c == "(":
            stack.append(result)
            stack.append(sign)
            result, sign = 0, 1
        elif c == ")":
            result += sign * num
            num = 0
            result *= stack.pop()
            result += stack.pop()
    return result + sign * num`,
      },
      {
        language: "typescript",
        label: "Sign stack",
        code: `function calculate(s: string): number {
  let result = 0;
  let sign = 1;
  let num = 0;
  const stack: number[] = [];
  for (const c of s) {
    if (c >= "0" && c <= "9") {
      num = num * 10 + (c.charCodeAt(0) - 48);
    } else if (c === "+") {
      result += sign * num;
      num = 0;
      sign = 1;
    } else if (c === "-") {
      result += sign * num;
      num = 0;
      sign = -1;
    } else if (c === "(") {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (c === ")") {
      result += sign * num;
      num = 0;
      result *= stack.pop()!;
      result += stack.pop()!;
    }
  }
  return result + sign * num;
}`,
      },
    ],
    runner: {
      entry: "calculateBasic",
      comparison: "deep",
      jsStarter: `function calculateBasic(s) {
  // Evaluate the +, -, and parentheses expression. Return an integer.
  // TODO: implement
}`,
      jsReference: `function calculateBasic(s) {
  let result = 0;
  let sign = 1;
  let num = 0;
  const stack = [];
  for (const c of s) {
    if (c >= "0" && c <= "9") {
      num = num * 10 + (c.charCodeAt(0) - 48);
    } else if (c === "+") {
      result += sign * num;
      num = 0;
      sign = 1;
    } else if (c === "-") {
      result += sign * num;
      num = 0;
      sign = -1;
    } else if (c === "(") {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (c === ")") {
      result += sign * num;
      num = 0;
      result *= stack.pop();
      result += stack.pop();
    }
  }
  return result + sign * num;
}`,
    },
    tests: [
      { name: "simple add", args: ["1 + 1"], expected: 2 },
      { name: "mixed", args: [" 2-1 + 2 "], expected: 3 },
      { name: "nested", args: ["(1+(4+5+2)-3)+(6+8)"], expected: 23 },
      { name: "single number", args: ["10"], expected: 10 },
    ],
    relatedIds: [227, 772, 150],
  },
  {
    id: 32,
    slug: "longest-valid-parentheses",
    title: "Longest Valid Parentheses",
    difficulty: "Hard",
    category: "stack",
    patterns: ["Stack", "Dynamic Programming"],
    companies: ["amazon", "google", "microsoft", "adobe"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/longest-valid-parentheses/",
    description:
      "Given a string of only '(' and ')', find the length of the longest contiguous substring that is a well-formed (properly matched) sequence of parentheses.",
    examples: [
      { input: 's = "(()"', output: "2", explanation: "The trailing \"()\" is valid." },
      { input: 's = ")()())"', output: "4", explanation: "The substring \"()()\" is the longest valid run." },
    ],
    intuition:
      "Push indices of unmatched characters and keep a base index that marks the last position that can never be part of a valid run. Each ')' pops its match; the distance from the current index back to the new stack top is the length of the valid stretch ending here.",
    approach: [
      "Initialize a stack holding the sentinel index -1.",
      "On '(' push the index.",
      "On ')' pop; if the stack becomes empty push this index as the new base, otherwise update the best length with current index minus the new top.",
      "Return the largest length seen.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Single pass with an index stack." },
    solutions: [
      {
        language: "python",
        label: "Index stack",
        code: `def longest_valid_parentheses(s: str) -> int:
    max_len = 0
    stack: list[int] = [-1]
    for i, c in enumerate(s):
        if c == "(":
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)
            else:
                max_len = max(max_len, i - stack[-1])
    return max_len`,
      },
      {
        language: "typescript",
        label: "Index stack",
        code: `function longestValidParentheses(s: string): number {
  let maxLen = 0;
  const stack: number[] = [-1];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) stack.push(i);
      else maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
    }
  }
  return maxLen;
}`,
      },
    ],
    runner: {
      entry: "longestValidParentheses",
      comparison: "deep",
      jsStarter: `function longestValidParentheses(s) {
  // Return the length of the longest valid parentheses substring.
  // TODO: implement
}`,
      jsReference: `function longestValidParentheses(s) {
  let maxLen = 0;
  const stack = [-1];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) stack.push(i);
      else maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
    }
  }
  return maxLen;
}`,
    },
    tests: [
      { name: "trailing pair", args: ["(()"], expected: 2 },
      { name: "leading junk", args: [")()())"], expected: 4 },
      { name: "empty", args: [""], expected: 0 },
      { name: "broken middle", args: ["()(()"], expected: 2 },
      { name: "full nest", args: ["()(())"], expected: 6 },
    ],
    relatedIds: [20, 22, 921],
  },
  {
    id: 856,
    slug: "score-of-parentheses",
    title: "Score of Parentheses",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Stack"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/score-of-parentheses/",
    description:
      "A balanced parentheses string is scored by the rules: \"()\" is worth 1, two adjacent balanced strings AB score A+B, and a wrapped string (A) scores 2*A. Given such a string, return its total score.",
    examples: [
      { input: 's = "()"', output: "1" },
      { input: 's = "(()(()))"', output: "6" },
    ],
    intuition:
      "Use a stack where each entry holds the accumulated score at the current depth. An opening bracket pushes a fresh 0; a closing bracket pops the inner score `v` and folds `max(2*v, 1)` into the level above — the `1` handles a bare \"()\" and the doubling handles a wrapped group.",
    approach: [
      "Push 0 as the base accumulator.",
      "On '(' push a new 0.",
      "On ')' pop the inner value v and add max(2*v, 1) to the new top.",
      "The single remaining base value is the answer.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Stack depth equals the nesting depth." },
    solutions: [
      {
        language: "python",
        label: "Depth stack",
        code: `def score_of_parentheses(s: str) -> int:
    stack: list[int] = [0]
    for c in s:
        if c == "(":
            stack.append(0)
        else:
            v = stack.pop()
            stack[-1] += max(2 * v, 1)
    return stack[0]`,
      },
      {
        language: "typescript",
        label: "Depth stack",
        code: `function scoreOfParentheses(s: string): number {
  const stack: number[] = [0];
  for (const c of s) {
    if (c === "(") {
      stack.push(0);
    } else {
      const v = stack.pop()!;
      stack[stack.length - 1] += Math.max(2 * v, 1);
    }
  }
  return stack[0];
}`,
      },
    ],
    runner: {
      entry: "scoreOfParentheses",
      comparison: "deep",
      jsStarter: `function scoreOfParentheses(s) {
  // Score the balanced parentheses string per the rules and return the total.
  // TODO: implement
}`,
      jsReference: `function scoreOfParentheses(s) {
  const stack = [0];
  for (const c of s) {
    if (c === "(") {
      stack.push(0);
    } else {
      const v = stack.pop();
      stack[stack.length - 1] += Math.max(2 * v, 1);
    }
  }
  return stack[0];
}`,
    },
    tests: [
      { name: "unit", args: ["()"], expected: 1 },
      { name: "wrapped", args: ["(())"], expected: 2 },
      { name: "adjacent", args: ["()()"], expected: 2 },
      { name: "complex", args: ["(()(()))"], expected: 6 },
      { name: "deep nest", args: ["((()))"], expected: 4 },
    ],
    relatedIds: [394, 1190],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Binary Search
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 154,
    slug: "find-minimum-in-rotated-sorted-array-ii",
    title: "Find Minimum in Rotated Sorted Array II",
    difficulty: "Hard",
    category: "binary-search",
    patterns: ["Binary Search"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/",
    description:
      "An ascending array that may contain duplicates has been rotated some number of times. Return the minimum element using better-than-linear search where possible.",
    examples: [
      { input: "nums = [1,3,5]", output: "1" },
      { input: "nums = [2,2,2,0,1]", output: "0" },
    ],
    intuition:
      "Compare the middle element to the right end. If it is larger, the rotation pivot lies to the right; if smaller, the minimum is at mid or to its left. When they are equal you cannot tell which side holds the minimum, so safely shrink the window by dropping the right end by one.",
    approach: [
      "Keep a window [lo, hi]; loop while lo < hi.",
      "If nums[mid] > nums[hi], the minimum is right of mid: lo = mid + 1.",
      "If nums[mid] < nums[hi], the minimum is at mid or left: hi = mid.",
      "If equal, decrement hi to discard the ambiguous duplicate.",
    ],
    complexity: { time: "O(log n) avg, O(n) worst", space: "O(1)", note: "Duplicates can force a linear scan." },
    solutions: [
      {
        language: "python",
        label: "Binary search",
        code: `def find_min(nums: list[int]) -> int:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        elif nums[mid] < nums[hi]:
            hi = mid
        else:
            hi -= 1
    return nums[lo]`,
      },
      {
        language: "typescript",
        label: "Binary search",
        code: `function findMin(nums: number[]): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else if (nums[mid] < nums[hi]) hi = mid;
    else hi--;
  }
  return nums[lo];
}`,
      },
    ],
    runner: {
      entry: "findMin",
      comparison: "deep",
      jsStarter: `function findMin(nums) {
  // Return the minimum of the rotated (possibly duplicated) sorted array.
  // TODO: implement
}`,
      jsReference: `function findMin(nums) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else if (nums[mid] < nums[hi]) hi = mid;
    else hi--;
  }
  return nums[lo];
}`,
    },
    tests: [
      { name: "no rotation", args: [[1, 3, 5]], expected: 1 },
      { name: "duplicates", args: [[2, 2, 2, 0, 1]], expected: 0 },
      { name: "rotated with dup", args: [[4, 5, 6, 7, 0, 1, 4]], expected: 0 },
      { name: "ambiguous", args: [[3, 3, 1, 3]], expected: 1 },
      { name: "single", args: [[1]], expected: 1 },
    ],
    relatedIds: [153, 33],
  },
  {
    id: 1482,
    slug: "minimum-number-of-days-to-make-m-bouquets",
    title: "Minimum Number of Days to Make m Bouquets",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search on Answer", "Greedy"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
    description:
      "Flower `i` blooms on day `bloomDay[i]`. A bouquet needs `k` adjacent bloomed flowers, and you want `m` bouquets total. Return the earliest day on which you can assemble all of them, or -1 if it is impossible.",
    examples: [
      { input: "bloomDay = [1,10,3,10,2], m = 3, k = 1", output: "3" },
      { input: "bloomDay = [1,10,3,10,2], m = 3, k = 2", output: "-1", explanation: "Need 6 flowers but only 5 exist." },
    ],
    intuition:
      "If you can make the bouquets by day D, you can also make them by any later day, so the feasibility is monotonic in D. Binary search the day; for a candidate day, greedily scan the flowers counting runs of bloomed neighbors to see whether m bouquets of k are achievable.",
    approach: [
      "If m*k exceeds the flower count, return -1.",
      "Binary search D between the smallest and largest bloom day.",
      "Feasibility check: walk the array, growing a run of flowers with bloomDay <= D; every time the run reaches k, count a bouquet and reset the run.",
      "Shrink toward the smallest feasible day.",
    ],
    complexity: { time: "O(n log(maxDay))", space: "O(1)", note: "Each feasibility check is linear." },
    solutions: [
      {
        language: "python",
        label: "Binary search on answer",
        code: `def min_days(bloom_day: list[int], m: int, k: int) -> int:
    n = len(bloom_day)
    if m * k > n:
        return -1

    def can_make(day: int) -> bool:
        bouquets = flowers = 0
        for b in bloom_day:
            if b <= day:
                flowers += 1
                if flowers == k:
                    bouquets += 1
                    flowers = 0
            else:
                flowers = 0
        return bouquets >= m

    lo, hi = min(bloom_day), max(bloom_day)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_make(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo`,
      },
      {
        language: "typescript",
        label: "Binary search on answer",
        code: `function minDays(bloomDay: number[], m: number, k: number): number {
  const n = bloomDay.length;
  if (m * k > n) return -1;
  const canMake = (day: number): boolean => {
    let bouquets = 0;
    let flowers = 0;
    for (const b of bloomDay) {
      if (b <= day) {
        flowers++;
        if (flowers === k) {
          bouquets++;
          flowers = 0;
        }
      } else {
        flowers = 0;
      }
    }
    return bouquets >= m;
  };
  let lo = Math.min(...bloomDay);
  let hi = Math.max(...bloomDay);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (canMake(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
    ],
    runner: {
      entry: "minDays",
      comparison: "deep",
      jsStarter: `function minDays(bloomDay, m, k) {
  // Return the earliest day to make m bouquets of k adjacent flowers, or -1.
  // TODO: implement
}`,
      jsReference: `function minDays(bloomDay, m, k) {
  const n = bloomDay.length;
  if (m * k > n) return -1;
  const canMake = (day) => {
    let bouquets = 0;
    let flowers = 0;
    for (const b of bloomDay) {
      if (b <= day) {
        flowers++;
        if (flowers === k) {
          bouquets++;
          flowers = 0;
        }
      } else {
        flowers = 0;
      }
    }
    return bouquets >= m;
  };
  let lo = Math.min(...bloomDay);
  let hi = Math.max(...bloomDay);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (canMake(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
    },
    tests: [
      { name: "single flowers", args: [[1, 10, 3, 10, 2], 3, 1], expected: 3 },
      { name: "impossible", args: [[1, 10, 3, 10, 2], 3, 2], expected: -1 },
      { name: "adjacency matters", args: [[7, 7, 7, 7, 12, 7, 7], 2, 3], expected: 12 },
      { name: "all same day", args: [[1, 1, 1, 1, 1], 5, 1], expected: 1 },
      { name: "descending", args: [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 5, 1], expected: 5 },
    ],
    relatedIds: [875, 1011, 1283],
  },
  {
    id: 1283,
    slug: "find-the-smallest-divisor-given-a-threshold",
    title: "Find the Smallest Divisor Given a Threshold",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search on Answer"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
    description:
      "Choose a positive integer divisor and divide every element of `nums` by it, rounding each quotient up to the nearest integer. Return the smallest divisor whose total of rounded quotients does not exceed `threshold`.",
    examples: [
      { input: "nums = [1,2,5,9], threshold = 6", output: "5" },
      { input: "nums = [44,22,33,11,1], threshold = 5", output: "44" },
    ],
    intuition:
      "A larger divisor only shrinks each rounded quotient, so the summed quotient decreases monotonically as the divisor grows. Binary search the divisor: for a candidate, add up the ceiling divisions and check it against the threshold, then drive toward the smallest divisor that still fits.",
    approach: [
      "Search the divisor in the range [1, max(nums)].",
      "For a candidate divisor d, compute the sum of ceil(x / d) over all x.",
      "If the sum is within the threshold, try a smaller divisor (hi = mid); otherwise go larger (lo = mid + 1).",
      "Return the converged lo.",
    ],
    complexity: { time: "O(n log(maxNum))", space: "O(1)", note: "Each candidate sums n ceilings." },
    solutions: [
      {
        language: "python",
        label: "Binary search on answer",
        code: `import math

def smallest_divisor(nums: list[int], threshold: int) -> int:
    lo, hi = 1, max(nums)

    def total(d: int) -> int:
        return sum(math.ceil(x / d) for x in nums)

    while lo < hi:
        mid = (lo + hi) // 2
        if total(mid) <= threshold:
            hi = mid
        else:
            lo = mid + 1
    return lo`,
      },
      {
        language: "typescript",
        label: "Binary search on answer",
        code: `function smallestDivisor(nums: number[], threshold: number): number {
  let lo = 1;
  let hi = Math.max(...nums);
  const total = (d: number): number => nums.reduce((acc, x) => acc + Math.ceil(x / d), 0);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (total(mid) <= threshold) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
    ],
    runner: {
      entry: "smallestDivisor",
      comparison: "deep",
      jsStarter: `function smallestDivisor(nums, threshold) {
  // Return the smallest divisor so the sum of ceil(x / d) stays within threshold.
  // TODO: implement
}`,
      jsReference: `function smallestDivisor(nums, threshold) {
  let lo = 1;
  let hi = Math.max(...nums);
  const total = (d) => nums.reduce((acc, x) => acc + Math.ceil(x / d), 0);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (total(mid) <= threshold) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
    },
    tests: [
      { name: "classic", args: [[1, 2, 5, 9], 6], expected: 5 },
      { name: "tight threshold", args: [[44, 22, 33, 11, 1], 5], expected: 44 },
      { name: "primes", args: [[2, 3, 5, 7, 11], 11], expected: 3 },
      { name: "all ones", args: [[1, 1, 1, 1], 4], expected: 1 },
      { name: "single big", args: [[19], 5], expected: 4 },
    ],
    relatedIds: [875, 1011, 1482],
  },
  {
    id: 2300,
    slug: "successful-pairs-of-spells-and-potions",
    title: "Successful Pairs of Spells and Potions",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search", "Sorting"],
    companies: ["amazon", "google", "microsoft", "adobe"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/successful-pairs-of-spells-and-potions/",
    description:
      "Each spell has a strength and each potion has a strength. A spell-potion pair is successful when the product of their strengths is at least `success`. For every spell, return how many potions form a successful pair with it.",
    examples: [
      { input: "spells = [5,1,3], potions = [1,2,3,4,5], success = 7", output: "[4,0,3]" },
      { input: "spells = [3,1,2], potions = [8,5,8], success = 16", output: "[2,0,2]" },
    ],
    intuition:
      "Sort the potions once. For a spell of strength s, a potion p succeeds when p >= success / s, and because the potions are sorted, the qualifying ones form a contiguous suffix. Binary search the first potion that reaches the threshold; every potion from there on counts.",
    approach: [
      "Sort the potions ascending.",
      "For each spell s, binary search the leftmost index where s * potion >= success.",
      "The count of successful potions is the array length minus that index.",
      "Collect one count per spell.",
    ],
    complexity: { time: "O((n + m) log m)", space: "O(m)", note: "Sort once, then log-search per spell." },
    solutions: [
      {
        language: "python",
        label: "Sort + binary search",
        code: `def successful_pairs(spells: list[int], potions: list[int], success: int) -> list[int]:
    potions = sorted(potions)
    m = len(potions)
    res: list[int] = []
    for sp in spells:
        lo, hi = 0, m
        while lo < hi:
            mid = (lo + hi) // 2
            if sp * potions[mid] >= success:
                hi = mid
            else:
                lo = mid + 1
        res.append(m - lo)
    return res`,
      },
      {
        language: "typescript",
        label: "Sort + binary search",
        code: `function successfulPairs(spells: number[], potions: number[], success: number): number[] {
  const sorted = potions.slice().sort((a, b) => a - b);
  const m = sorted.length;
  const res: number[] = [];
  for (const sp of spells) {
    let lo = 0;
    let hi = m;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (sp * sorted[mid] >= success) hi = mid;
      else lo = mid + 1;
    }
    res.push(m - lo);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "successfulPairs",
      comparison: "deep",
      jsStarter: `function successfulPairs(spells, potions, success) {
  // Return, for each spell, the number of potions whose product reaches success.
  // TODO: implement
}`,
      jsReference: `function successfulPairs(spells, potions, success) {
  const sorted = potions.slice().sort((a, b) => a - b);
  const m = sorted.length;
  const res = [];
  for (const sp of spells) {
    let lo = 0;
    let hi = m;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (sp * sorted[mid] >= success) hi = mid;
      else lo = mid + 1;
    }
    res.push(m - lo);
  }
  return res;
}`,
    },
    tests: [
      { name: "classic", args: [[5, 1, 3], [1, 2, 3, 4, 5], 7], expected: [4, 0, 3] },
      { name: "duplicates", args: [[3, 1, 2], [8, 5, 8], 16], expected: [2, 0, 2] },
      { name: "minimal", args: [[1], [1], 1], expected: [1] },
      { name: "all pass", args: [[2, 2], [5, 5], 10], expected: [2, 2] },
      { name: "none pass", args: [[1], [1, 2, 3], 5], expected: [0] },
    ],
    relatedIds: [875, 1283],
  },
  {
    id: 441,
    slug: "arranging-coins",
    title: "Arranging Coins",
    difficulty: "Easy",
    category: "binary-search",
    patterns: ["Binary Search", "Math"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 45,
    leetcodeUrl: "https://leetcode.com/problems/arranging-coins/",
    description:
      "You have `n` coins and arrange them in a staircase where row i contains exactly i coins. Return the number of complete rows you can build (the last partially filled row does not count).",
    examples: [
      { input: "n = 5", output: "2", explanation: "Rows of 1 and 2 use 3 coins; the third row would need 3 but only 2 remain." },
      { input: "n = 8", output: "3" },
    ],
    intuition:
      "Completing k rows needs k*(k+1)/2 coins, a value that strictly increases with k. So the largest k whose triangular number does not exceed n is exactly the answer, and you can binary search that threshold instead of adding rows one by one.",
    approach: [
      "Binary search k in [0, n].",
      "For a candidate k, compare the triangular number k*(k+1)/2 against n.",
      "If it fits, move the lower bound up; otherwise move the upper bound down.",
      "Return the largest feasible k.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "Closed-form triangular check each step." },
    solutions: [
      {
        language: "python",
        label: "Binary search",
        code: `def arrange_coins(n: int) -> int:
    lo, hi = 0, n
    while lo < hi:
        mid = lo + (hi - lo + 1) // 2
        if mid * (mid + 1) // 2 <= n:
            lo = mid
        else:
            hi = mid - 1
    return lo`,
      },
      {
        language: "typescript",
        label: "Binary search",
        code: `function arrangeCoins(n: number): number {
  let lo = 0;
  let hi = n;
  while (lo < hi) {
    const mid = lo + Math.ceil((hi - lo) / 2);
    if ((mid * (mid + 1)) / 2 <= n) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}`,
      },
    ],
    runner: {
      entry: "arrangeCoins",
      comparison: "deep",
      jsStarter: `function arrangeCoins(n) {
  // Return the number of complete staircase rows you can build with n coins.
  // TODO: implement
}`,
      jsReference: `function arrangeCoins(n) {
  let lo = 0;
  let hi = n;
  while (lo < hi) {
    const mid = lo + Math.ceil((hi - lo) / 2);
    if ((mid * (mid + 1)) / 2 <= n) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}`,
    },
    tests: [
      { name: "five", args: [5], expected: 2 },
      { name: "eight", args: [8], expected: 3 },
      { name: "one", args: [1], expected: 1 },
      { name: "zero", args: [0], expected: 0 },
      { name: "perfect ten", args: [10], expected: 4 },
    ],
    relatedIds: [69, 367],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Linked List
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 23,
    slug: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "linked-list",
    patterns: ["Linked List", "Divide and Conquer", "Heap"],
    companies: ["amazon", "google", "meta", "microsoft", "bloomberg", "uber"],
    frequency: 74,
    leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
    description:
      "Merge several individually sorted linked lists into a single sorted linked list and return it. The playground passes the lists as an array of arrays (e.g. `[[1,4,5],[1,3,4]]`) and expects the merged values as an array.",
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
      { input: "lists = []", output: "[]" },
    ],
    intuition:
      "Merging two sorted lists is straightforward with a dummy head. Fold the k lists together by repeatedly merging the running result with the next list; each value flows into place in linear total work across all merges.",
    approach: [
      "Build real linked nodes from each input array.",
      "Merge two sorted lists with a dummy node, always attaching the smaller head.",
      "Accumulate by merging the running result with each subsequent list.",
      "Serialize the merged list back to an array for grading.",
    ],
    complexity: { time: "O(N k)", space: "O(1)", note: "N total nodes; pairwise folding over k lists." },
    solutions: [
      {
        language: "python",
        label: "Pairwise merge",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def merge_k_lists(lists: list[list[int]]) -> list[int]:
    def build(arr: list[int]) -> ListNode | None:
        head = None
        for x in reversed(arr):
            head = ListNode(x, head)
        return head

    def merge_two(a: ListNode | None, b: ListNode | None) -> ListNode | None:
        dummy = ListNode()
        tail = dummy
        while a and b:
            if a.val <= b.val:
                tail.next, a = a, a.next
            else:
                tail.next, b = b, b.next
            tail = tail.next
        tail.next = a or b
        return dummy.next

    merged: ListNode | None = None
    for arr in lists:
        merged = merge_two(merged, build(arr))

    out: list[int] = []
    node = merged
    while node:
        out.append(node.val)
        node = node.next
    return out`,
      },
      {
        language: "typescript",
        label: "Pairwise merge",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeKLists(lists: number[][]): number[] {
  const build = (arr: number[]): ListNode | null => {
    let head: ListNode | null = null;
    for (let i = arr.length - 1; i >= 0; i--) head = new ListNode(arr[i], head);
    return head;
  };
  const mergeTwo = (a: ListNode | null, b: ListNode | null): ListNode | null => {
    const dummy = new ListNode();
    let tail = dummy;
    while (a && b) {
      if (a.val <= b.val) { tail.next = a; a = a.next; }
      else { tail.next = b; b = b.next; }
      tail = tail.next;
    }
    tail.next = a ?? b;
    return dummy.next;
  };
  let merged: ListNode | null = null;
  for (const arr of lists) merged = mergeTwo(merged, build(arr));
  const out: number[] = [];
  for (let n = merged; n; n = n.next) out.push(n.val);
  return out;
}`,
      },
    ],
    runner: {
      entry: "mergeKLists",
      comparison: "deep",
      jsStarter: `function mergeKLists(lists) {
  // 'lists' is an array of sorted arrays, e.g. [[1,4,5],[1,3,4]].
  // Build nodes if you like and return the merged values as an array.
  // TODO: implement
}`,
      jsReference: `function mergeKLists(lists) {
  function build(arr) {
    let head = null;
    for (let i = arr.length - 1; i >= 0; i--) head = { val: arr[i], next: head };
    return head;
  }
  function mergeTwo(a, b) {
    const dummy = { val: 0, next: null };
    let tail = dummy;
    while (a && b) {
      if (a.val <= b.val) { tail.next = a; a = a.next; }
      else { tail.next = b; b = b.next; }
      tail = tail.next;
    }
    tail.next = a || b;
    return dummy.next;
  }
  let merged = null;
  for (const arr of lists) merged = mergeTwo(merged, build(arr));
  const out = [];
  for (let n = merged; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "three lists", args: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
      { name: "empty input", args: [[]], expected: [] },
      { name: "one empty list", args: [[[]]], expected: [] },
      { name: "singletons", args: [[[5], [1], [3]]], expected: [1, 3, 5] },
      { name: "single list", args: [[[1, 2, 3]]], expected: [1, 2, 3] },
    ],
    relatedIds: [21, 148, 88],
  },
  {
    id: 143,
    slug: "reorder-list",
    title: "Reorder List",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Linked List", "Two Pointers", "In-place Reversal"],
    companies: ["amazon", "meta", "microsoft", "bloomberg"],
    frequency: 61,
    leetcodeUrl: "https://leetcode.com/problems/reorder-list/",
    description:
      "Reorder a singly linked list L0→L1→…→Ln so it becomes L0→Ln→L1→Ln-1→L2→…, interleaving from both ends, without changing node values. The playground uses array form for the list and expects the reordered array.",
    examples: [
      { input: "head = [1,2,3,4]", output: "[1,4,2,3]" },
      { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]" },
    ],
    intuition:
      "Split the list at its midpoint, reverse the second half, then zip the two halves together one node at a time. Finding the middle with slow/fast pointers and reversing in place keeps everything linear and constant extra space.",
    approach: [
      "Find the middle with slow and fast pointers.",
      "Reverse the second half of the list in place.",
      "Merge the first half and the reversed second half by alternating nodes.",
      "Serialize the result back to an array.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Pointer rewiring only; no auxiliary list." },
    solutions: [
      {
        language: "python",
        label: "Split, reverse, merge",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def reorder_list(values: list[int]) -> list[int]:
    head = None
    for x in reversed(values):
        head = ListNode(x, head)
    if not head or not head.next:
        out: list[int] = []
        node = head
        while node:
            out.append(node.val)
            node = node.next
        return out

    slow, fast = head, head
    while fast.next and fast.next.next:
        slow, fast = slow.next, fast.next.next

    second = slow.next
    slow.next = None
    prev = None
    while second:
        nxt = second.next
        second.next = prev
        prev = second
        second = nxt

    first, sec = head, prev
    while sec:
        f1, s1 = first.next, sec.next
        first.next = sec
        sec.next = f1
        first, sec = f1, s1

    out = []
    node = head
    while node:
        out.append(node.val)
        node = node.next
    return out`,
      },
      {
        language: "typescript",
        label: "Split, reverse, merge",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reorderList(values: number[]): number[] {
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) head = new ListNode(values[i], head);
  if (!head || !head.next) {
    const single: number[] = [];
    for (let n = head; n; n = n.next) single.push(n.val);
    return single;
  }

  let slow: ListNode = head;
  let fast: ListNode = head;
  while (fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  let second = slow.next;
  slow.next = null;
  let prev: ListNode | null = null;
  while (second) {
    const nxt = second.next;
    second.next = prev;
    prev = second;
    second = nxt;
  }

  let first: ListNode | null = head;
  let sec = prev;
  while (sec) {
    const f1 = first!.next;
    const s1 = sec.next;
    first!.next = sec;
    sec.next = f1;
    first = f1;
    sec = s1;
  }

  const out: number[] = [];
  for (let n: ListNode | null = head; n; n = n.next) out.push(n.val);
  return out;
}`,
      },
    ],
    runner: {
      entry: "reorderList",
      comparison: "deep",
      jsStarter: `function reorderList(values) {
  // 'values' is the list as an array. Return the reordered array L0,Ln,L1,Ln-1,...
  // TODO: implement
}`,
      jsReference: `function reorderList(values) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  if (!head || !head.next) {
    const single = [];
    for (let n = head; n; n = n.next) single.push(n.val);
    return single;
  }
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let second = slow.next;
  slow.next = null;
  let prev = null;
  while (second) {
    const nxt = second.next;
    second.next = prev;
    prev = second;
    second = nxt;
  }
  let first = head, sec = prev;
  while (sec) {
    const f1 = first.next, s1 = sec.next;
    first.next = sec;
    sec.next = f1;
    first = f1;
    sec = s1;
  }
  const out = [];
  for (let n = head; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "even", args: [[1, 2, 3, 4]], expected: [1, 4, 2, 3] },
      { name: "odd", args: [[1, 2, 3, 4, 5]], expected: [1, 5, 2, 4, 3] },
      { name: "single", args: [[1]], expected: [1] },
      { name: "two", args: [[1, 2]], expected: [1, 2] },
      { name: "empty", args: [[]], expected: [] },
    ],
    relatedIds: [206, 234, 92],
  },
  {
    id: 141,
    slug: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    category: "linked-list",
    patterns: ["Linked List", "Fast & Slow Pointers"],
    companies: ["amazon", "microsoft", "meta", "bloomberg"],
    frequency: 72,
    leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
    description:
      "Determine whether a singly linked list contains a cycle. The playground passes the node values plus `pos`, the 0-based index of the node the tail links back to (or -1 for no cycle), and expects a boolean.",
    examples: [
      { input: "values = [3,2,0,-4], pos = 1", output: "true", explanation: "The tail connects back to the node at index 1." },
      { input: "values = [1], pos = -1", output: "false" },
    ],
    intuition:
      "Run a slow pointer one step and a fast pointer two steps at a time. If the list ends, the fast pointer falls off and there is no cycle; if there is a cycle, the fast pointer eventually laps and meets the slow pointer inside the loop.",
    approach: [
      "Build the nodes and, if pos >= 0, link the tail to the node at that index.",
      "Advance slow by one and fast by two each iteration.",
      "If fast (or fast.next) reaches null, return false.",
      "If slow and fast ever reference the same node, return true.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Floyd's two-pointer cycle detection." },
    solutions: [
      {
        language: "python",
        label: "Floyd's cycle detection",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def has_cycle(values: list[int], pos: int) -> bool:
    nodes = [ListNode(v) for v in values]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if pos >= 0 and nodes:
        nodes[-1].next = nodes[pos]
    head = nodes[0] if nodes else None

    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
      },
      {
        language: "typescript",
        label: "Floyd's cycle detection",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function hasCycle(values: number[], pos: number): boolean {
  const nodes = values.map((v) => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  if (pos >= 0 && nodes.length > 0) nodes[nodes.length - 1].next = nodes[pos];
  let slow: ListNode | null = nodes[0] ?? null;
  let fast: ListNode | null = nodes[0] ?? null;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      },
    ],
    runner: {
      entry: "hasCycle",
      comparison: "deep",
      jsStarter: `function hasCycle(values, pos) {
  // Build the list, link the tail to index pos (or none if pos === -1),
  // and return whether a cycle exists.
  // TODO: implement
}`,
      jsReference: `function hasCycle(values, pos) {
  const nodes = values.map((v) => ({ val: v, next: null }));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  if (pos >= 0 && nodes.length > 0) nodes[nodes.length - 1].next = nodes[pos];
  let slow = nodes[0] || null;
  let fast = nodes[0] || null;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    },
    tests: [
      { name: "cycle at 1", args: [[3, 2, 0, -4], 1], expected: true },
      { name: "two-node loop", args: [[1, 2], 0], expected: true },
      { name: "single no cycle", args: [[1], -1], expected: false },
      { name: "empty", args: [[], -1], expected: false },
      { name: "no cycle", args: [[1, 2, 3, 4], -1], expected: false },
    ],
    relatedIds: [142, 202, 287],
  },
  {
    id: 142,
    slug: "linked-list-cycle-ii",
    title: "Linked List Cycle II",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Linked List", "Fast & Slow Pointers"],
    companies: ["amazon", "microsoft", "meta", "uber"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle-ii/",
    description:
      "If a singly linked list contains a cycle, return the 0-based index of the node where the cycle begins; otherwise return -1. The playground passes the node values plus `pos`, the index the tail links back to (or -1 for none).",
    examples: [
      { input: "values = [3,2,0,-4], pos = 1", output: "1" },
      { input: "values = [1,2,3], pos = -1", output: "-1" },
    ],
    intuition:
      "First detect a meeting point with slow/fast pointers. Then exploit the distance identity of Floyd's algorithm: moving one pointer from the head and one from the meeting point, both one step at a time, they collide exactly at the cycle's entrance.",
    approach: [
      "Build the nodes and link the tail to index pos when pos >= 0.",
      "Advance slow by one and fast by two until they meet or fast falls off.",
      "If they meet, walk one pointer from the head and one from the meeting node in lockstep.",
      "Return the index of their meeting node, or -1 if no cycle existed.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Two-phase Floyd's cycle detection." },
    solutions: [
      {
        language: "python",
        label: "Floyd's two-phase",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def detect_cycle(values: list[int], pos: int) -> int:
    nodes = [ListNode(v) for v in values]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if pos >= 0 and nodes:
        nodes[-1].next = nodes[pos]
    head = nodes[0] if nodes else None

    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            ptr = head
            while ptr is not slow:
                ptr = ptr.next
                slow = slow.next
            return nodes.index(ptr)
    return -1`,
      },
      {
        language: "typescript",
        label: "Floyd's two-phase",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function detectCycle(values: number[], pos: number): number {
  const nodes = values.map((v) => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  if (pos >= 0 && nodes.length > 0) nodes[nodes.length - 1].next = nodes[pos];
  const head: ListNode | null = nodes[0] ?? null;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) {
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr!.next;
        slow = slow!.next;
      }
      return nodes.indexOf(ptr!);
    }
  }
  return -1;
}`,
      },
    ],
    runner: {
      entry: "detectCycle",
      comparison: "deep",
      jsStarter: `function detectCycle(values, pos) {
  // Return the 0-based index where the cycle starts, or -1 if there is none.
  // TODO: implement
}`,
      jsReference: `function detectCycle(values, pos) {
  const nodes = values.map((v) => ({ val: v, next: null }));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  if (pos >= 0 && nodes.length > 0) nodes[nodes.length - 1].next = nodes[pos];
  const head = nodes[0] || null;
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return nodes.indexOf(ptr);
    }
  }
  return -1;
}`,
    },
    tests: [
      { name: "entry at 1", args: [[3, 2, 0, -4], 1], expected: 1 },
      { name: "entry at 0", args: [[1, 2], 0], expected: 0 },
      { name: "single no cycle", args: [[1], -1], expected: -1 },
      { name: "no cycle", args: [[1, 2, 3], -1], expected: -1 },
      { name: "entry in middle", args: [[1, 2, 3, 4, 5], 2], expected: 2 },
    ],
    relatedIds: [141, 287, 202],
  },
  {
    id: 876,
    slug: "middle-of-the-linked-list",
    title: "Middle of the Linked List",
    difficulty: "Easy",
    category: "linked-list",
    patterns: ["Linked List", "Fast & Slow Pointers"],
    companies: ["amazon", "microsoft", "google", "apple"],
    frequency: 59,
    leetcodeUrl: "https://leetcode.com/problems/middle-of-the-linked-list/",
    description:
      "Return the value of the middle node of a singly linked list. When the list has an even number of nodes, return the value of the second of the two middle nodes. The playground passes the list as an array.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "3" },
      { input: "head = [1,2,3,4,5,6]", output: "4", explanation: "Of the two middles (3 and 4) the second is chosen." },
    ],
    intuition:
      "Advance a slow pointer one node and a fast pointer two nodes per step. By the time the fast pointer runs off the end, the slow pointer sits at the middle — and for even lengths it naturally lands on the second middle node.",
    approach: [
      "Build the list nodes from the array.",
      "Move slow by one and fast by two until fast or fast.next is null.",
      "Slow now points to the middle node.",
      "Return that node's value.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "One pass with two pointers." },
    solutions: [
      {
        language: "python",
        label: "Fast & slow",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def middle_node(values: list[int]) -> int | None:
    head = None
    for x in reversed(values):
        head = ListNode(x, head)
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow.val if slow else None`,
      },
      {
        language: "typescript",
        label: "Fast & slow",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function middleNode(values: number[]): number | null {
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) head = new ListNode(values[i], head);
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  return slow ? slow.val : null;
}`,
      },
    ],
    runner: {
      entry: "middleNode",
      comparison: "deep",
      jsStarter: `function middleNode(values) {
  // 'values' is the list as an array. Return the value of the middle node
  // (the second middle when the length is even).
  // TODO: implement
}`,
      jsReference: `function middleNode(values) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow ? slow.val : null;
}`,
    },
    tests: [
      { name: "odd length", args: [[1, 2, 3, 4, 5]], expected: 3 },
      { name: "even length", args: [[1, 2, 3, 4, 5, 6]], expected: 4 },
      { name: "single", args: [[1]], expected: 1 },
      { name: "two nodes", args: [[1, 2]], expected: 2 },
      { name: "three nodes", args: [[1, 2, 3]], expected: 2 },
    ],
    relatedIds: [141, 234, 19],
  },
  {
    id: 82,
    slug: "remove-duplicates-from-sorted-list-ii",
    title: "Remove Duplicates from Sorted List II",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Linked List", "Two Pointers"],
    companies: ["amazon", "microsoft", "bloomberg", "adobe"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/",
    description:
      "Given a sorted linked list, delete every node that has a duplicate value, keeping only the values that appear exactly once. Return the resulting list (in array form for the playground).",
    examples: [
      { input: "head = [1,2,3,3,4,4,5]", output: "[1,2,5]" },
      { input: "head = [1,1,1,2,3]", output: "[2,3]" },
    ],
    intuition:
      "Because the list is sorted, equal values are adjacent. Use a dummy head so even the first node can be dropped. When the current node starts a run of duplicates, skip the entire run and link the previous survivor directly past it; otherwise keep advancing.",
    approach: [
      "Build the list and prepend a dummy node before the head.",
      "Track prev (last kept node) and cur (scanner).",
      "If cur and cur.next share a value, skip all nodes of that value and link prev.next past them.",
      "Otherwise move prev forward; advance cur each step. Serialize the survivors.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Single pass over the sorted list." },
    solutions: [
      {
        language: "python",
        label: "Dummy + skip runs",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def delete_duplicates(values: list[int]) -> list[int]:
    head = None
    for x in reversed(values):
        head = ListNode(x, head)
    dummy = ListNode(0, head)
    prev, cur = dummy, head
    while cur:
        if cur.next and cur.next.val == cur.val:
            v = cur.val
            while cur and cur.val == v:
                cur = cur.next
            prev.next = cur
        else:
            prev = cur
            cur = cur.next
    out: list[int] = []
    node = dummy.next
    while node:
        out.append(node.val)
        node = node.next
    return out`,
      },
      {
        language: "typescript",
        label: "Dummy + skip runs",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function deleteDuplicates(values: number[]): number[] {
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) head = new ListNode(values[i], head);
  const dummy = new ListNode(0, head);
  let prev: ListNode = dummy;
  let cur: ListNode | null = head;
  while (cur) {
    if (cur.next && cur.next.val === cur.val) {
      const v = cur.val;
      while (cur && cur.val === v) cur = cur.next;
      prev.next = cur;
    } else {
      prev = cur;
      cur = cur.next;
    }
  }
  const out: number[] = [];
  for (let n = dummy.next; n; n = n.next) out.push(n.val);
  return out;
}`,
      },
    ],
    runner: {
      entry: "deleteDuplicates",
      comparison: "deep",
      jsStarter: `function deleteDuplicates(values) {
  // 'values' is a sorted list as an array. Remove every value that repeats and
  // return the surviving values as an array.
  // TODO: implement
}`,
      jsReference: `function deleteDuplicates(values) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  const dummy = { val: 0, next: head };
  let prev = dummy, cur = head;
  while (cur) {
    if (cur.next && cur.next.val === cur.val) {
      const v = cur.val;
      while (cur && cur.val === v) cur = cur.next;
      prev.next = cur;
    } else {
      prev = cur;
      cur = cur.next;
    }
  }
  const out = [];
  for (let n = dummy.next; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "trailing dups", args: [[1, 2, 3, 3, 4, 4, 5]], expected: [1, 2, 5] },
      { name: "leading dups", args: [[1, 1, 1, 2, 3]], expected: [2, 3] },
      { name: "all duplicate", args: [[1, 1]], expected: [] },
      { name: "empty", args: [[]], expected: [] },
      { name: "all unique", args: [[1, 2, 3]], expected: [1, 2, 3] },
    ],
    relatedIds: [83, 26, 203],
  },
];

export default batchJ;
