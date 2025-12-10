# LeetCode 56 — Merge Intervals (Medium)
# Category: Intervals · Approach: Sort + Merge
# Time: O(n log n) | Space: O(n)
# Source: https://leetcode.com/problems/merge-intervals/

def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged: list[list[int]] = []
    for start, end in intervals:
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
