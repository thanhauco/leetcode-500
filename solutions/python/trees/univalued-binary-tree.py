# LeetCode 965 — Univalued Binary Tree (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/univalued-binary-tree/

def is_unival_tree(root: "TreeNode") -> bool:
    target = root.val
    def dfs(node):
        if not node:
            return True
        if node.val != target:
            return False
        return dfs(node.left) and dfs(node.right)
    return dfs(root)
