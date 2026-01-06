# LeetCode 24 — Swap Nodes in Pairs (Medium)
# Category: Linked List · Approach: Pointer rewiring
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/swap-nodes-in-pairs/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def swap_pairs(head: ListNode | None) -> ListNode | None:
    dummy = ListNode(0, head)
    prev = dummy
    while prev.next and prev.next.next:
        a, b = prev.next, prev.next.next
        a.next = b.next
        b.next = a
        prev.next = b
        prev = a
    return dummy.next
