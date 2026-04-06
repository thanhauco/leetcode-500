# LeetCode 986 — Interval List Intersections (Medium)
# Category: Intervals · Approach: Two pointers
# Time: O(m + n) | Space: O(1)
# Source: https://leetcode.com/problems/interval-list-intersections/

def interval_intersection(first: list[list[int]], second: list[list[int]]) -> list[list[int]]:
    res: list[list[int]] = []
    i = j = 0
    while i < len(first) and j < len(second):
        lo = max(first[i][0], second[j][0])
        hi = min(first[i][1], second[j][1])
        if lo <= hi:
            res.append([lo, hi])
        if first[i][1] < second[j][1]:
            i += 1
        else:
            j += 1
    return res
