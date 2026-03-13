# LeetCode 129 — Sum Root to Leaf Numbers (Medium)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/sum-root-to-leaf-numbers/

def sum_numbers(root) -> int:
    total = 0
    def dfs(node, cur) -> None:
        nonlocal total
        if not node:
            return
        cur = cur * 10 + node.val
        if not node.left and not node.right:
            total += cur
            return
        dfs(node.left, cur)
        dfs(node.right, cur)
    dfs(root, 0)
    return total
