# LeetCode 409 — Longest Palindrome (Easy)
# Category: Arrays & Hashing · Approach: Counting
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/longest-palindrome/

from collections import Counter


def longest_palindrome(s: str) -> int:
    counts = Counter(s)
    length = 0
    has_odd = False
    for c in counts.values():
        length += (c // 2) * 2
        if c % 2 == 1:
            has_odd = True
    return length + (1 if has_odd else 0)
