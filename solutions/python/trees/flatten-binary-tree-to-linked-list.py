# LeetCode 114 — Flatten Binary Tree to Linked List (Medium)
# Category: Trees · Approach: Preorder
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/flatten-binary-tree-to-linked-list/

def flatten(root) -> list[int]:
    out: list[int] = []
    def go(node) -> None:
        if not node:
            return
        out.append(node.val)
        go(node.left)
        go(node.right)
    go(root)
    return out
