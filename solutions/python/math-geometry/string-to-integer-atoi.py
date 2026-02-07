# LeetCode 8 — String to Integer (atoi) (Medium)
# Category: Math & Geometry · Approach: Phased Parse
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/string-to-integer-atoi/

def my_atoi(s: str) -> int:
    i, n = 0, len(s)
    while i < n and s[i] == " ":
        i += 1
    sign = 1
    if i < n and s[i] in "+-":
        if s[i] == "-":
            sign = -1
        i += 1
    num = 0
    while i < n and s[i].isdigit():
        num = num * 10 + (ord(s[i]) - 48)
        i += 1
    num *= sign
    return max(-(2 ** 31), min(2 ** 31 - 1, num))
