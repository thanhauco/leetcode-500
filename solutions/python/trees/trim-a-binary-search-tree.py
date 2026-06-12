# LeetCode 669 — Trim a Binary Search Tree (Medium)
# Category: Trees · Approach: BST trim
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/trim-a-binary-search-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def trim_bst(root: TreeNode, low: int, high: int):
    if not root:
        return None
    if root.val < low:
        return trim_bst(root.right, low, high)
    if root.val > high:
        return trim_bst(root.left, low, high)
    root.left = trim_bst(root.left, low, high)
    root.right = trim_bst(root.right, low, high)
    return root
