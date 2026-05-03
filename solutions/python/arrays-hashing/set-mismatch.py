# LeetCode 645 — Set Mismatch (Easy)
# Category: Arrays & Hashing · Approach: Counting
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/set-mismatch/

from collections import Counter

def find_error_nums(nums: list[int]) -> list[int]:
    n = len(nums)
    counts = Counter(nums)
    dup = miss = -1
    for v in range(1, n + 1):
        if counts[v] == 2:
            dup = v
        elif counts[v] == 0:
            miss = v
    return [dup, miss]
