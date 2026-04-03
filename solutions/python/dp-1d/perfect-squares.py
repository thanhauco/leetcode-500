# LeetCode 279 — Perfect Squares (Medium)
# Category: 1-D Dynamic Programming · Approach: DP
# Time: O(n·√n) | Space: O(n)
# Source: https://leetcode.com/problems/perfect-squares/

def num_squares(n: int) -> int:
    dp = [0] + [float("inf")] * n
    for x in range(1, n + 1):
        s = 1
        while s * s <= x:
            dp[x] = min(dp[x], dp[x - s * s] + 1)
            s += 1
    return int(dp[n])
