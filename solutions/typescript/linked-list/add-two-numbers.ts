// LeetCode 2 — Add Two Numbers (Medium)
// Category: Linked List · Approach: Carry add
// Time: O(max(m, n)) | Space: O(max(m, n))
// Source: https://leetcode.com/problems/add-two-numbers/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let tail = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const total = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    carry = Math.floor(total / 10);
    tail.next = new ListNode(total % 10);
    tail = tail.next;
    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }
  return dummy.next;
}
