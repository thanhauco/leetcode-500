# LeetCode 852 — Peak Index in a Mountain Array (Medium)
# Category: Binary Search · Approach: Binary Search
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/peak-index-in-a-mountain-array/

def peak_index_in_mountain_array(arr: list[int]) -> int:
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] < arr[mid + 1]:
            lo = mid + 1
        else:
            hi = mid
    return lo
