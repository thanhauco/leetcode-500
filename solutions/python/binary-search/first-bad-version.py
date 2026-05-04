# LeetCode 278 — First Bad Version (Easy)
# Category: Binary Search · Approach: Binary Search
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/first-bad-version/

def first_bad_version(n: int, bad: int) -> int:
    def is_bad(v: int) -> bool:
        return v >= bad
    lo, hi = 1, n
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if is_bad(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
