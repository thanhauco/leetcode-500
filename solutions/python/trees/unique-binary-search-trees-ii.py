# LeetCode 95 — Unique Binary Search Trees II (Medium)
# Category: Trees · Approach: Recursive build
# Time: O(Cₙ · n) | Space: O(Cₙ · n)
# Source: https://leetcode.com/problems/unique-binary-search-trees-ii/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def generate_trees(n: int) -> list[TreeNode | None]:
    def build(lo: int, hi: int) -> list[TreeNode | None]:
        if lo > hi:
            return [None]
        out: list[TreeNode | None] = []
        for v in range(lo, hi + 1):
            for left in build(lo, v - 1):
                for right in build(v + 1, hi):
                    out.append(TreeNode(v, left, right))
        return out
    return build(1, n) if n else []
