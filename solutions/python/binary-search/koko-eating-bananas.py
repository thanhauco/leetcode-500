# LeetCode 875 — Koko Eating Bananas (Medium)
# Category: Binary Search · Approach: Search on Answer
# Time: O(n log m) | Space: O(1)
# Source: https://leetcode.com/problems/koko-eating-bananas/

import math

def min_eating_speed(piles: list[int], h: int) -> int:
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        hours = sum(math.ceil(p / mid) for p in piles)
        if hours <= h:
            hi = mid
        else:
            lo = mid + 1
    return lo
