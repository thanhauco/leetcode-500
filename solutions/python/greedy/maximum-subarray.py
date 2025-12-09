# LeetCode 53 — Maximum Subarray (Medium)
# Category: Greedy · Approach: Kadane
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/maximum-subarray/

def max_sub_array(nums: list[int]) -> int:
    current = best = nums[0]
    for v in nums[1:]:
        current = max(v, current + v)
        best = max(best, current)
    return best
