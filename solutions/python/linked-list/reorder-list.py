# LeetCode 143 — Reorder List (Medium)
# Category: Linked List · Approach: Split, reverse, merge
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/reorder-list/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def reorder_list(values: list[int]) -> list[int]:
    head = None
    for x in reversed(values):
        head = ListNode(x, head)
    if not head or not head.next:
        out: list[int] = []
        node = head
        while node:
            out.append(node.val)
            node = node.next
        return out

    slow, fast = head, head
    while fast.next and fast.next.next:
        slow, fast = slow.next, fast.next.next

    second = slow.next
    slow.next = None
    prev = None
    while second:
        nxt = second.next
        second.next = prev
        prev = second
        second = nxt

    first, sec = head, prev
    while sec:
        f1, s1 = first.next, sec.next
        first.next = sec
        sec.next = f1
        first, sec = f1, s1

    out = []
    node = head
    while node:
        out.append(node.val)
        node = node.next
    return out
