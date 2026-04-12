# LeetCode 1123 — Lowest Common Ancestor of Deepest Leaves (Medium)
# Category: Trees · Approach: Depth + LCA pass
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def lca_deepest_leaves(root: TreeNode | None) -> TreeNode | None:
    def dfs(node):
        if not node:
            return 0, None
        ld, ln = dfs(node.left)
        rd, rn = dfs(node.right)
        if ld == rd:
            return ld + 1, node
        return (ld + 1, ln) if ld > rd else (rd + 1, rn)
    return dfs(root)[1]
