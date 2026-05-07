# LeetCode 1027 — Longest Arithmetic Subsequence (Medium)
# Category: 2-D Dynamic Programming · Approach: Per-index Difference Map
# Time: O(n^2) | Space: O(n^2)
# Source: https://leetcode.com/problems/longest-arithmetic-subsequence/

def longest_arith_seq_length(nums: list[int]) -> int:
    dp: list[dict[int, int]] = [dict() for _ in nums]
    best = 0
    for i in range(len(nums)):
        for j in range(i):
            d = nums[i] - nums[j]
            dp[i][d] = dp[j].get(d, 1) + 1
            best = max(best, dp[i][d])
    return best
