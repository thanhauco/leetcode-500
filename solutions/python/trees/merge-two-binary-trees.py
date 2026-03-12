# LeetCode 617 — Merge Two Binary Trees (Easy)
# Category: Trees · Approach: DFS
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/merge-two-binary-trees/

def merge_trees(a, b):
    if not a and not b:
        return None
    val = (a.val if a else 0) + (b.val if b else 0)
    node = TreeNode(val)
    node.left = merge_trees(a.left if a else None, b.left if b else None)
    node.right = merge_trees(a.right if a else None, b.right if b else None)
    return node
