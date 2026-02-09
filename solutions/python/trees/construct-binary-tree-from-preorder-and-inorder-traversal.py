# LeetCode 105 — Construct Binary Tree from Preorder and Inorder Traversal (Medium)
# Category: Trees · Approach: Divide and conquer
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def build_tree(preorder: list[int], inorder: list[int]) -> TreeNode | None:
    index = {v: i for i, v in enumerate(inorder)}
    pre = 0

    def rec(lo: int, hi: int) -> TreeNode | None:
        nonlocal pre
        if lo > hi:
            return None
        val = preorder[pre]
        pre += 1
        node = TreeNode(val)
        mid = index[val]
        node.left = rec(lo, mid - 1)
        node.right = rec(mid + 1, hi)
        return node

    return rec(0, len(inorder) - 1)
