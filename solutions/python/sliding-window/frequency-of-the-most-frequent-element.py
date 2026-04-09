# LeetCode 1838 — Frequency of the Most Frequent Element (Medium)
# Category: Sliding Window · Approach: Sort + Sliding Window
# Time: O(n log n) | Space: O(1)
# Source: https://leetcode.com/problems/frequency-of-the-most-frequent-element/

def max_frequency(nums: list[int], k: int) -> int:
    nums.sort()
    left = 0
    total = 0
    best = 1
    for right, x in enumerate(nums):
        total += x
        while x * (right - left + 1) - total > k:
            total -= nums[left]
            left += 1
        best = max(best, right - left + 1)
    return best
