# LeetCode 349 — Intersection of Two Arrays (Easy)
# Category: Arrays & Hashing · Approach: Hash Set
# Time: O(n + m) | Space: O(n)
# Source: https://leetcode.com/problems/intersection-of-two-arrays/

def intersection(nums1: list[int], nums2: list[int]) -> list[int]:
    seen = set(nums1)
    res = set()
    for x in nums2:
        if x in seen:
            res.add(x)
    return list(res)
