// LeetCode 82 — Remove Duplicates from Sorted List II (Medium)
// Category: Linked List · Approach: Dummy + skip runs
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function deleteDuplicates(values: number[]): number[] {
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) head = new ListNode(values[i], head);
  const dummy = new ListNode(0, head);
  let prev: ListNode = dummy;
  let cur: ListNode | null = head;
  while (cur) {
    if (cur.next && cur.next.val === cur.val) {
      const v = cur.val;
      while (cur && cur.val === v) cur = cur.next;
      prev.next = cur;
    } else {
      prev = cur;
      cur = cur.next;
    }
  }
  const out: number[] = [];
  for (let n = dummy.next; n; n = n.next) out.push(n.val);
  return out;
}
