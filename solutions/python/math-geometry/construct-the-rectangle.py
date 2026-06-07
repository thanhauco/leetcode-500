# LeetCode 492 — Construct the Rectangle (Easy)
# Category: Math & Geometry · Approach: Search from sqrt
# Time: O(sqrt(area)) | Space: O(1)
# Source: https://leetcode.com/problems/construct-the-rectangle/

import math

def construct_rectangle(area: int) -> list[int]:
    w = int(math.isqrt(area))
    while area % w != 0:
        w -= 1
    return [area // w, w]
