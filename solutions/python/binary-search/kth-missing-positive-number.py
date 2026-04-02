# LeetCode 1539 — Kth Missing Positive Number (Easy)
# Category: Binary Search · Approach: Binary Search
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/kth-missing-positive-number/

def find_kth_positive(arr: list[int], k: int) -> int:
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] - (mid + 1) < k:
            lo = mid + 1
        else:
            hi = mid
    return lo + k
