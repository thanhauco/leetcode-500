// LeetCode 876 — Middle of the Linked List (Easy)
// Category: Linked List · Approach: Fast & slow
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/middle-of-the-linked-list/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function middleNode(values: number[]): number | null {
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) head = new ListNode(values[i], head);
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  return slow ? slow.val : null;
}
