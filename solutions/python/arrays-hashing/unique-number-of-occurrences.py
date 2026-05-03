# LeetCode 1207 — Unique Number of Occurrences (Easy)
# Category: Arrays & Hashing · Approach: Counter
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/unique-number-of-occurrences/

from collections import Counter

def unique_occurrences(arr: list[int]) -> bool:
    counts = Counter(arr).values()
    return len(set(counts)) == len(counts)
