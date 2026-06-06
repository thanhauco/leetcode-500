# LeetCode 1344 — Angle Between Hands of a Clock (Medium)
# Category: Math & Geometry · Approach: Angle formula
# Time: O(1) | Space: O(1)
# Source: https://leetcode.com/problems/angle-between-hands-of-a-clock/

def angle_clock(hour: int, minutes: int) -> float:
    minute_angle = minutes * 6
    hour_angle = (hour % 12) * 30 + minutes * 0.5
    diff = abs(hour_angle - minute_angle)
    return min(diff, 360 - diff)
