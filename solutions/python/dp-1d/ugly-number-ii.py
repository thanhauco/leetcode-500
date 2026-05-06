# LeetCode 264 — Ugly Number II (Medium)
# Category: 1-D Dynamic Programming · Approach: Three Pointers DP
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/ugly-number-ii/

def nth_ugly_number(n: int) -> int:
    dp = [1] * n
    i2 = i3 = i5 = 0
    for i in range(1, n):
        a, b, c = dp[i2] * 2, dp[i3] * 3, dp[i5] * 5
        dp[i] = min(a, b, c)
        if dp[i] == a:
            i2 += 1
        if dp[i] == b:
            i3 += 1
        if dp[i] == c:
            i5 += 1
    return dp[-1]
