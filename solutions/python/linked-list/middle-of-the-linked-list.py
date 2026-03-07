# LeetCode 876 — Middle of the Linked List (Easy)
# Category: Linked List · Approach: Fast & slow
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/middle-of-the-linked-list/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def middle_node(values: list[int]) -> int | None:
    head = None
    for x in reversed(values):
        head = ListNode(x, head)
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow.val if slow else None
