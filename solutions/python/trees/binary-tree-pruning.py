# LeetCode 814 — Binary Tree Pruning (Medium)
# Category: Trees · Approach: Post-order
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/binary-tree-pruning/

def prune_tree(root: "TreeNode") -> "TreeNode":
    if not root:
        return None
    root.left = prune_tree(root.left)
    root.right = prune_tree(root.right)
    if not root.left and not root.right and root.val == 0:
        return None
    return root
