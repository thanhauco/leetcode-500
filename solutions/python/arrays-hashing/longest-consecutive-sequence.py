# LeetCode 128 — Longest Consecutive Sequence (Medium)
# Category: Arrays & Hashing · Approach: Hash Set
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/longest-consecutive-sequence/

def longest_consecutive(nums: list[int]) -> int:
    num_set = set(nums)
    best = 0
    for x in num_set:
        if x - 1 not in num_set:
            length = 1
            while x + length in num_set:
                length += 1
            best = max(best, length)
    return best
