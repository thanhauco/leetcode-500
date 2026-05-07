# LeetCode 718 — Maximum Length of Repeated Subarray (Medium)
# Category: 2-D Dynamic Programming · Approach: Grid DP
# Time: O(n * m) | Space: O(n * m)
# Source: https://leetcode.com/problems/maximum-length-of-repeated-subarray/

def find_length(a: list[int], b: list[int]) -> int:
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    best = 0
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
                best = max(best, dp[i][j])
    return best
