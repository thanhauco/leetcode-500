# LeetCode 1290 — Convert Binary Number in a Linked List to Integer (Easy)
# Category: Linked List · Approach: Horner accumulation
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def get_decimal_value(head: ListNode | None) -> int:
    num = 0
    node = head
    while node:
        num = num * 2 + node.val
        node = node.next
    return num
