# LeetCode 57 — Insert Interval (Medium)
# Category: Intervals · Approach: Three-phase sweep
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/insert-interval/

def insert(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:
    res: list[list[int]] = []
    ns, ne = new_interval
    i, n = 0, len(intervals)
    while i < n and intervals[i][1] < ns:
        res.append(intervals[i])
        i += 1
    while i < n and intervals[i][0] <= ne:
        ns = min(ns, intervals[i][0])
        ne = max(ne, intervals[i][1])
        i += 1
    res.append([ns, ne])
    while i < n:
        res.append(intervals[i])
        i += 1
    return res
