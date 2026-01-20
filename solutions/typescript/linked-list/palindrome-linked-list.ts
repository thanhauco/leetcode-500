// LeetCode 234 — Palindrome Linked List (Easy)
// Category: Linked List · Approach: Reverse half
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/palindrome-linked-list/

class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function isPalindrome(head: ListNode | null): boolean {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  let prev: ListNode | null = null;
  while (slow) {
    const next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }
  let left = head, right = prev;
  while (right) {
    if (left!.val !== right.val) return false;
    left = left!.next;
    right = right.next;
  }
  return true;
}
