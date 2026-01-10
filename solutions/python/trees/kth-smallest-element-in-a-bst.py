# LeetCode 230 — Kth Smallest Element in a BST (Medium)
# Category: Trees · Approach: Inorder
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/kth-smallest-element-in-a-bst/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def kth_smallest(root: TreeNode | None, k: int) -> int:
    order: list[int] = []
    def inorder(node):
        if not node or len(order) >= k:
            return
        inorder(node.left)
        order.append(node.val)
        inorder(node.right)
    inorder(root)
    return order[k - 1]
