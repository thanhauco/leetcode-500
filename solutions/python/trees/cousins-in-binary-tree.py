# LeetCode 993 — Cousins in Binary Tree (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/cousins-in-binary-tree/

def is_cousins(root: "TreeNode", x: int, y: int) -> bool:
    info = {}
    def dfs(node, parent, depth):
        if not node:
            return
        if node.val in (x, y):
            info[node.val] = (parent, depth)
        dfs(node.left, node.val, depth + 1)
        dfs(node.right, node.val, depth + 1)
    dfs(root, None, 0)
    (px, dx), (py, dy) = info[x], info[y]
    return dx == dy and px != py
