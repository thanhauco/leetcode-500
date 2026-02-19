// LeetCode 328 — Odd Even Linked List (Medium)
// Category: Linked List · Approach: Interleave pointers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/odd-even-linked-list/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head) return null;
  let odd = head;
  let even = head.next;
  const evenHead = even;
  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
}
