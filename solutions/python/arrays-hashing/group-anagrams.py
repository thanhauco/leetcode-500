# LeetCode 49 — Group Anagrams (Medium)
# Category: Arrays & Hashing · Approach: Sorted key
# Time: O(n·k log k) | Space: O(n·k)
# Source: https://leetcode.com/problems/group-anagrams/

from collections import defaultdict

def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups: dict[str, list[str]] = defaultdict(list)
    for s in strs:
        key = "".join(sorted(s))
        groups[key].append(s)
    return list(groups.values())
