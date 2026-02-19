// LeetCode 1290 — Convert Binary Number in a Linked List to Integer (Easy)
// Category: Linked List · Approach: Horner accumulation
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function getDecimalValue(head: ListNode | null): number {
  let num = 0;
  for (let node = head; node; node = node.next) {
    num = num * 2 + node.val;
  }
  return num;
}
