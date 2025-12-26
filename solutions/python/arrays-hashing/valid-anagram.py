# LeetCode 242 — Valid Anagram (Easy)
# Category: Arrays & Hashing · Approach: Counter
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/valid-anagram/

from collections import Counter

def is_anagram(s: str, t: str) -> bool:
    return Counter(s) == Counter(t)
