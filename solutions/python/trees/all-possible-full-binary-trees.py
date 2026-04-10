# LeetCode 894 — All Possible Full Binary Trees (Medium)
# Category: Trees · Approach: Memoized build
# Time: O(Cₙ) | Space: O(Cₙ)
# Source: https://leetcode.com/problems/all-possible-full-binary-trees/

from functools import lru_cache

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def all_possible_fbt(n: int) -> list[TreeNode | None]:
    @lru_cache(maxsize=None)
    def build(k: int) -> tuple:
        if k % 2 == 0:
            return tuple()
        if k == 1:
            return (TreeNode(0),)
        out = []
        for l in range(1, k, 2):
            for left in build(l):
                for right in build(k - 1 - l):
                    out.append(TreeNode(0, left, right))
        return tuple(out)
    return list(build(n))
