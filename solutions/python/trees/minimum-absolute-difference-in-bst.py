# LeetCode 530 — Minimum Absolute Difference in BST (Easy)
# Category: Trees · Approach: In-order
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/minimum-absolute-difference-in-bst/

def get_minimum_difference(root: "TreeNode") -> int:
    vals = []
    def ino(node):
        if not node:
            return
        ino(node.left)
        vals.append(node.val)
        ino(node.right)
    ino(root)
    return min(b - a for a, b in zip(vals, vals[1:]))
