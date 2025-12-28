import type { Problem } from "../types.ts";

/**
 * Catalog batch C — linked-list, tree, trie, and heap classics.
 *
 * Every record ships idiomatic node-based Python + TypeScript solutions for
 * display, plus a JSON-friendly `runner` whose `jsReference` rebuilds the real
 * data structure from array input, does the genuine pointer/tree work, and
 * serializes back to plain JSON so the playground can grade it. All `expected`
 * values were computed by hand and pass the verification harness.
 */
export const batchC: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Linked List
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 21,
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "linked-list",
    patterns: ["Two Pointers", "Merge"],
    companies: ["amazon", "microsoft", "apple", "google", "meta", "adobe"],
    frequency: 88,
    leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
    description:
      "Given the heads of two lists that are each already sorted in non-decreasing order, splice their nodes together into one sorted list and return its head. The playground passes each list as an array (e.g. `[1,2,4]` means 1→2→4) and expects the merged array back.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: ["0 ≤ each list length ≤ 50", "-100 ≤ Node.val ≤ 100", "Both lists are sorted ascending."],
    intuition:
      "Because both inputs are already sorted, you never need to look backward: at every step the next node of the answer is simply the smaller of the two current heads. A dummy head node lets you append without special-casing the very first node, and when one list runs out you attach the remainder of the other wholesale.",
    approach: [
      "Create a dummy node and a `tail` pointer starting at it.",
      "While both lists are non-empty, append the smaller head and advance that list.",
      "Attach whichever list still has nodes left.",
      "Return dummy.next.",
    ],
    complexity: { time: "O(m + n)", space: "O(1)", note: "Splices existing nodes; no extra structures." },
    solutions: [
      {
        language: "python",
        label: "Dummy head",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def merge_two_lists(l1: ListNode | None, l2: ListNode | None) -> ListNode | None:
    dummy = tail = ListNode()
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next, l1 = l1, l1.next
        else:
            tail.next, l2 = l2, l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next`,
      },
      {
        language: "typescript",
        label: "Dummy head",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }
  tail.next = l1 ?? l2;
  return dummy.next;
}`,
      },
    ],
    runner: {
      entry: "mergeTwoLists",
      comparison: "deep",
      jsStarter: `function mergeTwoLists(list1, list2) {
  // Each arg is a sorted array (e.g. [1,2,4]). Return the merged sorted array.
  // TODO: implement
}`,
      jsReference: `function mergeTwoLists(list1, list2) {
  function build(a) { let h = null; for (let i = a.length - 1; i >= 0; i--) h = { val: a[i], next: h }; return h; }
  let p = build(list1), q = build(list2);
  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (p && q) {
    if (p.val <= q.val) { tail.next = p; p = p.next; }
    else { tail.next = q; q = q.next; }
    tail = tail.next;
  }
  tail.next = p || q;
  const out = [];
  for (let n = dummy.next; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "interleaved", args: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
      { name: "both empty", args: [[], []], expected: [] },
      { name: "one empty", args: [[], [0]], expected: [0] },
      { name: "tail merge", args: [[5], [1, 2, 3]], expected: [1, 2, 3, 5] },
    ],
    hints: ["A dummy head removes first-node edge cases.", "When one list ends, append the rest of the other."],
    relatedIds: [23, 88, 2],
  },
  {
    id: 203,
    slug: "remove-linked-list-elements",
    title: "Remove Linked List Elements",
    difficulty: "Easy",
    category: "linked-list",
    patterns: ["Dummy Head", "Pointers"],
    companies: ["amazon", "microsoft", "apple", "bloomberg"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/remove-linked-list-elements/",
    description:
      "Given the head of a list and a target value `val`, delete every node whose value equals `val` and return the new head. The playground passes the list as an array and expects the surviving values as an array.",
    examples: [
      { input: "head = [1,2,6,3,4,5,6], val = 6", output: "[1,2,3,4,5]" },
      { input: "head = [7,7,7,7], val = 7", output: "[]" },
    ],
    constraints: ["0 ≤ list length ≤ 10^4", "1 ≤ Node.val ≤ 50", "0 ≤ val ≤ 50"],
    intuition:
      "Deletions are easiest when you always look at the *next* node from a stable predecessor. A dummy node placed before the head gives every real node a predecessor — including the original head — so removing a run of matching nodes (even at the very front) needs no special case.",
    approach: [
      "Create a dummy node pointing at head.",
      "Walk a `cur` pointer; whenever `cur.next.val === val`, splice it out by skipping it.",
      "Otherwise advance `cur`.",
      "Return dummy.next.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Dummy head",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def remove_elements(head: ListNode | None, val: int) -> ListNode | None:
    dummy = ListNode(0, head)
    cur = dummy
    while cur.next:
        if cur.next.val == val:
            cur.next = cur.next.next
        else:
            cur = cur.next
    return dummy.next`,
      },
      {
        language: "typescript",
        label: "Dummy head",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function removeElements(head: ListNode | null, val: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let cur: ListNode = dummy;
  while (cur.next) {
    if (cur.next.val === val) cur.next = cur.next.next;
    else cur = cur.next;
  }
  return dummy.next;
}`,
      },
    ],
    runner: {
      entry: "removeElements",
      comparison: "deep",
      jsStarter: `function removeElements(values, val) {
  // 'values' is the list as an array. Remove every node equal to 'val'.
  // TODO: implement
}`,
      jsReference: `function removeElements(values, val) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  const dummy = { val: 0, next: head };
  let cur = dummy;
  while (cur.next) {
    if (cur.next.val === val) cur.next = cur.next.next;
    else cur = cur.next;
  }
  const out = [];
  for (let n = dummy.next; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "scattered", args: [[1, 2, 6, 3, 4, 5, 6], 6], expected: [1, 2, 3, 4, 5] },
      { name: "all match", args: [[7, 7, 7, 7], 7], expected: [] },
      { name: "empty", args: [[], 1], expected: [] },
      { name: "no match", args: [[1, 2, 3], 4], expected: [1, 2, 3] },
      { name: "ends match", args: [[6, 1, 6], 6], expected: [1] },
    ],
    hints: ["Use a dummy head so the real head is deletable.", "Only advance when you don't delete."],
    relatedIds: [83, 27, 237],
  },
  {
    id: 83,
    slug: "remove-duplicates-from-sorted-list",
    title: "Remove Duplicates from Sorted List",
    difficulty: "Easy",
    category: "linked-list",
    patterns: ["Pointers"],
    companies: ["amazon", "microsoft", "apple", "adobe"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
    description:
      "Given the head of a sorted list, delete repeated values so that each value appears exactly once, and return the head. The playground uses array form for input and output.",
    examples: [
      { input: "head = [1,1,2]", output: "[1,2]" },
      { input: "head = [1,1,2,3,3]", output: "[1,2,3]" },
    ],
    constraints: ["0 ≤ list length ≤ 300", "-100 ≤ Node.val ≤ 100", "The list is sorted ascending."],
    intuition:
      "Since the list is sorted, all copies of a value are adjacent. Walk one pointer down the list, and whenever the current node equals the one after it, unlink that next node. The pointer only advances when neighbors differ, so a long run of equal values collapses to a single node.",
    approach: [
      "Start `cur` at head.",
      "While `cur` and `cur.next` exist: if equal, skip `cur.next`; else advance `cur`.",
      "Return the (unchanged) head.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Single pass",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def delete_duplicates(head: ListNode | None) -> ListNode | None:
    cur = head
    while cur and cur.next:
        if cur.val == cur.next.val:
            cur.next = cur.next.next
        else:
            cur = cur.next
    return head`,
      },
      {
        language: "typescript",
        label: "Single pass",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function deleteDuplicates(head: ListNode | null): ListNode | null {
  let cur = head;
  while (cur && cur.next) {
    if (cur.val === cur.next.val) cur.next = cur.next.next;
    else cur = cur.next;
  }
  return head;
}`,
      },
    ],
    runner: {
      entry: "deleteDuplicates",
      comparison: "deep",
      jsStarter: `function deleteDuplicates(values) {
  // 'values' is the sorted list as an array. Keep one node per distinct value.
  // TODO: implement
}`,
      jsReference: `function deleteDuplicates(values) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  let cur = head;
  while (cur && cur.next) {
    if (cur.val === cur.next.val) cur.next = cur.next.next;
    else cur = cur.next;
  }
  const out = [];
  for (let n = head; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "one dup", args: [[1, 1, 2]], expected: [1, 2] },
      { name: "two runs", args: [[1, 1, 2, 3, 3]], expected: [1, 2, 3] },
      { name: "empty", args: [[]], expected: [] },
      { name: "all same", args: [[1, 1, 1]], expected: [1] },
      { name: "no dups", args: [[1, 2, 3]], expected: [1, 2, 3] },
    ],
    hints: ["Sorted means duplicates are adjacent.", "Skip equal neighbors without moving the pointer."],
    relatedIds: [82, 203, 26],
  },
  {
    id: 234,
    slug: "palindrome-linked-list",
    title: "Palindrome Linked List",
    difficulty: "Easy",
    category: "linked-list",
    patterns: ["Two Pointers", "In-place Reversal"],
    companies: ["amazon", "meta", "microsoft", "apple", "bloomberg"],
    frequency: 72,
    leetcodeUrl: "https://leetcode.com/problems/palindrome-linked-list/",
    description:
      "Given the head of a singly linked list, decide whether the sequence of values reads the same forward and backward, returning `true` or `false`. The playground passes the list as an array.",
    examples: [
      { input: "head = [1,2,2,1]", output: "true" },
      { input: "head = [1,2]", output: "false" },
    ],
    constraints: ["0 ≤ list length ≤ 10^5", "0 ≤ Node.val ≤ 9"],
    intuition:
      "A singly linked list can only be walked forward, so to compare front-to-back you first find the middle with a slow/fast pointer, reverse the second half in place, then walk the two halves in lockstep. If every paired value matches, it's a palindrome — and this uses only O(1) extra space.",
    approach: [
      "Use slow/fast pointers to reach the middle.",
      "Reverse the second half starting at the middle.",
      "Compare the first half with the reversed second half node by node.",
      "Return true only if all compared values are equal.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Reverses the back half in place." },
    solutions: [
      {
        language: "python",
        label: "Reverse half",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def is_palindrome(head: ListNode | None) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    prev = None
    while slow:
        slow.next, prev, slow = prev, slow, slow.next
    left, right = head, prev
    while right:
        if left.val != right.val:
            return False
        left, right = left.next, right.next
    return True`,
      },
      {
        language: "typescript",
        label: "Reverse half",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function isPalindrome(head: ListNode | null): boolean {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  let prev: ListNode | null = null;
  while (slow) {
    const next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }
  let left = head, right = prev;
  while (right) {
    if (left!.val !== right.val) return false;
    left = left!.next;
    right = right.next;
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "isPalindrome",
      comparison: "deep",
      jsStarter: `function isPalindrome(values) {
  // 'values' is the list as an array. Return true if it reads the same both ways.
  // TODO: implement
}`,
      jsReference: `function isPalindrome(values) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  let slow = head, fast = head;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
  let prev = null;
  while (slow) { const next = slow.next; slow.next = prev; prev = slow; slow = next; }
  let left = head, right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}`,
    },
    tests: [
      { name: "even palindrome", args: [[1, 2, 2, 1]], expected: true },
      { name: "not palindrome", args: [[1, 2]], expected: false },
      { name: "single", args: [[1]], expected: true },
      { name: "empty", args: [[]], expected: true },
      { name: "odd palindrome", args: [[1, 2, 3, 2, 1]], expected: true },
      { name: "odd non-palindrome", args: [[1, 2, 3, 4]], expected: false },
    ],
    hints: ["Find the middle with slow/fast.", "Reverse the second half, then compare."],
    relatedIds: [206, 9, 125],
  },
  {
    id: 19,
    slug: "remove-nth-node-from-end-of-list",
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Two Pointers", "Dummy Head"],
    companies: ["amazon", "meta", "microsoft", "google", "apple"],
    frequency: 80,
    leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    description:
      "Given the head of a list and an integer `n`, remove the n-th node counting from the end and return the head. The playground uses array form for input and output, and the answer is found in a single pass.",
    examples: [
      { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
      { input: "head = [1], n = 1", output: "[]" },
    ],
    constraints: ["1 ≤ list length ≤ 30", "1 ≤ n ≤ list length", "-100 ≤ Node.val ≤ 100"],
    intuition:
      "Keep two pointers exactly `n` nodes apart: advance a fast pointer `n` steps first, then move both fast and slow together until fast reaches the end. The gap guarantees slow lands just before the node to delete. A dummy head handles the case where the head itself is removed.",
    approach: [
      "Create a dummy node before head; set fast = slow = dummy.",
      "Advance fast by n steps.",
      "Move fast and slow together until fast.next is null.",
      "Skip slow.next, then return dummy.next.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Single pass with a fixed-width window." },
    solutions: [
      {
        language: "python",
        label: "Two pointers",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def remove_nth_from_end(head: ListNode | None, n: int) -> ListNode | None:
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n):
        fast = fast.next
    while fast.next:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next`,
      },
      {
        language: "typescript",
        label: "Two pointers",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let fast: ListNode = dummy, slow: ListNode = dummy;
  for (let i = 0; i < n; i++) fast = fast.next!;
  while (fast.next) {
    fast = fast.next;
    slow = slow.next!;
  }
  slow.next = slow.next!.next;
  return dummy.next;
}`,
      },
    ],
    runner: {
      entry: "removeNthFromEnd",
      comparison: "deep",
      jsStarter: `function removeNthFromEnd(values, n) {
  // 'values' is the list as an array. Remove the nth node from the end.
  // TODO: implement
}`,
      jsReference: `function removeNthFromEnd(values, n) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  const dummy = { val: 0, next: head };
  let fast = dummy, slow = dummy;
  for (let i = 0; i < n; i++) fast = fast.next;
  while (fast.next) { fast = fast.next; slow = slow.next; }
  slow.next = slow.next.next;
  const out = [];
  for (let x = dummy.next; x; x = x.next) out.push(x.val);
  return out;
}`,
    },
    tests: [
      { name: "from middle", args: [[1, 2, 3, 4, 5], 2], expected: [1, 2, 3, 5] },
      { name: "only node", args: [[1], 1], expected: [] },
      { name: "last node", args: [[1, 2], 1], expected: [1] },
      { name: "head node", args: [[1, 2], 2], expected: [2] },
      { name: "first of three", args: [[1, 2, 3], 3], expected: [2, 3] },
    ],
    hints: ["Keep the two pointers exactly n apart.", "A dummy head lets you delete the real head."],
    relatedIds: [21, 2, 876],
  },
  {
    id: 2,
    slug: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Elementary Math", "Carry"],
    companies: ["amazon", "microsoft", "meta", "google", "apple", "bloomberg", "adobe"],
    frequency: 86,
    leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/",
    description:
      "Two non-negative integers are stored as linked lists with their digits in reverse order, one digit per node. Add the numbers and return the sum as a list in the same reversed-digit form. The playground passes each list as an array, so `[2,4,3]` represents the number 342.",
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." },
      { input: "l1 = [0], l2 = [0]", output: "[0]" },
    ],
    constraints: ["1 ≤ each list length ≤ 100", "0 ≤ Node.val ≤ 9", "No leading zeros except the number 0 itself."],
    intuition:
      "Reverse-order digits are perfect for grade-school addition: the heads are the least-significant digits, so you add column by column from the front, carrying into the next column. Loop while either list has digits left or a carry remains, emitting one result digit per step.",
    approach: [
      "Walk both lists together with a running carry.",
      "At each step sum the two current digits plus carry; the new digit is sum % 10 and the carry is sum / 10.",
      "Append the digit to the result list and advance any non-empty list.",
      "Continue while a list remains or carry is non-zero.",
    ],
    complexity: { time: "O(max(m, n))", space: "O(max(m, n))", note: "Result length is one past the longer input at most." },
    solutions: [
      {
        language: "python",
        label: "Carry add",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def add_two_numbers(l1: ListNode | None, l2: ListNode | None) -> ListNode | None:
    dummy = tail = ListNode()
    carry = 0
    while l1 or l2 or carry:
        total = (l1.val if l1 else 0) + (l2.val if l2 else 0) + carry
        carry, digit = divmod(total, 10)
        tail.next = ListNode(digit)
        tail = tail.next
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    return dummy.next`,
      },
      {
        language: "typescript",
        label: "Carry add",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let tail = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const total = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    carry = Math.floor(total / 10);
    tail.next = new ListNode(total % 10);
    tail = tail.next;
    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }
  return dummy.next;
}`,
      },
    ],
    runner: {
      entry: "addTwoNumbers",
      comparison: "deep",
      jsStarter: `function addTwoNumbers(l1, l2) {
  // Each arg is digits stored reversed, e.g. [2,4,3] = 342. Return the reversed-digit sum.
  // TODO: implement
}`,
      jsReference: `function addTwoNumbers(l1, l2) {
  function build(a) { let h = null; for (let i = a.length - 1; i >= 0; i--) h = { val: a[i], next: h }; return h; }
  let p = build(l1), q = build(l2), carry = 0;
  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (p || q || carry) {
    const total = (p ? p.val : 0) + (q ? q.val : 0) + carry;
    carry = Math.floor(total / 10);
    tail.next = { val: total % 10, next: null };
    tail = tail.next;
    if (p) p = p.next;
    if (q) q = q.next;
  }
  const out = [];
  for (let n = dummy.next; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "342 + 465", args: [[2, 4, 3], [5, 6, 4]], expected: [7, 0, 8] },
      { name: "zeros", args: [[0], [0]], expected: [0] },
      { name: "carry out", args: [[9, 9], [1]], expected: [0, 0, 1] },
      { name: "uneven lengths", args: [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]], expected: [8, 9, 9, 9, 0, 0, 0, 1] },
      { name: "single carry", args: [[5], [5]], expected: [0, 1] },
    ],
    hints: ["Heads are the ones digit — add front to back.", "Keep looping while a carry survives."],
    relatedIds: [21, 43, 67],
  },
  {
    id: 24,
    slug: "swap-nodes-in-pairs",
    title: "Swap Nodes in Pairs",
    difficulty: "Medium",
    category: "linked-list",
    patterns: ["Pointers", "Dummy Head"],
    companies: ["amazon", "microsoft", "google", "apple", "bloomberg"],
    frequency: 66,
    leetcodeUrl: "https://leetcode.com/problems/swap-nodes-in-pairs/",
    description:
      "Given the head of a list, swap every two adjacent nodes and return the new head. You must rewire the nodes themselves rather than just swapping values. The playground uses array form for input and output.",
    examples: [
      { input: "head = [1,2,3,4]", output: "[2,1,4,3]" },
      { input: "head = [1,2,3]", output: "[2,1,3]" },
    ],
    constraints: ["0 ≤ list length ≤ 100", "0 ≤ Node.val ≤ 100"],
    intuition:
      "Process the list two nodes at a time from a stable predecessor. For each pair `(a, b)`, point the predecessor at `b`, hang `a` off `b`, and reconnect `a` to whatever followed `b`. A dummy node serves as the first predecessor, and a leftover odd node is simply left untouched.",
    approach: [
      "Create a dummy node before head; let `prev = dummy`.",
      "While `prev.next` and `prev.next.next` both exist, take a = prev.next, b = a.next.",
      "Rewire: a.next = b.next; b.next = a; prev.next = b.",
      "Advance prev to a and repeat; finally return dummy.next.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    solutions: [
      {
        language: "python",
        label: "Pointer rewiring",
        code: `class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def swap_pairs(head: ListNode | None) -> ListNode | None:
    dummy = ListNode(0, head)
    prev = dummy
    while prev.next and prev.next.next:
        a, b = prev.next, prev.next.next
        a.next = b.next
        b.next = a
        prev.next = b
        prev = a
    return dummy.next`,
      },
      {
        language: "typescript",
        label: "Pointer rewiring",
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function swapPairs(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  let prev: ListNode = dummy;
  while (prev.next && prev.next.next) {
    const a = prev.next, b = a.next!;
    a.next = b.next;
    b.next = a;
    prev.next = b;
    prev = a;
  }
  return dummy.next;
}`,
      },
    ],
    runner: {
      entry: "swapPairs",
      comparison: "deep",
      jsStarter: `function swapPairs(values) {
  // 'values' is the list as an array. Swap each adjacent pair of nodes.
  // TODO: implement
}`,
      jsReference: `function swapPairs(values) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  const dummy = { val: 0, next: head };
  let prev = dummy;
  while (prev.next && prev.next.next) {
    const a = prev.next, b = a.next;
    a.next = b.next;
    b.next = a;
    prev.next = b;
    prev = a;
  }
  const out = [];
  for (let n = dummy.next; n; n = n.next) out.push(n.val);
  return out;
}`,
    },
    tests: [
      { name: "even", args: [[1, 2, 3, 4]], expected: [2, 1, 4, 3] },
      { name: "empty", args: [[]], expected: [] },
      { name: "single", args: [[1]], expected: [1] },
      { name: "odd tail", args: [[1, 2, 3]], expected: [2, 1, 3] },
      { name: "five nodes", args: [[1, 2, 3, 4, 5]], expected: [2, 1, 4, 3, 5] },
    ],
    hints: ["Swap nodes, not values.", "A dummy head simplifies the first pair."],
    relatedIds: [25, 206, 92],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Trees
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 226,
    slug: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "google", "meta", "microsoft", "apple"],
    frequency: 79,
    leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/",
    description:
      "Given the root of a binary tree, mirror it so that the left and right child of every node are swapped, then return the root. The playground encodes the tree as a level-order array (with `null` for missing children) for both input and output.",
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
    ],
    constraints: ["0 ≤ number of nodes ≤ 100", "-100 ≤ Node.val ≤ 100"],
    intuition:
      "Mirroring a tree is the same problem applied to each subtree: swap a node's two children, then recursively invert each side. The recursion bottoms out at empty subtrees, and on the way back up the whole tree ends up reflected.",
    approach: [
      "If the node is null, return null.",
      "Recursively invert the left and right subtrees.",
      "Swap the (now-inverted) children.",
      "Return the node.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "h = tree height (recursion stack)." },
    solutions: [
      {
        language: "python",
        label: "DFS swap",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root: TreeNode | None) -> TreeNode | None:
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
      },
      {
        language: "typescript",
        label: "DFS swap",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  const left = invertTree(root.left);
  root.left = invertTree(root.right);
  root.right = left;
  return root;
}`,
      },
    ],
    runner: {
      entry: "invertTree",
      comparison: "deep",
      jsStarter: `function invertTree(level) {
  // 'level' is the tree as a LeetCode level-order array. Return the inverted tree
  // as a level-order array (null = missing child, trailing nulls trimmed).
  // TODO: implement
}`,
      jsReference: `function invertTree(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  function invert(n) { if (!n) return null; const t = n.left; n.left = invert(n.right); n.right = invert(t); return n; }
  function ser(root) {
    if (!root) return [];
    const out = [];
    const q = [root];
    while (q.length) {
      const n = q.shift();
      if (n) { out.push(n.val); q.push(n.left); q.push(n.right); }
      else out.push(null);
    }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  return ser(invert(build(level)));
}`,
    },
    tests: [
      { name: "full tree", args: [[4, 2, 7, 1, 3, 6, 9]], expected: [4, 7, 2, 9, 6, 3, 1] },
      { name: "tiny", args: [[2, 1, 3]], expected: [2, 3, 1] },
      { name: "empty", args: [[]], expected: [] },
      { name: "single", args: [[1]], expected: [1] },
    ],
    hints: ["Invert is recursive mirroring.", "Swap children, then recurse (or recurse, then swap)."],
    relatedIds: [104, 100, 101],
  },
  {
    id: 100,
    slug: "same-tree",
    title: "Same Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "google", "microsoft", "apple", "bloomberg"],
    frequency: 68,
    leetcodeUrl: "https://leetcode.com/problems/same-tree/",
    description:
      "Given the roots of two binary trees, return `true` if they are structurally identical and every corresponding node holds the same value. The playground passes each tree as a level-order array.",
    examples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
      { input: "p = [1,2], q = [1,null,2]", output: "false" },
    ],
    constraints: ["0 ≤ nodes in each tree ≤ 100", "-10^4 ≤ Node.val ≤ 10^4"],
    intuition:
      "Two trees are the same exactly when their roots match and their left subtrees match and their right subtrees match — a definition that translates directly into recursion. Empty matches empty; one empty and one not means they differ; otherwise compare values and recurse on both sides.",
    approach: [
      "If both nodes are null, return true.",
      "If exactly one is null, or values differ, return false.",
      "Recurse on the left pair and the right pair.",
      "Return the AND of both recursive results.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "n = nodes in the smaller tree before a mismatch." },
    solutions: [
      {
        language: "python",
        label: "DFS compare",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_same_tree(p: TreeNode | None, q: TreeNode | None) -> bool:
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)`,
      },
      {
        language: "typescript",
        label: "DFS compare",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
      },
    ],
    runner: {
      entry: "isSameTree",
      comparison: "deep",
      jsStarter: `function isSameTree(p, q) {
  // 'p' and 'q' are trees as LeetCode level-order arrays. Return true if identical.
  // TODO: implement
}`,
      jsReference: `function isSameTree(p, q) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const queue = [root];
    let i = 1;
    while (queue.length && i < arr.length) {
      const node = queue.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; queue.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; queue.push(node.right); } }
    }
    return root;
  }
  function same(a, b) {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return same(a.left, b.left) && same(a.right, b.right);
  }
  return same(build(p), build(q));
}`,
    },
    tests: [
      { name: "identical", args: [[1, 2, 3], [1, 2, 3]], expected: true },
      { name: "shape differs", args: [[1, 2], [1, null, 2]], expected: false },
      { name: "values differ", args: [[1, 2, 1], [1, 1, 2]], expected: false },
      { name: "both empty", args: [[], []], expected: true },
      { name: "one empty", args: [[1], []], expected: false },
    ],
    hints: ["Compare roots, then both subtrees.", "Mismatched null-ness means different shape."],
    relatedIds: [101, 226, 572],
  },
  {
    id: 110,
    slug: "balanced-binary-tree",
    title: "Balanced Binary Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Postorder"],
    companies: ["amazon", "google", "microsoft", "apple", "adobe"],
    frequency: 65,
    leetcodeUrl: "https://leetcode.com/problems/balanced-binary-tree/",
    description:
      "Given the root of a binary tree, return `true` if it is height-balanced — meaning for every node the heights of its two subtrees differ by at most one. The playground encodes the tree as a level-order array.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "true" },
      { input: "root = [1,2,2,3,3,null,null,4,4]", output: "false" },
    ],
    constraints: ["0 ≤ number of nodes ≤ 5000", "-10^4 ≤ Node.val ≤ 10^4"],
    intuition:
      "Computing each node's height separately is wasteful. Instead, fold the balance check into a single post-order height computation: each call returns the subtree height, but short-circuits to a sentinel (-1) the moment any subtree is found unbalanced, which then propagates straight to the root.",
    approach: [
      "Define a helper that returns the height of a subtree, or -1 if it (or anything below) is unbalanced.",
      "Recurse left; if it returns -1, bubble -1 up.",
      "Recurse right; if -1 or the heights differ by more than 1, return -1.",
      "Otherwise return 1 + max(left, right); the tree is balanced iff the root call is not -1.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Single post-order pass." },
    solutions: [
      {
        language: "python",
        label: "Post-order height",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_balanced(root: TreeNode | None) -> bool:
    def height(node: TreeNode | None) -> int:
        if not node:
            return 0
        lh = height(node.left)
        if lh == -1:
            return -1
        rh = height(node.right)
        if rh == -1 or abs(lh - rh) > 1:
            return -1
        return 1 + max(lh, rh)
    return height(root) != -1`,
      },
      {
        language: "typescript",
        label: "Post-order height",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function isBalanced(root: TreeNode | null): boolean {
  function height(node: TreeNode | null): number {
    if (!node) return 0;
    const lh = height(node.left);
    if (lh === -1) return -1;
    const rh = height(node.right);
    if (rh === -1 || Math.abs(lh - rh) > 1) return -1;
    return 1 + Math.max(lh, rh);
  }
  return height(root) !== -1;
}`,
      },
    ],
    runner: {
      entry: "isBalanced",
      comparison: "deep",
      jsStarter: `function isBalanced(level) {
  // 'level' is the tree as a LeetCode level-order array. Return true if balanced.
  // TODO: implement
}`,
      jsReference: `function isBalanced(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  function height(n) {
    if (!n) return 0;
    const lh = height(n.left);
    if (lh === -1) return -1;
    const rh = height(n.right);
    if (rh === -1 || Math.abs(lh - rh) > 1) return -1;
    return 1 + Math.max(lh, rh);
  }
  return height(build(level)) !== -1;
}`,
    },
    tests: [
      { name: "balanced", args: [[3, 9, 20, null, null, 15, 7]], expected: true },
      { name: "unbalanced", args: [[1, 2, 2, 3, 3, null, null, 4, 4]], expected: false },
      { name: "empty", args: [[]], expected: true },
      { name: "single", args: [[1]], expected: true },
    ],
    hints: ["Return height and a sentinel together.", "-1 means 'already unbalanced'."],
    relatedIds: [104, 543, 111],
  },
  {
    id: 543,
    slug: "diameter-of-binary-tree",
    title: "Diameter of Binary Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Postorder"],
    companies: ["amazon", "meta", "google", "microsoft", "apple"],
    frequency: 74,
    leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/",
    description:
      "Given the root of a binary tree, return its diameter: the number of edges on the longest path between any two nodes. The path need not pass through the root. The playground encodes the tree as a level-order array.",
    examples: [
      { input: "root = [1,2,3,4,5]", output: "3", explanation: "The path 4 → 2 → 1 → 3 has 3 edges." },
      { input: "root = [1,2]", output: "1" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 10^4", "-100 ≤ Node.val ≤ 100"],
    intuition:
      "The longest path that bends at a given node spans its left height plus its right height (in edges). So a single post-order traversal that returns each subtree's height can, at every node, update a running best of left + right — the maximum seen anywhere is the diameter.",
    approach: [
      "Keep a `best` counter initialized to 0.",
      "Define depth(node) returning the height in edges (null → 0).",
      "At each node, update best = max(best, leftDepth + rightDepth).",
      "Return 1 + max(leftDepth, rightDepth); after the traversal, best is the answer.",
    ],
    complexity: { time: "O(n)", space: "O(h)" },
    solutions: [
      {
        language: "python",
        label: "Height + running max",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def diameter_of_binary_tree(root: TreeNode | None) -> int:
    best = 0
    def depth(node: TreeNode | None) -> int:
        nonlocal best
        if not node:
            return 0
        left = depth(node.left)
        right = depth(node.right)
        best = max(best, left + right)
        return 1 + max(left, right)
    depth(root)
    return best`,
      },
      {
        language: "typescript",
        label: "Height + running max",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  let best = 0;
  function depth(node: TreeNode | null): number {
    if (!node) return 0;
    const left = depth(node.left);
    const right = depth(node.right);
    best = Math.max(best, left + right);
    return 1 + Math.max(left, right);
  }
  depth(root);
  return best;
}`,
      },
    ],
    runner: {
      entry: "diameterOfBinaryTree",
      comparison: "deep",
      jsStarter: `function diameterOfBinaryTree(level) {
  // 'level' is the tree as a LeetCode level-order array. Return the diameter in edges.
  // TODO: implement
}`,
      jsReference: `function diameterOfBinaryTree(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  let best = 0;
  function depth(n) {
    if (!n) return 0;
    const left = depth(n.left);
    const right = depth(n.right);
    best = Math.max(best, left + right);
    return 1 + Math.max(left, right);
  }
  depth(build(level));
  return best;
}`,
    },
    tests: [
      { name: "bend at root", args: [[1, 2, 3, 4, 5]], expected: 3 },
      { name: "two nodes", args: [[1, 2]], expected: 1 },
      { name: "single", args: [[1]], expected: 0 },
      { name: "empty", args: [[]], expected: 0 },
      { name: "off-center path", args: [[1, 2, 3, 4, 5, null, null, 6]], expected: 4 },
    ],
    hints: ["Diameter at a node = left height + right height.", "Track a global max during a height DFS."],
    relatedIds: [104, 110, 124],
  },
  {
    id: 102,
    slug: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BFS", "Queue"],
    companies: ["amazon", "microsoft", "meta", "google", "apple", "bloomberg"],
    frequency: 82,
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    description:
      "Given the root of a binary tree, return its values grouped by depth: a list of lists where the i-th list holds the nodes at level i, read left to right. The playground encodes the tree as a level-order array and expects a 2-D array back.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "root = []", output: "[]" },
    ],
    constraints: ["0 ≤ number of nodes ≤ 2000", "-1000 ≤ Node.val ≤ 1000"],
    intuition:
      "Breadth-first search naturally visits a tree level by level. Process the queue one full level at a time: record the current frontier's values, then replace the queue with all of their children. Each iteration of the outer loop produces exactly one output row.",
    approach: [
      "If the tree is empty, return an empty list.",
      "Seed a queue with the root.",
      "While the queue is non-empty, snapshot its size as the current level, collect those values, and enqueue their children.",
      "Append each level's values to the result.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Queue holds at most one level (up to ~n/2 nodes)." },
    solutions: [
      {
        language: "python",
        label: "BFS by level",
        code: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root: TreeNode | None) -> list[list[int]]:
    if not root:
        return []
    res, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(level)
    return res`,
      },
      {
        language: "typescript",
        label: "BFS by level",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const res: number[][] = [];
  let queue: TreeNode[] = [root];
  while (queue.length) {
    const level: number[] = [];
    const next: TreeNode[] = [];
    for (const node of queue) {
      level.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(level);
    queue = next;
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "levelOrder",
      comparison: "deep",
      jsStarter: `function levelOrder(level) {
  // 'level' is the tree as a LeetCode level-order array. Return values grouped by depth.
  // TODO: implement
}`,
      jsReference: `function levelOrder(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  const root = build(level);
  if (!root) return [];
  const res = [];
  let queue = [root];
  while (queue.length) {
    const row = [];
    const next = [];
    for (const node of queue) {
      row.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(row);
    queue = next;
  }
  return res;
}`,
    },
    tests: [
      { name: "three levels", args: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [9, 20], [15, 7]] },
      { name: "single", args: [[1]], expected: [[1]] },
      { name: "empty", args: [[]], expected: [] },
      { name: "perfect tree", args: [[1, 2, 3, 4, 5, 6, 7]], expected: [[1], [2, 3], [4, 5, 6, 7]] },
    ],
    hints: ["Process the queue one level at a time.", "Snapshot the level size before expanding."],
    relatedIds: [107, 103, 199],
  },
  {
    id: 98,
    slug: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Range Bounds"],
    companies: ["amazon", "meta", "microsoft", "google", "apple", "bloomberg"],
    frequency: 84,
    leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
    description:
      "Given the root of a binary tree, decide whether it is a valid binary search tree: every node's value must be greater than all values in its left subtree and less than all values in its right subtree. The playground encodes the tree as a level-order array.",
    examples: [
      { input: "root = [2,1,3]", output: "true" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "4's subtree contains 3, which is less than the root 5." },
    ],
    constraints: ["1 ≤ number of nodes ≤ 10^4", "-2^31 ≤ Node.val ≤ 2^31 − 1"],
    intuition:
      "Checking only a node against its immediate children is not enough — a deep descendant can still violate the order. Instead, carry an open interval (low, high) down the recursion: each node must lie strictly inside it, and recursing left tightens the upper bound to the node's value while recursing right tightens the lower bound.",
    approach: [
      "Recurse with bounds (low, high), starting at (-∞, +∞).",
      "A null node is valid.",
      "If the node's value is not strictly between low and high, return false.",
      "Recurse left with (low, node.val) and right with (node.val, high).",
    ],
    complexity: { time: "O(n)", space: "O(h)" },
    solutions: [
      {
        language: "python",
        label: "Range bounds",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root: TreeNode | None) -> bool:
    def valid(node, low, high):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return valid(node.left, low, node.val) and valid(node.right, node.val, high)
    return valid(root, float("-inf"), float("inf"))`,
      },
      {
        language: "typescript",
        label: "Range bounds",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function isValidBST(root: TreeNode | null): boolean {
  function valid(node: TreeNode | null, low: number, high: number): boolean {
    if (!node) return true;
    if (!(node.val > low && node.val < high)) return false;
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
  }
  return valid(root, -Infinity, Infinity);
}`,
      },
    ],
    runner: {
      entry: "isValidBST",
      comparison: "deep",
      jsStarter: `function isValidBST(level) {
  // 'level' is the tree as a LeetCode level-order array. Return true if it is a valid BST.
  // TODO: implement
}`,
      jsReference: `function isValidBST(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  function valid(node, low, high) {
    if (!node) return true;
    if (!(node.val > low && node.val < high)) return false;
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
  }
  return valid(build(level), -Infinity, Infinity);
}`,
    },
    tests: [
      { name: "valid tiny", args: [[2, 1, 3]], expected: true },
      { name: "deep violation", args: [[5, 1, 4, null, null, 3, 6]], expected: false },
      { name: "single", args: [[1]], expected: true },
      { name: "equal not allowed", args: [[2, 2, 2]], expected: false },
      { name: "valid perfect", args: [[3, 1, 5, 0, 2, 4, 6]], expected: true },
    ],
    hints: ["Children alone aren't enough — pass bounds down.", "Left shrinks the max; right raises the min."],
    relatedIds: [230, 235, 700],
  },
  {
    id: 230,
    slug: "kth-smallest-element-in-a-bst",
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    category: "trees",
    patterns: ["Inorder Traversal", "DFS"],
    companies: ["amazon", "google", "meta", "microsoft", "uber"],
    frequency: 77,
    leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    description:
      "Given the root of a binary search tree and an integer `k`, return the k-th smallest value (1-indexed). The playground encodes the tree as a level-order array.",
    examples: [
      { input: "root = [3,1,4,null,2], k = 1", output: "1" },
      { input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3" },
    ],
    constraints: ["1 ≤ k ≤ number of nodes ≤ 10^4", "0 ≤ Node.val ≤ 10^4"],
    intuition:
      "An in-order traversal of a BST visits values in sorted ascending order. So the k-th node you encounter in-order is exactly the k-th smallest — collect values left-to-root-right and read off index k − 1 (or stop early once you've seen k of them).",
    approach: [
      "Traverse the BST in-order (left, node, right).",
      "Append each visited value to a list.",
      "After visiting, return the element at index k − 1.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "O(h + k) if you stop early." },
    solutions: [
      {
        language: "python",
        label: "Inorder",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def kth_smallest(root: TreeNode | None, k: int) -> int:
    order: list[int] = []
    def inorder(node):
        if not node or len(order) >= k:
            return
        inorder(node.left)
        order.append(node.val)
        inorder(node.right)
    inorder(root)
    return order[k - 1]`,
      },
      {
        language: "typescript",
        label: "Inorder",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function kthSmallest(root: TreeNode | null, k: number): number {
  const order: number[] = [];
  function inorder(node: TreeNode | null): void {
    if (!node || order.length >= k) return;
    inorder(node.left);
    order.push(node.val);
    inorder(node.right);
  }
  inorder(root);
  return order[k - 1];
}`,
      },
    ],
    runner: {
      entry: "kthSmallest",
      comparison: "deep",
      jsStarter: `function kthSmallest(level, k) {
  // 'level' is the BST as a LeetCode level-order array. Return the kth smallest value.
  // TODO: implement
}`,
      jsReference: `function kthSmallest(level, k) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  const order = [];
  function inorder(node) {
    if (!node || order.length >= k) return;
    inorder(node.left);
    order.push(node.val);
    inorder(node.right);
  }
  inorder(build(level));
  return order[k - 1];
}`,
    },
    tests: [
      { name: "first", args: [[3, 1, 4, null, 2], 1], expected: 1 },
      { name: "third", args: [[5, 3, 6, 2, 4, null, null, 1], 3], expected: 3 },
      { name: "single", args: [[1], 1], expected: 1 },
      { name: "largest", args: [[3, 1, 4, null, 2], 4], expected: 4 },
      { name: "middle", args: [[2, 1, 3], 2], expected: 2 },
    ],
    hints: ["Inorder of a BST is sorted.", "The kth visited node is the answer."],
    relatedIds: [98, 94, 173],
  },
  {
    id: 235,
    slug: "lowest-common-ancestor-of-a-binary-search-tree",
    title: "Lowest Common Ancestor of a Binary Search Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BST", "Binary Search"],
    companies: ["amazon", "meta", "microsoft", "google", "apple", "linkedin"],
    frequency: 76,
    leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    description:
      "Given a binary search tree and two values `p` and `q` present in it, return the value of their lowest common ancestor — the deepest node that has both as descendants (a node can be its own ancestor). The playground passes the tree as a level-order array plus the two values.",
    examples: [
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6" },
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", output: "2" },
    ],
    constraints: ["2 ≤ number of nodes ≤ 10^5", "All Node.val are unique", "p and q both exist in the tree."],
    intuition:
      "The BST ordering tells you which way to walk: if both targets are larger than the current node, the answer lies entirely in the right subtree; if both are smaller, go left. The first node where the two values fall on opposite sides (or one equals the node) is the split point — the lowest common ancestor.",
    approach: [
      "Start at the root.",
      "If both p and q exceed node.val, move right.",
      "If both are below node.val, move left.",
      "Otherwise the current node is the LCA; return its value.",
    ],
    complexity: { time: "O(h)", space: "O(1)", note: "h = tree height; no recursion needed." },
    solutions: [
      {
        language: "python",
        label: "BST walk",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowest_common_ancestor(root: TreeNode, p: int, q: int) -> int:
    node = root
    while node:
        if p > node.val and q > node.val:
            node = node.right
        elif p < node.val and q < node.val:
            node = node.left
        else:
            return node.val
    return -1`,
      },
      {
        language: "typescript",
        label: "BST walk",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function lowestCommonAncestor(root: TreeNode | null, p: number, q: number): number {
  let node = root;
  while (node) {
    if (p > node.val && q > node.val) node = node.right;
    else if (p < node.val && q < node.val) node = node.left;
    else return node.val;
  }
  return -1;
}`,
      },
    ],
    runner: {
      entry: "lowestCommonAncestor",
      comparison: "deep",
      jsStarter: `function lowestCommonAncestor(level, p, q) {
  // 'level' is the BST as a LeetCode level-order array. Return the LCA's value.
  // TODO: implement
}`,
      jsReference: `function lowestCommonAncestor(level, p, q) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const queue = [root];
    let i = 1;
    while (queue.length && i < arr.length) {
      const node = queue.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; queue.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; queue.push(node.right); } }
    }
    return root;
  }
  let node = build(level);
  while (node) {
    if (p > node.val && q > node.val) node = node.right;
    else if (p < node.val && q < node.val) node = node.left;
    else return node.val;
  }
  return -1;
}`,
    },
    tests: [
      { name: "split at root", args: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8], expected: 6 },
      { name: "ancestor is p", args: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4], expected: 2 },
      { name: "tiny split", args: [[2, 1, 3], 1, 3], expected: 2 },
      { name: "left subtree", args: [[5, 3, 6, 2, 4], 2, 4], expected: 3 },
      { name: "parent and child", args: [[2, 1], 2, 1], expected: 2 },
    ],
    hints: ["Use the BST ordering to pick a direction.", "The split point is the LCA."],
    relatedIds: [236, 98, 1650],
  },
  {
    id: 112,
    slug: "path-sum",
    title: "Path Sum",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "microsoft", "apple", "bloomberg"],
    frequency: 62,
    leetcodeUrl: "https://leetcode.com/problems/path-sum/",
    description:
      "Given the root of a binary tree and a target sum, return `true` if some root-to-leaf path has node values that add up to the target. The playground encodes the tree as a level-order array.",
    examples: [
      { input: "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], target = 22", output: "true", explanation: "5 → 4 → 11 → 2 sums to 22." },
      { input: "root = [1,2,3], target = 5", output: "false" },
    ],
    constraints: ["0 ≤ number of nodes ≤ 5000", "-1000 ≤ Node.val ≤ 1000", "-1000 ≤ target ≤ 1000"],
    intuition:
      "Subtract the current node's value from the target as you descend, which turns the question into 'does a subtree have a root-to-leaf path summing to the remaining amount?'. You've found a path exactly when you reach a leaf and the remaining amount equals that leaf's value.",
    approach: [
      "If the node is null, return false (an empty tree has no path).",
      "If the node is a leaf, return whether its value equals the remaining target.",
      "Otherwise recurse into both children with target − node.val.",
      "Return true if either side succeeds.",
    ],
    complexity: { time: "O(n)", space: "O(h)" },
    solutions: [
      {
        language: "python",
        label: "DFS subtract",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def has_path_sum(root: TreeNode | None, target: int) -> bool:
    if not root:
        return False
    if not root.left and not root.right:
        return target == root.val
    rem = target - root.val
    return has_path_sum(root.left, rem) or has_path_sum(root.right, rem)`,
      },
      {
        language: "typescript",
        label: "DFS subtract",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function hasPathSum(root: TreeNode | null, target: number): boolean {
  if (!root) return false;
  if (!root.left && !root.right) return target === root.val;
  const rem = target - root.val;
  return hasPathSum(root.left, rem) || hasPathSum(root.right, rem);
}`,
      },
    ],
    runner: {
      entry: "hasPathSum",
      comparison: "deep",
      jsStarter: `function hasPathSum(level, target) {
  // 'level' is the tree as a LeetCode level-order array. Return true if a root-to-leaf path sums to target.
  // TODO: implement
}`,
      jsReference: `function hasPathSum(level, target) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  function dfs(n, rem) {
    if (!n) return false;
    if (!n.left && !n.right) return rem === n.val;
    return dfs(n.left, rem - n.val) || dfs(n.right, rem - n.val);
  }
  return dfs(build(level), target);
}`,
    },
    tests: [
      { name: "path exists", args: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], 22], expected: true },
      { name: "no path", args: [[1, 2, 3], 5], expected: false },
      { name: "empty tree", args: [[], 0], expected: false },
      { name: "short path", args: [[1, 2], 1], expected: false },
      { name: "leaf match", args: [[1, 2, 3], 4], expected: true },
    ],
    hints: ["Subtract values as you go down.", "Only check the sum at a leaf."],
    relatedIds: [113, 124, 437],
  },
  {
    id: 572,
    slug: "subtree-of-another-tree",
    title: "Subtree of Another Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Tree Matching"],
    companies: ["amazon", "meta", "microsoft", "google", "apple"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/subtree-of-another-tree/",
    description:
      "Given the roots of two trees `root` and `subRoot`, return `true` if `subRoot` appears as a subtree of `root` — that is, some node of `root` together with all its descendants is identical to `subRoot`. The playground passes both trees as level-order arrays.",
    examples: [
      { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" },
      { input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]", output: "false" },
    ],
    constraints: ["1 ≤ nodes in root ≤ 2000", "1 ≤ nodes in subRoot ≤ 1000", "-10^4 ≤ Node.val ≤ 10^4"],
    intuition:
      "Try to anchor the candidate at every node of the big tree: at each one, ask whether the subtree rooted there is an exact match for `subRoot` using the same-tree comparison. If any anchor matches, you're done; otherwise recurse into the children.",
    approach: [
      "Define `same(a, b)` that checks two trees are structurally and value-wise identical.",
      "Define `contains(node, sub)`: an empty sub trivially matches, a null node can't, and otherwise succeed if `same(node, sub)` or either child contains it.",
      "Return contains(root, subRoot).",
    ],
    complexity: { time: "O(m · n)", space: "O(h)", note: "m, n = node counts; each anchor may run a full compare." },
    solutions: [
      {
        language: "python",
        label: "DFS + same-tree",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_subtree(root: TreeNode | None, sub_root: TreeNode | None) -> bool:
    def same(a, b):
        if not a and not b:
            return True
        if not a or not b or a.val != b.val:
            return False
        return same(a.left, b.left) and same(a.right, b.right)
    def contains(node, sub):
        if not sub:
            return True
        if not node:
            return False
        return same(node, sub) or contains(node.left, sub) or contains(node.right, sub)
    return contains(root, sub_root)`,
      },
      {
        language: "typescript",
        label: "DFS + same-tree",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  function same(a: TreeNode | null, b: TreeNode | null): boolean {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return same(a.left, b.left) && same(a.right, b.right);
  }
  function contains(node: TreeNode | null, sub: TreeNode | null): boolean {
    if (!sub) return true;
    if (!node) return false;
    return same(node, sub) || contains(node.left, sub) || contains(node.right, sub);
  }
  return contains(root, subRoot);
}`,
      },
    ],
    runner: {
      entry: "isSubtree",
      comparison: "deep",
      jsStarter: `function isSubtree(root, subRoot) {
  // Both args are trees as LeetCode level-order arrays. Return true if subRoot is a subtree of root.
  // TODO: implement
}`,
      jsReference: `function isSubtree(root, subRoot) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const r = { val: arr[0], left: null, right: null };
    const q = [r];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return r;
  }
  function same(a, b) {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return same(a.left, b.left) && same(a.right, b.right);
  }
  function contains(node, sub) {
    if (!sub) return true;
    if (!node) return false;
    return same(node, sub) || contains(node.left, sub) || contains(node.right, sub);
  }
  return contains(build(root), build(subRoot));
}`,
    },
    tests: [
      { name: "is subtree", args: [[3, 4, 5, 1, 2], [4, 1, 2]], expected: true },
      { name: "extra node", args: [[3, 4, 5, 1, 2, null, null, null, null, 0], [4, 1, 2]], expected: false },
      { name: "leaf subtree", args: [[1, 1], [1]], expected: true },
      { name: "absent value", args: [[1, 2, 3], [4]], expected: false },
      { name: "wrong root", args: [[3, 4, 5, 1, 2], [3, 1, 2]], expected: false },
    ],
    hints: ["Anchor the candidate at every node.", "Reuse a strict same-tree check."],
    relatedIds: [100, 101, 208],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Heap / Priority Queue
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 703,
    slug: "kth-largest-element-in-a-stream",
    title: "Kth Largest Element in a Stream",
    difficulty: "Easy",
    category: "heap-priority-queue",
    patterns: ["Heap", "Design"],
    companies: ["amazon", "meta", "google", "microsoft", "apple"],
    frequency: 67,
    leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
    description:
      "Design a class that tracks the k-th largest value in a growing stream of numbers. The constructor takes `k` and an initial array; each `add(val)` inserts a number and returns the current k-th largest. The playground replays an operation list and grades the returned results (`null` for the constructor).",
    examples: [
      {
        input: 'ops = ["KthLargest","add","add","add","add","add"], args = [[3,[4,5,8,2]],[3],[5],[10],[9],[4]]',
        output: "[null,4,5,5,8,8]",
      },
    ],
    constraints: ["1 ≤ k ≤ 10^4", "0 ≤ initial length ≤ 10^4", "At most 10^4 calls to add", "There are always at least k elements when add returns."],
    intuition:
      "You never need the whole stream sorted — only the k largest values matter, and among those the smallest is the answer. A min-heap capped at size k keeps exactly those k values, so every `add` pushes the new number, evicts the minimum if the heap grew past k, and reports the root in logarithmic time.",
    approach: [
      "On construction, push all initial numbers into a min-heap, popping whenever its size exceeds k.",
      "On add(val): push val, then pop the smallest if size > k.",
      "Return the heap's root, which is the k-th largest seen so far.",
    ],
    complexity: { time: "O(log k) per add", space: "O(k)", note: "Reference uses a sort for clarity; a heap is the optimal structure." },
    solutions: [
      {
        language: "python",
        label: "Min-heap size k",
        code: `import heapq

