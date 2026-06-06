# LeetCode 504 — Base 7 (Easy)
# Category: Math & Geometry · Approach: Repeated division
# Time: O(log n) | Space: O(log n)
# Source: https://leetcode.com/problems/base-7/

def convert_to_base7(num: int) -> str:
    if num == 0:
        return "0"
    neg = num < 0
    num = abs(num)
    digits = ""
    while num > 0:
        digits = str(num % 7) + digits
        num //= 7
    return "-" + digits if neg else digits
