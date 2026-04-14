# LeetCode 28 — Find the Index of the First Occurrence in a String (Easy)
# Category: Two Pointers · Approach: Sliding Compare
# Time: O(n*m) | Space: O(1)
# Source: https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/

def str_str(haystack: str, needle: str) -> int:
    n, m = len(haystack), len(needle)
    for i in range(n - m + 1):
        if haystack[i:i + m] == needle:
            return i
    return -1
