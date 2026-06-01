# LeetCode 594 — Longest Harmonious Subsequence (Easy)
# Category: Arrays & Hashing · Approach: Counting
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/longest-harmonious-subsequence/

from collections import Counter


def find_lhs(nums: list[int]) -> int:
    counts = Counter(nums)
    best = 0
    for k, c in counts.items():
        if k + 1 in counts:
            best = max(best, c + counts[k + 1])
    return best
