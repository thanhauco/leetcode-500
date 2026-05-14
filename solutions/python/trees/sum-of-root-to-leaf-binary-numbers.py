# LeetCode 1022 — Sum of Root To Leaf Binary Numbers (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/

def sum_root_to_leaf(root: "TreeNode") -> int:
    total = 0
    def dfs(node, cur):
        nonlocal total
        if not node:
            return
        cur = cur * 2 + node.val
        if not node.left and not node.right:
            total += cur
            return
        dfs(node.left, cur)
        dfs(node.right, cur)
    dfs(root, 0)
    return total
