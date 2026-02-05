# LeetCode 86 — Partition List (Medium)
# Category: Linked List · Approach: Two chains
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/partition-list/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def partition(head: ListNode | None, x: int) -> ListNode | None:
    less_dummy = ListNode()
    ge_dummy = ListNode()
    less, ge = less_dummy, ge_dummy
    node = head
    while node:
        if node.val < x:
            less.next = node
            less = node
        else:
            ge.next = node
            ge = node
        node = node.next
    ge.next = None
    less.next = ge_dummy.next
    return less_dummy.next
