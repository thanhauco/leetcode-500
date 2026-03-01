# LeetCode 791 — Custom Sort String (Medium)
# Category: Arrays & Hashing · Approach: Counting
# Time: O(n + m) | Space: O(n)
# Source: https://leetcode.com/problems/custom-sort-string/

from collections import Counter


def custom_sort_string(order: str, s: str) -> str:
    counts = Counter(s)
    res: list[str] = []
    for ch in order:
        if ch in counts:
            res.append(ch * counts[ch])
            del counts[ch]
    for ch, cnt in counts.items():
        res.append(ch * cnt)
    return "".join(res)
