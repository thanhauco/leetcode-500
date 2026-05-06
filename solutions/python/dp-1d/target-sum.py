# LeetCode 494 — Target Sum (Medium)
# Category: 1-D Dynamic Programming · Approach: Subset Sum Count
# Time: O(n * s) | Space: O(s)
# Source: https://leetcode.com/problems/target-sum/

def find_target_sum_ways(nums: list[int], target: int) -> int:
    total = sum(nums)
    if abs(target) > total or (total + target) % 2:
        return 0
    s = (total + target) // 2
    dp = [0] * (s + 1)
    dp[0] = 1
    for x in nums:
        for j in range(s, x - 1, -1):
            dp[j] += dp[j - x]
    return dp[s]
