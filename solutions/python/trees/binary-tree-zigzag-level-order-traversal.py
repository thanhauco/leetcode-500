# LeetCode 103 — Binary Tree Zigzag Level Order Traversal (Medium)
# Category: Trees · Approach: BFS
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/

from collections import deque

def zigzag_level_order(root) -> list[list[int]]:
    if not root:
        return []
    res, q, ltr = [], deque([root]), True
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(level if ltr else level[::-1])
        ltr = not ltr
    return res
