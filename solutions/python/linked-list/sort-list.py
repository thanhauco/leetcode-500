# LeetCode 148 — Sort List (Medium)
# Category: Linked List · Approach: Merge sort
# Time: O(n log n) | Space: O(log n)
# Source: https://leetcode.com/problems/sort-list/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def sort_list(head: ListNode | None) -> ListNode | None:
    if not head or not head.next:
        return head
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    mid = slow.next
    slow.next = None
    left = sort_list(head)
    right = sort_list(mid)
    dummy = tail = ListNode()
    while left and right:
        if left.val <= right.val:
            tail.next = left
            left = left.next
        else:
            tail.next = right
            right = right.next
        tail = tail.next
    tail.next = left or right
    return dummy.next
