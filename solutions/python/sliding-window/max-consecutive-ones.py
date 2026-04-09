# LeetCode 485 — Max Consecutive Ones (Easy)
# Category: Sliding Window · Approach: Running Streak
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/max-consecutive-ones/

def find_max_consecutive_ones(nums: list[int]) -> int:
    best = current = 0
    for x in nums:
        current = current + 1 if x == 1 else 0
        best = max(best, current)
    return best
