# LeetCode 83 — Remove Duplicates from Sorted List (Easy)
# Category: Linked List · Approach: Single pass
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/remove-duplicates-from-sorted-list/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def delete_duplicates(head: ListNode | None) -> ListNode | None:
    cur = head
    while cur and cur.next:
        if cur.val == cur.next.val:
            cur.next = cur.next.next
        else:
            cur = cur.next
    return head
