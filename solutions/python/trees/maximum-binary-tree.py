# LeetCode 654 — Maximum Binary Tree (Medium)
# Category: Trees · Approach: Recursive max-split
# Time: O(n²) | Space: O(n)
# Source: https://leetcode.com/problems/maximum-binary-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def construct_maximum_binary_tree(nums: list[int]) -> TreeNode | None:
    def build(lo: int, hi: int) -> TreeNode | None:
        if lo > hi:
            return None
        mi = lo
        for i in range(lo + 1, hi + 1):
            if nums[i] > nums[mi]:
                mi = i
        return TreeNode(nums[mi], build(lo, mi - 1), build(mi + 1, hi))
    return build(0, len(nums) - 1)
