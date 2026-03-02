# LeetCode 383 — Ransom Note (Easy)
# Category: Arrays & Hashing · Approach: Frequency Compare
# Time: O(n + m) | Space: O(1)
# Source: https://leetcode.com/problems/ransom-note/

from collections import Counter


def can_construct(ransom_note: str, magazine: str) -> bool:
    have = Counter(magazine)
    need = Counter(ransom_note)
    return all(have[ch] >= cnt for ch, cnt in need.items())
