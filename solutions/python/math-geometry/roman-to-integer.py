# LeetCode 13 — Roman to Integer (Easy)
# Category: Math & Geometry · Approach: Greedy Scan
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/roman-to-integer/

def roman_to_int(s: str) -> int:
    values = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
    total = 0
    for i, ch in enumerate(s):
        if i + 1 < len(s) and values[ch] < values[s[i + 1]]:
            total -= values[ch]
        else:
            total += values[ch]
    return total
