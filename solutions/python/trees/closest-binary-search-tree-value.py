# LeetCode 270 — Closest Binary Search Tree Value (Easy)
# Category: Trees · Approach: BST descent
# Time: O(h) | Space: O(1)
# Source: https://leetcode.com/problems/closest-binary-search-tree-value/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def closest_value(root: TreeNode, target: float) -> int:
    closest = root.val
    node = root
    while node:
        d = abs(node.val - target)
        bd = abs(closest - target)
        if d < bd or (d == bd and node.val < closest):
            closest = node.val
        node = node.left if target < node.val else node.right
    return closest
