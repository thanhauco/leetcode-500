# LeetCode 647 — Palindromic Substrings (Medium)
# Category: 2-D Dynamic Programming · Approach: Expand Around Center
# Time: O(n^2) | Space: O(1)
# Source: https://leetcode.com/problems/palindromic-substrings/

def count_substrings(s: str) -> int:
    total = 0
    for center in range(2 * len(s) - 1):
        l = center // 2
        r = l + center % 2
        while l >= 0 and r < len(s) and s[l] == s[r]:
            total += 1
            l -= 1
            r += 1
    return total
