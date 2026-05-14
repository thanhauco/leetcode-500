# LeetCode 2236 — Root Equals Sum of Children (Easy)
# Category: Trees · Approach: Direct
# Time: O(1) | Space: O(1)
# Source: https://leetcode.com/problems/root-equals-sum-of-children/

# TreeNode has .val, .left, .right
def check_tree(root: "TreeNode") -> bool:
    return root.val == root.left.val + root.right.val
