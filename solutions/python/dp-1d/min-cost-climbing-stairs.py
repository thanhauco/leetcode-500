# LeetCode 746 — Min Cost Climbing Stairs (Easy)
# Category: 1-D Dynamic Programming · Approach: Rolling DP
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/min-cost-climbing-stairs/

def min_cost_climbing_stairs(cost: list[int]) -> int:
    n = len(cost)
    a = b = 0  # cost to reach step i-2 and i-1
    for i in range(2, n + 1):
        cur = min(b + cost[i - 1], a + cost[i - 2])
        a, b = b, cur
    return b
