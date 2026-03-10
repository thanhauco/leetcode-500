# LeetCode 94 — Binary Tree Inorder Traversal (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/binary-tree-inorder-traversal/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root: TreeNode | None) -> list[int]:
    out: list[int] = []
    def go(node: TreeNode | None) -> None:
        if not node:
            return
        go(node.left)
        out.append(node.val)
        go(node.right)
    go(root)
    return out
