# LeetCode 23 — Merge k Sorted Lists (Hard)
# Category: Linked List · Approach: Pairwise merge
# Time: O(N k) | Space: O(1)
# Source: https://leetcode.com/problems/merge-k-sorted-lists/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def merge_k_lists(lists: list[list[int]]) -> list[int]:
    def build(arr: list[int]) -> ListNode | None:
        head = None
        for x in reversed(arr):
            head = ListNode(x, head)
        return head

    def merge_two(a: ListNode | None, b: ListNode | None) -> ListNode | None:
        dummy = ListNode()
        tail = dummy
        while a and b:
            if a.val <= b.val:
                tail.next, a = a, a.next
            else:
                tail.next, b = b, b.next
            tail = tail.next
        tail.next = a or b
        return dummy.next

    merged: ListNode | None = None
    for arr in lists:
        merged = merge_two(merged, build(arr))

    out: list[int] = []
    node = merged
    while node:
        out.append(node.val)
        node = node.next
    return out
