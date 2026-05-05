# LeetCode 1262 — Greatest Sum Divisible by Three (Medium)
# Category: 1-D Dynamic Programming · Approach: Remainder DP
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/greatest-sum-divisible-by-three/

def max_sum_div_three(nums: list[int]) -> int:
    dp = [0, float("-inf"), float("-inf")]
    for x in nums:
        cur = dp[:]
        for r in range(3):
            if dp[r] == float("-inf"):
                continue
            nr = (dp[r] + x) % 3
            cur[nr] = max(cur[nr], dp[r] + x)
        dp = cur
    return dp[0]
