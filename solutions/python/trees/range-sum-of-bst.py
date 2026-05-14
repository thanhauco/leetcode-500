# LeetCode 938 — Range Sum of BST (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/range-sum-of-bst/

def range_sum_bst(root: "TreeNode", low: int, high: int) -> int:
    if not root:
        return 0
    inside = root.val if low <= root.val <= high else 0
    return inside + range_sum_bst(root.left, low, high) + range_sum_bst(root.right, low, high)
