# LeetCode 918 — Maximum Sum Circular Subarray (Medium)
# Category: 1-D Dynamic Programming · Approach: Dual Kadane
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/maximum-sum-circular-subarray/

def max_subarray_sum_circular(nums: list[int]) -> int:
    total = 0
    cur_max = max_sum = float("-inf")
    cur_min = min_sum = float("inf")
    cur_max = cur_min = 0
    max_sum, min_sum = float("-inf"), float("inf")
    for x in nums:
        cur_max = max(cur_max + x, x)
        max_sum = max(max_sum, cur_max)
        cur_min = min(cur_min + x, x)
        min_sum = min(min_sum, cur_min)
        total += x
    if max_sum < 0:
        return max_sum
    return max(max_sum, total - min_sum)
