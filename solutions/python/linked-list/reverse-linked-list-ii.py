# LeetCode 92 — Reverse Linked List II (Medium)
# Category: Linked List · Approach: Head insertion
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/reverse-linked-list-ii/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def reverse_between(head: ListNode | None, left: int, right: int) -> ListNode | None:
    dummy = ListNode(0, head)
    prev = dummy
    for _ in range(left - 1):
        prev = prev.next
    cur = prev.next
    for _ in range(right - left):
        move = cur.next
        cur.next = move.next
        move.next = prev.next
        prev.next = move
    return dummy.next
