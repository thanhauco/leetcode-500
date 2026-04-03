# LeetCode 343 — Integer Break (Medium)
# Category: 1-D Dynamic Programming · Approach: DP
# Time: O(n^2) | Space: O(n)
# Source: https://leetcode.com/problems/integer-break/

def integer_break(n: int) -> int:
    dp = [0] * (n + 1)
    dp[1] = 1
    for x in range(2, n + 1):
        for j in range(1, x):
            dp[x] = max(dp[x], j * (x - j), j * dp[x - j])
    return dp[n]
