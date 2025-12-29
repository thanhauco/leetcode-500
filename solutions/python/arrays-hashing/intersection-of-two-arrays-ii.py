# LeetCode 350 — Intersection of Two Arrays II (Easy)
# Category: Arrays & Hashing · Approach: Counting
# Time: O(m + n) | Space: O(min(m, n))
# Source: https://leetcode.com/problems/intersection-of-two-arrays-ii/

from collections import Counter

def intersect(nums1: list[int], nums2: list[int]) -> list[int]:
    counts = Counter(nums1)
    result = []
    for x in nums2:
        if counts[x] > 0:
            result.append(x)
            counts[x] -= 1
    return result
