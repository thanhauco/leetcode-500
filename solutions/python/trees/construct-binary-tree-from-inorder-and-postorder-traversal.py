# LeetCode 106 — Construct Binary Tree from Inorder and Postorder Traversal (Medium)
# Category: Trees · Approach: Divide and conquer
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def build_tree(inorder: list[int], postorder: list[int]) -> TreeNode | None:
    index = {v: i for i, v in enumerate(inorder)}
    post = len(postorder) - 1

    def rec(lo: int, hi: int) -> TreeNode | None:
        nonlocal post
        if lo > hi:
            return None
        val = postorder[post]
        post -= 1
        node = TreeNode(val)
        mid = index[val]
        node.right = rec(mid + 1, hi)
        node.left = rec(lo, mid - 1)
        return node

    return rec(0, len(inorder) - 1)
