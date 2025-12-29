# LeetCode 14 — Longest Common Prefix (Easy)
# Category: Arrays & Hashing · Approach: Horizontal Scan
# Time: O(S) | Space: O(1)
# Source: https://leetcode.com/problems/longest-common-prefix/

def longest_common_prefix(strs: list[str]) -> str:
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ""
    return prefix
