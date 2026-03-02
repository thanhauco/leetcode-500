# LeetCode 451 — Sort Characters By Frequency (Medium)
# Category: Arrays & Hashing · Approach: Counter.most_common
# Time: O(n + k log k) | Space: O(n)
# Source: https://leetcode.com/problems/sort-characters-by-frequency/

from collections import Counter


def frequency_sort(s: str) -> str:
    counts = Counter(s)
    return "".join(ch * cnt for ch, cnt in counts.most_common())
