// LeetCode 23 — Merge k Sorted Lists (Hard)
// Category: Linked List · Approach: Pairwise merge
// Time: O(N k) | Space: O(1)
// Source: https://leetcode.com/problems/merge-k-sorted-lists/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeKLists(lists: number[][]): number[] {
  const build = (arr: number[]): ListNode | null => {
    let head: ListNode | null = null;
    for (let i = arr.length - 1; i >= 0; i--) head = new ListNode(arr[i], head);
    return head;
  };
  const mergeTwo = (a: ListNode | null, b: ListNode | null): ListNode | null => {
    const dummy = new ListNode();
    let tail = dummy;
    while (a && b) {
      if (a.val <= b.val) { tail.next = a; a = a.next; }
      else { tail.next = b; b = b.next; }
      tail = tail.next;
    }
    tail.next = a ?? b;
    return dummy.next;
  };
  let merged: ListNode | null = null;
  for (const arr of lists) merged = mergeTwo(merged, build(arr));
  const out: number[] = [];
  for (let n = merged; n; n = n.next) out.push(n.val);
  return out;
}
