# LeetCode 452 — Minimum Number of Arrows to Burst Balloons (Medium)
# Category: Intervals · Approach: Greedy by end
# Time: O(n log n) | Space: O(1)
# Source: https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/

def find_min_arrow_shots(points: list[list[int]]) -> int:
    if not points:
        return 0
    points.sort(key=lambda p: p[1])
    arrows = 0
    last = float("-inf")
    for start, end in points:
        if start > last:
            arrows += 1
            last = end
    return arrows
