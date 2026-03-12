# LeetCode 1448 — Count Good Nodes in Binary Tree (Medium)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/count-good-nodes-in-binary-tree/

def good_nodes(root) -> int:
    count = 0
    def dfs(node, mx) -> None:
        nonlocal count
        if not node:
            return
        if node.val >= mx:
            count += 1
            mx = node.val
        dfs(node.left, mx)
        dfs(node.right, mx)
    dfs(root, float("-inf"))
    return count
