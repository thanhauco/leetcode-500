# LeetCode 1 — Two Sum (Easy)
# Category: Arrays & Hashing · Approach: Hash Map
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/two-sum/

def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:
            return [seen[need], i]
        seen[x] = i
    return []
