# LeetCode 374 — Guess Number Higher or Lower (Easy)
# Category: Binary Search · Approach: Binary Search
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/guess-number-higher-or-lower/

def guess_number(n: int, pick: int) -> int:
    def guess(num: int) -> int:
        if num == pick:
            return 0
        return -1 if num > pick else 1
    lo, hi = 1, n
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        g = guess(mid)
        if g == 0:
            return mid
        if g < 0:
            hi = mid - 1
        else:
            lo = mid + 1
    return lo
