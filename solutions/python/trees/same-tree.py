# LeetCode 100 — Same Tree (Easy)
# Category: Trees · Approach: DFS compare
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/same-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_same_tree(p: TreeNode | None, q: TreeNode | None) -> bool:
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)
