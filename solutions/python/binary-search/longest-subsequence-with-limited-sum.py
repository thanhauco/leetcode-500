# LeetCode 2389 — Longest Subsequence With Limited Sum (Easy)
# Category: Binary Search · Approach: Prefix + Binary Search
# Time: O(n log n + q log n) | Space: O(n)
# Source: https://leetcode.com/problems/longest-subsequence-with-limited-sum/

import bisect

def answer_queries(nums: list[int], queries: list[int]) -> list[int]:
    prefix = []
    running = 0
    for x in sorted(nums):
        running += x
        prefix.append(running)
    return [bisect.bisect_right(prefix, q) for q in queries]
