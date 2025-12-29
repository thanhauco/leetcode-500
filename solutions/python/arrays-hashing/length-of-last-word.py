# LeetCode 58 — Length of Last Word (Easy)
# Category: Arrays & Hashing · Approach: Reverse Scan
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/length-of-last-word/

def length_of_last_word(s: str) -> int:
    i = len(s) - 1
    while i >= 0 and s[i] == " ":
        i -= 1
    length = 0
    while i >= 0 and s[i] != " ":
        length += 1
        i -= 1
    return length
