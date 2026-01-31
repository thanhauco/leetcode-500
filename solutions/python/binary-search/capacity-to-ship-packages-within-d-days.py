# LeetCode 1011 — Capacity To Ship Packages Within D Days (Medium)
# Category: Binary Search · Approach: Binary search on answer
# Time: O(n log(sum)) | Space: O(1)
# Source: https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/

def ship_within_days(weights: list[int], days: int) -> int:
    def feasible(cap: int) -> bool:
        d, cur = 1, 0
        for w in weights:
            if cur + w > cap:
                d += 1
                cur = 0
            cur += w
        return d <= days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
