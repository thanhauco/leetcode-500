# LeetCode 326 — Power of Three (Easy)
# Category: Math & Geometry · Approach: Repeated Division
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/power-of-three/

def is_power_of_three(n: int) -> bool:
    if n < 1:
        return False
    while n % 3 == 0:
        n //= 3
    return n == 1
