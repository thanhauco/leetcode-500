# LeetCode 377 — Combination Sum IV (Medium)
# Category: 1-D Dynamic Programming · Approach: Bottom-Up DP
# Time: O(target * len(nums)) | Space: O(target)
# Source: https://leetcode.com/problems/combination-sum-iv/

def combination_sum4(nums: list[int], target: int) -> int:
    dp = [0] * (target + 1)
    dp[0] = 1
    for t in range(1, target + 1):
        for v in nums:
            if v <= t:
                dp[t] += dp[t - v]
    return dp[target]
