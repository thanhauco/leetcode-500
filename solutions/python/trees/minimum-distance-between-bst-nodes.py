# LeetCode 783 — Minimum Distance Between BST Nodes (Easy)
# Category: Trees · Approach: In-order
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/minimum-distance-between-bst-nodes/

def min_diff_in_bst(root: "TreeNode") -> int:
    vals = []
    def ino(node):
        if not node:
            return
        ino(node.left)
        vals.append(node.val)
        ino(node.right)
    ino(root)
    return min(b - a for a, b in zip(vals, vals[1:]))
