# LeetCode 404 — Sum of Left Leaves (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/sum-of-left-leaves/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def sum_of_left_leaves(root: TreeNode | None) -> int:
    def dfs(node: TreeNode | None, is_left: bool) -> int:
        if not node:
            return 0
        if not node.left and not node.right:
            return node.val if is_left else 0
        return dfs(node.left, True) + dfs(node.right, False)

    return dfs(root, False)
