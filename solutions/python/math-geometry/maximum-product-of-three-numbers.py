# LeetCode 628 — Maximum Product of Three Numbers (Easy)
# Category: Math & Geometry · Approach: Sort and compare
# Time: O(n log n) | Space: O(1)
# Source: https://leetcode.com/problems/maximum-product-of-three-numbers/

def maximum_product(nums: list[int]) -> int:
    nums.sort()
    return max(nums[-1] * nums[-2] * nums[-3], nums[0] * nums[1] * nums[-1])
