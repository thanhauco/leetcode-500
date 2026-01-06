# LeetCode 9 — Palindrome Number (Easy)
# Category: Math & Geometry · Approach: Reverse Half
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/palindrome-number/

def is_palindrome(x: int) -> bool:
    if x < 0 or (x % 10 == 0 and x != 0):
        return False
    reverted = 0
    while x > reverted:
        reverted = reverted * 10 + x % 10
        x //= 10
    return x == reverted or x == reverted // 10
