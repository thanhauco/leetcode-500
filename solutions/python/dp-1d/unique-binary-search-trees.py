# LeetCode 96 — Unique Binary Search Trees (Medium)
# Category: 1-D Dynamic Programming · Approach: DP / Catalan
# Time: O(n^2) | Space: O(n)
# Source: https://leetcode.com/problems/unique-binary-search-trees/

def num_trees(n: int) -> int:
    dp = [0] * (n + 1)
    dp[0] = 1
    for k in range(1, n + 1):
        for i in range(1, k + 1):
            dp[k] += dp[i - 1] * dp[k - i]
    return dp[n]
