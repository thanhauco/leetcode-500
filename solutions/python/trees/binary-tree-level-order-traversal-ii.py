# LeetCode 107 — Binary Tree Level Order Traversal II (Medium)
# Category: Trees · Approach: BFS
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/binary-tree-level-order-traversal-ii/

from collections import deque

def level_order_bottom(root) -> list[list[int]]:
    if not root:
        return []
    res, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(level)
    return res[::-1]
