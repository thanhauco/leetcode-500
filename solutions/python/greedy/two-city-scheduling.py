# LeetCode 1029 — Two City Scheduling (Medium)
# Category: Greedy · Approach: Sort by difference
# Time: O(n log n) | Space: O(n)
# Source: https://leetcode.com/problems/two-city-scheduling/

def two_city_sched_cost(costs: list[list[int]]) -> int:
    costs.sort(key=lambda c: c[0] - c[1])
    n = len(costs) // 2
    total = 0
    for i, (a, b) in enumerate(costs):
        total += a if i < n else b
    return total
