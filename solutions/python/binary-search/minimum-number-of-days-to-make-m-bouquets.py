# LeetCode 1482 — Minimum Number of Days to Make m Bouquets (Medium)
# Category: Binary Search · Approach: Binary search on answer
# Time: O(n log(maxDay)) | Space: O(1)
# Source: https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/

def min_days(bloom_day: list[int], m: int, k: int) -> int:
    n = len(bloom_day)
    if m * k > n:
        return -1

    def can_make(day: int) -> bool:
        bouquets = flowers = 0
        for b in bloom_day:
            if b <= day:
                flowers += 1
                if flowers == k:
                    bouquets += 1
                    flowers = 0
            else:
                flowers = 0
        return bouquets >= m

    lo, hi = min(bloom_day), max(bloom_day)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_make(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
