# LeetCode 134 — Gas Station (Medium)
# Category: Greedy · Approach: Greedy One Pass
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/gas-station/

def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    total = tank = start = 0
    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total += diff
        tank += diff
        if tank < 0:
            start = i + 1
            tank = 0
    return start if total >= 0 else -1
