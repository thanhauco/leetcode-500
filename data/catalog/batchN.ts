import type { Problem } from "../types.ts";

/**
 * Batch N — twenty stack, interval, greedy, linked-list, trie, and bit
 * problems. Every record ships working Python + TypeScript solutions and a
 * fully wired playground runner whose JavaScript reference passes the
 * hand-verified tests. Design problems replay an operation list; linked-list
 * problems use plain-array I/O so test data stays JSON-friendly.
 */
export const batchN: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Stack
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1209,
    slug: "remove-all-adjacent-duplicates-in-string-ii",
    title: "Remove All Adjacent Duplicates in String II",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Stack", "Run-length Counting"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/",
    description:
      "Repeatedly delete any run of exactly k consecutive equal characters until no such run remains, then return the resulting string. Deletions can expose new runs, so the process continues until the string is stable.",
    examples: [
      { input: 's = "deeedbbcccbdaa", k = 3', output: '"aa"', explanation: "Remove eee, then ccc, then bbb, then ddd, leaving 'aa'." },
      { input: 's = "abcd", k = 2', output: '"abcd"', explanation: "No run reaches length 2." },
    ],
    intuition:
      "Track each character together with how many times it currently repeats. A stack of (char, count) pairs lets you fold each new character into the top entry when it matches, and pop the entry the instant its count hits k. Because removals collapse neighbors automatically, a single left-to-right pass is enough.",
    approach: [
      "Keep a stack of [character, count] pairs.",
      "For each character, if it equals the stack's top character, increment that count; otherwise push a new pair with count 1.",
      "Whenever the top count reaches k, pop it (those characters are deleted).",
      "Rebuild the answer by repeating each surviving character by its stored count.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each character is pushed and popped at most once." },
    solutions: [
      {
        language: "python",
        label: "Stack of counts",
        code: `def remove_duplicates(s: str, k: int) -> str:
    stack: list[list] = []  # [char, count]
    for ch in s:
        if stack and stack[-1][0] == ch:
            stack[-1][1] += 1
            if stack[-1][1] == k:
                stack.pop()
        else:
            stack.append([ch, 1])
    return "".join(ch * count for ch, count in stack)`,
      },
      {
        language: "typescript",
        label: "Stack of counts",
        code: `function removeDuplicates(s: string, k: number): string {
  const stack: [string, number][] = [];
  for (const ch of s) {
    const top = stack[stack.length - 1];
    if (top && top[0] === ch) {
      top[1] += 1;
      if (top[1] === k) stack.pop();
    } else {
      stack.push([ch, 1]);
    }
  }
  return stack.map(([ch, count]) => ch.repeat(count)).join("");
}`,
      },
    ],
    runner: {
      entry: "removeDuplicates",
      comparison: "deep",
      jsStarter: `function removeDuplicates(s, k) {
  // Delete every run of k equal adjacent characters, repeatedly. Return the result.
  // TODO: implement
}`,
      jsReference: `function removeDuplicates(s, k) {
  const stack = []; // [char, count]
  for (const ch of s) {
    const top = stack[stack.length - 1];
    if (top && top[0] === ch) {
      top[1] += 1;
      if (top[1] === k) stack.pop();
    } else {
      stack.push([ch, 1]);
    }
  }
  return stack.map(([ch, count]) => ch.repeat(count)).join("");
}`,
    },
    tests: [
      { name: "cascading removals", args: ["deeedbbcccbdaa", 3], expected: "aa" },
      { name: "no full run", args: ["abcd", 2], expected: "abcd" },
      { name: "classic k=2", args: ["pbbcggttciiippooaais", 2], expected: "ps" },
      { name: "all removed", args: ["aabbcc", 2], expected: "" },
      { name: "exact run", args: ["aaa", 3], expected: "" },
    ],
    hints: ["Store counts on the stack, not individual characters.", "Pop the moment a count reaches k."],
    relatedIds: [1047, 1003, 20],
  },
  {
    id: 1249,
    slug: "minimum-remove-to-make-valid-parentheses",
    title: "Minimum Remove to Make Valid Parentheses",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Stack", "String"],
    companies: ["meta", "amazon", "google", "bloomberg", "microsoft"],
    frequency: 72,
    leetcodeUrl: "https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/",
    description:
      "Delete the fewest parentheses possible so the remaining string is balanced, keeping all letters in place. Any valid result with the minimum number of deletions is acceptable; this reference removes unmatched closers as it scans and unmatched openers at the end.",
    examples: [
      { input: 's = "a)b(c)d"', output: '"ab(c)d"', explanation: "The leading ')' has no opener, so it is removed." },
      { input: 's = "lee(t(c)o)de)"', output: '"lee(t(c)o)de"', explanation: "The final ')' is unmatched." },
    ],
    intuition:
      "Scan left to right pushing the index of every '(' onto a stack. A ')' that finds a waiting '(' cancels it; a ')' with an empty stack is unmatched and marked for deletion immediately. Whatever '(' indices remain on the stack at the end never found partners, so mark those too. Building the string from the unmarked positions yields a minimal valid result.",
    approach: [
      "Convert the string to a mutable character array.",
      "Walk it: push '(' indices; on ')' pop a waiting '(' or, if none, blank out this ')'.",
      "After the scan, blank out every '(' index still on the stack.",
      "Join the non-blank characters into the answer.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    solutions: [
      {
        language: "python",
        label: "Index stack",
        code: `def min_remove_to_make_valid(s: str) -> str:
    chars = list(s)
    stack: list[int] = []
    for i, ch in enumerate(chars):
        if ch == "(":
            stack.append(i)
        elif ch == ")":
            if stack:
                stack.pop()
            else:
                chars[i] = ""
    for i in stack:
        chars[i] = ""
    return "".join(chars)`,
      },
      {
        language: "typescript",
        label: "Index stack",
        code: `function minRemoveToMakeValid(s: string): string {
  const chars = s.split("");
  const stack: number[] = [];
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === "(") {
      stack.push(i);
    } else if (chars[i] === ")") {
      if (stack.length) stack.pop();
      else chars[i] = "";
    }
  }
  for (const i of stack) chars[i] = "";
  return chars.join("");
}`,
      },
    ],
    runner: {
      entry: "minRemoveToMakeValid",
      comparison: "deep",
      jsStarter: `function minRemoveToMakeValid(s) {
  // Remove the fewest parentheses to balance s. Return the resulting string.
  // TODO: implement
}`,
      jsReference: `function minRemoveToMakeValid(s) {
  const chars = s.split("");
  const stack = [];
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === "(") {
      stack.push(i);
    } else if (chars[i] === ")") {
      if (stack.length) stack.pop();
      else chars[i] = "";
    }
  }
  for (const i of stack) chars[i] = "";
  return chars.join("");
}`,
    },
    tests: [
      { name: "leading closer", args: ["a)b(c)d"], expected: "ab(c)d" },
      { name: "trailing closer", args: ["lee(t(c)o)de)"], expected: "lee(t(c)o)de" },
      { name: "all parens drop", args: ["))(("], expected: "" },
      { name: "extra opener", args: ["(a(b(c)d)"], expected: "a(b(c)d)" },
      { name: "no parens", args: ["abc"], expected: "abc" },
    ],
    hints: ["Track opener indices on a stack.", "Unmatched closers go immediately; leftover openers go at the end."],
    relatedIds: [20, 921, 301],
  },
  {
    id: 921,
    slug: "minimum-add-to-make-parentheses-valid",
    title: "Minimum Add to Make Parentheses Valid",
    difficulty: "Medium",
    category: "stack",
    patterns: ["Greedy", "Counter"],
    companies: ["amazon", "google", "meta", "microsoft"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/",
    description:
      "Return the smallest number of single-parenthesis insertions needed to make the string balanced. Each insertion adds one '(' or one ')' anywhere in the string.",
    examples: [
      { input: 's = "())"', output: "1", explanation: "Add one '(' to balance the extra closer." },
      { input: 's = "((("', output: "3", explanation: "Three closers are missing." },
    ],
    intuition:
      "You never need an explicit stack — just a running balance of currently-open parentheses. Each '(' raises the balance; each ')' lowers it, but if the balance is already zero the ')' is unmatchable and forces one insertion. Whatever balance remains at the end counts the unmatched openers, each needing a closer.",
    approach: [
      "Track open = currently unmatched '(' and adds = forced insertions.",
      "On '(' increment open.",
      "On ')' decrement open if positive, otherwise increment adds (an unmatched closer).",
      "Return adds + open — the leftover openers each still need a closer.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Balance counter",
        code: `def min_add_to_make_valid(s: str) -> int:
    open_count = 0
    adds = 0
    for ch in s:
        if ch == "(":
            open_count += 1
        elif open_count > 0:
            open_count -= 1
        else:
            adds += 1
    return adds + open_count`,
      },
      {
        language: "typescript",
        label: "Balance counter",
        code: `function minAddToMakeValid(s: string): number {
  let open = 0;
  let adds = 0;
  for (const ch of s) {
    if (ch === "(") open += 1;
    else if (open > 0) open -= 1;
    else adds += 1;
  }
  return adds + open;
}`,
      },
    ],
    runner: {
      entry: "minAddToMakeValid",
      comparison: "deep",
      jsStarter: `function minAddToMakeValid(s) {
  // Return the minimum parentheses to insert so s becomes valid.
  // TODO: implement
}`,
      jsReference: `function minAddToMakeValid(s) {
  let open = 0;
  let adds = 0;
  for (const ch of s) {
    if (ch === "(") open += 1;
    else if (open > 0) open -= 1;
    else adds += 1;
  }
  return adds + open;
}`,
    },
    tests: [
      { name: "extra closer", args: ["())"], expected: 1 },
      { name: "all openers", args: ["((("], expected: 3 },
      { name: "balanced", args: ["()"], expected: 0 },
      { name: "mixed", args: ["()))(("], expected: 4 },
      { name: "swapped pair", args: [")("], expected: 2 },
    ],
    hints: ["A counter beats a real stack here.", "Leftover open count is part of the answer."],
    relatedIds: [1249, 20, 1541],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Intervals
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 986,
    slug: "interval-list-intersections",
    title: "Interval List Intersections",
    difficulty: "Medium",
    category: "intervals",
    patterns: ["Two Pointers", "Intervals"],
    companies: ["meta", "amazon", "google", "uber"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/interval-list-intersections/",
    description:
      "Given two lists of pairwise-disjoint, sorted closed intervals, return the list of their intersections in order. Each output interval is the overlap shared by one interval from each input list.",
    examples: [
      {
        input: "first = [[0,2],[5,10],[13,23],[24,25]], second = [[1,5],[8,12],[15,24],[25,26]]",
        output: "[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]",
      },
      { input: "first = [[1,7]], second = [[3,10]]", output: "[[3,7]]" },
    ],
    intuition:
      "Because both lists are already sorted and internally disjoint, a single sweep with two pointers suffices. The overlap of the current pair is [max(starts), min(ends)]; it is real only when that low does not exceed that high. Whichever interval ends first cannot intersect anything later, so advance that pointer.",
    approach: [
      "Keep pointers i and j into the two lists.",
      "Compute lo = max of the two starts and hi = min of the two ends.",
      "If lo <= hi, record [lo, hi].",
      "Advance the pointer whose interval has the smaller end, since it is exhausted.",
    ],
    complexity: { time: "O(m + n)", space: "O(1)", note: "Excluding the output array." },
    solutions: [
      {
        language: "python",
        label: "Two pointers",
        code: `def interval_intersection(first: list[list[int]], second: list[list[int]]) -> list[list[int]]:
    res: list[list[int]] = []
    i = j = 0
    while i < len(first) and j < len(second):
        lo = max(first[i][0], second[j][0])
        hi = min(first[i][1], second[j][1])
        if lo <= hi:
            res.append([lo, hi])
        if first[i][1] < second[j][1]:
            i += 1
        else:
            j += 1
    return res`,
      },
      {
        language: "typescript",
        label: "Two pointers",
        code: `function intervalIntersection(first: number[][], second: number[][]): number[][] {
  const res: number[][] = [];
  let i = 0;
  let j = 0;
  while (i < first.length && j < second.length) {
    const lo = Math.max(first[i][0], second[j][0]);
    const hi = Math.min(first[i][1], second[j][1]);
    if (lo <= hi) res.push([lo, hi]);
    if (first[i][1] < second[j][1]) i += 1;
    else j += 1;
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "intervalIntersection",
      comparison: "deep",
      jsStarter: `function intervalIntersection(first, second) {
  // Return the ordered list of overlaps between the two sorted interval lists.
  // TODO: implement
}`,
      jsReference: `function intervalIntersection(first, second) {
  const res = [];
  let i = 0;
  let j = 0;
  while (i < first.length && j < second.length) {
    const lo = Math.max(first[i][0], second[j][0]);
    const hi = Math.min(first[i][1], second[j][1]);
    if (lo <= hi) res.push([lo, hi]);
    if (first[i][1] < second[j][1]) i += 1;
    else j += 1;
  }
  return res;
}`,
    },
    tests: [
      {
        name: "full example",
        args: [
          [[0, 2], [5, 10], [13, 23], [24, 25]],
          [[1, 5], [8, 12], [15, 24], [25, 26]],
        ],
        expected: [[1, 2], [5, 5], [8, 10], [15, 23], [24, 24], [25, 25]],
      },
      { name: "one each", args: [[[1, 7]], [[3, 10]]], expected: [[3, 7]] },
      { name: "empty second", args: [[[1, 3], [5, 9]], []], expected: [] },
      { name: "no overlap", args: [[[1, 3]], [[4, 6]]], expected: [] },
    ],
    hints: ["Overlap is [max start, min end].", "Drop the interval that ends earliest."],
    relatedIds: [56, 57, 759],
  },
  {
    id: 1288,
    slug: "remove-covered-intervals",
    title: "Remove Covered Intervals",
    difficulty: "Medium",
    category: "intervals",
    patterns: ["Sorting", "Greedy"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/remove-covered-intervals/",
    description:
      "An interval is covered if some other interval contains it entirely. Remove every covered interval and return how many intervals remain.",
    examples: [
      { input: "intervals = [[1,4],[3,6],[2,8]]", output: "2", explanation: "[3,6] is covered by [2,8]." },
      { input: "intervals = [[1,4],[2,3]]", output: "1", explanation: "[2,3] sits inside [1,4]." },
    ],
    intuition:
      "Sort by start ascending and, for ties, by end descending so a covering interval always appears before the ones it swallows. Then sweep tracking the largest end seen: an interval survives only if its end extends beyond that running maximum, otherwise it is fully contained by an earlier one.",
    approach: [
      "Sort intervals by start ascending; break ties by larger end first.",
      "Track prevEnd, the maximum end seen so far, starting at 0.",
      "For each interval, if its end is strictly greater than prevEnd it is not covered — count it and update prevEnd.",
      "Return the survivor count.",
    ],
    complexity: { time: "O(n log n)", space: "O(1)", note: "Dominated by the sort." },
    solutions: [
      {
        language: "python",
        label: "Sort + sweep",
        code: `def remove_covered_intervals(intervals: list[list[int]]) -> int:
    intervals.sort(key=lambda iv: (iv[0], -iv[1]))
    count = 0
    prev_end = 0
    for _, end in intervals:
        if end > prev_end:
            count += 1
            prev_end = end
    return count`,
      },
      {
        language: "typescript",
        label: "Sort + sweep",
        code: `function removeCoveredIntervals(intervals: number[][]): number {
  intervals.sort((a, b) => (a[0] - b[0]) || (b[1] - a[1]));
  let count = 0;
  let prevEnd = 0;
  for (const [, end] of intervals) {
    if (end > prevEnd) {
      count += 1;
      prevEnd = end;
    }
  }
  return count;
}`,
      },
    ],
    runner: {
      entry: "removeCoveredIntervals",
      comparison: "deep",
      jsStarter: `function removeCoveredIntervals(intervals) {
  // Return how many intervals remain after removing every covered interval.
  // TODO: implement
}`,
      jsReference: `function removeCoveredIntervals(intervals) {
  intervals.sort((a, b) => (a[0] - b[0]) || (b[1] - a[1]));
  let count = 0;
  let prevEnd = 0;
  for (const iv of intervals) {
    if (iv[1] > prevEnd) {
      count += 1;
      prevEnd = iv[1];
    }
  }
  return count;
}`,
    },
    tests: [
      { name: "one covered", args: [[[1, 4], [3, 6], [2, 8]]], expected: 2 },
      { name: "inner removed", args: [[[1, 4], [2, 3]]], expected: 1 },
      { name: "partial overlap", args: [[[0, 10], [5, 12]]], expected: 2 },
      { name: "tie on start", args: [[[3, 10], [4, 10], [5, 11]]], expected: 2 },
    ],
    hints: ["Sort by start, then by end descending.", "An interval survives if it extends past the running max end."],
    relatedIds: [56, 57, 986],
  },
  {
    id: 729,
    slug: "my-calendar-i",
    title: "My Calendar I",
    difficulty: "Medium",
    category: "intervals",
    patterns: ["Intervals", "Design"],
    companies: ["google", "amazon", "microsoft"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/my-calendar-i/",
    description:
      "Design a calendar that books half-open events [start, end). A booking succeeds only if it does not overlap any existing event; book returns true and stores it, or returns false and changes nothing. The playground replays an operation list and grades the returned results.",
    examples: [
      {
        input: 'ops = ["MyCalendar","book","book","book"], args = [[],[10,20],[15,25],[20,30]]',
        output: "[null,true,false,true]",
        explanation: "[15,25) overlaps [10,20); [20,30) touches but does not overlap.",
      },
    ],
    intuition:
      "Two half-open intervals [s1,e1) and [s2,e2) overlap exactly when s1 < e2 and s2 < e1. Keep the accepted bookings in a list and test each new request against all of them; touching endpoints (one's end equals the other's start) are allowed because the intervals are half-open.",
    approach: [
      "Store accepted [start, end) intervals in a list.",
      "On book(start, end), scan stored intervals for any with start < storedEnd and storedStart < end.",
      "If an overlap exists, return false without storing.",
      "Otherwise append the interval and return true.",
    ],
    complexity: { time: "O(n) per book", space: "O(n)", note: "n = number of stored events." },
    solutions: [
      {
        language: "python",
        label: "Linear scan",
        code: `class MyCalendar:
    def __init__(self) -> None:
        self.events: list[tuple[int, int]] = []

    def book(self, start: int, end: int) -> bool:
        for s, e in self.events:
            if start < e and s < end:
                return False
        self.events.append((start, end))
        return True`,
      },
      {
        language: "typescript",
        label: "Linear scan",
        code: `class MyCalendar {
  private events: [number, number][] = [];

  book(start: number, end: number): boolean {
    for (const [s, e] of this.events) {
      if (start < e && s < end) return false;
    }
    this.events.push([start, end]);
    return true;
  }
}`,
      },
    ],
    runner: {
      entry: "runCalendar",
      comparison: "deep",
      jsStarter: `function runCalendar(ops, args) {
  // Replay the operations. "MyCalendar" returns null; "book" returns a boolean.
  // TODO: implement the calendar and the driver loop.
}`,
      jsReference: `function runCalendar(ops, args) {
  class MyCalendar {
    constructor() { this.events = []; }
    book(start, end) {
      for (const [s, e] of this.events) {
        if (start < e && s < end) return false;
      }
      this.events.push([start, end]);
      return true;
    }
  }
  const out = [];
  let cal = null;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i] || [];
    if (op === "MyCalendar") { cal = new MyCalendar(); out.push(null); }
    else if (op === "book") out.push(cal.book(a[0], a[1]));
  }
  return out;
}`,
    },
    tests: [
      {
        name: "overlap rejected",
        args: [
          ["MyCalendar", "book", "book", "book"],
          [[], [10, 20], [15, 25], [20, 30]],
        ],
        expected: [null, true, false, true],
      },
      {
        name: "touching allowed",
        args: [
          ["MyCalendar", "book", "book"],
          [[], [5, 10], [10, 15]],
        ],
        expected: [null, true, true],
      },
      {
        name: "contained rejected",
        args: [
          ["MyCalendar", "book", "book"],
          [[], [1, 5], [2, 3]],
        ],
        expected: [null, true, false],
      },
    ],
    hints: ["Half-open intervals overlap when s1 < e2 and s2 < e1.", "Touching endpoints do not conflict."],
    relatedIds: [731, 732, 56],
  },
  {
    id: 452,
    slug: "minimum-number-of-arrows-to-burst-balloons",
    title: "Minimum Number of Arrows to Burst Balloons",
    difficulty: "Medium",
    category: "intervals",
    patterns: ["Greedy", "Sorting"],
    companies: ["amazon", "google", "meta", "uber"],
    frequency: 61,
    leetcodeUrl: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
    description:
      "Each balloon spans a horizontal interval [start, end]. A vertical arrow shot at position x bursts every balloon whose interval contains x. Return the minimum number of arrows that bursts them all.",
    examples: [
      { input: "points = [[10,16],[2,8],[1,6],[7,12]]", output: "2" },
      { input: "points = [[1,2],[3,4],[5,6],[7,8]]", output: "4", explanation: "No two balloons overlap." },
    ],
    intuition:
      "Greedily fire an arrow at the right edge of the earliest-ending balloon, since that position bursts the most overlapping balloons that start no later than it. Sort by end, then whenever a balloon starts after the last arrow's position, you must fire a new arrow at this balloon's end.",
    approach: [
      "Return 0 immediately for an empty input.",
      "Sort balloons by their end coordinate ascending.",
      "Set arrows = 0 and lastShot = -infinity.",
      "For each balloon, if its start is greater than lastShot, fire a new arrow at its end and update lastShot.",
    ],
    complexity: { time: "O(n log n)", space: "O(1)", note: "Sort dominates." },
    solutions: [
      {
        language: "python",
        label: "Greedy by end",
        code: `def find_min_arrow_shots(points: list[list[int]]) -> int:
    if not points:
        return 0
    points.sort(key=lambda p: p[1])
    arrows = 0
    last = float("-inf")
    for start, end in points:
        if start > last:
            arrows += 1
            last = end
    return arrows`,
      },
      {
        language: "typescript",
        label: "Greedy by end",
        code: `function findMinArrowShots(points: number[][]): number {
  if (points.length === 0) return 0;
  points.sort((a, b) => a[1] - b[1]);
  let arrows = 0;
  let last = -Infinity;
  for (const [start, end] of points) {
    if (start > last) {
      arrows += 1;
      last = end;
    }
  }
  return arrows;
}`,
      },
    ],
    runner: {
      entry: "findMinArrowShots",
      comparison: "deep",
      jsStarter: `function findMinArrowShots(points) {
  // Return the minimum arrows needed to burst every balloon interval.
  // TODO: implement
}`,
      jsReference: `function findMinArrowShots(points) {
  if (points.length === 0) return 0;
  points.sort((a, b) => a[1] - b[1]);
  let arrows = 0;
  let last = -Infinity;
  for (const [start, end] of points) {
    if (start > last) {
      arrows += 1;
      last = end;
    }
  }
  return arrows;
}`,
    },
    tests: [
      { name: "two clusters", args: [[[10, 16], [2, 8], [1, 6], [7, 12]]], expected: 2 },
      { name: "all disjoint", args: [[[1, 2], [3, 4], [5, 6], [7, 8]]], expected: 4 },
      { name: "chained touches", args: [[[1, 2], [2, 3], [3, 4], [4, 5]]], expected: 2 },
      { name: "empty", args: [[]], expected: 0 },
      { name: "single", args: [[[1, 2]]], expected: 1 },
    ],
    hints: ["Sort by end and shoot at the earliest end.", "A balloon needs a new arrow only when it starts past the last shot."],
    relatedIds: [435, 56, 253],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Greedy
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 122,
    slug: "best-time-to-buy-and-sell-stock-ii",
    title: "Best Time to Buy and Sell Stock II",
    difficulty: "Medium",
    category: "greedy",
    patterns: ["Greedy"],
    companies: ["amazon", "google", "meta", "apple", "bloomberg"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
    description:
      "You may buy and sell a stock as many times as you like, but you must sell before buying again. Given daily prices, return the maximum total profit achievable.",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "7", explanation: "Buy at 1 sell at 5 (+4), buy at 3 sell at 6 (+3)." },
      { input: "prices = [1,2,3,4,5]", output: "4", explanation: "One buy at 1 and sell at 5." },
    ],
    intuition:
      "Capturing every upward step is optimal because the profit of a long hold equals the sum of the consecutive daily gains along the way. So simply add each positive difference between adjacent days; downward moves are skipped, which is the same as not holding through a loss.",
    approach: [
      "Initialize profit = 0.",
      "For each adjacent pair, if today's price exceeds yesterday's, add the difference.",
      "Ignore non-positive differences.",
      "Return the accumulated profit.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Sum positive deltas",
        code: `def max_profit(prices: list[int]) -> int:
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]
    return profit`,
      },
      {
        language: "typescript",
        label: "Sum positive deltas",
        code: `function maxProfit(prices: number[]): number {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
  }
  return profit;
}`,
      },
    ],
    runner: {
      entry: "maxProfit",
      comparison: "deep",
      jsStarter: `function maxProfit(prices) {
  // Return the maximum profit from unlimited buy/sell transactions.
  // TODO: implement
}`,
      jsReference: `function maxProfit(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
  }
  return profit;
}`,
    },
    tests: [
      { name: "mixed", args: [[7, 1, 5, 3, 6, 4]], expected: 7 },
      { name: "monotone up", args: [[1, 2, 3, 4, 5]], expected: 4 },
      { name: "monotone down", args: [[7, 6, 4, 3, 1]], expected: 0 },
      { name: "single day", args: [[1]], expected: 0 },
    ],
    hints: ["Add every positive daily gain.", "A long hold equals the sum of its daily steps."],
    relatedIds: [121, 123, 714],
  },
  {
    id: 605,
    slug: "can-place-flowers",
    title: "Can Place Flowers",
    difficulty: "Easy",
    category: "greedy",
    patterns: ["Greedy", "Array"],
    companies: ["amazon", "microsoft", "linkedin"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/can-place-flowers/",
    description:
      "A flowerbed is a row of plots where 1 means planted and 0 means empty, and no two flowers may be adjacent. Decide whether n new flowers can be planted without breaking the no-adjacent rule.",
    examples: [
      { input: "flowerbed = [1,0,0,0,1], n = 1", output: "true", explanation: "Plant in the middle empty plot." },
      { input: "flowerbed = [1,0,0,0,1], n = 2", output: "false", explanation: "Only one plot can be safely planted." },
    ],
    intuition:
      "Scan left to right and plant greedily in any empty plot whose neighbors are both empty (treating off-the-edge as empty). Planting at the earliest legal spot never blocks a better future placement, so a single greedy pass that mutates the bed and counts plantings answers the question.",
    approach: [
      "Walk each index i of the flowerbed.",
      "If plot i is empty and both the left and right neighbors are empty (or out of bounds), plant there and decrement n.",
      "Stop early once n reaches 0.",
      "Return whether n is now 0 or below.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Operates in place on the bed." },
    solutions: [
      {
        language: "python",
        label: "Greedy scan",
        code: `def can_place_flowers(flowerbed: list[int], n: int) -> bool:
    bed = flowerbed[:]
    for i in range(len(bed)):
        if n <= 0:
            break
        if bed[i] == 0:
            left = i == 0 or bed[i - 1] == 0
            right = i == len(bed) - 1 or bed[i + 1] == 0
            if left and right:
                bed[i] = 1
                n -= 1
    return n <= 0`,
      },
      {
        language: "typescript",
        label: "Greedy scan",
        code: `function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  const bed = [...flowerbed];
  for (let i = 0; i < bed.length; i++) {
    if (n <= 0) break;
    if (bed[i] === 0) {
      const left = i === 0 || bed[i - 1] === 0;
      const right = i === bed.length - 1 || bed[i + 1] === 0;
      if (left && right) {
        bed[i] = 1;
        n -= 1;
      }
    }
  }
  return n <= 0;
}`,
      },
    ],
    runner: {
      entry: "canPlaceFlowers",
      comparison: "deep",
      jsStarter: `function canPlaceFlowers(flowerbed, n) {
  // Return whether n flowers fit without two being adjacent.
  // TODO: implement
}`,
      jsReference: `function canPlaceFlowers(flowerbed, n) {
  const bed = [...flowerbed];
  for (let i = 0; i < bed.length; i++) {
    if (n <= 0) break;
    if (bed[i] === 0) {
      const left = i === 0 || bed[i - 1] === 0;
      const right = i === bed.length - 1 || bed[i + 1] === 0;
      if (left && right) {
        bed[i] = 1;
        n -= 1;
      }
    }
  }
  return n <= 0;
}`,
    },
    tests: [
      { name: "one fits", args: [[1, 0, 0, 0, 1], 1], expected: true },
      { name: "two do not", args: [[1, 0, 0, 0, 1], 2], expected: false },
      { name: "wide open", args: [[0, 0, 0], 2], expected: true },
      { name: "zero needed", args: [[1, 0, 0, 0, 1], 0], expected: true },
    ],
    hints: ["Treat out-of-bounds as empty plots.", "Plant at the earliest legal spot."],
    relatedIds: [55, 45, 121],
  },
  {
    id: 455,
    slug: "assign-cookies",
    title: "Assign Cookies",
    difficulty: "Easy",
    category: "greedy",
    patterns: ["Greedy", "Two Pointers", "Sorting"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 45,
    leetcodeUrl: "https://leetcode.com/problems/assign-cookies/",
    description:
      "Each child has a greed factor (the minimum cookie size that satisfies them) and each cookie has a size. A cookie satisfies a child if its size is at least the child's greed. Return the maximum number of children you can satisfy, giving each child at most one cookie.",
    examples: [
      { input: "g = [1,2,3], s = [1,1]", output: "1", explanation: "Two size-1 cookies satisfy only the child with greed 1." },
      { input: "g = [1,2], s = [1,2,3]", output: "2", explanation: "Both children can be satisfied." },
    ],
    intuition:
      "Sort both children and cookies ascending, then feed the smallest sufficient cookie to the least greedy unsatisfied child. Spending a small cookie on an easy child preserves larger cookies for greedier children, so a two-pointer sweep is optimal.",
    approach: [
      "Sort greed factors g and cookie sizes s ascending.",
      "Use a pointer into each list.",
      "If the current cookie satisfies the current child, advance both pointers and count a satisfied child.",
      "Otherwise advance only the cookie pointer; stop when either list is exhausted.",
    ],
    complexity: { time: "O(n log n + m log m)", space: "O(1)", note: "Beyond the sorts." },
    solutions: [
      {
        language: "python",
        label: "Two pointers",
        code: `def find_content_children(g: list[int], s: list[int]) -> int:
    g.sort()
    s.sort()
    child = cookie = 0
    while child < len(g) and cookie < len(s):
        if s[cookie] >= g[child]:
            child += 1
        cookie += 1
    return child`,
      },
      {
        language: "typescript",
        label: "Two pointers",
        code: `function findContentChildren(g: number[], s: number[]): number {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let child = 0;
  let cookie = 0;
  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) child += 1;
    cookie += 1;
  }
  return child;
}`,
      },
    ],
    runner: {
      entry: "findContentChildren",
      comparison: "deep",
      jsStarter: `function findContentChildren(g, s) {
  // Return the maximum number of children that can be satisfied.
  // TODO: implement
}`,
      jsReference: `function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let child = 0;
  let cookie = 0;
  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) child += 1;
    cookie += 1;
  }
  return child;
}`,
    },
    tests: [
      { name: "small cookies", args: [[1, 2, 3], [1, 1]], expected: 1 },
      { name: "enough cookies", args: [[1, 2], [1, 2, 3]], expected: 2 },
      { name: "exact fits", args: [[10, 9, 8, 7], [5, 6, 7, 8]], expected: 2 },
      { name: "no cookies", args: [[1], []], expected: 0 },
    ],
    hints: ["Sort both and match greedily.", "Give the smallest sufficient cookie to the least greedy child."],
    relatedIds: [135, 122, 561],
  },
  {
    id: 846,
    slug: "hand-of-straights",
    title: "Hand of Straights",
    difficulty: "Medium",
    category: "greedy",
    patterns: ["Greedy", "Hash Map"],
    companies: ["google", "amazon", "microsoft"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/hand-of-straights/",
    description:
      "Given a hand of integer-valued cards, decide whether they can be partitioned into groups, each of size groupSize and each consisting of groupSize consecutive integers. Return true if such a partition exists.",
    examples: [
      { input: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3", output: "true", explanation: "[1,2,3], [2,3,4], [6,7,8]." },
      { input: "hand = [1,2,3,4,5], groupSize = 4", output: "false", explanation: "Five cards cannot split into groups of four." },
    ],
    intuition:
      "If the count is not divisible by groupSize it is hopeless. Otherwise, the smallest remaining card must begin a run, so greedily start a consecutive group at each smallest available value and consume one of each of the next groupSize values; if any required value is missing, no valid partition exists.",
    approach: [
      "If hand length is not a multiple of groupSize, return false.",
      "Count occurrences of each card and iterate keys in ascending order.",
      "For a key whose count is still positive, c, remove c copies of each value from key to key + groupSize - 1.",
      "If any needed value lacks enough copies, return false; if the sweep finishes, return true.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)", note: "Sorting the distinct keys dominates." },
    solutions: [
      {
        language: "python",
        label: "Greedy from smallest",
        code: `from collections import Counter

