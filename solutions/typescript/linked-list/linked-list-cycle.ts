// LeetCode 141 — Linked List Cycle (Easy)
// Category: Linked List · Approach: Floyd's cycle detection
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/linked-list-cycle/

class ListNode {
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
}
