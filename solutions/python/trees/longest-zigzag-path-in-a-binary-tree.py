# LeetCode 1372 — Longest ZigZag Path in a Binary Tree (Medium)
# Category: Trees · Approach: Tree DP
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def longest_zigzag(root: TreeNode | None) -> int:
    best = 0

    def dfs(node):
        nonlocal best
        if not node:
            return (-1, -1)
        left = dfs(node.left)[1] + 1
        right = dfs(node.right)[0] + 1
        best = max(best, left, right)
        return (left, right)

    dfs(root)
    return best
