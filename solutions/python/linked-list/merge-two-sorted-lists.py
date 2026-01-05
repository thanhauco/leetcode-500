# LeetCode 21 — Merge Two Sorted Lists (Easy)
# Category: Linked List · Approach: Dummy head
# Time: O(m + n) | Space: O(1)
# Source: https://leetcode.com/problems/merge-two-sorted-lists/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def merge_two_lists(l1: ListNode | None, l2: ListNode | None) -> ListNode | None:
    dummy = tail = ListNode()
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next, l1 = l1, l1.next
        else:
            tail.next, l2 = l2, l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next
