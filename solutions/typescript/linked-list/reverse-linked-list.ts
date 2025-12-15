// LeetCode 206 — Reverse Linked List (Easy)
// Category: Linked List · Approach: Iterative
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/reverse-linked-list/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}
