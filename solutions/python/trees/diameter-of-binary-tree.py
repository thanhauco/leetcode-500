# LeetCode 543 — Diameter of Binary Tree (Easy)
# Category: Trees · Approach: Height + running max
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/diameter-of-binary-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def diameter_of_binary_tree(root: TreeNode | None) -> int:
    best = 0
    def depth(node: TreeNode | None) -> int:
        nonlocal best
        if not node:
            return 0
        left = depth(node.left)
        right = depth(node.right)
        best = max(best, left + right)
        return 1 + max(left, right)
    depth(root)
    return best
