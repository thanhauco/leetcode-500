# LeetCode 82 — Remove Duplicates from Sorted List II (Medium)
# Category: Linked List · Approach: Dummy + skip runs
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def delete_duplicates(values: list[int]) -> list[int]:
    head = None
    for x in reversed(values):
        head = ListNode(x, head)
    dummy = ListNode(0, head)
    prev, cur = dummy, head
    while cur:
        if cur.next and cur.next.val == cur.val:
            v = cur.val
            while cur and cur.val == v:
                cur = cur.next
            prev.next = cur
        else:
            prev = cur
            cur = cur.next
    out: list[int] = []
    node = dummy.next
    while node:
        out.append(node.val)
        node = node.next
    return out
