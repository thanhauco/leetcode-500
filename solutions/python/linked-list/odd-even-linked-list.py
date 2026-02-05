# LeetCode 328 — Odd Even Linked List (Medium)
# Category: Linked List · Approach: Interleave pointers
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/odd-even-linked-list/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def odd_even_list(head: ListNode | None) -> ListNode | None:
    if not head:
        return None
    odd = head
    even = head.next
    even_head = even
    while even and even.next:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    odd.next = even_head
    return head
