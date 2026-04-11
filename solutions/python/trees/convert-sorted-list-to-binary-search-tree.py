# LeetCode 109 — Convert Sorted List to Binary Search Tree (Medium)
# Category: Trees · Approach: Index-based middle
# Time: O(n) | Space: O(log n)
# Source: https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def sorted_list_to_bst(values: list[int]) -> TreeNode | None:
    def build(lo: int, hi: int) -> TreeNode | None:
        if lo > hi:
            return None
        mid = (lo + hi) // 2
        return TreeNode(values[mid], build(lo, mid - 1), build(mid + 1, hi))
    return build(0, len(values) - 1)
