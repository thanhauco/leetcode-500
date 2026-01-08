# LeetCode 643 — Maximum Average Subarray I (Easy)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/maximum-average-subarray-i/

def find_max_average(nums: list[int], k: int) -> float:
    total = sum(nums[:k])
    best = total
    for i in range(k, len(nums)):
        total += nums[i] - nums[i - k]
        best = max(best, total)
    return best / k
