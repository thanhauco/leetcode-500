# LeetCode 405 — Convert a Number to Hexadecimal (Easy)
# Category: Bit Manipulation · Approach: Nibble by nibble
# Time: O(1) | Space: O(1)
# Source: https://leetcode.com/problems/convert-a-number-to-hexadecimal/

def to_hex(num: int) -> str:
    if num == 0:
        return "0"
    digits = "0123456789abcdef"
    n = num & 0xFFFFFFFF
    res = ""
    while n > 0:
        res = digits[n & 15] + res
        n >>= 4
    return res
