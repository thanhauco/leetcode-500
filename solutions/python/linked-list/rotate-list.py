# LeetCode 61 — Rotate List (Medium)
# Category: Linked List · Approach: Close the ring
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/rotate-list/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def rotate_right(head: ListNode | None, k: int) -> ListNode | None:
    if not head or not head.next or k == 0:
        return head
    length, tail = 1, head
    while tail.next:
        tail = tail.next
        length += 1
    k %= length
    if k == 0:
        return head
    tail.next = head
    steps = length - k
    new_tail = head
    for _ in range(steps - 1):
        new_tail = new_tail.next
    new_head = new_tail.next
    new_tail.next = None
    return new_head
