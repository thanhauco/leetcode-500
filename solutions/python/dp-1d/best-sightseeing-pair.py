# LeetCode 1014 — Best Sightseeing Pair (Medium)
# Category: 1-D Dynamic Programming · Approach: Running best
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/best-sightseeing-pair/

def max_score_sightseeing_pair(values: list[int]) -> int:
    best = values[0]
    ans = float("-inf")
    for j in range(1, len(values)):
        ans = max(ans, best + values[j] - j)
        best = max(best, values[j] + j)
    return ans
