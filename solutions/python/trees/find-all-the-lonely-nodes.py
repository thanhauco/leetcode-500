# LeetCode 1469 — Find All The Lonely Nodes (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/find-all-the-lonely-nodes/

def get_lonely_nodes(root: "TreeNode") -> list[int]:
    out: list[int] = []
    def dfs(node):
        if not node:
            return
        if node.left and not node.right:
            out.append(node.left.val)
        if node.right and not node.left:
            out.append(node.right.val)
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return out
