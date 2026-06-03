# LeetCode 256 — Paint House (Medium)
# Category: 2-D Dynamic Programming · Approach: Rolling DP
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/paint-house/

def min_cost(costs: list[list[int]]) -> int:
    if not costs:
        return 0
    r, g, b = costs[0]
    for cr, cg, cb in costs[1:]:
        r, g, b = cr + min(g, b), cg + min(r, b), cb + min(r, g)
    return min(r, g, b)
