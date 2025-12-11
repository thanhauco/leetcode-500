# LeetCode 104 — Maximum Depth of Binary Tree (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/maximum-depth-of-binary-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root: TreeNode | None) -> int:
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
