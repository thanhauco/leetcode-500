// LeetCode 24 — Swap Nodes in Pairs (Medium)
// Category: Linked List · Approach: Pointer rewiring
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/swap-nodes-in-pairs/

class ListNode {
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
}
