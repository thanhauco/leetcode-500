# LeetCode 333 — Largest BST Subtree (Medium)
# Category: Trees · Approach: Postorder
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/largest-bst-subtree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def largest_bst_subtree(root: TreeNode) -> int:
    best = 0
    def dfs(n):
        nonlocal best
        if not n:
            return True, 0, float('inf'), float('-inf')
        lb, ls, lmin, lmax = dfs(n.left)
        rb, rs, rmin, rmax = dfs(n.right)
        if lb and rb and lmax < n.val < rmin:
            size = ls + rs + 1
            best = max(best, size)
            return True, size, min(n.val, lmin), max(n.val, rmax)
        return False, 0, 0, 0
    dfs(root)
    return best
