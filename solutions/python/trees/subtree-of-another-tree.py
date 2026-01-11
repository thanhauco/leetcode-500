# LeetCode 572 — Subtree of Another Tree (Easy)
# Category: Trees · Approach: DFS + same-tree
# Time: O(m · n) | Space: O(h)
# Source: https://leetcode.com/problems/subtree-of-another-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_subtree(root: TreeNode | None, sub_root: TreeNode | None) -> bool:
    def same(a, b):
        if not a and not b:
            return True
        if not a or not b or a.val != b.val:
            return False
        return same(a.left, b.left) and same(a.right, b.right)
    def contains(node, sub):
        if not sub:
            return True
        if not node:
            return False
        return same(node, sub) or contains(node.left, sub) or contains(node.right, sub)
    return contains(root, sub_root)
