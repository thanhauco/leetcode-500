# LeetCode 1035 — Uncrossed Lines (Medium)
# Category: 2-D Dynamic Programming · Approach: LCS
# Time: O(n * m) | Space: O(n * m)
# Source: https://leetcode.com/problems/uncrossed-lines/

def max_uncrossed_lines(nums1: list[int], nums2: list[int]) -> int:
    n, m = len(nums1), len(nums2)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if nums1[i - 1] == nums2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]
