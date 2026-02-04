# LeetCode 252 — Meeting Rooms (Easy)
# Category: Intervals · Approach: Sort & Scan
# Time: O(n log n) | Space: O(1)
# Source: https://leetcode.com/problems/meeting-rooms/

def can_attend_meetings(intervals: list[list[int]]) -> bool:
    intervals.sort(key=lambda x: x[0])
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    return True
