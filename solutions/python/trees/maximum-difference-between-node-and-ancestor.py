# LeetCode 1026 — Maximum Difference Between Node and Ancestor (Medium)
# Category: Trees · Approach: Track min/max on path
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def max_ancestor_diff(root: TreeNode) -> int:
    best = 0

    def dfs(node, lo, hi):
        nonlocal best
        if not node:
            best = max(best, hi - lo)
            return
        lo = min(lo, node.val)
        hi = max(hi, node.val)
        dfs(node.left, lo, hi)
        dfs(node.right, lo, hi)

    dfs(root, root.val, root.val)
    return best
