// LeetCode 25 — Reverse Nodes in k-Group (Hard)
// Category: Linked List · Approach: Group reversal
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/reverse-nodes-in-k-group/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let groupPrev: ListNode = dummy;
  while (true) {
    let kth: ListNode | null = groupPrev;
    for (let i = 0; i < k && kth; i++) kth = kth.next;
    if (!kth) break;
    const groupNext = kth.next;
    let prev: ListNode | null = groupNext;
    let cur: ListNode | null = groupPrev.next;
    while (cur !== groupNext) {
      const nxt: ListNode | null = cur!.next;
      cur!.next = prev;
      prev = cur;
      cur = nxt;
    }
    const newGroupPrev = groupPrev.next!;
    groupPrev.next = kth;
    groupPrev = newGroupPrev;
  }
  return dummy.next;
}
