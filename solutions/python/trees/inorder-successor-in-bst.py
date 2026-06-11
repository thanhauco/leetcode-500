# LeetCode 285 — Inorder Successor in BST (Medium)
# Category: Trees · Approach: BST successor
# Time: O(h) | Space: O(1)
# Source: https://leetcode.com/problems/inorder-successor-in-bst/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def inorder_successor(root: TreeNode, p: int):
    succ = None
    node = root
    while node:
        if p < node.val:
            succ = node.val
            node = node.left
        else:
            node = node.right
    return succ
