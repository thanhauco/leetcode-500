# LeetCode 99 — Recover Binary Search Tree (Medium)
# Category: Trees · Approach: Inorder swap
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/recover-binary-search-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def recover_tree(root: TreeNode) -> None:
    first = second = prev = None
    def ino(n):
        nonlocal first, second, prev
        if not n:
            return
        ino(n.left)
        if prev and prev.val > n.val:
            if not first:
                first = prev
            second = n
        prev = n
        ino(n.right)
    ino(root)
    if first and second:
        first.val, second.val = second.val, first.val
