# LeetCode 1232 — Check If It Is a Straight Line (Easy)
# Category: Math & Geometry · Approach: Cross product
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/check-if-it-is-a-straight-line/

def check_straight_line(coordinates: list[list[int]]) -> bool:
    x0, y0 = coordinates[0]
    x1, y1 = coordinates[1]
    dx, dy = x1 - x0, y1 - y0
    for x, y in coordinates[2:]:
        if dx * (y - y0) != dy * (x - x0):
            return False
    return True
