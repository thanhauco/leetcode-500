# LeetCode 62 — Unique Paths (Medium)
# Category: 2-D Dynamic Programming · Approach: Rolling Row DP
# Time: O(m·n) | Space: O(n)
# Source: https://leetcode.com/problems/unique-paths/

def unique_paths(m: int, n: int) -> int:
    row = [1] * n
    for _ in range(1, m):
        for c in range(1, n):
            row[c] += row[c - 1]
    return row[-1]