def is_n_straight_hand(hand: list[int], group_size: int) -> bool:
    if len(hand) % group_size != 0:
        return False
    count = Counter(hand)
    for key in sorted(count):
        c = count[key]
        if c > 0:
            for v in range(key, key + group_size):
                if count[v] < c:
                    return False
                count[v] -= c
    return True`,
      },
      {
        language: "typescript",
        label: "Greedy from smallest",
        code: `function isNStraightHand(hand: number[], groupSize: number): boolean {
  if (hand.length % groupSize !== 0) return false;
  const count = new Map<number, number>();
  for (const card of hand) count.set(card, (count.get(card) ?? 0) + 1);
  const keys = [...count.keys()].sort((a, b) => a - b);
  for (const key of keys) {
    const c = count.get(key)!;
    if (c > 0) {
      for (let v = key; v < key + groupSize; v++) {
        const cur = count.get(v) ?? 0;
        if (cur < c) return false;
        count.set(v, cur - c);
      }
    }
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "isNStraightHand",
      comparison: "deep",
      jsStarter: `function isNStraightHand(hand, groupSize) {
  // Return whether the hand splits into consecutive groups of groupSize.
  // TODO: implement
}`,
      jsReference: `function isNStraightHand(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;
  const count = new Map();
  for (const card of hand) count.set(card, (count.get(card) ?? 0) + 1);
  const keys = [...count.keys()].sort((a, b) => a - b);
  for (const key of keys) {
    const c = count.get(key);
    if (c > 0) {
      for (let v = key; v < key + groupSize; v++) {
        const cur = count.get(v) ?? 0;
        if (cur < c) return false;
        count.set(v, cur - c);
      }
    }
  }
  return true;
}`,
    },
    tests: [
      { name: "three groups", args: [[1, 2, 3, 6, 2, 3, 4, 7, 8], 3], expected: true },
      { name: "indivisible", args: [[1, 2, 3, 4, 5], 4], expected: false },
      { name: "two equal runs", args: [[1, 1, 2, 2, 3, 3], 3], expected: true },
      { name: "non consecutive", args: [[8, 10, 12], 3], expected: false },
      { name: "pairs", args: [[1, 2, 3, 4], 2], expected: true },
    ],
    hints: ["Always start a group at the smallest remaining card.", "Decrement counts for the whole run."],
    relatedIds: [1296, 659, 1338],
  },
  {
    id: 1005,
    slug: "maximize-sum-of-array-after-k-negations",
    title: "Maximize Sum Of Array After K Negations",
    difficulty: "Easy",
    category: "greedy",
    patterns: ["Greedy", "Sorting"],
    companies: ["amazon", "microsoft"],
    frequency: 41,
    leetcodeUrl: "https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/",
    description:
      "You must perform exactly k negations, each flipping the sign of one array element (the same element may be chosen more than once). Return the largest possible sum of the array afterward.",
    examples: [
      { input: "nums = [4,2,3], k = 1", output: "5", explanation: "Flip the 2 to get [4,-2,3] → sum 5." },
      { input: "nums = [3,-1,0,2], k = 3", output: "6", explanation: "Flip -1 once, then waste the rest on 0." },
    ],
    intuition:
      "Negatives hurt the sum most, so sort ascending and flip the most-negative values first while flips remain. If any flips are still left after all negatives are gone, they come in pairs that cancel — except a lone leftover flip, which is best spent on the smallest absolute value to lose the least.",
    approach: [
      "Sort nums ascending.",
      "Flip each leading negative to positive while k remains and the value is negative.",
      "Sum the array.",
      "If k is still odd, subtract twice the minimum element (the cheapest single extra flip).",
    ],
    complexity: { time: "O(n log n)", space: "O(1)", note: "Beyond the sort." },
    solutions: [
      {
        language: "python",
        label: "Sort + flip",
        code: `def largest_sum_after_k_negations(nums: list[int], k: int) -> int:
    nums = sorted(nums)
    i = 0
    while i < len(nums) and k > 0 and nums[i] < 0:
        nums[i] = -nums[i]
        k -= 1
        i += 1
    total = sum(nums)
    if k % 2 == 1:
        total -= 2 * min(nums)
    return total`,
      },
      {
        language: "typescript",
        label: "Sort + flip",
        code: `function largestSumAfterKNegations(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length && k > 0 && nums[i] < 0; i++) {
    nums[i] = -nums[i];
    k -= 1;
  }
  let total = nums.reduce((acc, x) => acc + x, 0);
  if (k % 2 === 1) total -= 2 * Math.min(...nums);
  return total;
}`,
      },
    ],
    runner: {
      entry: "largestSumAfterKNegations",
      comparison: "deep",
      jsStarter: `function largestSumAfterKNegations(nums, k) {
  // Perform exactly k sign flips to maximize the array sum.
  // TODO: implement
}`,
      jsReference: `function largestSumAfterKNegations(nums, k) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length && k > 0 && nums[i] < 0; i++) {
    nums[i] = -nums[i];
    k -= 1;
  }
  let total = nums.reduce((acc, x) => acc + x, 0);
  if (k % 2 === 1) total -= 2 * Math.min(...nums);
  return total;
}`,
    },
    tests: [
      { name: "flip positive", args: [[4, 2, 3], 1], expected: 5 },
      { name: "waste on zero", args: [[3, -1, 0, 2], 3], expected: 6 },
      { name: "all negatives clear", args: [[2, -3, -1, 5, -4], 2], expected: 13 },
      { name: "leftover odd", args: [[-2, 5, 0, 2, -2], 3], expected: 11 },
    ],
    hints: ["Flip the most negative values first.", "A leftover odd flip lands on the smallest magnitude."],
    relatedIds: [1046, 1481, 462],
  },
  {
    id: 376,
    slug: "wiggle-subsequence",
    title: "Wiggle Subsequence",
    difficulty: "Medium",
    category: "greedy",
    patterns: ["Greedy", "Dynamic Programming"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 47,
    leetcodeUrl: "https://leetcode.com/problems/wiggle-subsequence/",
    description:
      "A wiggle sequence has strictly alternating up and down differences between successive elements. Return the length of the longest wiggle subsequence obtainable by deleting some (possibly zero) elements while keeping order.",
    examples: [
      { input: "nums = [1,7,4,9,2,5]", output: "6", explanation: "The whole array already wiggles." },
      { input: "nums = [1,2,3,4,5,6,7,8,9]", output: "2", explanation: "Only one rise can be kept." },
    ],
    intuition:
      "Track two running lengths: the longest wiggle ending on an upward step and the longest ending on a downward step. A rise extends the best down-ending sequence by one, and a fall extends the best up-ending one; equal neighbors change nothing. The answer is the larger of the two counters.",
    approach: [
      "Return the length directly when fewer than two elements remain.",
      "Initialize up = 1 and down = 1.",
      "Scan adjacent pairs: on a rise set up = down + 1; on a fall set down = up + 1.",
      "Return max(up, down).",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Up/down counters",
        code: `def wiggle_max_length(nums: list[int]) -> int:
    if len(nums) < 2:
        return len(nums)
    up = down = 1
    for i in range(1, len(nums)):
        if nums[i] > nums[i - 1]:
            up = down + 1
        elif nums[i] < nums[i - 1]:
            down = up + 1
    return max(up, down)`,
      },
      {
        language: "typescript",
        label: "Up/down counters",
        code: `function wiggleMaxLength(nums: number[]): number {
  if (nums.length < 2) return nums.length;
  let up = 1;
  let down = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) up = down + 1;
    else if (nums[i] < nums[i - 1]) down = up + 1;
  }
  return Math.max(up, down);
}`,
      },
    ],
    runner: {
      entry: "wiggleMaxLength",
      comparison: "deep",
      jsStarter: `function wiggleMaxLength(nums) {
  // Return the length of the longest alternating up/down subsequence.
  // TODO: implement
}`,
      jsReference: `function wiggleMaxLength(nums) {
  if (nums.length < 2) return nums.length;
  let up = 1;
  let down = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) up = down + 1;
    else if (nums[i] < nums[i - 1]) down = up + 1;
  }
  return Math.max(up, down);
}`,
    },
    tests: [
      { name: "already wiggly", args: [[1, 7, 4, 9, 2, 5]], expected: 6 },
      { name: "long mixed", args: [[1, 17, 5, 10, 13, 15, 10, 5, 16, 8]], expected: 7 },
      { name: "monotone", args: [[1, 2, 3, 4, 5, 6, 7, 8, 9]], expected: 2 },
      { name: "all equal", args: [[3, 3, 3, 3]], expected: 1 },
      { name: "empty", args: [[]], expected: 0 },
    ],
    hints: ["Keep separate up-ending and down-ending lengths.", "Equal neighbors do not change either counter."],
    relatedIds: [300, 53, 738],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Linked List
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 707,
    slug: "design-linked-list",
    title: "Design Linked List",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Linked List", "Design"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/design-linked-list/",
    description:
      "Implement a linked list supporting get(index), addAtHead(val), addAtTail(val), addAtIndex(index, val), and deleteAtIndex(index). Indices are 0-based; get returns the node value or -1 when the index is invalid, and out-of-range insert/delete requests are ignored. The playground replays an operation list and grades the returned results.",
    examples: [
      {
        input:
          'ops = ["MyLinkedList","addAtHead","addAtTail","addAtIndex","get","deleteAtIndex","get"], args = [[],[1],[3],[1,2],[1],[1],[1]]',
        output: "[null,null,null,null,2,null,3]",
      },
    ],
    intuition:
      "The operations describe ordered, index-addressable storage with insertion and deletion anywhere — exactly a list's contract. A dynamic array models that contract directly: addAtHead/addAtTail are inserts at the ends, addAtIndex inserts in the middle when the index is in range, and get returns the value or -1 for an invalid index.",
    approach: [
      "Maintain an ordered sequence of values.",
      "addAtHead/addAtTail insert at position 0 / at the end.",
      "addAtIndex inserts at index only when 0 <= index <= length; larger indices are ignored.",
      "get returns the value when 0 <= index < length, else -1; deleteAtIndex removes a valid index and ignores others.",
    ],
    complexity: { time: "O(1) ends, O(n) indexed", space: "O(n)", note: "n = current list length." },
    solutions: [
      {
        language: "python",
        label: "Singly linked nodes",
        code: `class Node:
    def __init__(self, val: int) -> None:
        self.val = val
        self.next: "Node | None" = None

class MyLinkedList:
    def __init__(self) -> None:
        self.head: Node | None = None
        self.size = 0

    def get(self, index: int) -> int:
        if index < 0 or index >= self.size:
            return -1
        node = self.head
        for _ in range(index):
            node = node.next  # type: ignore[union-attr]
        return node.val  # type: ignore[union-attr]

    def addAtIndex(self, index: int, val: int) -> None:
        if index < 0 or index > self.size:
            return
        node = Node(val)
        if index == 0:
            node.next = self.head
            self.head = node
        else:
            prev = self.head
            for _ in range(index - 1):
                prev = prev.next  # type: ignore[union-attr]
            node.next = prev.next  # type: ignore[union-attr]
            prev.next = node  # type: ignore[union-attr]
        self.size += 1

    def addAtHead(self, val: int) -> None:
        self.addAtIndex(0, val)

    def addAtTail(self, val: int) -> None:
        self.addAtIndex(self.size, val)

    def deleteAtIndex(self, index: int) -> None:
        if index < 0 or index >= self.size:
            return
        if index == 0:
            self.head = self.head.next  # type: ignore[union-attr]
        else:
            prev = self.head
            for _ in range(index - 1):
                prev = prev.next  # type: ignore[union-attr]
            prev.next = prev.next.next  # type: ignore[union-attr]
        self.size -= 1`,
      },
      {
        language: "typescript",
        label: "Array-backed",
        code: `class MyLinkedList {
  private items: number[] = [];

  get(index: number): number {
    return index >= 0 && index < this.items.length ? this.items[index] : -1;
  }

  addAtHead(val: number): void {
    this.items.unshift(val);
  }

  addAtTail(val: number): void {
    this.items.push(val);
  }

  addAtIndex(index: number, val: number): void {
    if (index >= 0 && index <= this.items.length) this.items.splice(index, 0, val);
  }

  deleteAtIndex(index: number): void {
    if (index >= 0 && index < this.items.length) this.items.splice(index, 1);
  }
}`,
      },
    ],
    runner: {
      entry: "runLinkedList",
      comparison: "deep",
      jsStarter: `function runLinkedList(ops, args) {
  // Replay the operations. Constructor and void ops return null; get returns the value or -1.
  // TODO: implement the list and the driver loop.
}`,
      jsReference: `function runLinkedList(ops, args) {
  class MyLinkedList {
    constructor() { this.items = []; }
    get(index) { return index >= 0 && index < this.items.length ? this.items[index] : -1; }
    addAtHead(val) { this.items.unshift(val); }
    addAtTail(val) { this.items.push(val); }
    addAtIndex(index, val) { if (index >= 0 && index <= this.items.length) this.items.splice(index, 0, val); }
    deleteAtIndex(index) { if (index >= 0 && index < this.items.length) this.items.splice(index, 1); }
  }
  const out = [];
  let list = null;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i] || [];
    if (op === "MyLinkedList") { list = new MyLinkedList(); out.push(null); }
    else if (op === "addAtHead") { list.addAtHead(a[0]); out.push(null); }
    else if (op === "addAtTail") { list.addAtTail(a[0]); out.push(null); }
    else if (op === "addAtIndex") { list.addAtIndex(a[0], a[1]); out.push(null); }
    else if (op === "get") out.push(list.get(a[0]));
    else if (op === "deleteAtIndex") { list.deleteAtIndex(a[0]); out.push(null); }
  }
  return out;
}`,
    },
    tests: [
      {
        name: "full sequence",
        args: [
          ["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"],
          [[], [1], [3], [1, 2], [1], [1], [1]],
        ],
        expected: [null, null, null, null, 2, null, 3],
      },
      {
        name: "invalid get",
        args: [
          ["MyLinkedList", "addAtHead", "get", "get"],
          [[], [5], [0], [1]],
        ],
        expected: [null, null, 5, -1],
      },
      {
        name: "delete then read",
        args: [
          ["MyLinkedList", "addAtTail", "addAtTail", "deleteAtIndex", "get"],
          [[], [1], [2], [0], [0]],
        ],
        expected: [null, null, null, null, 2],
      },
    ],
    hints: ["get must guard the index and return -1 when out of range.", "addAtIndex allows index == length (append)."],
    relatedIds: [206, 21, 146],
  },
  {
    id: 1019,
    slug: "next-greater-node-in-linked-list",
    title: "Next Greater Node In Linked List",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Monotonic Stack", "Linked List"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 46,
    leetcodeUrl: "https://leetcode.com/problems/next-greater-node-in-linked-list/",
    description:
      "For each node in a linked list, find the value of the first later node that is strictly greater, or 0 if none exists. Return these answers as an array aligned to the original positions. The playground passes the list as a plain values array.",
    examples: [
      { input: "values = [2,1,5]", output: "[5,5,0]", explanation: "5 is the next greater for both 2 and 1; nothing exceeds 5." },
      { input: "values = [2,7,4,3,5]", output: "[7,0,5,5,0]" },
    ],
    intuition:
      "This is the classic next-greater-element scan over an array. Walk left to right keeping a stack of positions still waiting for a larger value; when the current value exceeds the value at the stack's top, it is that node's answer, so pop and fill. Positions left on the stack at the end have no greater successor and stay 0.",
    approach: [
      "Read the list into an array of values.",
      "Initialize a result array of zeros and an empty stack of indices.",
      "For each index i, while the value at the stack's top is smaller than values[i], pop it and set its result to values[i].",
      "Push i and continue; leftover indices keep their 0.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each index is pushed and popped once." },
    solutions: [
      {
        language: "python",
        label: "Monotonic stack",
        code: `def next_larger_nodes(values: list[int]) -> list[int]:
    res = [0] * len(values)
    stack: list[int] = []  # indices waiting for a greater value
    for i, v in enumerate(values):
        while stack and values[stack[-1]] < v:
            res[stack.pop()] = v
        stack.append(i)
    return res`,
      },
      {
        language: "typescript",
        label: "Monotonic stack",
        code: `function nextLargerNodes(values: number[]): number[] {
  const res = new Array<number>(values.length).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < values.length; i++) {
    while (stack.length && values[stack[stack.length - 1]] < values[i]) {
      res[stack.pop()!] = values[i];
    }
    stack.push(i);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "nextLargerNodes",
      comparison: "deep",
      jsStarter: `function nextLargerNodes(values) {
  // 'values' is the list as an array. Return the next-greater value per position (0 if none).
  // TODO: implement
}`,
      jsReference: `function nextLargerNodes(values) {
  const res = new Array(values.length).fill(0);
  const stack = [];
  for (let i = 0; i < values.length; i++) {
    while (stack.length && values[stack[stack.length - 1]] < values[i]) {
      res[stack.pop()] = values[i];
    }
    stack.push(i);
  }
  return res;
}`,
    },
    tests: [
      { name: "three nodes", args: [[2, 1, 5]], expected: [5, 5, 0] },
      { name: "with valleys", args: [[2, 7, 4, 3, 5]], expected: [7, 0, 5, 5, 0] },
      { name: "longer", args: [[1, 7, 5, 1, 9, 2, 5, 1]], expected: [7, 9, 9, 9, 0, 5, 0, 0] },
      { name: "empty", args: [[]], expected: [] },
    ],
    hints: ["It is the next-greater-element pattern on an array.", "Indices left on the stack keep their 0."],
    relatedIds: [496, 503, 739],
  },
  {
    id: 817,
    slug: "linked-list-components",
    title: "Linked List Components",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Hash Set", "Linked List"],
    companies: ["amazon", "google"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/linked-list-components/",
    description:
      "Given a linked list and a set of values nums drawn from the list, a connected component is a maximal run of consecutive list nodes whose values all belong to nums. Return the number of such components. The playground passes the list as a values array.",
    examples: [
      { input: "values = [0,1,2,3], nums = [0,1,3]", output: "2", explanation: "[0,1] is one component; [3] is another." },
      { input: "values = [0,1,2,3,4], nums = [0,3,1,4]", output: "2", explanation: "[0,1] and [3,4]." },
    ],
    intuition:
      "Components correspond to maximal stretches of in-set values separated by at least one out-of-set node. Put nums in a hash set, then sweep the list counting the start of each new run: a component begins at an in-set node whose predecessor was not in-set (or that is the first node).",
    approach: [
      "Build a set from nums for O(1) membership tests.",
      "Track whether you are currently inside an in-set run.",
      "At each node, if its value is in the set and you were not already in a run, increment the component count and mark that a run started.",
      "When a value is not in the set, clear the run flag; return the count.",
    ],
    complexity: { time: "O(n + m)", space: "O(m)", note: "m = size of nums." },
    solutions: [
      {
        language: "python",
        label: "Run counting",
        code: `def num_components(values: list[int], nums: list[int]) -> int:
    in_set = set(nums)
    count = 0
    in_run = False
    for v in values:
        if v in in_set:
            if not in_run:
                count += 1
                in_run = True
        else:
            in_run = False
    return count`,
      },
      {
        language: "typescript",
        label: "Run counting",
        code: `function numComponents(values: number[], nums: number[]): number {
  const inSet = new Set(nums);
  let count = 0;
  let inRun = false;
  for (const v of values) {
    if (inSet.has(v)) {
      if (!inRun) {
        count += 1;
        inRun = true;
      }
    } else {
      inRun = false;
    }
  }
  return count;
}`,
      },
    ],
    runner: {
      entry: "numComponents",
      comparison: "deep",
      jsStarter: `function numComponents(values, nums) {
  // 'values' is the list as an array. Count maximal runs whose values are all in nums.
  // TODO: implement
}`,
      jsReference: `function numComponents(values, nums) {
  const inSet = new Set(nums);
  let count = 0;
  let inRun = false;
  for (const v of values) {
    if (inSet.has(v)) {
      if (!inRun) {
        count += 1;
        inRun = true;
      }
    } else {
      inRun = false;
    }
  }
  return count;
}`,
    },
    tests: [
      { name: "split by gap", args: [[0, 1, 2, 3], [0, 1, 3]], expected: 2 },
      { name: "two runs", args: [[0, 1, 2, 3, 4], [0, 3, 1, 4]], expected: 2 },
      { name: "single value", args: [[1, 2, 3], [2]], expected: 1 },
      { name: "empty set", args: [[1, 2, 3], []], expected: 0 },
    ],
    hints: ["A new component starts at an in-set node following an out-of-set node.", "A hash set makes membership O(1)."],
    relatedIds: [1171, 203, 2487],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Tries
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 677,
    slug: "map-sum-pairs",
    title: "Map Sum Pairs",
    difficulty: "Medium",
    category: "tries",
    patterns: ["Trie", "Hash Map", "Design"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 44,
    leetcodeUrl: "https://leetcode.com/problems/map-sum-pairs/",
    description:
      "Design a structure with insert(key, val) that stores or overwrites a string key's integer value, and sum(prefix) that returns the total of all values whose key starts with the given prefix. The playground replays an operation list and grades the returned results.",
    examples: [
      {
        input: 'ops = ["MapSum","insert","sum","insert","sum"], args = [[],["apple",3],["ap"],["app",2],["ap"]]',
        output: "[null,null,3,null,5]",
        explanation: "After inserting apple=3, sum('ap')=3; after app=2, sum('ap')=3+2=5.",
      },
    ],
    intuition:
      "Keep the latest value for every key in a hash map so re-inserting a key simply overwrites it. A prefix sum then totals the values of all keys that begin with the prefix. A trie can accelerate this, but for the given limits a map plus a prefix check over its keys is clear and correct.",
    approach: [
      "Maintain a map from key string to its current value; insert overwrites.",
      "For sum(prefix), iterate the stored entries.",
      "Add a value whenever its key starts with prefix.",
      "Return the accumulated total.",
    ],
    complexity: { time: "O(k) per sum", space: "O(total keys)", note: "k = number of stored keys." },
    solutions: [
      {
        language: "python",
        label: "Trie of running sums",
        code: `class MapSum:
    def __init__(self) -> None:
        self.values: dict[str, int] = {}
        self.prefixes: dict[str, int] = {}

    def insert(self, key: str, val: int) -> None:
        delta = val - self.values.get(key, 0)
        self.values[key] = val
        prefix = ""
        for ch in key:
            prefix += ch
            self.prefixes[prefix] = self.prefixes.get(prefix, 0) + delta

    def sum(self, prefix: str) -> int:
        return self.prefixes.get(prefix, 0)`,
      },
      {
        language: "typescript",
        label: "Map + prefix scan",
        code: `class MapSum {
  private values = new Map<string, number>();

  insert(key: string, val: number): void {
    this.values.set(key, val);
  }

  sum(prefix: string): number {
    let total = 0;
    for (const [key, val] of this.values) {
      if (key.startsWith(prefix)) total += val;
    }
    return total;
  }
}`,
      },
    ],
    runner: {
      entry: "runMapSum",
      comparison: "deep",
      jsStarter: `function runMapSum(ops, args) {
  // Replay the operations. Constructor and insert return null; sum returns an integer.
  // TODO: implement the structure and the driver loop.
}`,
      jsReference: `function runMapSum(ops, args) {
  class MapSum {
    constructor() { this.values = new Map(); }
    insert(key, val) { this.values.set(key, val); }
    sum(prefix) {
      let total = 0;
      for (const [key, val] of this.values) {
        if (key.startsWith(prefix)) total += val;
      }
      return total;
    }
  }
  const out = [];
  let ms = null;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i] || [];
    if (op === "MapSum") { ms = new MapSum(); out.push(null); }
    else if (op === "insert") { ms.insert(a[0], a[1]); out.push(null); }
    else if (op === "sum") out.push(ms.sum(a[0]));
  }
  return out;
}`,
    },
    tests: [
      {
        name: "apple then app",
        args: [
          ["MapSum", "insert", "sum", "insert", "sum"],
          [[], ["apple", 3], ["ap"], ["app", 2], ["ap"]],
        ],
        expected: [null, null, 3, null, 5],
      },
      {
        name: "distinct prefixes",
        args: [
          ["MapSum", "insert", "insert", "sum"],
          [[], ["a", 3], ["b", 2], ["a"]],
        ],
        expected: [null, null, null, 3],
      },
      {
        name: "overwrite key",
        args: [
          ["MapSum", "insert", "insert", "sum"],
          [[], ["apple", 3], ["apple", 2], ["app"]],
        ],
        expected: [null, null, null, 2],
      },
    ],
    hints: ["Re-inserting a key overwrites its value.", "Sum the values of every key sharing the prefix."],
    relatedIds: [208, 211, 1268],
  },
  {
    id: 1268,
    slug: "search-suggestions-system",
    title: "Search Suggestions System",
    difficulty: "Medium",
    category: "tries",
    patterns: ["Trie", "Sorting", "Binary Search"],
    companies: ["amazon", "google", "microsoft", "uber"],
    frequency: 66,
    leetcodeUrl: "https://leetcode.com/problems/search-suggestions-system/",
    description:
      "As a user types searchWord one character at a time, suggest up to three products that share the current typed prefix, chosen in lexicographic order. Return the list of suggestions after each character is added.",
    examples: [
      {
        input: 'products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"',
        output:
          '[["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]',
      },
    ],
    intuition:
      "Sort the products once so lexicographic order is fixed, then for each growing prefix collect the first three products that start with it. Sorting up front means the earliest matches in scan order are exactly the three smallest, so a simple prefix filter per character produces the answer.",
    approach: [
      "Sort the product list lexicographically.",
      "Grow the typed prefix one character at a time.",
      "For each prefix, scan the sorted products and collect up to three that start with it.",
      "Append that list of suggestions to the result.",
    ],
    complexity: { time: "O(p log p + p·L)", space: "O(1)", note: "p = product count, L = searchWord length; beyond output." },
    solutions: [
      {
        language: "python",
        label: "Sort + prefix filter",
        code: `def suggested_products(products: list[str], search_word: str) -> list[list[str]]:
    products = sorted(products)
    res: list[list[str]] = []
    prefix = ""
    for ch in search_word:
        prefix += ch
        matches: list[str] = []
        for p in products:
            if p.startswith(prefix):
                matches.append(p)
                if len(matches) == 3:
                    break
        res.append(matches)
    return res`,
      },
      {
        language: "typescript",
        label: "Sort + prefix filter",
        code: `function suggestedProducts(products: string[], searchWord: string): string[][] {
  const sorted = [...products].sort();
  const res: string[][] = [];
  let prefix = "";
  for (const ch of searchWord) {
    prefix += ch;
    const matches: string[] = [];
    for (const p of sorted) {
      if (p.startsWith(prefix)) {
        matches.push(p);
        if (matches.length === 3) break;
      }
    }
    res.push(matches);
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "suggestedProducts",
      comparison: "deep",
      jsStarter: `function suggestedProducts(products, searchWord) {
  // Return up to three lexicographically smallest matches after each typed character.
  // TODO: implement
}`,
      jsReference: `function suggestedProducts(products, searchWord) {
  const sorted = [...products].sort();
  const res = [];
  let prefix = "";
  for (const ch of searchWord) {
    prefix += ch;
    const matches = [];
    for (const p of sorted) {
      if (p.startsWith(prefix)) {
        matches.push(p);
        if (matches.length === 3) break;
      }
    }
    res.push(matches);
  }
  return res;
}`,
    },
    tests: [
      {
        name: "mouse",
        args: [["mobile", "mouse", "moneypot", "monitor", "mousepad"], "mouse"],
        expected: [
          ["mobile", "moneypot", "monitor"],
          ["mobile", "moneypot", "monitor"],
          ["mouse", "mousepad"],
          ["mouse", "mousepad"],
          ["mouse", "mousepad"],
        ],
      },
      {
        name: "single product",
        args: [["havana"], "havana"],
        expected: [["havana"], ["havana"], ["havana"], ["havana"], ["havana"], ["havana"]],
      },
      {
        name: "bags",
        args: [["bags", "baggage", "banner", "box", "cloths"], "bags"],
        expected: [
          ["baggage", "bags", "banner"],
          ["baggage", "bags", "banner"],
          ["baggage", "bags"],
          ["bags"],
        ],
      },
    ],
    hints: ["Sorting fixes lexicographic order up front.", "Take the first three matches per prefix."],
    relatedIds: [208, 1166, 642],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Bit Manipulation
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 421,
    slug: "maximum-xor-of-two-numbers-in-an-array",
    title: "Maximum XOR of Two Numbers in an Array",
    difficulty: "Medium",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation", "Greedy", "Trie"],
    companies: ["amazon", "google", "meta", "microsoft"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
    description:
      "Return the largest XOR value obtainable from any two distinct elements of the array. With n values you must find the pair whose bitwise exclusive-or is maximal.",
    examples: [
      { input: "nums = [3,10,5,25,2,8]", output: "28", explanation: "5 XOR 25 = 28." },
      { input: "nums = [8,10,2]", output: "10", explanation: "8 XOR 2 = 10." },
    ],
    intuition:
      "Build the answer one bit at a time from the most significant bit down, greedily assuming the next bit can be 1. Keep the masked high-bit prefixes of all numbers in a set; the assumed bit is achievable if some two prefixes XOR to the candidate, which holds when candidate XOR prefix is also present. Lock in each bit that works.",
    approach: [
      "Set max = 0 and process bit positions from high to low.",
      "Extend the mask to include the current bit and collect each number's masked prefix into a set.",
      "Form candidate = max with the current bit set; if any prefix p has (candidate XOR p) also in the set, the bit is attainable.",
      "Keep candidate as the new max when achievable, then continue to the next bit.",
    ],
    complexity: { time: "O(32n)", space: "O(n)", note: "A pass per bit over n prefixes." },
    solutions: [
      {
        language: "python",
        label: "Greedy prefix set",
        code: `def find_maximum_xor(nums: list[int]) -> int:
    max_xor = 0
    mask = 0
    for bit in range(30, -1, -1):
        mask |= (1 << bit)
        prefixes = {n & mask for n in nums}
        candidate = max_xor | (1 << bit)
        if any((candidate ^ p) in prefixes for p in prefixes):
            max_xor = candidate
    return max_xor`,
      },
      {
        language: "typescript",
        label: "Greedy prefix set",
        code: `function findMaximumXOR(nums: number[]): number {
  let maxXor = 0;
  let mask = 0;
  for (let bit = 30; bit >= 0; bit--) {
    mask |= (1 << bit);
    const prefixes = new Set<number>();
    for (const n of nums) prefixes.add(n & mask);
    const candidate = maxXor | (1 << bit);
    for (const p of prefixes) {
      if (prefixes.has(candidate ^ p)) {
        maxXor = candidate;
        break;
      }
    }
  }
  return maxXor;
}`,
      },
    ],
    runner: {
      entry: "findMaximumXOR",
      comparison: "deep",
      jsStarter: `function findMaximumXOR(nums) {
  // Return the maximum XOR over any pair of elements.
  // TODO: implement
}`,
      jsReference: `function findMaximumXOR(nums) {
  let maxXor = 0;
  let mask = 0;
  for (let bit = 30; bit >= 0; bit--) {
    mask |= (1 << bit);
    const prefixes = new Set();
    for (const n of nums) prefixes.add(n & mask);
    const candidate = maxXor | (1 << bit);
    for (const p of prefixes) {
      if (prefixes.has(candidate ^ p)) {
        maxXor = candidate;
        break;
      }
    }
  }
  return maxXor;
}`,
    },
    tests: [
      { name: "six values", args: [[3, 10, 5, 25, 2, 8]], expected: 28 },
      { name: "single element", args: [[0]], expected: 0 },
      { name: "two values", args: [[2, 4]], expected: 6 },
      { name: "triple", args: [[8, 10, 2]], expected: 10 },
    ],
    hints: ["Decide the answer bit by bit from the top.", "A bit is reachable if two prefixes XOR to the candidate."],
    relatedIds: [1707, 208, 1803],
  },
  {
    id: 477,
    slug: "total-hamming-distance",
    title: "Total Hamming Distance",
    difficulty: "Medium",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation", "Counting"],
    companies: ["amazon", "meta", "google"],
    frequency: 43,
    leetcodeUrl: "https://leetcode.com/problems/total-hamming-distance/",
    description:
      "The Hamming distance between two integers is the count of bit positions where they differ. Return the sum of Hamming distances over every unordered pair in the array.",
    examples: [
      { input: "nums = [4,14,2]", output: "6", explanation: "Distances (4,14)=2, (4,2)=2, (14,2)=2 sum to 6." },
      { input: "nums = [1,2,3]", output: "4" },
    ],
    intuition:
      "Comparing every pair is O(n²), but bits are independent. For each bit position, if c of the n numbers have that bit set, then it contributes a difference for exactly the c·(n−c) pairs that mix a set and an unset bit there. Summing this product across all bit positions gives the total in linear time per bit.",
    approach: [
      "Loop over each bit position 0..31.",
      "Count how many numbers, c, have that bit set.",
      "Add c·(n − c) to the running total — the pairs that differ at this bit.",
      "Return the accumulated total.",
    ],
    complexity: { time: "O(32n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Per-bit counting",
        code: `def total_hamming_distance(nums: list[int]) -> int:
    n = len(nums)
    total = 0
    for bit in range(32):
        ones = sum((x >> bit) & 1 for x in nums)
        total += ones * (n - ones)
    return total`,
      },
      {
        language: "typescript",
        label: "Per-bit counting",
        code: `function totalHammingDistance(nums: number[]): number {
  const n = nums.length;
  let total = 0;
  for (let bit = 0; bit < 32; bit++) {
    let ones = 0;
    for (const x of nums) ones += (x >> bit) & 1;
    total += ones * (n - ones);
  }
  return total;
}`,
      },
    ],
    runner: {
      entry: "totalHammingDistance",
      comparison: "deep",
      jsStarter: `function totalHammingDistance(nums) {
  // Return the sum of Hamming distances over all pairs.
  // TODO: implement
}`,
      jsReference: `function totalHammingDistance(nums) {
  const n = nums.length;
  let total = 0;
  for (let bit = 0; bit < 32; bit++) {
    let ones = 0;
    for (const x of nums) ones += (x >> bit) & 1;
    total += ones * (n - ones);
  }
  return total;
}`,
    },
    tests: [
      { name: "three values", args: [[4, 14, 2]], expected: 6 },
      { name: "small set", args: [[1, 2, 3]], expected: 4 },
      { name: "with duplicate", args: [[4, 14, 4]], expected: 4 },
      { name: "all zero", args: [[0, 0]], expected: 0 },
    ],
    hints: ["Bits are independent — handle each position alone.", "A bit set in c of n numbers adds c·(n−c)."],
    relatedIds: [461, 191, 338],
  },
];

export default batchN;
