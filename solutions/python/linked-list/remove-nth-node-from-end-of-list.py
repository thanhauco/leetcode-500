# LeetCode 19 — Remove Nth Node From End of List (Medium)
# Category: Linked List · Approach: Two pointers
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/remove-nth-node-from-end-of-list/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def remove_nth_from_end(head: ListNode | None, n: int) -> ListNode | None:
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n):
        fast = fast.next
    while fast.next:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next
