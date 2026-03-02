# LeetCode 560 — Subarray Sum Equals K (Medium)
# Category: Arrays & Hashing · Approach: Prefix Sum
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/subarray-sum-equals-k/

def subarray_sum(nums: list[int], k: int) -> int:
    counts = {0: 1}
    total = res = 0
    for x in nums:
        total += x
        res += counts.get(total - k, 0)
        counts[total] = counts.get(total, 0) + 1
    return res
