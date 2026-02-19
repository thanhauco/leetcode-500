// LeetCode 86 — Partition List (Medium)
// Category: Linked List · Approach: Two chains
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/partition-list/

class ListNode {
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
}
