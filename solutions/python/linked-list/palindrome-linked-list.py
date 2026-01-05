# LeetCode 234 — Palindrome Linked List (Easy)
# Category: Linked List · Approach: Reverse half
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/palindrome-linked-list/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def is_palindrome(head: ListNode | None) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    prev = None
    while slow:
        slow.next, prev, slow = prev, slow, slow.next
    left, right = head, prev
    while right:
        if left.val != right.val:
            return False
        left, right = left.next, right.next
    return True
