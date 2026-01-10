# LeetCode 235 — Lowest Common Ancestor of a Binary Search Tree (Medium)
# Category: Trees · Approach: BST walk
# Time: O(h) | Space: O(1)
# Source: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowest_common_ancestor(root: TreeNode, p: int, q: int) -> int:
    node = root
    while node:
        if p > node.val and q > node.val:
            node = node.right
        elif p < node.val and q < node.val:
            node = node.left
        else:
            return node.val
    return -1
