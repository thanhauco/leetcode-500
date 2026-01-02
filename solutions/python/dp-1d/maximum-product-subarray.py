# LeetCode 152 — Maximum Product Subarray (Medium)
# Category: 1-D Dynamic Programming · Approach: Track Max & Min
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/maximum-product-subarray/

def max_product(nums: list[int]) -> int:
    best = cur_max = cur_min = nums[0]
    for x in nums[1:]:
        a, b = cur_max * x, cur_min * x
        cur_max = max(x, a, b)
        cur_min = min(x, a, b)
        best = max(best, cur_max)
    return best
