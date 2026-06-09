# LeetCode 637 — Average of Levels in Binary Tree (Easy)
# Category: Trees · Approach: BFS
# Time: O(n) | Space: O(w)
# Source: https://leetcode.com/problems/average-of-levels-in-binary-tree/

from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def average_of_levels(root: TreeNode) -> list[float]:
    res, q = [], deque([root])
    while q:
        n = len(q)
        total = 0
        for _ in range(n):
            node = q.popleft()
            total += node.val
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(total / n)
    return res
