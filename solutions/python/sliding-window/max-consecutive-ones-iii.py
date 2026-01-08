# LeetCode 1004 — Max Consecutive Ones III (Medium)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/max-consecutive-ones-iii/

def longest_ones(nums: list[int], k: int) -> int:
    left = zeros = res = 0
    for right, v in enumerate(nums):
        if v == 0:
            zeros += 1
        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        res = max(res, right - left + 1)
    return res
