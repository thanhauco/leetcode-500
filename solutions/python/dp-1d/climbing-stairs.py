# LeetCode 70 — Climbing Stairs (Easy)
# Category: 1-D Dynamic Programming · Approach: Rolling DP
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/climbing-stairs/

def climb_stairs(n: int) -> int:
    prev2, prev1 = 1, 1
    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev1 + prev2
    return prev1
