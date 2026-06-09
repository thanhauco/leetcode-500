# LeetCode 623 — Add One Row to Tree (Medium)
# Category: Trees · Approach: DFS insert
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/add-one-row-to-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def add_one_row(root: TreeNode, val: int, depth: int):
    if depth == 1:
        return TreeNode(val, left=root)
    def dfs(n, d):
        if not n:
            return
        if d == depth - 1:
            n.left = TreeNode(val, left=n.left)
            n.right = TreeNode(val, right=n.right)
        else:
            dfs(n.left, d + 1)
            dfs(n.right, d + 1)
    dfs(root, 1)
    return root
