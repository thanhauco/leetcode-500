# LeetCode 658 — Find K Closest Elements (Medium)
# Category: Binary Search · Approach: Binary Search Window
# Time: O(log(n − k) + k) | Space: O(k)
# Source: https://leetcode.com/problems/find-k-closest-elements/

def find_closest_elements(arr: list[int], k: int, x: int) -> list[int]:
    lo, hi = 0, len(arr) - k
    while lo < hi:
        mid = (lo + hi) // 2
        if x - arr[mid] > arr[mid + k] - x:
            lo = mid + 1
        else:
            hi = mid
    return arr[lo:lo + k]
