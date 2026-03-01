# LeetCode 525 — Contiguous Array (Medium)
# Category: Arrays & Hashing · Approach: Prefix Sum
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/contiguous-array/

def find_max_length(nums: list[int]) -> int:
    first = {0: -1}
    count = best = 0
    for i, x in enumerate(nums):
        count += 1 if x == 1 else -1
        if count in first:
            best = max(best, i - first[count])
        else:
            first[count] = i
    return best
