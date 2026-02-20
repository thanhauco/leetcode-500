// LeetCode 61 — Rotate List (Medium)
// Category: Linked List · Approach: Close the ring
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/rotate-list/

class ListNode {
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
}