class KthLargest:
    def __init__(self, k: int, nums: list[int]):
        self.k = k
        self.heap = nums[:]
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val: int) -> int:
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]`,
      },
      {
        language: "typescript",
        label: "Sorted insert (clear)",
        code: `class KthLargest {
  private k: number;
  private nums: number[];

  constructor(k: number, nums: number[]) {
    this.k = k;
    this.nums = [...nums].sort((a, b) => a - b);
  }

  add(val: number): number {
    // Insert keeping ascending order; the kth largest sits k from the end.
    let i = this.nums.length;
    this.nums.push(val);
    while (i > 0 && this.nums[i - 1] > val) {
      this.nums[i] = this.nums[i - 1];
      i--;
    }
    this.nums[i] = val;
    return this.nums[this.nums.length - this.k];
  }
}`,
      },
    ],
    runner: {
      entry: "runKthLargest",
      comparison: "deep",
      jsStarter: `function runKthLargest(ops, args) {
  // Replay the operations. "KthLargest" returns null; each "add" returns the current kth largest.
  // TODO: implement the class and the driver loop.
}`,
      jsReference: `function runKthLargest(ops, args) {
  const out = [];
  let k = 0;
  let pool = [];
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i] || [];
    if (op === "KthLargest") {
      k = a[0];
      pool = [...(a[1] || [])];
      out.push(null);
    } else if (op === "add") {
      pool.push(a[0]);
      const sorted = [...pool].sort((x, y) => y - x);
      out.push(sorted[k - 1]);
    }
  }
  return out;
}`,
    },
    tests: [
      {
        name: "k=3 stream",
        args: [
          ["KthLargest", "add", "add", "add", "add", "add"],
          [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]],
        ],
        expected: [null, 4, 5, 5, 8, 8],
      },
      {
        name: "k=1 negatives",
        args: [
          ["KthLargest", "add", "add"],
          [[1, []], [-1], [-2]],
        ],
        expected: [null, -1, -1],
      },
      {
        name: "k=2 from one",
        args: [
          ["KthLargest", "add", "add", "add"],
          [[2, [0]], [-1], [1], [-2]],
        ],
        expected: [null, -1, 0, 0],
      },
    ],
    hints: ["Only the k largest matter.", "A size-k min-heap's root is the kth largest."],
    relatedIds: [215, 347, 973],
  },
  {
    id: 1046,
    slug: "last-stone-weight",
    title: "Last Stone Weight",
    difficulty: "Easy",
    category: "heap-priority-queue",
    patterns: ["Heap", "Simulation"],
    companies: ["amazon", "google", "microsoft", "apple"],
    frequency: 61,
    leetcodeUrl: "https://leetcode.com/problems/last-stone-weight/",
    description:
      "Given an array of stone weights, repeatedly smash the two heaviest stones together: if they are equal both are destroyed, otherwise the lighter is destroyed and the heavier shrinks by the lighter's weight. Return the weight of the last remaining stone, or 0 if none remain.",
    examples: [
      { input: "stones = [2,7,4,1,8,1]", output: "1" },
      { input: "stones = [2,2]", output: "0" },
    ],
    constraints: ["1 ≤ stones.length ≤ 30", "1 ≤ stones[i] ≤ 1000"],
    intuition:
      "Each round you need the two current largest weights, which a max-heap gives in logarithmic time. Pop the top two, push back their difference when it's non-zero, and repeat until at most one stone is left — its weight (or 0) is the answer.",
    approach: [
      "Build a max-heap of all stone weights.",
      "While more than one stone remains, pop the two heaviest.",
      "If they differ, push their difference back.",
      "Return the remaining stone's weight, or 0 if the heap is empty.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)", note: "Reference re-sorts each round for clarity; a heap is optimal." },
    solutions: [
      {
        language: "python",
        label: "Max-heap (negated)",
        code: `import heapq

