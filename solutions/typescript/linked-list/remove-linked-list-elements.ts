// LeetCode 203 — Remove Linked List Elements (Easy)
// Category: Linked List · Approach: Dummy head
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/remove-linked-list-elements/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function removeElements(head: ListNode | null, val: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let cur: ListNode = dummy;
  while (cur.next) {
    if (cur.next.val === val) cur.next = cur.next.next;
    else cur = cur.next;
  }
  return dummy.next;
}
