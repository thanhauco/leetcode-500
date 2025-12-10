# LeetCode 206 — Reverse Linked List (Easy)
# Category: Linked List · Approach: Iterative
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/reverse-linked-list/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def reverse_list(head: ListNode | None) -> ListNode | None:
    prev = None
    while head:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt
    return prev
