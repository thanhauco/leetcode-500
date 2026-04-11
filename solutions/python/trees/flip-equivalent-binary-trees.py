# LeetCode 951 — Flip Equivalent Binary Trees (Medium)
# Category: Trees · Approach: Recursive two-way match
# Time: O(min(n, m)) | Space: O(min(h₁, h₂))
# Source: https://leetcode.com/problems/flip-equivalent-binary-trees/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def flip_equiv(a: TreeNode | None, b: TreeNode | None) -> bool:
    if a is None and b is None:
        return True
    if a is None or b is None or a.val != b.val:
        return False
    return (flip_equiv(a.left, b.left) and flip_equiv(a.right, b.right)) or (
        flip_equiv(a.left, b.right) and flip_equiv(a.right, b.left)
    )
