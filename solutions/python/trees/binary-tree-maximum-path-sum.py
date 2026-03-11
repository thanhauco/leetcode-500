# LeetCode 124 — Binary Tree Maximum Path Sum (Hard)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/binary-tree-maximum-path-sum/

def max_path_sum(root) -> int:
    best = float("-inf")
    def gain(node) -> int:
        nonlocal best
        if not node:
            return 0
        left = max(0, gain(node.left))
        right = max(0, gain(node.right))
        best = max(best, node.val + left + right)
        return node.val + max(left, right)
    gain(root)
    return best
