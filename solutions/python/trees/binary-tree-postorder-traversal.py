# LeetCode 145 — Binary Tree Postorder Traversal (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/binary-tree-postorder-traversal/

def postorder_traversal(root) -> list[int]:
    out: list[int] = []
    def go(node) -> None:
        if not node:
            return
        go(node.left)
        go(node.right)
        out.append(node.val)
    go(root)
    return out
