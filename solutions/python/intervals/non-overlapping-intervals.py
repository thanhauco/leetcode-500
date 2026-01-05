# LeetCode 435 — Non-overlapping Intervals (Medium)
# Category: Intervals · Approach: Greedy by End
# Time: O(n log n) | Space: O(1)
# Source: https://leetcode.com/problems/non-overlapping-intervals/

def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    if not intervals:
        return 0
    intervals.sort(key=lambda iv: iv[1])
    end = intervals[0][1]
    removed = 0
    for i in range(1, len(intervals)):
        if intervals[i][0] < end:
            removed += 1
        else:
            end = intervals[i][1]
    return removed