def last_stone_weight(stones: list[int]) -> int:
    heap = [-s for s in stones]
    heapq.heapify(heap)
    while len(heap) > 1:
        y = -heapq.heappop(heap)
        x = -heapq.heappop(heap)
        if y != x:
            heapq.heappush(heap, -(y - x))
    return -heap[0] if heap else 0`,
      },
      {
        language: "typescript",
        label: "Sort each round (clear)",
        code: `function lastStoneWeight(stones: number[]): number {
  const arr = [...stones];
  while (arr.length > 1) {
    arr.sort((a, b) => a - b);
    const y = arr.pop()!;
    const x = arr.pop()!;
    if (y !== x) arr.push(y - x);
  }
  return arr.length ? arr[0] : 0;
}`,
      },
    ],
    runner: {
      entry: "lastStoneWeight",
      comparison: "deep",
      jsStarter: `function lastStoneWeight(stones) {
  // Smash the two heaviest stones repeatedly. Return the last weight, or 0.
  // TODO: implement
}`,
      jsReference: `function lastStoneWeight(stones) {
  const arr = [...stones];
  while (arr.length > 1) {
    arr.sort((a, b) => a - b);
    const y = arr.pop();
    const x = arr.pop();
    if (y !== x) arr.push(y - x);
  }
  return arr.length ? arr[0] : 0;
}`,
    },
    tests: [
      { name: "classic", args: [[2, 7, 4, 1, 8, 1]], expected: 1 },
      { name: "single", args: [[1]], expected: 1 },
      { name: "cancel out", args: [[2, 2]], expected: 0 },
      { name: "three stones", args: [[3, 7, 2]], expected: 2 },
      { name: "pair plus pair", args: [[10, 4, 2, 10]], expected: 2 },
    ],
    hints: ["You need the two largest each round.", "Push back only a non-zero difference."],
    relatedIds: [215, 703, 1962],
  },
  {
    id: 973,
    slug: "k-closest-points-to-origin",
    title: "K Closest Points to Origin",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Heap", "Quickselect", "Sorting"],
    companies: ["amazon", "meta", "google", "microsoft", "apple", "uber"],
    frequency: 81,
    leetcodeUrl: "https://leetcode.com/problems/k-closest-points-to-origin/",
    description:
      "Given an array of points on the plane and an integer `k`, return the `k` points nearest the origin (0, 0) by Euclidean distance. The points may be returned in any order. Since distance is monotonic in the squared distance, you can compare x² + y² and skip the square root.",
    examples: [
      { input: "points = [[1,3],[-2,2]], k = 1", output: "[[-2,2]]", explanation: "(-2,2) has squared distance 8 vs 10 for (1,3)." },
      { input: "points = [[3,3],[5,-1],[-2,4]], k = 2", output: "[[3,3],[-2,4]]" },
    ],
    constraints: ["1 ≤ k ≤ points.length ≤ 10^4", "-10^4 ≤ xi, yi ≤ 10^4"],
    intuition:
      "Ranking by actual distance is unnecessary — squared distance x² + y² preserves the same order and avoids floating point. Sort the points by that key (or keep a size-k max-heap, or run Quickselect for O(n) average) and take the first k. Order within the answer doesn't matter.",
    approach: [
      "Compute each point's squared distance x² + y².",
      "Sort the points ascending by that value (or use a size-k heap / Quickselect).",
      "Return the first k points.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)", note: "Heap gives O(n log k); Quickselect O(n) average." },
    solutions: [
      {
        language: "python",
        label: "Sort by squared distance",
        code: `def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    return sorted(points, key=lambda p: p[0] * p[0] + p[1] * p[1])[:k]`,
      },
      {
        language: "typescript",
        label: "Sort by squared distance",
        code: `function kClosest(points: number[][], k: number): number[][] {
  return [...points]
    .sort((a, b) => a[0] * a[0] + a[1] * a[1] - (b[0] * b[0] + b[1] * b[1]))
    .slice(0, k);
}`,
      },
    ],
    runner: {
      entry: "kClosest",
      comparison: "canonical",
      jsStarter: `function kClosest(points, k) {
  // Return the k points nearest the origin (any order).
  // TODO: implement
}`,
      jsReference: `function kClosest(points, k) {
  return [...points]
    .sort((a, b) => (a[0] * a[0] + a[1] * a[1]) - (b[0] * b[0] + b[1] * b[1]))
    .slice(0, k);
}`,
    },
    tests: [
      { name: "single closest", args: [[[1, 3], [-2, 2]], 1], expected: [[-2, 2]] },
      { name: "two of three", args: [[[3, 3], [5, -1], [-2, 4]], 2], expected: [[3, 3], [-2, 4]] },
      { name: "one point", args: [[[1, 1]], 1], expected: [[1, 1]] },
      { name: "tie pair", args: [[[1, 2], [2, 1], [3, 3]], 2], expected: [[1, 2], [2, 1]] },
    ],
    hints: ["Compare squared distance, not distance.", "Order in the answer is unconstrained."],
    relatedIds: [215, 347, 692],
  },
];

export default batchC;
