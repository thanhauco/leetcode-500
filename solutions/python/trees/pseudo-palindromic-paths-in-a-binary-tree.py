# LeetCode 1457 — Pseudo-Palindromic Paths in a Binary Tree (Medium)
# Category: Trees · Approach: Parity bitmask
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def pseudo_palindromic_paths(root: TreeNode | None) -> int:
    count = 0

    def dfs(node, mask):
        nonlocal count
        if not node:
            return
        mask ^= 1 << node.val
        if not node.left and not node.right:
            if mask & (mask - 1) == 0:
                count += 1
            return
        dfs(node.left, mask)
        dfs(node.right, mask)

    dfs(root, 0)
    return count
