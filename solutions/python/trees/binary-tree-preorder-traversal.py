# LeetCode 144 — Binary Tree Preorder Traversal (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/binary-tree-preorder-traversal/

def preorder_traversal(root) -> list[int]:
    out: list[int] = []
    def go(node) -> None:
        if not node:
            return
        out.append(node.val)
        go(node.left)
        go(node.right)
    go(root)
    return out
