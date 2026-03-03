# LeetCode 441 — Arranging Coins (Easy)
# Category: Binary Search · Approach: Binary search
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/arranging-coins/

def arrange_coins(n: int) -> int:
    lo, hi = 0, n
    while lo < hi:
        mid = lo + (hi - lo + 1) // 2
        if mid * (mid + 1) // 2 <= n:
            lo = mid
        else:
            hi = mid - 1
    return lo
