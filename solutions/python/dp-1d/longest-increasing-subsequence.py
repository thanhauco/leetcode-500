# LeetCode 300 — Longest Increasing Subsequence (Medium)
# Category: 1-D Dynamic Programming · Approach: Patience + Binary Search
# Time: O(n log n) | Space: O(n)
# Source: https://leetcode.com/problems/longest-increasing-subsequence/

from bisect import bisect_left


def length_of_lis(nums: list[int]) -> int:
    tails: list[int] = []
    for x in nums:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)
