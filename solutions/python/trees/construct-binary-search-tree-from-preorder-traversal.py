# LeetCode 1008 — Construct Binary Search Tree from Preorder Traversal (Medium)
# Category: Trees · Approach: Bounded recursion
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def bst_from_preorder(preorder: list[int]) -> TreeNode:
    i = 0
    def build(bound):
        nonlocal i
        if i == len(preorder) or preorder[i] > bound:
            return None
        node = TreeNode(preorder[i]); i += 1
        node.left = build(node.val)
        node.right = build(bound)
        return node
    return build(float('inf'))
