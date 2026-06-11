# LeetCode 897 — Increasing Order Search Tree (Easy)
# Category: Trees · Approach: Inorder rebuild
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/increasing-order-search-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def increasing_bst(root: TreeNode) -> TreeNode:
    vals = []
    def ino(n):
        if not n:
            return
        ino(n.left); vals.append(n.val); ino(n.right)
    ino(root)
    dummy = TreeNode()
    cur = dummy
    for v in vals:
        cur.right = TreeNode(v)
        cur = cur.right
    return dummy.right
