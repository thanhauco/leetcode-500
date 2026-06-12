# LeetCode 687 — Longest Univalue Path (Medium)
# Category: Trees · Approach: Tree DP
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/longest-univalue-path/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def longest_univalue_path(root: TreeNode) -> int:
    best = 0
    def dfs(n):
        nonlocal best
        if not n:
            return 0
        l, r = dfs(n.left), dfs(n.right)
        left = l + 1 if n.left and n.left.val == n.val else 0
        right = r + 1 if n.right and n.right.val == n.val else 0
        best = max(best, left + right)
        return max(left, right)
    dfs(root)
    return best
