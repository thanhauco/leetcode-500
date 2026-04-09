# LeetCode 231 — Power of Two (Easy)
# Category: Math & Geometry · Approach: Bit Trick
# Time: O(1) | Space: O(1)
# Source: https://leetcode.com/problems/power-of-two/

def is_power_of_two(n: int) -> bool:
    return n > 0 and (n & (n - 1)) == 0
