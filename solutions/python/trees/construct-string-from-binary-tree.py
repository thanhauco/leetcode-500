# LeetCode 606 — Construct String from Binary Tree (Easy)
# Category: Trees · Approach: Preorder string
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/construct-string-from-binary-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def tree2str(root: TreeNode | None) -> str:
    if not root:
        return ""
    s = str(root.val)
    if root.left or root.right:
        s += "(" + tree2str(root.left) + ")"
        if root.right:
            s += "(" + tree2str(root.right) + ")"
    return s
