# LeetCode 400 — Nth Digit (Medium)
# Category: Math & Geometry · Approach: Locate the block
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/nth-digit/

def find_nth_digit(n: int) -> int:
    length, count, start = 1, 9, 1
    while n > length * count:
        n -= length * count
        length += 1
        count *= 10
        start *= 10
    num = start + (n - 1) // length
    return int(str(num)[(n - 1) % length])
