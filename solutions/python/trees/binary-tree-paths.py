# LeetCode 257 — Binary Tree Paths (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/binary-tree-paths/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def binary_tree_paths(root: TreeNode | None) -> list[str]:
    paths: list[str] = []

    def dfs(node: TreeNode | None, trail: list[str]) -> None:
        if not node:
            return
        trail.append(str(node.val))
        if not node.left and not node.right:
            paths.append("->".join(trail))
        else:
            dfs(node.left, trail)
            dfs(node.right, trail)
        trail.pop()

    dfs(root, [])
    return paths
