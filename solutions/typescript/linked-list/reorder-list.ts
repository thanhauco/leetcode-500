// LeetCode 143 — Reorder List (Medium)
// Category: Linked List · Approach: Split, reverse, merge
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/reorder-list/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reorderList(values: number[]): number[] {
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) head = new ListNode(values[i], head);
  if (!head || !head.next) {
    const single: number[] = [];
    for (let n = head; n; n = n.next) single.push(n.val);
    return single;
  }

  let slow: ListNode = head;
  let fast: ListNode = head;
  while (fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  let second = slow.next;
  slow.next = null;
  let prev: ListNode | null = null;
  while (second) {
    const nxt = second.next;
    second.next = prev;
    prev = second;
    second = nxt;
  }

  let first: ListNode | null = head;
  let sec = prev;
  while (sec) {
    const f1 = first!.next;
    const s1 = sec.next;
    first!.next = sec;
    sec.next = f1;
    first = f1;
    sec = s1;
  }

  const out: number[] = [];
  for (let n: ListNode | null = head; n; n = n.next) out.push(n.val);
  return out;
}
