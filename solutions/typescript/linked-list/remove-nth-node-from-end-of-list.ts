// LeetCode 19 — Remove Nth Node From End of List (Medium)
// Category: Linked List · Approach: Two pointers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/remove-nth-node-from-end-of-list/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let fast: ListNode = dummy, slow: ListNode = dummy;
  for (let i = 0; i < n; i++) fast = fast.next!;
  while (fast.next) {
    fast = fast.next;
    slow = slow.next!;
  }
  slow.next = slow.next!.next;
  return dummy.next;
}
