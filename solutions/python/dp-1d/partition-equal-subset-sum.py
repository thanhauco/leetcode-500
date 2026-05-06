# LeetCode 416 — Partition Equal Subset Sum (Medium)
# Category: 1-D Dynamic Programming · Approach: Boolean Knapsack
# Time: O(n * sum) | Space: O(sum)
# Source: https://leetcode.com/problems/partition-equal-subset-sum/

def can_partition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2:
        return False
    t = total // 2
    dp = [False] * (t + 1)
    dp[0] = True
    for x in nums:
        for j in range(t, x - 1, -1):
            dp[j] = dp[j] or dp[j - x]
    return dp[t]
