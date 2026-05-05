# LeetCode 1049 — Last Stone Weight II (Medium)
# Category: 1-D Dynamic Programming · Approach: Subset Sum
# Time: O(n * sum) | Space: O(sum)
# Source: https://leetcode.com/problems/last-stone-weight-ii/

def last_stone_weight_ii(stones: list[int]) -> int:
    total = sum(stones)
    t = total // 2
    dp = [False] * (t + 1)
    dp[0] = True
    for x in stones:
        for j in range(t, x - 1, -1):
            dp[j] = dp[j] or dp[j - x]
    for j in range(t, -1, -1):
        if dp[j]:
            return total - 2 * j
    return total
