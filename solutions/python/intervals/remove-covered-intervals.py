# LeetCode 1288 — Remove Covered Intervals (Medium)
# Category: Intervals · Approach: Sort + sweep
# Time: O(n log n) | Space: O(1)
# Source: https://leetcode.com/problems/remove-covered-intervals/

def remove_covered_intervals(intervals: list[list[int]]) -> int:
    intervals.sort(key=lambda iv: (iv[0], -iv[1]))
    count = 0
    prev_end = 0
    for _, end in intervals:
        if end > prev_end:
            count += 1
            prev_end = end
    return count
