# LeetCode 253 — Meeting Rooms II (Medium)
# Category: Intervals · Approach: Sweep Line
# Time: O(n log n) | Space: O(n)
# Source: https://leetcode.com/problems/meeting-rooms-ii/

def min_meeting_rooms(intervals: list[list[int]]) -> int:
    starts = sorted(x[0] for x in intervals)
    ends = sorted(x[1] for x in intervals)
    rooms = max_rooms = e = 0
    for s in starts:
        while e < len(ends) and ends[e] <= s:
            rooms -= 1
            e += 1
        rooms += 1
        max_rooms = max(max_rooms, rooms)
    return max_rooms
