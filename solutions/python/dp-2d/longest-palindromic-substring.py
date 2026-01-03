# LeetCode 5 — Longest Palindromic Substring (Medium)
# Category: 2-D Dynamic Programming · Approach: Expand Around Center
# Time: O(n^2) | Space: O(1)
# Source: https://leetcode.com/problems/longest-palindromic-substring/

def longest_palindrome(s: str) -> str:
    if len(s) < 2:
        return s
    start, max_len = 0, 1

    def expand(l: int, r: int) -> None:
        nonlocal start, max_len
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        if r - l - 1 > max_len:
            max_len = r - l - 1
            start = l + 1

    for i in range(len(s)):
        expand(i, i)
        expand(i, i + 1)
    return s[start:start + max_len]
