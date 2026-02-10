# LeetCode 111 — Minimum Depth of Binary Tree (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/minimum-depth-of-binary-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def min_depth(root: TreeNode | None) -> int:
    if not root:
        return 0
    if not root.left:
        return 1 + min_depth(root.right)
    if not root.right:
        return 1 + min_depth(root.left)
    return 1 + min(min_depth(root.left), min_depth(root.right))
