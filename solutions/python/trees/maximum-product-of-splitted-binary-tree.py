# LeetCode 1339 — Maximum Product of Splitted Binary Tree (Medium)
# Category: Trees · Approach: Two-pass subtree sums
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def max_product(root: TreeNode | None) -> int:
    sums: list[int] = []

    def total(node):
        if not node:
            return 0
        s = node.val + total(node.left) + total(node.right)
        sums.append(s)
        return s

    grand = total(root)
    best = max(s * (grand - s) for s in sums)
    return best % (10**9 + 7)
