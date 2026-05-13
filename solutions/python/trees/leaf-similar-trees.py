# LeetCode 872 — Leaf-Similar Trees (Easy)
# Category: Trees · Approach: DFS
# Time: O(n + m) | Space: O(n + m)
# Source: https://leetcode.com/problems/leaf-similar-trees/

def leaf_similar(root1: "TreeNode", root2: "TreeNode") -> bool:
    def leaves(node, out):
        if not node:
            return
        if not node.left and not node.right:
            out.append(node.val)
            return
        leaves(node.left, out)
        leaves(node.right, out)
    a, b = [], []
    leaves(root1, a)
    leaves(root2, b)
    return a == b
