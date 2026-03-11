# LeetCode 108 — Convert Sorted Array to Binary Search Tree (Easy)
# Category: Trees · Approach: Divide & Conquer
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/

def sorted_array_to_bst(nums: list[int]):
    def build(lo: int, hi: int):
        if lo > hi:
            return None
        mid = (lo + hi) // 2
        node = TreeNode(nums[mid])
        node.left = build(lo, mid - 1)
        node.right = build(mid + 1, hi)
        return node
    return build(0, len(nums) - 1)
