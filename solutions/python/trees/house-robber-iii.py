# LeetCode 337 — House Robber III (Medium)
# Category: Trees · Approach: Tree DP
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/house-robber-iii/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def rob(root: TreeNode) -> int:
    def dfs(n):
        if not n:
            return (0, 0)  # (skip, rob)
        ls, lr = dfs(n.left)
        rs, rr = dfs(n.right)
        return (max(ls, lr) + max(rs, rr), n.val + ls + rs)
    return max(dfs(root))
