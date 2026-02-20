// LeetCode 92 — Reverse Linked List II (Medium)
// Category: Linked List · Approach: Head insertion
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/reverse-linked-list-ii/

class ListNode {
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
}
