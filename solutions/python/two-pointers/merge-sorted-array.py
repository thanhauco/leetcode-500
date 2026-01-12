# LeetCode 88 — Merge Sorted Array (Easy)
# Category: Two Pointers · Approach: Merge
# Time: O(m + n) | Space: O(m + n)
# Source: https://leetcode.com/problems/merge-sorted-array/

def merge(nums1: list[int], m: int, nums2: list[int], n: int) -> list[int]:
    a, b = nums1[:m], nums2[:n]
    result, i, j = [], 0, 0
    while i < m and j < n:
        if a[i] <= b[j]:
            result.append(a[i]); i += 1
        else:
            result.append(b[j]); j += 1
    result.extend(a[i:])
    result.extend(b[j:])
    return result
