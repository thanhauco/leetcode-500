# LeetCode 203 — Remove Linked List Elements (Easy)
# Category: Linked List · Approach: Dummy head
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/remove-linked-list-elements/

class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def remove_elements(head: ListNode | None, val: int) -> ListNode | None:
    dummy = ListNode(0, head)
    cur = dummy
    while cur.next:
        if cur.next.val == val:
            cur.next = cur.next.next
        else:
            cur = cur.next
    return dummy.next
