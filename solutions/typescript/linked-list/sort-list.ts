// LeetCode 148 — Sort List (Medium)
// Category: Linked List · Approach: Merge sort
// Time: O(n log n) | Space: O(log n)
// Source: https://leetcode.com/problems/sort-list/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  let slow = head;
  let fast: ListNode | null = head.next;
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  const mid = slow.next;
  slow.next = null;
  let left = sortList(head);
  let right = sortList(mid);
  const dummy = new ListNode();
  let tail = dummy;
  while (left && right) {
    if (left.val <= right.val) {
      tail.next = left;
      left = left.next;
    } else {
      tail.next = right;
      right = right.next;
    }
    tail = tail.next;
  }
  tail.next = left ?? right;
  return dummy.next;
}
