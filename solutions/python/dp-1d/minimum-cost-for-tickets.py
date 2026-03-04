# LeetCode 983 — Minimum Cost For Tickets (Medium)
# Category: 1-D Dynamic Programming · Approach: Calendar DP
# Time: O(last day) | Space: O(last day)
# Source: https://leetcode.com/problems/minimum-cost-for-tickets/

def mincost_tickets(days: list[int], costs: list[int]) -> int:
    day_set = set(days)
    last = days[-1]
    dp = [0] * (last + 1)
    for d in range(1, last + 1):
        if d not in day_set:
            dp[d] = dp[d - 1]
            continue
        dp[d] = min(
            dp[d - 1] + costs[0],
            dp[max(0, d - 7)] + costs[1],
            dp[max(0, d - 30)] + costs[2],
        )
    return dp[last]
