# LeetCode 387 — First Unique Character in a String (Easy)
# Category: Arrays & Hashing · Approach: Frequency Count
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/first-unique-character-in-a-string/

from collections import Counter


def first_uniq_char(s: str) -> int:
    counts = Counter(s)
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1
