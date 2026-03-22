// LeetCode 142 — Linked List Cycle II (Medium)
// Category: Linked List · Approach: Floyd's two-phase
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/linked-list-cycle-ii/

class ListNode {
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
}
