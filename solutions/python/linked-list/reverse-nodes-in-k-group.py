# LeetCode 25 — Reverse Nodes in k-Group (Hard)
# Category: Linked List · Approach: Group reversal
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/reverse-nodes-in-k-group/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def reverse_k_group(head: ListNode | None, k: int) -> ListNode | None:
    dummy = ListNode(0, head)
    group_prev = dummy
    while True:
        kth = group_prev
        for _ in range(k):
            kth = kth.next if kth else None
        if not kth:
            break
        group_next = kth.next
        prev, cur = group_next, group_prev.next
        while cur is not group_next:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        new_group_prev = group_prev.next
        group_prev.next = kth
        group_prev = new_group_prev
    return dummy.next
