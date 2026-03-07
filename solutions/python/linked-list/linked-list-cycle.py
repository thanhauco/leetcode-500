# LeetCode 141 — Linked List Cycle (Easy)
# Category: Linked List · Approach: Floyd's cycle detection
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/linked-list-cycle/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def has_cycle(values: list[int], pos: int) -> bool:
    nodes = [ListNode(v) for v in values]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if pos >= 0 and nodes:
        nodes[-1].next = nodes[pos]
    head = nodes[0] if nodes else None

    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
