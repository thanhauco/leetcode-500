# LeetCode 1218 — Longest Arithmetic Subsequence of Given Difference (Medium)
# Category: 1-D Dynamic Programming · Approach: Hash Map DP
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference/

def longest_subsequence(arr: list[int], difference: int) -> int:
    dp: dict[int, int] = {}
    best = 0
    for x in arr:
        dp[x] = dp.get(x - difference, 0) + 1
        best = max(best, dp[x])
    return best
