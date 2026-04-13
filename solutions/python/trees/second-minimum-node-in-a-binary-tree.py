# LeetCode 671 — Second Minimum Node In a Binary Tree (Easy)
# Category: Trees · Approach: Scan for second min
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def find_second_minimum_value(root: TreeNode) -> int:
    minimum = root.val
    second = float("inf")

    def dfs(node):
        nonlocal second
        if not node:
            return
        if minimum < node.val < second:
            second = node.val
        dfs(node.left)
        dfs(node.right)

    dfs(root)
    return second if second != float("inf") else -1
