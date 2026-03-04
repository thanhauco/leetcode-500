# LeetCode 740 — Delete and Earn (Medium)
# Category: 1-D Dynamic Programming · Approach: House Robber DP
# Time: O(n + max) | Space: O(max)
# Source: https://leetcode.com/problems/delete-and-earn/

def delete_and_earn(nums: list[int]) -> int:
    max_val = max(nums)
    points = [0] * (max_val + 1)
    for x in nums:
        points[x] += x

    prev, curr = 0, 0
    for v in range(1, max_val + 1):
        take = prev + points[v]
        skip = curr
        prev, curr = curr, max(take, skip)
    return curr
