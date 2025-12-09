# LeetCode 198 — House Robber (Medium)
# Category: 1-D Dynamic Programming · Approach: Rolling DP
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/house-robber/

def rob(nums: list[int]) -> int:
    rob_cur = skip = 0
    for v in nums:
        rob_cur, skip = skip + v, max(rob_cur, skip)
    return max(rob_cur, skip)
