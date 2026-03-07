# LeetCode 142 — Linked List Cycle II (Medium)
# Category: Linked List · Approach: Floyd's two-phase
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/linked-list-cycle-ii/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def detect_cycle(values: list[int], pos: int) -> int:
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
            ptr = head
            while ptr is not slow:
                ptr = ptr.next
                slow = slow.next
            return nodes.index(ptr)
    return -1
