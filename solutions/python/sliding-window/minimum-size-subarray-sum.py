# LeetCode 209 — Minimum Size Subarray Sum (Medium)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/minimum-size-subarray-sum/

def min_subarray_len(target: int, nums: list[int]) -> int:
    left = total = 0
    res = float("inf")
    for right, x in enumerate(nums):
        total += x
        while total >= target:
            res = min(res, right - left + 1)
            total -= nums[left]
            left += 1
    return 0 if res == float("inf") else res
