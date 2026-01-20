// LeetCode 83 — Remove Duplicates from Sorted List (Easy)
// Category: Linked List · Approach: Single pass
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/remove-duplicates-from-sorted-list/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function deleteDuplicates(head: ListNode | null): ListNode | null {
  let cur = head;
  while (cur && cur.next) {
    if (cur.val === cur.next.val) cur.next = cur.next.next;
    else cur = cur.next;
  }
  return head;
}
