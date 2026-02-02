# LeetCode 213 — House Robber II (Medium)
# Category: 1-D Dynamic Programming · Approach: Rolling DP
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/house-robber-ii/

def rob(nums: list[int]) -> int:
    n = len(nums)
    if n == 0:
        return 0
    if n == 1:
        return nums[0]

    def rob_line(lo: int, hi: int) -> int:
        prev = cur = 0
        for i in range(lo, hi + 1):
            prev, cur = cur, max(cur, prev + nums[i])
        return cur

    return max(rob_line(0, n - 2), rob_line(1, n - 1))
