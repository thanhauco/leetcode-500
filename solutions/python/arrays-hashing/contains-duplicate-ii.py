# LeetCode 219 — Contains Duplicate II (Easy)
# Category: Arrays & Hashing · Approach: Last-Seen Map
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/contains-duplicate-ii/

def contains_nearby_duplicate(nums: list[int], k: int) -> bool:
    last = {}
    for i, x in enumerate(nums):
        if x in last and i - last[x] <= k:
            return True
        last[x] = i
    return False
