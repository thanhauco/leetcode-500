# LeetCode 344 — Reverse String (Easy)
# Category: Two Pointers · Approach: Two Pointers
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/reverse-string/

def reverse_string(s: list[str]) -> list[str]:
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
    return s
