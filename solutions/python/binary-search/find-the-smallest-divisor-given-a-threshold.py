# LeetCode 1283 — Find the Smallest Divisor Given a Threshold (Medium)
# Category: Binary Search · Approach: Binary search on answer
# Time: O(n log(maxNum)) | Space: O(1)
# Source: https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/

import math

def smallest_divisor(nums: list[int], threshold: int) -> int:
    lo, hi = 1, max(nums)

    def total(d: int) -> int:
        return sum(math.ceil(x / d) for x in nums)

    while lo < hi:
        mid = (lo + hi) // 2
        if total(mid) <= threshold:
            hi = mid
        else:
            lo = mid + 1
    return lo
