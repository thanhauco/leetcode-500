# LeetCode 236 — Lowest Common Ancestor of a Binary Tree (Medium)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/

def lowest_common_ancestor(root, p: int, q: int) -> int | None:
    def f(node):
        if not node:
            return None
        if node.val == p or node.val == q:
            return node
        left = f(node.left)
        right = f(node.right)
        if left and right:
            return node
        return left or right
    node = f(root)
    return node.val if node else None
