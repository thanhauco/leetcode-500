# LeetCode 69 — Sqrt(x) (Easy)
# Category: Binary Search · Approach: Binary Search
# Time: O(log x) | Space: O(1)
# Source: https://leetcode.com/problems/sqrtx/

def my_sqrt(x: int) -> int:
    if x < 2:
        return x
    lo, hi, ans = 1, x // 2, 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid <= x:
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ans
