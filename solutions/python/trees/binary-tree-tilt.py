# LeetCode 563 — Binary Tree Tilt (Easy)
# Category: Trees · Approach: Post-order
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/binary-tree-tilt/

def find_tilt(root: "TreeNode") -> int:
    total = 0
    def subtree_sum(node):
        nonlocal total
        if not node:
            return 0
        left = subtree_sum(node.left)
        right = subtree_sum(node.right)
        total += abs(left - right)
        return node.val + left + right
    subtree_sum(root)
    return total
